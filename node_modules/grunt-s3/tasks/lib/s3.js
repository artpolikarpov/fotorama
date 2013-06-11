/*jshint esnext:true*/
/*globals module:true, require:true, process:true*/

/**
 * Module dependencies.
 */

// Core.
const util = require('util');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const url = require('url');
const zlib = require('zlib');

// Npm.
const knox = require('knox');
const mime = require('mime');
const deferred = require('underscore.deferred');
var Tempfile = require('temporary/lib/file');

// Local
const common = require('./common');

// Avoid warnings.
const existsSync = ('existsSync' in fs) ? fs.existsSync : path.existsSync;

/**
 * Success/error messages.
 */
const MSG_UPLOAD_SUCCESS = '↗'.blue + ' Uploaded: %s (%s)';
const MSG_DOWNLOAD_SUCCESS = '↙'.yellow + ' Downloaded: %s (%s)';
const MSG_DELETE_SUCCESS = '✗'.red + ' Deleted: %s';
const MSG_COPY_SUCCESS = '→'.cyan + ' Copied: %s to %s';

const MSG_UPLOAD_DEBUG = '↗'.blue + ' Upload: ' + '%s'.grey + ' to ' + '%s:%s'.cyan;
const MSG_DOWNLOAD_DEBUG = '↙'.yellow + ' Download: ' + '%s:%s'.cyan + ' to ' + '%s'.grey;
const MSG_DELETE_DEBUG = '✗'.red + ' Delete: ' + '%s:%s'.cyan;
const MSG_COPY_DEBUG = '→'.cyan + ' Copy: ' + '%s'.cyan + ' to ' + '%s:%s'.cyan;

const MSG_ERR_NOT_FOUND = '¯\\_(ツ)_/¯ File not found: %s';
const MSG_ERR_UPLOAD = 'Upload error: %s (%s)';
const MSG_ERR_DOWNLOAD = 'Download error: %s (%s)';
const MSG_ERR_DELETE = 'Delete error: %s (%s)';
const MSG_ERR_COPY = 'Copy error: %s to %s';
const MSG_ERR_CHECKSUM = '%s error: expected hash: %s but found %s for %s';

exports.init = function (grunt) {
  var async = grunt.util.async;
  var _ = grunt.util._;

  _.mixin(deferred);

  var exports = {};

  /**
   * Create an Error object based off of a formatted message. Arguments
   * are identical to those of util.format.
   *
   * @param {String} Format.
   * @param {...string|number} Values to insert into Format.
   * @returns {Error}
   */
  var makeError = exports.makeError = function () {
    var msg = util.format.apply(util, _.toArray(arguments));
    return new Error(msg);
  };

  /**
   * Publishes the local file at src to the s3 dest.
   *
   * Verifies that the upload was successful by comparing an md5 checksum of
   * the local and remote versions.
   *
   * @param {String} src The local path to the file to upload.
   * @param {String} dest The s3 path, relative to the bucket, to which the src
   *     is uploaded.
   * @param {Object} [options] An object containing options which override any
   *     option declared in the global s3 config.
   */
  exports.put = exports.upload = function (src, dest, opts) {
    var dfd = new _.Deferred();
    var options = _.clone(opts, true);

    // Make sure the local file exists.
    if (!existsSync(src)) {
      return dfd.reject(makeError(MSG_ERR_NOT_FOUND, src));
    }

    var headers = options.headers || {};

    if (options.access) {
      headers['x-amz-acl'] = options.access;
    }

    // Pick out the configuration options we need for the client.
    var client = knox.createClient(_(options).pick([
      'region', 'endpoint', 'port', 'key', 'secret', 'access', 'bucket', 'secure'
    ]));

    if (options.debug) {
      return dfd.resolve(util.format(MSG_UPLOAD_DEBUG, path.relative(process.cwd(), src), client.bucket, dest)).promise();
    }

    // Encapsulate this logic to make it easier to gzip the file first if
    // necesssary.
    var upload = function (cb) {
      cb = cb || function () {};

      // Upload the file to s3.
      client.putFile(src, dest, headers, function (err, res) {
        // If there was an upload error or any status other than a 200, we
        // can assume something went wrong.
        if (err || res.statusCode !== 200) {
          cb(makeError(MSG_ERR_UPLOAD, src, err || res.statusCode));
        }
        else {
          // Read the local file so we can get its md5 hash.
          fs.readFile(src, function (err, data) {
            if (err) {
              cb(makeError(MSG_ERR_UPLOAD, src, err));
            }
            else {
              // The etag head in the response from s3 has double quotes around
              // it. Strip them out.
              var remoteHash = res.headers.etag.replace(/"/g, '');

              // Get an md5 of the local file so we can verify the upload.
              var localHash = crypto.createHash('md5').update(data).digest('hex');

              if (remoteHash === localHash) {
                var msg = util.format(MSG_UPLOAD_SUCCESS, src, localHash);
                cb(null, msg);
              }
              else {
                cb(makeError(MSG_ERR_CHECKSUM, 'Upload', localHash, remoteHash, src));
              }
            }
          });
        }
      });
    };

    // prepare gzip exclude option
    var gzipExclude = options.gzipExclude || [];
    if (!_.isArray(gzipExclude)) {
      gzipExclude = [];
    }

    // If gzip is enabled and file not in gzip exclude array,
    // gzip the file into a temp file and then perform the upload.
    if (options.gzip && gzipExclude.indexOf(path.extname(src)) === -1) {
      headers['Content-Encoding'] = 'gzip';
      headers['Content-Type'] = headers['Content-Type'] || mime.lookup(src);

      var charset = mime.charsets.lookup(headers['Content-Type'], null);
      if (charset) {
        headers['Content-Type'] += '; charset=' + charset;
      }

      var tmp = new Tempfile();
      var input = fs.createReadStream(src);
      var output = fs.createWriteStream(tmp.path);

      // Gzip the file and upload when done.
      input.pipe(zlib.createGzip()).pipe(output)
        .on('error', function (err) {
          dfd.reject(makeError(MSG_ERR_UPLOAD, src, err));
        })
        .on('close', function () {
          // Update the src to point to the newly created .gz file.
          src = tmp.path;
          upload(function (err, msg) {
            // Clean up the temp file.
            tmp.unlinkSync();

            if (err) {
              dfd.reject(err);
            }
            else {
              dfd.resolve(msg);
            }
          });
        });
    }
    else {
      // No need to gzip so go ahead and upload the file.
      upload(function (err, msg) {
        if (err) {
          dfd.reject(err);
        }
        else {
          dfd.resolve(msg);
        }
      });
    }

    return dfd.promise();
  };

  /**
   * Download a file from s3.
   *
   * Verifies that the download was successful by downloading the file and
   * comparing an md5 checksum of the local and remote versions.
   *
   * @param {String} src The s3 path, relative to the bucket, of the file being
   *     downloaded.
   * @param {String} dest The local path where the download will be saved.
   * @param {Object} [options] An object containing options which override any
   *     option declared in the global s3 config.
   */
  exports.pull = exports.download = function (src, dest, opts) {
    var dfd = new _.Deferred();
    var options = _.clone(opts);

    // Pick out the configuration options we need for the client.
    var client = knox.createClient(_(options).pick([
      'region', 'endpoint', 'port', 'key', 'secret', 'access', 'bucket'
    ]));

    if (options.debug) {
      return dfd.resolve(util.format(MSG_DOWNLOAD_DEBUG, client.bucket, src, path.relative(process.cwd(), dest))).promise();
    }

    // Create a local stream we can write the downloaded file to.
    var file = fs.createWriteStream(dest);

    // Upload the file to s3.
    client.getFile(src, function (err, res) {
      // If there was an upload error or any status other than a 200, we
      // can assume something went wrong.
      if (err || res.statusCode !== 200) {
        return dfd.reject(makeError(MSG_ERR_DOWNLOAD, src, err || res.statusCode));
      }

      res
        .on('data', function (chunk) {
          file.write(chunk);
        })
        .on('error', function (err) {
          return dfd.reject(makeError(MSG_ERR_DOWNLOAD, src, err));
        })
        .on('end', function () {
          file.end();

          // Read the local file so we can get its md5 hash.
          fs.readFile(dest, function (err, data) {
            if (err) {
              return dfd.reject(makeError(MSG_ERR_DOWNLOAD, src, err));
            }
            else {
              // The etag head in the response from s3 has double quotes around
              // it. Strip them out.
              var remoteHash = res.headers.etag.replace(/"/g, '');

              // Get an md5 of the local file so we can verify the download.
              var localHash = crypto.createHash('md5').update(data).digest('hex');

              if (remoteHash === localHash) {
                var msg = util.format(MSG_DOWNLOAD_SUCCESS, src, localHash);
                dfd.resolve(msg);
              }
              else {
                dfd.reject(makeError(MSG_ERR_CHECKSUM, 'Download', localHash, remoteHash, src));
              }
            }
          });
        });
    });

    return dfd.promise();
  };

  /**
   * Copy a file from s3 to s3.
   *
   * @param {String} src The s3 path, including the bucket, to the file to
   *     copy.
   * @param {String} dest The s3 path, relative to the bucket, to the file to
   *     create.
   * @param {Object} [options] An object containing options which override any
   *     option declared in the global s3 config.
   */
  exports.copy = function (src, dest, opts) {
    var dfd = new _.Deferred();
    var options = _.clone(opts);

    // Pick out the configuration options we need for the client.
    var client = knox.createClient(_(options).pick([
      'region', 'endpoint', 'port', 'key', 'secret', 'access', 'bucket'
    ]));

    if (options.debug) {
      return dfd.resolve(util.format(MSG_COPY_DEBUG, src, client.bucket, dest)).promise();
    }

    var headers = {
      'Content-Length': 0,
      'x-amz-copy-source': src
    };

    if (options.headers) {
      _(headers).extend(options.headers);
      headers['x-amz-metadata-directive'] = 'REPLACE';
    }

    // Copy the src file to dest.
    var req = client.put(dest, headers);

    req.on('response', function (res) {
      if (res.statusCode !== 200) {
        dfd.reject(makeError(MSG_ERR_COPY, src, dest));
      }
      else {
        dfd.resolve(util.format(MSG_COPY_SUCCESS, src, dest));
      }
    });

    return dfd.promise();
  };

  /**
   * Delete a file from s3.
   *
   * @param {String} src The s3 path, relative to the bucket, to the file to
   *     delete.
   * @param {Object} [options] An object containing options which override any
   *     option declared in the global s3 config.
   */
  exports.del = function (src, opts) {
    var dfd = new _.Deferred();
    var options = _.clone(opts);

    // Pick out the configuration options we need for the client.
    var client = knox.createClient(_(options).pick([
      'region', 'endpoint', 'port', 'key', 'secret', 'access', 'bucket'
    ]));

    if (options.debug) {
      return dfd.resolve(util.format(MSG_DELETE_DEBUG, client.bucket, src)).promise();
    }

    // Upload the file to this endpoint.
    client.deleteFile(src, function (err, res) {
      if (err || res.statusCode !== 204) {
        dfd.reject(makeError(MSG_ERR_DELETE, src, err || res.statusCode));
      }
      else {
        dfd.resolve(util.format(MSG_DELETE_SUCCESS, src));
      }
    });

    return dfd.promise();
  };

  return exports;
};

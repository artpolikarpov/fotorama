window.matchMedia = window.matchMedia || (function (e, f) {
  var c, a = e.documentElement, b = a.firstElementChild || a.firstChild, d = e.createElement("body"), g = e.createElement("div");
  g.id = "mq-test-1";
  g.style.cssText = "position:absolute;top:-100em";
  d.style.background = "none";
  d.appendChild(g);
  return function (h) {
    g.innerHTML = '&shy;<style media="' + h + '"> #mq-test-1 { width:42px; }</style>';
    a.insertBefore(d, b);
    c = g.offsetWidth === 42;
    a.removeChild(d);
    return{matches: c, media: h}
  }
}(document));
(function () {
  var b = 0;
  var c = ["ms", "moz", "webkit", "o"];
  for (var a = 0; a < c.length && !window.requestAnimationFrame; ++a) {
    window.requestAnimationFrame = window[c[a] + "RequestAnimationFrame"];
    window.cancelAnimationFrame = window[c[a] + "CancelAnimationFrame"] || window[c[a] + "CancelRequestAnimationFrame"]
  }
  if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = function (h, e) {
      var d = new Date().getTime();
      var f = Math.max(0, 16 - (d - b));
      var g = window.setTimeout(function () {
        h(d + f)
      }, f);
      b = d + f;
      return g
    }
  }
  if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = function (d) {
      clearTimeout(d)
    }
  }
}());
if (!Function.prototype.bind) {
  Function.prototype.bind = function bind (d) {
    if (arguments.length < 1) {
      return this
    }
    var a = this;
    var c = AC.Array.toArray(arguments);
    var b = c.shift();
    return function () {
      return a.apply(b, c.concat(AC.Array.toArray(arguments)))
    }
  }
}
if (!Array.isArray) {
  Array.isArray = function isArray (a) {
    return(a && typeof a === "object" && "splice" in a && "join" in a)
  }
}
if (!Array.prototype.every) {
  Array.prototype.every = function every (e, d) {
    var c = Object(this);
    var a = c.length >>> 0;
    var b;
    if (typeof e !== "function") {
      throw new TypeError(e + " is not a function")
    }
    for (b = 0; b < a; b += 1) {
      if (b in c && !e.call(d, c[b], b, c)) {
        return false
      }
    }
    return true
  }
}
if (!Array.prototype.filter) {
  Array.prototype.filter = function filter (f, e) {
    var d = Object(this);
    var a = d.length >>> 0;
    var c;
    var b = [];
    if (typeof f !== "function") {
      throw new TypeError(f + " is not a function")
    }
    for (c = 0; c < a; c += 1) {
      if (c in d && f.call(e, d[c], c, d)) {
        b.push(d[c])
      }
    }
    return b
  }
}
if (!Array.prototype.forEach) {
  Array.prototype.forEach = function forEach (f, e) {
    var d = Object(this);
    var a = this.length >>> 0;
    var b;
    var c;
    if (typeof f !== "function") {
      throw new TypeError("No function object passed to forEach.")
    }
    for (b = 0; b < a; b += 1) {
      c = d[b];
      f.call(e, c, b, d)
    }
  }
}
if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function indexOf (b, c) {
    var d = c || 0;
    var a = 0;
    if (d < 0) {
      d = this.length + c - 1;
      if (d < 0) {
        throw"Wrapped past beginning of array while looking up a negative start index."
      }
    }
    for (a = 0; a < this.length; a++) {
      if (this[a] === b) {
        return a
      }
    }
    return(-1)
  }
}
if (!Array.prototype.lastIndexOf) {
  Array.prototype.lastIndexOf = function lastIndexOf (e, d) {
    var b = Object(this);
    var a = b.length >>> 0;
    var c;
    d = parseInt(d, 10);
    if (a <= 0) {
      return -1
    }
    c = (typeof d === "number") ? Math.min(a - 1, d) : a - 1;
    c = c >= 0 ? c : a - Math.abs(c);
    for (; c >= 0; c -= 1) {
      if (c in b && e === b[c]) {
        return c
      }
    }
    return -1
  }
}
if (!Array.prototype.map) {
  Array.prototype.map = function map (f, e) {
    var c = Object(this);
    var b = c.length >>> 0;
    var d;
    var a = new Array(b);
    if (typeof f !== "function") {
      throw new TypeError(f + " is not a function")
    }
    for (d = 0; d < b; d += 1) {
      if (d in c) {
        a[d] = f.call(e, c[d], d, c)
      }
    }
    return a
  }
}
if (!Array.prototype.reduce) {
  Array.prototype.reduce = function reduce (f, c) {
    var d = Object(this);
    var b = d.length >>> 0;
    var e = 0;
    var a;
    if (typeof f !== "function") {
      throw new TypeError(f + " is not a function")
    }
    if (typeof c === "undefined") {
      if (!b) {
        throw new TypeError("Reduce of empty array with no initial value")
      }
      a = d[0];
      e = 1
    } else {
      a = c
    }
    while (e < b) {
      if (e in d) {
        a = f.call(undefined, a, d[e], e, d);
        e += 1
      }
    }
    return a
  }
}
if (!Array.prototype.reduceRight) {
  Array.prototype.reduceRight = function reduceRight (f, c) {
    var d = Object(this);
    var b = d.length >>> 0;
    var e = b - 1;
    var a;
    if (typeof f !== "function") {
      throw new TypeError(f + " is not a function")
    }
    if (c === undefined) {
      if (!b) {
        throw new TypeError("Reduce of empty array with no initial value")
      }
      a = d[b - 1];
      e = b - 2
    } else {
      a = c
    }
    while (e >= 0) {
      if (e in d) {
        a = f.call(undefined, a, d[e], e, d);
        e -= 1
      }
    }
    return a
  }
}
if (!Array.prototype.some) {
  Array.prototype.some = function some (e, d) {
    var b = Object(this);
    var a = b.length >>> 0;
    var c;
    if (typeof e !== "function") {
      throw new TypeError(e + " is not a function")
    }
    for (c = 0; c < a; c += 1) {
      if (c in b && e.call(d, b[c], c, b) === true) {
        return true
      }
    }
    return false
  }
}
if (!Date.now) {
  Date.now = function now () {
    return new Date().getTime()
  }
}
if (!Date.prototype.toISOString) {
  Date.prototype.toISOString = function toISOString () {
    if (!isFinite(this)) {
      throw new RangeError("Date.prototype.toISOString called on non-finite value.")
    }
    var b = {year: this.getUTCFullYear(), month: this.getUTCMonth() + 1, day: this.getUTCDate(), hours: this.getUTCHours(), minutes: this.getUTCMinutes(), seconds: this.getUTCSeconds(), mseconds: (this.getUTCMilliseconds() / 1000).toFixed(3).substr(2, 3)};
    var c;
    var a;
    for (c in b) {
      if (b.hasOwnProperty(c) && c !== "year" && c !== "mseconds") {
        b[c] = String(b[c]).length === 1 ? "0" + String(b[c]) : String(b[c])
      }
    }
    if (b.year < 0 || b.year > 9999) {
      a = b.year < 0 ? "-" : "+";
      b.year = a + String(Math.abs(b.year / 1000000)).substr(2, 6)
    }
    return b.year + "-" + b.month + "-" + b.day + "T" + b.hours + ":" + b.minutes + ":" + b.seconds + "." + b.mseconds + "Z"
  }
}
if (!Date.prototype.toJSON) {
  Date.prototype.toJSON = function (d) {
    var e = Object(this);
    var a;
    var c = function (f) {
      var h = typeof f;
      var g = [null, "undefined", "boolean", "string", "number"].some(function (i) {
        return i === h
      });
      if (g) {
        return true
      }
      return false
    };
    var b = function (f) {
      var g;
      if (c(f)) {
        return f
      }
      g = (typeof f.valueOf === "function") ? f.valueOf() : (typeof f.toString === "function") ? f.toString() : null;
      if (g && c(g)) {
        return g
      }
      throw new TypeError(f + " cannot be converted to a primitive")
    };
    a = b(e);
    if (typeof a === "number" && !isFinite(a)) {
      return null
    }
    if (typeof e.toISOString !== "function") {
      throw new TypeError("toISOString is not callable")
    }
    return e.toISOString.call(e)
  }
}
if (!String.prototype.trim) {
  String.prototype.trim = function trim () {
    return this.replace(/^\s+|\s+$/g, "")
  }
}
if (!Object.keys) {
  Object.keys = function keys (b) {
    var a = [];
    var c;
    if ((!b) || (typeof b.hasOwnProperty !== "function")) {
      throw"Object.keys called on non-object."
    }
    for (c in b) {
      if (b.hasOwnProperty(c)) {
        a.push(c)
      }
    }
    return a
  }
}
if (typeof JSON == "undefined" || !("stringify" in JSON && "parse" in JSON)) {
  if (!this.JSON) {
    this.JSON = {}
  }
  (function () {
    function f (n) {
      return n < 10 ? "0" + n : n
    }

    if (typeof String.prototype.toJSON !== "function") {
      String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON = function (key) {
        return this.valueOf()
      }
    }
    var cx = /[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, escapable = /[\\\"\x00-\x1f\x7f-\x9f\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g, gap, indent, meta = {"\b": "\\b", "\t": "\\t", "\n": "\\n", "\f": "\\f", "\r": "\\r", '"': '\\"', "\\": "\\\\"}, rep;

    function quote (string) {
      escapable.lastIndex = 0;
      return escapable.test(string) ? '"' + string.replace(escapable, function (a) {
        var c = meta[a];
        return typeof c === "string" ? c : "\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
      }) + '"' : '"' + string + '"'
    }

    function str (key, holder) {
      var i, k, v, length, mind = gap, partial, value = holder[key];
      if (value && typeof value === "object" && typeof value.toJSON === "function") {
        value = value.toJSON(key)
      }
      if (typeof rep === "function") {
        value = rep.call(holder, key, value)
      }
      switch (typeof value) {
        case"string":
          return quote(value);
        case"number":
          return isFinite(value) ? String(value) : "null";
        case"boolean":
        case"null":
          return String(value);
        case"object":
          if (!value) {
            return"null"
          }
          gap += indent;
          partial = [];
          if (Object.prototype.toString.apply(value) === "[object Array]") {
            length = value.length;
            for (i = 0; i < length; i += 1) {
              partial[i] = str(i, value) || "null"
            }
            v = partial.length === 0 ? "[]" : gap ? "[\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "]" : "[" + partial.join(",") + "]";
            gap = mind;
            return v
          }
          if (rep && typeof rep === "object") {
            length = rep.length;
            for (i = 0; i < length; i += 1) {
              k = rep[i];
              if (typeof k === "string") {
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v)
                }
              }
            }
          } else {
            for (k in value) {
              if (Object.hasOwnProperty.call(value, k)) {
                v = str(k, value);
                if (v) {
                  partial.push(quote(k) + (gap ? ": " : ":") + v)
                }
              }
            }
          }
          v = partial.length === 0 ? "{}" : gap ? "{\n" + gap + partial.join(",\n" + gap) + "\n" + mind + "}" : "{" + partial.join(",") + "}";
          gap = mind;
          return v
      }
    }

    if (typeof JSON.stringify !== "function") {
      JSON.stringify = function (value, replacer, space) {
        var i;
        gap = "";
        indent = "";
        if (typeof space === "number") {
          for (i = 0; i < space; i += 1) {
            indent += " "
          }
        } else {
          if (typeof space === "string") {
            indent = space
          }
        }
        rep = replacer;
        if (replacer && typeof replacer !== "function" && (typeof replacer !== "object" || typeof replacer.length !== "number")) {
          throw new Error("JSON.stringify")
        }
        return str("", {"": value})
      }
    }
    if (typeof JSON.parse !== "function") {
      JSON.parse = function (text, reviver) {
        var j;

        function walk (holder, key) {
          var k, v, value = holder[key];
          if (value && typeof value === "object") {
            for (k in value) {
              if (Object.hasOwnProperty.call(value, k)) {
                v = walk(value, k);
                if (v !== undefined) {
                  value[k] = v
                } else {
                  delete value[k]
                }
              }
            }
          }
          return reviver.call(holder, key, value)
        }

        text = String(text);
        cx.lastIndex = 0;
        if (cx.test(text)) {
          text = text.replace(cx, function (a) {
            return"\\u" + ("0000" + a.charCodeAt(0).toString(16)).slice(-4)
          })
        }
        if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, "@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, "]").replace(/(?:^|:|,)(?:\s*\[)+/g, ""))) {
          j = eval("(" + text + ")");
          return typeof reviver === "function" ? walk({"": j}, "") : j
        }
        throw new SyntaxError("JSON.parse")
      }
    }
  }())
}
var ac_domready = function (c) {
  var b = false;
  var h = true;
  var j = window.document;
  var i = j.documentElement;
  var m = j.addEventListener ? "addEventListener" : "attachEvent";
  var k = j.addEventListener ? "removeEventListener" : "detachEvent";
  var a = j.addEventListener ? "" : "on";
  var l = function (f) {
    if (f.type == "readystatechange" && j.readyState != "complete") {
      return
    }
    (f.type == "load" ? window : j)[k](a + f.type, l, false);
    if (!b && (b = true)) {
      c.call(window, f.type || f)
    }
  };
  var g = function () {
    try {
      i.doScroll("left")
    } catch (f) {
      setTimeout(g, 50);
      return
    }
    l("poll")
  };
  if (j.readyState == "complete") {
    c.call(window, "lazy")
  } else {
    if (j.createEventObject && i.doScroll) {
      try {
        h = !window.frameElement
      } catch (d) {
      }
      if (h) {
        g()
      }
    }
    j[m](a + "DOMContentLoaded", l, false);
    j[m](a + "readystatechange", l, false);
    window[m](a + "load", l, false)
  }
};
var AC = window.AC || {};
AC.Array = AC.Array || {};
AC.Array.toArray = function (a) {
  return Array.prototype.slice.call(a)
};
AC.Array.flatten = function (c) {
  var a = [];
  var b = function (d) {
    if (Array.isArray(d)) {
      d.forEach(b)
    } else {
      a.push(d)
    }
  };
  c.forEach(b);
  return a
};
AC.Array.without = function (a, e) {
  var c;
  var b = a.indexOf(e);
  var d = a.length;
  if (b >= 0) {
    if (b === (d - 1)) {
      c = a.slice(0, (d - 1))
    } else {
      if (b === 0) {
        c = a.slice(1)
      } else {
        c = a.slice(0, b);
        c = c.concat(a.slice(b + 1))
      }
    }
  } else {
    return a
  }
  return c
};
var AC = window.AC || {};
AC.Element = AC.Element || {};
AC.Element.addEventListener = function (e, b, d, a) {
  if (e.addEventListener) {
    e.addEventListener(b, d, a)
  } else {
    if (e.attachEvent) {
      var c = e.attachEvent("on" + b, d)
    } else {
      e["on" + b] = d
    }
  }
  return e
};
AC.Element.removeEventListener = function (d, b, c, a) {
  if (d.removeEventListener) {
    d.removeEventListener(b, c, a)
  } else {
    d.detachEvent("on" + b, c)
  }
  return d
};
AC.Element.getElementById = function (a) {
  if (AC.String.isString(a)) {
    a = document.getElementById(a)
  }
  if (AC.Element.isElement(a)) {
    return a
  } else {
    return null
  }
};
AC.Element.selectAll = function (a, b) {
  if (typeof b === "undefined") {
    b = document.body
  } else {
    if (!AC.Element.isElement(b)) {
      throw"AC.Element.selectAll: Context is not an Element"
    }
  }
  if (typeof a === "string") {
    return Sizzle(a, b)
  } else {
    throw"AC.Element.selectAll: Selector must be a string"
  }
};
AC.Element.select = function (a, b) {
  if (typeof b === "undefined") {
    b = document.body
  } else {
    if (!AC.Element.isElement(b)) {
      throw"AC.Element.select: Context is not an Element"
    }
  }
  if (typeof a === "string") {
    if (window.Element && typeof Element.prototype.querySelector === "function") {
      return b.querySelector(a)
    } else {
      return Sizzle(a, b)[0]
    }
  } else {
    throw"AC.Element.select: Selector must be a string"
  }
};
AC.Element.matchesSelector = function (b, a) {
  return Sizzle.matchesSelector(b, a)
};
AC.Element.filterBySelector = function (b, a) {
  return Sizzle.matches(a, b)
};
(function () {
  var a = function (c, d, e, b) {
    return(e === 0) && (b.substr(1, 3) !== "moz") ? d : d.toUpperCase()
  };
  AC.Element.setStyle = function (d, f) {
    if ((typeof f !== "string" && typeof f !== "object") || Array.isArray(f)) {
      throw new TypeError("styles argument must be either an object or a string")
    }
    d = AC.Element.getElementById(d);
    var c = (typeof f === "object") ? f : {};
    var j;
    var e;
    var b;
    var g;
    var h;
    if (typeof f === "string") {
      j = f.split(";");
      for (b = 0; b < j.length; b += 1) {
        e = j[b].indexOf(":");
        if (e > 0) {
          c[j[b].substr(0, e).trim()] = j[b].substr(e + 1).trim()
        }
      }
    }
    for (h in c) {
      if (c.hasOwnProperty(h)) {
        g = h.replace(/-(\w)/g, a);
        if (g === "opacity" && AC.Element.__setOpacityIE) {
          AC.Element.__setOpacityIE(d, c[h])
        } else {
          if (typeof d.style[g] !== "undefined") {
            d.style[g] = c[h]
          }
        }
      }
    }
    return d
  };
  AC.Element.getStyle = function (c, d) {
    var b;
    var e;
    d = d.replace(/-(\w)/g, a);
    if (AC.Element.__getStyleIE) {
      return AC.Element.__getStyleIE(c, d)
    }
    c = AC.Element.getElementById(c);
    d = (d === "float") ? "cssFloat" : d;
    b = window.getComputedStyle(c, null);
    e = b ? b[d] : null;
    if (d === "opacity") {
      return e ? parseFloat(e) : 1
    }
    return e === "auto" ? null : e
  }
}());
AC.Element.getBoundingBox = function (b) {
  b = AC.Element.getElementById(b);
  var d = b.getBoundingClientRect();
  var a = d.width || d.right - d.left;
  var c = d.height || d.bottom - d.top;
  return{top: d.top, right: d.right, bottom: d.bottom, left: d.left, width: a, height: c}
};
AC.Element.cumulativeOffset = function (b) {
  var c = AC.Element.getBoundingBox(b);
  var a = AC.Viewport.scrollOffsets();
  var d = [c.top + a.y, c.left + a.x];
  d.top = d[0];
  d.left = d[1];
  return d
};
AC.Element.hasClassName = function (c, b) {
  var a = AC.Element.getElementById(c);
  if (a && a.className !== "") {
    return new RegExp("(\\s|^)" + b + "(\\s|$)").test(a.className)
  } else {
    return false
  }
};
AC.Element.addClassName = function (c, b) {
  var a = AC.Element.getElementById(c);
  if (!AC.Element.hasClassName(a, b)) {
    a.className += " " + b
  }
};
AC.Element.removeClassName = function (c, b) {
  var a = AC.Element.getElementById(c);
  if (AC.Element.hasClassName(a, b)) {
    var d = new RegExp("(\\s|^)" + b + "(\\s|$)");
    a.className = a.className.replace(d, "$1").trim()
  }
};
AC.Element.toggleClassName = function (c, b) {
  var a = AC.Element.getElementById(c);
  if (a.classList) {
    a.classList.toggle(b)
  } else {
    if (AC.Element.hasClassName(a, b)) {
      AC.Element.removeClassName(a, b)
    } else {
      AC.Element.addClassName(a, b)
    }
  }
};
AC.Element.isElement = function (a) {
  return !!(a && a.nodeType === 1)
};
AC.Element.addVendorEventListener = function (b, c, d, a) {
  AC.log("AC.Element.addVendorEventListener is deprecated. Please use AC.Element.addVendorPrefixEventListener.");
  return this.addVendorPrefixEventListener(b, c, d, a)
};
AC.Element.addVendorPrefixEventListener = function (b, c, d, a) {
  if (c.match(/^webkit/i)) {
    c = c.replace(/^webkit/i, "")
  } else {
    if (c.match(/^moz/i)) {
      c = c.replace(/^moz/i, "")
    } else {
      if (c.match(/^ms/i)) {
        c = c.replace(/^ms/i, "")
      } else {
        if (c.match(/^o/i)) {
          c = c.replace(/^o/i, "")
        } else {
          c = c.charAt(0).toUpperCase() + c.slice(1)
        }
      }
    }
  }
  if (/WebKit/i.test(window.navigator.userAgent)) {
    return AC.Element.addEventListener(b, "webkit" + c, d, a)
  } else {
    if (/Opera/i.test(window.navigator.userAgent)) {
      return AC.Element.addEventListener(b, "O" + c, d, a)
    } else {
      if (/Gecko/i.test(window.navigator.userAgent)) {
        return AC.Element.addEventListener(b, c.toLowerCase(), d, a)
      } else {
        c = c.charAt(0).toLowerCase() + c.slice(1);
        return AC.Element.addEventListener(b, c, d, a)
      }
    }
  }
};
AC.Element.removeVendorEventListener = function (b, c, d, a) {
  AC.log("AC.Element.removeVendorEventListener is deprecated. Please use AC.Element.removeVendorPrefixEventListener.");
  return this.removeVendorPrefixEventListener(b, c, d, a)
};
AC.Element.removeVendorPrefixEventListener = function (b, c, d, a) {
  if (c.match(/^webkit/i)) {
    c = c.replace(/^webkit/i, "")
  } else {
    if (c.match(/^moz/i)) {
      c = c.replace(/^moz/i, "")
    } else {
      if (c.match(/^ms/i)) {
        c = c.replace(/^ms/i, "")
      } else {
        if (c.match(/^o/i)) {
          c = c.replace(/^o/i, "")
        } else {
          c = c.charAt(0).toUpperCase() + c.slice(1)
        }
      }
    }
  }
  AC.Element.removeEventListener(b, "webkit" + c, d, a);
  AC.Element.removeEventListener(b, "O" + c, d, a);
  AC.Element.removeEventListener(b, c.toLowerCase(), d, a);
  c = c.charAt(0).toLowerCase() + c.slice(1);
  return AC.Element.removeEventListener(b, c, d, a)
};
AC.Element.setVendorPrefixStyle = function (a, d, c) {
  if (typeof d !== "string") {
    throw new TypeError("AC.Element.setVendorPrefixStyle: property must be a string")
  }
  if (typeof c !== "string" && typeof c !== "number") {
    throw new TypeError("AC.Element.setVendorPrefixStyle: value must be a string or a number")
  }
  c += "";
  a = AC.Element.getElementById(a);
  var b = ["", "webkit", "Moz", "ms", "O"];
  var f;
  var e;
  d = d.replace(/-(webkit|moz|ms|o)-/i, "");
  d = d.replace(/^(webkit|Moz|ms|O)/, "").charAt(0).toLowerCase() + d.slice(1);
  d = d.replace(/-(\w)/, function (g, h) {
    return h.toUpperCase()
  });
  c = c.replace(/-(webkit|moz|ms|o)-/, "-vendor-");
  b.some(function (i, h, g) {
    f = (i === "") ? d : i + d.charAt(0).toUpperCase() + d.slice(1);
    e = (i === "") ? c.replace("-vendor-", "") : c.replace("-vendor-", "-" + i.charAt(0).toLowerCase() + i.slice(1) + "-");
    if (f in a.style) {
      AC.Element.setStyle(a, f + ":" + e);
      return true
    }
  })
};
AC.Element.getVendorPrefixStyle = function (a, d) {
  if (typeof d !== "string") {
    throw new TypeError("AC.Element.getVendorPrefixStyle: property must be a string")
  }
  a = AC.Element.getElementById(a);
  var c = ["", "webkit", "Moz", "ms", "O"];
  var b;
  d = d.replace(/-(webkit|moz|ms|o)-/i, "");
  d = d.replace(/^(webkit|Moz|ms|O)/, "").charAt(0).toLowerCase() + d.slice(1);
  d = d.replace(/-(\w)/, function (e, f) {
    return f.toUpperCase()
  });
  c.some(function (f, e) {
    var g = (f === "") ? d : f + d.charAt(0).toUpperCase() + d.slice(1);
    if (g in a.style) {
      b = AC.Element.getStyle(a, g);
      return true
    }
  });
  return b
};
AC.Element.insert = function (b, c, a) {
  if (!b || !(b.nodeType === 1 || b.nodeType === 3 || b.nodeType === 11)) {
    throw"AC.Element.insert: element must be a valid node of type element, text, or document fragment"
  }
  if (!c || !(c.nodeType === 1 || c.nodeType === 11)) {
    throw"AC.Element.insert: target must be a valid node of type element or document fragment"
  }
  switch (a) {
    case"before":
      if (c.nodeType === 11) {
        throw"AC.Element.insert: target cannot be nodeType of documentFragment when using placement ‘before’"
      }
      c.parentNode.insertBefore(b, c);
      break;
    case"after":
      if (c.nodeType === 11) {
        throw"AC.Element.insert: target cannot be nodeType of documentFragment when using placement ‘after’"
      }
      c.parentNode.insertBefore(b, c.nextSibling);
      break;
    case"first":
      c.insertBefore(b, c.firstChild);
      break;
    default:
      c.appendChild(b)
  }
};
AC.Element.remove = function (a, c) {
  if (!AC.Element.isElement(a)) {
    throw"AC.Element.remove: element must be a valid DOM element"
  }
  if (c === true) {
    var b = a.parentNode.removeChild(a);
    return b
  } else {
    a.parentNode.removeChild(a)
  }
};
var AC = window.AC || {};
AC.Event = AC.Event || {};
AC.Event.stop = function (a) {
  if (!a) {
    a = window.event
  }
  if (a.stopPropagation) {
    a.stopPropagation()
  } else {
    a.cancelBubble = true
  }
  if (a.preventDefault) {
    a.preventDefault()
  }
  a.stopped = true;
  a.returnValue = false
};
AC.Event.target = function (a) {
  return(typeof a.target !== "undefined") ? a.target : a.srcElement
};
AC.Event.Keys = {UP: 38, DOWN: 40, LEFT: 37, RIGHT: 39, ESC: 27, SPACE: 32, BACKSPACE: 8, DELETE: 46, END: 35, HOME: 36, PAGEDOWN: 34, PAGEUP: 33, RETURN: 13, TAB: 9};
var AC = window.AC || {};
AC.Function = AC.Function || {};
AC.Function.emptyFunction = function () {
};
AC.Function.bindAsEventListener = function (a, c) {
  var b = AC.Array.toArray(arguments).slice(2);
  return function (d) {
    return a.apply(c, [d || window.event].concat(b))
  }
};
AC.Function.getParamNames = function (b) {
  var a = b.toString();
  return a.slice(a.indexOf("(") + 1, a.indexOf(")")).match(/([^\s,]+)/g) || []
};
(function () {
  var a = ["abbr", "article", "aside", "command", "details", "figcaption", "figure", "footer", "header", "hgroup", "mark", "meter", "nav", "output", "progress", "section", "summary", "time"];
  a.forEach(function (b) {
    document.createElement(b)
  })
}());
(function () {
  if (window.attachEvent) {
    var b = function () {
      var f = document.compatible;
      var h = !f ? 7 : undefined;
      var e;
      var g;
      var d = [];
      if (f) {
        e = f.length;
        if (e === 0) {
          h = parseInt(document.documentMode, 10)
        }
        if (e > 0) {
          for (g = 0; g < e; g += 1) {
            d.push(parseInt(f[g].version.match(/\d{1,2}/), 10))
          }
          d = d.sort(function (j, i) {
            return j - i
          });
          h = d.pop()
        }
      }
      return h
    };
    var c = b();
    if (c <= 8) {
      AC.Element.__setOpacityIE = function (d, e) {
        e = (e > 1) ? 1 : ((e < 0.00001) ? 0 : e) * 100;
        alphaFilter = d.filters["DXImageTransform.Microsoft.Alpha"] || d.filters.Alpha;
        if (alphaFilter) {
          alphaFilter.Opacity = e
        } else {
          d.style.filter += " progid:DXImageTransform.Microsoft.Alpha(Opacity=" + e + ")"
        }
        return d
      }
    }
    var a = function () {
      if (document.body.currentStyle) {
        var i;
        var f;
        var e;
        var d;
        var h = [];
        var g;
        AC.Element.selectAll("a > * > img").forEach(function (j) {
          i = j.parentNode;
          f = j.parentNode.parentNode;
          if (i.currentStyle.hasLayout && j.height > 0 && j.width > 0) {
            if (!AC.Element.select("ieclickbooster", f)) {
              e = document.createElement("ieclickbooster");
              d = AC.Element.getStyle(f, "position");
              if (d === "static") {
                AC.Element.setStyle(f, {position: "relative"})
              }
              AC.Element.selectAll("> *", f).forEach(function (k) {
                var l = parseInt(k.currentStyle.zIndex, 10);
                if (l > 0) {
                  h.push(l)
                }
              });
              h.sort(function (l, k) {
                return k - l
              });
              g = h[0] ? h[0].toString() : "1";
              AC.Element.insert(e, f);
              AC.Element.setStyle(e, {display: "block", position: "absolute", top: "0", bottom: "0", left: "0", right: "0", background: "url(/global/elements/blank.gif)", cursor: "pointer", zIndex: g})
            }
          }
        })
      }
    };
    if (typeof window.getComputedStyle !== "function") {
      AC.Element.__getStyleIE = function (f, g) {
        f = AC.Element.getElementById(f);
        var e;
        var d;
        var h;
        if (f.currentStyle) {
          g = g === "float" ? "styleFloat" : g;
          e = f.currentStyle;
          if (g === "opacity") {
            d = f.filters["DXImageTransform.Microsoft.Alpha"] || f.filters.Alpha;
            if (d) {
              return parseFloat(d.Opacity / 100)
            }
            return 1
          }
          h = e[g] || null;
          return h === "auto" ? null : h
        }
      }
    }
    ac_domready(function () {
      if (c <= 7) {
        a()
      }
    })
  }
}());
var AC = window.AC || {};
AC.Object = AC.Object || {};
if (Object.extend) {
  AC.Object.extend = Object.extend
} else {
  AC.Object.extend = function extend (a, c) {
    var b;
    for (b in c) {
      if (c.hasOwnProperty(b)) {
        a[b] = c[b]
      }
    }
    return a
  }
}
if (Object.clone) {
  AC.Object.clone = Object.clone
} else {
  AC.Object.clone = function clone (a) {
    return AC.Object.extend({}, a)
  }
}
if (Object.getPrototypeOf) {
  AC.Object.getPrototypeOf = Object.getPrototypeOf
} else {
  if (typeof this.__proto__ === "object") {
    AC.Object.getPrototypeOf = function getPrototypeOf (a) {
      return a.__proto__
    }
  } else {
    AC.Object.getPrototypeOf = function getPrototypeOf (c) {
      var a = c.constructor;
      var b;
      if (Object.prototype.hasOwnProperty.call(c, "constructor")) {
        b = a;
        if (!(delete c.constructor)) {
          return null
        }
        a = c.constructor;
        c.constructor = b
      }
      return a ? a.prototype : null
    }
  }
}
var AC = window.AC || {};
AC.RegExp = AC.RegExp || {};
AC.RegExp.isRegExp = function (a) {
  return(a.constructor.name === "RegExp")
};
var AC = window.AC || {};
AC.String = AC.String || {};
AC.String.isString = function (a) {
  return(typeof a === "string")
};
AC.String.toCamelCase = function (a) {
  if (typeof a !== "string") {
    throw"Argument must be of type String."
  }
  return a.replace(/-+(.)?/g, function (b, c) {
    return c ? c.toUpperCase() : ""
  })
};
var AC = window.AC || {};
AC.Object.extend(AC, {uid: function ac_uid () {
  if (!AC._uid) {
    AC._uid = 0
  }
  return AC._uid++
}, namespace: function ac_namespace (c) {
  var a;
  if (!(c && c.match && c.match(/\S/))) {
    throw"Attempt to create AC.namespace with no name."
  }
  var b = c.split(/\./);
  var d = window;
  for (a = 0; a < b.length; a++) {
    d[b[a]] = d[b[a]] || {};
    d = d[b[a]]
  }
}, bindEventListeners: function ac_bindEventListeners (c, d, b) {
  var e;
  d = AC.Element.getElementById(d);
  if (!AC.Element.isElement(d)) {
    throw"Invalid or non-existent element passed to bindEventListeners."
  }
  for (e in b) {
    if (b.hasOwnProperty(e)) {
      var a = b[e];
      if (typeof a === "function") {
        AC.Element.addEventListener(d, e, AC.Function.bindAsEventListener(a, c))
      } else {
        if (typeof a === "string") {
          AC.Element.addEventListener(d, e, AC.Function.bindAsEventListener(c[a], c))
        }
      }
    }
  }
}});
(function (d, e) {
  function c (g) {
    return g.map(function (h) {
      return b(h)
    })
  }

  var a, b, f;
  b = function (h, i) {
    var g;
    return"string" == typeof h ? g = a[h] : "function" == typeof i && Array.isArray(h) ? i.apply(e, c(h)) : void 0
  }, b.version = "1.0.0", b.config = function () {
  }, f = function (g, i, h) {
    a[g] || (h || (h = i), a[g] = "function" == typeof h && Array.isArray(i) ? h.apply(h, c(i)) : "function" == typeof h ? h() : h)
  }, f.amd = {}, b._init = function () {
    a = {}, f("require", [], function () {
      return b
    })
  }, b.getRegisteredModules = function () {
    return Object.getOwnPropertyNames(a).sort()
  }, b._init(), d.require = d.require || b, d.define = d.define || f
})(this.AC || this, this);
AC.define("defer/core/Deferred", ["require"], function () {
  function b () {
  }

  return b.prototype = {resolve: function c () {
    return this._defer.resolve.apply(this._defer, Array.prototype.slice.call(arguments)), this.promise()
  }, reject: function e () {
    return this._defer.reject.apply(this._defer, Array.prototype.slice.call(arguments)), this.promise()
  }, progress: function a () {
    return this._defer.progress.apply(this._defer, Array.prototype.slice.call(arguments)), this.promise()
  }, then: function f () {
    return this._defer.then.apply(this._defer, Array.prototype.slice.call(arguments)), this.promise()
  }, promise: function d () {
    return this._defer.promise.apply(this._defer, Array.prototype.slice.call(arguments))
  }}, b
}), AC.define("defer/lib/Deferred", [], function () {
  var d, l, m, c, j, i;
  d = {0: "pending", 1: "resolved", 2: "rejected"}, l = function (q, s) {
    var p, t, r, o, n;
    if (0 !== this._status) {
      return console && console.warn && console.warn("Trying to fulfill more than once."), !1
    }
    for (this.data = s, t = this.pending, r = t.length, p = 0; r > p; p++) {
      o = t[p], o[q] && (n = o[q](s)), "object" == typeof n && n.hasOwnProperty("then") && n.hasOwnProperty("status") ? n.then(function (u) {
        o.deferred.resolve(u)
      }, function (u) {
        o.deferred.reject(u)
      }, function (u) {
        o.deferred.progress(u)
      }) : o.deferred[q](n || void 0)
    }
    return"progress" !== q && (t = []), !0
  }, i = function (o, n) {
    this.then = o, this.status = n
  }, c = function (n) {
    return"function" != typeof n ? function () {
    } : n
  }, m = function (p, o, n) {
    this.resolve = c(p), this.reject = c(o), this.progress = c(n), this.deferred = new j()
  }, j = function () {
    this.pending = [], this._status = 0, this._promise = new i(this.then.bind(this), this.status.bind(this))
  }, j.prototype = {status: function a () {
    return d[this._status]
  }, promise: function h () {
    return this._promise
  }, progress: function e (n) {
    return l.call(this, "progress", n), this._promise
  }, resolve: function f (n) {
    return l.call(this, "resolve", n), 0 === this._status && (this._status = 1), this._promise
  }, reject: function k (n) {
    return l.call(this, "reject", n), 0 === this._status && (this._status = 2), this._promise
  }, then: function b (r, p, o) {
    var n, q;
    return q = new m(r, p, o), 0 === this._status ? this.pending.push(q) : 1 === this._status && "function" == typeof r ? (n = r(this.data), "object" == typeof n && n.hasOwnProperty("then") && n.hasOwnProperty("status") ? n.then(function (s) {
      q.deferred.resolve(s)
    }, function (s) {
      q.deferred.reject(s)
    }, function (s) {
      q.deferred.progress(s)
    }) : q.deferred.resolve(n)) : 2 === this._status && "function" == typeof p && (n = p(this.data), q.deferred.reject(n)), q.deferred.promise()
  }};
  var g = function () {
    var p, o, r, q, n;
    return p = [].slice.call(arguments), o = new j(), r = 0, q = function (t) {
      r--;
      var s = p.indexOf(this);
      p[s] = t, 0 === r && o.resolve(p)
    }, n = function (s) {
      o.reject(s)
    }, p.forEach(function (s) {
      s.then && (r++, s.then(q.bind(s), n))
    }), o.promise()
  };
  return j.when = g, j
}), AC.define("defer/Deferred", ["require", "defer/core/Deferred", "defer/lib/Deferred"], function (b) {
  function a () {
    this._defer = new c()
  }

  var d = new (b("defer/core/Deferred"))(), c = b("defer/lib/Deferred");
  return a.prototype = d, a.join = function () {
    return c.when.apply(null, [].slice.call(arguments))
  }, a.all = function (e) {
    return c.when.apply(null, e)
  }, a
}), AC.define("animationTimeout/AnimationTimeout", ["require", "defer/Deferred"], function (b) {
  function c (f, g, e) {
    this.duration = f, g && (this._intervalFunction = g), e && (this._cancelFunction = e), this._update = this._update.bind(this)
  }

  var d, a = b("defer/Deferred");
  return d = c.prototype, d._intervalFunction = window.requestAnimationFrame.bind(window), d._cancelFunction = window.cancelAnimationFrame.bind(window), d._update = function (e) {
    this._startTime = this._startTime || e, this._progress = (e - this._startTime) / this.duration, 1 > this._progress ? (this._defer.progress(this._progress), this._requestID = this._intervalFunction(this._update)) : (this._progress = 1, this._defer.progress(1), this._defer.resolve(1))
  }, d.start = function () {
    return this._defer = new a(), this._startTime = 0, this._requestID = this._intervalFunction(this._update), this._defer.promise()
  }, d.cancel = function () {
    this._cancelFunction(this._requestID), this._defer.reject()
  }, c
}), AC.define("assetLoader/AssetLoader", ["require", "defer/Deferred"], function (c) {
  function b (i, h) {
    this._assetsToLoad = [].concat(i), this._type = h || "img"
  }

  var a = c("defer/Deferred");
  return b.prototype = {load: function d () {
    return this._assetsLoaded = [], this._assetsCountLoaded = 0, this._defer = new a(), this._failure = !1, this._assetsToLoad.forEach(this._loadAsset.bind(this)), this._defer.promise()
  }, _progress: function e (h) {
    this._defer.progress(this._assetsLoaded[h.target._id] = h.target), this._assetsCountLoaded += 1, this._assetsCountLoaded === this._assetsToLoad.length && this._defer.resolve(this._assetsLoaded)
  }, _error: function g (h) {
    this._failure = !0, this._defer.reject(h.target)
  }, _loadAsset: function f (i, j) {
    var h;
    this._failure || (h = document.createElement(this._type), h._id = j, h.onload = this._progress.bind(this), h.onerror = this._error.bind(this), h.src = i)
  }}, b
}), AC.define("ajax/Ajax", ["require", "defer/Deferred"], function (b) {
  function d () {
    var f = !1;
    try {
      f = new XMLHttpRequest()
    } catch (g) {
      try {
        f = new ActiveXObject("Msxml2.XMLHTTP")
      } catch (g) {
        try {
          f = new ActiveXObject("Microsoft.XMLHTTP")
        } catch (g) {
          f = !1
        }
      }
    }
    return f
  }

  function e (f) {
    f && (this.timeout = f)
  }

  var c, a = b("defer/Deferred");
  return c = e.prototype, c.timeout = 5000, c.xhrMethod = function (m, g, i, l) {
    var k, h = d(), f = new a();
    l = l || {}, h.open(m, g, !1), Object.keys(l).forEach(function (n) {
      h.setRequestHeader(n, l[n])
    }), k = setTimeout(function () {
      h.abort(), f.reject()
    }, this.timeout), h.onreadystatechange = function () {
      4 === h.readyState && (clearTimeout(k), h.status >= 200 && 300 > h.status ? f.resolve(h) : f.reject(h))
    };
    try {
      h.send(i)
    } catch (j) {
      clearTimeout(k), h.abort()
    }
    return f.promise()
  }, c.post = function (f, g, h) {
    return this.xhrMethod("POST", f, g, h)
  }, c.get = function (f, g, h) {
    return this.xhrMethod("GET", f, g, h)
  }, e
});
AC.Object.extend(AC, {onDOMReady: ac_domready});
AC.windowHasLoaded = false;
AC.Element.addEventListener(window, "load", function () {
  AC.windowHasLoaded = true
});
AC.namespace("AC.Synthesize");
AC.Synthesize.synthesize = function (c) {
  if (typeof c !== "object") {
    c = this
  }
  var b, a;
  for (a in c) {
    if (c.hasOwnProperty(a)) {
      if (a.charAt(0) === "_" && a.charAt(1) !== "_") {
        if (typeof c[a] !== "function") {
          this.__synthesizeGetter(a, c);
          this.__synthesizeSetter(a, c)
        }
      }
    }
  }
};
AC.Synthesize.__synthesizeGetter = function (a, b) {
  var c = a.slice(1, a.length);
  if (typeof b[c] === "undefined") {
    b[c] = function () {
      return b[a]
    }
  }
};
AC.Synthesize.__synthesizeSetter = function (a, b) {
  var c = a.slice(1, a.length);
  c = "set" + c.slice(0, 1).toUpperCase() + c.slice(1, c.length);
  if (typeof b[c] === "undefined") {
    b[c] = function (d) {
      b[a] = d
    }
  }
};
AC.namespace("AC.Object");
AC.Object.synthesize = function (a) {
  if (typeof a === "object") {
    AC.Object.extend(a, AC.Object.clone(AC.Synthesize));
    a.synthesize();
    return a
  } else {
    throw"Argument supplied was not a valid object."
  }
};
AC.Class = function () {
  var a = AC.Array.toArray(arguments);
  var e = (typeof a[0] === "function") ? a.shift() : null;
  var d = a.shift() || {};
  var c;
  var b = function () {
    var f;
    var g;
    f = ((typeof this.initialize === "function" && b.__shouldInitialize !== false) ? this.initialize.apply(this, arguments) : false);
    if (f === AC.Class.Invalidate) {
      g = function () {
        try {
          if (this && this._parentClass && this._parentClass._sharedInstance === this) {
            this._parentClass._sharedInstance = null
          }
        } catch (h) {
          throw h
        }
      };
      window.setTimeout(g.bind(this), 200)
    }
  };
  b.__superclass = e;
  if (e) {
    if (e.__superclass) {
      c = AC.Class(e.__superclass, e.prototype)
    } else {
      c = AC.Class(e.prototype)
    }
    c.__shouldInitialize = false;
    b.prototype = new c();
    AC.Object.extend(b.prototype, d);
    AC.Class.__wrapSuperMethods(b)
  } else {
    b.prototype = d
  }
  b.sharedInstance = function () {
    if (!b._sharedInstance) {
      b._sharedInstance = new b();
      b._sharedInstance._parentClass = b
    }
    return b._sharedInstance
  };
  AC.Object.synthesize(b.prototype);
  b.autocreate = d.__instantiateOnDOMReady || false;
  delete d.__instantiateOnDOMReady;
  if (b.autocreate) {
    AC.onDOMReady(function () {
      if (b.autocreate) {
        b.sharedInstance()
      }
    })
  }
  return b
};
AC.Class.__wrapSuperMethods = function (d) {
  var c = d.prototype;
  var b = d.__superclass.prototype;
  var e;
  for (e in c) {
    if (c.hasOwnProperty(e)) {
      if (typeof c[e] === "function") {
        var a = c[e];
        var f = AC.Function.getParamNames(a);
        if (f[0] === "$super") {
          c[e] = (function (h, g) {
            var i = b[h];
            return function j () {
              var k = AC.Array.toArray(arguments);
              return g.apply(this, [i.bind(this)].concat(k))
            }
          }(e, a))
        }
      }
    }
  }
  return this
};
AC.Class.Invalidate = function () {
  return false
};
AC.namespace("AC.Ajax");
AC.Ajax.getTransport = function () {
  var a = false;
  try {
    a = new XMLHttpRequest()
  } catch (b) {
    try {
      a = new ActiveXObject("Msxml2.XMLHTTP")
    } catch (b) {
      try {
        a = new ActiveXObject("Microsoft.XMLHTTP")
      } catch (b) {
        a = false
      }
    }
  }
  return a
};
AC.Ajax.AjaxTracker = AC.Class();
AC.Ajax.AjaxTracker.prototype = {_responders: [], initialize: function ac_initialize () {
}, addResponder: function ac_addResponder (a) {
  this._responders.push(a)
}, removeResponder: function ac_removeResponder (a) {
  var c = 0, b = this._responders.length;
  for (c = 0; c < b; c += 1) {
    if (this._responders[c] === a) {
      a = null;
      this._responders.splice(c, 1);
      return true
    }
  }
  return false
}};
AC.Ajax.AjaxRequest = AC.Class();
AC.Ajax.AjaxRequest.prototype = {__defaultOptions: {method: "get"}, initialize: function ac_initialize (b, a) {
  this._transport = AC.Ajax.getTransport();
  this._mimeTypeOverride = null;
  this._options = null;
  AC.Object.synthesize(this);
  this.setOptions(AC.Object.extend(AC.Object.clone(this.__defaultOptions), a || {}));
  AC.Ajax.AjaxTracker.sharedInstance().addResponder(this);
  this.transport().onreadystatechange = this._handleTransportStateChange.bind(this);
  this.transport().open(this.options().method, b, true);
  this.transport().setRequestHeader("Content-Type", this.options().contentType);
  this.transport().send(null)
}, _handleTransportStateChange: function ac__handleTransportStateChange () {
  if (this.transport().readyState === 4) {
    var a = new AC.Ajax.AjaxResponse(this)
  }
}, overrideMimeType: function ac_overrideMimeType (a) {
  this._mimeTypeOverride = a;
  if (this.transport().overrideMimeType) {
    this.transport().overrideMimeType(a)
  }
}};
AC.Ajax.AjaxResponse = AC.Class();
AC.Ajax.AjaxResponse.prototype = {_request: null, _transport: null, initialize: function ac_initialize (b) {
  var a = false, c = b.transport();
  this._transport = c;
  this._request = b;
  if (c.readyState === 4) {
    if (c.status >= 200 && c.status < 300) {
      b.options().onSuccess ? b.options().onSuccess(this) : AC.Function.emptyFunction();
      a = true
    }
    if (c.status >= 400 && c.status < 500) {
      b.options().onFailure ? b.options().onFailure(this) : AC.Function.emptyFunction();
      a = true
    }
    if (c.status >= 300 && c.status < 400) {
      a = true
    }
    if ((c.status >= 500 && c.status < 600) || c.status === 0) {
      b.options().onError ? b.options().onError(this) : AC.Function.emptyFunction();
      a = true
    }
  }
  if (a === true) {
    b.options().onComplete ? b.options().onComplete(this) : AC.Function.emptyFunction();
    AC.Ajax.AjaxTracker.sharedInstance().removeResponder(b)
  }
}, responseText: function ac_responseText () {
  return this._transport.responseText
}, responseXML: function ac_responseXML () {
  return this._transport.responseXML
}, responseJSON: function ac_responseJSON () {
  return JSON.parse ? JSON.parse(this._transport.responseText) : (new Function("return " + this._transport.responseText)())
}};
AC.Ajax.checkURL = function (a, c) {
  var b = AC.Ajax.getTransport();
  b.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (typeof c === "function") {
        c(this.status === 200)
      }
    }
  };
  b.open("HEAD", a, true);
  b.send(null)
};
AC.Ajax.AjaxRequest.prototype._overrideMimeType = null;
AC.Ajax.AjaxRequest.prototype.overrideMimeType = function (a) {
  this._overrideMimeType = a;
  if (this.transport.overrideMimeType) {
    this.transport.overrideMimeType(a)
  }
};
AC.namespace("AC.Environment");
AC.namespace("AC.Environment.Browser");
(function (d) {
  var f;
  var g;
  var c;
  var b;
  var a;
  var e;
  f = [
    {string: window.navigator.userAgent, subString: "Chrome", identity: "Chrome"},
    {string: window.navigator.userAgent, subString: "OmniWeb", versionSearch: "OmniWeb/", identity: "OmniWeb"},
    {string: window.navigator.userAgent, subString: /mobile\/[^\s]*\ssafari\//i, identity: "Safari Mobile", versionSearch: "Version"},
    {string: window.navigator.vendor, subString: "Apple", identity: "Safari", versionSearch: "Version"},
    {prop: window.opera, identity: "Opera", versionSearch: "Version"},
    {string: window.navigator.vendor, subString: "iCab", identity: "iCab"},
    {string: window.navigator.vendor, subString: "KDE", identity: "Konqueror"},
    {string: window.navigator.userAgent, subString: "Firefox", identity: "Firefox"},
    {string: window.navigator.vendor, subString: "Camino", identity: "Camino"},
    {string: window.navigator.userAgent, subString: "Netscape", identity: "Netscape"},
    {string: window.navigator.userAgent, subString: "MSIE", identity: "IE", versionSearch: "MSIE"},
    {string: window.navigator.userAgent, subString: "Gecko", identity: "Mozilla", versionSearch: "rv"},
    {string: window.navigator.userAgent, subString: "Mozilla", identity: "Netscape", versionSearch: "Mozilla"}
  ];
  g = [
    {string: window.navigator.platform, subString: "Win", identity: "Windows", versionSearch: "Windows NT"},
    {string: window.navigator.platform, subString: "Mac", identity: "OS X"},
    {string: window.navigator.userAgent, subString: "iPhone", identity: "iOS", versionSearch: "iPhone OS"},
    {string: window.navigator.userAgent, subString: "iPad", identity: "iOS", versionSearch: "CPU OS"},
    {string: window.navigator.userAgent, subString: /android/i, identity: "Android"},
    {string: window.navigator.platform, subString: "Linux", identity: "Linux"}
  ];
  c = function (l) {
    var j;
    var k;
    var h;
    for (h = 0; h < l.length; h += 1) {
      j = l[h].string;
      k = l[h].prop;
      e = l[h].versionSearch || l[h].identity;
      if (j) {
        if (AC.RegExp.isRegExp(l[h].subString) && !!j.match(l[h].subString)) {
          return l[h].identity
        } else {
          if (j.indexOf(l[h].subString) !== -1) {
            return l[h].identity
          }
        }
      } else {
        if (k) {
          return l[h].identity
        }
      }
    }
  };
  b = function (i) {
    var h = i.indexOf(e);
    if (h === -1) {
      return
    }
    return parseFloat(i.substring(h + e.length + 1))
  };
  a = function (i) {
    var j = new RegExp(e + " ([\\d_\\.]+)", "i");
    var h = i.match(j);
    if (h === null) {
      return
    }
    return h[1].replace(/_/g, ".")
  };
  d.name = c(f) || undefined;
  d.version = b(window.navigator.userAgent) || b(window.navigator.appVersion) || undefined;
  d.os = c(g) || undefined;
  d.osVersion = a(window.navigator.userAgent) || a(window.navigator.appVersion) || undefined;
  d.lowerCaseUserAgent = navigator.userAgent.toLowerCase();
  return d
}(AC.Environment.Browser));
AC.Environment.Browser.isWebKit = function () {
  return !!this.lowerCaseUserAgent.match(/applewebkit/)
};
AC.namespace("AC.Environment.Feature");
(function () {
  var c = null;
  var d = null;
  var a = null;
  var b = null;
  AC.Environment.Feature.isCSSAvailable = function (e) {
    AC.log("AC.Environment.Feature.isCSSAvailable is deprecated. Please use AC.Environment.Feature.cssPropertyAvailable instead.");
    return this.cssPropertyAvailable(e)
  };
  AC.Environment.Feature.cssPropertyAvailable = function (o) {
    if (c === null) {
      c = document.createElement("browserdetect").style
    }
    if (d === null) {
      d = ["-webkit-", "-moz-", "-o-", "-ms-", "-khtml-", ""]
    }
    if (a === null) {
      a = ["Webkit", "Moz", "O", "ms", "Khtml", ""]
    }
    if (b === null) {
      b = {}
    }
    o = o.replace(/([A-Z]+)([A-Z][a-z])/g, "$1\\-$2").replace(/([a-z\d])([A-Z])/g, "$1\\-$2").replace(/^(\-*webkit|\-*moz|\-*o|\-*ms|\-*khtml)\-/, "").toLowerCase();
    switch (o) {
      case"gradient":
        if (b.gradient !== undefined) {
          return b.gradient
        }
        o = "background-image:";
        var m = "gradient(linear,left top,right bottom,from(#9f9),to(white));";
        var l = "linear-gradient(left top,#9f9, white);";
        c.cssText = (o + d.join(m + o) + d.join(l + o)).slice(0, -o.length);
        b.gradient = (c.backgroundImage.indexOf("gradient") !== -1);
        return b.gradient;
      case"inset-box-shadow":
        if (b["inset-box-shadow"] !== undefined) {
          return b["inset-box-shadow"]
        }
        o = "box-shadow:";
        var n = "#fff 0 1px 1px inset;";
        c.cssText = d.join(o + n);
        b["inset-box-shadow"] = (c.cssText.indexOf("inset") !== -1);
        return b["inset-box-shadow"];
      default:
        var k = o.split("-");
        var e = k.length;
        var h;
        var g;
        var f;
        if (k.length > 0) {
          o = k[0];
          for (g = 1; g < e; g += 1) {
            o += k[g].substr(0, 1).toUpperCase() + k[g].substr(1)
          }
        }
        h = o.substr(0, 1).toUpperCase() + o.substr(1);
        if (b[o] !== undefined) {
          return b[o]
        }
        for (f = a.length - 1; f >= 0; f -= 1) {
          if (c[a[f] + o] !== undefined || c[a[f] + h] !== undefined) {
            b[o] = true;
            return true
          }
        }
        return false
    }
  }
}());
AC.Environment.Feature.supportsThreeD = function () {
  AC.log("AC.Environment.Feature.supportsThreeD is deprecated. Please use AC.Environment.Feature.threeDTransformsAvailable instead.");
  return this.threeDTransformsAvailable()
};
AC.Environment.Feature.threeDTransformsAvailable = function () {
  if (typeof this._threeDTransformsAvailable !== "undefined") {
    return this._threeDTransformsAvailable
  }
  var c;
  try {
    this._threeDTransformsAvailable = false;
    if (window.hasOwnProperty("styleMedia")) {
      this._threeDTransformsAvailable = window.styleMedia.matchMedium("(-webkit-transform-3d)")
    } else {
      if (window.hasOwnProperty("media")) {
        this._threeDTransformsAvailable = window.media.matchMedium("(-webkit-transform-3d)")
      }
    }
    if (!this._threeDTransformsAvailable) {
      if (!document.getElementById("supportsThreeDStyle")) {
        var a = document.createElement("style");
        a.id = "supportsThreeDStyle";
        a.textContent = "@media (transform-3d),(-o-transform-3d),(-moz-transform-3d),(-ms-transform-3d),(-webkit-transform-3d) { #supportsThreeD { height:3px } }";
        document.querySelector("head").appendChild(a)
      }
      if (!(c = document.querySelector("#supportsThreeD"))) {
        c = document.createElement("div");
        c.id = "supportsThreeD";
        document.body.appendChild(c)
      }
      this._threeDTransformsAvailable = (c.offsetHeight === 3)
    }
    return this._threeDTransformsAvailable
  } catch (b) {
    return false
  }
};
AC.Environment.Feature.supportsCanvas = function () {
  AC.log("AC.Environment.Feature.supportsCanvas is deprecated. Please use AC.Environment.Feature.canvasAvailable instead.");
  return this.canvasAvailable()
};
AC.Environment.Feature.canvasAvailable = function () {
  if (typeof this._canvasAvailable !== "undefined") {
    return this._canvasAvailable
  }
  var a = document.createElement("canvas");
  this._canvasAvailable = !!(typeof a.getContext === "function" && a.getContext("2d"));
  return this._canvasAvailable
};
AC.Environment.Feature.localStorageAvailable = function () {
  if (typeof this._localStorageAvailable !== "undefined") {
    return this._localStorageAvailable
  }
  try {
    if (typeof window.localStorage !== "undefined" && typeof window.localStorage.setItem === "function") {
      window.localStorage.setItem("ac_environment_feature", "test");
      this._localStorageAvailable = true;
      window.localStorage.removeItem("ac_environment_feature", "test")
    } else {
      this._localStorageAvailable = false
    }
  } catch (a) {
    this._localStorageAvailable = false
  }
  return this._localStorageAvailable
};
AC.Environment.Feature.sessionStorageAvailable = function () {
  if (typeof this._sessionStorageAvailable !== "undefined") {
    return this._sessionStorageAvailable
  }
  try {
    if (typeof window.sessionStorage !== "undefined" && typeof window.sessionStorage.setItem === "function") {
      window.sessionStorage.setItem("ac_browser_detect", "test");
      this._sessionStorageAvailable = true;
      window.sessionStorage.removeItem("ac_browser_detect", "test")
    } else {
      this._sessionStorageAvailable = false
    }
  } catch (a) {
    this._sessionStorageAvailable = false
  }
  return this._sessionStorageAvailable
};
AC.Environment.Feature.cookiesAvailable = function () {
  if (typeof this._cookiesAvailable !== "undefined") {
    return this._cookiesAvailable
  }
  this._cookiesAvailable = (document.hasOwnProperty("cookie") && !!navigator.cookieEnabled) ? true : false;
  return this._cookiesAvailable
};
AC.Environment.Feature.__normalizedScreenWidth = function () {
  if (typeof window.orientation === "undefined") {
    return window.screen.width
  }
  return window.screen.width < window.screen.height ? window.screen.width : window.screen.height
};
AC.Environment.Feature.touchAvailable = function () {
  return typeof window.ontouchstart !== "undefined"
};
AC.Environment.Feature.isDesktop = function () {
  if (!this.touchAvailable() && !window.orientation) {
    return true
  }
  return false
};
AC.Environment.Feature.isHandheld = function () {
  return !this.isDesktop() && !this.isTablet()
};
AC.Environment.Feature.isTablet = function () {
  return !this.isDesktop() && this.__normalizedScreenWidth() > 480
};
AC.Environment.Feature.isRetina = function () {
  var a = ["min-device-pixel-ratio:1.5", "-webkit-min-device-pixel-ratio:1.5", "min-resolution:1.5dppx", "min-resolution:144dpi", "min--moz-device-pixel-ratio:1.5"];
  var b;
  if (window.devicePixelRatio !== undefined) {
    if (window.devicePixelRatio >= 1.5) {
      return true
    }
  } else {
    for (b = 0; b < a.length; b += 1) {
      if (window.matchMedia("(" + a[b] + ")").matches === true) {
        return true
      }
    }
  }
  return false
};
AC.log = (function log () {
  var a = "f7c9180f-5c45-47b4-8de4-428015f096c0";
  var b = (AC.Environment.Feature.localStorageAvailable() && !!window.localStorage.getItem(a));
  return function (c) {
    if (window.console && typeof console.log === "function" && b) {
      console.log(c)
    }
  }
}());
AC.Registry = AC.Class();
AC.Registry.prototype = {__defaultOptions: {contextInherits: [], matchCatchAll: false}, initialize: function ac_initialize (b, a) {
  if (typeof b !== "string") {
    throw"Prefix not defined for Component Registry"
  }
  if (typeof a !== "object") {
    a = {}
  }
  this._options = AC.Object.extend(AC.Object.clone(this.__defaultOptions), a);
  this._prefix = b;
  this._reservedNames = [];
  this.__model = [];
  this.__lookup = {};
  AC.Object.synthesize(this)
}, addComponent: function ac_addComponent (b, d, f, g, c) {
  var e = null;
  var a;
  if (!this.__isReserved(b)) {
    if (typeof b === "string") {
      if (typeof g === "string") {
        e = this.lookup(g)
      }
      if (!e && b !== "_base") {
        e = this.lookup("_base") || this.addComponent("_base")
      }
      if (this.lookup(b)) {
        throw"Cannot overwrite existing Component: " + b
      }
      if (typeof c !== "object") {
        c = {}
      }
      if (typeof c.inherits === "undefined" && Array.isArray(this._options.contextInherits)) {
        c.inherits = this._options.contextInherits
      }
      a = this.__lookup[b] = new AC.Registry.Component(b, d, f, e, c);
      this.__addToModel(a);
      return a
    }
  }
  return null
}, match: function ac_match (b) {
  var a;
  if (a = this.__matchName(b)) {
    return a
  }
  if (a = this.__matchQualifier(b)) {
    return a
  }
  if (this.options().matchCatchAll === true) {
    if (typeof this.__model[1] !== "undefined") {
      if (typeof this.__model[0] !== "undefined") {
        return this.__model[1][0]
      } else {
        throw"Catchall Type not defined"
      }
    } else {
      throw"No non-_base types defined at index 1."
    }
  }
  return null
}, __matchName: function ac___matchName (b) {
  var a, c;
  if (!AC.Element.isElement(b)) {
    return null
  }
  for (a = this.__model.length - 1; a >= 0; a--) {
    if (Array.isArray(this.__model[a])) {
      for (c = this.__model[a].length - 1; c >= 0; c--) {
        if (AC.Element.hasClassName(b, this._prefix + this.__model[a][c].name())) {
          return this.__model[a][c]
        }
      }
    }
  }
  return null
}, __matchQualifier: function ac___matchQualifier (b) {
  var a, c;
  if (!AC.Element.isElement(b)) {
    return null
  }
  for (a = this.__model.length - 1; a >= 0; a--) {
    if (Array.isArray(this.__model[a])) {
      for (c = this.__model[a].length - 1; c >= 0; c--) {
        if (typeof this.__model[a][c].qualifier === "function") {
          if (this.__model[a][c].qualifier.apply(this.__model[a][c], [b, this._prefix]) === true) {
            return this.__model[a][c]
          }
        }
      }
    }
  }
  return null
}, __addToModel: function ac___addToModel (a) {
  if (AC.Registry.Component.isComponent(a)) {
    if (typeof this.__model[a.level()] === "undefined") {
      this.__model[a.level()] = []
    }
    this.__model[a.level()].push(a)
  }
}, lookup: function ac_lookup (a) {
  if (typeof a === "string") {
    if (typeof this.__lookup[a] !== "undefined") {
      return this.__lookup[a]
    }
  }
  return null
}, hasComponent: function ac_hasComponent (a) {
  var b;
  if (typeof a === "object" && typeof a.name === "function") {
    if (b = this.lookup(a.name())) {
      return b === a
    }
  }
  return false
}, reserveName: function ac_reserveName (a) {
  if (typeof a === "string") {
    if (this.lookup(a)) {
      this._reservedNames.push(a)
    } else {
      throw"Cannot reserve name: Component with name already exists."
    }
  } else {
    throw"Cannot reserve name: Name must be a string"
  }
}, __isReserved: function ac___isReserved (a) {
  if (typeof a === "string") {
    return(this._reservedNames.indexOf(a) !== -1)
  } else {
    throw"Cannot check if this name is reserved because it is not a String."
  }
}};
AC.Registry.Component = AC.Class();
AC.Registry.Component.prototype = {initialize: function ac_initialize (a, c, e, d, b) {
  if (typeof a !== "string") {
    throw"Cannot create Component without a name"
  }
  this._name = a;
  this._properties = c || {};
  this.qualifier = typeof e === "function" ? e : AC.Function.emptyFunction;
  this._parent = d;
  this._context = b || {};
  AC.Object.synthesize(this)
}, properties: function ac_properties () {
  var a = (typeof this._parent === "undefined" || this._parent === null) ? {} : this._parent.properties();
  return AC.Object.extend(a, this._properties)
}, context: function ac_context (a) {
  if (this._context[a]) {
    return this._context[a]
  } else {
    if (Array.isArray(this._context.inherits) && this._context.inherits.indexOf[a] !== -1) {
      return(this.parent()) ? this.parent().context(a) : null
    }
  }
  return null
}, level: function ac_level () {
  if (typeof this._level !== "undefined") {
    return this._level
  }
  if (this._name === "_base") {
    return 0
  } else {
    if (typeof this._parent === "undefined" || this._parent.name() === "_base") {
      return 1
    } else {
      return this._parent.level() + 1
    }
  }
}};
AC.Registry.Component.isComponent = function (a) {
  return(a instanceof AC.Registry.Component)
};
AC.namespace("AC.NotificationCenter");
AC.NotificationCenter = (function () {
  var e = {};
  return{publish: function b (i, g, f) {
    g = g || {};
    var h = function () {
      if ((!e[i]) || e[i].length < 1) {
        return
      }
      e[i].forEach(function (j) {
        if (j.target && g.target) {
          if (j.target === g.target) {
            j.callback(g.data)
          }
        } else {
          j.callback(g.data)
        }
      })
    };
    if (typeof window.testtool === "object" && typeof testtool.publishMessage === "function") {
      if (typeof testtool.mDefaults === "object") {
        testtool.mDefaults.messageData = g
      }
      testtool.publishMessage(i)
    }
    if (f === true) {
      window.setTimeout(h, 10)
    } else {
      h()
    }
  }, subscribe: function c (f, h, g) {
    if (!e[f]) {
      e[f] = []
    }
    e[f].push({callback: h, target: g})
  }, unsubscribe: function d (f, h, g) {
    e[f].forEach(function (k, j) {
      if (g) {
        if (h === k.callback && k.target === g) {
          e[f].splice(j, 1)
        }
      } else {
        if (h === k.callback) {
          e[f].splice(j, 1)
        }
      }
    })
  }, hasSubscribers: function a (f, g) {
    if ((!e[f]) || e[f].length < 1) {
      return false
    }
    if (!g) {
      return true
    }
    e[f].forEach(function (h) {
      if (h.target && g) {
        if (h.target === g) {
          return true
        }
      }
    });
    return false
  }}
}());
AC.namespace("AC.Canvas");
AC.Canvas.imageDataFromFile = function (b, c) {
  if (typeof c !== "function") {
    throw"Need callback method to call when imageData is retrieved."
  }
  if (typeof b !== "string" || b === "") {
    throw"Src for imageData must be an Image Node with a src attribute or a string."
  }
  var a = new Image();
  a.onload = function () {
    c(AC.Canvas.imageDataFromNode(a))
  };
  a.src = b
};
AC.Canvas.imageDataFromNode = function (a) {
  if (!AC.Element.isElement(a) || a.getAttribute("src") === "null" || a.width === 0) {
    throw"Source node must be an IMG tag and must have already loaded."
  }
  var d;
  var b = document.createElement("canvas");
  var c = b.getContext("2d");
  b.width = a.width;
  b.height = a.height;
  c.drawImage(a, 0, 0);
  d = c.getImageData(0, 0, a.width, a.height);
  return d
};
AC.EasingFunctions = {linear: function ac_linear (c, a, d, b) {
  return d * c / b + a
}, easeInQuad: function ac_easeInQuad (c, a, d, b) {
  return d * (c /= b) * c + a
}, easeOutQuad: function ac_easeOutQuad (c, a, d, b) {
  return -d * (c /= b) * (c - 2) + a
}, easeInOutQuad: function ac_easeInOutQuad (c, a, d, b) {
  if ((c /= b / 2) < 1) {
    return d / 2 * c * c + a
  }
  return -d / 2 * ((--c) * (c - 2) - 1) + a
}, easeInCubic: function ac_easeInCubic (c, a, d, b) {
  return d * (c /= b) * c * c + a
}, easeOutCubic: function ac_easeOutCubic (c, a, d, b) {
  return d * ((c = c / b - 1) * c * c + 1) + a
}, easeInOutCubic: function ac_easeInOutCubic (c, a, d, b) {
  if ((c /= b / 2) < 1) {
    return d / 2 * c * c * c + a
  }
  return d / 2 * ((c -= 2) * c * c + 2) + a
}, easeInQuart: function ac_easeInQuart (c, a, d, b) {
  return d * (c /= b) * c * c * c + a
}, easeOutQuart: function ac_easeOutQuart (c, a, d, b) {
  return -d * ((c = c / b - 1) * c * c * c - 1) + a
}, easeInOutQuart: function ac_easeInOutQuart (c, a, d, b) {
  if ((c /= b / 2) < 1) {
    return d / 2 * c * c * c * c + a
  }
  return -d / 2 * ((c -= 2) * c * c * c - 2) + a
}, easeInQuint: function ac_easeInQuint (c, a, d, b) {
  return d * (c /= b) * c * c * c * c + a
}, easeOutQuint: function ac_easeOutQuint (c, a, d, b) {
  return d * ((c = c / b - 1) * c * c * c * c + 1) + a
}, easeInOutQuint: function ac_easeInOutQuint (c, a, d, b) {
  if ((c /= b / 2) < 1) {
    return d / 2 * c * c * c * c * c + a
  }
  return d / 2 * ((c -= 2) * c * c * c * c + 2) + a
}, easeInSine: function ac_easeInSine (c, a, d, b) {
  return -d * Math.cos(c / b * (Math.PI / 2)) + d + a
}, easeOutSine: function ac_easeOutSine (c, a, d, b) {
  return d * Math.sin(c / b * (Math.PI / 2)) + a
}, easeInOutSine: function ac_easeInOutSine (c, a, d, b) {
  return -d / 2 * (Math.cos(Math.PI * c / b) - 1) + a
}, easeInExpo: function ac_easeInExpo (c, a, d, b) {
  return(c == 0) ? a : d * Math.pow(2, 10 * (c / b - 1)) + a
}, easeOutExpo: function ac_easeOutExpo (c, a, d, b) {
  return(c == b) ? a + d : d * (-Math.pow(2, -10 * c / b) + 1) + a
}, easeInOutExpo: function ac_easeInOutExpo (c, a, d, b) {
  if (c == 0) {
    return a
  }
  if (c == b) {
    return a + d
  }
  if ((c /= b / 2) < 1) {
    return d / 2 * Math.pow(2, 10 * (c - 1)) + a
  }
  return d / 2 * (-Math.pow(2, -10 * --c) + 2) + a
}, easeInCirc: function ac_easeInCirc (c, a, d, b) {
  return -d * (Math.sqrt(1 - (c /= b) * c) - 1) + a
}, easeOutCirc: function ac_easeOutCirc (c, a, d, b) {
  return d * Math.sqrt(1 - (c = c / b - 1) * c) + a
}, easeInOutCirc: function ac_easeInOutCirc (c, a, d, b) {
  if ((c /= b / 2) < 1) {
    return -d / 2 * (Math.sqrt(1 - c * c) - 1) + a
  }
  return d / 2 * (Math.sqrt(1 - (c -= 2) * c) + 1) + a
}, easeInElastic: function ac_easeInElastic (e, c, g, d) {
  var a = 1.70158;
  var f = 0;
  var b = g;
  if (e == 0) {
    return c
  }
  if ((e /= d) == 1) {
    return c + g
  }
  if (!f) {
    f = d * 0.3
  }
  if (b < Math.abs(g)) {
    b = g;
    var a = f / 4
  } else {
    var a = f / (2 * Math.PI) * Math.asin(g / b)
  }
  return -(b * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * d - a) * (2 * Math.PI) / f)) + c
}, easeOutElastic: function ac_easeOutElastic (e, c, g, d) {
  var a = 1.70158;
  var f = 0;
  var b = g;
  if (e == 0) {
    return c
  }
  if ((e /= d) == 1) {
    return c + g
  }
  if (!f) {
    f = d * 0.3
  }
  if (b < Math.abs(g)) {
    b = g;
    var a = f / 4
  } else {
    var a = f / (2 * Math.PI) * Math.asin(g / b)
  }
  return b * Math.pow(2, -10 * e) * Math.sin((e * d - a) * (2 * Math.PI) / f) + g + c
}, easeInOutElastic: function ac_easeInOutElastic (e, c, g, d) {
  var a = 1.70158;
  var f = 0;
  var b = g;
  if (e == 0) {
    return c
  }
  if ((e /= d / 2) == 2) {
    return c + g
  }
  if (!f) {
    f = d * (0.3 * 1.5)
  }
  if (b < Math.abs(g)) {
    b = g;
    var a = f / 4
  } else {
    var a = f / (2 * Math.PI) * Math.asin(g / b)
  }
  if (e < 1) {
    return -0.5 * (b * Math.pow(2, 10 * (e -= 1)) * Math.sin((e * d - a) * (2 * Math.PI) / f)) + c
  }
  return b * Math.pow(2, -10 * (e -= 1)) * Math.sin((e * d - a) * (2 * Math.PI) / f) * 0.5 + g + c
}, easeInBack: function ac_easeInBack (d, b, e, c, a) {
  if (a == undefined) {
    a = 1.70158
  }
  return e * (d /= c) * d * ((a + 1) * d - a) + b
}, easeOutBack: function ac_easeOutBack (d, b, e, c, a) {
  if (a == undefined) {
    a = 1.70158
  }
  return e * ((d = d / c - 1) * d * ((a + 1) * d + a) + 1) + b
}, easeInOutBack: function ac_easeInOutBack (d, b, e, c, a) {
  if (a == undefined) {
    a = 1.70158
  }
  if ((d /= c / 2) < 1) {
    return e / 2 * (d * d * (((a *= (1.525)) + 1) * d - a)) + b
  }
  return e / 2 * ((d -= 2) * d * (((a *= (1.525)) + 1) * d + a) + 2) + b
}, easeInBounce: function ac_easeInBounce (c, a, d, b) {
  return d - AC.EasingFunctions.easeOutBounce(b - c, 0, d, b) + a
}, easeOutBounce: function ac_easeOutBounce (c, a, d, b) {
  if ((c /= b) < (1 / 2.75)) {
    return d * (7.5625 * c * c) + a
  } else {
    if (c < (2 / 2.75)) {
      return d * (7.5625 * (c -= (1.5 / 2.75)) * c + 0.75) + a
    } else {
      if (c < (2.5 / 2.75)) {
        return d * (7.5625 * (c -= (2.25 / 2.75)) * c + 0.9375) + a
      } else {
        return d * (7.5625 * (c -= (2.625 / 2.75)) * c + 0.984375) + a
      }
    }
  }
}, easeInOutBounce: function ac_easeInOutBounce (c, a, d, b) {
  if (c < b / 2) {
    return AC.EasingFunctions.easeInBounce(c * 2, 0, d, b) * 0.5 + a
  }
  return AC.EasingFunctions.easeOutBounce(c * 2 - b, 0, d, b) * 0.5 + d * 0.5 + a
}};
AC.DeferredQueue = AC.Class({__defaultOptions: {autoplay: false, asynchronous: false, delay: 0}, initialize: function ac_initialize (a) {
  if (typeof a !== "object") {
    a = {}
  }
  this._options = AC.Object.extend(AC.Object.clone(this.__defaultOptions), a);
  this._isPlaying = false;
  this._isRunningAction = false;
  this._queue = [];
  this.didFinish = this.__didFinish.bind(this);
  AC.Object.synthesize(this)
}, add: function ac_add (a) {
  if (typeof a !== "function") {
    throw"Deferred Queue action must be a function."
  }
  this.queue().push(a);
  if (!this.isPlaying() && this.options().autoplay === true) {
    this.start()
  }
}, remove: function ac_remove (a) {
  this.setQueue(AC.Array.without(this.queue(), a))
}, start: function ac_start () {
  if (this.isPlaying()) {
    return false
  }
  this.setIsPlaying(true);
  this.__runNextAction()
}, stop: function ac_stop () {
  if (!this.isPlaying()) {
    return false
  }
  this.setIsPlaying(false)
}, clear: function ac_clear () {
  this.setQueue([]);
  this.stop()
}, __didFinish: function ac___didFinish () {
  this.setIsRunningAction(false);
  this.__runNextAction()
}, __runNextAction: function ac___runNextAction () {
  var a = this;
  if (!this.isPlaying()) {
    return false
  }
  if (this.queue().length && !this.isRunningAction()) {
    var b = this.queue().shift();
    if (typeof b === "function") {
      b();
      if (this.options().asynchronous === true) {
        this.setIsRunningAction(true)
      } else {
        if (typeof this.options().delay === "number" && this.options().delay > 0) {
          window.setTimeout(function () {
            a.__runNextAction()
          }, this.options().delay * 1000)
        } else {
          this.__runNextAction()
        }
      }
    } else {
      this.__runNextAction()
    }
  }
}});
AC.namespace("AC.Viewport");
AC.Viewport.scrollOffsets = function () {
  return{x: window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft, y: window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop}
};
AC.version = "1.4.1";

this["$"] = this["$"] || {};
this["$"]["Fotorama"] = this["$"]["Fotorama"] || {};
this["$"]["Fotorama"]["jst"] = this["$"]["Fotorama"]["jst"] || {};

this["$"]["Fotorama"]["jst"]["style"] = function(v) {
var __t, __p = '', __e = _.escape;
__p += '.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__nav--thumbs .fotorama__nav__frame {\n  padding: ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px ' +
((__t = ( v.thumbMargin / 2 )) == null ? '' : __t) +
'px;\n  width: ' +
((__t = ( v.thumbWidth )) == null ? '' : __t) +
'px;\n  height: ' +
((__t = ( v.thumbHeight )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__thumb {\n  width: ' +
((__t = ( v.thumbWidth )) == null ? '' : __t) +
'px;\n  height: ' +
((__t = ( v.thumbHeight )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__thumb-border {\n  width: ' +
((__t = ( v.thumbWidth - v.thumbMargin * 2 )) == null ? '' : __t) +
'px;\n  height: ' +
((__t = ( v.thumbHeight - v.thumbMargin * 2 )) == null ? '' : __t) +
'px;\n  border-width: ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px;\n  margin-top: ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px;\n  margin-left: ' +
((__t = ( - v.thumbWidth / 2 + v.thumbMargin / 2 )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__wrap--vertical .fotorama__nav--thumbs {\n  width: ' +
((__t = ( v.thumbWidth + v.thumbMargin * 2 )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__wrap--vertical .fotorama__nav__frame {\n  padding: ' +
((__t = ( v.thumbMargin / 2 )) == null ? '' : __t) +
'px ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( v.stamp )) == null ? '' : __t) +
' .fotorama__wrap--vertical .fotorama__thumb-border {\n  margin-left: ' +
((__t = ( v.thumbMargin )) == null ? '' : __t) +
'px;\n  margin-top: ' +
((__t = ( - v.thumbHeight / 2 + v.thumbMargin / 2 )) == null ? '' : __t) +
'px;\n}\n';
return __p
};
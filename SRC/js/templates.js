this["$"] = this["$"] || {};
this["$"]["Fotorama"] = this["$"]["Fotorama"] || {};
this["$"]["Fotorama"]["jst"] = this["$"]["Fotorama"]["jst"] || {};

this["$"]["Fotorama"]["jst"]["style"] = function(obj) {
obj || (obj = {});
var __t, __p = '', __e = _.escape;
with (obj) {
__p += '.fotorama' +
((__t = ( stamp )) == null ? '' : __t) +
' .fotorama__nav--thumbs .fotorama__nav__frame {\n  padding: ' +
((__t = ( thumbMargin )) == null ? '' : __t) +
'px ' +
((__t = ( thumbMargin / 2 )) == null ? '' : __t) +
'px;\n  width: ' +
((__t = ( thumbWidth )) == null ? '' : __t) +
'px;\n  height: ' +
((__t = ( thumbHeight )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( stamp )) == null ? '' : __t) +
' .fotorama__thumb {\n  width: ' +
((__t = ( thumbWidth )) == null ? '' : __t) +
'px;\n  height: ' +
((__t = ( thumbHeight )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( stamp )) == null ? '' : __t) +
' .fotorama__thumb-border {\n  width: ' +
((__t = ( thumbWidth - thumbMargin * 2 )) == null ? '' : __t) +
'px;\n  height: ' +
((__t = ( thumbHeight - thumbMargin * 2 )) == null ? '' : __t) +
'px;\n  border-width: ' +
((__t = ( thumbMargin )) == null ? '' : __t) +
'px;\n  margin-top: ' +
((__t = ( thumbMargin )) == null ? '' : __t) +
'px;\n  margin-left: ' +
((__t = ( - thumbWidth / 2 + thumbMargin / 2 )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( stamp )) == null ? '' : __t) +
' .fotorama__wrap--vertical .fotorama__nav--thumbs {\n  width: ' +
((__t = ( thumbWidth + thumbMargin * 2 )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( stamp )) == null ? '' : __t) +
' .fotorama__wrap--vertical .fotorama__nav__frame {\n  padding: ' +
((__t = ( thumbMargin / 2 )) == null ? '' : __t) +
'px ' +
((__t = ( thumbMargin )) == null ? '' : __t) +
'px;\n}\n.fotorama' +
((__t = ( stamp )) == null ? '' : __t) +
' .fotorama__wrap--vertical .fotorama__thumb-border {\n  margin-left: ' +
((__t = ( thumbMargin )) == null ? '' : __t) +
'px;\n  margin-top: ' +
((__t = ( - thumbHeight / 2 + thumbMargin / 2 )) == null ? '' : __t) +
'px;\n}';

}
return __p
};
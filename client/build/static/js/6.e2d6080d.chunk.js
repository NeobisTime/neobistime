(this.webpackJsonpneobis_time=this.webpackJsonpneobis_time||[]).push([[6],{126:function(e,t,a){"use strict";function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}a.d(t,"a",(function(){return s}))},130:function(e,t,a){e.exports=a.p+"static/media/authentication.3c0df457.svg"},131:function(e,t,a){e.exports=a.p+"static/media/password_eye.66ec5002.svg"},174:function(e,t,a){},312:function(e,t,a){"use strict";a.r(t);var r=a(12),n=a.n(r),s=a(17),c=a(126),i=a(3),l=a(1),o=a.n(l),u=a(130),m=a.n(u),_=(a(174),a(4)),p=a(131),b=a.n(p),h=a(5),f=function(e){var t=Object(l.useState)(""),a=Object(i.a)(t,2),r=a[0],u=a[1],p=Object(l.useState)(""),f=Object(i.a)(p,2),d=f[0],g=f[1],E=Object(l.useState)(!0),O=Object(i.a)(E,2),v=O[0],y=O[1],j=Object(l.useState)({emailError:""}),N=Object(i.a)(j,2),w=N[0],x=N[1],k=function(){var e={emailError:""};return/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(r)?x(Object(c.a)({},e,{emailError:""})):x(Object(c.a)({},e,{emailError:"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 email"})),e};function P(){return(P=Object(s.a)(n.a.mark((function t(a){var s,c,i,l;return n.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return a.preventDefault(),s={email:r,password:d},k(),t.next=5,h.a.postAuthData(s);case 5:if(!((c=t.sent).status>=200&&c.status<=299)){t.next=13;break}return i=Object(h.b)("XSRF-Token")||"",l={token:i},t.next=11,h.a.getRole(l).then((function(e){e.data.is_staff?document.cookie="role =admin":document.cookie="role =user"}));case 11:e.history.push("/"),window.location.reload(!0);case 13:case"end":return t.stop()}}),t)})))).apply(this,arguments)}return o.a.createElement("div",{className:"auth"},o.a.createElement("div",{className:"auth__content"},o.a.createElement("div",{className:"auth__title"},o.a.createElement("p",{className:"auth__title-text"},"\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 Neobis Time"),o.a.createElement("p",{className:"auth__title-description"},"\u0412\u043e\u0439\u0434\u0438\u0442\u0435, \u0447\u0442\u043e\u0431\u044b \u043f\u0440\u043e\u0434\u043e\u043b\u0436\u0438\u0442\u044c")),o.a.createElement("section",{className:"auth__section"},o.a.createElement("form",{className:"auth__form",onSubmit:function(e){return P.apply(this,arguments)}},o.a.createElement("label",{className:"auth__label",htmlFor:"email"},"E-mail"),o.a.createElement("input",{className:"auth__input",type:"text",name:"email",required:!0,value:r,onChange:function(e){u(e.target.value),k()},onBlur:k}),w&&o.a.createElement("div",{className:"error__span"},w.emailError),o.a.createElement("label",{className:"auth__label",htmlFor:"password"},"\u041f\u0430\u0440\u043e\u043b\u044c"),o.a.createElement("div",{className:"registration__password",style:{height:"43px"}},o.a.createElement("input",{className:"registration__password-input",type:v?"password":"text",minLength:8,name:"password",required:!0,value:d,onChange:function(e){g(e.target.value)}}),o.a.createElement("img",{onClick:function(){y(!v)},src:b.a,alt:"eye",className:"registration__password-image"})),o.a.createElement("div",{className:"auth__text_position"},o.a.createElement("span",{className:"auth__text_small_grey"},"\u0417\u0430\u0431\u044b\u043b\u0438 \u043f\u0430\u0440\u043e\u043b\u044c?"),o.a.createElement(_.b,{to:"/recovery_password"},o.a.createElement("span",{className:"auth__text_small_green"},"\u0412\u043e\u0441\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u044c"))),o.a.createElement("div",{className:"auth__text_position auth__text_position_last"},o.a.createElement("button",{className:"auth__submit",type:"submit"},"\u0412\u043e\u0439\u0442\u0438"),o.a.createElement("span",{className:"auth__text_small_grey auth__text_small_grey_last"},"\u0415\u0449\u0435 \u043d\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430?"),o.a.createElement(_.b,{to:"/registration"},o.a.createElement("span",{className:"auth__text_small_green auth__text_small_green_last"},"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"))))),o.a.createElement("section",{className:"auth__section"},o.a.createElement("img",{src:m.a,className:"auth__image",alt:"girl introducin login"}))))};t.default=f}}]);
//# sourceMappingURL=6.e2d6080d.chunk.js.map
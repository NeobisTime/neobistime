(this.webpackJsonpneobis_time=this.webpackJsonpneobis_time||[]).push([[10],{126:function(e,t,a){"use strict";function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function i(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}a.d(t,"a",(function(){return i}))},130:function(e,t,a){e.exports=a.p+"static/media/authentication.3c0df457.svg"},131:function(e,t,a){e.exports=a.p+"static/media/password_eye.66ec5002.svg"},143:function(e,t,a){"use strict";a.d(t,"a",(function(){return d}));var r=a(13),n=a.n(r),i=a(18),s=a(126),c=a(2),o=a(1),l=a.n(o),m=a(19),u=a(130),b=a.n(u),p=a(131),_=a.n(p),g=a(17),O=a(5),d=function(e){var t=e.minLength,a=void 0===t?0:t,r=e.type,n=e.name,i=e.value,s=e.setValue;return l.a.createElement("input",{className:"registration__input",required:!0,minLength:a,type:r,name:n,value:i,onChange:function(e){s(e.target.value)}})};t.b=Object(g.a)((function(e){var t=Object(o.useState)(""),a=Object(c.a)(t,2),r=a[0],u=a[1],p=Object(o.useState)(""),g=Object(c.a)(p,2),j=g[0],f=g[1],E=Object(o.useState)(""),v=Object(c.a)(E,2),h=v[0],N=v[1],w=Object(o.useState)(""),y=Object(c.a)(w,2),S=y[0],P=y[1],x=Object(o.useState)(""),C=Object(c.a)(x,2),k=C[0],q=C[1],D=Object(o.useState)(!0),F=Object(c.a)(D,2),L=F[0],A=F[1],Z=Object(o.useState)(""),J=Object(c.a)(Z,2),V=J[0],B=J[1],R=Object(o.useState)(!0),T=Object(c.a)(R,2),$=T[0],z=T[1],G=Object(o.useState)({emailError:""}),H=Object(c.a)(G,2),I=H[0],K=H[1],M=Object(o.useState)({passwordSimilarity:""}),Q=Object(c.a)(M,2),U=Q[0],W=Q[1],X=Object(o.useState)({numberError:""}),Y=Object(c.a)(X,2),ee=Y[0],te=Y[1],ae=function(){/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(j)?K(Object(s.a)(Object(s.a)({},I),{},{emailError:""})):K(Object(s.a)(Object(s.a)({},I),{},{emailError:"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 email"})),W(k!==V?Object(s.a)(Object(s.a)({},U),{},{passwordSimilarity:"\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442"}):Object(s.a)(Object(s.a)({},U),{},{passwordSimilarity:""})),isNaN(Number(h))?te(Object(s.a)(Object(s.a)({},ee),{},{numberError:"\u0422\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"})):te(Object(s.a)(Object(s.a)({},ee),{},{numberError:""}))};function re(){return(re=Object(i.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),ae(),a={name_surname:r,email:j,password1:k,password2:V,phone:h,department_id:S},O.a.postRegistrationData(a);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return l.a.createElement("div",{className:"registration auth"},l.a.createElement("div",{className:"registration__content"},l.a.createElement("div",{className:"auth__title"},l.a.createElement("p",{className:"auth__title-text"},"\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 Neobis Time")),l.a.createElement("section",{className:"registration__section registration__section_w_40 "},l.a.createElement("form",{className:"auth__form",onSubmit:function(e){return re.apply(this,arguments)}},l.a.createElement("label",{className:"registration__label",htmlFor:"name"},"\u0424\u0418\u041e"),l.a.createElement(d,{type:"text",name:"name",value:r,setValue:u}),l.a.createElement("label",{className:"registration__label",htmlFor:"email"},"E-mail"),l.a.createElement("input",{className:"registration__input",type:"text",name:"email",required:!0,value:j,onChange:function(e){f(e.target.value),ae()},onBlur:ae}),I&&l.a.createElement("div",{className:"error__span"},I.emailError),l.a.createElement("label",{className:"registration__label",htmlFor:"department"},"\u0414\u0435\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442"),l.a.createElement(m.a,{options:e.departments,className:"registration__select",required:!0,onChange:function(e){P(e.value)}}),l.a.createElement("label",{className:"registration__label",htmlFor:"password"},"\u041f\u0430\u0440\u043e\u043b\u044c"),l.a.createElement("div",{className:"registration__password"},l.a.createElement("input",{className:"registration__password-input",type:L?"password":"text",minLength:8,name:"password1",required:!0,value:k,onChange:function(e){q(e.target.value)}}),l.a.createElement("img",{onClick:function(){A(!L)},src:_.a,alt:"eye",className:"registration__password-image"})),l.a.createElement("label",{className:"registration__label",htmlFor:"email"},"\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"),l.a.createElement("div",{className:"registration__password"},l.a.createElement("input",{minLength:8,className:"registration__password-input",type:$?"password":"text",name:"password2",required:!0,value:V,onChange:function(e){B(e.target.value),ae()}}),l.a.createElement("img",{onClick:function(){z(!$)},src:_.a,alt:"eye",className:"registration__password-image"})),U&&l.a.createElement("div",{className:"error__span"},U.passwordSimilarity),l.a.createElement("label",{className:"registration__label",htmlFor:"phone"},"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"),l.a.createElement("input",{className:"registration__input",type:"tel",minLength:6,name:"phone",required:!0,value:h,onChange:function(e){N(e.target.value),ae()}}),ee&&l.a.createElement("div",{className:"error__span"},ee.numberError),l.a.createElement("button",{className:"registration__submit",type:"submit"},"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"))),l.a.createElement("section",{className:"registration__section registration__section_w_60"},l.a.createElement("img",{src:b.a,className:"registration__image",alt:"girl introducin login"}))))}))},301:function(e,t,a){"use strict";a.r(t);var r=a(143);t.default=r.b}}]);
//# sourceMappingURL=10.3855080a.chunk.js.map
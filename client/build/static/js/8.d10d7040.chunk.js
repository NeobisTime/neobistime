(this.webpackJsonpneobis_time=this.webpackJsonpneobis_time||[]).push([[8],{129:function(e,t,a){"use strict";function r(e,t,a){return t in e?Object.defineProperty(e,t,{value:a,enumerable:!0,configurable:!0,writable:!0}):e[t]=a,e}function n(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function s(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?n(Object(a),!0).forEach((function(t){r(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):n(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}a.d(t,"a",(function(){return s}))},132:function(e,t,a){e.exports=a.p+"static/media/authentication.3c0df457.svg"},133:function(e,t,a){e.exports=a.p+"static/media/password_eye.66ec5002.svg"},135:function(e,t,a){"use strict";a.d(t,"a",(function(){return E}));var r=a(12),n=a.n(r),s=a(17),i=a(129),c=a(3),o=a(1),l=a.n(o),m=a(18),u=a(35),b=a(132),p=a.n(b),_=a(133),g=a.n(_),f=a(16),O=a(6),E=function(e){var t=e.minLength,a=void 0===t?0:t,r=e.type,n=e.name,s=e.value,i=e.setValue,c=e.title;return l.a.createElement("input",{title:c,className:"registration__input",required:!0,minLength:a,type:r,name:n,value:s,onChange:function(e){i(e.target.value)}})};t.b=Object(f.a)((function(e){var t=Object(o.useState)(""),a=Object(c.a)(t,2),r=a[0],b=a[1],_=Object(o.useState)(""),f=Object(c.a)(_,2),j=f[0],d=f[1],h=Object(o.useState)(""),v=Object(c.a)(h,2),N=v[0],y=v[1],w=Object(o.useState)(""),S=Object(c.a)(w,2),x=S[0],C=S[1],F=Object(o.useState)(""),q=Object(c.a)(F,2),D=q[0],P=q[1],k=Object(o.useState)(!0),L=Object(c.a)(k,2),A=L[0],T=L[1],V=Object(o.useState)(""),Z=Object(c.a)(V,2),I=Z[0],J=Z[1],U=Object(o.useState)(!0),B=Object(c.a)(U,2),R=B[0],$=B[1],z=Object(o.useState)("success"),G=Object(c.a)(z,2),H=G[0],K=G[1],M=Object(o.useState)(""),Q=Object(c.a)(M,2),W=Q[0],X=Q[1],Y=Object(o.useState)(!1),ee=Object(c.a)(Y,2),te=ee[0],ae=ee[1],re=function(e){e.status>=200&&e.status<=299?(K("success"),X("\u041f\u0440\u043e\u0432\u0435\u0440\u044c\u0442\u0435 \u043f\u043e\u0447\u0442\u0443")):(K("error"),X(e.response||"\u043d\u0435\u043f\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043d\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430")),ae(!0),setTimeout((function(){ae(!1)}),3e3)};Object(o.useEffect)((function(){ue(D!==I?Object(i.a)({},me,{passwordSimilarity:"\u041f\u0430\u0440\u043e\u043b\u0438 \u043d\u0435 \u0441\u043e\u0432\u043f\u0430\u0434\u0430\u044e\u0442"}):Object(i.a)({},me,{passwordSimilarity:""}))}),[D,I]);var ne=Object(o.useState)({emailError:""}),se=Object(c.a)(ne,2),ie=se[0],ce=se[1],oe=Object(o.useState)({passwordSimilarity:""}),le=Object(c.a)(oe,2),me=le[0],ue=le[1],be=Object(o.useState)({numberError:""}),pe=Object(c.a)(be,2),_e=pe[0],ge=pe[1],fe=function(){/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(j)?ce(Object(i.a)({},ie,{emailError:""})):ce(Object(i.a)({},ie,{emailError:"\u041d\u0435\u043f\u0440\u0430\u0432\u0438\u043b\u044c\u043d\u044b\u0439 email"})),isNaN(Number(N))?ge(Object(i.a)({},_e,{numberError:"\u0422\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"})):ge(Object(i.a)({},_e,{numberError:""}))};function Oe(){return(Oe=Object(s.a)(n.a.mark((function e(t){var a;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:t.preventDefault(),fe(),a={name_surname:r,email:j,password1:D,password2:I,phone:N,department_id:x},O.a.postRegistrationData(a).then((function(e){re(e)})).catch((function(e){re(e.request)}));case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return l.a.createElement(l.a.Fragment,null,l.a.createElement("div",{className:"registration auth"},l.a.createElement("div",{className:"registration__content"},l.a.createElement("div",{className:"auth__title"},l.a.createElement("p",{className:"auth__title-text"},"\u0414\u043e\u0431\u0440\u043e \u043f\u043e\u0436\u0430\u043b\u043e\u0432\u0430\u0442\u044c \u0432 Neobis Time")),l.a.createElement("section",{className:"registration__section registration__section_w_40 "},l.a.createElement("form",{className:"auth__form",onSubmit:function(e){return Oe.apply(this,arguments)}},l.a.createElement("label",{className:"registration__label",htmlFor:"name"},"\u0424\u0418\u041e"),l.a.createElement(E,{type:"text",name:"name",value:r,setValue:b}),l.a.createElement("label",{className:"registration__label",htmlFor:"email"},"E-mail"),l.a.createElement("input",{className:"registration__input",type:"text",name:"email",required:!0,value:j,onChange:function(e){d(e.target.value),fe()},onBlur:fe}),ie&&l.a.createElement("div",{className:"error__span"},ie.emailError),l.a.createElement("label",{className:"registration__label",htmlFor:"department"},"\u0414\u0435\u043f\u0430\u0440\u0442\u0430\u043c\u0435\u043d\u0442"),l.a.createElement(m.a,{options:e.departments,className:"registration__select",required:!0,onChange:function(e){C(e.value)}}),l.a.createElement("label",{className:"registration__label",htmlFor:"password"},"\u041f\u0430\u0440\u043e\u043b\u044c"),l.a.createElement("div",{className:"registration__password"},l.a.createElement("input",{className:"registration__password-input",type:A?"password":"text",minLength:8,name:"password1",required:!0,value:D,onChange:function(e){P(e.target.value)}}),l.a.createElement("img",{onClick:function(){T(!A)},src:g.a,alt:"eye",className:"registration__password-image"})),l.a.createElement("label",{className:"registration__label",htmlFor:"email"},"\u041f\u043e\u0432\u0442\u043e\u0440\u0438\u0442\u0435 \u043f\u0430\u0440\u043e\u043b\u044c"),l.a.createElement("div",{className:"registration__password"},l.a.createElement("input",{minLength:8,className:"registration__password-input",type:R?"password":"text",name:"password2",required:!0,value:I,onChange:function(e){J(e.target.value),fe()}}),l.a.createElement("img",{onClick:function(){$(!R)},src:g.a,alt:"eye",className:"registration__password-image"})),me&&l.a.createElement("div",{className:"error__span"},me.passwordSimilarity),l.a.createElement("label",{className:"registration__label",htmlFor:"phone"},"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"),l.a.createElement("input",{className:"registration__input",type:"tel",minLength:6,name:"phone",required:!0,value:N,onChange:function(e){y(e.target.value),fe()}}),_e&&l.a.createElement("div",{className:"error__span"},_e.numberError),l.a.createElement("button",{className:"registration__submit",type:"submit"},"\u0417\u0430\u0440\u0435\u0433\u0438\u0441\u0442\u0440\u0438\u0440\u043e\u0432\u0430\u0442\u044c\u0441\u044f"))),l.a.createElement("section",{className:"registration__section registration__section_w_60"},l.a.createElement("img",{src:p.a,className:"registration__image",alt:"girl introducin login"})),te&&l.a.createElement(u.a,{type:H,text:W,onClose:function(){ae(!te)}}))))}))},136:function(e,t,a){e.exports=a.p+"static/media/forgot_password_gi2d.24021047.svg"},320:function(e,t,a){"use strict";a.r(t);var r=a(129),n=a(3),s=a(1),i=a.n(s),c=a(136),o=a.n(c),l=a(135),m=a(16),u=a(6),b=a(35),p=a(5),_=a(14),g=Object(m.a)(Object(p.f)((function(e){var t=Object(s.useState)(""),a=Object(n.a)(t,2),c=a[0],m=a[1],p=Object(s.useState)(""),g=Object(n.a)(p,2),f=g[0],O=g[1],E=Object(s.useState)([]),j=Object(n.a)(E,2),d=j[0],h=j[1],v=Object(s.useState)({numberError:""}),N=Object(n.a)(v,2),y=N[0],w=N[1],S=function(){var e={};return isNaN(Number(f))?w(Object(r.a)({},e,{numberError:"\u0422\u043e\u043b\u044c\u043a\u043e \u0446\u0438\u0444\u0440\u044b"})):w(Object(r.a)({},e,{numberError:""})),e};Object(s.useEffect)((function(){u.a.getUserInfo().then((function(e){var t=e.data;console.log("requestData",t),m(t.name_surname),O(t.phone)}))}),[]);var x=Object(s.useState)("success"),C=Object(n.a)(x,2),F=C[0],q=C[1],D=Object(s.useState)(""),P=Object(n.a)(D,2),k=P[0],L=P[1],A=Object(s.useState)(!1),T=Object(n.a)(A,2),V=T[0],Z=T[1],I=function(e){e.status>=200&&e.status<=299?(q("success"),L("\u0412\u0441\u0435 \u043f\u0440\u043e\u0448\u043b\u043e \u0431\u0435\u0437 \u043e\u0448\u0438\u0431\u043e\u043a")):(q("error"),L(e.response||"\u043d\u0435\u043f\u0440\u0435\u0434\u0432\u0438\u0434\u0435\u043d\u043d\u0430\u044f \u043e\u0448\u0438\u0431\u043a\u0430")),Z(!0),setTimeout((function(){Z(!1)}),5e3)};return i.a.createElement(i.a.Fragment,null,i.a.createElement(_.a,{timeOut:600}),i.a.createElement("div",{className:"registration auth"},i.a.createElement("div",{className:"registration__content"},i.a.createElement("div",{className:"auth__title"},i.a.createElement("p",{className:"auth__title-text"},"\u0418\u0437\u043c\u0435\u043d\u0438\u0442\u0435 \u0432\u0430\u0448\u0438 \u0434\u0430\u043d\u043d\u044b\u0435")),i.a.createElement("section",{className:"registration__section registration__section_w_40 "},i.a.createElement("form",{className:"auth__form",onSubmit:function(t){t.preventDefault(),S();var a=new FormData;a.append("name_surname",c),a.append("phone",f),d[0]&&a.append("profile_img",d[0]),u.a.patchUserInfo(a).then((function(t){I(t),e.history.push("/personal_office")})).catch((function(e){I(e.request)}))}},i.a.createElement("label",{className:"registration__label",htmlFor:"name"},"\u0424\u0418\u041e"),i.a.createElement(l.a,{type:"text",name:"name",value:c,setValue:m}),i.a.createElement("label",{className:"registration__label",htmlFor:"department"},"\u0424\u043e\u0442\u043e"),i.a.createElement("div",{className:"registration__input"},i.a.createElement("label",{className:"custom-file-upload"},i.a.createElement("input",{type:"file",name:"image",className:"custom-file-input",onChange:function(e){h(e.target.files)}}),d[0]?d[0].name:"\u0417\u0430\u0433\u0440\u0443\u0437\u0438\u0442\u0435 \u0444\u043e\u0442\u043e")),i.a.createElement("label",{className:"registration__label",htmlFor:"phone"},"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"),i.a.createElement("input",{className:"registration__input",type:"tel",minLength:6,name:"phone",required:!0,value:f,onChange:function(e){O(e.target.value),S()}}),y&&i.a.createElement("div",{className:"error__span"},y.numberError),i.a.createElement("button",{style:{width:"60%",margin:"30px auto 0"},className:"registration__submit",type:"submit"},"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"))),i.a.createElement("section",{className:"registration__section registration__section_w_60"},i.a.createElement("img",{src:o.a,className:"registration__image",alt:"girl introducin login"})),V&&i.a.createElement(b.a,{type:F,text:k,onClose:function(){Z(!V)}}))))})));t.default=g}}]);
//# sourceMappingURL=8.d10d7040.chunk.js.map
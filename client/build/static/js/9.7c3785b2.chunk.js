(this.webpackJsonpneobis_time=this.webpackJsonpneobis_time||[]).push([[9],{279:function(e,t,a){e.exports=a.p+"static/media/comed_events.1f152545.svg"},280:function(e,t,a){e.exports=a.p+"static/media/missed_events.6c6faf4d.svg"},281:function(e,t,a){e.exports=a.p+"static/media/personal_achievment_1.b3f45b02.svg"},282:function(e,t,a){e.exports=a.p+"static/media/personal_achievment_2.df06140c.svg"},283:function(e,t,a){e.exports=a.p+"static/media/personal_achievment_3.b0eaf699.svg"},311:function(e,t,a){"use strict";a.r(t);var n=a(3),s=a(1),o=a.n(s),c=a(37),l=a(4),i=a(12),r=a.n(i),m=a(17),f=a(36),p=a(5),_=a(54),u=a.n(_),d=(a(80),a(55)),v=a.n(d),b=a(56),E=a.n(b),N=function(e){var t=Object(s.useState)(""),a=Object(n.a)(t,2),c=a[0],l=a[1],i=Object(s.useState)(""),_=Object(n.a)(i,2),d=_[0],b=_[1],N=Object(s.useState)(e.date),g=Object(n.a)(N,2),h=g[0],y=g[1],O=Object(s.useState)(0),j=Object(n.a)(O,2),k=j[0],C=j[1],x=Object(s.useState)(0),w=Object(n.a)(x,2),S=w[0],D=w[1],I=Object(s.useState)(e.date),M=Object(n.a)(I,2),B=M[0],q=M[1],F=Object(s.useState)(0),H=Object(n.a)(F,2),z=H[0],G=H[1],R=Object(s.useState)(0),T=Object(n.a)(R,2),A=T[0],P=T[1],J=function(){var e=new Date(h);return e.setHours(k,S,0),"".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate(),"T").concat(e.getHours(),":").concat(e.getMinutes())},Y=function(){var e=new Date(B);return e.setHours(z,A,0),"".concat(e.getFullYear(),"-").concat(e.getMonth()+1,"-").concat(e.getDate(),"T").concat(e.getHours(),":").concat(e.getMinutes())};function U(){return(U=Object(m.a)(r.a.mark((function e(t){var a,n,s;return r.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,J();case 3:return a=e.sent,e.next=6,Y();case 6:n=e.sent,s={title:c,description:d,start:a,end:n},p.a.postNoteCreateData(s);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}return o.a.createElement("div",{className:"modal_centered"},o.a.createElement("div",{className:"modal__wrapper"},o.a.createElement(f.a,{onClose:e.onClose}),o.a.createElement("div",{className:"personal-create"},o.a.createElement("div",{className:"personal-create-row"},o.a.createElement("input",{className:"personal-create__input",type:"text",name:"name",required:!0,value:c,placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u043d\u0430\u0437\u0432\u0430\u043d\u0438\u0435",onChange:function(e){l(e.target.value)}})),o.a.createElement("div",{className:"admin-create-event-modal-row"},o.a.createElement("img",{src:v.a,className:"admin-create-event-modal-icon",alt:"time"}),o.a.createElement("div",{className:"admin-create-event-modal__day-picker"},o.a.createElement(u.a,{value:e.date,onDayChange:function(e){y(e),q(e)}})),o.a.createElement("div",{className:"admin-create-event-modal-time"},o.a.createElement("input",{type:"text",name:"",placeholder:"00",className:"admin-create-event-modal__time-picker",onChange:function(e){C(parseInt(e.target.value))}}),o.a.createElement("div",{className:"admin-create-event-modal__time-picker-colon"},"."),o.a.createElement("input",{type:"text",name:"",placeholder:"00",className:"admin-create-event-modal__time-picker",onChange:function(e){D(parseInt(e.target.value))}}),"\xa0-\xa0",o.a.createElement("input",{type:"text",name:"",placeholder:"00",className:"admin-create-event-modal__time-picker",onChange:function(e){G(parseInt(e.target.value))}}),o.a.createElement("div",{className:"admin-create-event-modal__time-picker-colon"},"."),o.a.createElement("input",{type:"text",name:"",placeholder:"00",className:"admin-create-event-modal__time-picker",onChange:function(e){P(parseInt(e.target.value))}}))),o.a.createElement("div",{className:"personal-create-row"},o.a.createElement("div",{className:"personal-create__textarea-wrapper"},o.a.createElement("img",{src:E.a,className:"admin-create-event-modal-icon",alt:"people"}),o.a.createElement("input",{name:"description",required:!0,value:d,onChange:function(e){b(e.target.value)},placeholder:"\u0414\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u043e\u043f\u0438\u0441\u0430\u043d\u0438\u0435",className:"personal-create__textarea"}))),o.a.createElement("div",{className:"personal-create-row"},o.a.createElement("div",{className:"personal-create__buttons-wrapper"},o.a.createElement("button",{onClick:function(e){return U.apply(this,arguments)},className:"personal-create__buttons-save button"},"\u0421\u043e\u0437\u0434\u0430\u0442\u044c"),o.a.createElement("button",{onClick:e.onClose,className:"personal-create__buttons-cancel button"},"\u043e\u0442\u043c\u0435\u043d\u0430"))))))},g=function(e){var t=e.event,a=new Date(t.start);return o.a.createElement("div",{className:"modal_centered"},o.a.createElement("div",{className:"modal__wrapper"},o.a.createElement("div",{className:"event-info-modal"},o.a.createElement(f.a,{onClose:e.onClose}),o.a.createElement("div",{className:"event-info__content",style:{width:"90%"}},o.a.createElement("p",{className:"event-info__content-title",style:{fontSize:"24px"}},t.title),o.a.createElement("p",{className:"event-info__content-date",style:{fontSize:"14px"}},(a.getHours()<10?"0":"")+a.getHours(),".",(a.getMinutes()<10?"0":"")+a.getMinutes()," ",["\u0412\u043e\u0441\u043a\u0440\u0435\u0441\u0435\u043d\u044c\u0435","\u041f\u043e\u043d\u0435\u0434\u0435\u043b\u044c\u043d\u0438\u043a","\u0412\u0442\u043e\u0440\u043d\u0438\u043a","\u0421\u0440\u0435\u0434\u0430","\u0427\u0435\u0442\u0432\u0435\u0440\u0433","\u041f\u044f\u0442\u043d\u0438\u0446\u0430","\u0421\u0443\u0431\u0431\u043e\u0442\u0430"][a.getDay()],", ",["\u042f\u043d\u0432\u0430\u0440\u044c","\u0424\u0435\u0432\u0440\u0430\u043b\u044c","\u041c\u0430\u0440\u0442","\u0410\u043f\u0440\u0435\u043b\u044c","\u041c\u0430\u0439","\u0418\u044e\u043d\u044c","\u0418\u044e\u043b\u044c","\u0410\u0432\u0433\u0443\u0441\u0442","C\u0435\u043d\u0442\u044f\u0431\u0440\u044c","\u041e\u043a\u0442\u044f\u0431\u0440\u044c","\u041d\u043e\u044f\u0431\u0440\u044c","\u0414\u0435\u043a\u0430\u0431\u0440\u044c"][a.getMonth()]," ",a.getDate()),o.a.createElement("p",{className:"event-info__content-description",style:{fontSize:"18px"}},t.description)))))},h=a(21),y=a.n(h),O=a(48),j=a.n(O),k=a(279),C=a.n(k),x=a(280),w=a.n(x),S=a(281),D=a.n(S),I=a(282),M=a.n(I),B=a(283),q=a.n(B),F=a(155),H=a(57),z=a(49),G=a(22),R=a(50),T=a(51),A=a(52),P=a(53),J=a(16);t.default=Object(J.a)((function(e){var t=Object(s.useState)({}),a=Object(n.a)(t,2),i=a[0],r=a[1],m=Object(s.useState)([]),f=Object(n.a)(m,2),_=f[0],u=f[1],d=Object(s.useState)(new Date),v=Object(n.a)(d,2),b=v[0],E=v[1],h=Object(s.useState)("week"),O=Object(n.a)(h,2),k=O[0],x=O[1],S=Object(s.useState)([]),I=Object(n.a)(S,2),B=I[0],J=I[1],Y=Object(s.useState)({}),U=Object(n.a)(Y,2),V=U[0],W=U[1];console.log("PersonalOffice -> userInfo",V);var K=Object(s.useState)({}),L=Object(n.a)(K,2),Q=L[0],X=L[1];Object(s.useEffect)((function(){p.a.getPersonalStats(k).then((function(e){J(e.data)}))}),[k]),Object(s.useEffect)((function(){p.a.getUserInfo().then((function(t){W(t.data);var a=e.departments.filter((function(e){return+e.value===+t.data.department_id}));X(a[0])}))}),[]),Object(s.useEffect)((function(){document.getElementsByClassName("personal-office__stat")[0].style.display="none"}),[]);var Z={datasets:[{data:[B.quantity_of_attended_events||0,B.quantity_of_missed_events||-1],backgroundColor:["#FFCE56","#EC4C47"]}],labels:["\u041f\u043e\u0441\u0435\u0449\u0435\u043d\u043d\u044b\u0445 \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u0439","\u041f\u0440\u043e\u043f\u0443\u0449\u0435\u043d\u043d\u044b\u0445 \u043c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u0439"],legend:{display:!1},options:{legend:{display:!1}}};Object(s.useEffect)((function(){p.a.getNotes().then((function(e){u(e.data)}))}),[]);var $=Object(s.useState)(!1),ee=Object(n.a)($,2),te=ee[0],ae=ee[1],ne=function(){ae(!te),me()},se=function(e){var t=_.find((function(t){return t.id===Number(e.oldEvent._def.publicId)}))||{id:"",start:"",end:""};t.start=e.event.startStr,t.end=e.event.endStr;var a={start:t.start,end:t.end};console.log("handleEventDropAndResize -> dataToPatch",a),p.a.patchNoteChangeData(a,t.id)},oe=Object(s.useState)(!1),ce=Object(n.a)(oe,2),le=ce[0],ie=ce[1],re=function(){ie(!le)},me=function(){p.a.getNotes().then((function(e){u(e.data)}))};return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"wrapper"},o.a.createElement(c.a,null),o.a.createElement("div",{className:" content__wrapper content__wrapper_no_margin personal-office"},o.a.createElement("section",{className:"personal-office__info"},o.a.createElement("div",{className:"personal-office__info-picture-block"},o.a.createElement("img",{className:"personal-office__info-avatar",src:V.profile_img||y.a,alt:"personal"})),o.a.createElement("div",{className:"personal-office__info-content-wrapper"},o.a.createElement("div",{className:"personal-office__info-section"},o.a.createElement("p",{className:"personal-office__info-name"},V.name_surname),o.a.createElement("p",{className:"personal-office__info-dep"},Q.label||"Neobis"," Department")),o.a.createElement("div",{className:"personal-office__info-section"},o.a.createElement("p",{className:"personal-office__info-text"},"E-mail:",o.a.createElement("span",{className:"personal-office__info-text-content"},V.email)),o.a.createElement("p",{className:"personal-office__info-text"},"\u0422\u0435\u043b\u0435\u0444\u043e\u043d:",o.a.createElement("span",{className:"personal-office__info-text-content"},V.phone))),o.a.createElement(l.b,{to:"/change_personal_data",className:"link"},o.a.createElement("button",{className:"button personal-office__info-edit"},"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"))),o.a.createElement("div",{className:"personal-office__info-points"},o.a.createElement("div",{className:"personal-office__info-points-container"},o.a.createElement("p",{className:"personal-office__info-points-value"},V.points)),V.points&&V.points>=100?o.a.createElement("div",{className:"personal-office__info-points-achievements"},o.a.createElement("div",{className:"personal-office__info-points-achievements-images"},V.points&&V.points>=100?o.a.createElement("img",{className:"personal-office__info-points-achievements-image",src:D.a,alt:"achievement"}):null,V.points&&V.points>=250?o.a.createElement("img",{className:"personal-office__info-points-achievements-image",src:M.a,alt:"achievement"}):null,V.points&&V.points>=500?o.a.createElement("img",{className:"personal-office__info-points-achievements-image",src:q.a,alt:"achievement"}):null),o.a.createElement("div",{className:"personal-office__info-points-achievements-values"},V.points&&V.points>=100?o.a.createElement("span",{className:"personal-office__info-points-achievements-value"},100):null,V.points&&V.points>=250?o.a.createElement("span",{className:"personal-office__info-points-achievements-value"},250):null,V.points&&V.points>=500?o.a.createElement("span",{className:"personal-office__info-points-achievements-value"},500):null)):null)),o.a.createElement("section",{className:"personal-office__buttons"},o.a.createElement("div",{className:"personal-office__buttons-section "},o.a.createElement("p",{id:"personal-office__calendar",className:"personal-office__buttons-section-btn personal-office__buttons-section-btn_active",onClick:function(){var e=document.getElementsByClassName("personal-office__calendar")[0],t=document.getElementsByClassName("personal-office__stat")[0],a=document.getElementById("personal-office__stat"),n=document.getElementById("personal-office__calendar");t.style.display="none",e.style.display="block",n.className="personal-office__buttons-section-btn personal-office__buttons-section-btn_active",a.className="personal-office__buttons-section-btn personal-office__buttons-section-btn_non_active"}},"\u041a\u0430\u043b\u0435\u043d\u0434\u0430\u0440\u044c")),o.a.createElement("div",{className:"personal-office__buttons-section"},o.a.createElement("p",{id:"personal-office__stat",className:"personal-office__buttons-section-btn personal-office__buttons-section-btn_non_active",onClick:function(){var e=document.getElementsByClassName("personal-office__calendar")[0],t=document.getElementsByClassName("personal-office__stat")[0],a=document.getElementById("personal-office__stat"),n=document.getElementById("personal-office__calendar");e.style.display="none",t.style.display="block",n.className="personal-office__buttons-section-btn personal-office__buttons-section-btn_non_active",a.className="personal-office__buttons-section-btn personal-office__buttons-section-btn_active"}},"\u0421\u0442\u0430\u0442\u0438\u0441\u0442\u0438\u043a\u0430"))),o.a.createElement("section",{className:"personal-office__calendar"},o.a.createElement(H.a,{plugins:[G.b,P.a,R.a,T.a,z.a,A.a],height:"610px",locale:"ru",headerToolbar:{left:"prev,next today",center:"title",right:"dayGridMonth,timeGridWeek,timeGridDay,listMonth"},initialView:"dayGridMonth",events:_,editable:!0,firstDay:1,dayMaxEventRows:!0,selectable:!0,selectMirror:!0,select:function(e){E(e.start),ne()},eventDrop:se,eventResize:se,eventClick:function(e){var t=Number(e.event._def.publicId),a=_.filter((function(e){return e.id===t}));r(a[0]),re()},slotDuration:"00:15:00"})),o.a.createElement("section",{className:"personal-office__stat"},o.a.createElement("div",{className:"personal-office__stat-wrapper"},o.a.createElement("div",{className:"personal-office__stat-doughnut"},o.a.createElement(F.b,{data:Z,width:100,height:75,options:{responsive:!0,maintainAspectRatio:!0,legend:{display:!1}}})),o.a.createElement("div",{className:"personal-office__stat-content"},o.a.createElement("div",{className:"personal-office__stat-buttons"},o.a.createElement("p",{className:"personal-office__stat-buttons-text"},"\u0421\u043e\u0440\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c \u043f\u043e:"),o.a.createElement("div",{className:"personal-office__stat-buttons-content"},o.a.createElement("input",{type:"button",value:"\u041d\u0435\u0434\u0435\u043b\u044f",onClick:function(){return x("week")},className:"week"===k?"button personal-office__stat-button personal-office__stat-button_active":"button personal-office__stat-button"}),o.a.createElement("input",{type:"button",value:"\u041c\u0435\u0441\u044f\u0446",onClick:function(){return x("month")},className:"month"===k?"button personal-office__stat-button personal-office__stat-button_active":"button personal-office__stat-button"}),o.a.createElement("input",{type:"button",value:"\u0413\u043e\u0434",onClick:function(){return x("year")},className:"year"===k?"button personal-office__stat-button personal-office__stat-button_active":"button personal-office__stat-button"}))),o.a.createElement("div",{className:"personal-office__stat-info"},o.a.createElement("div",{className:"personal-office__stat-info-content"},o.a.createElement("div",{className:"personal-office__stat-info-block"},o.a.createElement("img",{className:"personal-office__stat-info-block-img",src:j.a,alt:"personal stat logo"}),o.a.createElement("p",{className:"personal-office__stat-info-block-text"},"\u0412\u0441\u0435\u0433\u043e"),o.a.createElement("p",{style:{color:"#1070CA"},className:"personal-office__stat-info-block-number"},B.quantity_of_polls)),o.a.createElement("div",{className:"personal-office__stat-info-block"},o.a.createElement("img",{className:"personal-office__stat-info-block-img",src:C.a,alt:"personal stat logo"}),o.a.createElement("p",{className:"personal-office__stat-info-block-text"},"\u041f\u043e\u0441\u0435\u0449\u0435\u043d\u043e"),o.a.createElement("p",{style:{color:"#F7D154"},className:"personal-office__stat-info-block-number"},B.quantity_of_attended_events)),o.a.createElement("div",{className:"personal-office__stat-info-block"},o.a.createElement("img",{className:"personal-office__stat-info-block-img personal-office__stat-info-block-img_small",src:w.a,alt:"personal stat logo"}),o.a.createElement("p",{className:"personal-office__stat-info-block-text"},"\u041f\u0440\u043e\u043f\u0443\u0449\u0435\u043d\u043e"),o.a.createElement("p",{style:{color:"#EC4C47"},className:"personal-office__stat-info-block-number"},B.quantity_of_missed_events))))))))),le&&o.a.createElement(g,{onClose:re,event:i}),te&&o.a.createElement(N,{onClose:ne,updateEvents:me,date:b}))}))}}]);
//# sourceMappingURL=9.7c3785b2.chunk.js.map
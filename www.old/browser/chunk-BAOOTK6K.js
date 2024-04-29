import{a as se}from"./chunk-JE3FXFC3.js";import{c as Z,e as Ce,f as ne,i as Be,j as oe,k as Me}from"./chunk-ROKZCQJB.js";import"./chunk-HU6UQ5WL.js";import{f as Pe,g as Re}from"./chunk-RXI45IKK.js";import{a as ie}from"./chunk-HC6MZPB3.js";import{a as ue}from"./chunk-BXUXZF2B.js";import{a as me}from"./chunk-WMEG6PAA.js";import{h as ye,i as we,k as xe,l as Se,m as te,p as ve,q as F,r as Ae,t as Ee}from"./chunk-O6QZTMED.js";import{a as c}from"./chunk-FERD25SW.js";import{a as ge,b as be,c as ke}from"./chunk-DGQDX2SM.js";import{c as De}from"./chunk-GBAD7PMF.js";import{a as V}from"./chunk-MM5QLNJM.js";import{c as he,d as fe,h as Y,i as q,m as $}from"./chunk-72KDLSWN.js";import{a as ee}from"./chunk-5OMUW5VI.js";import"./chunk-OBXDPQ3V.js";import"./chunk-4UAGJSVW.js";import{a as H}from"./chunk-MCRJI3T3.js";import{a as X,c as G}from"./chunk-TLUQMX4X.js";import{c as R,d as Ie,g as Te,h as C,k as Ye,n as ae}from"./chunk-53QC3E2F.js";import{g as D}from"./chunk-EGHARNWC.js";var z=function(e){return e.Dark="DARK",e.Light="LIGHT",e.Default="DEFAULT",e}(z||{}),ce={getEngine(){let e=me();if(e!=null&&e.isPluginAvailable("StatusBar"))return e.Plugins.StatusBar},setStyle(e){let t=this.getEngine();t&&t.setStyle(e)},getStyle:function(){return D(this,null,function*(){let e=this.getEngine();if(!e)return z.Default;let{style:t}=yield e.getInfo();return t})}},re=(e,t)=>{if(t===1)return 0;let n=1/(1-t),o=-(t*n);return e*n+o},Ne=()=>{!H||H.innerWidth>=768||ce.setStyle({style:z.Dark})},de=(e=z.Default)=>{!H||H.innerWidth>=768||ce.setStyle({style:e})},We=(e,t)=>D(void 0,null,function*(){typeof e.canDismiss!="function"||!(yield e.canDismiss(void 0,F))||(t.isRunning()?t.onFinish(()=>{e.dismiss(void 0,"handler")},{oneTimeCallback:!0}):e.dismiss(void 0,"handler"))}),le=e=>.00255275*2.71828**(-14.9619*e)-1.00255*2.71828**(-.0380968*e)+1,U={MIN_PRESENTING_SCALE:.915},$e=(e,t,n,o)=>{let i=e.offsetHeight,a=!1,r=!1,d=null,k=null,u=.2,w=!0,g=0,f=()=>d&&Z(d)?d.scrollY:!0,N=ee({el:e,gestureName:"modalSwipeToClose",gesturePriority:Ae,direction:"y",threshold:10,canStart:h=>{let p=h.event.target;return p===null||!p.closest?!0:(d=ne(p),d?(Z(d)?k=Y(d).querySelector(".inner-scroll"):k=d,!!!d.querySelector("ion-refresher")&&k.scrollTop===0):p.closest("ion-footer")===null)},onStart:h=>{let{deltaY:p}=h;w=f(),r=e.canDismiss!==void 0&&e.canDismiss!==!0,p>0&&d&&oe(d),t.progressStart(!0,a?1:0)},onMove:h=>{let{deltaY:p}=h;p>0&&d&&oe(d);let v=h.deltaY/i,B=v>=0&&r,M=B?u:.9999,O=B?le(v/M):v,A=$(1e-4,O,M);t.progressStep(A),A>=.5&&g<.5?de(n):A<.5&&g>=.5&&Ne(),g=A},onEnd:h=>{let p=h.velocityY,v=h.deltaY/i,B=v>=0&&r,M=B?u:.9999,O=B?le(v/M):v,A=$(1e-4,O,M),J=(h.deltaY+p*1e3)/i,T=!B&&J>=.5,W=T?-.001:.001;T?(t.easing("cubic-bezier(0.32, 0.72, 0, 1)"),W+=ie([0,0],[.32,.72],[0,1],[1,1],A)[0]):(t.easing("cubic-bezier(1, 0, 0.68, 0.28)"),W+=ie([0,0],[1,0],[.68,.28],[1,1],A)[0]);let K=Le(T?v*i:(1-A)*i,p);a=T,N.enable(!1),d&&Me(d,w),t.onFinish(()=>{T||N.enable(!0)}).progressEnd(T?1:0,W,K),B&&A>M/4?We(e,t):T&&o()}});return N},Le=(e,t)=>$(400,e/Math.abs(t*1.1),500),He=e=>{let{currentBreakpoint:t,backdropBreakpoint:n}=e,o=n===void 0||n<t,s=o?`calc(var(--backdrop-opacity) * ${t})`:"0",i=c("backdropAnimation").fromTo("opacity",0,s);return o&&i.beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),{wrapperAnimation:c("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:"translateY(100%)"},{offset:1,opacity:1,transform:`translateY(${100-t*100}%)`}]),backdropAnimation:i}},qe=e=>{let{currentBreakpoint:t,backdropBreakpoint:n}=e,o=`calc(var(--backdrop-opacity) * ${re(t,n)})`,s=[{offset:0,opacity:o},{offset:1,opacity:0}],i=[{offset:0,opacity:o},{offset:n,opacity:0},{offset:1,opacity:0}],a=c("backdropAnimation").keyframes(n!==0?i:s);return{wrapperAnimation:c("wrapperAnimation").keyframes([{offset:0,opacity:1,transform:`translateY(${100-t*100}%)`},{offset:1,opacity:1,transform:"translateY(100%)"}]),backdropAnimation:a}},Ge=()=>{let e=c().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),t=c().fromTo("transform","translateY(100vh)","translateY(0vh)");return{backdropAnimation:e,wrapperAnimation:t}},Oe=(e,t)=>{let{presentingEl:n,currentBreakpoint:o}=t,s=Y(e),{wrapperAnimation:i,backdropAnimation:a}=o!==void 0?He(t):Ge();a.addElement(s.querySelector("ion-backdrop")),i.addElement(s.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});let r=c("entering-base").addElement(e).easing("cubic-bezier(0.32,0.72,0,1)").duration(500).addAnimation(i);if(n){let d=window.innerWidth<768,k=n.tagName==="ION-MODAL"&&n.presentingElement!==void 0,u=Y(n),w=c().beforeStyles({transform:"translateY(0)","transform-origin":"top center",overflow:"hidden"}),g=document.body;if(d){let f=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",b=k?"-10px":f,l=U.MIN_PRESENTING_SCALE,y=`translateY(${b}) scale(${l})`;w.afterStyles({transform:y}).beforeAddWrite(()=>g.style.setProperty("background-color","black")).addElement(n).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"},{offset:1,filter:"contrast(0.85)",transform:y,borderRadius:"10px 10px 0 0"}]),r.addAnimation(w)}else if(r.addAnimation(a),!k)i.fromTo("opacity","0","1");else{let b=`translateY(-10px) scale(${k?U.MIN_PRESENTING_SCALE:1})`;w.afterStyles({transform:b}).addElement(u.querySelector(".modal-wrapper")).keyframes([{offset:0,filter:"contrast(1)",transform:"translateY(0) scale(1)"},{offset:1,filter:"contrast(0.85)",transform:b}]);let l=c().afterStyles({transform:b}).addElement(u.querySelector(".modal-shadow")).keyframes([{offset:0,opacity:"1",transform:"translateY(0) scale(1)"},{offset:1,opacity:"0",transform:b}]);r.addAnimation([w,l])}}else r.addAnimation(a);return r},Fe=()=>{let e=c().fromTo("opacity","var(--backdrop-opacity)",0),t=c().fromTo("transform","translateY(0vh)","translateY(100vh)");return{backdropAnimation:e,wrapperAnimation:t}},_e=(e,t,n=500)=>{let{presentingEl:o,currentBreakpoint:s}=t,i=Y(e),{wrapperAnimation:a,backdropAnimation:r}=s!==void 0?qe(t):Fe();r.addElement(i.querySelector("ion-backdrop")),a.addElement(i.querySelectorAll(".modal-wrapper, .modal-shadow")).beforeStyles({opacity:1});let d=c("leaving-base").addElement(e).easing("cubic-bezier(0.32,0.72,0,1)").duration(n).addAnimation(a);if(o){let k=window.innerWidth<768,u=o.tagName==="ION-MODAL"&&o.presentingElement!==void 0,w=Y(o),g=c().beforeClearStyles(["transform"]).afterClearStyles(["transform"]).onFinish(b=>{if(b!==1)return;o.style.setProperty("overflow",""),Array.from(f.querySelectorAll("ion-modal:not(.overlay-hidden)")).filter(y=>y.presentingElement!==void 0).length<=1&&f.style.setProperty("background-color","")}),f=document.body;if(k){let b=CSS.supports("width","max(0px, 1px)")?"max(30px, var(--ion-safe-area-top))":"30px",l=u?"-10px":b,y=U.MIN_PRESENTING_SCALE,L=`translateY(${l}) scale(${y})`;g.addElement(o).keyframes([{offset:0,filter:"contrast(0.85)",transform:L,borderRadius:"10px 10px 0 0"},{offset:1,filter:"contrast(1)",transform:"translateY(0px) scale(1)",borderRadius:"0px"}]),d.addAnimation(g)}else if(d.addAnimation(r),!u)a.fromTo("opacity","1","0");else{let l=`translateY(-10px) scale(${u?U.MIN_PRESENTING_SCALE:1})`;g.addElement(w.querySelector(".modal-wrapper")).afterStyles({transform:"translate3d(0, 0, 0)"}).keyframes([{offset:0,filter:"contrast(0.85)",transform:l},{offset:1,filter:"contrast(1)",transform:"translateY(0) scale(1)"}]);let y=c().addElement(w.querySelector(".modal-shadow")).afterStyles({transform:"translateY(0) scale(1)"}).keyframes([{offset:0,opacity:"0",transform:l},{offset:1,opacity:"1",transform:"translateY(0) scale(1)"}]);d.addAnimation([g,y])}}else d.addAnimation(r);return d},ze=()=>{let e=c().fromTo("opacity",.01,"var(--backdrop-opacity)").beforeStyles({"pointer-events":"none"}).afterClearStyles(["pointer-events"]),t=c().keyframes([{offset:0,opacity:.01,transform:"translateY(40px)"},{offset:1,opacity:1,transform:"translateY(0px)"}]);return{backdropAnimation:e,wrapperAnimation:t}},Ke=(e,t)=>{let{currentBreakpoint:n}=t,o=Y(e),{wrapperAnimation:s,backdropAnimation:i}=n!==void 0?He(t):ze();return i.addElement(o.querySelector("ion-backdrop")),s.addElement(o.querySelector(".modal-wrapper")),c().addElement(e).easing("cubic-bezier(0.36,0.66,0.04,1)").duration(280).addAnimation([i,s])},je=()=>{let e=c().fromTo("opacity","var(--backdrop-opacity)",0),t=c().keyframes([{offset:0,opacity:.99,transform:"translateY(0px)"},{offset:1,opacity:0,transform:"translateY(40px)"}]);return{backdropAnimation:e,wrapperAnimation:t}},Ve=(e,t)=>{let{currentBreakpoint:n}=t,o=Y(e),{wrapperAnimation:s,backdropAnimation:i}=n!==void 0?qe(t):je();return i.addElement(o.querySelector("ion-backdrop")),s.addElement(o.querySelector(".modal-wrapper")),c().easing("cubic-bezier(0.47,0,0.745,0.715)").duration(200).addAnimation([i,s])},Ze=(e,t,n,o,s,i,a=[],r,d,k)=>{let u=[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1,opacity:.01}],w=[{offset:0,opacity:"var(--backdrop-opacity)"},{offset:1-s,opacity:0},{offset:1,opacity:0}],g={WRAPPER_KEYFRAMES:[{offset:0,transform:"translateY(0%)"},{offset:1,transform:"translateY(100%)"}],BACKDROP_KEYFRAMES:s!==0?w:u},f=e.querySelector("ion-content"),b=n.clientHeight,l=o,y=0,L=!1,N=.95,h=i.childAnimations.find(m=>m.id==="wrapperAnimation"),p=i.childAnimations.find(m=>m.id==="backdropAnimation"),v=a[a.length-1],B=a[0],M=()=>{e.style.setProperty("pointer-events","auto"),t.style.setProperty("pointer-events","auto"),e.classList.remove("ion-disable-focus-trap")},O=()=>{e.style.setProperty("pointer-events","none"),t.style.setProperty("pointer-events","none"),e.classList.add("ion-disable-focus-trap")};h&&p&&(h.keyframes([...g.WRAPPER_KEYFRAMES]),p.keyframes([...g.BACKDROP_KEYFRAMES]),i.progressStart(!0,1-l),l>s?M():O()),f&&l!==v&&(f.scrollY=!1);let A=m=>{let x=ne(m.event.target);if(l=r(),l===1&&x){let S=Z(x)?Y(x).querySelector(".inner-scroll"):x;return!!!x.querySelector("ion-refresher")&&S.scrollTop===0}return!0},J=m=>{L=e.canDismiss!==void 0&&e.canDismiss!==!0&&B===0,m.deltaY>0&&f&&(f.scrollY=!1),q(()=>{e.focus()}),i.progressStart(!0,1-l)},T=m=>{m.deltaY>0&&f&&(f.scrollY=!1);let x=1-l,S=a.length>1?1-a[1]:void 0,I=x+m.deltaY/b,_=S!==void 0&&I>=S&&L,P=_?N:.9999,E=_&&S!==void 0?S+le((I-S)/(P-S)):I;y=$(1e-4,E,P),i.progressStep(y)},W=m=>{let x=m.velocityY,S=(m.deltaY+x*350)/b,I=l-S,_=a.reduce((P,E)=>Math.abs(E-I)<Math.abs(P-I)?E:P);K({breakpoint:_,breakpointOffset:y,canDismiss:L,animated:!0})},K=m=>{let{breakpoint:x,canDismiss:S,breakpointOffset:I,animated:_}=m,P=S&&x===0,E=P?l:x,pe=E!==0;return l=0,h&&p&&(h.keyframes([{offset:0,transform:`translateY(${I*100}%)`},{offset:1,transform:`translateY(${(1-E)*100}%)`}]),p.keyframes([{offset:0,opacity:`calc(var(--backdrop-opacity) * ${re(1-I,s)})`},{offset:1,opacity:`calc(var(--backdrop-opacity) * ${re(E,s)})`}]),i.progressStep(0)),j.enable(!1),P?We(e,i):pe||d(),f&&E===a[a.length-1]&&(f.scrollY=!0),new Promise(Q=>{i.onFinish(()=>{pe?h&&p?q(()=>{h.keyframes([...g.WRAPPER_KEYFRAMES]),p.keyframes([...g.BACKDROP_KEYFRAMES]),i.progressStart(!0,1-E),l=E,k(l),l>s?M():O(),j.enable(!0),Q()}):(j.enable(!0),Q()):Q()},{oneTimeCallback:!0}).progressEnd(1,0,_?500:0)})},j=ee({el:n,gestureName:"modalSheet",gesturePriority:40,direction:"y",threshold:10,canStart:A,onStart:J,onMove:T,onEnd:W});return{gesture:j,moveSheetToBreakpoint:K}},Ue=':host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);border:0;background:var(--ion-color-step-350, var(--ion-background-color-step-350, #c0c0be));cursor:pointer;z-index:11}.modal-handle::before{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);content:""}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.4)}:host(.modal-card),:host(.modal-sheet){--border-radius:10px}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:10px}}.modal-wrapper{-webkit-transform:translate3d(0,  100%,  0);transform:translate3d(0,  100%,  0)}@media screen and (max-width: 767px){@supports (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - max(30px, var(--ion-safe-area-top)) - 10px)}}@supports not (width: max(0px, 1px)){:host(.modal-card){--height:calc(100% - 40px)}}:host(.modal-card) .modal-wrapper{border-start-start-radius:var(--border-radius);border-start-end-radius:var(--border-radius);border-end-end-radius:0;border-end-start-radius:0}:host(.modal-card){--backdrop-opacity:0;--width:100%;-ms-flex-align:end;align-items:flex-end}:host(.modal-card) .modal-shadow{display:none}:host(.modal-card) ion-backdrop{pointer-events:none}}@media screen and (min-width: 768px){:host(.modal-card){--width:calc(100% - 120px);--height:calc(100% - (120px + var(--ion-safe-area-top) + var(--ion-safe-area-bottom)));--max-width:720px;--max-height:1000px;--backdrop-opacity:0;--box-shadow:0px 0px 30px 10px rgba(0, 0, 0, 0.1);-webkit-transition:all 0.5s ease-in-out;transition:all 0.5s ease-in-out}:host(.modal-card) .modal-wrapper{-webkit-box-shadow:none;box-shadow:none}:host(.modal-card) .modal-shadow{-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow)}}:host(.modal-sheet) .modal-wrapper{border-start-start-radius:var(--border-radius);border-start-end-radius:var(--border-radius);border-end-end-radius:0;border-end-start-radius:0}',Je=Ue,Qe=':host{--width:100%;--min-width:auto;--max-width:auto;--height:100%;--min-height:auto;--max-height:auto;--overflow:hidden;--border-radius:0;--border-width:0;--border-style:none;--border-color:transparent;--background:var(--ion-background-color, #fff);--box-shadow:none;--backdrop-opacity:0;left:0;right:0;top:0;bottom:0;display:-ms-flexbox;display:flex;position:absolute;-ms-flex-align:center;align-items:center;-ms-flex-pack:center;justify-content:center;outline:none;color:var(--ion-text-color, #000);contain:strict}.modal-wrapper,ion-backdrop{pointer-events:auto}:host(.overlay-hidden){display:none}.modal-wrapper,.modal-shadow{border-radius:var(--border-radius);width:var(--width);min-width:var(--min-width);max-width:var(--max-width);height:var(--height);min-height:var(--min-height);max-height:var(--max-height);border-width:var(--border-width);border-style:var(--border-style);border-color:var(--border-color);background:var(--background);-webkit-box-shadow:var(--box-shadow);box-shadow:var(--box-shadow);overflow:var(--overflow);z-index:10}.modal-shadow{position:absolute;background:transparent}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--width:600px;--height:500px;--ion-safe-area-top:0px;--ion-safe-area-bottom:0px;--ion-safe-area-right:0px;--ion-safe-area-left:0px}}@media only screen and (min-width: 768px) and (min-height: 768px){:host{--width:600px;--height:600px}}.modal-handle{left:0px;right:0px;top:5px;border-radius:8px;-webkit-margin-start:auto;margin-inline-start:auto;-webkit-margin-end:auto;margin-inline-end:auto;position:absolute;width:36px;height:5px;-webkit-transform:translateZ(0);transform:translateZ(0);border:0;background:var(--ion-color-step-350, var(--ion-background-color-step-350, #c0c0be));cursor:pointer;z-index:11}.modal-handle::before{-webkit-padding-start:4px;padding-inline-start:4px;-webkit-padding-end:4px;padding-inline-end:4px;padding-top:4px;padding-bottom:4px;position:absolute;width:36px;height:5px;-webkit-transform:translate(-50%, -50%);transform:translate(-50%, -50%);content:""}:host(.modal-sheet){--height:calc(100% - (var(--ion-safe-area-top) + 10px))}:host(.modal-sheet) .modal-wrapper,:host(.modal-sheet) .modal-shadow{position:absolute;bottom:0}:host{--backdrop-opacity:var(--ion-backdrop-opacity, 0.32)}@media only screen and (min-width: 768px) and (min-height: 600px){:host{--border-radius:2px;--box-shadow:0 28px 48px rgba(0, 0, 0, 0.4)}}.modal-wrapper{-webkit-transform:translate3d(0,  40px,  0);transform:translate3d(0,  40px,  0);opacity:0.01}',Xe=Qe,et=class{constructor(e){Ye(this,e),this.didPresent=C(this,"ionModalDidPresent",7),this.willPresent=C(this,"ionModalWillPresent",7),this.willDismiss=C(this,"ionModalWillDismiss",7),this.didDismiss=C(this,"ionModalDidDismiss",7),this.ionBreakpointDidChange=C(this,"ionBreakpointDidChange",7),this.didPresentShorthand=C(this,"didPresent",7),this.willPresentShorthand=C(this,"willPresent",7),this.willDismissShorthand=C(this,"willDismiss",7),this.didDismissShorthand=C(this,"didDismiss",7),this.ionMount=C(this,"ionMount",7),this.lockController=ue(),this.triggerController=Ee(),this.coreDelegate=ke(),this.isSheetModal=!1,this.inheritedAttributes={},this.inline=!1,this.gestureAnimationDismissing=!1,this.onHandleClick=()=>{let{sheetTransition:t,handleBehavior:n}=this;n!=="cycle"||t!==void 0||this.moveToNextBreakpoint()},this.onBackdropTap=()=>{let{sheetTransition:t}=this;t===void 0&&this.dismiss(void 0,ve)},this.onLifecycle=t=>{let n=this.usersElement,o=tt[t.type];if(n&&o){let s=new CustomEvent(o,{bubbles:!1,cancelable:!1,detail:t.detail});n.dispatchEvent(s)}},this.presented=!1,this.hasController=!1,this.overlayIndex=void 0,this.delegate=void 0,this.keyboardClose=!0,this.enterAnimation=void 0,this.leaveAnimation=void 0,this.breakpoints=void 0,this.initialBreakpoint=void 0,this.backdropBreakpoint=0,this.handle=void 0,this.handleBehavior="none",this.component=void 0,this.componentProps=void 0,this.cssClass=void 0,this.backdropDismiss=!0,this.showBackdrop=!0,this.animated=!0,this.presentingElement=void 0,this.htmlAttributes=void 0,this.isOpen=!1,this.trigger=void 0,this.keepContentsMounted=!1,this.canDismiss=!0}onIsOpenChange(e,t){e===!0&&t===!1?this.present():e===!1&&t===!0&&this.dismiss()}triggerChanged(){let{trigger:e,el:t,triggerController:n}=this;e&&n.addClickListener(t,e)}breakpointsChanged(e){e!==void 0&&(this.sortedBreakpoints=e.sort((t,n)=>t-n))}connectedCallback(){let{el:e}=this;ye(e),this.triggerChanged()}disconnectedCallback(){this.triggerController.removeClickListener()}componentWillLoad(){let{breakpoints:e,initialBreakpoint:t,el:n,htmlAttributes:o}=this,s=this.isSheetModal=e!==void 0&&t!==void 0,i=["aria-label","role"];this.inheritedAttributes=fe(n,i),o!==void 0&&i.forEach(a=>{o[a]&&(this.inheritedAttributes=Object.assign(Object.assign({},this.inheritedAttributes),{[a]:o[a]}),delete o[a])}),s&&(this.currentBreakpoint=this.initialBreakpoint),e!==void 0&&t!==void 0&&!e.includes(t)&&V("Your breakpoints array must include the initialBreakpoint value."),we(n)}componentDidLoad(){this.isOpen===!0&&q(()=>this.present()),this.breakpointsChanged(this.breakpoints),this.triggerChanged()}getDelegate(e=!1){if(this.workingDelegate&&!e)return{delegate:this.workingDelegate,inline:this.inline};let t=this.el.parentNode,n=this.inline=t!==null&&!this.hasController,o=this.workingDelegate=n?this.delegate||this.coreDelegate:this.delegate;return{inline:n,delegate:o}}checkCanDismiss(e,t){return D(this,null,function*(){let{canDismiss:n}=this;return typeof n=="function"?n(e,t):n})}present(){return D(this,null,function*(){let e=yield this.lockController.lock();if(this.presented){e();return}let{presentingElement:t,el:n}=this;this.currentBreakpoint=this.initialBreakpoint;let{inline:o,delegate:s}=this.getDelegate(!0);this.ionMount.emit(),this.usersElement=yield ge(s,n,this.component,["ion-page"],this.componentProps,o),he(n)?yield Re(this.usersElement):this.keepContentsMounted||(yield Pe()),ae(()=>this.el.classList.add("show-modal"));let i=t!==void 0;i&&G(this)==="ios"&&(this.statusBarStyle=yield ce.getStyle(),Ne()),yield xe(this,"modalEnter",Oe,Ke,{presentingEl:t,currentBreakpoint:this.initialBreakpoint,backdropBreakpoint:this.backdropBreakpoint}),typeof window<"u"&&(this.keyboardOpenCallback=()=>{this.gesture&&(this.gesture.enable(!1),q(()=>{this.gesture&&this.gesture.enable(!0)}))},window.addEventListener(se,this.keyboardOpenCallback)),this.isSheetModal?this.initSheetGesture():i&&this.initSwipeToClose(),e()})}initSwipeToClose(){var e;if(G(this)!=="ios")return;let{el:t}=this,n=this.leaveAnimation||X.get("modalLeave",_e),o=this.animation=n(t,{presentingEl:this.presentingElement});if(!Ce(t)){Be(t);return}let i=(e=this.statusBarStyle)!==null&&e!==void 0?e:z.Default;this.gesture=$e(t,o,i,()=>{this.gestureAnimationDismissing=!0,de(this.statusBarStyle),this.animation.onFinish(()=>D(this,null,function*(){yield this.dismiss(void 0,F),this.gestureAnimationDismissing=!1}))}),this.gesture.enable(!0)}initSheetGesture(){let{wrapperEl:e,initialBreakpoint:t,backdropBreakpoint:n}=this;if(!e||t===void 0)return;let o=this.enterAnimation||X.get("modalEnter",Oe),s=this.animation=o(this.el,{presentingEl:this.presentingElement,currentBreakpoint:t,backdropBreakpoint:n});s.progressStart(!0,1);let{gesture:i,moveSheetToBreakpoint:a}=Ze(this.el,this.backdropEl,e,t,n,s,this.sortedBreakpoints,()=>{var r;return(r=this.currentBreakpoint)!==null&&r!==void 0?r:0},()=>this.sheetOnDismiss(),r=>{this.currentBreakpoint!==r&&(this.currentBreakpoint=r,this.ionBreakpointDidChange.emit({breakpoint:r}))});this.gesture=i,this.moveSheetToBreakpoint=a,this.gesture.enable(!0)}sheetOnDismiss(){this.gestureAnimationDismissing=!0,this.animation.onFinish(()=>D(this,null,function*(){this.currentBreakpoint=0,this.ionBreakpointDidChange.emit({breakpoint:this.currentBreakpoint}),yield this.dismiss(void 0,F),this.gestureAnimationDismissing=!1}))}dismiss(e,t){return D(this,null,function*(){var n;if(this.gestureAnimationDismissing&&t!==F)return!1;let o=yield this.lockController.lock();if(t!=="handler"&&!(yield this.checkCanDismiss(e,t)))return o(),!1;let{presentingElement:s}=this;s!==void 0&&G(this)==="ios"&&de(this.statusBarStyle),typeof window<"u"&&this.keyboardOpenCallback&&(window.removeEventListener(se,this.keyboardOpenCallback),this.keyboardOpenCallback=void 0);let a=yield Se(this,e,t,"modalLeave",_e,Ve,{presentingEl:s,currentBreakpoint:(n=this.currentBreakpoint)!==null&&n!==void 0?n:this.initialBreakpoint,backdropBreakpoint:this.backdropBreakpoint});if(a){let{delegate:r}=this.getDelegate();yield be(r,this.usersElement),ae(()=>this.el.classList.remove("show-modal")),this.animation&&this.animation.destroy(),this.gesture&&this.gesture.destroy()}return this.currentBreakpoint=void 0,this.animation=void 0,o(),a})}onDidDismiss(){return te(this.el,"ionModalDidDismiss")}onWillDismiss(){return te(this.el,"ionModalWillDismiss")}setCurrentBreakpoint(e){return D(this,null,function*(){if(!this.isSheetModal){V("setCurrentBreakpoint is only supported on sheet modals.");return}if(!this.breakpoints.includes(e)){V(`Attempted to set invalid breakpoint value ${e}. Please double check that the breakpoint value is part of your defined breakpoints.`);return}let{currentBreakpoint:t,moveSheetToBreakpoint:n,canDismiss:o,breakpoints:s,animated:i}=this;t!==e&&n&&(this.sheetTransition=n({breakpoint:e,breakpointOffset:1-t,canDismiss:o!==void 0&&o!==!0&&s[0]===0,animated:i}),yield this.sheetTransition,this.sheetTransition=void 0)})}getCurrentBreakpoint(){return D(this,null,function*(){return this.currentBreakpoint})}moveToNextBreakpoint(){return D(this,null,function*(){let{breakpoints:e,currentBreakpoint:t}=this;if(!e||t==null)return!1;let n=e.filter(a=>a!==0),s=(n.indexOf(t)+1)%n.length,i=n[s];return yield this.setCurrentBreakpoint(i),!0})}render(){let{handle:e,isSheetModal:t,presentingElement:n,htmlAttributes:o,handleBehavior:s,inheritedAttributes:i}=this,a=e!==!1&&t,r=G(this),d=n!==void 0&&r==="ios",k=s==="cycle";return R(Ie,Object.assign({key:"bb00efb8cbbdb2d1bbcc5e9c638586e2904882a8","no-router":!0,tabindex:"-1"},o,{style:{zIndex:`${2e4+this.overlayIndex}`},class:Object.assign({[r]:!0,"modal-default":!d&&!t,"modal-card":d,"modal-sheet":t,"overlay-hidden":!0},De(this.cssClass)),onIonBackdropTap:this.onBackdropTap,onIonModalDidPresent:this.onLifecycle,onIonModalWillPresent:this.onLifecycle,onIonModalWillDismiss:this.onLifecycle,onIonModalDidDismiss:this.onLifecycle}),R("ion-backdrop",{key:"d2d50f736fdc34b933c00309fe0b67e4aff7ee63",ref:u=>this.backdropEl=u,visible:this.showBackdrop,tappable:this.backdropDismiss,part:"backdrop"}),r==="ios"&&R("div",{key:"5d3523a04da9350ae435a4f3247198095b71f206",class:"modal-shadow"}),R("div",Object.assign({key:"09b3c4b629155f8c32f5c896cf689ffbe7004de8",role:"dialog"},i,{"aria-modal":"true",class:"modal-wrapper ion-overlay-wrapper",part:"content",ref:u=>this.wrapperEl=u}),a&&R("button",{key:"e47d90068927f3a518e4144e17f18ac326126712",class:"modal-handle",tabIndex:k?0:-1,"aria-label":"Activate to adjust the size of the dialog overlaying the screen",onClick:k?this.onHandleClick:void 0,part:"handle"}),R("slot",{key:"5733e94b3ecc4ed9bfb6aec5cd254cd0e43ee8f7"})))}get el(){return Te(this)}static get watchers(){return{isOpen:["onIsOpenChange"],trigger:["triggerChanged"]}}},tt={ionModalDidPresent:"ionViewDidEnter",ionModalWillPresent:"ionViewWillEnter",ionModalWillDismiss:"ionViewWillLeave",ionModalDidDismiss:"ionViewDidLeave"};et.style={ios:Je,md:Xe};export{et as ion_modal};
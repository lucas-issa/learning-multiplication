(this["webpackJsonplearning-multiplication"]=this["webpackJsonplearning-multiplication"]||[]).push([[0],{12:function(e,t,a){e.exports=a(20)},17:function(e,t,a){},18:function(e,t,a){},19:function(e,t,a){},20:function(e,t,a){"use strict";a.r(t);var s=a(0),n=a.n(s),o=a(6),c=a.n(o),i=(a(17),a(18),a(3)),r=a(7),l=a(4),m=a(8),u=a(9),f=a(11),h=a(10),v=(a(19),function(e){var t=e.stats,a=e.type,s=t.hits,o=t.hitsLate,c=t.hitsTooLate,i=t.misses,r=t.skips,l=t.reveals;return n.a.createElement("div",{className:"stats"},n.a.createElement("div",{className:"stats-type"},a),n.a.createElement("div",null,n.a.createElement("span",{className:"hits stats-item"},s),o>0&&n.a.createElement("span",{className:"hits-late stats-item"},o),c>0&&n.a.createElement("span",{className:"hits-too-late stats-item"},c),r>0&&n.a.createElement("span",{className:"skips stats-item"},r),l>0&&n.a.createElement("span",{className:"reveals stats-item"},l),i>0&&n.a.createElement("span",{className:"misses stats-item"},i)))});var g=function(e){Object(f.a)(a,e);var t=Object(h.a)(a);function a(){var e;Object(m.a)(this,a);for(var s=arguments.length,n=new Array(s),o=0;o<s;o++)n[o]=arguments[o];return(e=t.call.apply(t,[this].concat(n))).state={message:"",messageClassName:"",factor1:null,factor2:null,result:null,resultTry:"",stats:{temp:{hits:0,hitsLate:0,hitsTooLate:0,misses:0,skips:0,reveals:0},global:{hits:0,hitsLate:0,hitsTooLate:0,misses:0,skips:0,reveals:0}},seconds:0},e.timer=void 0,e.secondsLate=10,e.secondsTooLate=18,e.toComeBack=new Map,e.comeBackControl={count:0},e.input=void 0,e.generateToComeBack=function(e,t){return"".concat(e,"x").concat(t)},e.incrementToComeBack=function(){var t=e.state,a=t.factor1,s=t.factor2,n=t.result,o=e.generateToComeBack(a,s),c=e.toComeBack.get(o);c||(c={factor1:a,factor2:s,result:n,count:0},e.toComeBack.set(o,c)),c.count++},e.decrementToComeBack=function(t,a){var s=e.generateToComeBack(t,a),n=e.toComeBack.get(s);n&&(n.count--,n.count<=0&&e.toComeBack.delete(s))},e.mesgTimeout=void 0,e.randomFactor=function(){return Math.round(10*Math.random())},e.decideComeBack=function(){return 0!==e.toComeBack.size&&(t=e.toComeBack.size>=12?2:e.toComeBack.size>=6?4:6,e.comeBackControl.count>=t);var t},e.randomFactors=function(){e.comeBackControl.count++;var t,a,s,n=!1;e.decideComeBack()&&(console.log("useComeBack, count: ".concat(e.comeBackControl.count,", size: ").concat(e.toComeBack.size)),e.comeBackControl.count=0,n=!0);if(n){var o=Object(l.a)(e.toComeBack.values()),c=Math.round(Math.random()*(o.length-1));console.log("useComeBack, i: ".concat(c));var i=o[c];t=i.factor1,a=i.factor2,s=i.result,console.log("useComeBack",e.generateToComeBack(t,a))}else s=(t=e.randomFactor())*(a=e.randomFactor());e.setState({factor1:t,factor2:a,result:s,resultTry:"",seconds:0}),e.focus()},e.onChange=function(t){var a=t.target.value,s=""===a?"":Number(a);e.setState({resultTry:s})},e.go=function(){var t=e.state,a=t.result,s=t.resultTry,n=t.seconds;if(a===s){if(n>=e.secondsTooLate)e.emitMessage("Right but slow","success-too-late"),e.incrementToComeBack(),e.incrementStat("hitsTooLate");else if(n>=e.secondsLate)e.emitMessage("Congratulations! You can be faster!","success-late"),e.incrementToComeBack(),e.incrementStat("hitsLate");else{e.emitMessage("Congratulations!!!","success");var o=e.state,c=o.factor1,i=o.factor2;e.decrementToComeBack(c,i),e.incrementStat("hits")}e.randomFactors()}else""===s||s===Number.NaN?e.emitMessage("Type a number...","failure"):s>100?e.emitMessage("Type a number smaller than 100...","failure"):s<0?e.emitMessage("Type a positive number...","failure"):Math.round(s)!==s?e.emitMessage("Type a rounded number...","failure"):(e.emitMessage("Try again...","failure"),e.incrementToComeBack(),e.incrementStat("misses")),e.focus()},e.onSubmit=function(t){t.preventDefault(),e.go()},e.reset=function(){e.randomFactors(),e.setState({stats:{temp:{hits:0,hitsLate:0,hitsTooLate:0,misses:0,skips:0,reveals:0},global:e.state.stats.global}},e.save)},e.reveal=function(){e.emitMessage(e.state.result.toString(10)),e.incrementToComeBack(),e.incrementStat("reveals"),e.focus()},e.skip=function(){e.incrementToComeBack(),e.randomFactors(),e.incrementStat("skips")},e.load=function(){var t=JSON.parse(localStorage.getItem("stats"));t&&t.global&&e.setState({stats:t});var a=JSON.parse(localStorage.getItem("toComeBack"));a&&a.toComeBack&&Object.keys(a.toComeBack).forEach((function(t){e.toComeBack.set(t,a.toComeBack[t])}))},e.save=function(){localStorage.setItem("stats",JSON.stringify(e.state.stats));var t,a={},s=Object(r.a)(e.toComeBack.entries());try{for(s.s();!(t=s.n()).done;){var n=t.value;a[n[0]]=n[1]}}catch(o){s.e(o)}finally{s.f()}localStorage.setItem("toComeBack",JSON.stringify({toComeBack:a}))},e.getTimerClass=function(t){return t>=e.secondsTooLate?"timer-critical":t>=e.secondsLate?"timer-warn":"timer-ok"},e.getPracticeList=function(){return Object(l.a)(e.toComeBack.entries()).map((function(e){return Object(i.a)({key:e[0]},e[1])})).sort((function(e,t){var a=t.count-e.count;return 0===a&&(a=e.key.localeCompare(t.key)),a}))},e.showPracticeResults=!1,e.showPracticeResultsTimer=void 0,e.revealAll=function(){e.showPracticeResultsTimer&&(clearTimeout(e.showPracticeResultsTimer),e.showPracticeResultsTimer=null),e.showPracticeResults=!0,setTimeout((function(){e.showPracticeResults=!1}),2500*e.toComeBack.size)},e}return Object(u.a)(a,[{key:"componentWillMount",value:function(){this.load()}},{key:"componentDidMount",value:function(){var e=this;this.randomFactors(),this.timer=setInterval((function(){e.setState({seconds:e.state.seconds+1})}),1e3),setTimeout((function(){e.input.focus()}),250)}},{key:"componentWillUnmount",value:function(){clearInterval(this.timer)}},{key:"getTimeToShowMessage",value:function(e){if("number"===typeof e){return console.log("number",3e3),3e3}var t=e.split(" ").length;return 400+50*e.length+200*t}},{key:"emitMessage",value:function(e){var t=this,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"";this.mesgTimeout&&(clearTimeout(this.mesgTimeout),this.mesgTimeout=null),this.setState({message:e,messageClassName:a}),this.mesgTimeout=setTimeout((function(){t.setState({message:"",messageClassName:""})}),this.getTimeToShowMessage(e))}},{key:"incrementStat",value:function(e){var t=Object(i.a)({},this.state.stats.temp),a=Object(i.a)({},this.state.stats.global);t[e]=t[e]+1,a[e]=a[e]+1,this.setState({stats:{temp:t,global:a}},this.save)}},{key:"focus",value:function(){this.input.blur(),this.input.focus()}},{key:"render",value:function(){var e=this,t=this.state,a=t.message,s=t.messageClassName,o=t.factor1,c=t.factor2,i=t.resultTry,r=t.stats,l=t.seconds,m=this.getPracticeList(),u=m.map((function(e){return e.count})).reduce((function(e,t){return e+t}),0);return n.a.createElement("div",{className:"factors"},n.a.createElement("div",{className:"message"},n.a.createElement("span",{className:s},a)),n.a.createElement("div",{className:"operation"},n.a.createElement("form",{onSubmit:this.onSubmit},n.a.createElement("div",null,o," x ",c," = ",n.a.createElement("input",{type:"number",maxLength:2,max:100,min:0,value:i,onChange:this.onChange,ref:function(t){e.input=t}}),n.a.createElement("button",{type:"submit",className:"hits"},"Go")),n.a.createElement("div",{className:"timer ".concat(this.getTimerClass(l))},l,"s"))),n.a.createElement("div",null,n.a.createElement("button",{className:"reset",onClick:this.reset},"Reset"),n.a.createElement("button",{className:"skips",onClick:this.skip},"Next"),n.a.createElement("button",{className:"reveals",onClick:this.reveal},"Reveal")),n.a.createElement(v,{stats:r.temp,type:"Until reset"}),n.a.createElement(v,{stats:r.global,type:"Global"}),m.length>0&&n.a.createElement("div",{className:"practice"},n.a.createElement("div",{className:"practice-title"},"To study (",this.toComeBack.size," items)"),n.a.createElement("div",{className:"practice-title no-fast-hit"},"Total negative points: ",u),n.a.createElement("div",{className:"practice-list"},m.map((function(t){return n.a.createElement("div",{key:t.key},t.key," ",e.showPracticeResults&&n.a.createElement("span",null,"= ",n.a.createElement("span",{className:"reveals"},t.result))," ",n.a.createElement("span",{className:"no-fast-hit"},"(negative points: ",t.count,")"))}))),n.a.createElement("div",{className:"operation"},n.a.createElement("button",{className:"reveals",onClick:this.revealAll},"Reveal all"))))}}]),a}(n.a.Component);var d=function(){return n.a.createElement("div",{className:"App"},n.a.createElement("header",{className:"App-header"},"Learning multiplication"),n.a.createElement(g,null))},p=Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));function k(e,t){navigator.serviceWorker.register(e).then((function(e){e.onupdatefound=function(){var a=e.installing;null!=a&&(a.onstatechange=function(){"installed"===a.state&&(navigator.serviceWorker.controller?(console.log("New content is available and will be used when all tabs for this page are closed. See https://bit.ly/CRA-PWA."),t&&t.onUpdate&&t.onUpdate(e)):(console.log("Content is cached for offline use."),t&&t.onSuccess&&t.onSuccess(e)))})}})).catch((function(e){console.error("Error during service worker registration:",e)}))}c.a.render(n.a.createElement(n.a.StrictMode,null,n.a.createElement(d,null)),document.getElementById("root")),function(e){if("serviceWorker"in navigator){if(new URL(".",window.location.href).origin!==window.location.origin)return;window.addEventListener("load",(function(){var t="".concat(".","/service-worker.js");p?(!function(e,t){fetch(e,{headers:{"Service-Worker":"script"}}).then((function(a){var s=a.headers.get("content-type");404===a.status||null!=s&&-1===s.indexOf("javascript")?navigator.serviceWorker.ready.then((function(e){e.unregister().then((function(){window.location.reload()}))})):k(e,t)})).catch((function(){console.log("No internet connection found. App is running in offline mode.")}))}(t,e),navigator.serviceWorker.ready.then((function(){console.log("This web app is being served cache-first by a service worker. To learn more, visit https://bit.ly/CRA-PWA")}))):k(t,e)}))}}()}},[[12,1,2]]]);
//# sourceMappingURL=main.25302708.chunk.js.map
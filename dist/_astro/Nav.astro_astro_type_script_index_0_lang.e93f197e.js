(function(c){var n={kitId:"pmm4vza",scriptTimeout:3e3,async:!0},a=c.documentElement,d=setTimeout(function(){a.className=a.className.replace(/\bwf-loading\b/g,"")+" wf-inactive"},n.scriptTimeout),e=c.createElement("script"),s=!1,t=c.getElementsByTagName("script")[0],i;a.className+=" wf-loading",e.src="https://use.typekit.net/"+n.kitId+".js",e.async=!0,e.onload=e.onreadystatechange=function(){if(i=this.readyState,!(s||i&&i!="complete"&&i!="loaded")){s=!0,clearTimeout(d);try{Typekit.load(n)}catch{}}},t.parentNode.insertBefore(e,t)})(document);addEventListener("load",()=>document.documentElement.classList.add("loaded"));class o extends HTMLElement{constructor(){super(),this.appendChild(this.querySelector("template").content.cloneNode(!0));const n=this.querySelector("button"),a=document.getElementById("menu-content");a.hidden=!0;const d=t=>{n.setAttribute("aria-expanded",t?"true":"false"),a.hidden=!t};n.addEventListener("click",()=>d(a.hidden));const e=t=>{d(t.matches),n.hidden=t.matches},s=window.matchMedia("(min-width: 50em)");e(s),s.addEventListener("change",e)}}customElements.define("menu-button",o);
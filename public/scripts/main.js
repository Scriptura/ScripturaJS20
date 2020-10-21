"use strict";const jsDetect=void document.documentElement.classList.replace("no-js","js"),touchDetect=(()=>{const e=document.documentElement;"ontouchstart"in window||navigator.msMaxTouchPoints?e.classList.add("touch"):e.classList.add("no-touch")})(),fadeOut=(e,t)=>{e.style.opacity=1(function o(){(e.style.opacity-=30/t)<0?(e.style.opacity=0,e.style.display="none"):requestAnimationFrame(o)})()},fadeIn=(e,t)=>{e.style.opacity=0,e.style.display="block"(function o(){let n=parseFloat(e.style.opacity);(n+=30/t)>1||(e.style.opacity=n,requestAnimationFrame(o)),n>.99&&(e.style.opacity=1)})()},injectSvgSprite=(e,t,o)=>{void 0===o&&(o="utils");const n='<svg><use xlink:href="/medias/sprites/'+o+".svg#"+t+'"></use></svg>';e.insertAdjacentHTML("beforeEnd",n)},externalLinks=(()=>{var e=document.querySelectorAll("a");for(const t of e)t.hostname!==window.location.hostname&&t.setAttribute("target","_blank")})(),cmdPrint=(()=>{const e=document.getElementsByClassName("cmd-print"),t=()=>window.print();for(const o of e)o.onclick=t})(),selectText=e=>{const t=document.body;if(t.createTextRange){const o=t.createTextRange();o.moveToElementText(e),o.select()}else if(window.getSelection){const t=window.getSelection(),o=document.createRange();o.selectNodeContents(e),t.removeAllRanges(),t.addRange(o)}else console.warn("Could not select text in node: Unsupported browser.")},selectAndCopy=(()=>{const e=document.querySelectorAll("[data-select]");for(const t of e){t.parentElement.classList.add("pre");const e=t.dataset.value;t.insertAdjacentHTML("afterend",'<button type="button">'+e+"</button>"),t.nextElementSibling.addEventListener("click",()=>{selectText(t),document.execCommand("copy")})}})(),readablePassword=(()=>{const e=document.querySelectorAll(".input [type=password]");for(const t of e){t.parentElement.classList.replace("input","input-password");const e=document.createElement("button");e.type="button",e.title="See password",t.parentElement.appendChild(e),injectSvgSprite(e,"eye"),e.addEventListener("click",()=>{e.removeChild(e.querySelector("svg")),"password"===t.type?(t.type="text",e.title="Hide password",injectSvgSprite(e,"eye-blocked")):(t.type="password",e.title="See password",injectSvgSprite(e,"eye"))})}})(),scrollToTop=(()=>{const e=document.querySelector("footer"),t=document.createElement("button");t.type="button",t.classList.add("scroll-top"),injectSvgSprite(t,"arrow-up"),e.appendChild(t);const o=document.querySelector(".scroll-top");o.classList.add("hide");window.addEventListener("scroll",()=>{const e=window.innerHeight;window.scrollY>e?o.classList.remove("hide"):o.classList.add("hide")});const n=()=>{const e=document.documentElement.scrollTop||document.body.scrollTop,t=document.documentElement,o=window.getComputedStyle(t,null).getPropertyValue("scroll-behavior");"auto"!=o&&(t.style.scrollBehavior="auto"),e>0&&(window.requestAnimationFrame(n),window.scrollTo(0,e-e/8)),"auto"!=o&&(t.style.scrollBehavior="")};o.addEventListener("click",n,!1)})(),accordion=(()=>{(()=>{const e=document.querySelectorAll(".accordion");for(const t of e)t.setAttribute("role","tablist")})(),(()=>{const e=document.querySelectorAll(".accordion details");for(const t of e){const e=t.innerHTML,o=document.createElement("div");o.classList.add("accordion-details"),t.open&&o.classList.add("open"),t.parentElement.insertBefore(o,t),o.appendChild(t).insertAdjacentHTML("afterend",e),t.parentElement.removeChild(t)}})(),(()=>{const e=document.querySelectorAll(".accordion summary");let t=0;for(const o of e){t++;const e=o.innerHTML,n=document.createElement("button");n.id="accordion-summary-"+t,n.type="button",n.classList.add("accordion-summary"),n.setAttribute("role","tab"),n.setAttribute("aria-controls","accordion-panel-"+t),o.parentElement.insertBefore(n,o),n.appendChild(o).insertAdjacentHTML("afterend",e),o.parentElement.removeChild(o)}})(),(()=>{const e=document.querySelectorAll(".accordion > * > :last-child");let t=0;for(const o of e)t++,o.id="accordion-panel-"+t,o.classList.add("accordion-panel"),o.setAttribute("role","tabpanel"),o.setAttribute("aria-labelledby","accordion-summary-"+t)})(),(()=>{const t=document.querySelectorAll(".accordion-details");for(const e of t){const t=e.children[0],o=e.children[1];e.classList.contains("open")?(t.setAttribute("aria-expanded","true"),o.style.maxHeight="inherit",o.style.maxHeight=o.scrollHeight+"px",o.setAttribute("aria-hidden","false")):(t.setAttribute("aria-expanded","false"),o.setAttribute("aria-hidden","true"))}const o=document.querySelectorAll(".accordion-summary");for(const t of o)t.addEventListener("click",()=>{const o=t.parentElement.parentElement.dataset.singletab;t.parentElement.classList.toggle("open"),t.parentElement.classList.contains("open")?t.setAttribute("aria-expanded","true"):t.setAttribute("aria-expanded","false"),o&&e(t.parentElement);const n=t.nextElementSibling;n.style.maxHeight?(n.style.maxHeight=null,n.setAttribute("aria-hidden","true")):(n.style.maxHeight=n.scrollHeight+"px",n.setAttribute("aria-hidden","false"))})})();const e=e=>{for(const t of e.parentElement.children)t!==e&&(t.classList.remove("open"),t.firstElementChild.setAttribute("aria-expanded","false"),t.lastElementChild.style.maxHeight=null,t.lastElementChild.setAttribute("aria-hidden","true"))}})(),imageFocus=(()=>{const e=document.querySelectorAll("[class*=-focus]"),t=((()=>{for(const t of e){const e=document.createElement("button");injectSvgSprite(e,"enlarge"),t.appendChild(e),e.classList.add("icon-enlarge")}})(),(()=>{for(const o of e)o.addEventListener("click",()=>{t(o),document.body.style.overflow="hidden"})})(),e=>{let t=e.querySelector("img").cloneNode(!0);document.body.appendChild(t),t=o(t),t=n(e)}),o=e=>{const t=document.createElement("div");t.classList.add("focus-off"),console.log(t),e.parentNode.insertBefore(t,e),t.appendChild(e),s()},n=e=>{const t=document.querySelector(".focus-off");t.addEventListener("click",()=>{t.parentNode.removeChild(t),document.body.removeAttribute("style"),e.querySelector("button").focus()})},s=()=>{const e=document.querySelector(".focus-off"),t=document.createElement("button");e.appendChild(t),injectSvgSprite(t,"shrink"),t.classList.add("icon-shrink"),t.focus()}})();
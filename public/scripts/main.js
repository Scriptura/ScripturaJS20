"use strict";const jsDetect=void document.querySelector("html").classList.replace("no-js","js"),touchDetect=(()=>{const e=document.documentElement;return"ontouchstart"in window||navigator.msMaxTouchPoints?(e.classList.add("touch"),{touch:!0}):(e.classList.add("no-touch"),{touch:!1})})(),fadeOut=(e,t)=>{e.style.opacity=1,function o(){(e.style.opacity-=30/t)<0?(e.style.opacity=0,e.style.display="none"):requestAnimationFrame(o)}()},fadeIn=(e,t)=>{e.style.opacity=0,e.style.display="block",function o(){let n=parseFloat(e.style.opacity);(n+=30/t)>1||(e.style.opacity=n,requestAnimationFrame(o)),n>.99&&(e.style.opacity=1)}()},externalLinks=(()=>{var e=document.querySelectorAll("a");for(const t of e)t.hostname!==window.location.hostname&&t.setAttribute("target","_blank")})(),cmdPrint=(()=>{const e=document.getElementsByClassName("cmd-print"),t=()=>(window.print(),!1);for(const o of e)o.onclick=t})(),selectText=e=>{console.log(e);const t=document.body;if(t.createTextRange){const o=t.createTextRange();o.moveToElementText(e),o.select()}else if(window.getSelection){const t=window.getSelection(),o=document.createRange();o.selectNodeContents(e),t.removeAllRanges(),t.addRange(o)}else console.warn("Could not select text in node: Unsupported browser.")},selectAndCopy=(()=>{const e=document.querySelectorAll("[data-select]");for(const t of e){t.parentElement.classList.add("relative"),t.insertAdjacentHTML("afterend",'<button type="button">select & copy</button>'),t.nextElementSibling.addEventListener("click",()=>{selectText(t),document.execCommand("copy")})}})(),readablePassword=(()=>{const e=document.querySelectorAll(".input [type=password]");for(const t of e){t.parentElement.classList.replace("input","input-password"),t.insertAdjacentHTML("afterend",'<button type="button">see</button>'),t.nextElementSibling.addEventListener("click",()=>{const e="password"===t.type?"text":"password";t.type=e},!1)}})(),scrollToTop=(()=>{document.querySelector("footer").insertAdjacentHTML("beforeEnd",'<button class="scroll-top"><svg><path d="M20 32v-16l6 6 6-6-16-16-16 16 6 6 6-6v16z"/></svg></button>');const e=document.querySelector(".scroll-top");e.classList.add("hide");window.addEventListener("scroll",()=>{const t=window.innerHeight/2;window.scrollY>t?e.classList.remove("hide"):e.classList.add("hide")});const t=()=>{const e=document.documentElement.scrollTop||document.body.scrollTop,o=document.querySelector("html"),n=window.getComputedStyle(o,null).getPropertyValue("scroll-behavior");"auto"!=n&&(o.style.scrollBehavior="auto"),e>0&&(window.requestAnimationFrame(t),window.scrollTo(0,e-e/8)),"auto"!=n&&(o.style.scrollBehavior="")};e.addEventListener("click",t,!1)})();
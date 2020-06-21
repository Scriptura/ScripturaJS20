'use strict'

// -----------------------------------------------------------------------------
// @section     Support
// @description Détecte les supports et ajoute des classes dans le tag html
// -----------------------------------------------------------------------------

// @documentation Performance pour les selecteurs @see https://jsbench.me/d7kbm759bb/1
const jsDetect = (() => {
  const html = document.documentElement // 1
  html.classList.replace('no-js', 'js')
})()

// @see https://stackoverflow.com/questions/4817029/whats-the-best-way-to-detect-a-touch-screen-device-using-javascript
const touchDetect = (() => {
  const html = document.documentElement,
        touch = 'ontouchstart' in window || navigator.msMaxTouchPoints // @todo Condition à réévaluer
  if (touch) html.classList.add('touch')
  else html.classList.add('no-touch')
})()


// -----------------------------------------------------------------------------
// @section     Utilities
// @description Utilitaires consommables pour les autres fonctions
// -----------------------------------------------------------------------------

// @documentation Performance pour le script @see https://jsbench.me/trkbm71304/
//const siblings = el => {
//  for (const sibling of el.parentElement.children) if (sibling !== el) sibling.classList.add('color')
//}

const fadeOut = (el, duration) => {
  el.style.opacity = 1
  (function fade() {
    if ((el.style.opacity -= 30 / duration) < 0) {
      el.style.opacity = 0 // reset derrière la décrémentation
      el.style.display = 'none'
    } else {
      requestAnimationFrame(fade)
    }
  })()
}

const fadeIn = (el, duration) => {
  el.style.opacity = 0
  el.style.display = 'block'
  (function fade() {
    let op = parseFloat(el.style.opacity)
    if (!((op += 30 / duration) > 1)) {
      el.style.opacity = op
      requestAnimationFrame(fade)
    }
    if (op > .99) el.style.opacity = 1 // reset derrière l'incrémentation
  })()
}


// -----------------------------------------------------------------------------
// @section     External links
// @description Gestion des liens externes au site
// -----------------------------------------------------------------------------

// @note Par défaut tous les liens externes conduisent à l'ouverture d'un nouvel onglet, sauf les liens internes

const externalLinks = (() => {
  var anchors = document.querySelectorAll('a')
  for (const anchor of anchors) {
    if (anchor.hostname !== window.location.hostname) anchor.setAttribute('target', '_blank')
  }
})()


// -----------------------------------------------------------------------------
// @section     Cmd Print
// @description Commande pour l'impression
// -----------------------------------------------------------------------------

const cmdPrint = (() => {
  const prints = document.getElementsByClassName('cmd-print'),
        startPrint = () => window.print()
  for (const print of prints) print.onclick = startPrint
})()


// -----------------------------------------------------------------------------
// @section     Select and copy code
// @description Sélection et copie des informations d'un bloc de code
// -----------------------------------------------------------------------------

// @see https://stackoverflow.com/questions/985272/selecting-text-in-an-element-akin-to-highlighting-with-your-mouse

const selectText = node => {
  const documentBody = document.body
  if (documentBody.createTextRange) {
    const range = documentBody.createTextRange()
    range.moveToElementText(node)
    range.select()
  } else if (window.getSelection) {
    const selection = window.getSelection()
    const range = document.createRange()
    range.selectNodeContents(node)
    selection.removeAllRanges()
    selection.addRange(range)
  } else {
    console.warn('Could not select text in node: Unsupported browser.')
  }
}

const selectAndCopy = (() => {
  const els = document.querySelectorAll('[data-select]')
  for (const el of els) {
    el.parentElement.classList.add('relative')
    el.insertAdjacentHTML('afterend', '<button type="button">select & copy</button>')
    const button = el.nextElementSibling
    button.addEventListener('click', () => {
      selectText(el)
      document.execCommand('copy')
    })
  }
})()


// -----------------------------------------------------------------------------
// @section     Readable Password
// @description Permutation du type permettant de voir les mots de passe en clair
// -----------------------------------------------------------------------------

const readablePassword = (() => {
  const inputs = document.querySelectorAll('.input [type=password]')
  for (const input of inputs) {
    input.parentElement.classList.replace('input', 'input-password')
    input.insertAdjacentHTML('afterend', '<button type="button">see</button>')
    const button = input.nextElementSibling
    button.addEventListener('click', () => input.type = input.type === 'password'? 'text' : 'password')
  }
})()


// -----------------------------------------------------------------------------
// @section     Scroll To Top
// @description Défilement vers le haut
// -----------------------------------------------------------------------------

// 1. Ajouter l'attribut `xmlns="http://www.w3.org/2000/svg"` pour un svg valide ; mais à partir du moment où il s'agit d'une injection js et où tous les navigateurs l'interprêtent correctement, est-ce bien nécessaire ?
// 2. @see http://jsfiddle.net/smc8ofgg/
// 3. @see https://stackoverflow.com/questions/15935318/smooth-scroll-to-top/55926067
// 4. @note Script avec un effet sympa mais en conflit avec la règle CSS scroll-behavior:smooth, celle-ci doit donc être désactivée pour la durée du script.
const scrollToTop = (() => {
  const footer = document.querySelector('footer')
  const arrow = '<button class="scroll-top"><svg><path d="M20 32v-16l6 6 6-6-16-16-16 16 6 6 6-6v16z"/></svg></button>' // 1
  footer.insertAdjacentHTML('beforeEnd', arrow)
  const item = document.querySelector('.scroll-top')
  item.classList.add('hide')
  const position = () => { // 2
    const yy = window.innerHeight // Hauteur totale d'une fenêtre avant apparition de la flèche.
    let y = window.scrollY
    if (y > yy) item.classList.remove('hide')
    else item.classList.add('hide')
  }
  window.addEventListener('scroll', position)
  const scroll = () => { // 3
    const c = document.documentElement.scrollTop || document.body.scrollTop,
          html = document.documentElement,
          sb = window.getComputedStyle(html,null).getPropertyValue('scroll-behavior')
    if (sb != 'auto') html.style.scrollBehavior = 'auto' // 4
    if (c > 0) {
      window.requestAnimationFrame(scroll)
      window.scrollTo(0, c - c / 8)
    }
    if (sb != 'auto') html.style.scrollBehavior = ''
  }
  item.addEventListener('click', scroll, false)
})()

// @note L'effet behavior:smooth pourrait simplement être défini ainsi en JS (sans conflit avec CSS mais second choix pour l'animation) :
//window.scrollTo({top: 0, behavior: 'smooth'})
// Solution avec une définition scroll-behavior:smooth dans le CSS :
//window.scrollTo({top: 0})


// -----------------------------------------------------------------------------
// @section     Accordions
// @description Menus accordéons
// -----------------------------------------------------------------------------

// @params, deux options :
// @option 'open' : onglet ouvert par défaut ; à définir sur l'élément <details> via l'attribut 'open' (comportement html natif)
// @option 'singleTab' : un seul onglet s'ouvre à la fois ; à définir sur la div.accordion via l'attribut data-singletab

// @documentation :
// 1. Option 'open'
// 2. 'inherit' évite une animation au chargement de la page, il est donc nécessaire, la valeur doit cependant être passée en pixels pour le calcul de l'animation. D'où la double déclaration.
// 3. Option 'singleTab'

const accordion = (() => {
  const detailss = document.querySelectorAll('.accordion details')
  for (const details of detailss) {
    const summary = details.firstElementChild,
          content = details.lastElementChild
    summary.outerHTML = '<button type="button" class="accordion-summary">' + summary.innerHTML + '</button>'
    content.outerHTML = '<div class="accordion-content">' + content.innerHTML + '</div>'
    const html = details.innerHTML,
          wrapper = document.createElement('div')
    wrapper.classList.add('accordion-details')
    if (details.open) wrapper.classList.add('open') // 1
    details.parentElement.insertBefore(wrapper, details)
    wrapper.appendChild(details).insertAdjacentHTML('afterend', html)
    details.parentElement.removeChild(details)
    if (wrapper.classList.contains('open')) {
      const accordionContent = wrapper.children[1]
      accordionContent.style.maxHeight = 'inherit' // 2
      accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px' // 2
    }
  }
  const accordionSummarys = document.querySelectorAll('.accordion-summary')
  for (const accordionSummary of accordionSummarys) accordionSummary.addEventListener('click', () => {
    const singleTab = accordionSummary.parentElement.parentElement.dataset.singletab // 3
    accordionSummary.parentElement.classList.toggle('open')
    if (singleTab) siblings(accordionSummary.parentElement)
    const accordionContent = accordionSummary.nextElementSibling
    if (accordionContent.style.maxHeight) accordionContent.style.maxHeight = null
    else accordionContent.style.maxHeight = accordionContent.scrollHeight + 'px'
  })
  const siblings = el => {
    for (const sibling of el.parentElement.children) {
      if (sibling !== el) {
        sibling.classList.remove('open')
        sibling.lastElementChild.style.maxHeight = null
      }
    }
  }
})()


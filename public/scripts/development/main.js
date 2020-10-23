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


// Injection de spites SVG
// @params :
// - `targetElement` : élément cible
// - `spriteId` : nom du sprite
// - `svgFile` : nom du fichier de sprite (`utils.svg` par défaut)
const injectSvgSprite = (targetElement, spriteId, svgFile) => {
  const path = '/medias/sprites/' // Chemin des fichiers de sprites SVG
  if (svgFile === undefined) svgFile = 'utils'
  const icon = '<svg><use xlink:href="' + path + svgFile + '.svg#' + spriteId + '"></use></svg>'
  targetElement.insertAdjacentHTML('beforeEnd', icon)
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
    el.parentElement.classList.add('pre')
    const text = el.dataset.value
    el.insertAdjacentHTML('afterend', '<button type="button">' + text + '</button>')
    const button = el.nextElementSibling
    button.addEventListener('click', () => {
      selectText(el)
      document.execCommand('copy')
    })
  }
})()

const addTitleCodeBlock = (() => {
  const els = document.querySelectorAll('.pre')
  for (const el of els) {
    const item = document.createElement('div'),
          span = document.createElement('span'),
          reqText = el.children[0].dataset.code,
          text = document.createTextNode(reqText)
    //item.classList.add('pre-title')
    el.appendChild(item)
    injectSvgSprite(item, 'code')
    if (reqText) {
      span.appendChild(text)
      item.appendChild(span)
    }
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
    const button = document.createElement('button')
    button.type = 'button'
    button.title = 'See password'
    input.parentElement.appendChild(button)
    injectSvgSprite(button, 'eye')
    button.addEventListener('click', () => {
      button.removeChild(button.querySelector('svg'))
      if (input.type === 'password') {
        input.type = 'text'
        button.title = 'Hide password'
        injectSvgSprite(button, 'eye-blocked')
      } else {
        input.type = 'password'
        button.title = 'See password'
        injectSvgSprite(button, 'eye')
      }
    })
  }
})()


// -----------------------------------------------------------------------------
// @section     Scroll To Top
// @description Défilement vers le haut
// -----------------------------------------------------------------------------

// 1. @see http://jsfiddle.net/smc8ofgg/
// 2. @see https://stackoverflow.com/questions/15935318/smooth-scroll-to-top/55926067
// 3. @note Script avec un effet sympa mais en conflit avec la règle CSS scroll-behavior:smooth, celle-ci doit donc être désactivée pour la durée du script.

const scrollToTop = (() => {
  const footer = document.querySelector('footer'),
        button = document.createElement('button')
  button.type = 'button'
  button.classList.add('scroll-top')
  //button.setAttribute('aria-label', 'Scroll to top')
  injectSvgSprite(button, 'arrow-up')
  footer.appendChild(button)
  const item = document.querySelector('.scroll-top')
  item.classList.add('hide')
  const position = () => { // 1
    const yy = window.innerHeight // Hauteur totale d'une fenêtre avant apparition de la flèche.
    let y = window.scrollY
    if (y > yy) item.classList.remove('hide')
    else item.classList.add('hide')
  }
  window.addEventListener('scroll', position)
  const scroll = () => { // 2
    const c = document.documentElement.scrollTop || document.body.scrollTop,
          html = document.documentElement,
          sb = window.getComputedStyle(html,null).getPropertyValue('scroll-behavior')
    if (sb != 'auto') html.style.scrollBehavior = 'auto' // 3
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

// @documentation :
// Le html d'origine est composée de details > summary + div :
//.accordion
//  details
//    summary Title item
//    div Content item
// La première partie du script transforme ce code (difficile à animer) en divs en récupérant les attributs de leur état d'origine (ouvert/fermé) :
//.accordion
//  .accordion-details
//    .accordion-summary Title item
//    .accordion-content Content item
// La deuxième partie du code concerne les changements d'états des onglets/panneaux (ouvert/fermé).

// @params, deux options :
// @option 'open' : onglet ouvert par défaut ; à définir sur l'élément <details> via l'attribut 'open' (comportement html natif)
// @option 'singleTab' : un seul onglet s'ouvre à la fois ; à définir sur la div.accordion via l'attribut data-singletab

// 1. Option 'open'
// 2. 'inherit' évite une animation au chargement de la page, il est donc nécessaire, la valeur doit cependant être passée en pixels pour le calcul de l'animation. D'où la double déclaration.
// 3. Option 'singleTab'

// Inspiration pour les rôles et les attributs aria :
// @see https://www.w3.org/TR/wai-aria-practices-1.1/examples/accordion/accordion.html
// @see https://jqueryui.com/accordion/
// @see http://accessibility.athena-ict.com/aria/examples/tabpanel2.shtml

const accordion = (() => {
  const transformationOfAccordions = (() => {
    const accordions = document.querySelectorAll('.accordion')
    for (const accordion of accordions) {
      accordion.setAttribute('role', 'tablist')
    }
  })()
  const transformationOfDetails = (() => {
    const detailss = document.querySelectorAll('.accordion details')
    for (const details of detailss) {
      const html = details.innerHTML,
            substitute = document.createElement('div')
      substitute.classList.add('accordion-details')
      if (details.open) {
        substitute.classList.add('open') // 1
      }
      details.parentElement.insertBefore(substitute, details)
      substitute.appendChild(details).insertAdjacentHTML('afterend', html)
      details.parentElement.removeChild(details)
    }
  })()
  const transformationOfSummarys = (() => {
    const summarys = document.querySelectorAll('.accordion summary')
    let i = 0
    for (const summary of summarys) {
      i++
      const html = summary.innerHTML,
            substitute = document.createElement('button')
      substitute.id = 'accordion-summary-' + i
      substitute.type = 'button'
      substitute.classList.add('accordion-summary')
      substitute.setAttribute('role', 'tab')
      substitute.setAttribute('aria-controls', 'accordion-panel-' + i)
      summary.parentElement.insertBefore(substitute, summary)
      substitute.appendChild(summary).insertAdjacentHTML('afterend', html)
      summary.parentElement.removeChild(summary)
    }
  })()
  const transformationOfPannels = (() => {
    const panels = document.querySelectorAll('.accordion > * > :last-child')
    let i = 0
    for (const panel of panels) {
      i++
      panel.id = 'accordion-panel-' + i
      panel.classList.add('accordion-panel')
      panel.setAttribute('role', 'tabpanel')
      panel.setAttribute('aria-labelledby', 'accordion-summary-' + i)
    }
  })()
  const stateManagement = (() => {
    const detailss = document.querySelectorAll('.accordion-details')
    for (const details of detailss) {
      const accordionSummary = details.children[0],
            accordionPanel = details.children[1]
      if (details.classList.contains('open')) {
        accordionSummary.setAttribute('aria-expanded', 'true')
        accordionPanel.style.maxHeight = 'inherit' // 2
        accordionPanel.style.maxHeight = accordionPanel.scrollHeight + 'px' // 2
        accordionPanel.setAttribute('aria-hidden', 'false')
      }
      else {
        accordionSummary.setAttribute('aria-expanded', 'false')
        accordionPanel.setAttribute('aria-hidden', 'true')
      }
    }
    const accordionSummarys = document.querySelectorAll('.accordion-summary')
    for (const accordionSummary of accordionSummarys) accordionSummary.addEventListener('click', () => {
      const singleTab = accordionSummary.parentElement.parentElement.dataset.singletab // 3
      accordionSummary.parentElement.classList.toggle('open')
      if (accordionSummary.parentElement.classList.contains('open'))
        accordionSummary.setAttribute('aria-expanded', 'true')
      else
        accordionSummary.setAttribute('aria-expanded', 'false')
      if (singleTab)
        siblingStateManagement(accordionSummary.parentElement)
      const accordionPanel = accordionSummary.nextElementSibling
      if (accordionPanel.style.maxHeight) {
        accordionPanel.style.maxHeight = null
        accordionPanel.setAttribute('aria-hidden', 'true')
      }
      else {
        accordionPanel.style.maxHeight = accordionPanel.scrollHeight + 'px'
        accordionPanel.setAttribute('aria-hidden', 'false')
      }
    })
  })()
  const siblingStateManagement = el => {
    for (const sibling of el.parentElement.children) {
      if (sibling !== el) {
        sibling.classList.remove('open')
        sibling.firstElementChild.setAttribute('aria-expanded', 'false')
        sibling.lastElementChild.style.maxHeight = null
        sibling.lastElementChild.setAttribute('aria-hidden', 'true')
      }
    }
  }
})()


// -----------------------------------------------------------------------------
// @section     Figure focus
// @description Zoom sur les images
// -----------------------------------------------------------------------------

const imageFocus = (() => {

  const images = document.querySelectorAll('[class*=-focus]')

  const addButtonEnlarge = (() => {
    for (const image of images) {
      const button = document.createElement('button')
      injectSvgSprite(button, 'enlarge')
      image.appendChild(button)
      button.classList.add('icon-enlarge')
    }
  })()

  const clickImage = (() => {
    for (const image of images) image.addEventListener('click', () => {
      cloneImage(image)
      document.body.style.overflow = 'hidden'
    })
  })()

  const cloneImage = image => {
    const imgTag = image.querySelector('img')
    let clone = imgTag.cloneNode(true)
    document.body.appendChild(clone)
    clone = wrapClone(clone)
    clone = clickFocusRemove(image)
  }

  const wrapClone = el => {
    const wrapper = document.createElement('div')
    wrapper.classList.add('focus-off')
    console.log(wrapper)
    el.parentNode.insertBefore(wrapper, el)
    wrapper.appendChild(el)
    addButtonShrink()
  }

  const clickFocusRemove = image => {
    const el = document.querySelector('.focus-off')
          //, button = document.querySelector('.focus-off button')
    el.addEventListener('click', () => {
      el.parentNode.removeChild(el)
      document.body.removeAttribute('style') // document.body.style.overflow = ''
      image.querySelector('button').focus() // focus sur l'image cliquée au départ
    })
  }

  const addButtonShrink = () => {
    const el = document.querySelector('.focus-off'),
          button = document.createElement('button')
    el.appendChild(button)
    injectSvgSprite(button, 'shrink')
    button.classList.add('icon-shrink')
    button.focus()
  }

})()

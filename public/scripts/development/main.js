'use strict';

// -----------------------------------------------------------------------------
// @section     Support
// @description Détecte les supports et ajoute des classes dans le tag html
// -----------------------------------------------------------------------------

// @note Remplace le script Modernizr pour les deux seuls tests dont nous avons besoin

const jsDetect = (() => { // Vérification de la présence de Javascript
  const el = document.querySelector('html');
  el.classList.replace('no-js', 'js');
})();

const touchDetect = (() => { // Vérification du support de touch
  const html = document.documentElement,
    touch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (touch) {
    html.classList.add('touch');
    return {
      touch: true
    };
  }
  else {
    html.classList.add('no-touch');
    return {
      touch: false
    };
  }
})();


// -----------------------------------------------------------------------------
// @section     External links
// @description Gestion des liens externes au site
// -----------------------------------------------------------------------------

// @note Par défaut tous les liens externes conduisent à l'ouverture d'un nouvel onglet, sauf les liens internes

const externalLinks = (() => {
  var anchors = document.querySelectorAll('a');
  for (const anchor of anchors) {
    if (anchor.hostname !== window.location.hostname) {
      anchor.setAttribute('target', '_blank');
     }
  }
})();


// -----------------------------------------------------------------------------
// @section     Cmd Print
// @description Commande pour l'impression
// -----------------------------------------------------------------------------

const cmdPrint = (() => {
  const prints = document.getElementsByClassName('cmd-print'),
        startPrint = () => {
    window.print();
    return false;
  }
  for (const print of prints) {
    print.onclick = startPrint;
  }
})();


// -----------------------------------------------------------------------------
// @section     Readable Password
// @description Permutation du type permettant de voir les mots de passe en clair
// -----------------------------------------------------------------------------

const readablePassword = (() => {
  const el = '.input-see-password';
  const inputs = document.querySelectorAll(el + ' [type=password]');
  for (const input of inputs) {
    input.insertAdjacentHTML('afterend', '<button type="button">see</button>');
  }
  const buttons = document.querySelectorAll(el + ' button');
  for (const button of buttons) {
    button.onclick = () => {
      let input = button.previousElementSibling,
          typeAttr = input.type === 'password'? 'text' : 'password';
      input.type = typeAttr;
    }
  }
})();


// -----------------------------------------------------------------------------
// @section     Body Index
// @description Ajout d'un ID sur le body pour permettre un ciblage de retour en haut
// -----------------------------------------------------------------------------

//const bodyIndex = (() => {
//  document.body.id = 'index';
//})();

// -----------------------------------------------------------------------------
// @section     Scroll To Top
// @description Défilement vers le haut
// -----------------------------------------------------------------------------

const scrollToTop = (() => {
  const footer = document.querySelector('footer');
  const arrow = '<button class="scroll-top"><svg><path d="M20 32v-16l6 6 6-6-16-16-16 16 6 6 6-6v16z"/></svg></button>'; // Ajouter l'attribut `xmlns="http://www.w3.org/2000/svg"` pour un svg valide ; mais à partir du moment où il s'agit d'une injection js et où tous les navigateurs l'interprêtent quand même, est-ce bien nécessaire ?
  footer.insertAdjacentHTML('beforeEnd', arrow);
  const item = document.querySelector('.scroll-top');
  item.classList.add('hide');
  const position = () => { // @see http://jsfiddle.net/smc8ofgg/
    const yy = window.innerHeight; // @note Remarque UX : le scroll de la hauteur totale d'une fenêtre semble bien adapté avant de voir apparaitre le bouton, une valeur en dessous ne se justifie ni sur mobile, ni sur desktop
    let y = window.scrollY;
    if (y > yy) {
      item.classList.remove('hide');
    } else {
      item.classList.add('hide');
    }
  };
  window.addEventListener('scroll', position);
  const scroll = () => { // @see https://stackoverflow.com/questions/15935318/smooth-scroll-to-top/55926067
    const c = document.documentElement.scrollTop; // `|| document.body.scrollTop`
    if (c > 0) {
      window.requestAnimationFrame(scroll);
      window.scrollTo(0, c - c / 8);
      //window.scrollTo({top: 0, behavior: 'smooth'}); // Option moderne mais avec un effet de rendu moindre que celle retenue
    }
  };
  item.addEventListener('click', scroll, false);
})();

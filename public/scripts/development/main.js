'use strict';

// -----------------------------------------------------------------------------
// @section     Support
// @description Détecte les supports et ajoute des classes dans le tag html
// -----------------------------------------------------------------------------

// @note Remplace le script Modernizr pour les deux seuls tests dont nous avons besoin

const jsDetect = (() => { // Vérification de la présence de Javascript
  const el = document.querySelector('html');
  el.classList.remove('no-js');
  el.classList.add('js');
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


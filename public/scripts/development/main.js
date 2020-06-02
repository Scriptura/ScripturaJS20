'use strict';

// -----------------------------------------------------------------------------
// @section     Support
// @description Détecte les supports et ajoute des classes dans le tag html
// -----------------------------------------------------------------------------

// @note Remplace le script Modernizr pour les deux seuls tests dont nous avons besoin

function jsDetect() { // Vérification de la présence de Javascript (Vanilla js)
  var el = document.getElementsByClassName( 'no-js' )[0];
  el.classList.remove( 'no-js' );
  el.classList.add( 'js' );
}
jsDetect();

function touchDetect() { // Vérification du support de touch
  var html = document.documentElement,
    touch = 'ontouchstart' in window || navigator.msMaxTouchPoints;
  if (touch) {
    html.classList.add( 'touch' );
    return { touch: true };
  }
  else {
    html.classList.add( 'no-touch' );
    return { touch: false };
  }
}
touchDetect();


// -----------------------------------------------------------------------------
// @section     Protected
// @description Protège partiellement un texte en empêchant sa sélection
// -----------------------------------------------------------------------------

// @note Script doublé par la règle css `user-select:none`
// @note Le fait de placer la fonction en dehors de la boucle évite une erreur jshint

function protected() {
  var eventTest = function( e ) {
    e = e || window.event;
    if( e.preventDefault ) {
      e.preventDefault();
    } else {
      e.returnValue = false;
    }
    return false;
  };
  window.onload = function() {
    var protect = document.getElementsByClassName( 'protected' );
    for( var i = 0, len = protect.length; i < len; i++ ) {
      protect[i].onmousedown = eventTest;
    }
  };
}
protected();


// -----------------------------------------------------------------------------
// @section     External links
// @description Gestion des liens externes au site
// -----------------------------------------------------------------------------

// @note Par défaut, tous les liens externes conduisent à l'ouverture d'un nouvel onglet, sauf les liens de téléchargement

function externalLinks() {
  var anchors = document.querySelectorAll('a');
  for(var i = 0, len = anchors.length; i < len; i++) {
    if (anchors[i].hostname !== window.location.hostname) {
      anchors[i].setAttribute('target', '_blank');
     }
  }
}
externalLinks();


// -----------------------------------------------------------------------------
// @section     Cmd Print
// @description Commande pour l'impression
// -----------------------------------------------------------------------------

function cmdPrint() {
  var p = document.getElementsByClassName('cmd-print');
  function startPrint(){
    window.print();
    return false;
  }
  for( var i = 0, len = p.length; i < len; i++ ) {
    p[i].onclick = startPrint;
  }
}
cmdPrint();


// -----------------------------------------------------------------------------
// @section     Readable Password
// @description Permutation du type permettant de voir les mots de passe en clair
// -----------------------------------------------------------------------------

// ES6:
const inputs = document.querySelectorAll('.input [type=password]');
for (const input of inputs) {
  input.insertAdjacentHTML('afterend', '<button type="button">see</button>');
}

const buttons = document.querySelectorAll('.input [type=password] + button');
for (const button of buttons) {
  button.onclick = () => {
    let input = button.previousElementSibling,
        typeAttr = input.type === 'password'? 'text' : 'password';
    input.type = typeAttr;
  }
}

/*
// ES5:
Array.prototype.slice.call(document.querySelectorAll('.input [type="password"]')).forEach(function(input){
  input.insertAdjacentHTML('afterend', '<button type="button">toggle password</button>');
});
Array.prototype.slice.call(document.querySelectorAll('input[type="password"] + button')).forEach(function(button){
    button.addEventListener('click', event => {
        var input = button.previousElementSibling,
            typeAttr = input.type === 'password'? 'text' : 'password';
        input.type = typeAttr;
    });
});
*/

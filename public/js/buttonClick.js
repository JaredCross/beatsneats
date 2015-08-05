
  var buttons7Click = Array.prototype.slice.call( document.querySelectorAll( '#btns-click button' ) ),
    buttons9Click = Array.prototype.slice.call( document.querySelectorAll( 'button.btns-8g' ) ),
    totalButtons7Click = buttons7Click.length,
    totalButtons9Click = buttons9Click.length;

  buttons7Click.forEach( function( el, i ) { el.addEventListener( 'click', activate, false ); } );
  buttons9Click.forEach( function( el, i ) { el.addEventListener( 'click', activate, false ); } );

  function activate() {
    var self = this, activatedClass = 'btns-activated';

    if( classie.has( this, 'btns-7h' ) ) {
      // if it is the first of the two btns-7h then activatedClass = 'btns-error';
      // if it is the second then activatedClass = 'btns-success'
      activatedClass = buttons7Click.indexOf( this ) === totalButtons7Click-2 ? 'btns-error' : 'btns-success';
    }
    else if( classie.has( this, 'btns-8g' ) ) {
      // if it is the first of the two btns-8g then activatedClass = 'btns-success3d';
      // if it is the second then activatedClass = 'btns-error3d'
      activatedClass = buttons9Click.indexOf( this ) === totalButtons9Click-2 ? 'btns-success3d' : 'btns-error3d';
    }

    if( !classie.has( this, activatedClass ) ) {
      classie.add( this, activatedClass );
      setTimeout( function() { classie.remove( self, activatedClass ) }, 1000 );
    }
  }

  document.querySelector( '.btns-7i' ).addEventListener( 'click', function() {
    classie.add( document.querySelector( '#trash-effect' ), 'trash-effect-active' );
  }, false );

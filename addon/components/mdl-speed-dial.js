import $ from 'jquery';
import Component from '@ember/component';
import layout from '../templates/components/mdl-speed-dial';

export default Component.extend({
	/*
		Inject imported template handlebars to component usinglayout 
	*/
  layout,
  counter: 0,

  /*
    Class Name for component wrapper
  */
  classNames: ["mdl-speed-dial", "mdl-speed-dial--bottom-fixed"],

  /*
    Rotate button on hover if there is secondary icon
  */
  rotateElement(el, deg, duration) {
    $(el).stop().animate({ rotation: deg }, {
      duration: duration,
      step: function(now, fx) {
        $(this).css({ "transform": "rotate(" + now + "deg)" });
      }
    });
  },

  /*
    Open FAB Options
  */
  openFAB(e) {
    var $btn = $(this),
      $speedDialOptions = $btn.siblings('.mdl-speed-dial__options'),
      isSpeedDialOptionsHidden = $speedDialOptions.css('display') == 'none' ? true : false,
      $primaryIcon = $btn.children('.mdl-speed-dial_main-fab-icon--primary'),
      $secondaryIcon = $btn.children('.mdl-speed-dial_main-fab-icon--secondary'),
      isPrimaryIconNull = $primaryIcon.length > 0 ? false : true,
      isSecondaryIconNull = $secondaryIcon.length > 0 ? false : true,
      $primaryIcon = isPrimaryIconNull ? $btn.children('.mdl-speed-dial_main-fab-icon') : $primaryIcon,
      isPrimaryIconPlusSign = $primaryIcon.html() == 'add' ? true : false,
      rotationDegrees = 360,
      rotationSpeed = 300,
      rotate = $btn.hasClass('mdl-speed-dial__main-fab--spin');

    if (isSpeedDialOptionsHidden) {
      $speedDialOptions.fadeIn('fast');

      if (rotate) {
        if (isSecondaryIconNull && isPrimaryIconPlusSign) {
          rotationDegrees = 45;
          rotationSpeed = 100;
        }
        
        rotateElement($btn, rotationDegrees, rotationSpeed);

        if (!isPrimaryIconNull && !isSecondaryIconNull) {
          $primaryIcon.fadeOut('fast');
          $secondaryIcon.fadeIn('fast');
        }
      }
    }
  },

  /*
    Close FAB options
  */
  closeFAB(e) {
    var $btn = $(this).children('.mdl-speed-dial__main-fab'),
      $primaryIcon = $btn.children('.mdl-speed-dial_main-fab-icon--primary') || $btn.children('.mdl-speed-dial_main-fab-icon'),
      $secondaryIcon = $btn.children('.mdl-speed-dial_main-fab-icon--secondary'),
      isPrimaryIconNull = $primaryIcon.length > 0 ? false : true,
      isSecondaryIconNull = $secondaryIcon.length > 0 ? false : true,
      $primaryIcon = isPrimaryIconNull ? $btn.children('.mdl-speed-dial_main-fab-icon') : $primaryIcon,
      rotate = $btn.hasClass('mdl-speed-dial__main-fab--spin');

    $(this).children('.mdl-speed-dial__options').fadeOut('fast');

    if (rotate) {
      rotateElement($btn, 0, 100);

      if (!isPrimaryIconNull && !isSecondaryIconNull) {
        $primaryIcon.fadeIn('fast');
        $secondaryIcon.fadeOut('fast');
      }
    }
  },

  setCounterToZero() {
    this.set('counter', 0);
  },

  /*
    Apply jQuery behaviors on element insertion
  */
  didInsertElement() {
    var _this = this;
    $('.mdl-speed-dial__main-fab').mouseenter(this.openFAB);
    $('.mdl-speed-dial__main-fab').mouseenter(function() {
      _this.set('counter', 0);
    });
    $('.mdl-speed-dial').mouseleave(this.closeFAB);
    $('.mdl-speed-dial').mouseleave(function() {
      _this.set('counter', 0);
    });
    $('.mdl-speed-dial__tooltip--hidden').hide();
    $('.mdl-speed-dial_main-fab-icon--secondary').hide();
  },

  click() {
    if (this.get('counter') > 0) {
      if ($('.mdl-speed-dial__options').css('display') === 'block') {
        $('.mdl-speed-dial__options').css('display', 'none');
      }
      else {
        $('.mdl-speed-dial__options').css('display', 'block');
      }
    }
    this.set('counter', this.get('counter')+1);
    this.sendAction('action');
  }
});

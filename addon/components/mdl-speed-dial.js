import Ember from 'ember';
import layout from '../templates/components/mdl-speed-dial';

export default Ember.Component.extend({
	/*
		Inject imported template handlebars to component usinglayout 
	*/
  layout,

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

  /*
    Apply jQuery behaviors on element insertion
  */
  didInsertElement() {
    Ember.$('.mdl-speed-dial__main-fab').mouseenter(this.openFAB);
    Ember.$('.mdl-speed-dial').mouseleave(this.closeFAB);    
    Ember.$('.mdl-speed-dial__tooltip--hidden').hide();
    Ember.$('.mdl-speed-dial_main-fab-icon--secondary').hide();
  },

  click() {
    this.sendAction('action');
  }
});

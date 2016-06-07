import Ember from 'ember';
import BaseComponent from './-base-toplevel-component';

const {
  computed,
  isPresent,
  observer,
  run
} = Ember;

export default BaseComponent.extend({
  primaryClassName: 'textfield',
  type: 'text',
  disabled: false,
  isLabelFloating: true,
  errorMessage: null,
  classNameBindings: [
    'isLabelFloating:mdl-textfield--floating-label'
  ],
  // This should never change, so we deliberately
  //   declare no dependent property keys
  _inputId: computed(function() {
    return `${this.get('elementId')}-input`;
  }),
  beforeMdlInit() {},
  didInsertElement() {
    this._super(...arguments);
    this.beforeMdlInit();
    let mdlTextfield = new window.MaterialTextfield(this.get('element'));
    this.set('_mdlComponent', mdlTextfield);
    this._checkValue();
  },
  /*
   Observes Error Message and run _setValidity once
  */
  _checkValidity: observer('errorMessage', function() {
    run.scheduleOnce('afterRender', this, this._setValidity);
  }),
  /*
    If there is error message and the div has mdl-textfield__error class,
    show the Error Message and set div class as error
  */
  _setValidity() {
    if (this.isDestroyed) {
      return;
    }

    let mdlComponent = this.get('_mdlComponent');
    let errorMessage = this.get('errorMessage');

    if (isPresent(errorMessage)) {
      mdlComponent.input_.setCustomValidity(errorMessage.toString());
      Ember.$('#' + mdlComponent.element_.id).children().next().next().css('visibility', 'visible');
      Ember.$('#' + mdlComponent.element_.id).addClass('is-invalid');
    } else {
      mdlComponent.input_.setCustomValidity('');
    }
  },
  /*
    Observes value changes, change classes according to the value, and remove Error Message
    If there is value, set div class as filled
    Else, set div class as default
  */
  _checkValue: function() {
    let mdlComponent = this.get('_mdlComponent');
    let value = this.get('value');

    this.set('errorMessage', null);
    
    if (isPresent(value)) {
      Ember.$('#' + mdlComponent.element_.id).children().next().next().css('visibility', 'hidden');
      Ember.$('#' + mdlComponent.element_.id).removeClass('is-invalid');
      Ember.$('#' + mdlComponent.element_.id).addClass('is-dirty');
    } else {
      Ember.$('#' + mdlComponent.element_.id).removeClass('is-invalid');
    }
  }.observes('value')
});

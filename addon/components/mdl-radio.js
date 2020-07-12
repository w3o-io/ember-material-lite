import { oneWay } from '@ember/object/computed';
import BaseToggleComponent from './-base-toggle-component';
import layout from '../templates/components/mdl-radio';

export default BaseToggleComponent.extend({
  primaryClassName: 'radio',
  layout,
  checked: false,
  name: oneWay('_defaultName'),

  didInsertElement() {
    this._super(...arguments);
    let mdlradio = new window.MaterialRadio(this.get('element'));
    this.element.MaterialRadio = mdlradio;
    this.set('_mdlComponent', mdlradio);
  },

  click() {
    this.sendAction('action', this.get('value'));
  },

  _defaultName: 'default'
});

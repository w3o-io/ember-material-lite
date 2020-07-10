import { computed } from '@ember/object';
import { scheduleOnce } from '@ember/runloop';
import { A } from '@ember/array';
import ChildComponentSupport from 'ember-composability/mixins/child-component-support';
import BaseChildComponent from './-base-child-component';
import MdlDropdown from './mdl-dropdown';
import layout from '../templates/components/mdl-dropdown-option';

export default BaseChildComponent.extend(ChildComponentSupport, {
	/*
		Inject imported template handlebars to component usinglayout 
	*/
  layout,
  
  /*
		Component instantiated as <li> element
  */
  tagName: 'li',

  /*
		Determine parent component type
  */
  _parentComponentTypes: A([MdlDropdown]),
  
  /*
		Append delimiter to className (prefix taken from parent component)
  */
  _childComponentClassStringDelimeter: '__',

  /*
		Append component suffix to className (prefix taken from parent component)
  */
  childComponentClassName: 'item',

  didInsertElement() {
    this._super.apply(this, arguments);
    scheduleOnce('afterRender', this, 'registerWithMdlDropdown');
  },

  /*
		Get parent component (mdl-dropdown) object
  */
  dropdown: computed(function() {
    return this.nearestOfType(MdlDropdown);
  }),

  /*
		Register component to parent component
  */
  registerWithMdlDropdown() {
    const dropdown = this.get('dropdown');
    dropdown.registerOption(this);
  },

  /*
  	Bubble click event action and value to parent component
  */
  click() {
    const dropdown = this.get('dropdown');

  	dropdown.updateValue(this.label, this.value);
  	dropdown.bubbleAction(this.value);
  }
});

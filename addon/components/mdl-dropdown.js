import Ember from 'ember';
import ParentComponentSupport from 'ember-composability/mixins/parent-component-support';
import layout from '../templates/components/mdl-dropdown';
const { computed } = Ember;

export default Ember.Component.extend(ParentComponentSupport, {
	/*
		Inject imported template handlebars to component usinglayout 
	*/
  layout,
  classNames: ["mdl-textfield", "mdl-js-textfield"],

  /*
		ClassName prefix to be compiled. Currently using Material Design Lite mdl-menu class styling
  */
  _primaryClassNameString: 'mdl-menu',

  didInsertElement() {
    this._super(...arguments);
    const mdldropdown = new window.MaterialMenu(this.$('ul')[0]);
    this.set('_mdlComponent', mdldropdown);
  },

  /*
		Set Unique ID to the component for associating input-text and dropdown-menu-container
  */
  _buttonId: computed('elementId', {
    get() {
      return `${this.get('elementId')}-button`;
    }
  }),

  /*
		Declare options object to store option associated on mdl-dropdown-option
  */
  options: Ember.computed(function() {
    return Ember.A();
  }),

  /*
		Update value and label of the component
  */
  updateValue(label, value){
    this.set('label', label);
    this.set('value', value);
  },

  /*
		Bubble action to route when one of the associated mdl-dropdown-option clicked
  */
  bubbleAction(value){
    this.sendAction('action', value);
  },

  /*
		Pool options associated to the component, and set default value when component initialized;
  */
  registerOption(option) {
  	if(this.get('value') === option.value){
  		this.updateValue(option.label, option.value);
  	}

    this.get('options').addObject(option);
  },

  /*
		Remove options when component destroyed (?)
  */
  unregisterOption(option) {
    this.get('options').removeObject(option);

    // We don't want to update the value if we're tearing the component down.
    if (!this.get('isDestroying')) {
      this.updateValue();
    }
  }
});

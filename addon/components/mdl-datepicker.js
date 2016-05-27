import Ember from 'ember';
import layout from '../templates/components/mdl-datepicker';

export default Ember.Component.extend({
  layout,
  /*
  	Set wrapper classes
	*/
	classNames: ["mdl-textfield", "mdl-js-textfield"],

	/*
		Normalize Value to string format.
		Input Type Date only read and produce stringified date
	*/
	didReceiveAttrs() {
		this.set('stringValue', this.get('value').getFullYear() + '-' + ("0" + (this.get('value').getMonth() + 1)).slice(-2)+ '-' + ("0" + this.get('value').getDate()).slice(-2));
	},

	actions:{
		/*
  		Normalize string value to date format when returned to original value
		*/
		normalizeValue() {
			this.set('value', new Date(this.get('stringValue')));
		}
	}
});

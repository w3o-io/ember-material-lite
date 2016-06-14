import Ember from 'ember';
import layout from '../templates/components/mdl-datepicker';

export default Ember.Component.extend({
  layout,
  /*
  	Set wrapper classes
	*/
	classNames: ["mdl-textfield", "mdl-js-textfield"],

	/*
		Determine input to be date type or datetime format
	*/
	type: 'date',

	/*
		Normalize Value to string format.
		Input Type Date and Datetime only read and produce stringified date
	*/
	didReceiveAttrs() {
		var stringifiedDate;

		if(!Ember.isEmpty(this.get('value'))){
			if(this.get('type') === 'date'){
				stringifiedDate = this.get('value').getFullYear() + '-' + ("0" + (this.get('value').getMonth() + 1)).slice(-2)+ '-' + ("0" + this.get('value').getDate()).slice(-2);	
			}
			else if(this.get('type') === 'datetime-local'){
				stringifiedDate = this.get('value').getFullYear() + '-' + ("0" + (this.get('value').getMonth() + 1)).slice(-2)+ '-' + ("0" + this.get('value').getDate()).slice(-2)+'T'+("0" + this.get('value').getHours()).slice(-2) + ':' + ("0" + this.get('value').getMinutes()).slice(-2);	
			}
		}		

		this.set('stringValue', stringifiedDate);
	},

	actions:{
		/*
  		Normalize string value to date format when returned to original value
		*/
		normalizeValue() {
			var parsedDate = new Date(this.get('stringValue'));

			if(this.get('type') === 'datetime-local'){
				parsedDate.setHours(parsedDate.getHours() + (parsedDate.getTimezoneOffset()/60));	
			}			

			this.set('value', parsedDate);
		}
	}
});

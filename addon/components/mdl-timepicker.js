import Ember from 'ember';
import layout from '../templates/components/mdl-timepicker';

export default Ember.Component.extend({
  layout,
	/*
	 Set wrapper classes
	*/
	classNames: ["mdl-textfield", "mdl-js-textfield"],

	/*
	 By default passed object type is assumed date, used for normalization
	*/
	type: 'date',
	
	/*
	 Declare Date Container, used when passed value is date type
	*/
	dateContainer: null,

	/*
	 Accepted HH:mm format regular expression
	*/
	hhmmRegEx: new RegExp('^[0-2][0-9]:[0-5][0-9]$'),

	/*
	 For each time value is updated, we also update the string value
	*/
	didReceiveAttrs() {
		/*
  		If passed object is a date stringify object and store date on a container for later normalization
  		If passed object is string and followed the correct HH:mm format, directly assign object to string value
  		If not available in other option, set string value to null
		*/
		if(!Ember.isEmpty(this.get('value'))){
			if(typeof this.get('value').getMonth === 'function'){
				this.set('stringValue', ("0" + this.get('value').getHours()).slice(-2) + ':' + ("0" + this.get('value').getMinutes()).slice(-2));
				this.set('dateContainer', this.get('value'));
				this.set('type', 'date');
			}
			else if(this.get('hhmmRegEx').test(this.get('value'))){
				this.set('stringValue', this.get('value'));
				this.set('type', 'string');
			}
			else{
				this.set('stringValue', null);
				this.set('type', 'string');
			}
		}
	},

	actions:{
		/*
  		Normalize string value to original passed object format
  		If passed object is date, change hours and minutes but keep the DD:MM:YYYY original and store as date object
  		If passed object is string or doesn't exist, set value directly from string value and store as string
		*/
		normalizeValue() {
			if(this.get('type') === 'date'){
				this.get('dateContainer').setHours(parseInt(this.get('stringValue').substring(0,2)));
				this.get('dateContainer').setMinutes(parseInt(this.get('stringValue').substring(3,5)));
				this.set('value', new Date(this.get('dateContainer')));
			}
			else if (this.get('type') === 'string'){
				this.set('value', this.get('stringValue'));
			}
		}
	}
});

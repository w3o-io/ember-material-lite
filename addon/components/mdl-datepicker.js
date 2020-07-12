import { isEmpty } from '@ember/utils';
import Component from '@ember/component';
import moment from 'moment';
import layout from '../templates/components/mdl-datepicker';

export default Component.extend({
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

		if(!isEmpty(this.get('value'))){
			/*Somehow, this.get(value) is a String, need to convert it to a Date because .getFullYear(), getMonth(), etc will be called on it*/
			if(typeof this.get('value')) {
				stringifiedDate = new Date(this.get('value'));
			}

			if(this.get('type') === 'date'){
				stringifiedDate = stringifiedDate.getFullYear() + '-' + ("0" + (stringifiedDate.getMonth() + 1)).slice(-2)+ '-' + ("0" + stringifiedDate.getDate()).slice(-2);	
			}
			else if(this.get('type') === 'datetime-local'){
				stringifiedDate = stringifiedDate.getFullYear() + '-' + ("0" + (stringifiedDate.getMonth() + 1)).slice(-2)+ '-' + ("0" + stringifiedDate.getDate()).slice(-2)+'T'+("0" + stringifiedDate.getHours()).slice(-2) + ':' + ("0" + stringifiedDate.getMinutes()).slice(-2);	
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

			if(parsedDate.toString() === 'Invalid Date' || parsedDate.toString() === 'Invalid date') {
				this.set('value', null);
			}
			else {
				this.set('value', moment(parsedDate).format(this.get('format')));
			}
		}
	}
});

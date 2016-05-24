import Ember from 'ember';

export default Ember.Component.extend({
	tagName: '',

	disabled: null,
  	multiple: null,
  	tabindex: 0,

	actions:{
		action: function(value, option) {
		    this.sendAction('action', value, option);
		},

		onchange: function(option, value, event) {
		    this.sendAction('onchange', option, value, event);
		},

		onclick: function(option, value, event) {
		    this.sendAction('onclick', option, value, event);
		},

		onblur: function(option, value, event) {
		    this.sendAction('onblur', option, value, event);
		},

		onfocusout: function(option, value, event) {
		    this.sendAction('onfocusout', option, value, event);
		}
	}	
});

import Ember from 'ember';
import layout from '../templates/components/mdl-toast';

export default Ember.Component.extend({
	layout,

	/*
		Set Class Name to component wrapper
	*/
	classNames: ["mdl-js-snackbar", "mdl-snackbar"],

	/*
		Toggle Observer to show Toast when toggle is true
	*/
	showToast: Ember.observer('toggle', function() {
		if(this.get('toggle')){
			const componentId = '#'+this.get('elementId');

			document.querySelector(componentId).MaterialSnackbar.showSnackbar({message: this.get('message')});	
		}		
  })
});

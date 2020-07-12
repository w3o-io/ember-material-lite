import { observer } from '@ember/object';
import Component from '@ember/component';
import layout from '../templates/components/mdl-toast';

export default Component.extend({
	layout,

	/*
		Set Class Name to component wrapper
	*/
	classNames: ["mdl-js-snackbar", "mdl-snackbar"],

	/*
		Manually instantiate MaterialSnackbar script on insert element
		Otherwise, MaterialSnackbar would not instantiated after destroyed
	*/
	didInsertElement() {
    let mdltoast = new window.MaterialSnackbar(this.get('element'));
    this.set('_mdlComponent', mdltoast);
	},

	/*
		Toggle Observer to show Toast when toggle is true
	*/
	showToast: observer('toggle', function() {
		if(this.get('toggle')){
			this.get('_mdlComponent').showSnackbar({message: this.get('message')});	
		}		
  })
});

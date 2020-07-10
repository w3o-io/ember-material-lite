import Component from '@ember/component';
import layout from '../templates/components/mdl-example';

export default Component.extend({
	layout,
	tagName: 'button',
	classNames: ['mdl-button', 'mdl-js-button', 'mdl-button--raised', 'mdl-button--colored'],

	didReceiveAttrs(){
		console.log(this.get('option'));
	}
});

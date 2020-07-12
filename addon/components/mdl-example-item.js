import { computed } from '@ember/object';
import Component from '@ember/component';
import MdlExample from './mdl-example';
import layout from '../templates/components/mdl-example-item';

export default Component.extend({
	layout,
	tagName: 'span',

	didReceiveAttrs(){
		console.log(this.get('example').get('title'));
	},

	example: computed(function() {
	    return this.nearestOfType(MdlExample);
	}),
});

import Ember from 'ember';
import MdlExample from './mdl-example';
import layout from '../templates/components/mdl-example-item';

export default Ember.Component.extend({
	layout,
	tagName: 'span',

	didReceiveAttrs(){
		console.log(this.get('example').get('title'));
	},

	example: Ember.computed(function() {
	    return this.nearestOfType(MdlExample);
	}),
});

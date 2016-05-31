import Ember from 'ember';
import layout from '../templates/components/mdl-speed-dial';
import speedDialBehavior from '../extensions/mdl-speed-dial';

export default Ember.Component.extend({
	/*
		Inject imported template handlebars to component usinglayout 
	*/
  layout,

  /*
    Inject Speed Dial Behavior from external dependency
  */
  speedDialBehavior,

  /*
    Class Name for component wrapper
  */
  classNames: ["mdl-speed-dial", "mdl-speed-dial--bottom-fixed"],
});

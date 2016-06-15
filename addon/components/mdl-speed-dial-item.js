import Ember from 'ember';
import layout from '../templates/components/mdl-speed-dial-item';

export default Ember.Component.extend({
	/*
		Inject imported template handlebars to component usinglayout 
	*/
  layout,
  
  /*
    Class Name for component wrapper
  */
  classNames: ["mdl-speed-dial__option"],

  /*
    Show FAB option tooltip
  */
  showFABTooltip(e) {
    $(this).children('.mdl-speed-dial__tooltip--hidden').show();
  },

  /*
    Hide FAB option tooltip
  */
  hideFABTooltip(e) {
    $(this).children('.mdl-speed-dial__tooltip--hidden').hide();
  },

  /*
    Apply jQuery behaviors on element insertion
  */
  didInsertElement(){
    Ember.$('.mdl-speed-dial__option').hover(this.showFABTooltip, this.hideFABTooltip);
  },

  /*
    Bubble Action on click
  */
  click(){
    this.sendAction('action');
  }
});

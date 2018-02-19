import Ember from 'ember';
import MdlTableResponsive from './mdl-table-responsive';
import layout from '../templates/components/mdl-table-responsive-cell';

export default Ember.Component.extend({
	layout,
	/*
		Set Tagname of Component wrapper as <tr> element
	*/
	tagName: 'tr',

	/*
		Populate cell's column with properties of passed object. Property names are gotten from parent table headers.
		Provide exception handling when object has setter/getter or not.
	*/
	records: Ember.computed('content', 'headers', function() {
		var self = this,
			table = this.get('table'),
			records = Ember.A();

		if(!Ember.isEmpty(this.get('content')) && table.get('headers')){
			table.get('headers').forEach(function(header){
				if(typeof self.get('content').get === 'function'){
					let objRecord = {id: header.id, label: header.label, content: null};

					if(header.relationColumnName){
						objRecord.content = self.get('content')[header.id].get(header.relationColumnName);
					}
					else{
						objRecord.content = self.get('content').get(header.id);
					}

					if (typeof objRecord.content === 'boolean') {
						objRecord.isBoolean = true;
					}

					records.pushObject(objRecord);
				}
				else{
					records.pushObject({id: header.id, label: header.label, content: self.get('content')[header.id]});
				}
			});
		}

    return records;
  }),

	/*
		Connect cell with parent table
	*/
  table: Ember.computed(function() {
    return this.nearestOfType(MdlTableResponsive);
  }),

  /*
		Bubble click action to route
  */
  click(){
		this.sendAction('action', this.get('content'));
	}
});

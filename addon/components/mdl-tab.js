import Component from '@ember/component';
import { computed } from '@ember/object';
import { dasherize } from '@ember/string';
import { A } from '@ember/array';
import MdlTabs from './mdl-tabs';
import ChildComponentSupport from 'ember-composability/mixins/child-component-support';
import layout from '../templates/components/mdl-tab';

export default Component.extend(ChildComponentSupport, {
  layout,
  _parentComponentTypes: new A([MdlTabs]),
  classNames: ['mdl-tabs__panel'],
  classNameBindings: ['isActive:is-active'],
  isActive: false,
  dasherizedTitle: computed('title', function() {
    return dasherize(this.get('title'));
  }),
  init() {
    this._super();
    this.set('elementId', this.get('title').replace(/\s+/g, '-').toLowerCase());
  }
});

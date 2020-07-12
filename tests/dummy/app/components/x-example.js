import Component from '@ember/component';
import { empty } from '@ember/object/computed';
import computed from 'ember-new-computed';

export default Component.extend({
  classNames: ['x-example', 'mdl-cell'],
  classNameBindings: ['colClass'],
  cols: 4,
  colClass: computed('cols', {
    get() {
      return `mdl-cell--${this.get('cols')}-col`;
    }
  }),
  title: 'Example',
  emptySnippet: empty('snippet'),
  exampleFrameClass: 'mdl-cell mdl-cell--12-col',
  partialName: computed('snippet', {
    get() {
      return `snippets/${this.get('snippet') || 'none'}`;
    }
  }),
  snippetName: computed('snippet', {
    get() {
      return `${this.get('snippet') || 'none'}.hbs`;
    }
  }),
  send() {
    this.get('targetObject').send(...arguments);
  }
});

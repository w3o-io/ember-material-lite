import { A } from '@ember/array';
import Controller from '@ember/controller';

export default Controller.extend({
  rows: A([{ id: 0, name: 'Hello' }, { id: 1, name: 'World' }])
});
import Application from '@ember/application';
import { run } from '@ember/runloop';
import { initialize } from '../../../initializers/material-lite-extensions';
import { module, test } from 'qunit';

let container, application;

module('Unit | Initializer | material lite extensions', {
  beforeEach() {
    run(function() {
      application = Application.create();
      container = application.__container__;
      application.deferReadiness();
    });
  }
});

// Replace this with your real tests.
test('it works', function(assert) {
  initialize(container, application);

  // you would normally confirm the results of the initializer here
  assert.ok(true);
});

import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('test-dashboard', 'Integration | Component | test dashboard', {
  integration: true
});

test('it renders', function(assert) {

  // Set any properties with this.set('myProperty', 'value');
  // Handle any actions with this.on('myAction', function(val) { ... });

  this.render(hbs`{{test-dashboard}}`);

  assert.equal(this.$().text().trim(), '');

  // Template block usage:
  this.render(hbs`
    {{#test-dashboard}}
      template block text
    {{/test-dashboard}}
  `);

  assert.equal(this.$().text().trim(), 'template block text');
});

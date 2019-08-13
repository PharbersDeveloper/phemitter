import Route from '@ember/routing/route';

export default Route.extend({
	setupController(controller, index) {
		this._super(controller, index)
		this.controllerFor('index').Subscribe()
	}
});

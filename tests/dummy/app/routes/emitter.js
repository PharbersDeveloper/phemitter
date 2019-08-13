import Route from '@ember/routing/route';

export default Route.extend({
	setupController(controller, emitter) {
		this._super(controller, emitter)
		this.controllerFor('emitter').Subscribe()
	}
});

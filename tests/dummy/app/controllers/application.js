import Controller from '@ember/controller';
import { inject as service } from '@ember/service';

export default Controller.extend({
	em: service("emitter"),
	init() {
		this._super(...arguments);
		// 总控设置Config
		this.em.SetConfig({
			'connect': { host: "tcp://127.0.0.1", port: "46532" },
			'qos': 1
		})
		// 初始化MQTT Connect并设置全局Singleton MessageHandel Hook，
		// 不想要单例Message把MessageSingleton(false) or remove了
		this.em.Connect().MessageSingleton(true)
	}
});

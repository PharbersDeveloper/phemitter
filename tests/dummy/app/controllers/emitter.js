import Controller from '@ember/controller';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Controller.extend({
	em: service("emitter"),
	client: computed(function () {
		return this.em.GetInstance()
	}),
	onMessage(msg) {
		window.console.info("Emitter Controller")
		window.console.info(msg.channel + " => " + msg.asString())
	},
	Subscribe() {
		window.console.info("emitter")
		// 获取Client Instance
		// let client = this.em.GetInstance()
		// API: 参照https://emitter.io/develop/javascript/
		// 订阅  参数：channel key，channel name，消息类型（message, error, disconnect），MessageHandel
		this.client.Subscribe("UKKrMs2rhcHodW6KK57hOa47XB_VBowX", "demo/", "message", this.onMessage)
	},
	actions: {
		publish() {
			this.client.Publish("UKKrMs2rhcHodW6KK57hOa47XB_VBowX", "demo/", "Hello")
		}
	}
});

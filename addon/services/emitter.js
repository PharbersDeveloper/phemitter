import Service from '@ember/service';
import em from 'emitter-io';

export default Service.extend({
	SetConfig(config) {
		this._config = config
	},
	/**
	 * 连接MQTT
	 * 
	 */
	Connect() {
		this._client = em.connect(this._config.connect);
		return this;
	},
	/**
	 * 获取Client实例
	 */
	GetInstance() {
		if (this._client === undefined || this._client === null) {
			return new Error("Error Client Is undefined Or null, please call Connect func");
		}
		return this;
	},
	/**
	 * 发送MQTT信息
	 * @param {*} key 
	 * @param {*} channel 
	 * @param {*} message 
	 */
	Publish(key, channel, message) {
		this._client.publish({
			key,
			channel,
			message,
			qos: this._config.qos
		})
	},
	/**
	 * 消息单例化（注：该条件是全局，设置后会根据你所在的route的Message Handle接受消息）
	 * @param {*} flag 
	 */
	MessageSingleton(flag) {
		this.flag = flag
	},
	/**
	 * 订阅消息
	 * @param {*} key 
	 * @param {*} channel 
	 * @param {*} type 
	 * @param {*} func 
	 */
	Subscribe(key, channel, type, func) {
		if (this.flag) { this._client._callbacks[type] = [] }
		this._client.subscribe({ key, channel, qos: this._config.qos })
		this._client.on(type, func)
	},
	/**
	 * 取消订阅
	 * @param {q} key 
	 * @param {*} channel 
	 */
	UnSubscribe(key, channel) {
		this._.unsubscribe({ key, channel })
	},
	/**
	 * 断开连接
	 */
	Disconnect() {
		if (this._client === undefined || this._client === null) {
			return "Error Client Is undefined Or null, please call Connect func"
		}
		this._client.disconnect()
	}
});

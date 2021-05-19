<template>
	<div style="margin-top:300px;">
		<van-form @submit="onSubmit">
			<van-field v-model="username" name="userName" label="用户名" placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]" />
			<van-field v-model="password" type="password" name="password" label="密码" placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]" />
			<!-- <van-field name="uploader" label="文件上传">
				<template #input>
					<van-uploader v-model="uploader" />
				</template>
			</van-field> -->
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">注册</van-button>
			</div>
		</van-form>
	</div>
</template>

<script>
	import {
		Toast
	} from 'vant';
	import {
		Button
	} from 'element-ui'
	import axios from 'axios';
	export default {
		components: {
			Button
		},
		data() {
			return {
				username: '',
				password: '',
				uploader: [{
					url: 'https://img01.yzcdn.cn/vant/leaf.jpg'
				}]
			};
		},
		mounted: function() {
			var events = require('events'); // 引入 events 模块
			var eventEmitter = new events.EventEmitter(); // 创建 eventEmitter 对象
			eventEmitter.setMaxListeners(100);
			require('events').EventEmitter.prototype._maxListeners = 100;
		},
		methods: {
			onSubmit(values) {
				let self = this;
				console.log('submit', values);
				let data = {
					"userId": values.userName,
					"password": values.password
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/userRegister", data, {
					headers: headers
				}).then((response) => {
					console.log(response.data)
					if (response.data.status == "fail") {
						Toast("用户已注册！");
					} else {
						Toast("注册成功");
						self.$router.push({
							path: '/login',
							query: {
								userId: response.data.object.userId
							}
						})
					}
				})

			},
		},
	};
</script>

<style>
</style>

<template>
	<div style="margin-top:300px;">
		<van-form @submit="onSubmit">
			<van-field v-model="username" name="userId" label="用户名" placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]" />
			<van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]" />
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">登录</van-button>
			</div>
		</van-form>
	</div>
</template>
<script>
	import {
		Toast
	} from 'vant';
	import axios from 'axios';
	export default {
		data() {
			return {
				username: '',
				password: '',
			};
		},
		methods: {
			onSubmit(values) {
				let self = this;
				self.loading = true;
				let data = {
					"userId": values.userId,
					"password": values.password
				};
				console.log(data);
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/getTopBook", data, {
					headers: headers


				}).then((response) => {
					console.log(response.data);
					if (response.data.status == "success") {
						Toast("登录成功！")
						this.$router.push({
							path: '/adminOp',
							query: {}
						})
					}else{
						Toast("用户名或密码错误！")
					}
				})
			},
		},
	};
</script>

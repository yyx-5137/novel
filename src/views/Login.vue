<template>
	<div style="margin-top:300px;">
		<van-form @submit="onSubmit">
			<van-field v-model="user.userId" name="userId" label="用户名" placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]" />
			<van-field v-model="user.password" type="password" name="password" label="密码" placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]" />
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">登录</van-button>
			</div>
			<div style="margin: 16px;">
				<van-button round block type="info" to="/register">注册</van-button>
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
				user: {
					'userName': '',
					'sex': '',
					'userIntroduction': '',
					'userId': '',
					'imageSrc': 'https://img01.yzcdn.cn/vant/cat.jpeg',
					'password': ''
				},
			};
		},
		mounted: function() {
			if (this.$route.query.userId != null) {
				this.user.userId = this.$route.query.userId
			}

		},
		methods: {
			onSubmit(values) {
				console.log('submit', values);
				let self = this;
				console.log('submit', values);
				let data = {
					"userId": values.userId,
					"password": values.password
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/userLogin", data, {
					headers: headers
				}).then((response) => {
					console.log(response.data)
					if (response.data.status == "fail") {
						Toast("登录失败！请重试");
					} else {
						Toast("登录成功");
						this.$cookies.set("userId", response.data.object.userId, "30d");
						this.$cookies.set("id", response.data.object.id, "30d");
						this.$cookies.set("userName", response.data.object.userName, "30d");
						this.$cookies.set("password", response.data.object.password, "30d");
						this.$cookies.set("imageSrc", response.data.object.profileUrl, "30d");
						this.$cookies.set("userIntroduction", response.data.object.userIntroduction, "30d");
						this.$cookies.set("sex", response.data.object.sex, "30d");
						console.log(this.$cookies.get("id"));
						self.$router.push({
							path: '/',
							query: {

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

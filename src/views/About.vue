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
	export default {
		data() {
			return {
				username: '',
				password: '',
			};
		},
		methods: {
			onSubmit(values) {
				this.$router.push({
					path: '/adminOp',
					query: {}
				})
			},
		},
	};
</script>

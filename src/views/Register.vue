<template>
	<div style="margin-top:300px;">
		<van-form @submit="onSubmit">
			<van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
				:rules="[{ required: true, message: '请填写用户名' }]" />
			<van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
				:rules="[{ required: true, message: '请填写密码' }]" />
			<van-field name="uploader" label="文件上传">
				<template #input>
					<van-uploader v-model="uploader" />
				</template>
			</van-field>
			<div style="margin: 16px;">
				<van-button round block type="info" native-type="submit">注册</van-button>
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
				uploader: [{
					url: 'https://img01.yzcdn.cn/vant/leaf.jpg'
				}]
			};
		},
		methods: {
			onSubmit(values) {
				console.log('submit', values);
				this.$router.push({
					path: '/login',
					query: {}
				})
			},
		},
	};
</script>

<style>
</style>

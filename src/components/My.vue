<template>
	<div>
		<div v-if="loginShow">
			<van-image round width="10rem" height="10rem" :src="user.image_src" @click="preview()" />
			<br />
			<van-uploader :after-read="afterRead">
				<van-button round class="textSpan" @click="changeImage()">更换头像</van-button>
			</van-uploader>
			<br />
			<br />
			
			<span>昵称</span>
			<br />
			<br />
			<van-list>
				<van-cell @click="changeMy()">资料修改</van-cell>
				<van-cell>我的书架</van-cell>
				<van-cell>我的购买</van-cell>
				<van-cell>我的会员</van-cell>
				<van-cell>
					<van-button plain type="info" style="width:100%" to="/login">切换账号</van-button>
				</van-cell>
				<van-cell>
					<van-button type="danger" style="width:100%">退出登录</van-button>
				</van-cell>
			</van-list>
		</div>
		<div v-if="notLoginShow">
			<center>
				<van-button plain type="info" @click="login()" to="/login">请登录</van-button>
			</center>
		</div>
	</div>
</template>

<script>
	import {
		ImagePreview,
		Toast
	} from 'vant';
	export default {
		components: {
			[ImagePreview.Component.name]: ImagePreview.Component,
		},
		data() {
			return {
				user: {
					'user_id': '',
					'image_src': 'https://img01.yzcdn.cn/vant/cat.jpeg'
				},
				notLoginShow: false,
				loginShow: true
			}
		},
		methods: {
			afterRead(file) {
				// 此时可以自行将文件上传至服务器
				Toast(file);
			},
			preview() {
				ImagePreview(['https://img01.yzcdn.cn/vant/cat.jpeg']);
			},
			changeMy(){
				
			},
			changeImage() {

			},
			login() {

			}
		}
	};
</script>

<style>
</style>

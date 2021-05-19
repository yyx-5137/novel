<template>
	<div>
		<div v-if="loginShow">
			<van-image round width="10rem" height="10rem" :src="user.imageSrc" @click="preview()" />

			<!-- <van-uploader :after-read="afterRead">
				<van-button round class="textSpan" @click="changeImage()">更换头像</van-button>
			</van-uploader> -->
			<br />
			<br />

			<span class="titleSpan">{{this.user.userName}}</span>
			<br />
			<br />
			<span class="authorSpan">{{this.user.userIntroduction}}</span>
			<br />
			<br />
			<van-list>
				<van-cell to="/changeInfo">资料修改</van-cell>
				<van-cell>我的书架</van-cell>
				<van-cell>我的购买</van-cell>
				<van-cell>我的会员</van-cell>
				<van-cell>
					<van-button plain type="info" style="width:100%" to="/login">切换账号</van-button>
				</van-cell>
				<van-cell>
					<van-button type="danger" style="width:100%" @click="exit()">退出登录</van-button>
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
					'id': '',
					'userName': '昵称',
					'sex': '',
					'userIntroduction': '这个人很懒~',
					'userId': '',
					'imageSrc': 'https://img01.yzcdn.cn/vant/cat.jpeg',
					'password': ''
				},
				notLoginShow: false,
				loginShow: true
			}
		},
		mounted: function() {

			console.log(this.$cookies)
			console.log(this.$cookies.get("userName"))
			if (this.$cookies.get("id") != null) {
				if (this.$cookies.get("userName") != null) {
					this.user.userName = this.$cookies.get("userName");

				}
				if (this.$cookies.get("userIntroduction") != null) {
					this.user.userIntroduction = this.$cookies.get("userIntroduction");

				}
				if (this.$cookies.get("userId") != null) {
					this.user.userId = this.$cookies.get("userId");
				}
				if (this.$cookies.get("sex") != null) {
					this.user.sex = this.$cookies.get("sex");

				}
				if (this.$cookies.get("id") != null) {
					this.user.id = this.$cookies.get("id");

				}
				if (this.$cookies.get("imageSrc") != null) {
					this.user.imageSrc = this.$cookies.get("imageSrc");

				}
				this.loginShow = true;
				this.notLoginShow = false;


			} else {
				this.loginShow = false;
				this.notLoginShow = true;
			}

		},
		methods: {
			exit() {
				this.$cookies.remove("userName");
				this.$cookies.remove("userId");
				this.$cookies.remove("id");
				this.$cookies.remove("sex");
				this.$cookies.remove("imageSrc");
				this.$cookies.remove("userIntroduction");
				this.$cookies.remove("password");
				this.loginShow = false;
				this.notLoginShow = true;

			},
			afterRead(file) {
				// 此时可以自行将文件上传至服务器
				console.log(file)
			},
			preview() {
				ImagePreview(['https://img01.yzcdn.cn/vant/cat.jpeg']);
			},
			changeMy() {

			},
			changeImage() {

			},
			login() {

			}
		}
	};
</script>

<style>
	.titleSpan,
	.authorSpan {
		font-family: "Hiragino Sans GB";
		font-weight: lighter;

	}

	.titleSpan {
		line-height: 2.0;
		font-size: 16px;
	}

	.authorSpan {
		font-size: 14px;
		color: #696969;
	}
</style>

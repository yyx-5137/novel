<template>
	<div>
		<van-image round width="10rem" height="10rem" :src="this.user.imageSrc" @click="preview()" />
		<br />
		<van-uploader :after-read="afterRead">
			<van-button round class="textSpan" @click="changeImage()">更换头像</van-button>
		</van-uploader>
		<van-field v-model="user.userName" label="用户名" />
		<br />
		<div style="margin-left: 10px;">
			<van-radio-group v-model="user.sex" direction="horizontal">
				<van-radio name="1">男</van-radio>
				<van-radio name="0">女</van-radio>
			</van-radio-group>
		</div>
		<br />
		<van-field v-model="user.userIntroduction" rows="2" autosize label="个人简介" type="textarea" maxlength="50"
			placeholder="个人简介" show-word-limit />
		<van-button plain type="info" style="width:100%" @click="finishChange()">完成设置</van-button>
	</div>
</template>

<script>
	import {
		ImagePreview,
		Toast
	} from 'vant';
	import axios from 'axios';
	export default {
		data() {
			return {
				user: {
					'userName': '',
					'sex': '0',
					'userIntroduction': '',
					'userId': '',
					'imageSrc': 'https://img01.yzcdn.cn/vant/cat.jpeg',
					'urlIsChange': true
					// 'imageSrc': "https://yyx-novel.oss-cn-beijing.aliyuncs.com/1777.png"
				},
				notLoginShow: false,
				loginShow: true
			}
		},
		mounted: function() {
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
				if (this.$cookies.get("imageSrc") != null) {
					this.user.imageSrc = this.$cookies.get("imageSrc");

				}
			}
		},
		methods: {
			preview() {
				ImagePreview([this.$cookies.get("imageSrc")]);
			},
			changeImage() {

			},
			afterRead(file) {
				// 此时可以自行将文件上传至服务器
				let data = {
					'content': file.content,
					'path': this.$cookies.get("userId") + ".png"
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/updateImg", data, {
					headers: headers
				}).then((response) => {
					if (response.data.status == "fail") {
						Toast("设置失败！");
					} else {
						Toast("设置成功");
						location.reload();
					}
				})
				console.log(this.$cookies.get("userId") + ".png")
				this.user.imageSrc = "https://yyx-novel.oss-cn-beijing.aliyuncs.com/" + this.$cookies.get("userId") +
					".png"
				console.log("图片url ：", this.user.imageSrc)
				this.user.urlIsChange = !this.user.urlIsChange
				this.$cookies.set("imageSrc", this.user.imageSrc, "30d")
			},
			finishChange() {
				let self = this;
				let data = {
					'userName': self.user.userName,
					'sex': self.user.sex,
					'userIntroduction': self.user.userIntroduction,
					'userId': self.$cookies.get("userId"),
					'profileUrl': 'https://img01.yzcdn.cn/vant/cat.jpeg'
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/updateUser", data, {
					headers: headers
				}).then((response) => {
					if (response.data.status == "fail") {
						Toast("设置失败！");
					} else {
						Toast("设置成功");
						self.$cookies.set("userName", self.user.userName, "30d")
						self.$cookies.set("sex", self.user.sex, "30d")
						self.$cookies.set("imageSrc", self.user.imageSrc, "30d")
						self.$cookies.set("userIntroduction", self.user.userIntroduction, "30d")
						self.$router.push({
							path: '/my',
							query: {}
						})
					}
				})
			}
		},
	}
</script>

<style>
</style>

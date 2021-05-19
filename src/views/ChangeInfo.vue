<template>
	<div>
		<van-image round width="10rem" height="10rem" :src="user.imageSrc" @click="preview()" />
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
					'imageSrc': 'https://img01.yzcdn.cn/vant/cat.jpeg'
				},
				notLoginShow: false,
				loginShow: true
			}
		},
		methods: {
			preview() {
				ImagePreview([user.image_src]);
			},
			changeImage() {

			},
			afterRead(file) {
				// 此时可以自行将文件上传至服务器
				Toast(file);
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
				console.log("userName", self.user.userName);
				console.log("data", data)
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/updateUser", data, {
					headers: headers
				}).then((response) => {
					console.log(response.data)
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

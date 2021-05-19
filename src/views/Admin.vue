<template>
	<center>
		<div>
			<van-list>
				<van-cell>
					<el-row>
						<el-col :span="3">
							<div>小说id</div>
						</el-col>
						<el-col :span="3">
							<div>小说名</div>
						</el-col>
						<el-col :span="3">
							<div>作者</div>
						</el-col>
						<el-col :span="3">
							<div>类型</div>
						</el-col>
						<el-col :span="3">
							<div>状态</div>
						</el-col>
						<el-col :span="3">
							<div></div>
						</el-col>
						<el-col :span="3">
							<div></div>
						</el-col>
						<el-col :span="3">
							<div></div>
						</el-col>
					</el-row>
				</van-cell>
				<div>
					<van-cell v-for="item in list" :key="item.book_id">
						<el-row>
							<el-col :span="3">
								<div class="authorSpan">{{item.book_id}}</div>
							</el-col>
							<el-col :span="3">
								<div class="authorSpan">{{item.book_name}}</div>
							</el-col>
							<el-col :span="3">
								<div class="authorSpan">{{item.author}}</div>
							</el-col>
							<el-col :span="3">
								<div class="authorSpan">{{item.tag}}</div>
							</el-col>
							<el-col :span="3">
								<div class="authorSpan">{{item.state}}</div>
							</el-col>
							<el-col :span="3">
								<van-button type="primary" @click="handleBook(item.book_id)"
									:disabled="handleBookButton">上架
								</van-button>
							</el-col>
							<el-col :span="3">
								<van-button type="info" @click="toBookDetail(item)">查看</van-button>
							</el-col>
							<el-col :span="3">
								<van-button type="danger" @click="removeBook(item.book_id)"
									:disabled="removeBookButton">下架
								</van-button>
							</el-col>
						</el-row>
					</van-cell>
				</div>
			</van-list>
		</div>
	</center>
</template>

<script>
	import axios from 'axios';

	export default {
		data() {
			return {
				list: [],
				novel: {

				},
				handleBookButton: true,
				removeBookButton: false
			}
		},
		mounted: function() {
			this.onLoad();
		},
		methods: {
			toBookDetail(topitem) {
				this.$router.push({
					path: '/bookdetail',
					query: {
						book_id: topitem.book_id,
						book_name: topitem.book_name,
						image_src: topitem.image_src,
						author: topitem.author,
						book_introduction: topitem.book_introduction,
						tag: topitem.tag,
						state: topitem.state
					}
				})
			},
			handleBook(i) {
				console.log(i)

				let self = this;
				let data = {
					"adminStatus": "0",
					"bookId": i
				};
				console.log(data);
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/adminBook", data, {
					headers: headers


				}).then((response) => {
					console.log(response.data);
					if (response.data.object) {
						self.handleBookButton = true;
						self.removeBookButton = false;
					}
				})
			},
			removeBook(i) {
				console.log(i)
				let self = this;
				let data = {
					"adminStatus": "0",
					"bookId": "2"
				};
				console.log(data);
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/adminBook", data, {
					headers: headers


				}).then((response) => {
					console.log(response.data);
					if (response.data.object) {
						self.handleBookButton = false;
						self.removeBookButton = true;
					}
				})
			},
			onLoad() {
				let self = this;
				let data = {
					"id": "123"
				};
				console.log(data);
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/getAllNovelList", data, {
					headers: headers


				}).then((response) => {
					self.showBookList(response);
				})
			},
			showBookList(response) {
				console.log("start");
				console.log(response.data);
				console.log("lengrg:", response.data.object.length);
				var novelList = [];
				for (let i = 0; i < response.data.object.length; i++) {
					var novel_detail = {
						'book_id': '',
						'book_name': '',
						'author': '',
						'image_src': '',
						'book_introduction': '',
						'tag': '',
						'state': ''
					}
					novel_detail.book_name = response.data.object[i].novelName;
					novel_detail.author = response.data.object[i].name;
					novel_detail.image_src = response.data.object[i].coverUrl;
					novel_detail.book_introduction = response.data.object[i].introduce;
					novel_detail.tag = response.data.object[i].tag;
					novel_detail.book_id = response.data.object[i].id;
					novel_detail.state = response.data.object[i].state;
					if (response.data.object[i].adminStatus == 1) {
						novelList.push(novel_detail);
					}

				}
				this.list = novelList;
				console.log("list:" + this.list.length);
			},
		}

	}
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
		margin-top: 10%;
	}
</style>

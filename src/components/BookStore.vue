<template>
	<div>


		<!-- 排行榜 -->
		<van-grid :gutter="10" column-num="4">
			<van-grid-item text="文字" v-for="topitem in list" :key="topitem.book_id" @load="onLoad"
				@click="toBookDetail(topitem)">
				<!-- <router-link:to="{path: '/bookdetail', query: {id: topitem.book_id, book_name: topitem.book_name, image_src: topitem.image_src,author:topitem.author,book_introduction:topitem.book_introduction }}">-->
				<van-image :src="topitem.image_src" />
				<span class="titleSpan">{{ topitem.book_name }}</span>
				<span class="authorSpan">{{ topitem.author }}</span>
				<!-- </router-link> -->
			</van-grid-item>
		</van-grid>



		<!-- 小说列表 -->
		<div v-show="notLogin">
			<van-divider>请登录</van-divider>
			</van-pull-refresh>
		</div>
		<div v-show="logined">
			<van-divider>暂时没有更多了</van-divider>
			</van-pull-refresh>
		</div>




	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				value: '',
				currentDate: new Date(),
				logined: false,
				novel_detail: {
					'book_id': '',
					'book_name': '',
					'author': '',
					'image_src': '',
					'book_introduction': '',
					'tag': ''
				},
				list: [],
				notLogin: true,
				loading: false,
				finished: false,
				refreshing: false,
				active: 0,
				icon: {
					active: require("../assets/bookshelfactive.png"),
					inactive: require("../assets/bookshelf.png"),
					active2: require("../assets/bookstoreactive.png"),
					inactive2: require("../assets/bookstore.png")
				},
				user: {
					'id': 1
				}
			};
		},
		mounted: function() {
			if (this.$cookies.get("id") == null) {
				this.notLogin = true;
				this.list = [];
			} else {
				this.onLoad();
				this.notLogin = false;
				if (this.list == []) {
					this.logined = true;
				}
			}

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
			onLoad() {
				let self = this;
				console.log(self.$cookies.get("id"));
				self.loading = true;
				let data = {
					"userId": self.$cookies.get("id")
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/getBookShelfByUser", data, {
					headers: headers


				}).then((response) => {
					console.log(response.data)
					if (self.refreshing) {
						self.list = [];
						self.refreshing = false;
					}
					var l = [];
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
						l.push(novel_detail);
					}
					self.list = l;
					self.loading = false;
					self.finished = true;
					console.log(self.list);

				})
			},
			onRefresh() {
				// 清空列表数据
				this.finished = false;

				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				this.loading = true;
				this.onLoad();
			},
		},
	};
</script>

<style>
	.el-row {
		margin-bottom: 0px;

		&:last-child {
			margin-bottom: 0;
		}
	}

	.el-col {
		border-radius: 4px;
	}

	.bg-purple-dark {
		background: #99a9bf;
	}

	.bg-purple {
		background: #d3dce6;
	}

	.bg-purple-light {
		background: #e5e9f2;
	}

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
	}

	.row-bg {
		padding: 10px 0;
		background-color: #f9fafc;
	}

	.titleSpan,
	.authorSpan {
		font-family: "Hiragino Sans GB";
		font-weight: lighter;
		font-size: 14px;
	}

	.titleSpan {
		line-height: 2.0;
	}

	.authorSpan {
		font-size: 10px;
		color: #696969;
	}

	.el-carousel__item h3 {
		color: #475669;
		font-size: 14px;
		opacity: 0.75;
		line-height: 200px;
		margin: 0;
	}

	.el-carousel__item:nth-child(3n+0) {
		background-image: url('https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/9aa4534487c2a08b24397b3ba908916b.jpg');
	}

	.el-carousel__item:nth-child(3n+1) {
		background-image: url('https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/e79e9a248f01fcf73deabfe57b06203c.jpg');
	}

	.el-carousel__item:nth-child(3n+2) {
		background-image: url(' https://bossaudioandcomic-1252317822.image.myqcloud.com/activity/document/3d326ef892917c779a2fcf3177d35655.jpg');
	}

	.time {
		font-size: 13px;
		color: #999;
	}

	.bottom {
		margin-top: 13px;
		line-height: 12px;
	}

	.button {
		padding: 0;
		float: right;
	}

	.image {
		width: 100%;
		display: block;
	}

	.clearfix:before,
	.clearfix:after {
		display: table;
		content: "";
	}

	.clearfix:after {
		clear: both
	}
</style>

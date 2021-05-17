<template>
	<div>
		<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
			<van-cell v-for="item in list" :key="item.book_id" @click="toBookDetail(item)">
				<el-row :gutter="10">
					<el-col :span="4">
						<van-image width="8rem" height="8rem" fit="contain" id='imageList' :src="item.image_src" />
					</el-col>
					<el-col :span="2">
						<div class="grid-content"></div>
					</el-col>
					<el-col :span="18">
						<el-row class="titleSpan">
							{{ item.book_name }}
						</el-row>
						<el-row class="authorSpan">
							{{ item.author }}
						</el-row>
						<el-row class="authorSpan">
							<span class="van-multi-ellipsis--l3">{{ item.book_introduction }}</span>
						</el-row>

					</el-col>
				</el-row>
			</van-cell>
		</van-list>

		<!-- 小说列表 -->
		<!-- <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
			<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
				<van-cell v-for="item in list" :key="item.book_id" @click="toBookDetail(item)">
					<el-row :gutter="10">
						<el-col :span="4">
							<van-image width="8rem" height="8rem" fit="contain" id='imageList' :src="item.image_src" />
						</el-col>
						<el-col :span="2">
							<div class="grid-content"></div>
						</el-col>
						<el-col :span="18">
							<el-row class="titleSpan">
								{{ item.book_name }}
							</el-row>
							<el-row class="authorSpan">
								{{ item.author }}
							</el-row>
							<el-row class="authorSpan">
								<span class="van-multi-ellipsis--l3">{{ item.book_introduction }}</span>
							</el-row>

						</el-col>
					</el-row>

				</van-cell>
			</van-list>
		</van-pull-refresh> -->



	</div>
</template>

<script>
	import axios from 'axios';
	export default {
		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				novel_detail: {
					'book_id': '',
					'book_name': '',
					'author': '',
					'image_src': '',
					'book_introduction': '',
					'tag': ''
				},
			};
		},
		mounted: function() {
			this.onLoad()
		},
		methods: {
			onLoad() {
				// 异步更新数据
				// setTimeout 仅做示例，真实场景中一般为 ajax 请求
				this.loading = true;
				let data = {
					"userId": "2407505137"
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/getTopBook", data, {
					headers: headers
				
				
				}).then((response) => {
					this.showBookList(response);
				})

			},
			showBookList(response) {
				console.log("start");
				console.log(response.data);
				if (this.refreshing) {
					this.list = [];
					this.refreshing = false;
				}
				console.log("lengrg:", response.data.object.length)
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
					this.list.push(novel_detail);

				}


				if (this.list.length >= 4) {
					this.finished = true;
					this.loading = false;
				}
				console.log("list:" + this.list.length);
			},

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
						state:topitem.state
					}
				})
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

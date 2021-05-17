<template>
	<div>
		<el-row :gutter="20">
			<el-col :span="1">
				<div class="grid-content"></div>
			</el-col>
			<el-col :span="3">
				<div class="grid-content">
					<van-sidebar v-model="activeKey">
						<van-sidebar-item v-for="item in tagList" :key="item" @click="showList(item)" :title=item>

						</van-sidebar-item>
					</van-sidebar>
				</div>
			</el-col>
			<el-col :span="20">
				<div class="grid-content">
					<div>
						<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
							<van-cell v-for="item in list" :key="item.book_id" @click="toBookDetail(item)">
								<el-row :gutter="10">
									<el-col :span="4">
										<van-image width="8rem" height="8rem" fit="contain" id='imageList'
											:src="item.image_src" />
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
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script>
	import axios from 'axios';
	export default {

		data() {
			return {
				tagList: ["所有", "言情小说", "玄幻小说", "都市小说", "历史小说", "修真小说", "网游小说", "科幻小说", "其他小说", ],
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
				headActive: 1,
				isShow: true,
				activeKey: 0,
				bookurl: '/getTopBook'
			}
		},
		
		methods: {
			showList(item) {
				this.isShow = true
				if (item != "所有") {
					this.bookurl = "/getBookByTag"
				}
				this.onLoad(item);
			},
			onLoad(item) {
				// 异步更新数据
				// setTimeout 仅做示例，真实场景中一般为 ajax 请求
				this.loading = true;
				let data = {
					"tag": item
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post(this.bookurl, data, {
					headers: headers

				}).then((response) => {
					this.showBookList(response);
					console.log(response.data);
				})

			},
			showBookList(response) {
				this.list = [];
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
						state: topitem.state
					}
				})
			},

		}

	}
</script>

<style>
	.el-row {
		margin-bottom: 20px;

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
</style>

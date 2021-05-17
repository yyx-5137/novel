<template>
	<div>
		<form action="/">
			<van-search v-model="value" show-action placeholder="请输入搜索关键词" @search="onSearch" @cancel="onCancel" />
		</form>
		<!-- <div v-if="searchShow">
			<SearchList></SearchList>
		</div> -->
		<div v-if="recommendShow">
			<el-carousel :interval="1000" arrow="always">
				<el-carousel-item v-for="item in 3" :key="item">
				</el-carousel-item>
			</el-carousel>
			<van-divider>红文榜</van-divider>


			<!-- 排行榜 -->
			<van-grid :gutter="10" column-num="4">
				<van-grid-item text="文字" v-for="topitem in top_list" :key="topitem.book_id" @load="onLoad"
					@click="toBookDetail(topitem)">
					<!-- <router-link:to="{path: '/bookdetail', query: {id: topitem.book_id, book_name: topitem.book_name, image_src: topitem.image_src,author:topitem.author,book_introduction:topitem.book_introduction }}">-->
					<van-image :src="topitem.image_src" />
					<span class="titleSpan">{{ topitem.book_name }}</span>
					<span class="authorSpan">{{ topitem.author }}</span>
					<!-- </router-link> -->
				</van-grid-item>
			</van-grid>

		</div>

		<!-- 小说列表 -->
		<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
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
		</van-pull-refresh>




	</div>
</template>

<script>
	import {
		Toast
	} from 'vant';
	import SearchList from '@/components/SearchList.vue';
	import axios from 'axios';
	export default {
		components: {
			SearchList

		},
		data() {
			return {
				value: '',
				currentDate: new Date(),
				novel_detail: {
					'book_id': '',
					'book_name': '',
					'author': '',
					'image_src': '',
					'book_introduction': '',
					'tag': '',
					'state': ''
				},
				list: [],
				top_list: [],
				loading: false,
				finished: false,
				refreshing: false,
				recommendShow: true,
				searchShow: false,
			};
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
			onSearch(val) {
				this.list = [];
				this.recommendShow = false;
				let data = {
					"value": val,
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/searchBook", data, {
					headers: headers
				}).then((response) => {
					this.showBookList(response);
				})
			},
			onCancel() {
				Toast('取消');
				this.recommendShow = true;
				this.searchShow = false;
			},
			onLoad() {


				this.loading = true;
				let data = {
					"code": "200",
					"userId": "2407505137"
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/getAllNovelList", data, {
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
					if (i <= 3) {
						this.top_list.push(novel_detail);
					} else {
						this.list.push(novel_detail);
					}

				}


				if (this.list.length >= 4) {
					this.finished = true;
					this.loading = false;
				}
				console.log("list:" + this.list.length);
			},
			onRefresh() {
				// 清空列表数据
				this.finished = false;

				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				this.loading = true;
				// this.onLoad();
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

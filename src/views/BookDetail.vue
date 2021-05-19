<template>
	<van-list>
		<van-cell>
			<el-row :gutter="10">
				<el-col :span="4">
					<van-image width="10rem" height="10rem" fit="contain" id='imageList'
						:src="this.$route.query.image_src" />
				</el-col>
				<el-col :span="2">
					<div class="grid-content"></div>
				</el-col>
				<el-col :span="18">
					<el-row class="titleSpan">
						{{ this.$route.query.book_name }}
					</el-row>
					<el-row class="authorSpan">
						{{ this.$route.query.author }}
					</el-row>
					<el-row class="titleSpan">
						<br />
					</el-row>
					<el-row class="authorSpan">
						<van-tag round size="large" color="#7232dd">{{ this.$route.query.state }}</van-tag>
					</el-row>
					<br />
					<el-row class="authorSpan">
						<van-tag round size="large" color="#7232dd">{{ this.$route.query.tag }}</van-tag>
					</el-row>

				</el-col>
			</el-row>
		</van-cell>
		<van-cell>
			<el-row class="authorSpan">
				<span>{{ this.$route.query.book_introduction }}</span>
			</el-row>
		</van-cell>
		<img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />


		<el-row :gutter="20">

			<el-col :span="6">
				<div class="grid-content">
					<van-button round @click="preferActive()">
						收藏
					</van-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content">
					<van-button round @click="addStoreActive()" :disabled="buttonState">
						{{this.bookshelf}}
					</van-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content">
					<van-button round @click="removeStoreActive()" :disabled="removeButtonState">
						移出书架
					</van-button>
				</div>
			</el-col>
			<el-col :span="6">
				<div class="grid-content">
					<van-button round @click="readActive()">
						开始阅读
					</van-button>
				</div>
			</el-col>
		</el-row>
		<br />
		<div>
			<van-divider>{{israte}}</van-divider>
			<div v-show="rateState">
				<van-rate v-model="rate" color="#ffd21e" void-icon="star" void-color="#eee" @change="onChange" />
			</div>
			<div v-show="ratedState">
				<van-rate v-model="rate" disabled />
			</div>
		</div>

		<van-divider>同类型小说</van-divider>
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
			<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
				<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">

				</van-list>
			</van-pull-refresh>



		</div>
	</van-list>





</template>

<script>
	import axios from 'axios';
	import {
		Toast
	} from 'vant';
	export default {
		data() {
			return {
				ratedState: false,
				rateState: true,
				icon: {
					active: require("../assets/preferactive.png"),
					inactive: require("../assets/prefer.png"),
					active2: require("../assets/bookstoreactive.png"),
					inactive2: require("../assets/bookstore.png")
				},
				bookshelf: '加入书架',
				buttonState: false,
				list: [],
				loading: false,
				finished: false,
				refreshing: false,
				removeButtonState: true,
				rate: 3,
				israte: '评分'
			}
		},
		mounted: function() {
			require('events').EventEmitter.defaultMaxListeners = 100;
			this.getRate();
			this.onLoad();
			this.getBook();
		},
		methods: {
			onChange(value) {
				this.rate = value;
				this.ratedState = true;
				this.rateState = false;
				this.israte = "已评分"
				console.log(value)
				let data = {
					"id": this.$cookies.get("id"),
					"bookId": this.$route.query.book_id,
					"rate": value
				};
				console.log(data);
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/doRate", data, {
					headers: headers


				}).then((response) => {
					console.log(response.data);

				})

			},
			preferActive() {

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
			removeStoreActive() {
				let data = {
					"userId": this.$cookies.get("id"),
					"bookId": this.$route.query.book_id
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/removeBookShelfByUser", data, {
					headers: headers

				}).then((response) => {
					console.log(response.data);
					if (response.data.object == true) {
						Toast("已移出！");
						this.buttonState = false;
						this.removeButtonState = true;
						this.bookshelf = '加入书架';
					} else {
						this.buttonState = false;
						Toast("移出书架失败！")
					}
				})
			},
			addStoreActive() {
				let data = {
					"userId": this.$cookies.get("id"),
					"bookId": this.$route.query.book_id
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/addBookShelfByUser", data, {
					headers: headers

				}).then((response) => {
					console.log(response.data);
					if (response.data.object == true) {
						Toast("加入书架成功！");
						this.buttonState = true;
						this.removeButtonState = false;
						this.bookshelf = '已加入';
					} else {
						this.buttonState = false;
						Toast("加入书架失败！")
					}
				})
			},
			getRate() {
				let self = this;
				let data = {
					"id": this.$cookies.get("id"),
					"bookId": this.$route.query.book_id
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/getRate", data, {
					headers: headers

				}).then((response) => {
					console.log(response.data)
					if (response.data.object > 0) {
						self.rate = response.data.object
						self.ratedState = true;
						self.rateState = false;
						this.israte = "已评分"
					} else {
						self.ratedState = false;
						self.rateState = true;
						this.israte = "评分"

					}
				})
			},
			onLoad() {
				let data = {
					"userId": this.$cookies.get("id"),
					"bookId": this.$route.query.book_id
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/isAddBookShelf", data, {
					headers: headers

				}).then((response) => {
					console.log(response.data);
					if (response.data.object == true) {
						this.buttonState = true;
						this.bookshelf = '已加入';
						this.removeButtonState = false;
					}
				})
			},
			readActive() {
				this.$router.push({
					path: '/booktext',
					query: {
						book_name: this.$route.query.book_name,
						book_id: this.$route.query.book_id,
					}
				})
			},
			getBook() {
				this.loading = true;
				let data = {
					"tag": this.$route.query.tag
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/getBookByTag", data, {
					headers: headers


				}).then((response) => {
					if (this.refreshing) {
						this.list = [];
						this.refreshing = false;
					}
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
						if (response.data.object[i].id != this.$route.query.book_id) {
							novel_detail.book_name = response.data.object[i].novelName;
							novel_detail.author = response.data.object[i].name;
							novel_detail.image_src = response.data.object[i].coverUrl;
							novel_detail.book_introduction = response.data.object[i].introduce;
							novel_detail.tag = response.data.object[i].tag;
							novel_detail.book_id = response.data.object[i].id;
							novel_detail.state = response.data.object[i].state;
							this.list.push(novel_detail);
						}

					}
					this.loading = false;
					this.finished = true;

				})
			},
			onRefresh() {
				// 清空列表数据
				this.finished = false;

				// 重新加载数据
				// 将 loading 设置为 true，表示处于加载状态
				this.loading = true;
				this.onLoad();
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
</style>

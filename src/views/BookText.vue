<template>
	<el-container>
		<el-header>
			<div class="titleSpan">
				{{this.$route.query.book_name}}
			</div>
			<div class="titleSpan">
				{{chapter_name}}
			</div>
		</el-header>
		<el-main>
			<br />
			<div class="textSpan" v-model="loading" @load="onLoad">
				{{novel_text}}
			</div>
		</el-main>
		<el-footer class="footer" type='flex'>
			<van-list>
				<van-cell>
					<el-row :gutter="20">
						<el-col :span="2">
							<div class="grid-content">
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content">
								<van-button round class="textSpan" @click="lastChapter()" :disabled="lastState">上一章
								</van-button>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content">

							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content">
								<van-button round class="textSpan" @click="showPopup">目录</van-button>
								<van-popup v-model="show" round position="bottom" :style="{ height: '50%'}">
									<div>

										<el-container>
											<el-header style="margin-top:10px;">

												<div class="titleSpan">
													{{this.$route.query.book_name}}
												</div>
											</el-header>
											<el-main>
												<div class="textSpan">
													<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
														<van-list v-model="loading" :finished="finished"
															finished-text="没有更多了" @load="onLoad">
															<van-cell v-for="item in list" :key="item.chapterName"
																:title="item.chapterName" @click="readActive(item)" />
														</van-list>
													</van-pull-refresh>
												</div>
											</el-main>
											<el-footer>

												<div>
													<van-pagination v-model="currentPage" :total-items="125"
														:show-page-size="3" @change="getPage()" force-ellipses />
												</div>

											</el-footer>
										</el-container>
									</div>
								</van-popup>
								<van-popup v-model="buyBookButton">
									<div style="width: 400px;height: 150px; background-color: #FFFFFF;">

										<center>
											<div style=" margin-top: 10%;"><span class="titleSpan">试读结束!</span></div>
										</center>

										<center>
											<div style=" margin-top: 10%;">
												<van-button type="primary" round @click="toPay()">购买整本书</van-button>
											</div>

										</center>

									</div>
								</van-popup>
							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content">

							</div>
						</el-col>
						<el-col :span="4">
							<div class="grid-content">
								<van-button round class="textSpan" @click="nextChapter()" :disabled="nextState">下一章
								</van-button>
							</div>
						</el-col>
						<el-col :span="2">
							<div class="grid-content">
							</div>
						</el-col>
					</el-row>
				</van-cell>
			</van-list>
		</el-footer>
	</el-container>
</template>

<script>
	import contents from '@/components/BookContents.vue'
	import axios from 'axios';
	export default {
		components: {
			contents
		},
		data() {
			return {
				buyBookButton: false,
				show: false,
				novel_text: '',
				loading: false,
				chapter_name: '',
				list: [],
				finished: false,
				refreshing: false,
				currentPage: 1,
				begin: 1,
				rowNum: 0,
				lastState: true,
				nextState: false,
				allPaperList: []

			};
		},
		mounted: function() {
			var userId = this.$cookies.get("userId");
			var bookId = this.$route.query.book_id;
			var payInfo = userId + bookId;
			console.log(this.$cookies.get(payInfo));
			if (this.currentPage == 3) {
				if (this.$cookies.get(payInfo) != null) {
					this.buyBookButton = false;
					this.onBegin();

				} else {
					this.buyBookButton = true;
				}
			} else {
				this.buyBookButton = false;

				this.onBegin();
			}

			this.onLoad();
		},
		methods: {
			showPopup() {
				this.show = true;
			},
			lastChapter() {
				this.onBegin();
				if (this.rowNum != this.list.length - 1) {
					this.nextState = false;
				}
				if (this.rowNum == 0) {
					this.lastState = true;

				} else {
					this.rowNum = this.rowNum - 1;
					this.lastState = false;

				}
				this.chapter_name = this.list[this.rowNum].chapterName;

			},
			getContents() {
				this.onBegin()

			},
			nextChapter() {
				var userId = this.$cookies.get("userId");
				var bookId = this.$route.query.book_id;
				var payInfo = userId + bookId;
				if (this.currentPage == 3) {
					if (this.$cookies.get(payInfo) == null) {
						this.buyBookButton = true;
					} else {
						if (this.rowNum >= 0) {
							this.lastState = false;
						}
						if (this.rowNum == this.list.length - 1) {
							this.nextState = true;
						} else {
							this.rowNum = this.rowNum + 1;
							this.nextState = false;
						}

						this.chapter_name = this.list[this.rowNum].chapterName;
						this.buyBookButton = false;
						this.onBegin();
					}
				} else {
					if (this.rowNum >= 0) {
						this.lastState = false;
					}
					if (this.rowNum == this.list.length - 1) {
						this.nextState = true;
					} else {
						this.rowNum = this.rowNum + 1;
						this.nextState = false;
					}

					this.chapter_name = this.list[this.rowNum].chapterName;
					this.buyBookButton = false;
					this.onBegin();
				}

			},
			onBegin() {
				axios.get("/getBookContents").then((response) => {
					this.novel_text = response.data.object;
					if (this.novel_text != null) {
						this.loading = false;
					}

				})
			},
			readActive(item) {
				if (this.currentPage == 3) {
					if (this.$cookies.get(payInfo) == null) {
						this.buyBookButton = true;
					} else {
						this.buyBookButton = false;
						this.show = false;

						console.log(item);
						this.chapter_name = item.chapterName;
						this.rowNum = item.rowNum - 1;
						this.onBegin();
					}
				} else {
					this.buyBookButton = false;
					this.show = false;

					console.log(item);
					this.chapter_name = item.chapterName;
					this.rowNum = item.rowNum - 1;
					this.onBegin();
				}

			},
			getPage() {
				this.begin = (this.currentPage - 1) * 10 + 1;
				this.list = [];
				this.onLoad();
			},
			buyBook() {
				// this.currentPage >= 2
				this.buyBookButton = true;


			},
			toPay() {
				this.$router.push({
					path: '/pay',
					query: {
						book_id: this.$route.query.book_id,
						book_name: this.$route.query.book_name
					}
				})
			},
			onLoad() {
				this.loading = true;
				let data = {
					"bookId": this.$route.query.book_id,
					"begin": this.begin,
					"count": 10
				};
				const headers = {
					'Content-Type': 'application/json',
					'Authorization': 'JWT fefege...'
				}
				axios.post("/getBookPaperByCursor", data, {
					headers: headers


				}).then((response) => {
					if (this.refreshing) {
						this.list = [];
						this.refreshing = false;
					}

					for (let i = 0; i < response.data.object.length; i++) {
						var chapterInfo = {
							"chapterId": '',
							"chapterName": '',
							"rowNum": ''
						}
						chapterInfo.chapterId = response.data.object[i].id;
						chapterInfo.chapterName = response.data.object[i].chapterName;
						chapterInfo.rowNum = response.data.object[i].rowNum;
						this.list.push(chapterInfo);
					}
					this.chapter_name = this.list[0].chapterName;

					if (this.list.length > 0) {
						this.finished = true;
						this.loading = false;
					}

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

	.grid-content {
		border-radius: 4px;
		min-height: 36px;
		width: 100px;
	}


	.titleSpan,
	.textSpan {
		font-family: "Hiragino Sans GB";
		font-weight: lighter;

	}

	.titleSpan {
		line-height: 2.0;
		font-size: 16px;
	}

	.textSpan {
		font-size: 14px;
		color: #696969;
	}

	.footer {
		position: fixed;
		bottom: 0px;
	}
</style>

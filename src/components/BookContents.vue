<template>
	<el-container>
		<el-header style="margin-top:10px;">

			<div class="titleSpan">
				{{this.$route.query.book_name}}
			</div>
		</el-header>
		<el-main>
			<div class="textSpan">
				<van-pull-refresh v-model="refreshing" @refresh="onRefresh">
					<van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
						<van-cell v-for="item in list" :key="item" :title="item" @click="readActive(item)" />
					</van-list>
				</van-pull-refresh>
			</div>
		</el-main>
		<el-footer>

			<div>
				<van-pagination v-model="currentPage" :total-items="125" :show-page-size="3" @change="getPage()"
					force-ellipses />
			</div>

		</el-footer>
	</el-container>
</template>

<script>
	import axios from 'axios';
	import {
		Toast
	} from 'vant';
	export default {

		data() {
			return {
				list: [],
				loading: false,
				finished: false,
				refreshing: false,
				currentPage: 1,
				begin: 1
			};
		},
		mounted: function() {
			this.onLoad()
		},
		methods: {
			readActive(item) {
				this.show = false;
				console
			},
			getPage() {
				this.begin = (this.currentPage - 1) * 10 + 1;
				this.list = [];
				this.onLoad();
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
						this.list.push(response.data.object[i].chapterName);
					}

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
		},
	};
</script>

<style>
</style>

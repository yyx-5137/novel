<template>
	<div class="home">
		<div v-if="mainShow">
			<Header></Header>
		</div>
		<div v-if="bookstoreShow">
			<BookStore></BookStore>
		</div>
		<div v-if="myShow">
			<My></My>
		</div>
		<div class="footer">
			<van-tabbar v-model="active">
				<van-tabbar-item @click="toBookStore()">书架
					<img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
				</van-tabbar-item>
				<van-tabbar-item @click="toMain()">书城
					<img slot="icon" slot-scope="props" :src="props.active ? icon.active2 : icon.inactive2" />
				</van-tabbar-item>
				<van-tabbar-item icon="setting-o" @click="toMy()">我的</van-tabbar-item>
			</van-tabbar>
		</div>
	</div>
</template>

<script>
	// @ is an alias to /src
	import Header from '@/components/Header.vue'
	import BookStore from '@/components/BookStore.vue'
	import My from '@/components/My.vue'
	export default {
		components: {
			Header,
			BookStore,
			My
		},
		data() {
			return {

				active: 1,
				icon: {
					active: require("../assets/bookshelfactive.png"),
					inactive: require("../assets/bookshelf.png"),
					active2: require("../assets/bookstoreactive.png"),
					inactive2: require("../assets/bookstore.png")
				},
				user: {
					'id': 1
				},
				bookstoreShow: false,
				myShow: false,
				mainShow: true
			};
		},
		mounted: function() {
			var events = require('events'); // 引入 events 模块
			var eventEmitter = new events.EventEmitter(); // 创建 eventEmitter 对象
			eventEmitter.setMaxListeners(100);
			require('events').EventEmitter.prototype._maxListeners = 100;
		},
		methods: {
			toBookStore() {
				this.bookstoreShow = true;
				this.mainShow = false;
				this.myShow = false;

			},
			toMy() {
				this.bookstoreShow = false;
				this.mainShow = false;
				this.myShow = true;
			},
			toMain() {
				this.bookstoreShow = false;
				this.mainShow = true;
				this.myShow = false;
			}

		}
	}
</script>

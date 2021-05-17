<template>
	<div class="footer">
		<van-tabbar v-model="active">
			<van-tabbar-item @click="toBookStore()">书架
				<img slot="icon" slot-scope="props" :src="props.active ? icon.active : icon.inactive" />
			</van-tabbar-item>
			<van-tabbar-item>书城
				<img slot="icon" slot-scope="props" :src="props.active ? icon.active2 : icon.inactive2" />
			</van-tabbar-item>

			<van-tabbar-item icon="setting-o" @click="toBookStore()">我的</van-tabbar-item>
		</van-tabbar>
	</div>
</template>

<script>
	// @ is an alias to /src
	export default {
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
				}
			};
		},
		methods: {
			toBookStore() {
				this.$router.push({
					path: '/bookstore',
					query: {
						id: this.user.id
					}
				});

			},
			toMy(){
				this.$router.push({
					path: '/my',
					query: {
						id: this.user.id
					}
				});
			}

		}
	}
</script>

<style>
</style>

<template>
	<div class="header">
		<van-tabs v-model="headActive">
			<van-tab title="排行">
				<SearchList></SearchList>
			</van-tab>
			<van-tab title="推荐">
				<recommendPage>
				</recommendPage>
			</van-tab>
			<van-tab title="分类">
				<TypePage></TypePage>
			</van-tab>
		</van-tabs>
	</div>
</template>

<script>
	import recommendPage from '@/components/recommendPage.vue'
	import TypePage from '@/components/TypePage.vue'
	import SearchList from '@/components/SearchList.vue'

	export default {
		components: {
			recommendPage,
			TypePage,
			SearchList


		},
		data() {
			return {
				headActive: 1,
			}
		},
		methods: {

		}

	}
</script>

<style>
</style>

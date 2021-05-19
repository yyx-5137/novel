<template>
	<div>
		<center>
			<div style="width: 400px; height: 600px;">
				<img src="../assets/pay.jpg" style="width: 100%; height: auto;" />

			</div>
		</center>
		<div style="margin-top: 10%;">
			<van-button type="primary" @click="finishPay()" round>完成支付</van-button>
		</div>
	</div>
</template>

<script>
	export default {

		methods: {
			finishPay() {
				var book_id = this.$route.query.book_id;
				var user_id = this.$cookies.get("userId");
				var payInfo = user_id + "_" + book_id;
				console.log(payInfo);
				console.log(this.$cookies.get("userId"))
				this.$cookies.set(payInfo, "ok");
				this.$router.push({
					path: '/booktext',
					query: {
						book_name: this.$route.query.book_name,
						book_id: this.$route.query.book_id
					}
				})
			}
		}
	}
</script>

<style>
</style>

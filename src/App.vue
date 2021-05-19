<template>
	<div id="app">
		<div id="nav" v-show="$route.meta.istrun">
			<router-link to="/">Home</router-link> |
			<router-link to="/about">About</router-link>
			<router-link to="/hello">Hello</router-link>
		</div>
		<router-view />
	</div>
</template>

<style>
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		margin-top: 60px;
	}
</style>
<script>
	var events = require('events');  // 引入 events 模块
	var eventEmitter = new events.EventEmitter();  // 创建 eventEmitter 对象
	eventEmitter.setMaxListeners(100);
	require('events').EventEmitter.prototype._maxListeners = 100;
	// import axios from 'axios'
	// axios.get("/aliapi/book_30001_45.html.txt").then((response) => {
	// 	console.log(response.data)
	// })
	// axios.get("/baidu").then((response) => {
	// 	console.log(response.data)
	// })
	// axios.get("/getAllNovelList").then((response) => {
	// 	console.log(response.data)
	// })
</script>

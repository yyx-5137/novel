module.exports = {
	devServer: {
		open: true,
		host: 'localhost',
		port: 8080,
		https: false,
		//以上的ip和端口是我们本机的;下面为需要跨域的
		proxy: { //配置跨域
			'/aliapi': {
				target: 'https://yyx-novel.oss-cn-beijing.aliyuncs.com/', //这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/aliapi': ''
				}
			},
			'/getAllNovelList': {
				target: 'http://localhost:8885/getAllNovelList', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/getAllNovelList': ''
				}
			},
			'/getBookContents': {
				target: 'http://localhost:8885/getBookContents', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/getBookContents': ''
				}
			},
			'/getBookPaperByCursor': {
				target: 'http://localhost:8885/getBookPaperByCursor', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/getBookPaperByCursor': ''
				}
			},
			'/addBookShelfByUser': {
				target: 'http://localhost:8885/addBookShelfByUser', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/addBookShelfByUser': ''
				}
			},
			'/removeBookShelfByUser': {
				target: 'http://localhost:8885/removeBookShelfByUser', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/removeBookShelfByUser': ''
				}
			},
			'/getBookShelfByUser': {
				target: 'http://localhost:8885/getBookShelfByUser', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/getBookShelfByUser': ''
				}
			},
			'/isAddBookShelf': {
				target: 'http://localhost:8885/isAddBookShelf', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/isAddBookShelf': ''
				}
			},
			'/searchBook': {
				target: 'http://localhost:8885/searchBook', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/searchBook': ''
				}
			},
			'/getTopBook': {
				target: 'http://localhost:8885/getTopBook', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/getTopBook': ''
				}
			},
			'/getBookByTag': {
				target: 'http://localhost:8885/getBookByTag', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/getBookByTag': ''
				}
			},
			'/getAllBookPaper': {
				target: 'http://localhost:8885/getAllBookPaper', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/getAllBookPaper': ''
				}
			},
			'/doRate': {
				target: 'http://localhost:8885/doRate', // 这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/doRate': ''
				}
			},
			'/baidu': {
				target: 'https://www.baidu.com/', //这里后台的地址模拟的;应该填写你们真实的后台接口
				ws: true,
				changOrigin: true, //允许跨域
				pathRewrite: {
					'^/baidu': ''
				}
			},

		}
	}
}

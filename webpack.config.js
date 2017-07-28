module.exports = {
	entry: __dirname + "/app/assets/js/app.js",
	output: {
		path: __dirname + "/app/assets/temp/js",
		filename: "app.js"
	},
		module: {
		loaders: [
			{
				loader: "babel-loader",
				query: {
					presets: ["es2015"]
				},
				test: /\.js$/,
				exclude: /node_modules/
			}
		]
	}
}
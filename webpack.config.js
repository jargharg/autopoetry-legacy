module.exports = {
	entry: __dirname + "/app/js/app.js",
	output: {
		path: __dirname + "/dist/js",
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
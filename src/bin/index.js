const argv = require('argv');
const editMovie = require('../helper/editMovie');
const compositeImgs = require('../helper/compositeImgs');

// 起動時のオプション設定
argv.option({
	name: 'filePath',
	short: '-f',
	type: 'string',
	description: '解析する動画ファイルのパス',
	example: "'script --from filePath'"
});

const filePath = argv.run().targets[0];

(async function () {

	try {
		// スロー動画を分割する
		await editMovie.separateMovie(filePath);

		await compositeImgs.compositeImgs();
	} catch (e) {
		console.log(e);
	}

})();

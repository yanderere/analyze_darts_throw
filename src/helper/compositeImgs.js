const sharp = require('sharp');
const conf = require('../config/common');

exports.compositeImgs = async function() {
	let baseImgPath;
	let margeImgPath;
	let outputImgPath;
	// 分割した画像分、統合を繰り返す
	for (let i = 1; i < conf.separate_count; i++) {
		console.log(i + '回目の画像統合');
		baseImgPath = process.cwd() + '/' + conf.separate_img_path + 'sep_' + 1 + '.png';
		margeImgPath = process.cwd() + '/' + conf.separate_img_path + 'sep_' + (i + 1) + '.png';

		if (i > 1) {
			baseImgPath = process.cwd() + conf.composite_tmp_path + 'marge_' + i + '.png';
		}
		outputImgPath = process.cwd() + conf.composite_tmp_path + 'marge_' + (i + 1) + '.png';

		if (i === conf.separate_count -1) {
			outputImgPath = process.cwd() + conf.composite_complete_path + 'analyzed.png';
		}

		await compositeImg(baseImgPath, margeImgPath, outputImgPath);
	}
};

/**
 * 2つの画像を合成
 *
 * @param {string} baseImgPath 合成の元になる画像のパス
 * @param {string} margeImgPath 合成する画像のパス
 * @param {string} outputImgPath 合成後の画像のパス
 * @return {Promise<void>}
 */
async function compositeImg(baseImgPath, margeImgPath, outputImgPath){
	await sharp(baseImgPath)
		.composite([{
			input: margeImgPath,
			gravity: 'centre',
			blend: 'difference'
		}])
		.toFile(outputImgPath)
		.catch(function(err) {
			throw err;
		})
}
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');
const conf = require('../config/common');

/**
 * 動画を分割する
 * @param filePath
 */
exports.separateMovie = async function (filePath) {
	const command = ffmpeg(filePath);
	await command.on( 'end', () => {
	}).screenshots({
		count: conf.separate_count, // 分割数
		folder: path.join(process.cwd(), conf.separate_img_path),
		filename: 'sep_%i.png', //分割した画像名
		size: '640x?'
	});
};
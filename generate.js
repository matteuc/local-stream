const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;

const spawn = require('child_process').spawn;

if(process.argv.length <= 2) {
    console.error('Please provide a filename as an argument!')
    process.exit(1)
}

const ffmpeg = spawn(ffmpegPath, `-i ./public/videos/${process.argv[2]} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ./public/videos/_generated_.m3u8`.split(" "));

ffmpeg.on('exit', () => console.log("All done!"));
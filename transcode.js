import childProcess from "child_process"
import ffmpegBinary from "@ffmpeg-installer/ffmpeg"

const ffmpegPath = ffmpegBinary.path;

const spawn = childProcess.spawn;

if(process.argv.length <= 2) {
    console.error('Please provide a filename as an argument!')
    process.exit(1)
}

const ffmpeg = spawn(ffmpegPath, `-i ./public/videos/${process.argv[2]} -codec: copy -start_number 0 -hls_time 10 -hls_list_size 0 -f hls ./public/videos/_generated_.m3u8`.split(" "));

ffmpeg.on('close', (code) => {
    if(code === 0) {
        console.log("All done!")
    } else {
        console.error("An error occurred when transcoding your file. Error code:", code)
    }
});
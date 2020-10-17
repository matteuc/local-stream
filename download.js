import fs from "fs"
import ytdl from "ytdl-core"

if (process.argv.length <= 3) {
    console.error('Please provide both a Youtube URL and filename as an argument!')
    console.error('USAGE: yarn download [youtube_url] [filename]')
    process.exit(1)
}

const url = process.argv[2]

const filename = process.argv[3]

if (!(url.startsWith('http') && (url.includes('youtube') || url.includes('youtu.be')))) {
    console.error('Please provide a valid Youtube URL as an argument!')
    process.exit(1)
}

try {
    ytdl(url)
        .pipe(fs.createWriteStream(`./public/videos/${filename}.mp4`));
} catch(error) {
    console.log("An error occurred.", error.message)
    process.exit(1)
}
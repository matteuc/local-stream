1. Place the video you want to stream inside this folder

2. After you run `yarn transcode {file_name}` (with `file_name` replaced with the video file name), several files will be created:
    - `_generated_.m3u8` = Specifies information about the stream and which chunk to load at certain timestamps
    - `_generated_*.ts` = The stream chunks created from the **ffmpeg** HLS transcoding
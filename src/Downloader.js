import YoutubeMp3Downloader from 'youtube-mp3-downloader';

export const YD = new YoutubeMp3Downloader({
  ffmpegPath: '/usr/bin/ffmpeg',
  outputPath: './../mp3',
  youtubeVideoQuality: 'highestaudio',
  queueParallelism: 2,
  progressTimeout: 2000,
  allowWebm: false,
});

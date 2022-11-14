import './iphone-inline-video';

window.addEventListener('DOMContentLoaded', () => {
  window.addEventListener('load', () => {
    const videos = document.querySelectorAll('video');
    videos.forEach((video) => window.enableInlineVideo(video));
  });
});

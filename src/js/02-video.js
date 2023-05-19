import Player from '@vimeo/player';
var throttle = require('lodash.throttle');

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const CURRENT_TIME = 'videoplayer-current-time';

const onPlay = function (event) {
  console.log(event.seconds);
  localStorage.setItem(CURRENT_TIME, event.seconds);
};

console.log(localStorage.getItem(CURRENT_TIME));

player.on('timeupdate', throttle(onPlay, 1000));
player.setCurrentTime(localStorage.getItem(CURRENT_TIME));

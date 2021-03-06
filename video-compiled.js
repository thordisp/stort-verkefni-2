'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/* eslint linebreak-style: ["error", "windows"] */
/* slint func-names: ["error", "never"] */

var MyndbandaSyning = function () {
  function MyndbandaSyning() {
    _classCallCheck(this, MyndbandaSyning);
  }

  _createClass(MyndbandaSyning, [{
    key: 'load',
    value: function load() {
      this.container = document.querySelector('main');
      // video id er substrengur get strengs fra 4. staf
      this.videoId = parseInt(window.location.search.substr(4), 10);
      this.video = null;
      this.videoElement = null;
      this.loadVideos();
    }
  }, {
    key: 'loadVideos',
    value: function loadVideos() {
      var request = new XMLHttpRequest();

      request.open('GET', './videos.json', true);
      request.onload = this.parseVideosJson.bind(this);

      request.onerror = function () {
        window.error('Óþekkt villa');
        results.appendChild(document.createTextNode('Óþekkt villa'));
      };

      request.send();
    }
  }, {
    key: 'muteVideo',
    value: function muteVideo() {
      this.videoElement.muted = true;
    }
  }, {
    key: 'unmuteVideo',
    value: function unmuteVideo() {
      this.videoElement.muted = false;
    }
  }, {
    key: 'playVideo',
    value: function playVideo() {
      this.videoElement.play();
      this.videoOverlay.className = 'video__overlay video__overlay__invisible ';
      this.objPlay.className = 'play__button invisible';
    }
  }, {
    key: 'pauseVideo',
    value: function pauseVideo() {
      this.videoElement.pause();
      this.videoOverlay.className = 'video__overlay';
      this.objPlay.className = 'play__button';
    }
  }, {
    key: 'fullscreenVideo',
    value: function fullscreenVideo() {
      if (this.videoElement.requestFullscreen) {
        this.videoElement.requestFullscreen();
      } else if (this.videoElement.mozRequestFullscreen) {
        this.videoElement.mozRequestFullscreen();
      } else if (this.videoElement.webkitRequestFullscreen) {
        this.videoElement.webkitRequestFullscreen();
      }
    }
  }, {
    key: 'nextVideo',
    value: function nextVideo() {
      this.videoElement.currentTime = this.videoElement.currentTime + 3;
    }
  }, {
    key: 'backVideo',
    value: function backVideo() {
      this.videoElement.currentTime = this.videoElement.currentTime - 3;
    }
  }, {
    key: 'createPlayer',
    value: function createPlayer() {
      if (this.video) {
        // Teikna upp video player med HTML sem er skilgreint nu thegar i videos.html
        this.videoContainer = document.createElement('div');
        this.videoTitle = document.createElement('h2');
        this.videoOverlay = document.createElement('div');
        this.videoPlayer = document.createElement('div');
        this.videoElement = document.createElement('video');

        this.videoContainer.className = 'video__container';
        this.videoTitle.className = 'video__title';
        this.videoElement.className = 'video';
        this.videoOverlay.className = 'video__overlay';
        this.videoPlayer.className = 'video__player';

        this.videoTitle.textContent = this.video.title;

        this.videoContainer.appendChild(this.videoTitle);
        this.videoOverlay.appendChild(this.videoElement);
        this.videoElement.src = this.video.video;
        this.videoPlayer.appendChild(this.videoOverlay);
        this.videoContainer.appendChild(this.videoPlayer);

        var objectDiv = document.createElement('div');
        var objBack = document.createElement('img');
        var objPause = document.createElement('img');
        this.objPlay = document.createElement('img');
        var objMute = document.createElement('img');
        var objUnmute = document.createElement('img');
        var objFullscreen = document.createElement('img');
        var objNext = document.createElement('img');

        objectDiv.className = 'valmynd';
        objBack.className = 'imgValmynd back__button';
        objPause.className = 'imgValmynd pause__button';
        this.objPlay.className = 'play__button';
        objMute.className = 'imgValmynd mute__button';
        objUnmute.className = 'imgValmynd unmute__button';
        objFullscreen.className = 'imgValmynd fullscreen__button';
        objNext.className = 'imgValmynd next__button';

        objBack.id = 'back__button';
        objPause.id = 'pause__button';
        this.objPlay.id = 'play__button';
        objMute.id = 'mute__button';
        objUnmute.id = 'unmute__button';
        objFullscreen.id = 'fullscreen__button';
        objNext.id = 'next__button';

        objBack.src = 'img/back.svg';
        objPause.src = 'img/pause.svg';
        this.objPlay.src = 'img/play.svg';
        objMute.src = 'img/unmute.svg';
        objUnmute.src = 'img/mute.svg';
        objFullscreen.src = 'img/fullscreen.svg';
        objNext.src = 'img/next.svg';

        objectDiv.appendChild(objBack);
        objectDiv.appendChild(objPause);
        this.videoOverlay.appendChild(this.objPlay);
        objectDiv.appendChild(objUnmute);
        objectDiv.appendChild(objMute);
        objectDiv.appendChild(objFullscreen);
        objectDiv.appendChild(objNext);

        this.container.appendChild(this.videoContainer);
        this.container.appendChild(objectDiv);
      } else {
        var errorContainer = document.createElement('div');
        var errorText = document.createElement('p');

        errorContainer.className = 'error';

        errorText.innerHTML = 'Myndband fannst ekki';

        errorContainer.appendChild(errorText);

        this.container.appendChild(errorContainer);
      }
      var tilbakaDiv = document.createElement('div');
      var linkur = document.createElement('a');

      tilbakaDiv.className = 'TilBaka';

      linkur.setAttribute('href', 'index.html');
      linkur.innerHTML = 'Til baka';
      tilbakaDiv.appendChild(linkur);

      this.container.appendChild(tilbakaDiv);

      this.videoOverlay.addEventListener('click', this.playVideo.bind(this));
      document.getElementById('pause__button').addEventListener('click', this.pauseVideo.bind(this));
      document.getElementById('mute__button').addEventListener('click', this.muteVideo.bind(this));
      document.getElementById('unmute__button').addEventListener('click', this.unmuteVideo.bind(this));
      document.getElementById('fullscreen__button').addEventListener('click', this.fullscreenVideo.bind(this));
      document.getElementById('next__button').addEventListener('click', this.nextVideo.bind(this));
      document.getElementById('back__button').addEventListener('click', this.backVideo.bind(this));
    }
  }, {
    key: 'parseVideosJson',
    value: function parseVideosJson(e) {
      var request = e.target;
      if (request.status >= 200 && request.status < 400) {
        var data = JSON.parse(request.response);
        this.playVideos = data.playVideos;

        // Geymum video i this.videos array
        for (var videoKey in data.videos) {
          if (data.videos[videoKey].id === this.videoId) {
            this.video = data.videos[videoKey];
          }
        }
      }
      this.createPlayer();
    }
  }]);

  return MyndbandaSyning;
}();

document.addEventListener('DOMContentLoaded', function () {
  var myndbond = new MyndbandaSyning();
  myndbond.load();
});

//# sourceMappingURL=video-compiled.js.map
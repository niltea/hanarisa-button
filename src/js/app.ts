declare function require(x: string): any;

const buzz = require('buzz');

class Sound {
  public voices;

  constructor() {
    // init vars
    // this.isPlay = false;
    this.voices = {};
    // this.sndVoice = null;

    // 音声周り
    // const isBuzzSupported = buzz.isSupported();
    // if (!isBuzzSupported) {
    //   throw 'buzz is not supported';
    // }

    const playButtons = Array.from(document.getElementsByClassName('button-play'));
    playButtons.forEach((button) => {
      if (button.classList.contains('disabled')) {
        return;
      }

      // buzzプラグインが使える場合
      const voiceID: string = button.getAttribute('data-voice');
      const voicePath: string = `./voice/${voiceID}`;

      // eslint-disable-next-line new-cap
      this.voices[voiceID] = new buzz.sound(voicePath, {
        formats: ['mp3'],
        preload: true,
      });
      button.addEventListener('click', (e) => {
        this.playAudio(voiceID);
      });
    });
    // buzzプラグインが使えない場合は終了
    // if (!isBuzzSupported) return;
  }

  playAudio(buttonID) {
    // 再生中の音を止める
    buzz.all().stop();
    this.voices[buttonID].play();
  }
}


document.addEventListener('DOMContentLoaded', () => {
  new Sound();
});

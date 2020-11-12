declare function require(x: string): any;

const buzz = require('buzz');
const singleClass = 'isSingle';
const playClass = 'isPlaying';

class Sound {
  public voices;

  constructor(playButtons) {
    const infoWrapper = document.getElementById('infoWrapper');
    const fixedLink = document.getElementById('fixedLink');
    // init vars
    // this.isPlay = false;
    this.voices = {};
    // this.sndVoice = null;

    // 音声周り
    // const isBuzzSupported = buzz.isSupported();
    // if (!isBuzzSupported) {
    //   throw 'buzz is not supported';
    // }

    const onPlayEnd =(hoge) => {
      document.body.classList.remove(playClass);
    };

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
      this.voices[voiceID].bind('ended', onPlayEnd);
      button.addEventListener('click', (e) => {
        const rect = button.getBoundingClientRect();
        infoWrapper.style.top = `${rect.top + window.scrollY - rect.height }px`;
        infoWrapper.style.left = `${rect.left}px`;
        fixedLink.setAttribute('href', `${location.href}#${button.getAttribute('data-voice')}`);
        document.body.classList.add(playClass);
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
  const playButtons = Array.from(document.getElementsByClassName('button-play'));
  const voiceList = [];
  playButtons.forEach((button) => {
    const voiceID = button.getAttribute('data-voice');
    button.setAttribute('id', voiceID);
    voiceList.push(voiceID);
  });
  new Sound(playButtons);

  const hash = location.hash;
  if (hash) {
    const theID: string = hash.slice(1);
    const voiceIndex: number = voiceList.indexOf(theID);
    if (voiceIndex !== -1) {
      // ボイスが見つかったときの動作
      document.body.classList.add(singleClass);
      const voiceButton = document.getElementById(theID);

      const copiedButton = voiceButton.cloneNode(true);

      const singleButtonWrapper = document.getElementById('singleButtonWrapper');
      singleButtonWrapper.appendChild(copiedButton);

      // buzzプラグインが使える場合
      const voicePath: string = `./voice/${theID}`;

      // eslint-disable-next-line new-cap
      const voice = new buzz.sound(voicePath, {
        formats: ['mp3'],
        preload: true,
      });
      copiedButton.addEventListener('click', (e) => {
        voice.play();
      });
    }
  }

});

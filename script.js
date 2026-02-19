const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name')
const song = document.getElementById('audio');
const cover = document.getElementById('cover')
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress')
const progressContainer = document.getElementById('progress-container')
const shuffleButton = document.getElementById('shuffle')


const Construção = {
    songName: 'Construção',
    artist: 'Chico Buarque',
    file: 'Construção'

};

const Evidências = {
    songName: 'Evidências',
    artist: 'Chitãozinho e Xororó',
    file: 'Evidências',

};

const Tempo_Perdido = {
    songName: 'Tempo Perdido',
    artist: 'Lergião Urbana',
    file: 'Tempo_Perdido'

};
let isShuffle = false;
let isPlaying = false;
const playlist = [Construção, Tempo_Perdido, Evidências]
let sortedPlaylist = [...playlist]
let index = 0;

function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}

function pauseSong() {
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    }

    else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `images/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName
    bandName.innerText = sortedPlaylist[index].artist
}

function privioussong() {
    index--;
    if (index < 0) {
        index = sortedPlaylist.length - 1;
    }
    initializeSong();
    playSong();
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();
}


function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();
}


function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);

}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preshuffledArray) {
    let size = preshuffledArray.length;
    let currentIndex = size - 1
    while(currentIndex > 0) {
     let randomIndex = Math.floor (Math.random()*size);
      let aux = preshuffledArray [currentIndex];
      preshuffledArray[currentIndex] = preshuffledArray[randomIndex]
      preshuffledArray[randomIndex] = aux;
      currentIndex -= 1;
    }
}

function shuffleButtonClicked() {
    if (isShuffle === false) {
        isShuffle = true;
        shuffleArray = (sortedPlaylist);
        shuffleButton.classList.add('button-active')
    }
    else {

    }
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked)
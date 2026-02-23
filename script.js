const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name')
const song = document.getElementById('audio');
const cover = document.getElementById('cover')
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const likeButton = document.getElementById ('like');
const currentProgress = document.getElementById('current-progress')
const progressContainer = document.getElementById('progress-container')
const shuffleButton = document.getElementById('shuffle')
const repeatButton = document.getElementById('repeat')
const songTime = document.getElementById ('song-time')
const totalTime = document.getElementById ('total-time')


const Construção = {
    songName: 'Construção',
    artist: 'Chico Buarque',
    file: 'Construção',
    liked: false,
};

const Evidências = {
    songName: 'Evidências',
    artist: 'Chitãozinho e Xororó',
    file: 'Evidências',
    liked: true,
};

const Tempo_Perdido = {
    songName: 'Tempo Perdido',
    artist: 'Legião Urbana',
    file: 'Tempo_Perdido',
    liked: false,
};

let isShuffle = false;
let isPlaying = false;
let repeatOn = false;
const originalPlaylist = [Construção, Tempo_Perdido, Evidências]
let sortedPlaylist = [...originalPlaylist]
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

function likeButtonRender () {
    if (sortedPlaylist[index].liked === false) {
        likeButton.querySelector('.bi').classList.remove('bi-heart');
        likeButton.querySelector('.bi').classList.add('bi-heart-fill');
        likeButton.classList.add('button-active-red');
    }   else  {
        likeButton.querySelector('.bi').classList.add('bi-heart');
        likeButton.querySelector('.bi').classList.remove('bi-heart-fill');
        likeButton.classList.remove('button-active-red');   
    }
}

function initializeSong() {
    cover.src = `images/${sortedPlaylist[index].file}.jpg`;
    song.src = `songs/${sortedPlaylist[index].file}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
   
}

function priviousSong() {
    index--;
    if (index < 0) {
        index = sortedPlaylist.length - 1;
    }
    initializeSong();
    playSong();
}

function previousSong() {
    if (isShuffle) {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * sortedPlaylist.length);
        } while (newIndex === index && sortedPlaylist.length > 1);
        index = newIndex;
    } else {
        if (index === 0) {
            index = sortedPlaylist.length - 1;
        } else {
            index -= 1;
        }
    }
    initializeSong();
    playSong();
}


function nextSong() {
    if (isShuffle) {
        // pick a random song different from current
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * sortedPlaylist.length);
        } while (newIndex === index && sortedPlaylist.length > 1);
        index = newIndex;
    } else {
        if (index === sortedPlaylist.length - 1) {
            index = 0;
        } else {
            index += 1;
        }
    }
    initializeSong();
    playSong();
}


function updateProgress() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
     songTime.innerText = toHHMMSS(song.currentTime);

}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size = -1;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random() * size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked() {
    if (isShuffle === false) {
        isShuffle = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
        
    }
}

function repeatButtonClicked() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active');
    } else {
        repeatOn = false;
        repeatButton.classList.remove('button-active');
    }
}


function nextOrRepeat () {

    if (repeatOn === false) {
        nextSong();
    } 
    else {
        playSong();
    }
}

function toHHMMSS (originalNumber) {
    let hours = Math.floor(originalNumber / 3600);
    let min = Math.floor((originalNumber - hours * 3600) / 60);
    let seconds = Math.floor(originalNumber - hours * 3600 - min * 60);

    return `${hours.toString().padStart(2, '0')}:${min
        .toString()
        .padStart(2, '0')

    }:${seconds
        .toString()
        .padStart(2, '0')}`
}

function updateCurrentTime () {
    songTime.innerText = toHHMMSS(song.currentTime);
}

function updateTotalTime () {
    toHHMMSS (song.duration);
    totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked () {
    if  (sortedPlaylist[index].liked === false) {
        sortedPlaylist[index].liked = true;
    }
    else { 
        sortedPlaylist[index].liked = false;
    }
    likeButtonRender();
}

initializeSong();

play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgress);
song.addEventListener('loadedmetadata', updateTotalTime);
song.addEventListener('ended', nextOrRepeat);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonClicked);
repeatButton.addEventListener('click', repeatButtonClicked);
likeButton.addEventListener('click', likeButtonClicked);
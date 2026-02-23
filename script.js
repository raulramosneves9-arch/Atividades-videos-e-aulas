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
const repeatButton = document.getElementById('repeat')
const songTime = document.getElementById ('song-time')
const totalTime = document.getElementById ('total-time')
const likeButton = document.getElementById ('like')

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
    artist: 'Lergião Urbana',
    file: 'Tempo_Perdido',
    liked: false,
};

let isShuffle = false;
let isPlaying = false;
const originalPlaylist = [Construção, Tempo_Perdido, Evidências]
let sortedPlaylist = [...originalPlaylist]
let index = 0;
song.loop = false;

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
    likeButtonRender();
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
    if (isShuffle) {
        // go to a random song when shuffling
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

function shuffleArray(preshuffledArray) {
    let currentIndex = preshuffledArray.length - 1;
    while (currentIndex > 0) {
        // pick a random index from 0 to currentIndex inclusive
        let randomIndex = Math.floor(Math.random() * (currentIndex + 1));
        let aux = preshuffledArray[currentIndex];
        preshuffledArray[currentIndex] = preshuffledArray[randomIndex];
        preshuffledArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonClicked() {
    if (!isShuffle) {
        isShuffle = true;
        shuffleArray(sortedPlaylist);
        // start from first song of shuffled list
        index = 0;
        initializeSong();
        shuffleButton.classList.add('button-active');
    } else {
        isShuffle = false;
        sortedPlaylist = [...originalPlaylist];
        // restore current song to same track in original order
        // find by file name to keep playback consistent
        const currentFile = song.src.split('/').pop().replace('.mp3', '');
        const originalIndex = originalPlaylist.findIndex(
            item => item.file === currentFile
        );
        index = originalIndex >= 0 ? originalIndex : 0;
        initializeSong();
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonClicked() {
    if (song.loop === false) {
        song.loop = true;
        repeatButton.classList.add('button-active');
    } else {
        song.loop = false;
        repeatButton.classList.remove('button-active');
    }
}


}

function nextOrRepeat () {
    // when the audio ends we either advance to the next track or
    // restart the current one depending on loop state
    if (song.loop === false) {
        nextSong();
    } else {
        // just replay same song
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
    if (sortedPlaylist[index].Liked === false) {
        sortedPlaylist[index].Liked = true;
    }
    else {        sortedPlaylist[index].Liked = false;
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
shuffleButton.addEventListener('click', shuffleButtonClicked)
repeatButton.addEventListener('click', repeatButtonClicked)
likeButton.addEventListener('click', likeButtonClicked)
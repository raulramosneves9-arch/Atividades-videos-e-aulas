const songName = document.getElementById ('song-name');

const song = document.getElementById ('audio');
const play = document.getElementById ('play');

songName.innerText = "Tempo Perdido";



function playSong () {
    play.querySelector('.bi').classList.toggle('bi-play-circle-fill');
    play.querySelector('.bi').classList.toggle('bi-pause-circle-fill');
    song.play();
}
 play.addEventListener('click', playSong);

 
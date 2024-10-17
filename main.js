import { musicList } from "./db/index.js"

const musicListElem = document.querySelector(".music-list");
const audio = document.querySelector("audio")
const playBtn = document.getElementById("play")
const pauseBtn = document.getElementById("pause")
const prevBtn = document.getElementById("prev")
const nextBtn = document.getElementById("next")
const musicImage = document.querySelector(".music-image")
const coverImage = document.querySelector(".cover")
const marquee = document.querySelector("marquee")
let index = 0;

musicList.forEach((music, index) => {
    let mn = Math.trunc(music.duration / 60);
    let sn = Math.trunc(music.duration - (mn * 60));

    musicListElem.innerHTML += `
     <div class="music">
                <img src="./assets/image/${music.imagePath}" alt="${music.musicName}">
                <div class="info">
                    <p>${music.artistName}</p>
                    <p>${music.musicName}</p>
                    <p class="time">${mn}:${sn > 10 ? sn : "0" + sn}</p>
                </div>
            </div>
    `
})

const allMusicELems = document.querySelectorAll(".music")
allMusicELems.forEach((div, i) => {
    div.addEventListener("click", () => {
        index = i
        audioPlay();
        allMusicELems.forEach(item => item.classList.remove("music-active"))
        div.classList.add("music-active")
    })
})


playBtn.addEventListener("click", () => {
    audioPlay()
})

pauseBtn.addEventListener("click", () => {
    audio.pause()
    coverImage.classList.add("animation-pause")
})

prevBtn.addEventListener("click", () => {
    index--;
    if (index === -1) {
        index = musicList.length - 1
    }
    audioPlay()
})
nextBtn.addEventListener("click", () => {
    index++;
    if (index === musicList.length) {
        index = 0
    }
    audioPlay()
})


function audioPlay() {
    audio.src = `./assets/audio/${musicList[index].musicPath}`;
    musicImage.src = `./assets/image/${musicList[index].imagePath}`
    marquee.innerText = musicList[index].musicName

    coverImage.classList.remove("animation-pause")
    audio.play()
}


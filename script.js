const playBtn = document.getElementById("play-btn");

const audioPlayer = document.getElementById("audio-player");
const progressBar = document.querySelector(".progress-bar");
const volumeBar = document.querySelector(".volume-bar");


const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");


let isPlaying = false;


const songs = [

    {
        name: "Blinding Lights",
        artist: "The Weeknd",
        file: "./assets/songs/song1.mp3",
        image: "./assets/images/song1.png"
    },

    {
        name: "Perfect",
        artist: "Ed Sheeran",
        file: "./assets/songs/song2.mp3",
        image: "./assets/images/song2.png"
    },

    {
        name: "Believer",
        artist: "Imagine Dragons",
        file: "./assets/songs/song3.mp3",
        image: "./assets/images/song3.png"
    },

    {
        name: "Shape of You",
        artist: "Ed Sheeran",
        file: "./assets/songs/song4.mp3",
        image: "./assets/images/song4.png"
    },

    {
        name: "Heat Waves",
        artist: "Glass Animals",
        file: "./assets/songs/song5.mp3",
        image: "./assets/images/song5.png"
    },

    {
        name: "Counting Stars",
        artist: "OneRepublic",
        file: "./assets/songs/song6.mp3",
        image: "./assets/images/song6.png"
    },

    {
        name: "Faded",
        artist: "Alan Walker",
        file: "./assets/songs/song7.mp3",
        image: "./assets/images/song7.png"
    },

    {
        name: "Someone You Loved",
        artist: "Lewis Capaldi",
        file: "./assets/songs/song8.mp3",
        image: "./assets/images/song8.png"
    },
    {
        name: "Lovely",
        artist: "Billie Eilish & Khalid",
        file: "./assets/songs/song9.mp3",
        image: "./assets/images/song9.png"
    }
];


const songName =
    document.getElementById("song-name");

const playerImage =
    document.getElementById("player-img");

let currentSong = 0;
loadSong(currentSong);
audioPlayer.src = songs[currentSong].file;

const songCards = document.querySelectorAll(".song-card");
songCards.forEach(function (card) {
    card.addEventListener("click", function () {
        songCards.forEach(function (song) {
            song.classList.remove("active-song");
        });

        card.classList.add("active-song");
        currentSong =
            Number(card.dataset.index);
        loadSong(currentSong);
        audioPlayer.play();
        playBtn.textContent = "⏸";
        isPlaying = true;

    });
});


const currentTimeDisplay = document.getElementById("current-time");
const totalTimeDisplay = document.getElementById("total-time");
function formatTime(seconds) {
    const minutes =
        Math.floor(seconds / 60);
    const secs =
        Math.floor(seconds % 60);
    return `${minutes}:${secs
        .toString()
        .padStart(2, "0")}`;
}


function playSong() {
    if (isPlaying == false) {
        audioPlayer.play();
        playBtn.textContent = "⏸";
        isPlaying = true;
    }
    else {
        audioPlayer.pause();
        playBtn.textContent = "▶";
        isPlaying = false
    }
}

playBtn.addEventListener(
    "click", playSong
);


audioPlayer.addEventListener("timeupdate", function () {
    if (audioPlayer.duration) {
        progressBar.value = (audioPlayer.currentTime / audioPlayer.duration) * 100;
        currentTimeDisplay.textContent =
            formatTime(audioPlayer.currentTime);

        totalTimeDisplay.textContent = formatTime(audioPlayer.duration);

    }
});


progressBar.addEventListener("input", function () {
    audioPlayer.currentTime =
        (progressBar.value / 100) * audioPlayer.duration;
});


volumeBar.value = 50;
audioPlayer.volume = 0.5;
volumeBar.addEventListener("input", function () {
    audioPlayer.volume =
        volumeBar.value / 100;
});

function loadSong(index) {
    audioPlayer.src = songs[index].file;
    songName.textContent = songs[index].name;
    playerImage.src = songs[index].image;
    audioPlayer.load();
    if (isPlaying) {
        audioPlayer.play();
    }
}

nextBtn.addEventListener("click", function () {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    loadSong(currentSong);
});

audioPlayer.addEventListener("loadedmetadata", function () {
    totalTimeDisplay.textContent =
        formatTime(audioPlayer.duration);
});

prevBtn.addEventListener("click", function () {
    currentSong--;
    if (currentSong < 0) {
        currentSong = songs.length - 1;
    }
    loadSong(currentSong);
});

audioPlayer.addEventListener("ended", function () {
    currentSong++;
    if (currentSong >= songs.length) {
        currentSong = 0;
    }
    loadSong(currentSong);
    audioPlayer.play();
});


const searchInput = document.getElementById("search-input");
searchInput.addEventListener("input", function () {
    const searchText =
        searchInput.value.toLowerCase();
    songCards.forEach(function (card, index) {
        const songTitle =
            songs[index].name.toLowerCase();
        if (songTitle.includes(searchText)) {
            card.style.display = "block";
        }
        else {
            card.style.display = "none";
        }
    });
});


const songDetails = document.querySelector(".song-details");
const fullscreenPlayer = document.getElementById("fullscreen-player");
const closePlayer = document.getElementById("close-player");

songDetails.addEventListener(
    "click",
    function () {
        fullscreenPlayer.style.display =
            "flex";
    }
);

closePlayer.addEventListener(
    "click",
    function () {
        fullscreenPlayer.style.display =
            "none";
    }
);

var shareBtn = document.querySelector("#shareBtn");
var timesBtn = document.querySelector("#times");
var modal = document.querySelector(".social-share-modal");

shareBtn.addEventListener("click", function (e) {
    modal.classList.toggle("hide");
});

timesBtn.addEventListener("click", function (e) {
    modal.classList.toggle("hide");
});

// Music player
const $ = document.querySelector.bind(document);
const $$ = document.querySelector.bind(document);
const nameSong = $(".control-player-infor .song");
const nameSinger = $(".control-player-infor .singer");
const cdThumb = $(".cd-thumb");
const audio = $("#audio");
const playBtn = $(".btn-toggle-play");
const middle = $(".middle");
const progress = $("#progress");
const volume = $("#volume-change");
const nextSong = $(".btn-next");
const prevSong = $(".btn-prev");
const randomBtn = $(".btn-random");
const repeatBtn = $(".btn-repeat");
const song = $(".song");
let isPlaying = false;
const app = {
    currentIndex: 0,
    isRandom: false,
    isRepeat: false,
    songs: [
        {
            name: "Above The Time",
            singer: "IU",
            path: "./assets/music/above-the-time-IU.mp3",
            image: "./assets/img/above-the-time.jpeg",
        },
        {
            name: "Don't côi",
            singer: "RPT Orijinn",
            path: "./assets/music/dont-coi.mp3",
            image: "./assets/img/dont-coi.jpg",
        },
        {
            name: "Nơi này có anh",
            singer: "Sơn Tùng MTP",
            path: "./assets/music/noi-nay-co-anh.mp3",
            image: "./assets/img/noi-nay-co-anh.jpg",
        },
        {
            name: "Thằng điên",
            singer: "JUSTATEE x PHƯƠNG LY",
            path: "./assets/music/thang-dien.mp3",
            image: "./assets/img/thang-dien.jpg",
        },
        {
            name: "Xích thêm chút - XTC",
            singer: "RPT Groovie ft TLinh x RPT MCK",
            path: "./assets/music/XTC.mp3",
            image: "./assets/img/XTC.jpg",
        },
        {
            name: "THICHTHICH",
            singer: "Phương Ly",
            path: "./assets/music/Thichthich.mp3",
            image: "./assets/img/thichthich.jpg",
        },
        {
            name: "Phải chăng em đã yêu",
            singer: "Juky San",
            path: "./assets/music/Phai-Chang-Em-Da-Yeu-Juky-San-RedT.mp3",
            image: "./assets/img/Phaichangemdayeu.jpg",
        },
    ],

    render: function () {
        const htmls = this.songs.map((song) => {
            return `
                <div class="item-table">
                        <img
                            src="${song.image}"
                            alt=""
                            class="song-img"
                        />
                        <div class="infor">
                            <div class="name">
                                <span class="song-name">${song.name}</span>
                                <span class="singer-name">${song.singer}</span>
                            </div>
                            <div class="heart">
                                <img
                                    src="./assets/img/favorite.svg"
                                    alt=""
                                    class="heart-icon"
                                />
                                <span>900</span>
                            </div>
                        </div>
                    </div>
                </div>

                `;
        });
        $(".song").innerHTML = htmls.join("");
    },

    defineProperties: function () {
        Object.defineProperty(this, "currentSong", {
            get: function () {
                return this.songs[this.currentIndex];
            },
        });
    },

    handleEvents: function () {
        //Xử lý khi click play
        playBtn.onclick = function () {
            if (app.isPlaying) {
                audio.pause();
            } else {
                audio.play();
            }

            // Khi song play
            audio.onplay = function () {
                app.isPlaying = true;
                middle.classList.add("playing");
                cdThumbAnimate.play();
            };

            // Khi song pause
            audio.onpause = function () {
                app.isPlaying = false;
                middle.classList.remove("playing");
                cdThumbAnimate.pause();
            };
        };

        // Khi tiến độ bài hát thay đổi
        audio.ontimeupdate = function () {
            if (audio.duration) {
                const progressPercent = Math.floor(
                    (audio.currentTime / audio.duration) * 100
                );
                progress.value = progressPercent;
                if (progressPercent === 100) {
                    app.nextSong();
                    audio.onplay();
                }
            }
        };
        // Xử lí khi tua song
        progress.onchange = function (e) {
            const seekTime = (audio.duration / 100) * e.target.value;
            audio.currentTime = seekTime;
        };

        // Xử lý volume
        volume.onchange = function (e) {
            audio.volume = e.target.value / 100;
        };

        //Xử lý quay / dừng cd
        const cdThumbAnimate = cdThumb.animate(
            [
                {
                    transform: "rotate(360deg)",
                },
            ],
            {
                duration: 10000,
                iterations: Infinity,
            }
        );
        cdThumbAnimate.pause();

        // // Xử lý chọn nhạc
        // const selectSong = $(".item-table");
        // selectSong.onclick = function (e) {
        //     app.currentIndex = app.songs.map();
        // };

        // Xử lý next, prev
        nextSong.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong();
            } else {
                app.nextSong();
            }
            // Khi song play
            audio.onplay = function () {
                app.isPlaying = true;
                middle.classList.add("playing");
                cdThumbAnimate.play();
            };
        };

        prevSong.onclick = function () {
            if (app.isRandom) {
                app.playRandomSong();
            } else {
                app.prevSong();
            }
            audio.onplay = function () {
                app.isPlaying = true;
                middle.classList.add("playing");
                cdThumbAnimate.play();
            };
        };

        // Xử lý random
        randomBtn.onclick = function () {
            app.isRandom = !app.isRandom;
            randomBtn.classList.toggle("active", app.isRandom);
        };

        repeatBtn.onclick = function () {
            app.isRepeat = !app.isRepeat;
            repeatBtn.classList.toggle("active", app.isRepeat);
        };

        // // Lắng nghe click vào playlist
        // song.onclick = function() {
        //     if(e.target.closest('.song')) {

        //     }
        // }
    },

    loadCurrentSong: function () {
        nameSong.textContent = this.currentSong.name;
        nameSinger.textContent = this.currentSong.singer;
        cdThumb.style.backgroundImage = `url("${this.currentSong.image}")`;
        audio.src = this.currentSong.path;
    },

    nextSong: function () {
        if (app.currentIndex < app.songs.length - 1) {
            app.currentIndex++;
            app.loadCurrentSong();
            audio.play();
        } else {
            app.currentIndex = 0;
            app.loadCurrentSong();
            audio.play();
        }
    },

    prevSong: function () {
        if (app.currentIndex <= 0) {
            app.currentIndex = app.songs.length - 1;
            app.loadCurrentSong();
            audio.play();
        } else {
            app.currentIndex--;

            app.loadCurrentSong();
            audio.play();
        }
    },

    playRandomSong: function () {
        let newIndex;
        do {
            newIndex = Math.floor(Math.random() * this.songs.length);
        } while (newIndex === this.currentIndex);
        this.currentIndex = newIndex;
        this.loadCurrentSong();
        audio.play();
    },

    start: function () {
        // Định nghĩa các thuộc tính cho objet
        this.defineProperties();

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong();

        // Render playlist
        this.render();

        // Lắng nghe/ Xử lý các sự kiện (DOM Events)
        this.handleEvents();
    },
};

app.start();

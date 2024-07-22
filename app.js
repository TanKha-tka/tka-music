/**
 * 1. Render songs
 * 2. Scroll top
 * 3. play / pause / seak
 * 4. CD rotate
 * 5. Next / prev
 * 6. Random
 * 7. Next / Repeat when ended
 * 8. Active song
 * 9. Scroll active song into view
 * 10. Play song when click
 */
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const PLAYER_STORAGE_KEY = 'TKA_PLAYER'

const heading = $('header h2')
const cdThumb = $('.cd-thumb')
const audio = $('#audio')
const cd = $('.cd')
const player = $('.player')
const playBtn = $('.btn-toggle-play')
const progress = $('#progress')
const nextBtn = $('.btn-next')
const prevBtn = $('.btn-prev')
const randomBtn = $('.btn-random')
const repeatBtn = $('.btn-repeat')
const playlist = $('.playlist')

const app = {
    currentIndex: 0,
    isPlaying: false,
    isRandom: false,
    isRepeat: false,
    config: JSON.parse(localStorage.getItem(PLAYER_STORAGE_KEY)) || {},

    songs : [
        {
            name: 'Malibu',
            singer: '16 Typh, $ativa',
            path: './assets/music/y2mate.com - Malibu feat ativa.mp3',
            image: './assets/image/Malibu_image.jpg'
        },
        {
            name: '2 5',
            singer: 'Táo',
            path: './assets/music/y2mate.com - Single 2 5  Táo.mp3',
            image: './assets/image/2-5_image.jpg'
        },
        {
            name: 'Quen Di Em La Ai',
            singer: 'Puppy, BONN!EX',
            path: './assets/music/y2mate.com - Quen Di Em La Ai.mp3',
            image: './assets/image/Quendiemlaai_image.jpg'
        },
        {
            name: 'Cỏ may',
            singer: 'Hào',
            path: './assets/music/y2mate.com - Hào  Cỏ may Official Music Video.mp3',
            image: './assets/image/comay_image.jpg'
        },
        {
            name: 'Không Điều Kiện',
            singer: 'Cá Hồi Hoang',
            path: './assets/music/y2mate.com - Cá Hồi Hoang  Không Điều Kiện.mp3',
            image: './assets/image/Khongdieukien_image.jpg'
        },
        {
            name: 'Anh Cũng Đâu Có Muốn Tin',
            singer: 'Dab, Helinn',
            path: './assets/music/y2mate.com - Dab  Anh Cũng Đâu Có Muốn Tin feat Helinnofficial.mp3',
            image: './assets/image/Anhcungdaucomuontin_image.jpg'
        },
        {
            name: 'Qua Ngày Mai',
            singer: 'Tiên Tiên',
            path: './assets/music/y2mate.com - QUA NGÀY MAI.mp3',
            image: './assets/image/Quangaymai_image.jpg'
        },
        {
            name: 'Có khóc cũng thế thôi',
            singer: 'Hào',
            path: './assets/music/y2mate.com - Hào  Có khóc cũng thế thôi Official Visualizer.mp3',
            image: './assets/image/comay_image.jpg'
        },
        {
            name: 'If you said so',
            singer: 'Coldzy, Wxrdie, 2pillz',
            path: './assets/music/y2mate.com - Coldzy  If You Said So ft Wxrdie 2pillz Official Music Video.mp3',
            image: './assets/image/Ifyousaidso_image.jpg'
        },
        {
            name: 'Tương 3+1',
            singer: 'W/N, titie, Nau',
            path: './assets/music/y2mate.com - Tương 31  Titie OFFICIAL MV ft Wn Nau.mp3',
            image: './assets/image/Tuong3+1_image.jpg'
        },
        {
            name: 'Vùng kí ức',
            singer: 'Chillies',
            path: './assets/music/y2mate.com - Vùng Ký Ức  Chillies Official Music Video.mp3',
            image: './assets/image/Vungkiuc_image.jpg'
        },
        {
            name: 'Slowly',
            singer: 'Thịnh suy',
            path: './assets/music/y2mate.com - Thịnh Suy  Slowly MV.mp3',
            image: './assets/image/slowly_image.jpg'
        },
        {
            name: 'Chết trong em',
            singer: 'Thịnh suy',
            path: './assets/music/y2mate.com - Chết Trong Em.mp3',
            image: './assets/image/slowly_image.jpg'
        },
        {
            name: 'ANHS EMS',
            singer: 'QNT x RZMAS x WXDIE Prod by RASTZ',
            path: './assets/music/y2mate.com - ChillnFree  Anhs  Ems  QNT x RZMAS x WXRDIE Prod by RASTZ.mp3',
            image: './assets/image/anhsems_image.jpg'
        },
        {
            name: 'Stream đến bao giờ',
            singer: 'Độ Mixi ft BẠN SÁNG TÁC',
            path: './assets/music/y2mate.com - STREAM ĐẾN BAO GIỜ  ĐỘ MIXI ft BẠN SÁNG TÁC  OFFICIAL MUSIC VIDEO.mp3',
            image: './assets/image/image-15.jpg'
        },
        {
            name: 'Đơn phương tiền truyện',
            singer: 'JUAN PHI xx Chuột Sấm Sét',
            path: './assets/music/y2mate.com - JUAN PHI xx CHUỘT SẤM SÉT ĐƠN PHƯƠNG TIỀN TRUYỆN Prod KET Official Music Video.mp3',
            image: './assets/image/image-16.jpg'
        },
        {
            name: 'Mascara',
            singer: 'Chillies x BLAZE',
            path: './assets/music/y2mate.com - Mascara  Chillies x BLAZE  OFFICIAL MUSIC VIDEO.mp3',
            image: './assets/image/Vungkiuc_image.jpg'
        },
        {
            name: 'QUERRY',
            singer: 'QNT x TRUNG TRẦN ft RPT MCK Prod By RASTZ',
            path: './assets/music/y2mate.com - QUERRY  QNT x TRUNG TRẦN ft RPT MCK Prod By RASTZ  OFFICIAL MV.mp3',
            image: './assets/image/querry_image.jpg'
        },
        {
            name: 'LAVIAI',
            singer: 'WXRDIE  LAVIAI REMIX ft HIEUTHUHAI  2PILLZ',
            path: './assets/music/y2mate.com - WXRDIE  LAVIAI REMIX ft HIEUTHUHAI  2PILLZ.mp3',
            image: './assets/image/laviai_image.jpg'
        },
        {
            name: 'Sài Gòn Hôm Nay Mưa',
            singer: 'JSOL, Hoàng Duyên',
            path: './assets/music/music-17.mp3',
            image: './assets/image/image-17.jpg'
        },
        {
            name: 'Mai Về',
            singer: 'Dfoxie37, Myhai',
            path: './assets/music/music-18.mp3',
            image: './assets/image/image-18.jpg'
        },
        {
            name: 'Ai Rồi Cũng Bỏ Đi',
            singer: 'PC',
            path: './assets/music/music19.mp3',
            image: './assets/image/image-19.jpg'
        },
        {
            name: 'PHONG',
            singer: 'VSTRA, TGSN, Tyronee',
            path: './assets/music/music20.mp3',
            image: './assets/image/image-20.jpg'
        },
        {
            name: 'Exit Sign',
            singer: 'HIEUTHUHAI, marzuz',
            path: './assets/music/music-21.mp3',
            image: './assets/image/image-21.jpg'
        },
    ],
    setConfig: function(key, value) {
        this.config[key] = value;
        localStorage.setItem(PLAYER_STORAGE_KEY, JSON.stringify(this.config))
    },
    render: function() {
        htmls = this.songs.map((song, index) => {
            return `
            <div class="song ${index === this.currentIndex ? 'active' : ''}" data-index="${index}">
                <div class="thumb" style="background-image: url('${song.image}')"></div>

                <div class="body">
                    <h3 class="title">${song.name}</h3>
                    <p class="author">${song.singer}</p>
                </div>
                <div class="option">
                    <i class="fas fa-ellipsis-h"></i>
                </div>
            </div>`
        })
        playlist.innerHTML = htmls.join('')
    },
    defineProperties: function() {
        Object.defineProperty(this, 'currentSong', {
            get: function() {
                return this.songs[this.currentIndex]
            }
        })
    },
    handleEvents: function() {
        const _this = this
        const cdWidth = cd.offsetWidth

        // Xử lí CD quay / dừng
        const cdThumbAnimate = cdThumb.animate([
            { transform: 'rotate(360deg)' }
        ], {
            duration: 10000, // 10 seconds
            iterations: Infinity
        })
        cdThumbAnimate.pause()

        // Xử lí phóng to hoặc thu nhỏ CD
        document.onscroll = function(){
            const scrollTop = window.scrollY || document.documentElement.scrollTop;
            const newCdWidth = cdWidth - scrollTop

            cd.style.width = newCdWidth > 0 ? newCdWidth + 'px' : 0
            cd.style.opacity = newCdWidth / cdWidth

        }

        // Xử lí khi click play
        playBtn.onclick = function() {
            if (_this.isPlaying) {
                audio.pause()
            } else {
                audio.play()
            }
        }

        // Khi song được play
        audio.onplay = function() {
            _this.isPlaying = true
            player.classList.add('playing')
            cdThumbAnimate.play()
        }

        // Khi song bị pause
        audio.onpause = function() {
            _this.isPlaying = false
            player.classList.remove('playing')
            cdThumbAnimate.pause()
        }

        // Khi tiến độ bài hất thay dổi
        audio.ontimeupdate = function() {
            if (audio.duration) {
                const progressPercent = Math.floor(audio.currentTime / audio.duration * 100)
                progress.value = progressPercent
            } 
        }

        // Xử lí khi tua xong
        progress.oninput = function(e) {
            const seekTime = audio.duration / 100 * e.target.value
            audio.currentTime = seekTime
        }

        // Khi next song
        nextBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.nextSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Khi prev song
        prevBtn.onclick = function() {
            if (_this.isRandom) {
                _this.playRandomSong()
            } else {
                _this.prevSong()
            }
            audio.play()
            _this.render()
            _this.scrollToActiveSong()
        }

        // Xử lí bật / tắt random song
        randomBtn.onclick = function() {
            _this.isRandom = !_this.isRandom
            _this.setConfig('isRandom', _this.isRandom)
            randomBtn.classList.toggle('active', _this.isRandom)
        }

        // Xử lí lặp lại song
        repeatBtn.onclick = function() {
            _this.isRepeat = !_this.isRepeat
            _this.setConfig('isRepeat', _this.isRepeat)
            repeatBtn.classList.toggle('active', _this.isRepeat)
        }

        // Xử lí next song khi audio ended
        audio.onended = function() {
            if (_this.isRepeat) {
                audio.play()
            } else {
                nextBtn.click()
            }
        }

        // Lắng nghe hành vi click vào playlist
        playlist.onclick = function(e) {
            const songNode = e.target.closest('.song:not(.active)')

            if (songNode || e.target.closest('.option')) {
                // Xử lí khi click song
                if (songNode) {
                    _this.currentIndex = Number(songNode.dataset.index)
                    _this.loadCurrentSong()
                    _this.render()
                    audio.play()
                }

                // Xử lí khi click vào song option
                if (e.target.closest('.option')) {

                }
            }
        }
    },
    loadCurrentSong: function() {
        heading.textContent = this.currentSong.name
        cdThumb.style.backgroundImage = `url('${this.currentSong.image}')`
        audio.src = this.currentSong.path
    },
    loadConfig: function() {
        this.isRandom = this.config.isRandom
        this.isRepeat = this.config.isRepeat

        // Object.assign(this, this.config) // can use but not rely on
    },
    nextSong: function() {
        this.currentIndex++
        if (this.currentIndex >= this.songs.length) {
            this.currentIndex = 0
        }
        this.loadCurrentSong()
    },
    activeSong: function() {
        $('.song.active').classList.remove('acitve')
        const playListNow = $$('.song')
        playListNow[this.currentIndex].classList.add('active')
    },
    scrollToActiveSong: function() {
        setTimeout(() => {
            $('.song.active').scrollIntoView({
                behavior: 'smooth',
                block: 'nearest',
            })
        }, 300)
    },
    prevSong: function() {
        this.currentIndex--
        if (this.currentIndex < 0) {
            this.currentIndex = this.songs.length - 1
        }
        this.loadCurrentSong()
    },
    playRandomSong: function() {
        let newIndex 
        do {
            newIndex = Math.floor(Math.random() * this.songs.length)
        } while (newIndex === this.currentIndex) 
            this.currentIndex = newIndex
            this.loadCurrentSong()
    },
    handleSongWhenClick: function() {
        songs = $$('.song')
        songs.forEach((song, index) => {
            song.onclick = function(e) {
                const isOption = !e.target.closest('.option')

                if (isOption) {

                } else {
                    _this.currentIndex = index
                    _this.loadCurrentSong()
                    _this.activeSong()
                    audio.play()
                }
            }
        });

        removeSong()        
    },
    removeSong: function() {
        const removeOptions = $$('.option__item--remove')
        removeOptions.forEach((option, index) => {
            option.onclick = function(e) {
                if (_this.isRandom) {
                    const newIndex = _this.songs.indexOf(_this.playRandomSong[index])
                    _this.songs.splice(newIndex, 1)
                    _this.playRandomSong.splice(index, 1)

                    if (index < _this.currentIndex === _this.playRandomSong.length) {
                        _this.currentIndex = 0
                    }
                } else {
                    _this.songs.splice(index, 1)

                    if (index < _this.currentIndex) {
                        _this.currentIndex--
                    } else if (_this.currentIndex === _this.songs.length) {
                        _this.currentIndex = 0
                    }
                }

                if (e.target.closest('.song.active')) {
                    _this.loadCurrentSong()
                    audio.play()
                    _this.scrollToActiveSong()
                }

                _this.render()
                handleSongWhenClick()
            
            }
        })
    },
    start: function() {
        // Gán cấu hình từ config vào ứng dụng
        this.loadConfig()

        // Định nghĩa các thuộc tính cho Object
        this.defineProperties()

        // Lắng nghe và xử lí các sự kiện (DOM events)
        this.handleEvents()

        // Tải thông tin bài hát đầu tiên vào UI khi chạy ứng dụng
        this.loadCurrentSong()

        // Render playlist
        this.render()

        // Hiển thị trạng thái ban đầu của repeat and random
        randomBtn.classList.toggle('active', this.isRandom)
        repeatBtn.classList.toggle('active', this.isRepeat)
    }
}

app.start();
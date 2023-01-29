var startBtn = document.querySelector('#start')
var restartBtn = document.querySelector('#restart')
var muteBtn = document.querySelector('#mute')
var minutes = 24
var seconds = 60
var clock = document.querySelector('#clock')
const clockSong = new Audio('assets/audio/clockSong.wav')
clockSong.loop = true


// Variables to store play/pause icons
var playIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="-2 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>'
var pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>'
var clockIconPlay = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M6 7l8-5v20l-8-5v-10zm-6 10h4v-10h-4v10zm20.264-13.264l-1.497 1.497c1.847 1.783 2.983 4.157 2.983 6.767 0 2.61-1.135 4.984-2.983 6.766l1.498 1.498c2.305-2.153 3.735-5.055 3.735-8.264s-1.43-6.11-3.736-8.264zm-.489 8.264c0-2.084-.915-3.967-2.384-5.391l-1.503 1.503c1.011 1.049 1.637 2.401 1.637 3.888 0 1.488-.623 2.841-1.634 3.891l1.503 1.503c1.468-1.424 2.381-3.309 2.381-5.394z"/></svg>'
var clockIconPause = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="5 1 24 24"><path d="M19 7.358v15.642l-8-5v-.785l8-9.857zm3-6.094l-1.548-1.264-3.446 4.247-6.006 3.753v3.646l-2 2.464v-6.11h-4v10h.843l-3.843 4.736 1.548 1.264 18.452-22.736z"/></svg>'


// flag to track setInterval call
var played = false

// flags to track rest and break status
var restStatus = false
var breakStatus = false

// Event listeners for buttons
start.addEventListener('click', startTimer)
restartBtn.addEventListener('click', restart)
muteBtn.addEventListener('click', playPause)

var clockSongStatus = false
function playPause(){
    if(clockSongStatus == true){
        muteBtn.innerHTML = clockIconPause
        clockSong.pause()
        clockSongStatus = false
    } else {
        muteBtn.innerHTML = clockIconPlay
        clockSong.play()
        clockSongStatus = true
    }
}

function startTimer(){
    playPause()
    if(played == false){
        counting = setInterval(pomodoro, 1000)
        played = true
        startBtn.innerHTML = pauseIcon
    } else {
        startBtn.innerHTML = playIcon
        stop()
        played = false
    }
}

function restart(){
    stop()
    minutes = 24
    seconds = 60
    startBtn.innerHTML = playIcon
    clock.innerHTML = `25 : 00`
}

function pomodoro(){
    if(seconds == 0){
        minutes--
        if(minutes == -1){
            if(breakStatus == true){
                minutes = 25
                stop()
                startBtn.innerHTML = playIcon
                played = false
                breakStatus = false
            } else {
                stop()
                startBreak()
            }
        } else {
            if(restStatus == true){
                seconds = 59
            } else {
                seconds = 60
            }
        }
    } else {
        seconds--
    }
    clock.innerHTML = `${formatTime(minutes)} : ${formatTime(seconds)}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : `${time}`;
}

function startBreak(){
    startBtn.innerHTML = playIcon
    minutes = 5
    restStatus = true
    played = false
    breakStatus = true
}

function stop(){
    clockSong.pause()
    muteBtn.innerHTML = clockIconPause
    clockSongStatus = false
    clearInterval(counting)
}
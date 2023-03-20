var startBtn = document.querySelector('#start')
var restartBtn = document.querySelector('#restart')
var muteBtn = document.querySelector('#mute')
var minutes = 24
var seconds = 60
var clock = document.querySelector('#clock')
const clockSong = new Audio('assets/audio/clockSong.wav')
clockSong.loop = true



// flag to track setInterval call
var played = false

// flags to track rest and break status
var restStatus = false
var breakStatus = false

// Event listeners for buttons
startBtn.addEventListener('click', startTimer)

var clockSongStatus = false
function playPause(){
    console.log('PLAYED')
    startBtn.innerTEXT = 'pause'
    if(clockSongStatus == true){
        clockSong.pause()
        clockSongStatus = false
    } else {
        clockSong.play()
        clockSongStatus = true
    }
}

function startTimer(){
    playPause()
    if(played == false){
        counting = setInterval(pomodoro, 1000)
        played = true
    } else {
        // startBtn.innerTEXT = 'play'
        stop()
        played = false
    }
}

function restart(){
    stop()
    minutes = 24
    seconds = 60
    // startBtn.innerTEXT = 'play'
    clock.innerHTML = `25 : 00`
}

function pomodoro(){
    if(seconds == 0){
        minutes--
        if(minutes == -1){
            if(breakStatus == true){
                minutes = 25
                stop()
                startBtn.innerTEXT = 'here'
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
    // startBtn.innerHTML = playIcon
    minutes = 5
    restStatus = true
    played = false
    breakStatus = true
}

function stop(){
    clockSong.pause()
    clockSongStatus = false
    clearInterval(counting)
}
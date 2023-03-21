const body = document.querySelector('body')
const startBtn = document.querySelector('#start')
const restartBtn = document.querySelector('#restart')
const muteBtn = document.querySelector('#mute')
var clock = document.querySelector('#clock')
const clockSong = new Audio('assets/audio/clockSong.wav')
clockSong.loop = true

var minutes = 24
var seconds = 60
var shortBreakTime = 0
var longBreakTime = 0

const applyBtn = document.querySelector('#apply')

// font value
let value = document.querySelector('#roboto-button').value
const kumbhFont = document.querySelector('#kumbh-button')
const robotoFont = document.querySelector('#roboto-button')
const spaceFont = document.querySelector('#space-button')
kumbhFont.addEventListener('click', () => {
    value = kumbhFont.value
})
robotoFont.addEventListener('click', () => {
    value = robotoFont.value
})
spaceFont.addEventListener('click', () => {
    value = spaceFont.value
})

//color value
let colorValue = 'orange'
const color1 = document.querySelector('#orange-theme')
const color2 = document.querySelector('#blue-theme')
const color3 = document.querySelector('#purple-theme')
color1.addEventListener('click', () => {
    colorValue = color1.value
})
color2.addEventListener('click', () => {
    colorValue = color2.value
})
color3.addEventListener('click', () => {
    colorValue = color3.value
})
const items = document.querySelectorAll('.theme')
const buttons = document.querySelectorAll('.theme-focus')

// apply settings
applyBtn.addEventListener('click', () => {
    // apply the times
    minutes = Number(document.querySelector('#pomodoro').value) - 1
    shortBreakTime = Number(document.querySelector('#short-break').value)
    longBreakTime = Number(document.querySelector('#long-break').value)
    clock.innerText = `${minutes+1}:00`
    // apply the font
    body.classList.remove(kumbhFont.value)
    body.classList.remove(robotoFont.value)
    body.classList.remove(spaceFont.value)
    body.classList.add(value)
    //apply the color
    items.forEach((item) => {
        item.classList.add(colorValue)
    })
    buttons.forEach((button) => {
        button.classList.add(`${colorValue}-focus`)
    })
    document.querySelector('.settings').classList.add('close')
})



// flag to track setInterval call
var played = false

// flags to track rest and break status
var restStatus = false
var breakStatus = false
var breakCounter = 0
var longBreakStatus = false
// Event listeners for buttons
startBtn.addEventListener('click', startTimer)

var clockSongStatus = false
function playPause(){
    if(clockSongStatus == true){
        clockSong.pause()
        clockSongStatus = false
    } else {
        clockSong.play()
        clockSongStatus = true
    }
}

function startTimer(){
    startBtn.innerHTML = '<p>pause</p>'
    if(played == false){
        counting = setInterval(pomodoro, 1000)
        played = true
    } else {
        startBtn.innerHTML = '<p>play</p>'
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
                if(breakCounter == 2){
                    startLongBreak()
                }
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
    startBtn.innerHTML = '<p>play</p>'
    minutes = shortBreakTime
    restStatus = true
    played = false
    breakStatus = true
    breakCounter += 1
}

function startLongBreak(){
    startBtn.innerHTML = '<p>play</p>'
    minutes = longBreakTime
    restStatus = true
    played = false
    breakStatus = true
    longBreakStatus = true
}

function stop(){
    clockSong.pause()
    clockSongStatus = false
    clearInterval(counting)
}
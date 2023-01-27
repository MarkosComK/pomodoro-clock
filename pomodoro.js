var startBtn = document.querySelector('#start')
var minutes = 1
var seconds = 2
var clock = document.querySelector('#clock')

//alows setInterval to get just one call
var played = false 
// 
var breakStatus = false

start.addEventListener('click', startTimer)

function startTimer(){
    if(played == false){
        counting = setInterval(pomodoro, 1000)
        played = true
        startBtn.innerHTML = `stop`
    } else {
        startBtn.innerHTML = `start`
        stop()
        played = false
    }
}

function pomodoro(){
    if(seconds == 0){
        minutes--
        if(minutes == -1){
            if(breakStatus == true){
                minutes = 24
                stop()
                startBtn.innerHTML = `start`
                played = false
            } else {
                stop()
                startBreak()
            }
        } else {
            seconds = 6
        }
    } else {
        seconds--
    }
    clock.innerHTML = `${minutes} : ${seconds}`
}

function startBreak(){
    startBtn.innerHTML = `break`
    minutes = 2
    played = false
    breakStatus = true
}

function stop(){
    clearInterval(counting)
}
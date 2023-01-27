var startBtn = document.querySelector('#start')
var minutes = 1
var seconds = 2
var clock = document.querySelector('#clock')

//alows setInterval to get just one call
var played = false 
// 

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
        if(minutes == 0){
            stop()
        } else {
            seconds = 60
        }
    } else {
        seconds--
    }
    clock.innerHTML = `${minutes} : ${seconds}`
}

function startBreak(){
    minutes = 4
    startTimer()
}

function stop(){
    clearInterval(counting)
}
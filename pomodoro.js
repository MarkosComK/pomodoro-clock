var startBtn = document.querySelector('#start')
var minutes = 24
var seconds = 60
var clock = document.querySelector('#clock')


var playIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>'
var pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>'
//alows setInterval to get just one call
var played = false 
// 
var breakStatus = false

start.addEventListener('click', startTimer)

function startTimer(){
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

function pomodoro(){
    if(seconds == 0){
        minutes--
        if(minutes == -1){
            if(breakStatus == true){
                minutes = 24
                stop()
                startBtn.innerHTML = playIcon
                played = false
            } else {
                stop()
                startBreak()
            }
        } else {
            seconds = 60
        }
    } else {
        seconds--
    }
    clock.innerHTML = `${minutes} : ${seconds}`
}

function startBreak(){
    startBtn.innerHTML = `break`
    minutes = 5
    played = false
    breakStatus = true
}

function stop(){
    clearInterval(counting)
}
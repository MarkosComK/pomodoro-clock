var startBtn = document.querySelector('#start')
var minutes = 1
var seconds = 10
var clock = document.querySelector('#clock')

start.addEventListener('click', startTimer)

function startTimer(){
    counting = setInterval(pomodoro, 1000)
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

function stop(){
    clearInterval(counting)
}
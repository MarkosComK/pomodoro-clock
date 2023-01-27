var startBtn = document.querySelector('#start')
var time = 5
var clock = document.querySelector('#clock')

start.addEventListener('click', startTimer)

function startTimer(){
    counting = setInterval(pomodoro, 1000)
}

function pomodoro(){
    if(time == 0){
        stop()
    } else {
        time--
    }
    clock.innerHTML = `${time}`
}

function stop(){
    clearInterval(counting)
}
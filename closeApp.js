var closeBtn = document.querySelector('#close')
var windowApp = document.querySelector('#window')
var pomoBar = document.querySelector('#pomodoroBar')


closeBtn.addEventListener('click', turnOff)

function turnOff(){
    windowApp.style.display = 'none'
    pomoBar.style.display = 'none'
}
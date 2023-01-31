var app = document.querySelector('#window')
var topBar = document.querySelector('#top')

var divWidth = 150
var divHeight = 10
var isDragging = false

topBar.addEventListener('mousedown', dragOn)
topBar.addEventListener('mouseup', dragOff)
topBar.addEventListener('mousemove', move)

function dragOn(){
    isDragging = true
}

function dragOff(){
    isDragging = false
}

function move(e){
    if(isDragging){
        app.style.left = `${e.clientX - divWidth}px`
        app.style.top = `${e.clientY - divHeight}px`
    }
}

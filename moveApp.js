var app = document.querySelector('#window')
var topBar = document.querySelector('#top')

var appX = 0 
var appY = 0
var mouseStartX
var mouseStartY
var mouseEndX
var mouseEndY

var isDragging = false

topBar.addEventListener('mousedown', dragOn)
topBar.addEventListener('mouseup', dragOff)
topBar.addEventListener('mousemove', move)


function dragOn(e){
    mouseStartX = e.clientX
    mouseStartY = e.clientY
    isDragging = true
}

function dragOff(e){
    mouseEndX = e.clientX
    mouseEndY = e.clientY
    appX += mouseEndX - mouseStartX
    appY += mouseEndY - mouseStartY
    isDragging = false
}

function move(e){
    if(isDragging){
        app.style.left = `${e.clientX - (mouseStartX - appX)}px`
        app.style.top = `${e.clientY - (mouseStartY - appY)}px`
    }
}



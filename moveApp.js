var app = document.querySelector('#window')
var topBar = document.querySelector('#top')
// these variables saves the position of the app in X/Y
var appX = 0 
var appY = 0

// Saves the position of mouse Start and end in X/Y
var mouseStartX
var mouseStartY
var mouseEndX
var mouseEndY

var isDragging = false

topBar.addEventListener('mousedown', dragStart)
topBar.addEventListener('mouseup', dragEnd)
// topBar.addEventListener('mouseout', dragOut)
topBar.addEventListener('mousemove', move)


function dragStart(e){
    mouseStartX = e.clientX
    mouseStartY = e.clientY
    isDragging = true
}

function dragEnd(e){
    mouseEndX = e.clientX
    mouseEndY = e.clientY
    appX += mouseEndX - mouseStartX
    appY += mouseEndY - mouseStartY
    isDragging = false
}

// function dragOut(){
//     isDragging = false
// }

function move(e){
    if(isDragging){
        app.style.left = `${e.clientX - (mouseStartX - appX)}px`
        app.style.top = `${e.clientY - (mouseStartY - appY)}px`
    }
}



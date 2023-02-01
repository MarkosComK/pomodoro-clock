var taskClock = document.querySelector('#taskBarClock')
var taskClockIcon = `<img id="taskBarClockIcon" src="assets/icons/taskBarClock.png" alt="">`

var date = new Date()
taskClock.innerHTML = `${taskClockIcon} ${date.getHours()}:${date.getMinutes()}`
setInterval(getTime, 10000)

function getTime(){
    date = new Date()
    taskClock.innerHTML = `${date.getHours()}:${date.getMinutes()}`
}



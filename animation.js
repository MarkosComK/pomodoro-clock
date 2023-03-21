import { minutes, seconds, colorValue } from "./pomodoro.js";

const cover = document.querySelector('.cover')
const left = document.querySelector('.orange-countdown')
const right = document.querySelector('.orange-right')

var min = undefined
var sec = undefined
var setTime =  undefined
var starTime = undefined
var futureTime = undefined

const startB = document.querySelector('#start')
var timerLoop
var played = false

startB.addEventListener('click', () => {
    timerLoop = setInterval(countDownTimer);
    // input
    
    min = minutes * 60000;
    sec = seconds * 1000;
    setTime =  min + sec;
    starTime = Date.now();
    futureTime = starTime + setTime;
    played = !played
})

function countDownTimer() {
    if(played){
        const currentTime = Date.now();
        const remainingTime = futureTime - currentTime;
        const angle = (remainingTime / setTime) * 360;
        // progress indicator
        if(angle> 180) {
            cover.style.display = 'none';
            left.style.transform = `rotate(${angle}deg)`;
        } else {
            cover.style.display = 'block';
            right.style.backgroundColor = `transparent`
            left.style.transform = `rotate(${angle}deg)`;
        }
        if(remainingTime < 0){
            clearInterval(timerLoop)
            played = !played
            cover.style.display = 'none';
            if(colorValue == 'orange'){
                right.style.backgroundColor = '#F87070'
            } 
            if(colorValue == 'blue'){
                right.style.backgroundColor = '#70F3F8'
            }
            if(colorValue == 'purple'){
                right.style.backgroundColor = '#D881F8'
            }
            
            left.style.transform = `none`;
        }
    }
}

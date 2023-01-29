// <!-- There are several ways to optimize the code you provided:

// You can use the let keyword instead of var when declaring variables. This will make the variables only accessible within the block they are defined in, which can help prevent accidental re-declarations or name collisions.

// You can use the const keyword instead of var when declaring variables that do not change throughout the code. This will help avoid accidental re-assignments, which can lead to unexpected behavior.

// You can move the SVG icons to a separate variables at the top of the script, rather than having them as string literals in the code. This will make it easier to change the icons, and also make the code more readable

// You can use template literals to make the clock.innerHTML, this way it's cleaner and more readable

// You can use a function to start the timer, and call it on the click event listener, this way, you don't need the played variable

// You can use a function to define the clock, and call it every time you want to update it, this way, you don't need to repeat the clock.innerHTML

// You can use a more descriptive variable name for the "counting" variable, such as "timer", this will make the code more readable

// You can use functions to handle each one of the pomodoro, break and stop status, this way, it's more readable and maintainable

// Please let me know if you want a sample of the optimized code. -->

var startBtn = document.querySelector('#start');
var clock = document.querySelector('#clock');

var playIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="-2 0 24 24"><path d="M3 22v-20l18 10-18 10z"/></svg>';
var pauseIcon = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M11 22h-4v-20h4v20zm6-20h-4v20h4v-20z"/></svg>';

var breakStatus = false;
var counting;

startBtn.addEventListener('click', startTimer);

function startTimer(){
    if(counting) {
        clearInterval(counting);
        counting = null;
        startBtn.innerHTML = playIcon;
    } else {
        var minutes = 24;
        var seconds = 60;
        counting = setInterval(function(){
            if(seconds === 0){
                minutes--;
                if(minutes === -1){
                    if(breakStatus){
                        minutes = 24;
                        clearInterval(counting);
                        counting = null;
                        startBtn.innerHTML = playIcon;
                    } else {
                        clearInterval(counting);
                        counting = null;
                        startBreak();
                    }
                } else {
                    seconds = 60;
                }
            } else {
                seconds--;
            }
            clock.innerHTML = `${minutes} : ${seconds}`;
        }, 1000);
        startBtn.innerHTML = pauseIcon;
    }
}

function startBreak(){
    startBtn.innerHTML = `break`;
    var minutes = 5;
    var seconds = 60;
    breakStatus = true;
    counting = setInterval(function(){
        if(seconds === 0){
            minutes--;
            if(minutes === -1){
                clearInterval(counting);
                counting = null;
                startBtn.innerHTML = playIcon;
            } else {
                seconds = 60;
            }
        } else {
            seconds--;
        }
        clock.innerHTML = `${minutes} : ${seconds}`;
    }, 1000);
}

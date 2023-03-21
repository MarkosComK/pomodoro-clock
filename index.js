const settings = document.querySelector('.settings')
const closeSettings = document.querySelector('#close-settings')
const openSettings = document.querySelector('#open-settings')

window.addEventListener('load', () => {
    settings.classList.add('close')
    document.querySelector('.cover').style.backgroundColor = '#F87070'
    document.querySelector('.orange-countdown').style.backgroundColor = '#F87070'
    document.querySelector('.orange-right').style.backgroundColor = '#F87070'

})

closeSettings.addEventListener('click', () => {
    settings.classList.add('close')
})

openSettings.addEventListener('click', () => {
    settings.classList.remove('close')
})
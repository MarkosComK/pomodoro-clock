const settings = document.querySelector('.settings')
const closeSettings = document.querySelector('#close-settings')
const openSettings = document.querySelector('#open-settings')

closeSettings.addEventListener('click', () => {
    settings.classList.add('close')
})

openSettings.addEventListener('click', () => {
    settings.classList.remove('close')
})
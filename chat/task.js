function getTime() {
    const currentTime = new Date();
    const hours = currentTime.getHours().toString().padStart(2, '0')
    const minutes = currentTime.getMinutes().toString().padStart(2, '0')
    return `${hours}:${minutes}`
}

function getAnswer() {
    const answers = [
        "Мы ещё не проснулись. Позвоните через 10 лет",
        "Добрый день! И до свидания!",
        "Ждите ответа",
        "Где ваша совесть?",
        "Кто тут?",
        "Мы ничего вам не будем продавать!",
        "К сожалению все операторы сейчас заняты. не пишите нам больше",
        "Вы не купили у нас ни одного товара, чтобы так с нами разговаривать!",
    ]
    const randomIndex = Math.floor(Math.random() * answers.length)
    return answers[randomIndex]
}

function getMessage(message, text, client) {
    const className = client ? 'message message_client' : 'message'
    return `
        <div class="${className}">
            <div class="message__time">${getTime()}</div>
            <div class="message__text">${text}</div>
        </div>`
}

function scrollToBottom() {
    const messagesContainer = document.getElementById('chat-widget__messages');
    let lastMessage = messagesContainer.lastElementChild;
    lastMessage.scrollIntoView();
}

const clearTimers = () => {
    clearTimeout(timerActivity)
    clearTimeout(timerMessage)
}

function timeOut() {
    clearTimers()
    const duration = 10000
    const timeStart = Date.now()

    timerActivity = setTimeout( () => {
        chatWidget.classList.remove('chat-widget_active')
        chatWidget.querySelector('.chat-widget__side-text').value = ''
    }, duration)

    setInterval(() => {
        const timeLeft = Math.ceil((duration -  (Date.now() - timeStart)) / 1000)
        if(timeLeft > 0  && timerActivity) {
            // console.log(`Осталось ${timeLeft} секунд до срабатывания таймера ${timerActivity}`)
        }
    }, 1000)
    return timerActivity
}

const chatWidget = document.querySelector('.chat-widget')
const messages = document.querySelector('.chat-widget__messages' )
let timerActivity = null
let timerMessage = null


document.addEventListener("click", (event) => {
    const target = event.target

    if(chatWidget.querySelector('.chat-widget__side-text') === target) {

        chatWidget.classList.add('chat-widget_active')
        messages.innerHTML = getMessage(messages, 'Добрый день', false)
        timeOut()

    } else if (!chatWidget.querySelector('.chat-widget__area').contains(target)) {

        chatWidget.classList.remove('chat-widget_active')
        chatWidget.querySelector('.chat-widget__side-text').value = ''

    } else {
        const messageClient = document.getElementById('chat-widget__input')

        messageClient.addEventListener("keyup", (event) => {
            if (event.key === 'Enter' && messageClient.value.trim()) {
                messages.innerHTML += getMessage(messages, messageClient.value, true)
                messageClient.value = ''
                messages.innerHTML += getMessage(messages, getAnswer(), false)
                scrollToBottom()

                clearTimers()
                timerMessage = setTimeout( () => {
                    messages.innerHTML += getMessage(messages, getAnswer(), false)
                    scrollToBottom()

                    timeOut()
                }, 5000)
            }
        })

    }
    timeOut()
})
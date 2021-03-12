const homeDivs = document.getElementsByName('question')


homeDivs.forEach(question => question.addEventListener('click', event => {
    if (event.target.id) {


        window.location.href = `/questions/${event.target.id}`
    }
}))

const homeDivTitle = document.getElementsByName("question-container")
homeDivTitle.forEach(questionz => questionz.addEventListener('click', event => {
    if (event.target.id) {

        window.location.href = `/questions/${event.target.id}`
    }
}))
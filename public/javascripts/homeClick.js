window.addEventListener('DOMContentLoaded', event => {
    const homeDivs = document.getElementsByName('question')


    homeDivs.forEach(question => question.addEventListener('click', event => {
      
        window.location.href = `/questions/${event.target.id}`
    }))

    const homeDivTitle = document.getElementsByName("question-container")
    
    homeDivTitle.forEach(questionz => questionz.addEventListener('click', event => {
        window.location.href = `/questions/${event.target.id}`
    }))
})
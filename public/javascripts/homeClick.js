window.addEventListener('DOMContentLoaded', event => {
    const homeDivs = document.getElementsByName('question')


    homeDivs.forEach(question => question.addEventListener('click', event => {
        console.log(event.target.id)
        window.location.href = `/questions/${event.target.id}`
    }))


})
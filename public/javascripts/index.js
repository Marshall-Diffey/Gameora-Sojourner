const deleteButtons = document.querySelectorAll('.delete-button');
const questionId = document.getElementsByName('questionId');
const questionsDiv = document.getElementById('questionDiv');

deleteButtons.forEach((button) => button.addEventListener('click', async (event) => {


    const questionId = event.target.value

    const result = await fetch(`/questions/${questionId}`, {
        method: 'DELETE'

    })
    comment.innerHTML = `You have deleted your question, redirecting to homepage...`
    setTimeout(() => {
        window.location.href = '/'
    }, 3000)
}))


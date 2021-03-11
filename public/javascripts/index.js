const question = require("../../db/models/question");


const deleteQuestionsButtons = document.querySelectorAll('.delete-button');
const addCommentsButtons = document.querySelectorAll('.addCommentButton')
const comment = document.getElementById('comment-div');
const commentBody = document.getElementById('newComment');
deleteQuestionsButtons.forEach((button) => button.addEventListener('click', async (event) => {


    const questionId = event.target.value

    const result = await fetch(`/questions/${questionId}`, {
        method: 'DELETE'

    })
    comment.innerHTML = `You have deleted your question, redirecting to homepage...`
    setTimeout(() => {
        window.location.href='/'
    }, 3000)
}))

// addCommentsButtons.forEach((button) => button.addEventListener('click', async (event) => {
//     const questionId = event.target.id;
//     const result = await fetch(`/comments`, {
//         method: 'POST',
//         body: {
//             commentBody: commentBody.value,
//             questionId: questionId,
//         }
//     })
    // comment.innerHTML = `You have deleted your question, redirecting to homepage...`
    // setTimeout(() => {
    //     window.location.href='/'
    // }, 3000)
// }))

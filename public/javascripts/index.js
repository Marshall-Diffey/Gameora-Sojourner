

// let commentDeleteButtons = document.querySelectorAll('.commentDeleteButton');
const deleteButtons = document.querySelectorAll('.delete-button');
// const comment = document.getElementById('comment-div');

// const addCommentButton = document.querySelector('.addCommentButton');
// const newComment = document.getElementById('newComment');
const questionId = document.getElementsByName('questionId');
// const commentDivs = document.getElementsByName('comments');
const questionsDiv = document.getElementById('questionDiv');
//delete every comment breaks whole page
// if (commentDeleteButtons.length) {

//     deleteListener()
// }

// addCommentButton.addEventListener('click', async (event) => {
//     event.preventDefault();


//     const body = {
//         newComment: newComment.value,
//         questionId: questionId[0].value
//     };

//     const result = await fetch(`/comments`, {
//         method: 'POST',
//         body: JSON.stringify(body),
//         headers: {
//             'Content-Type': 'application/json'
//         }

//     })
//     newComment.value = ''
//     const res = await result.json();
//     const newCommentDiv = document.createElement('div');
//     newCommentDiv.setAttribute('name', 'comments');
//     newCommentDiv.setAttribute('id', 'comment');
//     newCommentDiv.innerText = res.comment.body;
//     questionDiv.appendChild(newCommentDiv);
//     const deleteButton = document.createElement('button');
//     deleteButton.setAttribute('class', 'commentDeleteButton');
//     deleteButton.value = res.comment.id;
//     deleteButton.innerText = 'Delete Comment';
//     newCommentDiv.appendChild(deleteButton);
//     // commentDeleteButtons = document.querySelectorAll('.commentDeleteButton');
//     // if (commentDeleteButtons.length) {

//     //     deleteListener()
//     // }
//     newCommentDeleteButton(deleteButton)


// })
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

// const deleteListener = () => {
// commentDeleteButtons.forEach((button) => button.addEventListener('click', async (event) => {
//     const commentId = event.target.value

//     event.target.parentElement.remove()
//     const result = await fetch(`/comments/${commentId}`, {
//         method: 'DELETE'
//     })



// }))
// //}
// //deleteListener()
// const newCommentDeleteButton = (newButton) => {
//     newButton.addEventListener('click', async (event) => {
//         const commentId = event.target.value

//         event.target.parentElement.remove()
//         const result = await fetch(`/comments/${commentId}`, {
//             method: 'DELETE'
//         })
//     })
// }
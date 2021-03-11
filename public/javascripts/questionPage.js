let commentDeleteButtons = document.querySelectorAll('.commentDeleteButton');
const deleteButtons = document.querySelectorAll('.delete-button');
const comment = document.getElementById('comment-div');

const addCommentButton = document.querySelector('.addCommentButton');
const newComment = document.getElementById('newComment');
const questionId = document.getElementsByName('questionId');
const commentDivs = document.getElementsByName('comments');
const questionsDiv = document.getElementById('questionDiv');
const editQuestionButton = document.querySelector('.edit-question');
const bodyDiv = document.getElementById('body-div')


addCommentButton.addEventListener('click', async (event) => {
    event.preventDefault();


    const body = {
        newComment: newComment.value,
        questionId: questionId[0].value
    };

    const result = await fetch(`/comments`, {
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-Type': 'application/json'
        }

    })
    newComment.value = ''
    const res = await result.json();
    const newCommentDiv = document.createElement('div');
    newCommentDiv.setAttribute('name', 'comments');
    newCommentDiv.setAttribute('id', 'comment');
    newCommentDiv.innerText = res.comment.body;
    questionDiv.appendChild(newCommentDiv);
    const deleteButton = document.createElement('button');
    deleteButton.setAttribute('class', 'commentDeleteButton');
    deleteButton.value = res.comment.id;
    deleteButton.innerText = 'Delete Comment';
    newCommentDiv.appendChild(deleteButton);
    newCommentDeleteButton(deleteButton)


})
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

commentDeleteButtons.forEach((button) => button.addEventListener('click', async (event) => {
    const commentId = event.target.value

    event.target.parentElement.remove()
    const result = await fetch(`/comments/${commentId}`, {
        method: 'DELETE'
    })



}))

const newCommentDeleteButton = (newButton) => {
    newButton.addEventListener('click', async (event) => {
        const commentId = event.target.value

        event.target.parentElement.remove()
        const result = await fetch(`/comments/${commentId}`, {
            method: 'DELETE'
        })
    })
}

editQuestionButton.addEventListener('click', async (event) => {
    const result = await fetch(`/questions/edit/${event.target.value}`)

    const res = await result.json();
    console.log(res)
    bodyDiv.innerHTML = ''
    const header = document.createElement('h3')
    header.setAttribute('class', 'edit-header')
    header.innerText = 'EDIT YOUR QUESTION BELOW'
    bodyDiv.appendChild(header)
    const newTitle = document.createElement('input')
    newTitle.setAttribute('class', 'new-title')
    newTitle.value = res.title;
    header.appendChild(newTitle)
    const editedQuestion = document.createElement('textarea')
    editedQuestion.setAttribute('class', 'edit-question-body')
    editedQuestion.value = res.body
    header.appendChild(editedQuestion)
    const confirmEditButton = document.createElement('button')
    confirmEditButton.setAttribute('class', 'confirm-edit')
    confirmEditButton.innerText = 'Confirm Your Edit'
    header.appendChild(confirmEditButton)
    confirmEditButton.value = event.target.value
    confirmEditButton.addEventListener('click', async (event) => {
        console.log('working')
        const finalTitle = newTitle.value
        const finalQuestion = editedQuestion.value
        const questionId = event.target.value
        const body = {
            finalTitle,
            finalQuestion,
            questionId
        }
        console.log('here')


        const updateQuestion = await fetch(`/questions/${questionId}/edit`, {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }

        })
        console.log('fetch')


        window.location.href = `/questions/${questionId}`

    })

})

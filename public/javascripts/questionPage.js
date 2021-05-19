
const owned = document.getElementById('owned')

//if the user owns the question then owned.value equals a string of true, and vise versa
console.log(owned.value)
let questionDeleteButton;
let editQuestionButton;


if (owned.value === 'true') {
    questionDeleteButton = document.querySelector('.delete-button');
    editQuestionButton = document.querySelector('.edit-question');

}
let commentDeleteButtons = document.querySelectorAll('.commentDeleteButton');
const comment = document.getElementById('comment-div');
let lastComment;
const getAllComments = () => {

    let allComments = document.getElementsByName('comments')
    if (allComments.length === 0) {
        lastComment = document.getElementById('commentLabel')
    } else {
        lastComment = allComments[allComments.length - 1]
    }
    console.log(lastComment)
}
getAllComments();

const questionId = document.getElementsByName('questionId');
const questionsDiv = document.getElementById('questionDiv');
const newComment = document.getElementById('newComment');
const commentDivs = document.getElementsByName('comments');
const addCommentButton = document.querySelector('.addCommentButton');
const bodyDiv = document.getElementById('body-div')




addCommentButton.addEventListener('click', async (event) => {
    event.preventDefault();
    // let parentOfClick;
    // console.log('event target', event.target.parentElement)
    // if (event.target.parentElement) {

    //     parentOfClick = event.target.parentElement
    // } else {
    //     parentOfClick = event.target
    // }
    // console.log(parentOfClick)
    const body = {
        newComment: newComment.value,
        questionId: questionId[0].value
    };

    const auth = await fetch('/comments/auth');
    const authRes = await auth.json();
    console.log(authRes);

    if (authRes.authorized) {
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
        newCommentDiv.classList.add('single-question-container')
        newCommentDiv.innerText = res.comment.body;
        getAllComments();
        lastComment.parentNode.insertBefore(newCommentDiv, lastComment.nextSibling);
        let editCommentButton = document.createElement('button')
        editCommentButton.setAttribute('class', 'commentEditButton');
        editCommentButton.value = res.comment.id;
        editCommentButton.innerText = 'Edit Comment';
        newCommentDiv.appendChild(editCommentButton);
        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('class', 'commentDeleteButton');
        deleteButton.value = res.comment.id;
        deleteButton.innerText = 'Delete Comment';
        newCommentDiv.appendChild(deleteButton);
        newCommentDeleteButton(deleteButton);
        editCommentListener(editCommentButton)
    } else {
        alert('You must be logged in to access certain functionalities, or you can test user capabalities with the demo user button');
        window.location.href = '/users/login';
    }
})
if (owned.value === 'true') {


    questionDeleteButton.addEventListener('click', async (event) => {

        const questionId = event.target.value

        const result = await fetch(`/questions/${questionId}`, {
            method: 'DELETE'
        })

        comment.innerHTML = `You have deleted your question, redirecting to homepage...`
        setTimeout(() => {
            window.location.href = '/'
        }, 2000)
    })
}
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

if (owned.value === 'true') {


    editQuestionButton.addEventListener('click', async (event) => {
        const result = await fetch(`/questions/edit/${event.target.value}`)

        const res = await result.json();
        console.log(res)
        bodyDiv.innerHTML = ''
        const newDiv = document.createElement('div')
        newDiv.classList.add('questionForm')
        newDiv.classList.add('question-label')
        newDiv.innerText = 'Edit Your Question:'
        bodyDiv.appendChild(newDiv)
        const newTitle = document.createElement('input')
        newTitle.setAttribute('class', 'new-title')
        newTitle.value = res.title;
        newDiv.appendChild(newTitle)
        const editedQuestion = document.createElement('textarea')
        editedQuestion.setAttribute('class', 'edit-question-body')
        editedQuestion.value = res.body
        newDiv.appendChild(editedQuestion)
        const confirmEditButton = document.createElement('button')
        confirmEditButton.setAttribute('class', 'confirm-edit')
        confirmEditButton.innerText = 'Confirm Your Edit'
        newDiv.appendChild(confirmEditButton)
        confirmEditButton.value = event.target.value
        confirmEditButton.addEventListener('click', async (event) => {
            const finalTitle = newTitle.value
            const finalQuestion = editedQuestion.value
            const questionId = event.target.value
            const body = {
                finalTitle,
                finalQuestion,
                questionId
            }

            const updateQuestion = await fetch(`/questions/${questionId}/edit`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }

            })

            window.location.reload()

        })

    })
}
const editCommentListener = (editCommentButton) => {
    editCommentButton.addEventListener('click', async (event) => {
        const commentId = event.target.value;
        const result = await fetch(`/comments/edit/${commentId}`)

        const res = await result.json();
        console.log(res)
        bodyDiv.innerHTML = ''
        const newDiv = document.createElement('div')
        newDiv.classList.add('questionForm')
        newDiv.classList.add('question-label')
        newDiv.innerText = 'Edit Your Comment:'
        bodyDiv.appendChild(newDiv)
        const editedComment = document.createElement('textarea')
        editedComment.setAttribute('class', 'edit-comment')
        editedComment.value = res.body
        newDiv.appendChild(editedComment)
        const confirmEditButton = document.createElement('button')
        confirmEditButton.setAttribute('class', 'confirm-edit')
        confirmEditButton.innerText = 'Confirm Your Edit'
        newDiv.appendChild(confirmEditButton)
        confirmEditButton.value = commentId
        confirmEditButton.addEventListener('click', async (event) => {
            const finalComment = editedComment.value
            const commentId = event.target.value
            const body = {
                finalComment,
                commentId
            }

            const updateComment = await fetch(`/comments/edit/${commentId}`, {
                method: 'POST',
                body: JSON.stringify(body),
                headers: {
                    'Content-Type': 'application/json'
                }

            })

            window.location.reload()

        })
    })


}
let commentEditButtons = document.querySelectorAll('.commentEditButton')

if (commentEditButtons.length > 0) {

    commentEditButtons.forEach(button => {
        editCommentListener(button)
    })
}

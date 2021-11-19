const deleteButtons = document.querySelectorAll('.delete-button');
const questionId = document.getElementsByName('questionId');
const questionsDiv = document.getElementById('questionDiv');
// const singleQuestionContainer = document.getElementsByClassName('single-question-container');
// const searchInput = document.getElementById('search');

// searchInput.addEventListener('keyup', async (event) => {
//     console.log(event.target.value);
// })
// singleQuestionContainer.onmouseover = function() {
//     const questionLabel = singleQuestionContainer.children[0];
//     questionLabel.style.color = 'rgb(96, 96, 96)';
// }

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

const fps = document.getElementById("fps");
const ping = document.getElementById("ping")
function getRandomArbitrary(min, max) {
  let myNum = Math.random() * (max - min) + min;
  return Math.floor(myNum)
}
const num = setInterval(() => fps.innerHTML = 'fps: ' + getRandomArbitrary(57, 61), 200)
// fps.innerHTML = getRandomArbitrary(50, 60)
const pings = setInterval(() => ping.innerHTML = 'ping: ' + getRandomArbitrary(10, 40) + ' ms', 900)

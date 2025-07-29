const chatsList = document.querySelector('.chatsList');
const chatName = document.getElementById('chatName');
chatsList.querySelectorAll('button').forEach(button=>{
  button.addEventListener('click',()=>{
    chatName.textContent = button.querySelector('span').textContent;
  })
})
const btnSendMessage = document.getElementById('btnSendMessage'),
  btnAddAttachment = document.getElementById('btnAddAttachment'),
  msgInput = document.getElementById('msgInput'),
  btnTheme = document.getElementById("btnTheme"),
  btnLogin = document.getElementById("loginBtn");

function toggleTheme() {
  const doc = document.documentElement;
  doc.getAttribute('data-theme')==='dark' ? doc.setAttribute('data-theme','light') : doc.setAttribute('data-theme','dark')
}
function login(e){
  const loginForm = document.getElementById('loginForm');
  e.preventDefault();
  const user = document.getElementById('inputUser').value;
  const pass = document.getElementById('inputPass').value;
  if(!isCredentialsValid(user,pass)){loginForm.className='invalidCredentials'}
}
function isCredentialsValid(user,pass){
  //send to BE
  return user==='user'&&pass==='pass'
}

function toggleAttachmentMenu(){
  console.log('menu');
}

function sendMessage(){
  if(isEmpty()) return
  createMessage(msgInput.value,1)
  clearInput(msgInput)
  scrollToBottom();
}

function isEmpty(input=msgInput){
  return !input.value.trim();
}

function clearInput(input){
  input.value = ''
  input.style.height = 'auto'
  input.focus()
}

function clearChatHistory(){
  const chat = document.getElementById('chatHistory');
  while (chat.firstChild) {
    chat.removeChild(chat.firstChild);
  }
}

function resizeInput(input=msgInput) {
  requestAnimationFrame(() => {
    input.style.height = 'auto'; // Reset height to auto to shrink if needed
    input.style.height = `${input.scrollHeight}px`;
  });
}

const xat = 1
selectChat(xat)
function selectChat(chatId){
  fetch('/api/chats')
    .then(res=>{
      if(!res.ok) throw new Error('Erro no carregamento do banco JSON');
      return res.json();
    })
    .then(data=>{
      const chat=data.chats.find(c=>c.id===chatId)
      if(!chat) return
      data.chats.forEach(chat=>{
        chat.messages.forEach(msg=>{
          createMessage(msg.text,msg.from,msg.time)
        })
      })
    })
    .catch(err => console.error(err));
}

function createMessage(text, from, isotime=null){
  const chat = document.getElementById('chatHistory'),
    message = document.createElement('div'),
    span = document.createElement('span'),
    hour = document.createElement('sub')
  if(isotime === null){
    const d = new Date()
    hour.textContent = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    createMessageJSON(text)
  }
  else{hour.textContent = getHourMinute(isotime)}
  span.innerHTML=text
  message.appendChild(span)
  message.appendChild(hour)
  if(from === 1) message.className='historyMessage msgSender'
  else{message.className='historyMessage msgRecipient'}
  chat.appendChild(message)
}

function getHourMinute(isotime){
  return isotime.slice(11, 16)
}

function createMessageJSON(text,time){
  fetch('/message', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chatId: 1,
      text: text,
      from: 1,
      time: time
    })
  })
  .then(res => res.json())
  .then(data => {
    console.log(data);
  });
}

function scrollToBottom() {
  const chat = document.getElementById('chatHistory');
  chat.scrollTop = chat.scrollHeight;
}
btnTheme.addEventListener('click',toggleTheme)
btnLogin.addEventListener('click',login)
btnAddAttachment.addEventListener('click',()=>toggleAttachmentMenu())
btnSendMessage.addEventListener('click',()=>sendMessage())
msgInput.addEventListener('keydown', function (e) {
  resizeInput();
  if (e.key === 'Escape'){
    clearInput(msgInput);
  } 
  else if (e.key === 'Enter' && e.shiftKey) {
    e.preventDefault();
    msgInput.value += '\n';
    resizeInput();
  }
  else  if (e.key === 'Enter') {
    e.preventDefault();
     !isEmpty() && sendMessage()
  }
}); 

//TESTING:
const chatsList = document.querySelector('.chatsList');
const chatName = document.getElementById('chatName');
chatsList.querySelectorAll('button').forEach(button=>{
  button.addEventListener('click',()=>{
    chatName.textContent = button.querySelector('span').textContent;
  })
})

const colorPicker = document.getElementById('bgcolor');
colorPicker.addEventListener('input', e => {
  document.body.style.backgroundColor = e.target.value;
});

const quickActionList = document.querySelectorAll('.messageQuickAction');
quickActionList.forEach(quickActionBtn=>{
  quickActionBtn.addEventListener('click',()=>{
    console.log('quick action btn clicked');
    
  })
})
function copyMessage(){
    navigator.clipboard.writeText("teste copia")
    console.log('copiado!');
}
function removeMessage(e){
  e.parentElement.remove();
}

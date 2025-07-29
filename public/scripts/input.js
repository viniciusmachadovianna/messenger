const btnSendMessage = document.getElementById('btnSendMessage')
const msgInput = document.getElementById('msgInput')

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

function resizeInput(input=msgInput) {
  requestAnimationFrame(() => {
    input.style.height = 'auto'; // Reset height to auto to shrink if needed
    input.style.height = `${input.scrollHeight}px`;
  });
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

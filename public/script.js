const btnSendMessage = document.getElementById('btnSendMessage'),
  btnAddAttachment = document.getElementById('btnAddAttachment'),
  msgInput = document.getElementById('msgInput')
function toggleAttachmentMenu(){
  console.log('menu');
}

function sendMessage(){
  if(isEmpty()) return
  createMessage(msgInput.value,1)
  clearInput(msgInput)
}

function isEmpty(input=msgInput){
  return !input.value.trim();
}

function clearInput(input){
  input.value = ''
  input.style.height = 'auto'
  input.focus()
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
  const chat = document.getElementById('chat'),
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

btnAddAttachment.addEventListener('click',()=>toggleAttachmentMenu())
btnSendMessage.addEventListener('click',()=>sendMessage())

msgInput.addEventListener('keydown', function (e) {
  if (e.key === 'Enter' && !isEmpty()) {
    e.preventDefault()
    sendMessage()
  }
});

//TESTING:
const colorPicker = document.getElementById('color');
colorPicker.addEventListener('input', e => {
  document.body.style.backgroundColor = e.target.value;
});

const btnSendMessage = document.getElementById('btnSendMessage'),
  btnAddAttachment = document.getElementById('btnAddAttachment')

function toggleAttachmentMenu(){
  console.log('menu');
}

function sendMessage(){
  const input = document.getElementById('msgInput')
  if(isEmpty(input)) return
  createMessage(input.value,1)
  clearInput(input)
}

function isEmpty(input){
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
    const d = new Date(),
    iso = d.toISOString();
    hour.textContent = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
    createMessageJSON(text,iso)
  }
  else{hour.textContent = getHourMinute(isotime)}
  span.textContent=text
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

const btnSendMessage = document.getElementById('btnSendMessage'),
  btnAddAttachment = document.getElementById('btnAddAttachment')

btnAddAttachment.addEventListener('click',()=>toggleAttachmentMenu())
btnSendMessage.addEventListener('click',()=>sendMessage())

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
  fetch('db.json')
    .then(res=>{
      if(!res.ok) throw new Error('Erro no carregamento do banco JSON');
      return res.json();
    })
    .then(data=>{
      const chat=data.chats.find(c=>c.id===chatId)
      if(!chat) return
      data.chats.forEach(chat=>{
        console.info(`Chat ${chat.id}: Membros ${chat.users}.`);
        chat.messages.forEach(msg=>{
          console.log(`"${msg.text}" ~ ${msg.from} [${msg.time}]`);
        })
      })
    })
    .catch(err => console.error(err));

  }
createMessage("teste de call",1)
function createMessage(text, from, time=null){
  const chat = document.getElementById('chat'),
    message = document.createElement('div'),
    span = document.createElement('span'),
    hour = document.createElement('sub')
  if(time === null){
    const d = new Date(),
    iso = d.toISOString();
    console.log(iso);
    hour.textContent = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  }
  span.textContent=text
  message.appendChild(span)
  message.appendChild(hour)
  if(from === 1) message.className='historyMessage msgSender'
  else{message.className='historyMessage msgRecipient'}
  chat.appendChild(message)
}

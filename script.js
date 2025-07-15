const btnSendMessage = document.getElementById('btnSendMessage'),
  btnAddAttachment = document.getElementById('btnAddAttachment')

btnAddAttachment.addEventListener('click',()=>toggleAttachmentMenu())
btnSendMessage.addEventListener('click',()=>sendMessage())

function toggleAttachmentMenu(){
  console.log('menu');
}
function sendMessage(){
  const input = document.getElementById('msgInput'),
    text = document.getElementById('msgInput').value
  if(!text.trim()) return
  const chat = document.getElementById('chat'),
    message = document.createElement('div'),
    span = document.createElement('span'),
    hour = document.createElement('sub'),
    d= new Date()
  hour.textContent = `${d.getHours().toString().padStart(2, '0')}:${d.getMinutes().toString().padStart(2, '0')}`
  span.textContent=text
  message.appendChild(span)
  message.appendChild(hour)
  message.className='historyMessage msgSender'
  chat.appendChild(message)
  clearInput(input)
}

function clearInput(input){
  input.value = ''
  input.style.height = 'auto'
  input.focus()
}
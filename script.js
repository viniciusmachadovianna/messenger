document.getElementById('btnSend').addEventListener('click',function (){ sendMessage(this)
})
function sendMessage(){
  const text = document.getElementById('msgInput').value,
    message = document.createElement('div'),
    chat = document.getElementById('chat')
  message.textContent=text
  message.className='historyMessage msgSender'
  chat.appendChild(message)
}
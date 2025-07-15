document.getElementById('btnSend').addEventListener('click',function (){ sendMessage(this)
})
function sendMessage(){
  const msg = document.getElementById('msgInput')
  console.log(msg.value)
}
const xat = 1

function clearChatHistory(){
  const chat = document.getElementById('chatHistory');
  while (chat.firstChild) {
    chat.removeChild(chat.firstChild);
  }
}

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

// selectChat(xat)

const btnForward       = document.getElementById('btnForward')
const btnAddAttachment = document.getElementById('btnAddAttachment')
const quickActionList = document.querySelectorAll('.messageQuickAction');

function toggleAttachmentMenu(){
  console.log('menu');
}

function copyMessage(){
    navigator.clipboard.writeText("teste copia")
    console.log('copiado!');
}

function removeMessage(e){
  e.parentElement.remove();
}

btnAddAttachment.addEventListener('click',()=>toggleAttachmentMenu())
quickActionList.forEach(quickActionBtn=>{
  quickActionBtn.addEventListener('click',()=>{
    console.log('btn clicked');
  })
})

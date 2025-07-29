const btnTheme = document.getElementById("btnTheme")
const colorPicker = document.getElementById('bgcolor');

function toggleTheme() {
  const doc = document.documentElement;
  doc.getAttribute('data-theme')==='dark' ? doc.setAttribute('data-theme','light') : doc.setAttribute('data-theme','dark')
}

function changeBackgroundColor(color) {
  document.body.style.backgroundColor = e.target.value;
}

btnTheme.addEventListener('click',toggleTheme)
colorPicker.addEventListener('input', changeBackgroundColor)

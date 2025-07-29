const btnLogin = document.getElementById("loginBtn")

function login(e){
  const loginForm = document.getElementById('loginForm');
  e.preventDefault();
  const user = document.getElementById('inputUser').value;
  const pass = document.getElementById('inputPass').value;
  if(!isCredentialsValid(user,pass)){loginForm.className='invalidCredentials'}
}
function isCredentialsValid(user,pass){
  //send to BE
  return user==='user'&&pass==='pass'
}

btnLogin.addEventListener('click',login)

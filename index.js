let inputUserName = document.getElementById("userName");
let inputPassword = document.getElementById("password");
const logInBtn = document.getElementById("logInBtn");
const logOutBtn = document.getElementById("logOutBtn");
const tryAgainBtn = document.getElementById("tryAgainBtn");
const namn = "Bella";
const lösenord = "qwe123";
let skapaText = true;

// Auto login om användarnamn och lösenord finns sparat i localstorage
if (
  localStorage.getItem("username") === namn &&
  localStorage.getItem("password") === lösenord
) {
  login();
}

// För kunna logga in med enter istället för att klicka på knappen
document.addEventListener("keydown", function (event) {
  let pressedKey = event.key;
  if (pressedKey === "Enter") {
    if (inputUserName.value === namn && inputPassword.value === lösenord) {
      login();
      setLocalStorage();
    } else {
      wrongPasswordUsername();
    }
  }
});

logInBtn.addEventListener("click", function () {
  if (inputUserName.value === namn && inputPassword.value === lösenord) {
    login();
    setLocalStorage();
  } else {
    wrongPasswordUsername();
  }
});

logOutBtn.addEventListener("click", function () {
  logOut();
});

tryAgainBtn.addEventListener("click", function () {
  backToLogIn();
});

// funktion för att komma tillbaka till log in sidan.

function backToLogIn() {
  document.getElementById("error-box").classList.add("hide");
  document.getElementById("login-box").classList.remove("hide");

  removeHeader();
}

//funktion för att visa att fel lösenord eller användarnamn matats in
function wrongPasswordUsername() {
  document.getElementById("login-box").classList.add("hide");
  document.getElementById("error-box").classList.remove("hide");

  if (skapaText === true) {
    nyHeader("Fel Användarnamn eller Lösenord.", "error-box", tryAgainBtn);
  }
}
// funktion för att logga ut
function logOut() {
  document.getElementById("welcome-box").classList.add("hide");
  document.getElementById("login-box").classList.remove("hide");
  removeHeader();
  localStorage.clear();
}

// funktion för att spara användarnamn i localstorage
function setLocalStorage() {
  localStorage.setItem("username", inputUserName.value);
  localStorage.setItem("password", inputPassword.value);
}
// funktion för att logga in.
function login() {
  document.getElementById("login-box").classList.add("hide");
  document.getElementById("welcome-box").classList.remove("hide");
  if (skapaText === true) {
    nyHeader("Välkommen, du är nu inloggad.", "welcome-box", logOutBtn);
  }
}

// funktion för att skapa en ny header,
function nyHeader(text, boxId, BtnId) {
  let divTag = document.getElementById(boxId);
  let newDiv = document.createElement("div");
  let nyText = document.createTextNode(text);
  newDiv.appendChild(nyText);
  divTag.appendChild(newDiv);
  divTag.insertBefore(newDiv, BtnId);
  newDiv.classList.add("welcome-text");
  newDiv.id = "new-header";
  skapaText = false;
}

// funktion för att ta bort header.
function removeHeader() {
  const newDiv = document.getElementById("new-header");
  newDiv.remove();
  skapaText = true;
}

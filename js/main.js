'use strict';

//============OF RECEIRT==============================

const modalAuth = document.querySelector('.modal-auth'),
buttonAuth = document.querySelector('.button-auth'),
closeAuth = document.querySelector('.close-auth'),
cartButton = document.querySelector("#cart-button"),
modal = document.querySelector(".modal"),
close = document.querySelector(".close"),
logInForm = document.querySelector('#logInForm'),
loginInput = document.querySelector('#login'),
userName = document.querySelector('.user-name'),
buttonOut = document.querySelector('.button-out');

//============/OF RECEIRT==============================

//============VARIABLE==============================

let login = localStorage.getItem('delivery');

//============/VARIABLE==============================

//============FUNCTION=================================
const toggleModal = () => {
	modal.classList.toggle('is-open');
};

const toggleModalAuth = () => {
	modalAuth.classList.toggle('is-open');
};

const authorized = () => {
	const logOut = () => {
		login = null;
		userName.style.display = '';
		buttonOut.style.display = '';
		buttonAuth.style.display = '';
		buttonOut.removeEventListener('click', logOut);
		localStorage.removeItem('delivery');
		checkAuth();
	};

	userName.textContent = login;
	buttonAuth.style.display = 'none';
	userName.style.display = 'inline';
	buttonOut.style.display = 'block';
	buttonOut.addEventListener('click', logOut);
};

const checkAuth = () => login ? authorized() : noAuthorized();

const noAuthorized = () => {

	const logIn = (event) => {
		event.preventDefault();
		//if required edited
		if(loginInput.value){
			login = loginInput.value;
			localStorage.setItem('delivery', login);
			toggleModalAuth();
			buttonAuth.removeEventListener('click', toggleModalAuth);
			closeAuth.removeEventListener('click', toggleModalAuth);
			logInForm.removeEventListener('submit', logIn);
			logInForm.reset();
			checkAuth();
		} else {
			alert("Введите логин и пароль!!!")
		}
		
	};
	console.log("No authorized");
	buttonAuth.addEventListener('click', toggleModalAuth);
	closeAuth.addEventListener('click', toggleModalAuth);
	logInForm.addEventListener('submit', logIn);
};

//============/FUNCTION================================

//============EVENTS================================

cartButton.addEventListener("click", toggleModal);
close.addEventListener("click", toggleModal);

//============/EVENTS================================


checkAuth();


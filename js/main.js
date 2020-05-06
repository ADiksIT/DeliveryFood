'use strict';

//============OF RECEIRT==============================

const modalAuth = document.querySelector('.modal-auth'),
buttonAuth = document.querySelector('.button-auth'),
closeAuth = document.querySelector('.close-auth'),
cartButton = document.querySelector("#cart-button"),
modal = document.querySelector(".modal"),
closeBtn = document.querySelector(".close"),
logInForm = document.querySelector('#logInForm'),
loginInput = document.querySelector('#login'),
userName = document.querySelector('.user-name'),
buttonOut = document.querySelector('.button-out'),
cardsRestaurants = document.querySelector('.cards-restaurants'),
containerPromo = document.querySelector('.container-promo'),
restaurants = document.querySelector('.restaurants'),
menu = document.querySelector('.menu'),
logo = document.querySelector('.logo'),
comeBack = document.querySelector('.come-back'),
cardsMenu = document.querySelector('.cards-menu');

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
			alert("Введите логин и пароль!!!");
		}
		
	};
	console.log("No authorized");
	buttonAuth.addEventListener('click', toggleModalAuth);
	closeAuth.addEventListener('click', toggleModalAuth);
	logInForm.addEventListener('submit', logIn);
};

const createCardGood = () => {
	let card = `
		<div class="card">
			<img src="img/pizza-plus/pizza-oleole.jpg"
			 alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title card-title-reg">Пицца Оле-Оле</h3>
				</div>
				<!-- /.card-heading -->
				<div class="card-info">
					<div class="ingredients">Соус томатный,
					 сыр «Моцарелла», черри, маслины, зелень, майонез
					</div>
				</div>
				<!-- /.card-info -->
				<div class="card-buttons">
					<button class="button button-primary button-add-cart">
						<span class="button-card-text">В корзину</span>
						<span class="button-cart-svg"></span>
					</button>
					<strong class="card-price-bold">440 ₽</strong>
				</div>
			</div>
			<!-- /.card-text -->
		</div>
		<!-- /.card -->
	`;

	cardsMenu.insertAdjacentHTML("beforeend", card);
};

const openGoods = (event) => {
	if(login){
		const target = event.target;
		const restaurant = target.closest('.card-restaurant');
		if (restaurant) {
			containerPromo.classList.add('hide');
			restaurants.classList.add('hide');
			menu.classList.remove('hide');

			cardsMenu.textContent = '';

			for (let i = 0; i < 6; i++) {
				createCardGood();
			}
		}
	} else {
		toggleModalAuth();
	}
	
	
};

const hideRestaurantsProducts = () => {
	containerPromo.classList.remove('hide');
	restaurants.classList.remove('hide');
	menu.classList.add('hide');
};

const createCardRestaurant = () => {
	let card = `
		<a class="card card-restaurant">
			<img src="img/pizza-plus/preview.jpg" alt="image" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">Пицца плюс</h3>
					<span class="card-tag tag">50 мин</span>
				</div>
				<!-- /.card-heading -->
				<div class="card-info">
					<div class="rating">
						4.5
					</div>
					<div class="price">От 900 ₽</div>
					<div class="category">Пицца</div>
				</div>
				<!-- /.card-info -->
			</div>
			<!-- /.card-text -->
		</a>
	`;

	cardsRestaurants.insertAdjacentHTML("beforeend", card);
};

//============/FUNCTION================================

//============EVENTS================================

cartButton.addEventListener("click", toggleModal);
closeBtn.addEventListener("click", toggleModal);
cardsRestaurants.addEventListener('click', openGoods);
logo.addEventListener('click', hideRestaurantsProducts);
comeBack.addEventListener('click', hideRestaurantsProducts);

//============/EVENTS================================


checkAuth();
for (let i = 0; i < 6; i++) {
	createCardRestaurant();
}

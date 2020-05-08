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
cardsMenu = document.querySelector('.cards-menu'),
sectionHeading = menu.querySelector('.section-heading'),
modalBody = document.querySelector('.modal-body'),
clearCart = document.querySelector('.clear-cart');

//============/OF RECEIRT==============================

//============VARIABLE==============================

let login = localStorage.getItem('delivery');

let cart = [];// localStorage.getItem(JSON.parse('cartUser'));

//============/VARIABLE==============================

//============FUNCTION=================================

const getData = async (url) => {
	const response = await fetch(url);
	if (!response.ok) {
		throw new Error (`Ошибка по адрессу ${url}, статус ${response.status}`);
	}

	return await response.json();
};

const toggleModal = () => {
	modal.classList.toggle('is-open');
};

const toggleModalAuth = () => {
	modalAuth.classList.toggle('is-open');
};

const addToCart = (event) => {
	cart = JSON.parse(localStorage.getItem('cartUser'));
	const target = event.target;
	const buttonAddToCart = target.closest('.button-add-cart');
	if (buttonAddToCart) {
		const card = target.closest('.card');
		const title = card.querySelector('.card-title-reg').textContent;
		const cost = card.querySelector('.card-price').textContent;
		const id = card.id;
		const food = cart.find((item) => {
			return item.id === id;
		});

		if (food) { 
			food.count += 1;
		} else {
			cart.push({ title, cost, id, count : 1});
			
		}
		localStorage.setItem('cartUser', JSON.stringify(cart));
		console.log(cart);
	}
	
};

const authorized = () => {
	const logOut = () => {
		login = null;
		userName.style.display = '';
		buttonOut.style.display = '';
		buttonAuth.style.display = '';
		cartButton.style.display = '';
		buttonOut.removeEventListener('click', logOut);
		localStorage.removeItem('delivery');
		checkAuth();
	};
	userName.textContent = login;
	buttonAuth.style.display = 'none';
	userName.style.display = 'inline';
	buttonOut.style.display = 'flex';
	cartButton.style.display = 'flex';
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

const changeCount = (event) => {
	const target = event.target;

	if (target.classList.contains('counter-button')) {
		const food = cart.find((item) => {
			return item.id === target.dataset.id;
		});
		if (target.classList.contains('counter-minus')) {
			if (food.count === 1) {
				cart.splice(cart.indexOf(food), 1);
			}
			food.count--;
		}
		if (target.classList.contains('counter-plus')) {
			food.count++;
		}
		renderCart();
	}
	
};

const renderCart = (params) => {
	//cart = JSON.parse(localStorage.getItem('cartUser'));
	modalBody.textContent = '';
	cart.forEach(({ id, title, cost, count }) => {
		const itemCart = `
			<div class="food-row">
				<span class="food-name">${title}</span>
				<strong class="food-price"${cost} ₽</strong>
				<div class="food-counter">
					<button class="counter-button counter-minus" data-id="${id}">-</button>
					<span class="counter">${count}</span>
					<button class="counter-button counter-plus" data-id="${id}">+</button>
				</div>
			</div>
			<!-- /.foods-row -->
		`;
		modalBody.insertAdjacentHTML('afterbegin', itemCart);
	});
	const totalPrice = cart.reduce((result, item) => {
		return result + parseFloat(item.cost) * item.count;
	}, 0);
	const modalPrice = document.querySelector('.modal-pricetag');
	modalPrice.textContent = totalPrice + ' ₽';
	console.log("==================================");
	
	localStorage.setItem('cartUser', JSON.stringify(cart));
};

const createCardGood = (item) => {
	
	const { description, id, image, name, price } = item;
	let card = `
		<div class="card" id="${id}">
			<img src="${image}"
			alt="${name}" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title card-title-reg">${name}</h3>
				</div>
				<!-- /.card-heading -->
				<div class="card-info">
					<div class="ingredients">${description}</div>
				</div>
				<!-- /.card-info -->
				<div class="card-buttons">
					<button class="button button-primary button-add-cart">
						<span class="button-card-text">В корзину</span>
						<span class="button-cart-svg"></span>
					</button>
					<strong class="card-price card-price-bold">${price} ₽</strong>
				</div>
			</div>
			<!-- /.card-text -->
		</div>
		<!-- /.card -->
	`;

	cardsMenu.insertAdjacentHTML("beforeend", card);
};

const createSectionHeading = (item) => {	
	const { kitchen,
		name, price, 
		stars
	} = item;
	let heading = `
		<h2 class="section-title restaurant-title">${name}</h2>
		<div class="card-info">
			<div class="rating">${stars}</div>
			<div class="price">От ${price} ₽</div>
			<div class="category">${kitchen}</div>
			<!--span class="come-back">Назад</span>-->
		</div>
	`;
	sectionHeading.insertAdjacentHTML("beforeend", heading);
};

const openGoods = (event) => {
	if(login){
		const target = event.target;
		const restaurant = target.closest('.card-restaurant');
		if (restaurant) {
			cardsMenu.textContent = '';
			sectionHeading.textContent = '';
			containerPromo.classList.add('hide');
			restaurants.classList.add('hide');

			getData(`./db/partners.json`).then(data => {
				let rest = data.find(rest => rest.products === restaurant.dataset.products);
				createSectionHeading(rest);
			});

			getData(`./db/${restaurant.dataset.products}`).then(data => {
				data.forEach(createCardGood);
			});

			menu.classList.remove('hide');
			// const comeBack = document.querySelector('.come-back');
			// comeBack.addEventListener('click', hideRestaurantsProducts);
			
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

const createCardRestaurant = (item) => {

	const { image, kitchen,
			name, price, products, 
			stars, time_of_delivery : time
	} = item;


	let card = `
		<a class="card card-restaurant" data-products="${products}" data-rest="${name}">
			<img src="${image}" alt="${name}" class="card-image"/>
			<div class="card-text">
				<div class="card-heading">
					<h3 class="card-title">${name}</h3>
					<span class="card-tag tag">${time} мин</span>
				</div>
				<!-- /.card-heading -->
				<div class="card-info">
					<div class="rating">
						${stars}
					</div>
					<div class="price">От ${price} ₽</div>
					<div class="category">${kitchen}</div>
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



//============/EVENTS================================

const init = () => {
	getData('./db/partners.json')
	.then((data) => {
		//console.log(data);
		data.forEach(createCardRestaurant);
			
	});

	cartButton.addEventListener("click", () => {
		renderCart();
		toggleModal();
	});
	closeBtn.addEventListener("click", toggleModal);
	cardsRestaurants.addEventListener('click', openGoods);
	logo.addEventListener('click', hideRestaurantsProducts);
	cardsMenu.addEventListener('click', addToCart);
	modalBody.addEventListener('click', changeCount);
	clearCart.addEventListener('click', () => {
		cart.length = 0;
		renderCart();
	});

	checkAuth();

	new Swiper('.swiper-container', {
		loop : true,
		autoplay : true
	});
};

init();

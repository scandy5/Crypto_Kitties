document.body.onload = function () {
	setTimeout(function() {
		let preloader = document.getElementById('cube-loader');
		preloader.classList.toggle('done');
	}, 1000)
}

const getRandomColor = () => {
	let letters = '0123456789ABCDEF'.split('');
	let color = '#';
	for (let i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

let offset = 0;

async function getData() {
	let response = await fetch('https://api.cryptokitties.co/v2/kitties?offset=' + offset + '&limit=12&parents=false&authenticated=false&include=sale&orderBy=current_price&orderDirection=asc&total=true')
	let result = await response.json();
	let infoOfCats = result.kitties;
	return infoOfCats
};

let cardWrapper = document.querySelector('.card-wrapper');
cardWrapper.innerHTML = '';

async function renderKitties(data) {
	if (data === undefined) {
		cats = await getData();
	} else {
		cats = await data;
	}

	cardWrapper.innerHTML = cats.map((cat) => {
	const auction = cat.auction;
	
	const exactPrice = auction.current_price / 100000000000000000;
	let price;

	if (exactPrice.toString().charAt(4) !== '') {
		price = exactPrice.toFixed(3);
	} else {
		price = exactPrice.toFixed(2);
	}

	const status = cat.status;
	const cooldown = status.cooldown_index;
	let category;

	if (cooldown < 2) {
			category = 'Fast';
	} else if (cooldown < 3) {
			category = 'Swift';
	} else if (cooldown < 5) {
			category = 'Snappy';
	} else if (cooldown < 7) {
			category = 'Brisk';
	} else if (cooldown < 10) {
			category = 'Plodding';
	} else if (cooldown < 11) {
			category = 'Slow';
	} else if (cooldown < 13) {
			category = 'Sluggish';
	} else if (cooldown >= 13) {
			category = 'Catatonic';
	}

	if (cat.name === null) {
		cat.name = 'Nameless';
	}
	return `
	<div class="card wow fadeIn" data-wow-delay="${counter()}s" data-wow-duration="1s" style="background-color: ${getRandomColor()}">
		<div class="card__img"><img src="${cat.image_url}" alt="${cat.name}"></div>
		<div class="card__id"># ${cat.id}</div>
		<div class="card__name">Name: ${cat.name}</div>
		<div class="card__category">Category: ${category}</div>
		<div class="card__price">Price: ${price}</div>
	</div>
	`
	}).join('');
} 

async function renderKittiesConcatinate(data) {
	if (data === undefined) {
		cats = await getData();
	} else {
		cats = await data;
	}

	cardWrapper.innerHTML += cats.map((cat) => {
	const auction = cat.auction;
	
	const exactPrice = auction.current_price / 100000000000000000;
	let price;

	if (exactPrice.toString().charAt(4) !== '') {
		price = exactPrice.toFixed(3);
	} else {
		price = exactPrice.toFixed(2);
	}

	const status = cat.status;
	const cooldown = status.cooldown_index;
	let category;

	if (cooldown < 2) {
			category = 'Fast';
	} else if (cooldown < 3) {
			category = 'Swift';
	} else if (cooldown < 5) {
			category = 'Snappy';
	} else if (cooldown < 7) {
			category = 'Brisk';
	} else if (cooldown < 10) {
			category = 'Plodding';
	} else if (cooldown < 11) {
			category = 'Slow';
	} else if (cooldown < 13) {
			category = 'Sluggish';
	} else if (cooldown >= 13) {
			category = 'Catatonic';
	}

	if (cat.name === null) {
		cat.name = 'Nameless';
	}
	return `
	<div class="card wow fadeIn" data-wow-delay="${counter()}s" data-wow-duration="1s" style="background-color: ${getRandomColor()}">
		<div class="card__img"><img src="${cat.image_url}" alt="${cat.name}"></div>
		<div class="card__id"># ${cat.id}</div>
		<div class="card__name">Name: ${cat.name}</div>
		<div class="card__category">Category: ${category}</div>
		<div class="card__price">Price: ${price}</div>
	</div>
	`
	}).join('');
} 

renderKitties();

(async function getSearch() {
	infoOfCats = await getData();

	var filteredCats;

	document.querySelector('#search-form').addEventListener('submit',(event) => {
		event.preventDefault();
	
		searchValue = document.querySelector('[name="search"]').value;
		
		if (searchValue !== null) {
			filteredCats = infoOfCats.filter((cat) => {
				return cat.name && (cat.name.toUpperCase().indexOf(searchValue.toUpperCase())) >= 0;
			});
		} else {
			filteredCats = infoOfCats;
		}

		return renderKitties(filteredCats);
	});
}());

function makeCounter() {
	let currentCount = 1;
	let preCurrentCount = 0;
	return function() {

		if (currentCount >= 6) {
			currentCount = 0;
		}
		return (preCurrentCount + '.' + currentCount++);
	}
};

let counter = makeCounter();

document.querySelector('#button').addEventListener('click', () => {
	offset++;
	renderKittiesConcatinate();
})

	// document.addEventListener("scroll", function (event) {
	// 	scroll();
	// });

	// const scroll = function () {
	// 	let lastDiv = document.querySelector(".card-wrapper > div:last-child");
	// 	let lastDivOffset = lastDiv.offsetTop + lastDiv.clientHeight;
	// 	let pageOffset = window.pageYOffset + window.innerHeight;

	// 	if (pageOffset > lastDivOffset - 20) {
	// 		offset++;
	// 		renderKitties();
	// 	}
	// };
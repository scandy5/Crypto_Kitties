import { log } from "util";

document.body.onload = function () {
	setTimeout(function() {
		let preloader = document.getElementById('cube-loader');
		preloader.classList.toggle('done');
	}, 1000)

	setTimeout(() => {
		let lastCard = document.querySelector('.card-wrapper').lastElementChild;
		console.dir(lastCard);
	}, 2000)
}



const getRandomColor = () => {
	let letters = '0123456789ABCDEF'.split('');
	let color = '#';
	for (let i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

fetch('https://api.cryptokitties.co/v2/kitties?offset=0&limit=12&parents=false&authenticated=false&include=sale&orderBy=current_price&orderDirection=asc&total=true')
  .then((response) => {
		return response.json();
	})
	.then(function (kitties) {
		const infoOfCats = kitties.kitties;

		function makeCounter() {
			let currentCount = 1;
			let preCurrentCount = 0;
			return function() {

				if (currentCount >= 9) {
					currentCount = 0;
				}
				return (preCurrentCount + '.' + currentCount++);
			}
		};

		let counter = makeCounter();

		renderKitties(infoOfCats);

		function renderKitties(cats) {
			document.querySelector('.card-wrapper').innerHTML = cats.map((cat) => {
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
			<div class="card wow fadeInUp" data-wow-delay="${counter()}s" data-wow-duration="1s" style="background-color: ${getRandomColor()}">
				<div class="card__img"><img src="${cat.image_url}" alt="${cat.name}"></div>
				<div class="card__id"># ${cat.id}</div>
				<div class="card__name">Name: ${cat.name}</div>
				<div class="card__category">Category: ${category}</div>
				<div class="card__price">Price: ${price}</div>
			</div>
			`
			}).join('');
		} 

		document.querySelector('#search-form').addEventListener('submit',(event) => {
			event.preventDefault();

			searchValue = document.querySelector('[name="search"]').value;

			var filteredCats;

			if (searchValue !== null) {
				filteredCats = infoOfCats.filter((cat) => {
					return cat.name && (cat.name.toUpperCase().indexOf(searchValue.toUpperCase())) >= 0;
				});
			} else {
				filteredCats = infoOfCats;
			}
			renderKitties(filteredCats);
		});
	})

let cards = document.querySelector('.card-wrapper');

cards.addEventListener('scroll' () => {
	if (cards.scrollTop + cards.clientHeight >= cards.scrollHeight){
		console.log('done');
	}
})






// let	lastCard;

// let lastCardOffset;

// function timeout (ms) {
// 	return new Promise (resolve => setTimeout (resolve, ms));
// }



// document.addEventListener('scroll', () => {

// 	function foo () {
// 		// await timeout(2000);
// 		lastCard = document.querySelector('.card-wrapper').lastElementChild;
// 		document.body.onload(() => {
// 			lastCardOffset = lastCard.offsetTop;
// 		})
		
// 		console.log(lastCardOffset);
		
// 	}
// 	console.log(lastCardOffset);
	
// 	if (document.body.scrollTop > lastCardOffset - 200) {
// 		console.log('done');
// 	}
// });

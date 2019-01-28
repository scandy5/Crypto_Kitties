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

fetch('https://ma-cats-api.herokuapp.com/api/cats?&per_page=12')
  .then((response) => {
		return response.json();
	})
	.then(function (kitties) {
		const infoOfCats = kitties.cats;

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
	
		const listOfCats = infoOfCats.map((cat) => {
			return `
			<div class="card wow fadeInUp" data-wow-delay="${counter()}s" data-wow-duration="1s" style="background-color: ${getRandomColor()}">
				<div class="card__img"><img src="${cat.img_url}" alt="${cat.name}"></div>
				<div class="card__id"># ${cat.id}</div>
				<div class="card__name">Name: ${cat.name}</div>
				<div class="card__category">Category: ${cat.category}</div>
				<div class="card__price">Price: ${cat.price}$</div>
			</div>
			`
		}).join('');

		document.querySelector('.card-wrapper').innerHTML = listOfCats;
	})





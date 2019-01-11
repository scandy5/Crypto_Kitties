const getRandomColor = () => {
	let letters = '0123456789ABCDEF'.split('');
	let color = '#';
	for (let i = 0; i < 6; i++ ) {
		color += letters[Math.round(Math.random() * 15)];
	}
	return color;
}

var kitties = new XMLHttpRequest();
kitties.onload = reqListener;
kitties.open("get", "https://ma-cats-api.herokuapp.com/api/cats", true);
kitties.send();

function reqListener() {
	const infoOfCats = JSON.parse(kitties.responseText);
	const cats = infoOfCats.cats.slice(0, 12);
	const listOfCats = cats.map((cat) => {
		return `
		<div class="card" style="background-color: ${getRandomColor()}">
			<div class="card__img"><img src="${cat.img_url}" alt="${cat.name}"></div>
			<div class="card__id"># ${cat.id}</div>
			<div class="card__name">Name: ${cat.name}</div>
			<div class="card__category">Category: ${cat.category}</div>
			<div class="card__price">Price: ${cat.price}$</div>
		</div>
		`
	}).join('') 
	document.querySelector('.card-wrapper').innerHTML = listOfCats;
}




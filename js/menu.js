
const cardsMenu = document.querySelector('.cards-menu');

const changeTitle = (restaurant) => {
    const restaurantTitle = document.querySelector('.restaurant-title');
    const cardInfo = document.querySelector('.card-info');
    const price = cardInfo.querySelector('.price');
    const category = cardInfo.querySelector('.category');
    const rating = cardInfo.querySelector('.rating');
    restaurantTitle.textContent = restaurant.name;
    price.textContent = restaurant.price + ' руб.';
    category.textContent = restaurant.kitchen;
    rating.textContent = restaurant.stars;
};

const renderItems = (data) => {
    data.forEach(({ image, name, description, price, id }) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.innerHTML = `
                    <img src=${image} alt=${name} class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title card-title-reg">${name} </h3>
							</div>
							<div class="card-info">
								<div class="ingredients">${description}</div>
							</div>
							<div class="card-buttons">
								<button class="button button-primary button-add-cart">
									<span class="button-card-text">В корзину</span>
									<span class="button-cart-svg"></span>
								</button>
								<strong class="card-price-bold">${price} ₽</strong>
							</div>
						</div>
        `;
        cardsMenu.append(card);
    });
};

if (localStorage.getItem('restaurant')) {  // это ключ наш в локалсторадж = restourant
    const restaurant = JSON.parse(localStorage.getItem('restaurant'));

    changeTitle(restaurant);
    
    fetch(`./db/${restaurant.products}`)
    .then((response) => response.json())
    .then((data) => {renderItems(data)})
    .catch(error => console.log("Внимание, ошибка: ", error));
} else {
    window.location.href = '/';
}



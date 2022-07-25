const cardsRestaurants = document.querySelector('.cards-restaurants');

const renderItems = (data) => {
    data.forEach((el) => {
        const {image, name, stars, price, kitchen, 'time_of_delivery': time, products} = el;
        const a = document.createElement('a');
        a.setAttribute('href', '/restaurant.html');
        a.classList.add('card');
        a.classList.add('card-restaurant');
        a.dataset.products = products;
        a.innerHTML = `
                        <img src=${image} alt="${name}" class="card-image" />
						<div class="card-text">
							<div class="card-heading">
								<h3 class="card-title">${name} </h3>
								<span class="card-tag tag">${time} мин</span>
							</div>
							<div class="card-info">
								<div class="rating">${stars} </div>
								<div class="price">${price} руб.</div>
								<div class="category">${kitchen}</div>
							</div>
						</div>
        `;

        a.addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.setItem('restaurant', JSON.stringify(el));
            window.location.href = '/restaurant.html';
        });
        cardsRestaurants.append(a);
    });
};

fetch('https://test-da9c4-default-rtdb.firebaseio.com/db/partners.json')
    .then(response => response.json())
    .then(data => {renderItems(data)})
    .catch(error => console.log("Внимание, ошибка: ", error));

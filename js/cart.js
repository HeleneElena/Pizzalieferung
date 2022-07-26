const cart = () => {
    const modalCart = document.querySelector('.modal-cart'), // корзинa
          cartButton = document.getElementById('cart-button'), // кнопка корзины
          close = document.querySelector('.close'),
          body = modalCart.querySelector('.modal-body'),
          btnSend = modalCart.querySelector('.button-primary');

    const resetCart = () => {
        body.innerHTML = '';
        localStorage.removeItem('cart');
        modalCart.style.display = 'none';
    };

    const minusCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'));// свежие данные от локалст-ж
        
        cartArray.map(item => {
            if (item.id === id) {
                item.count = item.count > 0 ? item.count - 1 : 0;
                }
            return item;
        }); 
        localStorage.setItem('cart', JSON.stringify(cartArray)); 
        renderItems(cartArray);
    };

    const plusCount = (id) => {
        const cartArray = JSON.parse(localStorage.getItem('cart'));// свежие данные от локалст-ж
        cartArray.map(item => {
            if (item.id === id) {
                    item.count++;
                }
            return item;
        }); 
        localStorage.setItem('cart', JSON.stringify(cartArray)); 
        renderItems(cartArray);
    };

    const renderItems = (data) => {
        body.innerHTML = '';
        data.forEach(({ name, price, count, id }) => {

            const cartElem = document.createElement('div');
            cartElem.classList.add('food-row');
            cartElem.innerHTML = `
					<span class="food-name">${name} </span>
					<strong class="food-price">${price} ₽</strong>
					<div class="food-counter">
						<button class="counter-button btn-minus" data-index="${id}" >-</button>
						<span class="counter">${count}</span>
						<button class="counter-button btn-plus" data-index="${id}" >+</button>
					</div>
            `;
//            cartElem.querySelector('.btn-minus').addEventListener('click', () => {
//                minusCount(id);
//            });

 //           cartElem.querySelector('.btn-plus').addEventListener('click', () => {
 //               plusCount(id);
 //           });

            body.append(cartElem);
        });
    };

    body.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.classList.contains('btn-minus')) {
            minusCount(e.target.dataset.index);
        } else if (e.target.classList.contains('btn-plus')) {
            plusCount(e.target.dataset.index);
        }
    });

    btnSend.addEventListener('click', () => {
        const cartArray = localStorage.getItem('cart');

        fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            body: cartArray
        })
        .then(response => {
            if (response.ok) {
                resetCart();
            }
        })
        .catch(err => console.error(err));
    });

    cartButton.addEventListener('click', () => {

        if (localStorage.getItem('cart')) {
            renderItems(JSON.parse(localStorage.getItem('cart')));
        }
        modalCart.style.display = "flex";       
    });

    close .addEventListener('click', () => {
        modalCart.style.display = "none";
    });

};

cart();
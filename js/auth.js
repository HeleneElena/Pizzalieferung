const auth = () => {
    const buttonAuth = document.querySelector('.button-auth'),
      modalAuth = document.querySelector('.modal-auth'),
      buttonOut = document.querySelector('.button-out'),
      userName = document.querySelector('.user-name'),
      closeAuth = document.querySelector('.close-auth'),
      logInForm = document.getElementById('logInForm'),
      buttonLogin = document.querySelector('.button-login'),
      inputLogin = document.getElementById('login'),
      inputPassword = document.getElementById('password'),
      cartButton = document.getElementById('cart-button'); // кнопка корзины

    const login = (user) => {
        buttonAuth.style.display = 'none';
        buttonOut.style.display = 'flex';
        cartButton.style.display = 'flex';

        userName.style.display = 'flex';
        userName.textContent = user.login;
        modalAuth.style.display = 'none';
    };

    const logout = () => {
        buttonAuth.style.display = 'flex';
        buttonOut.style.display = 'none';
        userName.style.display = 'none';
        cartButton.style.display = 'none';
        userName.textContent = '';
        localStorage.removeItem('user');
    };

    buttonAuth.addEventListener('click', () => {
        modalAuth.style.display = 'flex';
    });

    closeAuth.addEventListener('click', () => {
        modalAuth.style.display = 'none';
    });

    logInForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const user = {
        login: inputLogin.value,
        password: inputPassword.value,
        };
        localStorage.setItem('user', JSON.stringify(user));
        login(user);
    });

    if(localStorage.getItem('user')) {
        login(JSON.parse(localStorage.getItem('user')));
    }

    buttonOut.addEventListener('click', logout);
};

auth();


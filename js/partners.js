const renderItems = (data) => {
    console.log(data);
};

fetch('https://test-da9c4-default-rtdb.firebaseio.com/db/partners.json')
    .then(response => response.json())
    .then(data => {renderItems(data)})
    .catch(error => console.log("Внимание, ошибка: ", error));

const restourant = 'food-band';

const renderItems = (data) => {
    console.log(data);
};
fetch(`./db/${restourant}.json`)
    .then((response) => response.json())
    .then((data) => {renderItems(data)})
    .catch(error => console.log("Внимание, ошибка: ", error));

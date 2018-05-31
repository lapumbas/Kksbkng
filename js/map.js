let declarations = [];
let declarationsNumber = 8;

imageNumber = function (n) {
  let stringN = String(n);
  while (stringN.length < 2) {
    stringN = '0' + stringN;
  };
  return stringN;
}

let title = [
  "Большая уютная квартира",
  "Маленькая неуютная квартира",
  "Огромный прекрасный дворец",
  "Маленький ужасный дворец",
  "Красивый гостевой домик",
  "Некрасивый негостеприимный домик",
  "Уютное бунгало далеко от моря",
  "Неуютное бунгало по колено в воде"
]

let houseType = [
  'flat',
  'house',
  'bungalo'
]

let checkIn = [
  '12:00',
  '13:00',
  '14:00'
]

let checkOut = [
  '12:00',
  '13:00',
  '14:00'
]

let featuresWords = [
  "wifi",
  "dishwasher",
  "parking",
  "washer",
  "elevator",
  "conditioner"
]



getRandomDifferentElement = function (arr) {
  return arr.splice([(Math.floor(Math.random() * arr.length))], 1).join();
}

getRandomElement = function (arr) {
  return arr[(Math.floor(Math.random() * arr.length))]
}

randomFeatures = (arr) => {
  let innerArr = [...arr];
  let result = [];
  for (let i = 0; i < getRandomInt(1, arr.length); i++) {
    result.push(getRandomDifferentElement(innerArr));
  }
  return result;
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function returnLocation() {
  return this;
}

let tempTitle = [...title];

let pins = [];

let mapPins = document.querySelector('.map__pins');
let fragment = document.createDocumentFragment();

for (let i = 0; i < declarationsNumber; i++) {
  declarations[i] = {};
  Object.defineProperties(declarations[i], {
    location: {
      value: {
        x: getRandomInt(300, 900),
        y: getRandomInt(100, 500)
      }
    },
    author: {
      value: {
        avatar: `img/avatars/user${imageNumber(i+1)}.png`
      }
    },
    offer: {
      value: {
        title: getRandomDifferentElement(tempTitle),
        price: getRandomInt(1000, 1000000),
        type: getRandomElement(houseType),
        checkin: getRandomElement(checkIn),
        checkout: getRandomElement(checkOut),
        rooms: getRandomInt(1, 5),
        guests: getRandomInt(1, 15),
        features: randomFeatures(featuresWords),
        description: '',
        photos: [],
      }
    }
  });
  declarations[i].offer.address = `${declarations[i].location.x}, ${declarations[i].location.y}`;

  pins[i] = document.createElement('button');
  pins[i].style = `left: ${declarations[i].location.x+20}px; top: ${declarations[i].location.y+40}px;`;
  pins[i].className = `map__pin`;
  pins[i].innerHTML = `<img src="${declarations[i].author.avatar}" width="40" height="40" draggable="false">`;
  fragment.appendChild(pins[i]);
};

console.log(declarations);
console.log(pins);
mapPins.appendChild(fragment);

let map = document.querySelector('.map');
map.classList.remove('map--faded');


function typeToRussian(type) {
  if (type === `flat`) {
    return `Квартира`
  } else if (type === `house`) {
    return `Дом`
  } else {
    return `Бунгало`
  }
};

let template = document.querySelector('template').content.querySelector('.map__card');
console.log(template);
let mapCard = template.cloneNode(true);
mapCard.querySelector('h3').innerText = declarations[0].offer.title;
mapCard.querySelector('p:nth-of-type(1)>small').innerText = declarations[0].offer.address;
mapCard.querySelector('.popup__price').innerHTML = `${declarations[0].offer.price}` + ' &#x20bd;/ночь';
mapCard.querySelector('h4').innerText = typeToRussian(declarations[0].offer.type);
mapCard.querySelector('p:nth-of-type(3)').innerText = `${declarations[0].offer.rooms} для ${declarations[0].offer.guests} гостей`;
mapCard.querySelector('p:nth-of-type(4)').innerText = `Заезд после ${declarations[0].offer.checkin}, выезд до ${declarations[0].offer.checkout}`;
for (let i = 0; i < declarations[0].offer.features.length; i++) {
  let li = document.createElement('li');
  li.className=`feature feature--${declarations[0].offer.features[i]}`;
  mapCard.querySelector('.popup__features').appendChild(li);  
}
mapCard.querySelector('p:last-of-type').innerText = declarations[0].offer.description;
mapCard.querySelector('.popup__avatar').src = declarations[0].author.avatar;
map.appendChild(mapCard);
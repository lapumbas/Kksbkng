

let declarations = [];
let declarationsNumber = 8;

imageNumber = function (n) {
  let stringN = String(n);
  while (stringN.length < 2) {
    stringN = '0' + stringN;
  };
  return stringN;
}

var title = [
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

let template = document.querySelector('template').content.querySelector('.map__card');

const closePopUp = () => {
  if (map.contains(map.querySelector('.map__card'))) {
    map.removeChild(map.querySelector('.map__card'))
  };
};

const closePopUpViaESC = (evt) => {
  if (evt.keyCode === 27 && map.contains(map.querySelector('.map__card'))) {
    map.removeChild(map.querySelector('.map__card'))
  };
};

const removeActivePin = (arr) => {
  arr.forEach(item => {
    item.classList.remove('map__pin--active');
  });
};

const pinClickHandler = (evt, declaration) => {
  let mapCard = template.cloneNode(true);
  closePopUp();
  removeActivePin(pins);
  if (evt.currentTarget.classList.contains('map__pin')) {
    evt.currentTarget.classList.add('map__pin--active')
  };
  mapCard.querySelector('h3').innerText = declaration.offer.title;
  mapCard.querySelector('p:nth-of-type(1)>small').innerText = declaration.offer.address;
  mapCard.querySelector('.popup__price').innerHTML = `${declaration.offer.price}` + ' &#x20bd;/ночь';
  mapCard.querySelector('h4').innerText = typeToRussian(declaration.offer.type);
  mapCard.querySelector('p:nth-of-type(3)').innerText = `${declaration.offer.rooms} для ${declaration.offer.guests} гостей`;
  mapCard.querySelector('p:nth-of-type(4)').innerText = `Заезд после ${declaration.offer.checkin}, выезд до ${declaration.offer.checkout}`;
  for (let i = 0; i < declaration.offer.features.length; i++) {
    let li = document.createElement('li');
    li.className = `feature feature--${declaration.offer.features[i]}`;
    mapCard.querySelector('.popup__features').appendChild(li);
  };
  mapCard.querySelector('p:last-of-type').innerText = declaration.offer.description;
  mapCard.querySelector('.popup__avatar').src = declaration.author.avatar;
  mapCard.querySelector('.popup__close').tabIndex = '0';
  map.appendChild(mapCard);

  mapCard.querySelector('.popup__close').addEventListener('click', () => {
    closePopUp();
    removeActivePin(pins);
  });
  mapCard.querySelector('.popup__close').addEventListener('keydown', (evt) => {
    if (evt.keyCode === 13) {
      closePopUp();
      removeActivePin(pins);
    };
  });
  document.addEventListener('keydown', (evt) => {
    closePopUpViaESC(evt);
    removeActivePin(pins);
  });
};


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
  pins[i].tabIndex = '0';
  pins[i].onfocus = () => {
    this.focused = true
  };
  pins[i].onblur = () => {
    this.focused = false
  };

  // pins[i].style = 'left:' + (declarations[i].location.x+20)+'px; top:'+ (declarations[i].location.y+40)+'px;';
  pins[i].style.left = String(declarations[i].location.x+20) + 'px';
  pins[i].style.top = String(declarations[i].location.y+40) + 'px';
  pins[i].className = `map__pin`;
  pins[i].innerHTML = `<img src="${declarations[i].author.avatar}" width="40" height="40" draggable="false">`;

  pins[i].addEventListener('click', (evt) => {
    pinClickHandler(evt, declarations[i]);
  });

  pins[i].addEventListener('keydown', evt => {
    if (evt.keyCode === 13) {
      pinClickHandler(evt, declarations[i])
    };
  });

  fragment.appendChild(pins[i]);
};

console.log(declarations);
console.log(pins);

let map = document.querySelector('.map');


function typeToRussian(type) {
  if (type === `flat`) {
    return `Квартира`
  } else if (type === `house`) {
    return `Дом`
  } else {
    return `Бунгало`
  }
};




// **************************************

let form = document.querySelector('.notice__form');
let mapPinMain = mapPins.querySelector('.map__pin--main');
form.querySelectorAll('fieldset').disabled = true;


const mapPinMainMouseUpHandler = (evt) => {
  map.classList.remove('map--faded');
  mapPins.appendChild(fragment);
  form.classList.remove('notice__form--disabled');
  form.querySelectorAll('fieldset').disabled = false;
};

mapPinMain.addEventListener('mouseup', (evt) => {
  mapPinMainMouseUpHandler();
});
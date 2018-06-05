(function(){
  let wd = window.data;
  let wu = window.utils;
  // let wc = window.card;


  let declarations = [];
  let declarationsNumber = 8;

  let tempTitle = [...wd.title];

  let pins = [];

  for (let i = 0; i < declarationsNumber; i++) {
    declarations[i] = {};
    Object.defineProperties(declarations[i], {
      location: {
        value: {
          x: wu.getRandomInt(300, 900),
          y: wu.getRandomInt(100, 500)
        }
      },
      author: {
        value: {
          avatar: `img/avatars/user${wu.imageNumber(i+1)}.png`
        }
      },
      offer: {
        value: {
          title: wu.getRandomDifferentElement(tempTitle),
          price: wu.getRandomInt(1000, 1000000),
          type: wu.getRandomElement(wd.houseType),
          checkin: wu.getRandomElement(wd.checkIn),
          checkout: wu.getRandomElement(wd.checkOut),
          rooms: wu.getRandomInt(1, 5),
          guests: wu.getRandomInt(1, 15),
          features: wu.randomFeatures(wd.featuresWords),
          description: '',
          photos: [],
        }
      }
    });
    declarations[i].offer.address = `${declarations[i].location.x}, ${declarations[i].location.y}`;

    pins[i] = document.createElement('button');
    pins[i].tabIndex = '0';
    pins[i].onfocus = () => {
      this.focused = true;
    };
    pins[i].onblur = () => {
      this.focused = false;
    };
    pins[i].style.left = String(declarations[i].location.x + 20) + 'px';
    pins[i].style.top = String(declarations[i].location.y + 40) + 'px';
    pins[i].className = 'map__pin';
    pins[i].innerHTML = `<img src="${declarations[i].author.avatar}" width="40" height="40" draggable="false">`;

    pins[i].addEventListener('click', (evt) => {
      window.card.pinClickHandler(evt, declarations[i]);
    });

    pins[i].addEventListener('keydown', evt => {
      if (evt.keyCode === 13) {
        window.card.pinClickHandler(evt, declarations[i]);
      }
    });
    wd.fragment.appendChild(pins[i]);
  }

  window.pin = {
    pins: pins,
  };

})();
(function () {
  let wd = window.data;
  let wu = window.utils;
  let pins = window.pin.pins;
  let map = wd.map;

  window.card = {

    pinClickHandler: function (evt, declaration) {
      let mapCard = wd.template.cloneNode(true);
      closePopUp();
      removeActivePin(pins);
      if (evt.currentTarget.classList.contains('map__pin')) {
        evt.currentTarget.classList.add('map__pin--active');
      }
      mapCard.querySelector('h3').innerText = declaration.offer.title;
      mapCard.querySelector('p:nth-of-type(1)>small').innerText = declaration.offer.address;
      mapCard.querySelector('.popup__price').innerHTML = `${declaration.offer.price}` + ' &#x20bd;/ночь';
      mapCard.querySelector('h4').innerText = wu.typeToRussian(declaration.offer.type);
      mapCard.querySelector('p:nth-of-type(3)').innerText = `${declaration.offer.rooms} для ${declaration.offer.guests} гостей`;
      mapCard.querySelector('p:nth-of-type(4)').innerText = `Заезд после ${declaration.offer.checkIn}, выезд до ${declaration.offer.checkout}`;
      for (let i = 0; i < declaration.offer.features.length; i++) {
        let li = document.createElement('li');
        li.className = `feature feature--${declaration.offer.features[i]}`;
        mapCard.querySelector('.popup__features').appendChild(li);
      }
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
        }
      });
      document.addEventListener('keydown', (evt) => {
        closePopUpViaESC(evt);
        removeActivePin(pins);
      });
    },

  };

  const closePopUp = () => {
    if (map.contains(map.querySelector('.map__card'))) {
      map.removeChild(map.querySelector('.map__card'));
    }
  };

  const closePopUpViaESC = (evt) => {
    if (evt.keyCode === 27 && map.contains(map.querySelector('.map__card'))) {
      map.removeChild(map.querySelector('.map__card'));
    }
  };

  const removeActivePin = (arr) => {
    arr.forEach(item => {
      item.classList.remove('map__pin--active');
    });
  };
})();
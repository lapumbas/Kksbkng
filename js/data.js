'use strict';

(() => {
  window.data = {
    title: [
      'Большая уютная квартира',
      'Маленькая неуютная квартира',
      'Огромный прекрасный дворец',
      'Маленький ужасный дворец',
      'Красивый гостевой домик',
      'Некрасивый негостеприимный домик',
      'Уютное бунгало далеко от моря',
      'Неуютное бунгало по колено в воде'
    ],
    houseType: [
      'flat',
      'bungalo',
      'house',
      'palace'
    ],
    checkIn: [
      '12:00',
      '13:00',
      '14:00'
    ],
    checkOut: [
      '12:00',
      '13:00',
      '14:00'
    ],
    featuresWords: [
      'wifi',
      'dishwasher',
      'parking',
      'washer',
      'elevator',
      'conditioner'
    ],

    TOP_BORDER: 100,
    BOTTOM_BORDER: 500,

    mapPins: document.querySelector('.map__pins'),
    fragment: document.createDocumentFragment(),
    template: document.querySelector('template').content.querySelector('.map__card'),
    map: document.querySelector('.map'),
    form: document.querySelector('.notice__form'),
    mapPinMain: document.querySelector('.map__pin--main'),
    myHouseType: document.querySelector('#type'),
    myPrice: document.querySelector('#price'),
    myTimeIn: document.querySelector('#timein'),
    myTimeOut: document.querySelector('#timeout'),

  };
})();
(function () {

  let wd = window.data;
  // let wu = window.utils;
  // let wc = window.card;
  // let wp = window.pin;


  // **************************************


  let pinMainCoords = {
    x: 0,
    y: 0
  };

  wd.form.querySelectorAll('fieldset').disabled = true;

  const mapPinMainMouseUpHandler = () => {
    wd.map.classList.remove('map--faded');
    wd.mapPins.appendChild(wd.fragment);
    wd.form.classList.remove('notice__form--disabled');
    wd.form.querySelectorAll('fieldset').disabled = false;
  };

  wd.mapPinMain.addEventListener('click', () => {
    mapPinMainMouseUpHandler();
  });

  wd.mapPinMain.addEventListener('mousedown', (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    let address = wd.form.querySelector('#address');

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      if ((moveEvt.clientY - parseInt(getComputedStyle(wd.mapPinMain, null).height) <= wd.BOTTOM_BORDER) 
      && (moveEvt.clientY - parseInt(getComputedStyle(wd.mapPinMain, null).height)) >= wd.TOP_BORDER) {

        let shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY,
        };


        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY,
        };

        wd.mapPinMain.style.top = `${wd.mapPinMain.offsetTop - shift.y}px`;
        wd.mapPinMain.style.left = `${wd.mapPinMain.offsetLeft - shift.x}px`;
      }
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      pinMainCoords.x = upEvt.clientX - Math.floor((parseInt(getComputedStyle(wd.mapPinMain, null).width)) / 2);
      pinMainCoords.y = upEvt.clientY - parseInt(getComputedStyle(wd.mapPinMain, null).height);
      address.value = `x: ${pinMainCoords.x}, y: ${pinMainCoords.y}`;
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

  });

})();
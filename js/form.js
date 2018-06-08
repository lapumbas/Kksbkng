(function () {
  let wd = window.data;
  // let wu = window.utils;
  // let wc = window.card;
  // let wp = window.pin;



  function minPrice(element, value) {
    element.min = value;
    element.placeholder = value;
  }

  function myTime(element, value) {
    for (let i = 0; i < element.children.length; i++) {
      if (element.children[i].value == value) {
        element.children[i].selected = true;
      }
    }
  }

  window.synchronizeFields(wd.myHouseType, wd.myPrice, wd.houseType, [1000, 2000, 3000, 4000], minPrice);
  window.synchronizeFields(wd.myTimeIn, wd.myTimeOut, wd.checkIn, wd.checkOut, myTime);

  window.data.form.addEventListener('submit', evt => {
    evt.preventDefault();
    let formData = new FormData(window.data.form);
    window.uploadData(formData, onLoad, onError);
  });

  function onLoad(response) {
    console.log('***** sucsess +++++');
    console.log(response);
    window.data.form.reset();
  }

  function onError(status) {
    console.error(status);
  }



})();
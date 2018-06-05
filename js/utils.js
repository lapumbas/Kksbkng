(function(){
  window.utils = {

    imageNumber: function (n) {
      let stringN = String(n);
      while (stringN.length < 2) {
        stringN = '0' + stringN;
      }
      return stringN;
    },    

    getRandomDifferentElement: function (arr) {
      return arr.splice([(Math.floor(Math.random() * arr.length))], 1).join();
    },    

    getRandomElement: function (arr) {
      return arr[(Math.floor(Math.random() * arr.length))];
    },

    randomFeatures: (arr) => {
      let innerArr = [...arr];
      let result = [];
      for (let i = 0; i < window.utils.getRandomInt(1, arr.length); i++) {
        result.push(window.utils.getRandomDifferentElement(innerArr));
      }
      return result;
    },    

    getRandomInt: (min, max) => {
      return Math.floor(Math.random() * (max - min)) + min;
    },

    typeToRussian: (type) => {
      if (type === 'flat') {
        return 'Квартира';
      } else if (type === 'house') {
        return 'Дом';
      } else {
        return 'Бунгало';
      }
    },
    
  };
})();
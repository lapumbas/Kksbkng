(() => {

  window.synchronizeFields = (input1, input2, arr1, arr2, callback) => {
    input1.addEventListener('change', () => {
      callback(input2, value(input1, arr1, arr2));
    });

    function value(input1, arr1, arr2) {
      let result = 0;
      arr1.forEach((item, index) => {
        if (input1.value == item) {
          result = arr2[index];
        }
      });
      return result;
    }
  };

})();
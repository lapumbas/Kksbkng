(() => {

  window.downloadData = (onLoad, onError) => {
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', () => {
      let error;
      switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 404:
        error = '404';
        break;
      case 401:
        error = '401';
        break;
      default:
        error = `Неизвестный статус status:${xhr.status} statusText:${xhr.statusText}`;
      }
      if (error) onError(error);
    });

    xhr.addEventListener('error', () => {
      onError('Произошла ошибка соединентия');
    });

    xhr.addEventListener('timeout', () => {
      onError('Превышено время ожидания');
    });

    xhr.timeout = 1000;
    xhr.open('GET', 'https://js.dump.academy/keksobooking/data');
    xhr.send();
  };

  window.uploadData = (data, onLoad, onError) => {
    const URL = 'https://js.dump.academy/keksobooking';
    let xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.addEventListener('load', () => {
      switch (xhr.status) {
      case 200:
        onLoad(xhr.response);
        break;
      case 400:
        onError(xhr.status);
        break;
      case 500:
        onError(xhr.status);
        break;
      default:
        onError(xhr.status);        
      }
    });    

    xhr.open('POST', URL);
    xhr.send(data);
  };


})();
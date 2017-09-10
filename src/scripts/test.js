((() => {
  const getJSON = (url, callback) => {
    const xhr = new XMLHttpRequest();
    xhr.open('get', url, true);
    xhr.responseType = 'json';
    xhr.onload = () => {
      const status = xhr.status;
      if (status === 200) {
        callback(null, xhr.response);
      } else {
        callback(status);
      }
    };
    xhr.send();
  };

  const blogTitle = document.querySelector('.blog-title');
  const blogText = document.querySelector('.blog-text');
  const blogDate = document.querySelector('.blog-date');
  const blogImage = document.querySelector('.blog-image');

  getJSON('/test-data.json', (err, data) => {
    if (err != null) {
      return false;
    } else {
      blogImage.src = data.image;
      blogTitle.innerText = data.title;
      blogText.innerText = data.text;
      blogDate.innerText = data.date;
    }
  });
}))();

(function() {
  'use strict';

  let blogTitle = document.querySelector('.blog-title');
  let titleText = document.createTextNode('Mister Mercedes');

  blogTitle.appendChild(titleText);

  let blogText = document.querySelector('.blog-text');
  let textText = document.createTextNode('Many jobless people are standing in line for a job fair when a Mercedes plows into the crowd killing 8 people and severely injuring many. Bill Hodges, a recently retired detective from the local police department living the life of a retiree, receives a letter from an individual claiming to be the person responsible for the job fair incident, referring to himself as "Mr.Mercedes".');

  setTimeout(function() { blogText.appendChild(textText) }, 3400);

  let blogDate = document.querySelector('.blog-date');
  let dateText = document.createTextNode('23 december 2017');

  setTimeout(function() { blogDate.appendChild(dateText) }, 2000);

})();

(function() {
  'use strict';

  // type of(el) - dom object
  function assignClass(el, dataObj) {
    for (let key in dataObj) {
      if (el.tagName === key) {
        el.classList.add(dataObj[key]);
      }
    }
  }

  const classesForTags = {
    'P': 'until-text',
    'IMG': 'until-img',
    'H1': 'until-title-h1',
    'H2': 'until-title-h2'
  };

  let untilLoad = document.querySelectorAll('[data-attribute="untilLoad"]');
  untilLoad = Array.prototype.slice.call(untilLoad, 0);

  untilLoad.forEach(el => {
    let untilLoadChildren = el.getElementsByTagName('*');
    untilLoadChildren = Array.prototype.slice.call(untilLoadChildren, 0);

    untilLoadChildren.forEach(el => {
      assignClass(el, classesForTags);
    });
  });

})();

(function() {
  'use strict';

  let blogTitle = document.querySelector('.blog-title');
  let titleText = document.createTextNode('Mister Mercedes');

  setTimeout(function() {
    blogTitle.appendChild(titleText);
  }, 1330);

  let blogText = document.querySelector('.blog-text');
  let textText = document.createTextNode('Many jobless people are standing in line for a job fair when a Mercedes plows into the crowd killing 8 people and severely injuring many. Bill Hodges, a recently retired detective from the local police department living the life of a retiree, receives a letter from an individual claiming to be the person responsible for the job fair incident, referring to himself as "Mr.Mercedes".');

  setTimeout(function() {
    blogText.appendChild(textText);
  }, 1120);

  let blogDate = document.querySelector('.blog-date');
  let dateText = document.createTextNode('23 december 2017');

  setTimeout(function() {
    blogDate.appendChild(dateText);
  }, 3330);
})();

import 'jss';
import { StyleSheet, css } from 'aphrodite-jss';

((() => {
  let untilLoad = document.querySelectorAll('[data-attribute="untilLoad"]');
  untilLoad = Array.prototype.slice.call(untilLoad);

  let inlineChunk = [];
  let blockChunk = [];

  untilLoad.forEach((el) => {
    let untilLoadChildren = untilLoad.slice.call(el.children, 0);

    untilLoadChildren.forEach((el) => {
      let computedType = window.getComputedStyle(el).display.toString();

      if (computedType === 'block') {
        blockChunk.push(el);
      } else {
        inlineChunk.push(el);
      }
    });
  });

  blockChunk.forEach((el) => {
    let placeholderHeigth = window.getComputedStyle(el).lineHeight;

    const sheet = StyleSheet.create({
      placeholder: {
        backgroundColor: 'currentColor',
        opacity: '.2',
        width: '100%',
        height: placeholderHeigth,
        fontSize: 33
      }
    });

    let placeholder = `<div class="${css(sheet.placeholder)}"></div>`;

    el.innerHTML += placeholder;
  });

  // console.log(blockChunk, inlineChunk);
}))();

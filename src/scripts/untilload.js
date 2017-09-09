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
      let placeholderHeigth = window.getComputedStyle(el).lineHeight;

      const sheet = StyleSheet.create({
        placeholder: {
          '&:empty': {
            backgroundColor: 'currentColor',
            opacity: '.2',
            overflow: 'hidden',
            width: 'auto',
            height: placeholderHeigth
          }
        }
      });

      let computedType = window.getComputedStyle(el).display.toString();

      if (computedType === 'block') {
        blockChunk.push(el);
        el.classList.add(`${css(sheet.placeholder)}`);
      } else {
        inlineChunk.push(el);
      }
    });
  });

  console.log(blockChunk, inlineChunk);
}))();

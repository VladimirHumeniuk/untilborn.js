import 'jss';
import { StyleSheet, css } from 'aphrodite-jss';

((() => {
  let untilLoad = document.querySelectorAll('[data-attribute="untilLoad"]');
  untilLoad = Array.prototype.slice.call(untilLoad);

  untilLoad.forEach((el) => {
    let untilLoadChildren = untilLoad.slice.call(el.children, 0);

    untilLoadChildren.forEach((el) => {
      const placeholderHeigth = window.getComputedStyle(el).lineHeight;
      const imageWidth = window.getComputedStyle(el).maxWidth.toString();
      const imageHeight = window.getComputedStyle(el).maxHeight.toString();
      const imageMinHeight = el.offsetHeight;

      const sheet = StyleSheet.create({
        placeholder: {
          '&:empty': {
            backgroundColor: 'currentColor',
            filter: 'brightness(380%)',
            overflow: 'hidden',
            width: 'auto',
            height: placeholderHeigth
          }
        },
        placeholderImage: {
          display: 'inline-block',
          filter: 'brightness(380%)',
          backgroundColor: 'currentColor',
          width: imageWidth,
          height: imageHeight === 'none' ? 'auto' : imageHeight,
          minHeight: imageMinHeight
        },
        hidden: {
          display: 'none'
        }
      });

      const imagePlaceholder = document.createElement('div');
      imagePlaceholder.classList.add(`${css(sheet.placeholderImage)}`);

      const image = el.hasAttribute('src');

      if (image) {
        el.classList.add(`${css(sheet.hidden)}`);
        el.parentNode.insertBefore(imagePlaceholder, el);
      } else {
        el.classList.add(`${css(sheet.placeholder)}`);
      }
    });
  });
}))();

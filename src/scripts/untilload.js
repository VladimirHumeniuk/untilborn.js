import 'jss';
import { StyleSheet, css } from 'aphrodite-jss';

((() => {
  let untilLoad = document.querySelectorAll('[data-attribute="untilLoad"] *');

  untilLoad = Array.from(untilLoad);

  untilLoad.forEach((el) => {
    const placeholderWidth = window.getComputedStyle(el).width;
    const placeholderMaxWidth = window.getComputedStyle(el).maxWidth;
    const placeholderMargin = window.getComputedStyle(el).marginBottom;
    const placeholderHeigth = window.getComputedStyle(el).lineHeight;

    const imageMargin = window.getComputedStyle(el).fontSize;

    const sheet = StyleSheet.create({
      placeholder: {
        position: 'relative',
        background: 'linear-gradient(to right, currentColor, transparent)',
        opacity: 0.5,
        width: placeholderWidth === 'none' ? 'auto' : placeholderWidth,
        maxWidth: placeholderMaxWidth === 'none' ? '100%' : placeholderMaxWidth,
        height: placeholderHeigth,
        marginBottom: placeholderMargin
      },
      placeholderImage: {
        background: 'linear-gradient(to right, currentColor, transparent)',
        marginBottom: imageMargin,
        opacity: 0.5,
        '& img': {
          opacity: 0
        }
      },
      untilLoad: {
        display: 'none'
      }
    });

    HTMLElement.prototype.wrap = function(wrapper) {
      this.parentNode.insertBefore(wrapper, this);
      wrapper.appendChild(this);
    };

    const image = el.hasAttribute('src');
    const placeholder = document.createElement('div');
    placeholder.className = `${css(sheet.placeholder)}`;

    const placeholderImage = document.createElement('div');
    placeholderImage.className = `${css(sheet.placeholderImage)}`;

    if (image) {
      el.wrap(placeholderImage);
    } else if (!el.children.length) {
      el.classList.add(`${css(sheet.untilLoad)}`);
      el.parentNode.insertBefore(placeholder, el);
    }
  });
}))();

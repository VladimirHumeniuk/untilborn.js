((() => {
  let untilLoad = document.querySelectorAll('[data-attribute="untilLoad"]');
  untilLoad = Array.prototype.slice.call(untilLoad);

  let inlineChunk = [];
  let blockChunk = [];

  untilLoad.forEach(el => {
    let untilLoadChildren = Array.prototype.slice.call(el.children, 0);

    untilLoadChildren.forEach(el => {
      let computedType = window.getComputedStyle(el).display.toString();

      if (computedType === 'block') {
        blockChunk.push(el);
      } else {
        inlineChunk.push(el);
      }
    });
  });

  console.log(blockChunk, inlineChunk);
}))();

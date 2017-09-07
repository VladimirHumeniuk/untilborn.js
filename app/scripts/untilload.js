((() => {
  let untilLoad = document.querySelectorAll('[data-attribute="untilLoad"]');
  untilLoad = Array.prototype.slice.call(untilLoad['0'].children);

  let inlineChunk = [];
  let blockChunk = [];

  for (let i = 0; i < untilLoad.length; i++) {
    let computedType = window.getComputedStyle(untilLoad[i]).display.toString();

    if (computedType === 'block') {
      blockChunk.push(untilLoad[i]);
    } else {
      inlineChunk.push(untilLoad[i]);
    }
  }

  console.log(blockChunk, inlineChunk);
}))();

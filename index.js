const myWorker = new Worker('./worker.js');

const wave1 = "M0 108.306L50 114.323C100 120.34 200 132.374 300 168.476C400 204.578 500 264.749 600 246.698C700 228.647 800 132.374 900 108.306C1000 84.2382 1100 132.374 1150 156.442L1200 180.51V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V108.306Z",
      wave2 = "M0 250L50 244.048C100 238.095 200 226.19 300 226.19C400 226.19 500 238.095 600 232.143C700 226.19 800 202.381 900 196.429C1000 190.476 1100 202.381 1150 208.333L1200 214.286V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V250Z",
      wave3 = "M0 250L50 238.095C100 226.19 200 202.381 300 166.667C400 130.952 500 83.3333 600 101.19C700 119.048 800 202.381 900 214.286C1000 226.19 1100 166.667 1150 136.905L1200 107.143V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V250Z",
      wave4 = "M0 125L50 111.111C100 97.2222 200 69.4444 300 97.2222C400 125 500 208.333 600 236.111C700 263.889 800 236.111 900 229.167C1000 222.222 1100 236.111 1150 243.056L1200 250V0H1150C1100 0 1000 0 900 0C800 0 700 0 600 0C500 0 400 0 300 0C200 0 100 0 50 0H0V125Z";

anime({
  targets: '.wave-top > path',
  easing: 'linear',
  duration: 7500,
  loop: true,
  d: [
    { value: [wave1, wave2] },
    { value: wave3 },
    { value: wave4 },
    { value: wave1 },
  ],
});


const bubbleSort = (range) => {
  var a = [];
  const beforePush = performance.now();
  for (var i = range; i >= 0; i--) {
      a.push(i);
  };
  const afterPush = performance.now();
  const beforeSort = performance.now();
  var swapped;
  do {
      swapped = false;
      for (var i=0; i < a.length-1; i++) {
          if (a[i] > a[i+1]) {
              var temp = a[i];
              a[i] = a[i+1];
              a[i+1] = temp;
              swapped = true;
          }
      }
  } while (swapped);
  const afterSort = performance.now();
  const loadTime = afterPush - beforePush;
  const sortTime = afterSort - beforeSort;
  const totalTime = loadTime + sortTime;
  return {
    loadTime,
    sortTime,
    totalTime,
  };
}

$('.withWebWorker').on('click', function () {
  const range = Number($('#range').val());
  showprogress();
  myWorker.postMessage({action: 'bubbleSort', range});
});

$('.withoutWebWorker').on('click', function () {
  const range = Number($('#range').val());
  showprogress();
  const dt = bubbleSort(range);
  loadResult(dt);
});

myWorker.onmessage = (e) => { 
  loadResult(e.data);
};

myWorker.addEventListener('error', console.error);

const loadResult = (data) => {
  const resultString = `<div class="result"><h3><strong>Load Time: </strong>${Math.round(data.loadTime)} ms</h3>
  <h3><strong>Sort Time: </strong>${Math.round(data.sortTime)} ms</h3>
  <h3><strong>Total Time: </strong>${Math.round(data.totalTime)} ms</h3></div>`;
  $('.fancy-spinner').hide();
  $('.result-container').append(resultString);
  $('.result-container').show();
};

const showprogress = () => {
  $('.result').hide();
  $('.result-container').show();
  $('.fancy-spinner').show();
};

$(() => {
  $('.fancy-spinner').hide();
  // $('.result-container').hide();
});
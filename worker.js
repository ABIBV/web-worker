self.onmessage = (e) => {
  const { data } = e;
  switch(data.action) {
    case 'bubbleSort': 
      const dt = bubbleSort(data.range);
      self.postMessage(dt);
      break;
    default: break;
  }
};

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
};

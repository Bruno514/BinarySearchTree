export default function mergeSort(array) {
  if (array.length === 1) {
    return array;
  }

  const halfPos = Math.trunc(array.length / 2);

  const leftArray = mergeSort(array.slice(0, halfPos));
  const rightArray = mergeSort(array.slice(halfPos));

  const arrayCopy = [...array];

  for (let i = 0; i < arrayCopy.length; i++) {
    const leftFirstItem = leftArray[0];
    const rightFirstItem = rightArray[0];

    if (leftFirstItem < rightFirstItem) {
      arrayCopy[i] = leftArray.shift();
    } else if (rightFirstItem < leftFirstItem || leftFirstItem === undefined) {
      arrayCopy[i] = rightArray.shift();
    } else {
      arrayCopy[i] = leftArray.shift();
    }
  }

  if (rightArray.length === 1) {
    // push remaining item from right array
    arrayCopy.push(rightArray.shift());
  }

  return arrayCopy;
}

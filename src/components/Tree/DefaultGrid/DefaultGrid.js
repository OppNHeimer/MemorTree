import TreeUnit from '../TreeUnit/TreeUnit.js'


const makeDefaultGrid = () => {
  let defaultGrid = []
  let n = 0 //row number

  //creates default objects for each grid unit
  for (var i = 0; i < 40401; i++) {

    //increments n by 1 every row
    if (i % 201 === 0) {
      n += 1
    }

    let xNum = i + 101 - n * 201 //calculates x-index
    let yNum = (n - 101) * -1 //calculates y-index

    let newUnit = new TreeUnit(xNum, yNum, )
    defaultGrid.push(newUnit)
  }
  return defaultGrid
}

export default makeDefaultGrid



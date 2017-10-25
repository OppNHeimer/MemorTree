function Node (length, direction, parent = null) {
  this.parent = parent
  this.childLeft = null
  this.childRight = null
  this.length = length
  this.direction = direction
  this.start = this.parent ? [this.parent.end[0], this.parent.end[1]] : [0, -50]
  this.end = [this.start[0] + length * direction[0], this.start[1] + length * direction[1]]
}

// function TreeStructure (length, direction) {
//   var node = new Node(length, direction)
//   this._root = node
//   this.heads = [node]
// }

//horizontal branches need to push to reserved spaces and diagonal branches need to check
function GenerateTree(depth,/* length,*/ direction) {
  this.reservedCoordinates = []
  this.root = growTrunk(depth,/* length,*/ direction)
  // console.log(this.reservedCoordinates)
  return this.root
}

function growTrunk (depth,/* length,*/ direction, parent) {
  let currentNode = checks(depth,/* length,*/ direction, parent)
  if (depth > 1 && currentNode) {
    let doesSplit = randomInt(0, 1)
    if (doesSplit) {
      currentNode.childLeft = growTrunk(depth - 1,/* length,*/ [0, 1], currentNode)
      let rightOrLeft = randomInt(0, 1)
      if (rightOrLeft) {
        currentNode.childRight = growRightBranches(depth - 1,/* length,*/ [1, 0], currentNode)
      } else {
        currentNode.childRight = growLeftBranches(depth - 1,/* length,*/ [-1, 0], currentNode)
      }
    } else {
      let rightOrLeft = randomInt(0, 1)
      if (rightOrLeft) {
        currentNode.childRight = growTrunk(depth - 1,/* length,*/ [1, 1], currentNode)
      } else {
        currentNode.childLeft = growTrunk(depth - 1,/* length,*/ [-1, 1], currentNode)
      }
    }
  }
  return currentNode
}

function growRightBranches(depth,/* length,*/ direction, parent) {
  let currentNode = checks(depth,/* length,*/ direction, parent)
  if (depth > 1 && currentNode) {
    let doesSplit = randomInt(0, 1)
    if (doesSplit) {
      currentNode.childLeft = growRightBranches(depth - 1,/* length,*/ [1, 1], currentNode)
      currentNode.childRight = growRightBranches(depth - 1,/* length,*/ [1, 0], currentNode)
    } else {
      let leftOrRight = randomInt(0, 1)
      if (leftOrRight) {
        currentNode.childLeft = growRightBranches(depth - 1,/* length,*/ [1, 0], currentNode)
      } else {
        currentNode.childLeft = growRightBranches(depth - 1,/* length,*/ [1, 1], currentNode)
      }
    }
  }
  return currentNode
} 

function growLeftBranches(depth,/* length,*/ direction, parent) {
  let currentNode = checks(depth,/* length,*/ direction, parent)
  if (depth > 1 && currentNode) {
    let doesSplit = randomInt(0, 1)
    if (doesSplit) {
      currentNode.childLeft = growLeftBranches(depth - 1,/* length,*/ [-1, 0], currentNode)
      currentNode.childRight = growLeftBranches(depth - 1,/* length,*/ [-1, 1], currentNode)
    } else {
      let leftOrRight = randomInt(0, 1)
      if (leftOrRight) {
        currentNode.childLeft = growLeftBranches(depth - 1,/* length,*/ [-1, 1], currentNode)
      } else {
        currentNode.childLeft = growLeftBranches(depth - 1,/* length,*/ [-1, 0], currentNode)
      }
    }
  }
  return currentNode
} 

function checks(depth,/* length,*/ direction, parent) {
  if (depth <= 1) return false //ends recursion at 0
  let currentNode = new Node(depth, direction, parent)
  //checks new coordinates against existing ones
  if (checkCoordinates(currentNode.start, currentNode.direction, currentNode.length) === false) return false
  //ends recursion if new node will overlap with existing tree
  let newReservedCoordinates = makeReservedCoordinates(currentNode.start, currentNode.direction, currentNode.length)
  //adds new coordinates to list of reserved ones
  this.reservedCoordinates = this.reservedCoordinates.concat(newReservedCoordinates)
  // console.log(this.reservedCoordinates)
  return currentNode
}

//takes branch info and checks new coordinates against existing ones
function checkCoordinates (startCoordinate, direction, length) {
  let noOverlap = true
  let newCoordinates = []
  for (let i = 0; i < length; i++) {
    let newCoordinate = [startCoordinate[0] + i * direction[0], startCoordinate[1] + i * direction[1]]
    // console.log(this.reservedCoordinates)
    this.reservedCoordinates.forEach(coordinate => {
      let reservedX = coordinate[0]
      let reservedY = coordinate[1]
      let newX = newCoordinate[0]
      let newY = newCoordinate[1]
      if (reservedX === newX && reservedY === newY) {
        noOverlap = false
        console.log('false')
      }
    })
    if (noOverlap) newCoordinates.push(newCoordinate)
  }
  if (noOverlap) return true
  else return false
}

function makeReservedCoordinates (startCoordinate, direction, length) {
  let newReservedCoordinates = []
  for (let i = 0; i < length; i++) {
    if (direction[1] === 0) {
      console.log('horizontal')
      newReservedCoordinates.push([startCoordinate[0] + i * direction[0], (startCoordinate[1] + i * direction[1]) - 1])
    }
    if (direction[0] === -1 && direction[1] === 1) {
      newReservedCoordinates.push([(startCoordinate[0] + i * direction[0]) + 1, startCoordinate[1] + i * direction[1]])
    }
    if (direction[0] === 1 && direction[1] === 1) {
      newReservedCoordinates.push([(startCoordinate[0] + i * direction[0]) - 1, startCoordinate[1] + i * direction[1]])
    }
  }
  return newReservedCoordinates
}

function randomInt (min, max) {
  //maximum and minimum are inclusive
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min 
}

module.exports = {GenerateTree, Node}

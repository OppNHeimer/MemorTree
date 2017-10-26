function Node (length, direction, parent = null) {
  this.parent     = parent
  this.childLeft  = null
  this.childRight = null
  this.length     = Math.ceil(length)
  this.direction  = direction
  this.start      = this.parent ? [this.parent.end[0], this.parent.end[1]] : [0, -50]
  this.end        = [this.start[0] + Math.ceil(length) * direction[0], this.start[1] + Math.ceil(length) * direction[1]]
}

function GenerateTree(depth, length, sub, direction) {
  this.reservedCoordinates = []
  this.root = growTrunk(depth, length, sub, direction)
  return this.root
}

function growTrunk (depth, length, sub, direction, parent = null) {
  let currentNode = new Node(length, direction, parent)
  let grow        = doesGrow(currentNode)

  if (currentNode.parent) console.log(currentNode.parent.direction)

  if (depth > 1 && grow) {
    let nextDepth  = depth - 1
    let nextLength = length - 1/sub
    let nextSub    = sub
    if (length === sub - 1) nextSub = sub - 1

    let doesSplit = randomInt(0, 1)
    let rightOrLeft = randomInt(0, 1)

    if (currentNode.direction[0] === -1) {
      if (doesSplit) {
        currentNode.childRight = growTrunk(nextDepth, nextLength, nextSub, [0, 1], currentNode)
        currentNode.childLeft = growLeftBranches(nextDepth, nextLength, nextSub, [-1, 1], currentNode)
      } else {
        if (rightOrLeft) {
          currentNode.childRight = growTrunk(nextDepth, nextLength, nextSub, [0, 1], currentNode)
        } else {
          currentNode.childLeft = growTrunk(nextDepth, nextLength, nextSub, [-1, 1], currentNode)
        }
      }
    }
    if (currentNode.direction[0] === 0) {
      if (doesSplit) {
        currentNode.childLeft = growTrunk(nextDepth, nextLength, nextSub, [0, 1], currentNode)
        if (rightOrLeft) {
          currentNode.childRight = growRightBranches(nextDepth, nextLength, nextSub, [1, 0], currentNode)
        } else {
          currentNode.childRight = growLeftBranches(nextDepth, nextLength, nextSub, [-1, 0], currentNode)
        }
      } else {
        if (rightOrLeft) {
          currentNode.childRight = growTrunk(nextDepth, nextLength, nextSub, [1, 1], currentNode)
        } else {
          currentNode.childLeft = growTrunk(nextDepth, nextLength, nextSub, [-1, 1], currentNode)
        }
      }
    }
    if (currentNode.direction[0] === 1) {
      if (doesSplit) {
        currentNode.childLeft = growTrunk(nextDepth, nextLength, nextSub, [0, 1], currentNode)
        currentNode.childRight = growRightBranches(nextDepth, nextLength, nextSub, [1, 1], currentNode)
      } else {
        if (rightOrLeft) {
          currentNode.childLeft = growTrunk(nextDepth, nextLength, nextSub, [0, 1], currentNode)
        } else {
          currentNode.childRight = growTrunk(nextDepth, nextLength, nextSub, [1, 1], currentNode)
        }
      }
    }  
  }
  return currentNode
}

function growRightBranches(depth, length, sub, direction, parent) {
  let currentNode = new Node(length, direction, parent)
  let grow = doesGrow(currentNode)  
  if (depth > 1 && grow) {
    let nextDepth = depth - 1
    let nextLength = length - 1 / sub
    let nextSub = sub
    if (length === sub - 1) nextSub = sub - 1
    let doesSplit = randomInt(0, 1)
    if (doesSplit) {
      currentNode.childLeft = growRightBranches(nextDepth, nextLength, nextSub, [1, 1], currentNode)
      currentNode.childRight = growRightBranches(nextDepth, nextLength, nextSub, [1, 0], currentNode)
    } else {
      let leftOrRight = randomInt(0, 1)
      if (leftOrRight) {
        currentNode.childLeft = growRightBranches(nextDepth, nextLength, nextSub, [1, 0], currentNode)
      } else {
        currentNode.childLeft = growRightBranches(nextDepth, nextLength, nextSub, [1, 1], currentNode)
      }
    }
  }
  return currentNode
} 

function growLeftBranches(depth, length, sub, direction, parent) {
  let currentNode = new Node(length, direction, parent)
  let grow = doesGrow(currentNode)  
  if (depth > 1 && grow) {
    let nextDepth = depth - 1
    let nextLength = length - 1 / sub
    let nextSub = sub
    if (length === sub - 1) nextSub = sub - 1
    let doesSplit = randomInt(0, 1)
    if (doesSplit) {
      currentNode.childLeft = growLeftBranches(nextDepth, nextLength, nextSub, [-1, 0], currentNode)
      currentNode.childRight = growLeftBranches(nextDepth, nextLength, nextSub, [-1, 1], currentNode)
    } else {
      let leftOrRight = randomInt(0, 1)
      if (leftOrRight) {
        currentNode.childLeft = growLeftBranches(nextDepth, nextLength, nextSub, [-1, 1], currentNode)
      } else {
        currentNode.childLeft = growLeftBranches(nextDepth, nextLength, nextSub, [-1, 0], currentNode)
      }
    }
  }
  return currentNode
} 

function doesGrow (node) {
  if (node.depth <= 1) return false //ends recursion at 0
  // let currentNode = new Node (length, direction, parent = null)
    //checks new coordinates against existing ones
  if (checkCoordinates(node.start, node.direction, node.length) === false) return false
    //ends recursion if new node will overlap with existing tree
  let newReservedCoordinates = makeReservedCoordinates(node.start, node.direction, node.length)
    //adds new coordinates to list of reserved ones
  this.reservedCoordinates = this.reservedCoordinates.concat(newReservedCoordinates)
  return true
}

//takes branch info and checks new coordinates against existing ones
function checkCoordinates (startCoordinate, direction, length) {
  let noOverlap = true
  for (let i = 0; i < length; i++) {
    let newCoordinate = [startCoordinate[0] + i * direction[0], startCoordinate[1] + i * direction[1]]
    this.reservedCoordinates.forEach(coordinate => {
      let reservedX = coordinate[0]
      let reservedY = coordinate[1]
      let newX = newCoordinate[0]
      let newY = newCoordinate[1]
      if (reservedX === newX && reservedY === newY) {
        // console.log('overlap')
        noOverlap = false
      } 
      // else {console.log('ok')}
    })
  }
  return noOverlap
}
  // adds to array of reserved coordinates
function makeReservedCoordinates (startCoordinate, direction, length) {
  let newReservedCoordinates = []
  
  for (let i = 0; i < length; i++) {
    let x = startCoordinate[0] + i * direction[0]
    let y = startCoordinate[1] + i * direction[1]
    if (direction[1] === 0) { //horizontal growth
      newReservedCoordinates.push([x - 1, y - 1])
      newReservedCoordinates.push([x + 1, y - 1])
    }
    if (direction[0] === -1 && direction[1] === 1) { //diagonal left growth
      newReservedCoordinates.push([x + 1, y])
    }
    if (direction[0] === 1 && direction[1] === 1) { //diagonal right growth
      newReservedCoordinates.push([x - 1, y])
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

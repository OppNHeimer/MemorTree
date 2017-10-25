function Node (length, direction, parent = null) {
  this.parent = parent
  this.childLeft = null
  this.childRight = null
  this.length = length
  this.direction = direction
  this.start = this.parent ? [this.parent.end[0], this.parent.end[1]] : [0, -25]
  this.end = [this.start[0] + length * direction[0], this.start[1] + length * direction[1]]
}

// function TreeStructure (length, direction) {
//   var node = new Node(length, direction)
//   this._root = node
//   this.heads = [node]
// }

function GenerateTree (depth, length, direction) {
  this.reservedCoordinates = []
  this.root = growTrunk(depth, length, direction)
  console.log(this.reservedCoordinates)
  return this.root
}

function growTrunk (depth, length, direction, parent) {
  let currentNode = checks(depth, length, direction, parent)
  if (depth > 0) {
    let doesSplit = randomInt(0, 1)
    if (doesSplit) {
      currentNode.childLeft = growTrunk(depth - 1, length, [0, 1], currentNode)
      let rightOrLeft = randomInt(0, 1)
      if (rightOrLeft) {
        currentNode.childRight = growRightBranches(depth - 1, length, [1, 0], currentNode)
      } else {
        currentNode.childRight = growLeftBranches(depth - 1, length, [-1, 0], currentNode)
      }
    } else {
      let rightOrLeft = randomInt(0, 1)
      if (rightOrLeft) {
        currentNode.childRight = growTrunk(depth - 1, length, [1, 1], currentNode)
      } else {
        currentNode.childLeft = growTrunk(depth - 1, length, [-1, 1], currentNode)
      }
    }
  }
  return currentNode
}

function growRightBranches (depth, length, direction, parent) {
  let currentNode = checks(depth, length, direction, parent)
  if (depth > 0) {
    let doesSplit = randomInt(0, 1)
    if (doesSplit) {
      currentNode.childLeft = growRightBranches(depth - 1, length, [1, 1], currentNode)
      currentNode.childRight = growRightBranches(depth - 1, length, [1, 0], currentNode)
    } else {
      let leftOrRight = randomInt(0, 1)
      if (leftOrRight) {
        currentNode.childLeft = growRightBranches(depth - 1, length, [1, 0], currentNode)
      } else {
        currentNode.childLeft = growRightBranches(depth - 1, length, [1, 1], currentNode)
      }
    }
  }
  return currentNode
} 

function growLeftBranches(depth, length, direction, parent) {
  let currentNode = checks(depth, length, direction, parent)
  if (depth > 0 && checks) {
    let doesSplit = randomInt(0, 1)
    if (doesSplit) {
      currentNode.childLeft = growLeftBranches(depth - 1, length, [-1, 0], currentNode)
      currentNode.childRight = growLeftBranches(depth - 1, length, [-1, 1], currentNode)
    } else {
      let leftOrRight = randomInt(0, 1)
      if (leftOrRight) {
        currentNode.childLeft = growLeftBranches(depth - 1, length, [-1, 1], currentNode)
      } else {
        currentNode.childLeft = growLeftBranches(depth - 1, length, [-1, 0], currentNode)
      }
    }
  }
  return currentNode
} 

function checks (depth, length, direction, parent) {
  if (depth <= 0) return false //ends recursion at 0
  let currentNode = new Node(length, direction, parent)
  //checks new coordinates against existing ones
  let newCoordinates = checkCoordinates(currentNode.start, currentNode.direction, currentNode.length)
  //ends recursion if new node will overlap with existing tree
  if (newCoordinates === false) return false
  //adds new coordinates to list of reserved ones
  this.reservedCoordinates = this.reservedCoordinates.concat(newCoordinates)
  return currentNode
}

//takes branch info and checks new coordinates against existing ones
function checkCoordinates (startCoordinate, direction, length) {
  let noOverlap = true
  let newCoordinates = []
  for (let i = 0; i < length; i++) {
    let newCoordinate = [startCoordinate[0] + i * direction[0], startCoordinate[1] + i * direction[1]]
    if (this.reservedCoordinates.indexOf(newCoordinate) !== -1) {
      noOverlap = false
      console.log('false')
    } else {
      newCoordinates.push(newCoordinate)
      console.log('true')
    }
  }

  if (noOverlap) return newCoordinates
  else return false
}
// TreeStructure.prototype.growTree = function () {

//   this.heads.forEach( head => {
//     let doesSplit = randomInt(0, 1)
//     if (doesSplit) {
//       this.extendBranch(head, 3, [1,1], [-1,1])

//     } else {
//       this.extendBranch(head, 3, [0,1])
//     }

//   })
// }

// TreeStructure.prototype.extendBranch = function (head, length, direction1, direction2 = null) {
//   let node1 = null
//   let node2 = null
//   if (direction2) {
//     node1 = new Node(length, direction1, head)
//     node2 = new Node(length, direction2, head)
//     head.childLeft = node1
//     head.childRight = node2
//   } else {
//     node1 = new Node(length, direction1, head)
//     head.childLeft = node1
//   }
//   updateHeads = updateHeads.bind(this)
//   updateHeads(head, node1, node2)

// }

// function updateHeads (oldHead, newHead1, newHead2 = null) {
//   let index = this.heads.indexOf(oldHead) //finds old head
//   newHead2 //replaces old head with new head(s)
//     ? this.heads.splice(index, 1, newHead1, newHead2) 
//     : this.heads.splice(index, 1, newHead1) 
// }

function randomInt (min, max) {
  //maximum and minimum are inclusive
  min = Math.ceil(min)
  max = Math.floor(max)
  return Math.floor(Math.random() * (max - min + 1)) + min 
}

module.exports = {GenerateTree, Node}

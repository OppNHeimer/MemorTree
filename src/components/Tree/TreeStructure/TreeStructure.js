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

function GenerateTree (depth, length, direction, parent = null) {
  if (depth <= 0) return null
  let currentNode = new Node(length, direction, parent)
  //check node against occupied cells
  //add new node to occupied cells
  if (depth > 0) {
    let doesSplit = randomInt(0, 1)
    if (doesSplit) {
      currentNode.childLeft = GenerateTree(depth - 1, 3, [-1,1], currentNode)
      currentNode.childRight = GenerateTree(depth - 1, 3, [1, 1], currentNode)
    } else {
      currentNode.childLeft = GenerateTree(depth - 1, 3, [0, 1], currentNode)
    }
  }
  return currentNode
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

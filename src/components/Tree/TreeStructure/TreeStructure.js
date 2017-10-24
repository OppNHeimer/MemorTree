function Node (length, direction, parent = null) {
  this.parent = parent
  this.childLeft = null
  this.childRight = null
  this.length = length
  this.direction = direction
  this.start = this.parent ? [this.parent.end[0], this.parent.end[1]] : [0, -5]
  this.end = [this.start[0] + length * direction[0], this.start[1] + length * direction[1]]
}

function TreeStructure (length, direction) {
  var node = new Node(length, direction)
  this._root = node
  this.heads = [node]
}

// TreeStructure.prototype.growTree = function () {
//   TreeStructure.heads.forEach(head)
// }
TreeStructure.prototype.extendBranchLeft = function (head, length, direction) {
  let node = new Node(length, direction, head)
  head.childLeft = node
  updateHeads = updateHeads.bind(this)
  updateHeads(head, node)
}

TreeStructure.prototype.extendBranchRight = function (head, length, direction) {
  let node = new Node(length, direction, head) 
  head.childRight = node
  updateHeads = updateHeads.bind(this)
  updateHeads(head, node)
}

TreeStructure.prototype.extendBranch = function (head, length, direction1, direction2 = null) {
  let node1 = null
  let node2 = null
  if (direction2) {
    node1 = new Node(length, direction1, head)
    node2 = new Node(length, direction2, head)
    head.childLeft = node1
    head.childRight = node2
  } else {
    node1 = new Node(length, direction1, head)
    head.childLeft = node1
  }
  updateHeads = updateHeads.bind(this)
  updateHeads(head, node1, node2)
}

function updateHeads (oldHead, newHead1, newHead2 = null) {
  let index = this.heads.indexOf(oldHead) //finds old head
  newHead2 //replaces old head with new head(s)
    ? this.heads.splice(index, 1, newHead1, newHead2) 
    : this.heads.splice(index, 1, newHead1) 
}

module.exports = {TreeStructure, Node}
// module.exports = Node
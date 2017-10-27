import React, { Component } from 'react'
// import axios from 'axios'
// import TreeUnit from './TreeUnit/TreeUnit.js'
import makeDefaultGrid from './DefaultGrid/DefaultGrid.js'
import {GenerateTree, Node, randomInt} from './TreeStructure/TreeStructure.js'
import './Tree.css'


export default class Tree extends Component {
  render() {
    let defaultGrid = makeDefaultGrid()    
    let recursiveTree = GenerateTree(18, 6.42, 7, [0,1])
  
    let branches = []
    let branchWidth = []
    let leaves = []
    makeBranches(recursiveTree)
    
    
    
    
    
    
    //recursively translates data tree to pixel values
    function makeBranches(node) {
      let startCoordinate = node.start
      let direction = node.direction
      let length = node.length
      let hasChild = false
      if (node.childLeft || node.childRight) {
        hasChild = true
      }
      makeBranch(startCoordinate, direction, length, hasChild)
      node.childRight ? makeBranches(node.childRight) : null
      node.childLeft ? makeBranches(node.childLeft) : null
      if (hasChild === false) makeLeaves(node)
    }
    
    
    //takes branch info and makes array of branch coordinates
    function makeBranch(startCoordinate, direction, length, hasChild = null) {
      for (let i = 0; i <= length; i++) {
        branches.push([startCoordinate[0] + i * direction[0], startCoordinate[1] + i * direction[1], direction, length, hasChild])
      }
    }

    //makes leaves at the end of a node
    function makeLeaves(node) {
      let endX = node.end[0]
      let endY = node.end[1]
      leaves.push([endX + 1, endY])
      leaves.push([endX - 1, endY])
      leaves.push([endX, endY + 1])
      // leaves.push([endX + randomInt(0,5), endY - randomInt(30,50)])

    }

    let x = 0
    branches.forEach(unit => {
      x = shiftX(x)
      let b = -1     
      if (unit[4] === true) {
        // let b = -1
        if (unit[3] % 2 === 0) {
          for (let i = 0; i <= ((unit[3] - 4.5)); i += .5) {
            let a = Math.ceil(i) // number of cells left or right to fill
            if (unit[2][1] === 1) {
              branchWidth.push([unit[0] + a * b + x, unit[1]])
            } else {
              branchWidth.push([unit[0], unit[1] + (a-1) * b + x])
            }
            b = b * -1
          }

        } else { //odd number of iterations does not factor for x
          for (let i = 0; i <= ((unit[3] - 4.5)); i += .5) {
            let a = Math.ceil(i) // number of cells left or right to fill
            if (unit[2][1] === 1) {
              branchWidth.push([unit[0] + a * b, unit[1]])
            } else {
              branchWidth.push([unit[0], unit[1] + (a-1) * b])
            }
            b = b * -1
          }
        }
      }
    })

    // adds random shift to branch width coordinates
    function shiftX(x) {
      let newX = x
      let doesNotShift = randomInt(0,7)
      if (doesNotShift === 0) {
        if (x === 1) { newX -= 1 }
        if (x === -1) { newX += 1 }
        if (x === 0) {
          newX = randomInt(-1, 1)
        }
      }
      return newX
    }

    branchWidth.forEach(unit => {
      let x = unit[0]
      let y = unit[1]
      function findXY(TreeUnit) {
        return TreeUnit.x === x && TreeUnit.y === y
      }
      defaultGrid.find(findXY).unitType = 'lightBranchUnit'
    })

    //takes branch coordinates and changes their class
    branches.forEach(unit => {
      let x = unit[0]
      let y = unit[1]
      function findXY(TreeUnit) {
        return TreeUnit.x === x && TreeUnit.y === y
      }
      defaultGrid.find(findXY).unitType = 'branchUnit'
    })

    leaves.forEach(unit => {
      let x = unit[0]
      let y = unit[1]
      function findXY(TreeUnit) {
        return TreeUnit.x === x && TreeUnit.y === y
      }
      defaultGrid.find(findXY).unitType = 'leafUnit'
    })


    // defaultGrid.find(findXY).unitType = 'leafUnit'




    //creates JSX elements to render on page
    let gridRender = defaultGrid.map( unit => {
      // ({unit.x}, {unit.y})
      return <div className={unit.unitType}></div>
    })

    return (
      <div className='componentBody'>
        <div className="heading">
          </div>
        <section className='gridContainer'>
          {gridRender}
        </section>
      </div>
    )
  }
}

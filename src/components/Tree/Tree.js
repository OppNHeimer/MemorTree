import React, { Component } from 'react'
// import axios from 'axios'
// import TreeUnit from './TreeUnit/TreeUnit.js'
import makeDefaultGrid from './DefaultGrid/DefaultGrid.js'
import {GenerateTree, Node} from './TreeStructure/TreeStructure.js'
// import Node from './TreeStructure/TreeStructure.js'
import './Tree.css'


export default class Tree extends Component {
  render() {
    let defaultGrid = makeDefaultGrid()    
    // let treeStructure = new TreeStructure(2, [0,1])
    
    

    let recursiveTree = GenerateTree(11, 5.33, 6, [0,1])
  
    
    let branches = []
    makeBranches(recursiveTree)
    function makeBranches(node) {
      let startCoordinate = node.start
      let direction = node.direction
      let length = node.length
      makeBranch(startCoordinate, direction, length)
      node.childRight ? makeBranches(node.childRight) : null
      node.childLeft ? makeBranches(node.childLeft) : null
    }
    
    
    
    
    //takes branch info and makes array of branch coordinates
    function makeBranch(startCoordinate, direction, length) {
      for (let i = 0; i < length; i++) {
        branches.push([startCoordinate[0] + i * direction[0], startCoordinate[1] + i * direction[1]])
      }
    }

    //takes branch coordinates and changes their class
    branches.forEach(unit => {
      let x = unit[0]
      let y = unit[1]
      function findXY(TreeUnit) {
        return TreeUnit.x === x && TreeUnit.y === y
      }
      defaultGrid.find(findXY).unitType = 'branchUnit'
    })

    // defaultGrid.find(findXY).unitType = 'leafUnit'




    //creates JSX elements to render on page
    let gridRender = defaultGrid.map( unit => {
      return <div className={unit.unitType}>({unit.x}, {unit.y})</div>
    })

    return (
      <div className='componentBody'>
        <h1>mellow world</h1>
        <section className='gridContainer'>
          {gridRender}
        </section>
      </div>
    )
  }
}

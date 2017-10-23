import React, { Component } from 'react'
// import axios from 'axios'
import TreeUnit from './TreeUnit/TreeUnit.js'
import makeDefaultGrid from './DefaultGrid/DefaultGrid.js'
import './Tree.css'

export default class Tree extends Component {
  render() {
    let defaultGrid = makeDefaultGrid()    

    let x = 5
    let y = -3

    function findXY(TreeUnit) {
      return TreeUnit.x === x && TreeUnit.y === y
    }
    
    // defaultGrid.filter(findX).forEach( unit => {
    //   unit.unitType = 'leafUnit'
    // })

    defaultGrid.find(findXY).unitType = 'leafUnit'




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

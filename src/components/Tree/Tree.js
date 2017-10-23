import React, { Component } from 'react'
// import axios from 'axios'
import './Tree.css'

export default class Tree extends Component {
  render() {
    let grid = []
    let n = 0 //row number
    for (var i = 0; i < 121; i++) {

      //increments n by 1 every row
      if (i % 11 === 0) {
        n += 1
      }
        
      let xNum = i + 6 - n*11 //calculates x-index
      let yNum = (n - 6) * -1 //calculates y-index

      let xStr = '+0' + xNum.toString()
      if ( xNum.toString()[0] === '-') {
        xStr = '-0' + xNum.toString().slice(1) 
          console.log(xStr)
      } 

      let yStr = '+0' + yNum.toString()
      if (yNum.toString()[0] === '-') {
        yStr = '-0' + yNum.toString().slice(1)
        console.log(yStr)
      } 

      grid.push(<div class={'gridUnit x' + xStr + 'y' + yStr}>({xStr}, {yStr})</div>)
    }




    return (
      <div class='componentBody'>
        <h1>mellow world</h1>
        <section class='gridContainer'>
          {grid}
        </section>
      </div>
    )
  }
}

import React, { Component } from 'react'

export default class TreeUnit extends Component {
  constructor(x, y, unitType = 'backgroundUnit') {
    super()
    this.x = x
    this.y = y
    this.unitType = unitType
  }
}
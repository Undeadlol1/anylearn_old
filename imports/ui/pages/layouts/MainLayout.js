import React, { Component } from 'react'
import NavBar from '../../components/NavBar'

export default class MainLayout extends Component {
  render() {
    return (
      <div>
        <header>
          {this.props.nav || <NavBar />}
        </header>
        <main className="container">
          {this.props.main}
        </main>
      </div>
    )
  }
}

import React, { Component } from 'react'

export default class TextArea extends Component {
  render() {
    return (
      <div className="text-area">
        <p>
          Pokémon Mini
          <br/>
          by <a href="http://www.superpencil.com">Superpencil</a>
        </p>
        <p>Pokémon and Pikachu are trademarks of The Pokémon Company International</p>
        <p>If you use this code please mention the original repository.</p>
        <p>If you make improvements, please issue a pull request, we're very happy to have your involvement.</p>
        <small>Author - Pascal Pixel</small>
      </div>
    )
  }
}

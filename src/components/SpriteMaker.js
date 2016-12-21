import React from 'react'

class SpriteMaker extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      imageString: 'Loading...'
    }
  }

  componentDidMount () {
    let shades = [' ', '░', '▒', '▓', '█']
    let range = 255 / shades.length

    let img = document.getElementById('source')
    img.onload = () => {
      let canvas = document.getElementById('target')
      canvas.width = img.width
      canvas.height = img.height

      let ctx = canvas.getContext('2d')
      ctx.drawImage(img, 0, 0)

      let pixels = []
      for (let y = 0; y < canvas.height; y++) {
        let line = []
        for (let x = 0; x < canvas.width; x++) {
          let pixel = ctx.getImageData(x, y, 1, 1).data[0]

          let color
          if (pixel >= (range * 4)) {
            color = shades[0]
          } else if (pixel >= (range * 3)) {
            color = shades[1]
          } else if (pixel >= (range * 2)) {
            color = shades[2]
          } else if (pixel >= (range * 1)) {
            color = shades[3]
          } else {
            color = shades[4]
          }
          line.push(color)
        }
        pixels.push('\'' + line.join('') + '\',\n')
      }

      this.setState({
        imageString: pixels.join('')
      })
    }
  }

  render () {
    return (
      <div style={{fontSize: 2.5, lineHeight: 1}}>
        <img
          id='source'
          src='../../img/font.png'
          style={{
            width: 128,
            height: 64
          }} />
        <canvas id='target' />
        <div id='result'>
          {this.state.imageString}
        </div>
      </div>
    )
  }
}

export default SpriteMaker

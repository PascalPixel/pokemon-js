let SpriteMaker = (props) => {
  let imageString = []
  let img = new Image()
  img.crossOrigin = 'Anonymous'
  img.src = `../../images/${props.url}.png`

  img.onload = function () {
    let canvas = document.getElementById('canvas')
    canvas.width = img.width
    canvas.height = img.height
    let ctx = canvas.getContext('2d')
    ctx.drawImage(img, 0, 0)

    for (let y = 0; y < canvas.height; y++) {
      let line = []
      for (let x = 0; x < canvas.width; x++) {
        let object = ctx.getImageData(x, y, 1, 1)
        let color
        if (object.data[0] === 255) {
          color = '▓'
        } else if (object.data[0] === 153) {
          color = '▒'
        } else if (object.data[0] === 119) {
          color = '░'
        } else {
          color = ' '
        }
        line.push(color)
      }
      imageString.push('\'' + line.join('') + '\',\n')
    }

    return (<div>{imageString.join('')}</div>)
  }
}

export default SpriteMaker

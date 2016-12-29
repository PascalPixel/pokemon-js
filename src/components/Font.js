import React from 'react'
// import ReactDOMServer from 'react-dom/server'
import font from '../data/font'

let Font = () => {
  // Get each glyph as an object in an array.
  let glyphs = []

  // Map over each glyph in the font object.
  for (let glyph in font) {
    // Prepare object to receive 'pixels'.
    let paths = []
    // For each glyph, take every line.
    font[glyph].map((line, y) => {
      // For each line, take every text element.
      for (let x = 0; x < line.length; x++) {
        // If the text element is a dark block, make an SVG rectangle 'pixel' with the x and y of the text block in the source object.
        let posX = x
        let posY = font[glyph].length - y
        line[x] === '█' ? paths.push(
          `M${posX * 10} ${posY * 10}H${(posX - 1) * 10}V${(posY - 1) * 10}H${posX * 10}Z`
        ) : null
      }
    })

    // Push the combined pixels into a single glyph, with the object's key.
    if (glyph === '.notdef') {
      glyphs.push(
        <missing-glyph
          key={glyph}
          d={paths.join('')} />
      )
    } else {
      glyphs.push(
        <glyph
          key={glyph}
          unicode={glyph}
          d={paths.join('')} />
      )
    }
  }

  return (
    <svg>
      <metadata>
        Copyright (c) 1996 Game Freak and Nintendo
      </metadata>
      <defs>
        <font id='PokemonGB'>

          <font-face
            font-family='PokemonGB'
            bbox='0 0 80 80'
            units-per-em='80' />

          {glyphs}

        </font>
      </defs>
    </svg>
  )
}

export default Font

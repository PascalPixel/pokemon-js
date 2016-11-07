import React, { Component } from 'react'

export default class Game extends Component {
  render() {
    return (
      <div id='pokemon'>
        <div className='depth'>
          <div className='layer foe'>
            <div className='info'>
              <div className='balls'>
                <img src='img/blue_balls.svg'/>
              </div>
              <div className='stats'>
                <div className='name'></div>
                <div className='level-wrap'>
                  <img src='img/level.svg'/>
                  <span className='level'></span>
                </div>
                <div className='hp-wrap'>
                  <img src='img/hp.svg'/>
                  <div className='hp-bar'>
                    <div className='hp-bar-active'></div>
                  </div>
                </div>
              </div>
            </div>
            <div className='images'>
              <div className='trainer'>
                <img src='img/blue_front.svg'/>
              </div>
              <div className='pokemon'>
                <img src='img/eevee_front.svg'/>
              </div>
            </div>
          </div>
          <div className='layer player'>
            <div className='images'>
              <div className='trainer'>
                <img src='img/red_back.svg'/>
              </div>
              <div className='pokemon'>
                <img src='img/pikachu_back.svg'/>
              </div>
            </div>
            <div className='info'>
              <div className='balls'>
                <img src='img/red_balls.svg'/>
              </div>
              <div className='stats'>
                <div className='name'></div>
                <div className='level-wrap'>
                  <img src='img/level.svg'/>
                  <span className='level'></span>
                </div>
                <div className='hp-wrap'>
                  <img src='img/hp.svg'/>
                  <div className='hp-bar'>
                    <div className='hp-bar-active'></div>
                  </div>
                </div>
                <div className='health'>
                  <span className='hp'></span>
                  <span>/</span>
                  <span className='hpTotal'></span>
                </div>
              </div>
            </div>
          </div>
          <div className='layer windows'>
            <div className='window texts'>
              <div className='text text1'></div>
              <div className='text text2'></div>
            </div>
            <div className='window menu'>
              <span className='button fight'>FIGHT</span>
              <span className='button pkmn'>
                <sup>P</sup>
                <sub>K</sub>
                <sup>M</sup>
                <sub>N</sub>
              </span>
              <span className='button item'>ITEM</span>
              <span className='button run'>RUN</span>
            </div>
            <div className='window fight'>
              <div className='button' id='move0'></div>
              <div className='button' id='move1'></div>
              <div className='button' id='move2'></div>
              <div className='button back'>cancel</div>
              <div className='window fight-details'>
                <span className='type-header'>TYPE/</span>
                <span className='type'>NORMAL</span>
              </div>
            </div>
            <div className='window item'>
              <div className='button potion'>
                <span>POTION x</span>
                <span className='potionCount'>1</span>
              </div>
              <div className='button back'>cancel</div>
            </div>
            <div className='window pkmn'>
              <div className='button playerPokemonButton'>
                <span className='playerpokemonname'></span>
              </div>
              <div className='button back'>cancel</div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

import React from "react";
import Sprite from "./Sprite";
import Stats from "./Stats";

export default class Trainer extends React.Component {
  render() {
    const trainer = this.props.trainer;
    const pokemon = trainer.pokemon[trainer.activePokemon];
    const currentTrainer = this.props.currentTrainer;
    let side = currentTrainer ? "player" : "foe";

    return (
      <div id={side} className={"layer"}>
        <div className="images">
          <div className="trainer">
            <Sprite name={trainer.name} currentTrainer={currentTrainer} />
          </div>
          <div className="pokemon">
            <Sprite name={pokemon.name} currentTrainer={currentTrainer} />
          </div>
        </div>
        <div className="info">
          <div className="balls">
            <img src="img/red_balls.svg" alt="balls" />
          </div>
          <Stats pokemon={pokemon} currentTrainer={currentTrainer} />
        </div>
      </div>
    );
  }
}

import React from "react";

const Stats = (props) => {
  const name = props.pokemon.name.toUpperCase();
  const level = props.pokemon.level;
  const current = props.pokemon.hpCurrent;
  const total = props.pokemon.hpBase;
  const currentTrainer = props.currentTrainer;

  return (
    <div className="stats">
      <div className="name">{name}</div>
      <div className="level-wrap">
        <img src="img/level.svg" />
        <span className="level">{level}</span>
      </div>
      <div className="hp-wrap">
        <img src="img/hp.svg" />
        <div className="hp-bar">
          <div
            className="hp-bar-active"
            style={{
              width: `${(current * 100) / total}%`,
            }}
          />
        </div>
      </div>
      {currentTrainer ? (
        <div className="health">
          <span>
            {current}/{total}
          </span>
        </div>
      ) : null}
    </div>
  );
};

export default Stats;

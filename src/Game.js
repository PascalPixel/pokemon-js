import _ from "lodash";
import { useState } from "react";
import Trainer from "./components/Trainer";
import Windows from "./components/Windows";
import STORE from "./constants/store";

export default function Game(props) {
  const [state, setState] = useState(STORE);

  // Calculate hp
  const calculateHp = (level, current, power) => {
    const newHp =
      power > 0
        ? current - Math.floor((((2 * level) / 5 + 2) * power) / 50 + 2)
        : current;
    return newHp > 0 ? newHp : 0;
  };

  // Update HP
  const updateHp = (side, hp) => {
    let newState = state;
    newState.trainers[side].pokemon[
      newState.trainers[side].activePokemon
    ].hpCurrent = hp;
    setState((prev) => ({ ...prev, newState }));
  };

  // Function that loops over array of functions with timeouts.
  const animateArray = (array) => {
    let offset = 0;
    array.map((step) => {
      let delay = step[0] * 1000;
      if (delay) offset += delay;
      _.delay(() => {
        let trigger = step[1];
        trigger();
      }, offset);
    });
  };

  // Changes that Windows are visible.
  const reframe = (update) => {
    console.log("Change visible windows: " + Object.keys(update));

    const frames = Object.assign({}, state.frames, update);
    setState((prev) => ({ ...prev, frames }));
  };

  // Perform a move.
  const attack = (movePlayer) => {
    // Get all elements for animation; images and HP bars.
    const imagePlayer = document
      .getElementById("player")
      .getElementsByClassName("images")[0];
    const imageFoe = document
      .getElementById("foe")
      .getElementsByClassName("images")[0];

    // Get the players.
    const player = state.allot.left;
    const foe = state.allot.right;

    // Get details about the current Pokemon on both sides.
    const pokemonPlayer =
      state.trainers[player].pokemon[state.trainers[player].activePokemon];
    const pokemonFoe =
      state.trainers[foe].pokemon[state.trainers[foe].activePokemon];

    // CPU pick foe move
    const moveFoe =
      pokemonFoe.moves[Math.floor(Math.random() * pokemonFoe.moves.length)];

    // New HP foePokemon
    const hpNewPokemonFoe = calculateHp(
      pokemonPlayer.level,
      pokemonFoe.hpCurrent,
      movePlayer.power
    );

    // New HP playerPokemon
    const hpNewPokemonPlayer = calculateHp(
      pokemonFoe.level,
      pokemonPlayer.hpCurrent,
      moveFoe.power
    );

    // Array with all steps of the attack, including start and end functions, second argument is delay before running.
    animateArray([
      // Start turns.
      [
        0.0,
        () => {
          reframe({ fight: false, menu: false });
        },
      ],

      // Player turn.
      [
        0.5,
        () => {
          setState((prev) => ({
            ...prev,
            lines: `${pokemonPlayer.name.toUpperCase()} used ${movePlayer.name.toUpperCase()}!`,
          }));
        },
      ],
      [
        1.0,
        () => {
          imagePlayer.style.left = "0em";
        },
      ],
      [
        0.1,
        () => {
          imagePlayer.style.left = "1.5em";
        },
      ],
      [
        0.1,
        () => {
          imagePlayer.style.left = "0.8em";
        },
      ],
      [
        0.1,
        () => {
          imageFoe.style.opacity = 0;
        },
      ],
      [
        0.1,
        () => {
          imageFoe.style.opacity = 1;
        },
      ],
      [
        0.1,
        () => {
          imageFoe.style.opacity = 0;
        },
      ],
      [
        0.1,
        () => {
          imageFoe.style.opacity = 1;
        },
      ],
      [
        0.1,
        () => {
          imageFoe.style.opacity = 0;
        },
      ],
      [
        0.1,
        () => {
          imageFoe.style.opacity = 1;
        },
      ],
      [
        0.1,
        () => {
          updateHp(foe, hpNewPokemonFoe);
        },
      ],
      [
        0.0,
        () => {
          setState((prev) => ({ ...prev, lines: null }));
        },
      ],

      // Foe turn.
      [
        0.5,
        () => {
          setState((prev) => ({
            ...prev,
            lines: `${pokemonFoe.name.toUpperCase()} used ${moveFoe.name.toUpperCase()}!`,
          }));
        },
      ],
      [
        1.0,
        () => {
          imageFoe.style.right = "0em";
        },
      ],
      [
        0.1,
        () => {
          imageFoe.style.right = "1.5em";
        },
      ],
      [
        0.1,
        () => {
          imageFoe.style.right = "0.8em";
        },
      ],
      [
        0.1,
        () => {
          imagePlayer.style.opacity = 0;
        },
      ],
      [
        0.1,
        () => {
          imagePlayer.style.opacity = 1;
        },
      ],
      [
        0.1,
        () => {
          imagePlayer.style.opacity = 0;
        },
      ],
      [
        0.1,
        () => {
          imagePlayer.style.opacity = 1;
        },
      ],
      [
        0.1,
        () => {
          imagePlayer.style.opacity = 0;
        },
      ],
      [
        0.1,
        () => {
          imagePlayer.style.opacity = 1;
        },
      ],
      [
        0.1,
        () => {
          updateHp(player, hpNewPokemonPlayer);
        },
      ],
      [
        0.0,
        () => {
          setState((prev) => ({ ...prev, lines: null }));
        },
      ],

      // End turns.
      [
        1.0,
        () => {
          reframe({ menu: true });
        },
      ],
    ]);
  };

  // Switch Pokemon
  const change = (pokemon) => {
    console.log("Switch to: " + pokemon.name);
  };

  // Use Item
  const use = (item) => {
    console.log("Item used: " + item.name);
  };

  // Run from encounter/battle.
  const run = () => {
    console.log("Attempted to Run.");
  };

  // Render component.
  return (
    <div>
      <Trainer trainer={state.trainers[state.allot.right]} currentTrainer={0} />

      <Trainer trainer={state.trainers[state.allot.left]} currentTrainer={1} />

      <Windows
        trainer={state.trainers[state.allot.left]}
        frames={state.frames}
        lines={state.lines}
        // Actions.
        reframe={reframe.bind(this)}
        attack={attack.bind(this)}
        change={change.bind(this)}
        use={use.bind(this)}
        run={run.bind(this)}
      />
    </div>
  );
}

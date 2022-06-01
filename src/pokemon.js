import $ from "jquery";

// Pokédex
// const pokedex = (dex, level) => {
//   $.ajax({
//     'async': false,
//     'global': false,
//     'url': "js/pokemon.json",
//     'dataType': "json",
//     'success': function (data) {
//         poke = data
//     }
//   })
//   const stats = new Object()
//       stats['id'] = poke[dex].id
//       stats.name = poke[dex].name
//       stats.hp  = Math.floor((poke[dex].stats.hp * 2 + 193) * level / 100 + 5)
//       stats['atk'] = Math.floor(((poke[dex].stats.attack * 2 + 193) * level / 100 + 10) * level / 100 + 20)
//       stats.def = Math.floor((poke[dex].stats.defense * 2 + 193) * level / 100 + 10)
//       stats['spa'] = Math.floor(((poke[dex].stats.spattack * 2 + 193) * level / 100 + 10) * level / 100)
//       stats['spd'] = Math.floor((poke[dex].stats.spdefense * 2 + 193) * level / 100 + 10)
//       stats['spe'] = Math.floor((poke[dex].stats.speed * 2 + 193) * level / 100 + 10)
//   return stats
// }

// Player setup
const player = "Red";
// const playerID = 25
const playerLevel = 5;
const playerPokemon = {
  name: "Pikachu",
  hp: 35,
  atk: 70,
  def: 30,
};
const hpPlayerTotal = playerPokemon.hp;
let hpPlayer = hpPlayerTotal;
// const playerBaseAttack = playerPokemon.atk
// const playerBaseDefense = playerPokemon.def
$(".player .level").text(playerLevel);
$(".player .hp").text(hpPlayerTotal);
$(".player .hpTotal").text(hpPlayerTotal);
$(".player .name").text(playerPokemon.name.toUpperCase());
$("#move0").html("TACKLE");
$("#move1").html("TAIL WHIP");
$("#move2").html("-");

// Foe setup
const foe = "Blue";
// const foeID = 133
const foePokemon = {
  name: "Eevee",
  hp: 40,
  atk: 55,
  def: 50,
};
const hpFoeFull = foePokemon.hp;
let hpFoe = hpFoeFull;
// const foeBaseAttack = foePokemon.atk
let foeBaseDefense = foePokemon.def;
$(".foe .level").text(playerLevel);
$(".foe .name").text(foePokemon.name.toUpperCase());

// Hide all menus except dialog
const hider = () => {
  $(".window.menu").hide();
  $(".window.item").hide();
  $(".window.pkmn").hide();
  $(".window.fight").hide();
};

// Reset to battle ready mode for turn or cancel
const reset = () => {
  $(".text1").text("");
  $(".text2").text("");
  $(".window.item").hide();
  $(".window.pkmn").hide();
  $(".window.fight").hide();
  $(".window.menu").show();
};

// Health bar width calculation and health numbers
const healthbar = (current, total) => {
  const hpCurrent = current;
  const hpTotal = total;
  const percentTotal = 100;
  const percentCurrent = (hpCurrent * percentTotal) / hpTotal;
  return percentCurrent;
};

// Enemy turn
const attackEnd = () => {
  if (hpFoe <= 0) {
    $(".window.menu").hide();
    $(".foe .hp-bar-active").css("width", "0%");
    window.setTimeout(() => {
      $(".foe .images").delay(500).animate(
        {
          bottom: "-35em",
        },
        1000
      );
      $(".text1").text(`${foePokemon.name.toUpperCase()} fainted!`);
      $(".text2").text("");
      typer();
      window.setTimeout(() => {
        $(".foe .stats").hide();
        $(".text1").text(`Got $${Math.floor(playerLevel * 2.5)} for`);
        $(".text2").text("winning!");
        typer();
        window.setTimeout(() => {
          $(".text1").text(`${foe.toUpperCase()}: I can't`);
          $(".text2").text("believe it!");
          typer();
          window.setTimeout(() => {
            $(".text1").text("I chose the");
            $(".text2").text("wrong POKéMON!");
            typer();
          }, 2000);
        }, 2000);
      }, 2000);
    }, 2000);
  } else {
    window.setTimeout(() => {
      $(".text1").text(`${foePokemon.name.toUpperCase()} used`);
      $(".text2").text("TACKLE!");
      typer();
      $(".foe .images")
        .animate(
          {
            right: "0em",
          },
          100,
          "linear"
        )
        .animate(
          {
            right: "1.8em",
          },
          50,
          "linear"
        )
        .delay(100)
        .animate(
          {
            right: "0.8em",
          },
          10,
          "linear"
        );
      window.setTimeout(() => {
        $(".player .images").css("opacity", 0);
        window.setTimeout(() => {
          $(".player .images").css("opacity", 1);
          window.setTimeout(() => {
            $(".player .images").css("opacity", 0);
            window.setTimeout(() => {
              $(".player .images").css("opacity", 1);
              window.setTimeout(() => {
                $(".player .images").css("opacity", 0);
                window.setTimeout(() => {
                  $(".player .images").css("opacity", 1);
                  window.setTimeout(() => {
                    const basePower = 40;
                    const baseDamage =
                      Math.floor(
                        Math.floor(
                          (Math.floor((2 * playerLevel) / 5 + 2) *
                            basePower *
                            foePokemon.atk) /
                            playerPokemon.def
                        ) / 50
                      ) + 2;
                    hpPlayer -= baseDamage;
                    if (hpPlayer <= 0) {
                      $(".window.menu").hide();
                      $(".player .hp").text("0");
                      $(".player .hp-bar-active").css("width", "0%");
                      $(".player .stats").hide();
                      window.setTimeout(() => {
                        $(".player .images").delay(500).animate(
                          {
                            bottom: "-35.714em",
                          },
                          1000
                        );
                        $(".text1").text(
                          `${playerPokemon.name.toUpperCase()} fainted...`
                        );
                        $(".text2").text("");
                        typer();
                        window.setTimeout(() => {
                          $(".text1").text(`${player.toUpperCase()} is out of`);
                          $(".text2").text("useable POKéMON...");
                          typer();
                          window.setTimeout(() => {
                            $(".text1").text(
                              `${player.toUpperCase()} whited out!`
                            );
                            $(".text2").text("");
                            typer();
                          }, 2000);
                        }, 2000);
                      }, 2000);
                    } else {
                      $(".player .hp").text(hpPlayer);
                      $(".player .hp-bar-active").animate(
                        {
                          width: `${healthbar(hpPlayer, hpPlayerTotal)}%`,
                        },
                        500
                      );
                      window.setTimeout(() => {
                        reset();
                      }, 2400);
                    }
                  }, 100);
                }, 100);
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 2000);
  }
};

// Growl
const growl = () => {
  hider();
  $(".text1").text(playerPokemon.name.toUpperCase());
  $(".text2").text("used GROWL!");
  typer();
  window.setTimeout(() => {
    if (foeBaseDefense < foePokemon.def - 20) {
      $(".text1").text(`${foePokemon.name.toUpperCase()}'s defense`);
      $(".text2").text("can't drop lower!");
      typer();
      window.setTimeout(() => {
        attackEnd();
      }, 2000);
    } else {
      $(".text1").text(`${foePokemon.name.toUpperCase()}'s defense`);
      $(".text2").text("dropped by 2!");
      foeBaseDefense = -2;
      typer();
      window.setTimeout(() => {
        attackEnd();
      }, 2000);
    }
  }, 2000);
};

const attack = (moveName) => {
  hider();
  $(".text1").text(`${playerPokemon.name.toUpperCase()} used`);
  $(".text2").text(`${moveName.toUpperCase()}!`);
  typer();
  $(".player .images")
    .animate(
      {
        left: "0em",
      },
      100,
      "linear"
    )
    .animate(
      {
        left: "1.8em",
      },
      50,
      "linear"
    )
    .delay(100)
    .animate(
      {
        left: "0.8em",
      },
      10,
      "linear"
    );
  window.setTimeout(() => {
    $(".foe .images").css("opacity", 0);
    window.setTimeout(() => {
      $(".foe .images").css("opacity", 1);
      window.setTimeout(() => {
        $(".foe .images").css("opacity", 0);
        window.setTimeout(() => {
          $(".foe .images").css("opacity", 1);
          window.setTimeout(() => {
            $(".foe .images").css("opacity", 0);
            window.setTimeout(() => {
              $(".foe .images").css("opacity", 1);
              const basePower = 40;
              const baseDamage =
                Math.floor(
                  Math.floor(
                    (Math.floor((2 * playerLevel) / 5 + 2) *
                      basePower *
                      playerPokemon.atk) /
                      foePokemon.def
                  ) / 50
                ) + 2;
              hpFoe -= baseDamage;
              $(".foe .hp-bar-active").animate(
                {
                  width: `${healthbar(hpFoe, hpFoeFull)}%`,
                },
                500
              );
              attackEnd();
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  }, 100);
};

// Use potion
const potion = (potionType) => {
  let strength;
  hider();
  if (potionType === "normal") {
    strength = 20;
  } else if (potionType === "super") {
    strength = 50;
  } else if (potionType === "hyper") {
    strength = 200;
  } else {
    strength = 999;
  }
  if (hpPlayer >= hpPlayerTotal) {
    $(".text1").text("HP already");
    $(".text2").text("full!");
    typer();
    window.setTimeout(() => {
      reset();
    }, 1000);
  } else {
    $(".text1").text("Used POTION!");
    $(".text2").text("");
    typer();
    hpPlayer += strength;
    if (hpPlayer >= hpPlayerTotal) {
      hpPlayer = hpPlayerTotal;
    }
    $(".player .hp").text(hpPlayer);
    $(".player .hp-bar-active").animate(
      {
        width: `${healthbar(hpPlayer, hpPlayerTotal)}%`,
      },
      500
    );
    potionCount--;
    attackEnd();
  }
  $(".potionCount").text(potionCount);
  if (potionCount <= 0) {
    $(".potion").hide();
  }
};

// Animated typing of text
const typer = () => {
  let line;
  $(".text1, .text2").each(function () {
    $(this).text($(this).text().replace(new RegExp(" ", "g"), " "));
  });
  line = $(".text1, .text2");
  line
    .hide()
    .contents()
    .each(function () {
      let letters;
      letters = void 0;
      letters = `<span> ${this.data.split("").join(" </span><span> ")} </span>`;
      $(this).replaceWith(letters);
    });
  line
    .find("span")
    .hide()
    .each(function () {
      if (!$.trim(this.innerHTML)) {
        $(this).remove();
      }
    });
  line
    .show()
    .find("span")
    .each(function (i) {
      $(this)
        .delay(40 * i)
        .fadeIn(0);
    });
};

// Click elements
let potionCount = 1;
$(".potionCount").text(potionCount);
$(".button.item").on("click", () => {
  $(".window.item").show();
  $(".window.menu").hide();
});
$(".button.potion").on("click", () => {
  potion("normal");
});
$(".button.fight").on("click", () => {
  $(".window.fight").show();
});
$(".button.growl").on("click", () => {
  growl();
});
$(".button#move0").on("click", () => {
  attack("tackle");
});
$(".button#move1").on("click", () => {
  attack("tail whip");
});
$(".button#move2").on("click", () => {
  attack("-");
});
$(".button.back").on("click", () => {
  reset();
});
$(".button.pkmn").on("click", () => {
  $(".window.pkmn").show();
});
$(".button.run").on("click", () => {
  hider();
  $(".text1").text("No! There's no");
  $(".text2").text("running from a");
  typer();
  window.setTimeout(() => {
    $(".text1").text("trainer battle!");
    $(".text2").text("");
    typer();
    window.setTimeout(() => {
      reset();
    }, 2000);
  }, 2000);
});

// Start animation
const playPokemon = () => {
  $(".foe .images").css("right", "16em");
  $(".player .images").css("left", "16em");
  $(
    ".player .pokemon, .foe .pokemon, .stats, .balls, .window.item, .window.pkmn, .window.fight, .window.menu"
  ).hide();
  window.setTimeout(() => {
    $(".foe .images").animate(
      {
        right: "0.8em",
      },
      800,
      "linear"
    );
    $(".player .images").animate(
      {
        left: "0.8em",
      },
      800,
      "linear"
    );
    window.setTimeout(() => {
      $(".trainer, .balls").show();
      window.setTimeout(() => {
        $(".text1").text(`${foe.toUpperCase()} wants`);
        $(".text2").text("to fight!");
        typer();
        window.setTimeout(() => {
          $(".balls").hide();
          $(".foe .images").animate(
            {
              right: "-21em",
            },
            400,
            "linear"
          );
          window.setTimeout(() => {
            $(".text1").text(`${foe.toUpperCase()} sent`);
            $(".text2").text(`out ${foePokemon.name.toUpperCase()}!`);
            typer();
            $(".foe .pokemon").show();
            $(".foe .trainer").hide();
            $(".foe .images").animate(
              {
                right: "0.8em",
              },
              700,
              "linear"
            );
            window.setTimeout(() => {
              $(".foe .stats").show();
              $(".player .images").animate(
                {
                  left: "-21em",
                },
                400,
                "linear"
              );
              window.setTimeout(() => {
                $(".player .trainer").hide();
                $(".player .pokemon").show();
                $(".player .images").animate(
                  {
                    left: "0.8em",
                  },
                  700,
                  "linear"
                );
                $(".text1").text(`Go! ${playerPokemon.name.toUpperCase()}!`);
                $(".text2").text("");
                typer();
                $(".player .stats").show();
                window.setTimeout(() => {
                  reset();
                }, 2000);
              }, 800);
            }, 1500);
          }, 1000);
        }, 2500);
      }, 400);
    }, 800);
  }, 600);
};

export default playPokemon;

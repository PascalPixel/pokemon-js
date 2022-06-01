import $ from "jquery";

function playPokemon() {
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
  $("#battle .player .level").text(playerLevel);
  $("#battle .player .hp").text(hpPlayerTotal);
  $("#battle .player .hpTotal").text(hpPlayerTotal);
  $("#battle .player .name").text(playerPokemon.name.toUpperCase());
  $("#battle #move0").html("TACKLE");
  $("#battle #move1").html("TAIL WHIP");
  $("#battle #move2").html("-");

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
  $("#battle .foe .level").text(playerLevel);
  $("#battle .foe .name").text(foePokemon.name.toUpperCase());

  // Hide all menus except dialog
  const hider = () => {
    $("#battle .window.menu").hide();
    $("#battle .window.item").hide();
    $("#battle .window.pkmn").hide();
    $("#battle .window.fight").hide();
  };

  // Reset to battle ready mode for turn or cancel
  const reset = () => {
    $("#battle .text1").text("");
    $("#battle .text2").text("");
    $("#battle .window.item").hide();
    $("#battle .window.pkmn").hide();
    $("#battle .window.fight").hide();
    $("#battle .window.menu").show();
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
      $("#battle .window.menu").hide();
      $("#battle .foe .hp-bar-active").css("width", "0%");
      window.setTimeout(() => {
        $("#battle .foe .images").delay(500).animate(
          {
            bottom: "-35rem",
          },
          1000
        );
        $("#battle .text1").text(`${foePokemon.name.toUpperCase()} fainted!`);
        $("#battle .text2").text("");
        typer();
        window.setTimeout(() => {
          $("#battle .foe .stats").hide();
          $("#battle .text1").text(`Got $${Math.floor(playerLevel * 2.5)} for`);
          $("#battle .text2").text("winning!");
          typer();
          window.setTimeout(() => {
            $("#battle .text1").text(`${foe.toUpperCase()}: I can't`);
            $("#battle .text2").text("believe it!");
            typer();
            window.setTimeout(() => {
              $("#battle .text1").text("I chose the");
              $("#battle .text2").text("wrong POKéMON!");
              typer();
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    } else {
      window.setTimeout(() => {
        $("#battle .text1").text(`${foePokemon.name.toUpperCase()} used`);
        $("#battle .text2").text("TACKLE!");
        typer();
        $("#battle .foe .images")
          .animate(
            {
              right: "0rem",
            },
            100,
            "linear"
          )
          .animate(
            {
              right: "1.8rem",
            },
            50,
            "linear"
          )
          .delay(100)
          .animate(
            {
              right: "0.8rem",
            },
            10,
            "linear"
          );
        window.setTimeout(() => {
          $("#battle .player .images").css("opacity", 0);
          window.setTimeout(() => {
            $("#battle .player .images").css("opacity", 1);
            window.setTimeout(() => {
              $("#battle .player .images").css("opacity", 0);
              window.setTimeout(() => {
                $("#battle .player .images").css("opacity", 1);
                window.setTimeout(() => {
                  $("#battle .player .images").css("opacity", 0);
                  window.setTimeout(() => {
                    $("#battle .player .images").css("opacity", 1);
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
                        $("#battle .window.menu").hide();
                        $("#battle .player .hp").text("0");
                        $("#battle .player .hp-bar-active").css("width", "0%");
                        $("#battle .player .stats").hide();
                        window.setTimeout(() => {
                          $("#battle .player .images").delay(500).animate(
                            {
                              bottom: "-35.714rem",
                            },
                            1000
                          );
                          $("#battle .text1").text(
                            `${playerPokemon.name.toUpperCase()} fainted...`
                          );
                          $("#battle .text2").text("");
                          typer();
                          window.setTimeout(() => {
                            $("#battle .text1").text(
                              `${player.toUpperCase()} is out of`
                            );
                            $("#battle .text2").text("useable POKéMON...");
                            typer();
                            window.setTimeout(() => {
                              $("#battle .text1").text(
                                `${player.toUpperCase()} whited out!`
                              );
                              $("#battle .text2").text("");
                              typer();
                            }, 2000);
                          }, 2000);
                        }, 2000);
                      } else {
                        $("#battle .player .hp").text(hpPlayer);
                        $("#battle .player .hp-bar-active").animate(
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
    $("#battle .text1").text(playerPokemon.name.toUpperCase());
    $("#battle .text2").text("used GROWL!");
    typer();
    window.setTimeout(() => {
      if (foeBaseDefense < foePokemon.def - 20) {
        $("#battle .text1").text(`${foePokemon.name.toUpperCase()}'s defense`);
        $("#battle .text2").text("can't drop lower!");
        typer();
        window.setTimeout(() => {
          attackEnd();
        }, 2000);
      } else {
        $("#battle .text1").text(`${foePokemon.name.toUpperCase()}'s defense`);
        $("#battle .text2").text("dropped by 2!");
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
    $("#battle .text1").text(`${playerPokemon.name.toUpperCase()} used`);
    $("#battle .text2").text(`${moveName.toUpperCase()}!`);
    typer();
    $("#battle .player .images")
      .animate(
        {
          left: "0rem",
        },
        100,
        "linear"
      )
      .animate(
        {
          left: "1.8rem",
        },
        50,
        "linear"
      )
      .delay(100)
      .animate(
        {
          left: "0.8rem",
        },
        10,
        "linear"
      );
    window.setTimeout(() => {
      $("#battle .foe .images").css("opacity", 0);
      window.setTimeout(() => {
        $("#battle .foe .images").css("opacity", 1);
        window.setTimeout(() => {
          $("#battle .foe .images").css("opacity", 0);
          window.setTimeout(() => {
            $("#battle .foe .images").css("opacity", 1);
            window.setTimeout(() => {
              $("#battle .foe .images").css("opacity", 0);
              window.setTimeout(() => {
                $("#battle .foe .images").css("opacity", 1);
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
                $("#battle .foe .hp-bar-active").animate(
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
      $("#battle .text1").text("HP already");
      $("#battle .text2").text("full!");
      typer();
      window.setTimeout(() => {
        reset();
      }, 1000);
    } else {
      $("#battle .text1").text("Used POTION!");
      $("#battle .text2").text("");
      typer();
      hpPlayer += strength;
      if (hpPlayer >= hpPlayerTotal) {
        hpPlayer = hpPlayerTotal;
      }
      $("#battle .player .hp").text(hpPlayer);
      $("#battle .player .hp-bar-active").animate(
        {
          width: `${healthbar(hpPlayer, hpPlayerTotal)}%`,
        },
        500
      );
      potionCount--;
      attackEnd();
    }
    $("#battle .potionCount").text(potionCount);
    if (potionCount <= 0) {
      $("#battle .potion").hide();
    }
  };

  // Animated typing of text
  const typer = () => {
    let line;
    $("#battle .text1, .text2").each(function () {
      $(this).text($(this).text().replace(new RegExp(" ", "g"), " "));
    });
    line = $("#battle .text1, .text2");
    line
      .hide()
      .contents()
      .each(function () {
        let letters;
        letters = void 0;
        letters = `<span> ${this.data
          .split("")
          .join(" </span><span> ")} </span>`;
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
  $("#battle .potionCount").text(potionCount);
  $("#battle .button.item").on("click", () => {
    $("#battle .window.item").show();
    $("#battle .window.menu").hide();
  });
  $("#battle .button.potion").on("click", () => {
    potion("normal");
  });
  $("#battle .button.fight").on("click", () => {
    $("#battle .window.fight").show();
  });
  $("#battle .button.growl").on("click", () => {
    growl();
  });
  $("#battle .button#move0").on("click", () => {
    attack("tackle");
  });
  $("#battle .button#move1").on("click", () => {
    attack("tail whip");
  });
  $("#battle .button#move2").on("click", () => {
    attack("-");
  });
  $("#battle .button.back").on("click", () => {
    reset();
  });
  $("#battle .button.pkmn").on("click", () => {
    $("#battle .window.pkmn").show();
  });
  $("#battle .button.run").on("click", () => {
    hider();
    $("#battle .text1").text("No! There's no");
    $("#battle .text2").text("running from a");
    typer();
    window.setTimeout(() => {
      $("#battle .text1").text("trainer battle!");
      $("#battle .text2").text("");
      typer();
      window.setTimeout(() => {
        reset();
      }, 2000);
    }, 2000);
  });

  // Start animation
  const main = () => {
    $("#battle .foe .images").css("right", "16rem");
    $("#battle .player .images").css("left", "16rem");
    $(
      "#battle .player .pokemon, #battle .foe .pokemon, #battle .stats, #battle .balls, #battle .window.item, #battle .window.pkmn, #battle .window.fight, #battle .window.menu"
    ).hide();
    $(".wrapper").show();
    window.setTimeout(() => {
      $("#battle .foe .images").animate(
        {
          right: "0.8rem",
        },
        800,
        "linear"
      );
      $("#battle .player .images").animate(
        {
          left: "0.8rem",
        },
        800,
        "linear"
      );
      window.setTimeout(() => {
        $("#battle .trainer, #battle .balls").show();
        window.setTimeout(() => {
          $("#battle .text1").text(`${foe.toUpperCase()} wants`);
          $("#battle .text2").text("to fight!");
          typer();
          window.setTimeout(() => {
            $("#battle .balls").hide();
            $("#battle .foe .images").animate(
              {
                right: "-21rem",
              },
              400,
              "linear"
            );
            window.setTimeout(() => {
              $("#battle .text1").text(`${foe.toUpperCase()} sent`);
              $("#battle .text2").text(`out ${foePokemon.name.toUpperCase()}!`);
              typer();
              $("#battle .foe .pokemon").show();
              $("#battle .foe .trainer").hide();
              $("#battle .foe .images").animate(
                {
                  right: "0.8rem",
                },
                700,
                "linear"
              );
              window.setTimeout(() => {
                $("#battle .foe .stats").show();
                $("#battle .player .images").animate(
                  {
                    left: "-21rem",
                  },
                  400,
                  "linear"
                );
                window.setTimeout(() => {
                  $("#battle .player .trainer").hide();
                  $("#battle .player .pokemon").show();
                  $("#battle .player .images").animate(
                    {
                      left: "0.8rem",
                    },
                    700,
                    "linear"
                  );
                  $("#battle .text1").text(
                    `Go! ${playerPokemon.name.toUpperCase()}!`
                  );
                  $("#battle .text2").text("");
                  typer();
                  $("#battle .player .stats").show();
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

  main();
}

export default playPokemon;

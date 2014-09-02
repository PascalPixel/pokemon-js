var socket = io();
$('button').click(function(){
  socket.emit('move selected', $(this).val());
  return false;
});
socket.on('move selected', function(action){
  $('#actions').append($('<li>').text(action));
});

$(document).ready(function() {

  //GAMEBOY Aspect ratio
  /*var windowHeight = $(window).height();
  $('.gameboy').css('max-width', windowHeight);
  $(window).resize(function() {
      var windowHeight = $(window).height();
      $('.gameboy').css('max-width', windowHeight);
  });*/

  function getQueryVariable(variable)
  {
    var query = window.location.search.substring(1);
    var vars = query.split("&");
    for (var i=0;i<vars.length;i++) {
      var pair = vars[i].split("=");
      if(pair[0] == variable){return pair[1];}
    }
    return(false);
  }

  //Color or B&W
  if (getQueryVariable("color") != 0) {
    var colorSetting = 'bw';
    $('body').addClass('bw');
  } else {
    var colorSetting = 'color';
  }

  //Initiate Player
  var player = "Ash";
  if (getQueryVariable("playerdex") != 0) {
    var playerID = getQueryVariable("playerdex");
  } else {
    var playerID = 25;
  }
  if (getQueryVariable("foedex") != 0) {
    var foeID = getQueryVariable("foedex");
  } else {
    var foeID = 133;
  }
  if (getQueryVariable("level") != 0) {
    var playerLevel = getQueryVariable("level");
    var foeLevel = getQueryVariable("level");
  } else {
    var playerLevel = 5;
    var foeLevel = 5;
  }
  var playerPokemon = pokedex(playerID,playerLevel);
  var hpPlayerTotal = playerPokemon['hp'];
  var hpPlayer = hpPlayerTotal;
  var playerBaseAttack = playerPokemon['atk'];
  var playerBaseDefense = playerPokemon['def'];
  $('.player .level').text(playerLevel);
  $('.player .hp').text(hpPlayerTotal);
  $('.player .hpTotal').text(hpPlayerTotal);
  $('.player .name').text(playerPokemon['name'].toUpperCase());
  $('.player .sprite').html("<img src='img/"+colorSetting+"/back/"+playerID+".gif'/>");

  //Initiate Foe
  var foe = "Gary";
  var foePokemon = pokedex(foeID,foeLevel);
  var hpFoeFull = foePokemon['hp'];
  var hpFoe = hpFoeFull;
  var foeBaseAttack = foePokemon['atk'];
  var foeBaseDefense = foePokemon['def'];
  $('.foe .level').text(playerLevel);
  $('.foe .name').text(foePokemon['name'].toUpperCase());
  $('.foe .sprite').html("<img src='img/"+colorSetting+"/front/"+foeID+".gif'/>");

  /*--- Pokedex ---*/
  function pokedex(dex, level) {
    $.ajax({
      'async': false,
      'global': false,
      'url': "js/pokemon.json",
      'dataType': "json",
      'success': function (data) {
          poke = data;
      }
    });
    var stats = new Object();
        stats['id'] = poke[dex].id;
        stats['name'] = poke[dex].name;
        stats['hp']  = Math.floor((poke[dex].stats.hp * 2 + 193) * level / 100 + 5);
        stats['atk'] = Math.floor(((poke[dex].stats.attack * 2 + 193) * level / 100 + 10) * level / 100 + 20);
        stats['def'] = Math.floor((poke[dex].stats.defense * 2 + 193) * level / 100 + 10);
        stats['spa'] = Math.floor(((poke[dex].stats.spattack * 2 + 193) * level / 100 + 10) * level / 100);
        stats['spd'] = Math.floor((poke[dex].stats.spdefense * 2 + 193) * level / 100 + 10);
        stats['spe'] = Math.floor((poke[dex].stats.speed * 2 + 193) * level / 100 + 10);
    return stats;
  }

  /*--- Moves ---*/
  function loadMoves(dex, lvl) {
    $.ajax({
      'async': false,
      'global': false,
      'url': "js/pokemon.json",
      'dataType': "json",
      'success': function (data) {
          themoves = data;
      }
    });
    var i = 0;
    var move = new Object();
    var amount = themoves[dex].moves.level;
    amount.forEach(function(entry) {
      if (themoves[dex].moves.level[i].learnedat <= lvl) {
        move[i] = themoves[dex].moves.level[i].name.toUpperCase();
      }
      i++;
    });
    return move;
  }
  var playerMoves = loadMoves(playerID, playerLevel);
  var foeMoves = loadMoves(foeID, foeLevel);
  $('#move0').html(playerMoves[3]);
  $('#move1').html(playerMoves[2]);
  $('#move2').html(playerMoves[1]);
  $('#move3').html(playerMoves[0]);

  /*--- Setup ---*/

  //Typer
  var typer = function() {
    $('div.messages .text1, div.messages .text2').each(function() {
      $(this).text($(this).text().replace(/ /g, '\u00A0'));
    });
    var line = $('div.messages .text1, div.messages .text2');
    line.hide().contents().each(function() {
      var letters;
      letters = '<span> ' + this.data.split("").join(' <\/span><span> ') + ' <\/span>';
      $(this).replaceWith(letters);
    });
    line.find('span').hide().each(function() {
      if (!$.trim(this.innerHTML)) {
        $(this).remove();
      }
    });
    line.show().find('span').each(function(i) {
      $(this).delay(40 * i).fadeIn(0);
    });
  };

  //Potioncount
  var potionCount = 1;
  $(".potionCount").text(potionCount);


  /*--- Variables ---*/

  //Menu closer
  function reset() {
    $(".item-menu, .pkmn-menu, .fight-menu").css('display', 'none');
    $("p.text1").text(" ");
    $("p.text2").text(" ");
    $(".menu").css('display', 'block');
  }

  //Hide menus
  function hider() {
    $(".menu, .item-menu, .pkmn-menu, .fight-menu").css('display', 'none');
  };

  //Convert health to percentage
  function healthbar(current, total) {
    var hpCurrent = current;
    var hpTotal = total;
    var percentTotal = 100;
    var percentCurrent = (hpCurrent * percentTotal) / hpTotal;
    return percentCurrent;
  }

  //End of attack and return attack
  function attackEnd() {
    if (hpFoe <= 8) {
      $(".foe .healthbar").css('background-color', 'red');
    };
    //Win
    if (hpFoe <= 0) {
      $(".menu").css('display', 'none');
      $(".foe .healthbar").css('width', '0%');
      window.setTimeout(function() {
        $(".foe .image").delay(500).animate({
          bottom: "-35.714em"
        }, 1000);
        $("p.text1").text(foePokemon['name'].toUpperCase()+" fainted!");
        $("p.text2").text("");
        typer();
        window.setTimeout(function() {
          $(".foe .stats").css('display', 'none');
          $("p.text1").text("Got $"+Math.floor(playerLevel*2.5)+" for");
          $("p.text2").text("winning!");
          typer();
          window.setTimeout(function() {
            $("p.text1").text(foe.toUpperCase()+": I can't");
            $("p.text2").text("believe it!");
            typer();
            window.setTimeout(function() {
              $("p.text1").text("I chose the");
              $("p.text2").text("wrong POKeMON!");
              typer();
              window.setTimeout(function() {
                $(".gameboy").hide();
                $("footer").show();
              }, 2000);
            }, 2000);
          }, 2000);
        }, 2000);
      }, 2000);
    }
    //Return attack
    else {
      window.setTimeout(function() {
        $("p.text1").text(foePokemon['name'].toUpperCase()+" used");
        $("p.text2").text(foeMoves[Math.floor(Math.random()*3)].toUpperCase()+"!");
        typer();
        $(".foe .image").animate({
            left: "0.714em"
        }, 100, "linear").animate({
            left: "-1.429em"
        }, 50, "linear").delay(100).animate({
            left: "0.000em"
        }, 10, "linear");
        window.setTimeout(function() {
          $(".player .image").css('opacity', 0);
          window.setTimeout(function() {
            $(".player .image").css('opacity', 1);
            window.setTimeout(function() {
              $(".player .image").css('opacity', 0);
              window.setTimeout(function() {
                $(".player .image").css('opacity', 1);
                window.setTimeout(function() {
                  $(".player .image").css('opacity', 0);
                  window.setTimeout(function() {
                    $(".player .image").css('opacity', 1);
                    window.setTimeout(function() {
                      var basePower = 40;
                      var baseDamage = Math.floor(Math.floor(Math.floor(2*playerLevel/5+2) * basePower * foePokemon['atk']/playerPokemon['def'])/50) + 2;
                      hpPlayer -= baseDamage;
                      if (hpPlayer <= 7) {
                        $(".player .healthbar").css('background-color', 'red');
                      };
                      if (hpPlayer <= 0) {
                        $(".menu").css('display', 'none');
                        $(".player .hp").text("0");
                        $(".player .healthbar").css('width', '0%');
                        $(".player .stats").css('display', 'none');
                        window.setTimeout(function() {
                          $(".player .image").delay(500).animate({
                            bottom: "-35.714em"
                          }, 1000);
                          $("p.text1").text(playerPokemon['name'].toUpperCase()+" fainted...");
                          $("p.text2").text("");
                          typer();
                          window.setTimeout(function() {
                            $("p.text1").text(player.toUpperCase()+" is out of");
                            $("p.text2").text("useable POKeMON...");
                            typer();
                            window.setTimeout(function() {
                              $("p.text1").text(player.toUpperCase()+" whited out!");
                              $("p.text2").text(" ");
                              typer();
                              window.setTimeout(function() {
                                $(".gameboy").hide();
                                $("footer").show();
                              }, 2000);
                            }, 2000);
                          }, 2000);
                        }, 2000);
                      } else {
                        $(".player .hp").text(hpPlayer);
                        $(".player .healthbar").animate({
                          width: healthbar(hpPlayer, hpPlayerTotal) + '%'
                        }, 500);
                        window.setTimeout(function() {
                          reset();
                        }, 2400);
                      };
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

  //Growl
  function growl() {
    hider();
    $("p.text1").text(playerPokemon['name'].toUpperCase());
    $("p.text2").text("used GROWL!");
    typer();
    window.setTimeout(function() {
      if (foeBaseDefense < (foePokemon['def'] - 20)) {
        $("p.text1").text(foePokemon['name'].toUpperCase()+"\'s defense");
        $("p.text2").text("can\'t drop lower!");
        typer();
        window.setTimeout(function() {
          attackEnd();
        }, 2000);
      } else {
        $("p.text1").text(foePokemon['name'].toUpperCase()+"\'s defense");
        $("p.text2").text("dropped by 2!");
        foeBaseDefense-2;
        typer();
        window.setTimeout(function() {
          attackEnd();
        }, 2000);
      }
    }, 2000);
  };

  //Tackle
  function attack(moveName) {
    hider();
    $("p.text1").text(playerPokemon['name'].toUpperCase()+" used");
    $("p.text2").text(moveName.toUpperCase()+"!");
    typer();
    $(".player .image").animate({
        left: "-0.714em"
    }, 100, "linear").animate({
        left: "1.429em"
    }, 50, "linear").delay(100).animate({
        left: "0.000em"
    }, 10, "linear");
    window.setTimeout(function() {
      $(".foe .image").css('opacity', 0);
      window.setTimeout(function() {
        $(".foe .image").css('opacity', 1);
        window.setTimeout(function() {
          $(".foe .image").css('opacity', 0);
          window.setTimeout(function() {
            $(".foe .image").css('opacity', 1);
            window.setTimeout(function() {
              $(".foe .image").css('opacity', 0);
              window.setTimeout(function() {
                $(".foe .image").css('opacity', 1);
                var basePower = 40;
                var baseDamage = Math.floor(Math.floor(Math.floor(2*playerLevel/5+2) * basePower * playerPokemon['atk']/foePokemon['def'])/50) + 2;
                hpFoe -= baseDamage;
                $(".foe .healthbar").animate({
                  width: healthbar(hpFoe, hpFoeFull) + '%'
                }, 500);
                attackEnd();
              }, 100);
            }, 100);
          }, 100);
        }, 100);
      }, 100);
    }, 100);
  };

  //potion use
  function potion(potionStrength) {
    hider();
    if (potionStrength == "normal") {
      var theStrength = 20;
    } else if (potionStrength == "super") {
      var theStrength = 50;
    } else if (potionStrength == "hyper") {
      var theStrength = 200;
    } else if (potionStrength == "max") {
      var theStrength = 999;
    }
    if (hpPlayer >= hpPlayerTotal) {
      $("p.text1").text("HP already");
      $("p.text2").text("full!");
      typer();
      window.setTimeout(function() {
        reset();
      }, 1000);
    } else {
      $("p.text1").text("Used POTION!");
      $("p.text2").text(" ");
      typer();
      hpPlayer += theStrength;
      if (hpPlayer >= hpPlayerTotal) {
        hpPlayer = hpPlayerTotal;
      }
      $(".player .hp").text(hpPlayer);
      $(".player .healthbar").animate({
        width: healthbar(hpPlayer, hpPlayerTotal) + '%'
      }, 500);
      $(".player .healthbar").css('background-color', 'green');
      potionCount--;
      attackEnd();
    }
    $(".potionCount").text(potionCount);
    if (potionCount <= 0) {
      $(".potion").css('display', 'none');
    }
  };


  /*--- Opening Animation ---*/

  $(".loader").animate({
    marginTop: "0.000em"
  }, 2000, 'linear');
  window.setTimeout(function() {
    $(".loader").css('display', 'none');
    $(".battle").css('display', 'block');
    //Opening animations trainers
    $(".sprite, .gary, .ash, .stats, .ash_balls, .gary_balls").css('display', 'none');
    $(".foe .image").animate({
      right: "0.000em"
    }, 2000, 'linear');
    $(".player .image").animate({
      left: "0.000em"
    }, 2000, 'linear');
    window.setTimeout(function() {
      $(".gary, .ash, .ash_balls, .gary_balls").css('display', 'block');
      $(".gary_black, .ash_black").css('display', 'none');
      window.setTimeout(function() {
        $("p.text1").text(foe.toUpperCase()+" wants");
        $("p.text2").text("to fight!");
        typer();
        window.setTimeout(function() {
          $(".ash_balls, .gary_balls").css('display', 'none');
          $(".foe .image").animate({
            right: "-71.429em"
          }, 700, 'linear');
          window.setTimeout(function() {
            $("p.text1").text(foe.toUpperCase()+" sent");
            $("p.text2").text("out "+foePokemon['name'].toUpperCase()+"!");
            typer();
            $(".foe .sprite").css('display', 'block');
            $(".gary").css('display', 'none');
            $(".foe .image").animate({
              right: "0.000em"
            }, 1300, 'linear');
            window.setTimeout(function() {
              $(".foe .stats").css('display', 'block');
              $(".player .image").animate({
                left: "-71.429em"
              }, 700, 'linear');
              window.setTimeout(function() {
                $(".ash").css('display', 'none');
                $(".player .sprite").css('display', 'block');
                $(".foe .stats").css('display', 'block');
                $(".player .image").animate({
                  left: "0.000em"
                }, 1300, 'linear');
                $("p.text1").text("Go! "+playerPokemon['name'].toUpperCase()+"!");
                $("p.text2").text(" ");
                typer();
                $(".player .stats").css('display', 'block');
                window.setTimeout(function() {
                  reset();
                }, 3000);
              }, 1500);
            }, 2000);
          }, 1000);
        }, 2000);
      }, 400);
    }, 2010);
  }, 3000);

  /*--- Interactions ---*/

  //Open item menu
  $('.item').click(function() {
    $(".item-menu").css('display', 'block');
  });

  //Potion
  $('.potion').click(function() {
    potion("normal");
  });

  //Fight
  $('.fight').click(function() {
    $(".fight-menu").css('display', 'block');
  });

  //Stats Attacks
  $('.growl').click(function() {
    growl();
  });

  //Damage Attacks
  $('#move0').click(function(){attack(playerMoves[3]);});
  $('#move1').click(function(){attack(playerMoves[2]);});
  $('#move2').click(function(){attack(playerMoves[1]);});
  $('#move3').click(function(){attack(playerMoves[0]);});

  //Back
  $('.back').click(function() {
    reset();
  });

  //Pokemon
  $('.pkmn').click(function() {
    $(".pkmn-menu").css('display', 'block');
  });

  //Run
  $('.run').click(function() {
    hider();
    $("p.text1").text("You can't run from");
    $("p.text2").text("a POKeMON battle!");
    typer();
    window.setTimeout(function() {
      reset();
    }, 2000);
  });

});

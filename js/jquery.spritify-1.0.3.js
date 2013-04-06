/*
 * jQuery Spritify 1.0.3
 */
(function($){
      
  //START $.fn.spritify
  $.fn.spritify = function (instanceSettings) {
  	
    //settings
    var defaultSettings = {
    	 movement           :                        true,
	     animation          :                       false,
	     distanceOnPress    :                          32, //applies if movement is 'true'
	     movementType       :                   'dynamic', //dynamic, linearLR, linearUD
	     collisionDetection : function() { return true; },
	     image              :             'img/kanto.png',
	     upControl          :                          38,
	     rightControl       :                          39,
	     downControl        :                          40,
	     leftControl        :                          37,
	     charSpeed          :                         300
    };
  
    
	
    /***********************
    //General Configuring (Global Variables)
    ***********************/
	
    // get the defaults or any user set options
    var settings = $.extend(defaultSettings, instanceSettings);	
	
    //define our objects
	var character = $(this);
    var currentKey;      //records the current keypressed
    var charStep = 2;    //1=1st foot, 2=stand, 3=2nd foot, 4=stand
	
	   //define background css positions
	   var front_right, front_stand, front_left, 
	       left_right, left_stand, left_left, 
		      right_right, right_stand, right_left, 
	      	back_right, back_stand, back_left;
	
	   //configure sprite onload
	   var sprite = new Image();
	   sprite.onload = function() {

	   var sprite_width = this.width;
	   var sprite_height = this.height;
	  
	   switch(settings.movementType) {
		    case 'dynamic':

		      var display_width = sprite_width/3;
		      var display_height = sprite_height/4;
		  
		      character.css({
		        'position'   : 'absolute',
		        'width'      : display_width+'px',
		        'height'     : display_height+'px',
		        'z-index'    : '1',
		        'background' : 'url(\''+settings.image+'\') no-repeat'
		      });
		  
		      //front position
		      front_right = '0px 0px';
		      var front_stand_x = -parseInt(sprite_width/3);
		      front_stand = front_stand_x+'px 0px';
		      var front_left_x = -parseInt((sprite_width/3)*2);
		      front_left = front_left_x+'px 0px';
		  
		      //left position
		      var left_right_y = -parseInt(sprite_height/4);
		      left_right = '0px '+left_right_y+'px';
		      var left_stand_x = -parseInt(sprite_width/3);
		      var left_stand_y = -parseInt(sprite_height/4);
		      left_stand = left_stand_x+'px '+left_stand_y+'px';
		      var left_left_x = -parseInt((sprite_width/3)*2);
		      var left_left_y = -parseInt(sprite_height/4);
		      left_left = left_left_x+'px '+left_left_y+'px';
		  
		      //right position
		      var right_right_x = -parseInt((sprite_width/3)*2);
		      var right_right_y = -parseInt((sprite_height/4)*2);
		      right_right = right_right_x+'px '+right_right_y+'px';
		      var right_stand_x = -parseInt(sprite_width/3);
		      var right_stand_y = -parseInt((sprite_height/4)*2);
		      right_stand = right_stand_x+'px '+right_stand_y+'px';
		      var right_left_y = -parseInt((sprite_height/4)*2);
		      right_left = '0px '+right_left_y+'px';
		  
		      //back position
		      var back_right_y = -parseInt((sprite_height/4)*3);
		      back_right = '0px '+back_right_y+'px';
		      var back_stand_x = -parseInt(sprite_width/3);
		      var back_stand_y = -parseInt((sprite_height/4)*3);
		      back_stand = back_stand_x+'px '+back_stand_y+'px';
		      var back_left_x = -parseInt((sprite_width/3)*2);
		      var back_left_y = -parseInt((sprite_height/4)*3);
		      back_left = back_left_x+'px '+back_left_y+'px';
    
		      break;
		    case'linearLR':
		
		      var display_width = sprite_width/3;
		      var display_height = sprite_height/2;
		  
		      character.css({
		        'position'   : 'absolute',
		        'width'      : display_width+'px',
		        'height'     : display_height+'px',
		        'z-index'    : '1',
		        'background' : 'url(\''+settings.image+'\') no-repeat'
		      });
		  
		      //left position
		      left_right = '0px 0px';
		      var left_stand_x = -parseInt(sprite_width/3);
		      left_stand = left_stand_x+'px 0px';
		      var left_left_x = -parseInt((sprite_width/3)*2);
		      left_left = left_left_x+'px 0px';
		  
		      //right position
		      var right_right_x = -parseInt((sprite_width/3)*2);
		      var right_right_y = -parseInt(sprite_height/2);
		      right_right = right_right_x+'px '+right_right_y+'px';
		      var right_stand_x = -parseInt(sprite_width/3);
		      var right_stand_y = -parseInt(sprite_height/2);
		      right_stand = right_stand_x+'px '+right_stand_y+'px';
		      var right_left_y = -parseInt(sprite_height/2);
		      right_left = '0px '+right_left_y+'px';

		      break;
		    case'linearUD':
		
		      var display_width = sprite_width/3;
		      var display_height = sprite_height/2;
		  
		      character.css({
		        'position'   : 'absolute',
		        'width'      : display_width+'px',
		        'height'     : display_height+'px',
		        'z-index'    : '1',
		        'background' : 'url(\''+settings.image+'\') no-repeat'
		      });
		  
		      //front position
		      front_right = '0px 0px';
		      var front_stand_x = -parseInt(sprite_width/3);
		      front_stand = front_stand_x+'px 0px';
		      var front_left_x = -parseInt((sprite_width/3)*2);
		      front_left = front_left_x+'px 0px';
		  
		      //back position
		      var back_right_y = -parseInt(sprite_height/2);
		      back_right = '0px '+back_right_y+'px';
		      var back_stand_x = -parseInt(sprite_width/3);
		      var back_stand_y = -parseInt(sprite_height/2);
		      back_stand = back_stand_x+'px '+back_stand_y+'px';
		      var back_left_x = -parseInt((sprite_width/3)*2);
		      var back_left_y = -parseInt(sprite_height/2);
		      back_left = back_left_x+'px '+back_left_y+'px';
		  
		      break;
	   }
	 }
	 sprite.src = settings.image;
		
  
  $(document).keydown(function(e) {
  
    //disable normal keyevents
    var ar = new Array(settings.upControl, settings.rightControl, settings.downControl, settings.leftControl);
      if($.inArray(e.which,ar) > -1) {
        e.preventDefault();
      }
	  
    if (!currentKey && character.queue("fx").length == 0) {

      switch(settings.movementType) {
        case 'dynamic':
          if (e.keyCode == settings.upControl 
              || e.keyCode == settings.rightControl
              || e.keyCode == settings.downControl
              || e.keyCode == settings.leftControl) {
            //set the currentKey and move the char
            currentKey = e.keyCode;
            character.processSpritify(currentKey);
          }
          break;
        case 'linearLR':
          if (e.keyCode == settings.rightControl
              || e.keyCode == settings.leftControl) {
            //set the currentKey and move the char
            currentKey = e.keyCode;
            character.processSpritify(currentKey);
          }
          break;
        case 'linearUD':
          if (e.keyCode == settings.upControl 
              || e.keyCode == settings.downControl) {
            //set the currentKey and move the char
            currentKey = e.keyCode;
            character.processSpritify(currentKey);
          }
          break;
      } //end switch

    }
  
  }); //END: keydown
      
  $(document).keyup(function(e) {
    //don't stop the walk if the player is pushing other buttons
    //only stop the walk if the key that started the walk is released
    if (e.keyCode == currentKey) {
      currentKey = false;
    }
  }); //END: keyup


  /*****************
  * Primary Functions
  * modular functions used to perform object movement and animations
  *****************/

  //START: processSpritify()
  $.fn.processSpritify = function(key) {
 
    if (settings.animation) character.animateObj(key);

    if (settings.movement) character.moveObj(key);

    //set processSpritify again if currentKey is still down
    setTimeout(function() {
      if (currentKey == key) character.processSpritify(key);
    }, settings.charSpeed);
 
  }; 
  //END processSpritify()


  //START: animate the object function
  $.fn.animateObj = function(key) {

    //adjust from code to lang
    switch(key) {
      case settings.upControl: dir = 'back';  break;
      case settings.rightControl: dir = 'right'; break;
      case settings.downControl: dir = 'front';  break;
      case settings.leftControl: dir = 'left';  break;
    }

    //increment the character's step
    charStep++;
    if (charStep == 5) charStep = 1;
		
    //START: add the new class (direction image)
    switch(charStep) {
      case 1: 
        character.css('background-position', eval(dir+'_stand')); 
        setTimeout(function() { 
          charStep++;
          if (charStep == 5) charStep = 1;
          character.css('background-position', eval(dir+'_right')); 
        }, (settings.charSpeed/3));
        setTimeout(function() { 
          charStep++;
          if (charStep == 5) charStep = 1;
          character.css('background-position', eval(dir+'_stand')); 
        }, ((settings.charSpeed/3)*2));
        break;
      case 2: 
        character.css('background-position', eval(dir+'_right'));
        setTimeout(function() { 
          charStep++;
          if (charStep == 5) charStep = 1;
          character.css('background-position', eval(dir+'_stand')); 
        }, (settings.charSpeed/3));
        setTimeout(function() { 
          charStep++;
          if (charStep == 5) charStep = 1;
          character.css('background-position', eval(dir+'_left')); 
        }, ((settings.charSpeed/3)*2));
        break;
      case 3: 
        character.css('background-position', eval(dir+'_stand'));
        setTimeout(function() { 
          charStep++;
          if (charStep == 5) charStep = 1;
          character.css('background-position', eval(dir+'_left'));
        }, (settings.charSpeed/3));
        setTimeout(function() { 
          charStep++;
          if (charStep == 5) charStep = 1;
          character.css('background-position', eval(dir+'_stand')); 
        }, ((settings.charSpeed/3)*2)); 
        break;
      case 4: 
        character.css('background-position', eval(dir+'_left'));
        setTimeout(function() { 
          charStep++;
          if (charStep == 5) charStep = 1;
          character.css('background-position', eval(dir+'_stand')); 
        }, (settings.charSpeed/3));
        setTimeout(function() { 
          charStep++;
          if (charStep == 5) charStep = 1;
          character.css('background-position', eval(dir+'_right')); 
        }, ((settings.charSpeed/3)*2));
        break;
    }
    //END: add the new class (direction image)
  };
  //END: animate the object function

  //START: move the object function
  $.fn.moveObj = function(key) {

    //finish the previous movement before moving again
    if ($(this).queue("fx").length != 0) $(this).stop(true,true);

    //START: move the char
    switch(key) {
      case settings.upControl: 
        dir = 'back';
        if (settings.collisionDetection(settings,$(this),dir)) {
          $(this).animate({top: '-='+settings.distanceOnPress}, settings.charSpeed, "linear");
        }
        break;
      case settings.rightControl: 
        dir = 'right';
        if (settings.collisionDetection(settings,$(this),dir)) {
          $(this).animate({left: '+='+settings.distanceOnPress}, settings.charSpeed, "linear");
        }
        break;
      case settings.downControl: 
        dir = 'front';
        if (settings.collisionDetection(settings,$(this),dir)) {
          $(this).animate({top: '+='+settings.distanceOnPress}, settings.charSpeed, "linear");
        }  
        break;
      case settings.leftControl: 
        dir = 'left';
        if (settings.collisionDetection(settings,$(this),dir)) {
          $(this).animate({left: '-='+settings.distanceOnPress}, settings.charSpeed, "linear");
        }
        break;
    }
    //END: move the char

  };
  //END: move the object function
		
		}
  //END $.fn.spritify
    
})(jQuery)
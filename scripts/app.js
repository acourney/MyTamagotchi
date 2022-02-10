/* === TODO === */
/*
1. Don't let execution start until a name variable is assigned
*/

/* === Images === */
const age0_movementA_happy = "https://imgur.com/pUnWbun.png";
const age0_movementA_sad = "https://imgur.com/8YIq0EL.png";
const age0_movementB_happy = "https://imgur.com/KiCFSIe.png";
const age0_movementB_sad = "https://imgur.com/3n9qf8b.png";

const age1_movementA_happy = "https://imgur.com/H40VBM8.png";
const age1_movementA_sad = "https://imgur.com/FanDIha.png";
const age1_movementB_happy = "https://imgur.com/iBK1QBJ.png";
const age1_movementB_sad = "https://imgur.com/kRuAKW0.png";

const age2_movementA_happy = "https://imgur.com/jYcg6dw.png";
const age2_movementA_sad = "https://imgur.com/rBwaH7W.png";
const age2_movementB_happy = "https://imgur.com/m3tYoQ9.png";
const age2_movementB_sad = "https://imgur.com/wXgwBml.png";

const age3_movementA_happy = "https://imgur.com/dmA0M06.png";
const age3_movementA_sad = "https://imgur.com/zW1FxS6.png";
const age3_movementB_happy = "https://imgur.com/e8opavu.png";
const age3_movementB_sad = "https://imgur.com/TBzH82j.png";


/* === Instantiate Tamagotchi === */
class Tamagotchi {
  constructor(name) {
    // initial properties:
    this.hunger = 1;
    this.sleepiness = 1;
    this.boredom = 1;
    this.age = 0;
    // user-assigned properties:
    // this.name = prompt("What is your tamagotchi's name?");
    this.name = name;

    console.log(`initial hunger ${this.hunger}, type: ${typeof this.hunger}`);
    console.log(`initial sleepiness ${this.sleepiness}, type: ${typeof this.sleepiness}`);
    console.log(`initial boredom ${this.boredom}, type: ${typeof this.boredom}`);
    console.log(`initial age ${this.age}, type: ${typeof this.age}`);
    console.log(`initial name ${this.name}, type: ${typeof this.name}`);
  }

  increaseHunger(){
    console.log(`increasing hunger to ${this.hunger}`);
    if (this.hunger >= 10) {
      showDeathModal("starvation");
      intervalList.forEach(function(interval) {
        clearInterval(interval);
      });

    } else {
      this.hunger += 1;
    }
    
  }

  increaseSleepiness(){
    console.log(`increasing sleepiness to ${this.sleepiness}`);
    if (this.sleepiness >= 10) {
      showDeathModal("lack of sleep");
      intervalList.forEach(function(interval) {
        clearInterval(interval);
      });
    } else {
      this.sleepiness += 1;
    } 
  }

  increaseBoredom(){
    console.log(`increasing boredom to ${this.boredom}`);
    if (this.boredom >= 10) {
      showDeathModal("boredom");
      intervalList.forEach(function(interval) {
        clearInterval(interval);
      });
    } else {
      this.boredom += 1;
    }
  }

  increaseAge(){
    console.log(`increasing age to ${this.age}`);
    if (this.age < 3 ) {
      this.age += 1;
    }
  }

  eat(food){
    console.log(`${this.name} just ate ${food}`);
    if (this.hunger > 0) {
      return this.hunger -= 1;
    }
    return this.hunger;
  }

  sleep(time){
    console.log(`${this.name} just slept for ${time} night`);
    if (this.sleepiness > 0) {
      return this.sleepiness -= 1;
    }
    return this.sleepiness;
  }

  play(game){
    console.log(`${this.name} just played ${game}`);
    if (this.boredom > 0) {
      return this.boredom -= 1;
    }
    return this.boredom;
  }

}
/* === Make New Tamagotchi / Input Name === */
let tamagotchi = {};

$(window).on('load', function() {
  $('#name_modal').modal('show');
});

const makeTamagotchi = function() {
  console.log("saveName function called");
  $("#name_modal_footer button").off();
  $('#name_modal').modal('hide');
  tamagotchi = new Tamagotchi($(".modal-body input").val());
}

/* === Decrease Stats Over Time === */
/* I want to offset the increase of hunger, boredom, and sleepiness
so a tamagotchi can't die of all three at the same time.*/
const nineSeconds = 9000;
const tenSeconds = 10000;
const elevenSeconds = 11000;
const fifteenSeconds = 15000;
const oneHour = 36000000;

const hungerInterval = setInterval(() => tamagotchi.increaseHunger(), oneHour);
const sleepinessInterval = setInterval(() => tamagotchi.increaseSleepiness(), oneHour);
const boredomInterval = setInterval(() => tamagotchi.increaseBoredom(), oneHour);
const ageInterval = setInterval(() => tamagotchi.increaseAge(), fifteenSeconds);


/* === Animate Tamagotchi === */

const determineMood = function(){
  if (tamagotchi.hunger < 5 && tamagotchi.boredom < 5 && tamagotchi.sleepiness < 5) {
    console.log("the tamagotchi is happy");
    return("happy");
  } else {
    console.log("the tamagotchi is sad.");
    return("sad");
  }
}

const ageUpSprite = function() {
  if (tamagotchi.age === 0) {
    // $("#tamagotchi-sprite").attr("src", age0_neutral);
    animateTamagotchi();
  }
  else if (tamagotchi.age === 1) {
    // $("#tamagotchi-sprite").attr("src", age1_neutral);
    animateTamagotchi();
  }  
  else if (tamagotchi.age === 2) {
    // $("#tamagotchi-sprite").attr("src", age2_neutral);
    animateTamagotchi();
  }
  else if (tamagotchi.age >= 3) {
    // $("#tamagotchi-sprite").attr("src", age3_neutral);
    animateTamagotchi();
  }

}

const animateTamagotchi = function() {

  let mood = determineMood();

  if (mood === "sad") {
    if (tamagotchi.age === 0){
      if ($("#tamagotchi-sprite").attr("src") !== age0_movementB_sad) {
        $("#tamagotchi-sprite").attr("src", age0_movementB_sad);
      } else if ($("#tamagotchi-sprite").attr("src") === age0_movementB_sad) {
        $("#tamagotchi-sprite").attr("src", age0_movementA_sad);
      }
    }
        
    if (tamagotchi.age === 1){
      if ($("#tamagotchi-sprite").attr("src") !== age1_movementB_sad) {
        $("#tamagotchi-sprite").attr("src", age1_movementB_sad);
      } else if ($("#tamagotchi-sprite").attr("src") === age1_movementB_sad) {
        $("#tamagotchi-sprite").attr("src", age1_movementA_sad);
      }
    }          
    if (tamagotchi.age === 2){
      if ($("#tamagotchi-sprite").attr("src") !== age2_movementB_sad) {
        $("#tamagotchi-sprite").attr("src", age2_movementB_sad);
      } else if ($("#tamagotchi-sprite").attr("src") === age2_movementB_sad) {
        $("#tamagotchi-sprite").attr("src", age2_movementA_sad);
      }
    }      
    if (tamagotchi.age === 3){
      if ($("#tamagotchi-sprite").attr("src") !== age3_movementB_sad) {
        $("#tamagotchi-sprite").attr("src", age3_movementB_sad);
      } else if ($("#tamagotchi-sprite").attr("src") === age3_movementB_sad) {
        $("#tamagotchi-sprite").attr("src", age3_movementA_sad);
      }
    }      


  } else if (mood === "happy") {
    if (tamagotchi.age === 0){
      if ($("#tamagotchi-sprite").attr("src") !== age0_movementB_happy) {
        $("#tamagotchi-sprite").attr("src", age0_movementB_happy);
      } else if ($("#tamagotchi-sprite").attr("src") === age0_movementB_happy) {
        $("#tamagotchi-sprite").attr("src", age0_movementA_happy);
      }
    } else if (tamagotchi.age === 1) {
      if ($("#tamagotchi-sprite").attr("src") !== age1_movementB_happy) {
        $("#tamagotchi-sprite").attr("src", age1_movementB_happy);
      } else if ($("#tamagotchi-sprite").attr("src") === age1_movementB_happy) {
        $("#tamagotchi-sprite").attr("src", age1_movementA_happy);
      }
    }          
    if (tamagotchi.age === 2){
      if ($("#tamagotchi-sprite").attr("src") !== age2_movementB_happy) {
        $("#tamagotchi-sprite").attr("src", age2_movementB_happy);
      } else if ($("#tamagotchi-sprite").attr("src") === age2_movementB_happy) {
        $("#tamagotchi-sprite").attr("src", age2_movementA_happy);
      }
    }      
    if (tamagotchi.age === 3){
      if ($("#tamagotchi-sprite").attr("src") !== age3_movementB_happy) {
        $("#tamagotchi-sprite").attr("src", age3_movementB_happy);
      } else if ($("#tamagotchi-sprite").attr("src") === age3_movementB_happy) {
        $("#tamagotchi-sprite").attr("src", age3_movementA_happy);
      }
    }      
  
  }
}

const animationInterval = setInterval(ageUpSprite, 1000);

/* === Set Global Variables for Gameplay === */
const $eat = $(".gg-bowl");
const $sleep = $("#bed-icon");
const $play = $(".gg-games");
const $info = $(".gg-info");  
//const $("")
const navBarArray = [$eat, $sleep, $play, $info];

const selectedTextColor = 'rgb(244, 245, 211)';
const unselectedTextColor = 'rgb(31, 27, 27)';

/* === Set Actions for Buttons === */

const highlightIcons = function(){
  if ($eat.css("color") === unselectedTextColor && $sleep.css("color") === unselectedTextColor && $play.css("color") === unselectedTextColor && $info.css("color") === unselectedTextColor) {
    
    $eat.css("color", "var(--main-text-color)");
    
  
  } else if ($eat.css("color") === selectedTextColor && $sleep.css("color") === unselectedTextColor && $play.css("color") === unselectedTextColor && $info.css("color") === unselectedTextColor) {
    
    $eat.css("color", "var(--secondary-text-color)");
    $sleep.css("color", "var(--main-text-color)");
  
  } else if ($eat.css("color") === unselectedTextColor && $sleep.css("color") === selectedTextColor && $play.css("color") === unselectedTextColor && $info.css("color") === unselectedTextColor) {
    
    $sleep.css("color", "var(--secondary-text-color)");
    $play.css("color", "var(--main-text-color)");
    
  
  } else if ($eat.css("color") === unselectedTextColor && $sleep.css("color") === unselectedTextColor && $play.css("color") === selectedTextColor && $info.css("color") === unselectedTextColor) {
    
    $play.css("color", "var(--secondary-text-color)");
    $info.css("color", "var(--main-text-color)");
    
  
  } else {
    
    $info.css("color", "var(--secondary-text-color)");
    $eat.css("color", "var(--main-text-color)");
    
  
  }

}


const selectAction = function(){
  if ($eat.css("color") === unselectedTextColor && $sleep.css("color") === unselectedTextColor && $play.css("color") === unselectedTextColor && $info.css("color") === unselectedTextColor) {
    
    console.log("nothing selected");
  
  } else if ($eat.css("color") === selectedTextColor && $sleep.css("color") === unselectedTextColor && $play.css("color") === unselectedTextColor && $info.css("color") === unselectedTextColor) {
    
    tamagotchi.eat('food');
    $("footer.screen").append("<p>Hunger -1</p>");
  
  } else if ($eat.css("color") === unselectedTextColor && $sleep.css("color") === selectedTextColor && $play.css("color") === unselectedTextColor && $info.css("color") === unselectedTextColor) {
    
    tamagotchi.sleep(1);
    $("footer.screen").append("<p>Sleepiness -1</p>");

  } else if ($eat.css("color") === unselectedTextColor && $sleep.css("color") === unselectedTextColor && $play.css("color") === selectedTextColor && $info.css("color") === unselectedTextColor) {
    
    tamagotchi.play('games');
    $("footer.screen").append("<p>Boredom -1</p>");

  } else {
    /* === Show Info Modal === */
    $("#info_modal_body").append(`<p>Hunger: ${tamagotchi.hunger} </br> Sleepiness: ${tamagotchi.sleepiness} </br> Boredom: ${tamagotchi.boredom} </br></br> Age: ${tamagotchi.age} </p>`);
    $('#info_modal').modal('show');    
  }
  
}

const statNotificationInterval = setInterval(() => $("footer.screen").empty(), 1500);

const cancelAction = function(){
  $eat.css("color", "var(--secondary-text-color)");
  $sleep.css("color", "var(--secondary-text-color)");
  $play.css("color", "var(--secondary-text-color)");
  $info.css("color", "var(--secondary-text-color)");
}

$("#A").click(highlightIcons);
$("#B").click(selectAction);
$("#C").click(cancelAction);


/* === Show Modals === */

/* === Death Modal === */
const showDeathModal = function (causeOfDeath){
  console.log(causeOfDeath);
  $("#death_modal_body").append(`<p>${tamagotchi.name} has died from ${causeOfDeath}. </p>`);
  $('#death_modal').modal('show');
  return;
}


/* === Event Listeners === */

$('.modal').on('shown.bs.modal', function () {
  $('#myInput').trigger('focus')
})

$("#name_modal_footer button").click(makeTamagotchi);

$("#info_modal_ok_button").click(function() {
  $("#info_modal_body").empty();
  $('#info_modal').modal('hide');
});

$("#death_modal_footer button").click(function() {
  window.location.reload();
});


/* === Changing Color Options === */
const tamagotchiColorOptions = [
  "rgba(0, 0, 0, 0) radial-gradient(circle, rgba(86, 199, 186, 0.89) 50%, rgb(42, 157, 143) 65%) repeat scroll 0% 0% / auto padding-box border-box",

  "rgba(0, 0, 0, 0) radial-gradient(circle, rgb(208, 137, 144) 50%, rgb(183, 110, 121) 65%) repeat scroll 0% 0% / auto padding-box border-box",

  "rgba(0, 0, 0, 0) radial-gradient(circle, rgb(78, 84, 133) 50%, rgb(61, 64, 91) 65%) repeat scroll 0% 0% / auto padding-box border-box"
];

const tamagotchiScreenDecorationOptions = [
  "rgba(0, 0, 0, 0) radial-gradient(circle, rgb(244, 241, 222) 50%, rgb(248, 247, 237) 65%) repeat scroll 0% 0% / auto padding-box border-box",

  "rgba(0, 0, 0, 0) radial-gradient(circle, rgb(132,159,213) 50%, rgb(109, 132, 179) 65%) repeat scroll 0% 0% / auto padding-box border-box",

  "rgba(0, 0, 0, 0) radial-gradient(circle, rgb(236, 183, 191) 50%, rgb(228, 155, 166) 65%) repeat scroll 0% 0% / auto padding-box border-box"
];

const backgroundColorOptions = [
  "rgb(115, 79, 90)", 
  "rgb(244, 162, 97)",
  "rgb(242, 204, 143)"
];

$(".page-footer #tamagotchi-color").click(function() {
  if ($("main").css("background") === tamagotchiColorOptions[0]){
    $("main").css("background", tamagotchiColorOptions[1]);
    $("nav").css("background-color", "rgb(131, 84, 124)");
    $("footer.screen").css("background-color", "rgb(131, 84, 124)");
    $("#screen_decorations").css('background', tamagotchiScreenDecorationOptions[2]);
  } else if ($("main").css("background") === tamagotchiColorOptions[1]){
    $("main").css("background", tamagotchiColorOptions[2]);
    $("nav").css("background-color", "rgb(62, 112, 132)");
    $("footer.screen").css("background-color", "rgb(62, 112, 132)");
    $("#screen_decorations").css('background', tamagotchiScreenDecorationOptions[1]);
  } else if ($("main").css("background") === tamagotchiColorOptions[2]){
    $("main").css("background", tamagotchiColorOptions[0]);
    $("nav").css("background-color", "rgb(62, 112, 132)");
    $("footer.screen").css("background-color", "rgb(62, 112, 132)");
    $("#screen_decorations").css('background', tamagotchiScreenDecorationOptions[0]);
  }
});

$(".page-footer #background-color").click(function() {
  if ($("body").css("background-color") === backgroundColorOptions[0]){
    $("body").css("background-color", backgroundColorOptions[1]);
  } else if ($("body").css("background-color") === backgroundColorOptions[1]){
    $("body").css("background-color", backgroundColorOptions[2]);
  } else if ($("body").css("background-color") === backgroundColorOptions[2]){
    $("body").css("background-color", backgroundColorOptions[0]);
  }

});

/* === storing intervals in a list to turn off later === */
const intervalList = [hungerInterval, sleepinessInterval, boredomInterval, ageInterval, animationInterval, statNotificationInterval];

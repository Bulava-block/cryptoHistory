//File for fetching all the cats from the blockchain
// into the catalogue
// when the page load, create a catalogue
$(document).ready(function () {
  setTimeout(() => {
    getKitties();
    
    
  }, 1000);
});

function appendCat(dna, id, generation, onSaleCats="catsDiv", column=4) {
  console.log(dna, id, onSaleCats);
  // 1 return cat dna into readable string
  var KittyDna = catDna(dna);
  //2 build a catBox into html
  catBox(id, onSaleCats, column);
  //3 render the cats css style depending on dna string
  renderCat(KittyDna, id);
  $("#catDNA" + id).html(
    `
    <span class= "badge badge-light"><h4 class= "tsp-2 m-0"><b>GEN:</b>${generation}</h4></span>
    <br>

    <span class= "badge badge-light"><h4 class= "tsp-2 m-0"><b>DNA:</b> 
      ${dna} 
      </h4></span>
      </br>
  `
  );
}

//Apply cat css Styles from buildCat.js
function renderCat(dna, id) {
  headColor1(dna.headcolor, id);
  mouthAndBelly(dna.mouthColor, id);
  eyeColor(dna.eyesColor, id);
  earsAndPaw(dna.earsColor, id);
  eyeVariation(parseInt(dna.eyesShape), id);
  decorationVariation(parseInt(dna.decorationPattern), id);
  midColor(dna.decorationMidcolor, id);
  SidesColor(dna.decorationSidescolor, id);
  animationVariation(parseInt(dna.animation), id);
}

//Spitting the cat DNA to use it in render
function catDna(dnaStr) {
  var dna = {
    //Colors
    headcolor: dnaStr.substring(0, 2),
    mouthColor: dnaStr.substring(2, 4),
    eyesColor: dnaStr.substring(4, 6),
    earsColor: dnaStr.substring(6, 8),
    //Catributes
    eyesShape: dnaStr.substring(8, 9),
    decorationPattern: dnaStr.substring(9, 10),
    decorationMidcolor: dnaStr.substring(10, 12),
    decorationSidescolor: dnaStr.substring(12, 14),
    animation: dnaStr.substring(14, 15),
    lastNum: dnaStr.substring(15, 16),
  };
  return dna;
}

//Cat html div

var name = "Stas";
var string = "Hello" + name + "!";


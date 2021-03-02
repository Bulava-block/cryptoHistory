var colors = Object.values(allColors());

function headColor1(code, id) {
  var color = colors[code];
  $(`#head` + id + `, #chest` + id).css("background", "#" + color);
}

function mouthAndBelly(code, id) {
  var color = colors[code];
  $(`#mouth-contour` + id + `, #tail` + id + `, #chest_inner` + id).css(
    "background",
    "#" + color
  );
}

function eyeColor(code, id) {
  var color = colors[code];
  $(`#cat__eye` + id)
    .find("span")
    .css("background", "#" + color);
}

function earsAndPaw(code, id) {
  var color = colors[code];
  $(
    `#leftEar` +
      id +
      `,#rightEar` +
      id +
      `, #pawLeft` +
      id +
      `, #pawLeftInner` +
      id
  ).css("background", "#" + color);
}



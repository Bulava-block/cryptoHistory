var colors = Object.values(allColors());

function headColor1(code, id) {
  var color = colors[code];
  $(`#head` + id + `, #chest` + id).css("background", "#" + color);
}



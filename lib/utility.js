export function colorForSpeed (speed) {
  var color = "success";
  if (speed >= 900) color = "primary";
  else if (speed < 750) {
    if (speed >= 350) color = "warning";
    else color = "danger";
  }
  return color;
}
  
const speedRakings = [150, 250, 350, 450, 550, 650, 750, 850, 900, 950, 1000]; // kmh
  
export function rankSpeed (aircraftSpeed) {
  var rank;
  speedRakings.forEach((speed, id) => {
    if (aircraftSpeed >= speed) rank = id;
  })
  return {'10': rank, '100': rank * 10};
}

export function getWeightStats (aircraftWeight) {
  var weight = {color: "info", rus: "Лёгкий"}
  if (aircraftWeight > 7000) weight = {color: "success", rus: "Средний"}
  if (aircraftWeight > 136000) weight = {color: "danger", rus: "Тяжёлый"}
  if (aircraftWeight > 550000) weight = {color: "primary", rus: "Сверхтяжёлый"}
  
  return weight;
}

function tempConverter(temp) {
  var newTemp = ((((9/5)*(temp - 273)) + 32).toFixed(0) + '°')
  return newTemp
}

function timeConverter(time) {
  var newTime = Number(time[0] + time[1]);
  if (newTime === 0) {
    newTime = 12 + 'am'
  } else if (newTime > 12) {
    newTime = newTime - 12 + 'pm'
  } else if (newTime === 12) {
    newTime = newTime + 'pm'
  } else {
    newTime = newTime + 'am'
  }
  return newTime
}

function dateConverter(i) {
  var today = new Date();
  var date = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][today.getDay() + i]
  return date
}


module.exports = function (response) {
  var weather = response.body.list.map(function (element) {
    return [JSON.stringify(element.dt_txt), JSON.stringify(element.main.temp), JSON.stringify(element.weather[0].description)]
  })
  var object = {};
  weather.forEach(function (element) {
    var arr = [];
    var date = element[0].split(' ');
    arr.push(timeConverter(date[1]), [tempConverter(element[1]), element[2]]);
    object[date[0]] = object[date[0]] || [];
    object[date[0]].push(arr);
  })
  var arr = [];
  var i = 0;
  for (var key in object) {
    arr.push([dateConverter(i), object[key]])
    i++;
  }
  return arr;
}

function tempConverter(temp) {
  var newTemp = (((temp * 9/5) - 459.67).toFixed(0) + '°')
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
  var object2 = {};
  weather.forEach(function (element) {
    var date = element[0].split(' ');
    object2[date[1]] = {temp: element[1], description: element[2]};
    object[date[0]] = object2;
  })
  var arr = [];
  var i = 0;
  for (var key in object) {
    var arr2 = [];
    for (var k in object[key]) {
      arr2.push([timeConverter(k), [tempConverter(object[key][k].temp), object[key][k].description]])
    }
    arr.push([dateConverter(i), arr2])
    i++;
  }
  return arr;
}

module.exports = function (page1, page2, page3, page4, page5, page6) {
  var tempArr = [];


  page1.body.resultsPage.results.event.forEach(function (element) {
    element.start.date = element.start.date.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1');
    tempArr.push(element);
  });

  if(page2.body.resultsPage.results.event) {
    page2.body.resultsPage.results.event.forEach(function (element) {
      element.start.date = element.start.date.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1');
      tempArr.push(element);
    });
  }
  if(page3.body.resultsPage.results.event) {
    page3.body.resultsPage.results.event.forEach(function (element) {
      element.start.date = element.start.date.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1');
      tempArr.push(element);
    });
  }
  if(page4.body.resultsPage.results.event) {
    page4.body.resultsPage.results.event.forEach(function (element) {
      element.start.date = element.start.date.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1');
      tempArr.push(element);
    });
  }
  if(page5.body.resultsPage.results.event) {
    page5.body.resultsPage.results.event.forEach(function (element) {
      element.start.date = element.start.date.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1');
      tempArr.push(element);
    });
  }
  if(page6.body.resultsPage.results.event) {
    page6.body.resultsPage.results.event.forEach(function (element) {
      element.start.date = element.start.date.replace(/(\d+)-(\d+)-(\d+)/, '$2/$3/$1');
      tempArr.push(element);
    });
  }

var musicDaysArr = [[],[],[],[],[]];
var j = 0;
  for(var i = 0; i < tempArr.length; i++) {
    if (i === 0) {
      musicDaysArr[j].push(tempArr[i]);
    } else if (tempArr[i].start.date === tempArr[i-1].start.date) {
        musicDaysArr[j].push(tempArr[i]);
    } else {
        j += 1;
        if (j >= musicDaysArr.length) {
          break;
        } else {
          musicDaysArr[j].push(tempArr[i]);
        }
    }
  }

  return musicDaysArr;
};

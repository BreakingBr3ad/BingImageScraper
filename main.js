const request = require('request');
const fs = require('fs');
const cheerio = require('cheerio');
const prompt = require('prompt-sync')();

queryName = prompt("Choose keyword image to search: ")

if (queryName === undefined){
  console.log("Invalid Input")
}
else{
  var scrapeTest = {
      method:'GET',
      uri: 'https://www.bing.com/images/search?sc=8-5&cvid=96D7B6630E6F4AEC85B3803F01836996&tsc=ImageHoverTitle&q='+queryName+'&qft=+filterui:imagesize-large&form=IRFLTR&first=1'
  }
  let trimLink = []
  request(scrapeTest, function(error,response,html){
      let $ = cheerio.load(html)
      $('.imgpt').each(function(i){
          let dbb = $(this)
          console.log(dbb.html())
          let iusc = dbb.find('.iusc');
          console.log("IUSC HTML: "+iusc.html())
          let linkTrimA = iusc.html()
          console.log("LINKTRIMA: "+linkTrimA)
          let linkTrimB = linkTrimA.split('href="')
          console.log("LINKTRIMB: " +linkTrimB[1])
          let linkTrimC = linkTrimB[1].split('"')
          console.log("LINKTRIMC: "+linkTrimC[0])
          trimLink[i] = linkTrimC[0]
          
          //console.log("trimLink= "+trimLink)
      })
  fs.writeFile('log.txt', trimLink+"\r\n", function (err) {
      if (err) {
        return console.log(err);
      }
    });
  })
 
}

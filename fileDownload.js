const fs = require('fs')
const request = require('request')

const download = (url, path, callback) => {
  request.head(url, (err, res, body) => {
    request(url)
      .pipe(fs.createWriteStream(path))
      .on('close', callback)
  })
}
let urlData = fs.readFileSync('log.txt','utf-8')
let trimurlData = urlData.trim().split(',')
let dir = './images'
const dirLength = fs.readdirSync('./images/').length
console.log(dirLength)
for (let i=0; i<trimurlData.length; i++){
const url = trimurlData[i]
const path = './images/'+(i+dirLength+1)+'.png'

download(url, path, () => {
  console.log('✅ Done!')
})

}

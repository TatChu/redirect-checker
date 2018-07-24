const fs = require('fs')
const csv = require('fast-csv')
const https = require('https')
const domain = process.argv[2]
const file = process.argv[3]

let stream = fs.createReadStream(file)

let redirect = []

let checkStatus = function (domain, data) {
  return new Promise((resolve, reject) => {
    const url = domain + data.from
    https.get(url, (res) => {
      console.log([data.from, res.statusCode].join())
      resolve()
    }).on('error', (e) => {
      console.error(e)
      reject(e)
    })
  })
}

async function checkAllStatus () {
  for (var i in redirect) {
    await checkStatus(domain, redirect[i])
  }
}

csv
  .fromStream(stream, {headers: ['type', 'from', 'to']})
  .on('data', (data) => {
    redirect.push(data)
  })
  .on('end', function () {
    checkAllStatus()
  })

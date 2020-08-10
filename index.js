const fs = require('fs')
const csv = require('fast-csv')
const https = require('https')

process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const domain = process.argv[2]
const file = process.argv[3]

let stream = fs.createReadStream(file)

let redirect = []

const result = [];

let checkStatus = function(index, domain, data) {
    return new Promise((resolve, reject) => {
        const url = domain + data.from
        https.get(url, (res) => {
            const destination = (res.headers.location || '').replace(domain, '');
            const isValidLocation = destination === data.to
            const isValidCode = res.statusCode == data.type

            result.push({
                'Row index': index,
                'Test case': `${data.from}`,
                'Is valid location': isValidLocation ? '✓' : `🔺`,
                'Is valid code': isValidCode ? '✓' : `🔺 ${res.statusCode} instead ${data.type}`,
            })
            resolve()
        }).on('error', (e) => {
            console.error(e)
            reject(e)
        })
    })
}

async function checkAllStatus() {
    const tasks = [];
    for (var i in redirect) {
        tasks.push(checkStatus(i, domain, redirect[i]))
    }

    await Promise.all(tasks);

    console.table(result);

}

csv
    .fromStream(stream, { headers: ['type', 'from', 'to'] })
    .on('data', (data) => {
        redirect.push(data)
    })
    .on('end', function() {
        checkAllStatus()
    })
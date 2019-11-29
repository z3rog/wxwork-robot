const Qiniu = require('qiniu')
const fs = require('fs')
const path = require('path')

const { AccessKey, SecretKey, options } = JSON.parse(
  fs.readFileSync(path.resolve(__dirname, 'config.json'))
)
const MAC = new Qiniu.auth.digest.Mac(AccessKey, SecretKey)
const PutPolicy = new Qiniu.rs.PutPolicy(options)
const uploadToken = PutPolicy.uploadToken(MAC)

console.log(uploadToken)


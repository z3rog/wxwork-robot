import crypto from 'crypto'
import fs from 'fs'

const getImageBase64MD5 = imgPath => {
  const data = fs.readFileSync(imgPath)
  const base64 = data.toString('base64')
  const md5 = crypto.createHash('md5').update(data).digest('hex')
  return { base64, md5 }
}

export const processImageConfig = ({ imgPath }) => {
  const { base64, md5 } = getImageBase64MD5(imgPath)
  return {
    msgtype: 'image',
    image: { base64, md5 }
  }
}

import Qiniu from 'qiniu'
import fs from 'fs'
import path from 'path'

// before upload
const prepare = imgPath => {
  const key = imgPath.split('/').pop()
  const { AccessKey, SecretKey, options } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'config.json'))
  )
  const Mac = new Qiniu.auth.digest.Mac(AccessKey, SecretKey)
  const PutPolicy = new Qiniu.rs.PutPolicy(options)
  const uploadToken = PutPolicy.uploadToken(Mac)
  // use to upload file
  const config = new Qiniu.conf.Config()
  config.zone = Qiniu.zone.Zone_z2 // south China
  config.useHttpsDomain = true // use https
  const formUploader = new Qiniu.form_up.FormUploader(config)
  const putExtra = new Qiniu.form_up.PutExtra()

  return { key, formUploader, uploadToken, putExtra, imgPath }
}
// upload
const uploadFile = config => {
  const { key, formUploader, uploadToken, putExtra, imgPath } = config
  return new Promise((resolve, reject) => {
    const callback = (resErr, resBody, resInfo) => {
      if (resErr) {
        reject({ success: false, resErr })
      }
      if (resInfo.statusCode == 200) {
        resolve({ success: true, data: resBody })
      } else {
        reject({ success: false, data: resInfo })
      }
    }

    formUploader.putFile(uploadToken, key, imgPath, putExtra, callback)
  })
}

export const getImgCloudLink = imgPath => {
  return new Promise(async resolve => {
    const { success, data: { key }} = await uploadFile(prepare(imgPath))
    resolve(success ? `http://q1v7eauos.bkt.clouddn.com/${key}` : undefined)
  })
}

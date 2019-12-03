import Qiniu from 'qiniu'
import fs from 'fs'
import path from 'path'
import callbackDep from '../processor/callbackDep'

// before upload
const prepare = imgPath => {
  const key = imgPath.split('/').pop()
  const { AccessKey, SecretKey, options } = JSON.parse(
    fs.readFileSync(path.resolve(__dirname, 'config.json'))
  )
  const mac = new Qiniu.auth.digest.Mac(AccessKey, SecretKey)
  const putPolicy = new Qiniu.rs.PutPolicy(options)
  const uploadToken = putPolicy.uploadToken(mac)
  // use to upload file
  const config = new Qiniu.conf.Config()
  config.zone = Qiniu.zone.Zone_z2 // south China
  config.useHttpsDomain = true // use https
  const formUploader = new Qiniu.form_up.FormUploader(config)
  const putExtra = new Qiniu.form_up.PutExtra()
  // generate a global callback, so index.js can call this func
  callbackDepItemGenerator(mac, config, key, options)

  return { key, formUploader, uploadToken, putExtra, imgPath }
}

// generate a dep that can call after main progress done
const callbackDepItemGenerator = (mac, config, key, options) => {
  const { scope: bucketName } = options
  const bucketManager = new Qiniu.rs.BucketManager(mac, config)
  const dep = async () => {
    return new Promise((resolve, reject) => {
      // delay 500 is an experience value
      setTimeout(() => {
        bucketManager.delete(
          bucketName,
          key,
          qiniuCallbackGenerator(resolve, reject)
        )
      }, 500)
    })
  }

  callbackDep.addDep(dep)
}

// upload
const uploadFile = config => {
  const { key, formUploader, uploadToken, putExtra, imgPath } = config
  return new Promise((resolve, reject) => {
    formUploader.putFile(
      uploadToken,
      key,
      imgPath,
      putExtra,
      qiniuCallbackGenerator(resolve, reject)
    )
  })
}

// return promise handler
const qiniuCallbackGenerator = (resolve, reject) => {
  return (resErr, resBody, resInfo) => {
    if (resErr) {
      reject({ success: false, resErr })
    }
    if (resInfo.statusCode == 200) {
      resolve({ success: true, data: resBody })
    } else {
      reject({ success: false, data: resInfo })
    }
  }
}

export const getImgCloudLink = imgPath => {
  return new Promise(async resolve => {
    const { success, data: { key }} = await uploadFile(prepare(imgPath))
    resolve(success ? `http://q1v7eauos.bkt.clouddn.com/${key}` : undefined)
  })
}

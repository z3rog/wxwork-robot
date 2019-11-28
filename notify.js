import {
  BASE_URL,
  MENTION_MAP,
  TEXT_DEFAULT_CONFIG,
  IMAGE_DEFAULT_CONFIG
} from './variable'
import lodash from 'lodash'

const crypto = require('crypto')
const fs = require('fs')
const axios  = require('axios')

const genConfig = ({ 
  msgtype = 'text', 
  msg, 
  mentionPerson,
  md5,
  base64,
  otherOpt
}) => ({
  msgtype,
  [msgtype]: {
    content: msg,
    mentioned_mobile_list: msgtype === 'text' && MENTION_MAP[mentionPerson]
      ? [MENTION_MAP[mentionPerson]]
      : undefined,
    md5: msgtype === 'image' ? md5 : undefined,
    base64: msgtype === 'image'? base64 : undefined,
    articles: msgtype === 'news'
      ? [{
        ...otherOpt,
        url: 'data:image/png;base64,' + base64
      }]
      : undefined
  }
})

const handleConfig = (config) => {
  const { msgtype, imgUrl } = config
  if (['image', 'news'].includes(msgtype)) {
    const data = fs.readFileSync(imgUrl)
    const base64 = data.toString('base64')
    const md5 = crypto.createHash('md5').update(data).digest('hex')
    return genConfig({ ...config, base64, md5 })
  }
  return genConfig(config)
}

const getDefaultConfig = ({ msgtype }) => {
  switch (msgtype) {
    case 'image':
      return IMAGE_DEFAULT_CONFIG
    case 'text':
    default:
      return TEXT_DEFAULT_CONFIG
    }
}

const notify = async rawConfig => {
  const config = handleConfig(
    lodash.merge(
      getDefaultConfig(rawConfig),
      rawConfig
    )
  )
  return axios.post(BASE_URL, config)
}

export default notify


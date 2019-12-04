import {
  TEXT_DEFAULT_CONFIG,
  IMAGE_DEFAULT_CONFIG
} from '../variables'
import { processTextConfig } from './text'
import { processImageConfig } from './image'
import { processNewsConfig } from './news'
import lodash from 'lodash'

const getDefaultConfig = msgtype => {
  switch (msgtype) {
    case 'image':
      return IMAGE_DEFAULT_CONFIG
    case 'text':
      return TEXT_DEFAULT_CONFIG
    default:
      return {}
  }
}

const getConfigProcessor = msgtype => {
  switch (msgtype) {
    case 'text':
      return processTextConfig
    case 'image':
      return processImageConfig
    case 'news':
      return processNewsConfig
  }
}

const getDefaultConfigNProcessor = ({ msgtype }) => {
  return {
    defaultConfig: getDefaultConfig(msgtype),
    processor: getConfigProcessor(msgtype)
  }
}
export const processFinalConfig = rawConfig => {
  const { defaultConfig, processor } = getDefaultConfigNProcessor(rawConfig)
  const mergedConfig = lodash.merge(defaultConfig, rawConfig)

  return processor(mergedConfig)
}

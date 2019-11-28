export const BASE_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=cf7282a6-c1fa-46d5-a088-a06ffed9eb53'

export const MENTION_MAP = {
  'Nobody': '',
  '彭鸿': '17720838321',
  '潘倩萍': '15626193365',
  '余梓韩': '17876253318',
  'ALL': '@all'
}

export const TEXT_DEFAULT_CONFIG = {
  msgtype: 'text',
  msg: '我就出来冒个泡',
  mentionPersion: 'Nobody'
}

export const IMAGE_DEFAULT_CONFIG = {
  msgtype: 'image',
  imgUrl: './images/test.png'
}
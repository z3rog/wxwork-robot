export const BASE_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=cf7282a6-c1fa-46d5-a088-a06ffed9eb53' // bug 内部讨论
// export const BASE_URL = 'https://qyapi.weixin.qq.com/cgi-bin/webhook/send?key=15274367-d592-4e02-9c79-98179f7d1f98' // test

export const MENTION_MAP = {
  'Nobody': undefined,
  '彭鸿': '17720838321',
  '潘倩萍': '15626193365',
  '余梓韩': '17876253318',
  'ALL': '@all'
}

export const TEXT_DEFAULT_CONFIG = {
  msgtype: 'text',
  msg: '我就出来冒个泡',
  mentionPerson: 'Nobody'
}

export const IMAGE_DEFAULT_CONFIG = {
  msgtype: 'image',
  imgUrl: './images/test.png'
}

export const IMAGE_SUPPORT_FORMAT = [
  '.jpg',
  '.jpeg',
  '.png',
  '.gif'
]

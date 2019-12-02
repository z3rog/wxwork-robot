import { getImgCloudLink } from '../../qiniu'

export const processNewsConfig = async config => {
  const { imgPath, title, description, url } = config
  const picurl = await getImgCloudLink(imgPath)
  return {
    msgtype: 'news',
    news: {
      articles: [{ title, description, url, picurl }]
    }
  }
}
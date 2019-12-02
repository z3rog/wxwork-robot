import { getImgCloudLink } from '../../qiniu'
export const processNewsConfig = async config => {
  const { imgPath } = config
  const picurl = await getImgCloudLink(imgPath)
}
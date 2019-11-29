import { IMAGE_SUPPORT_FORMAT } from '../variables'

export function isSupportImageFile(filename) {
  return IMAGE_SUPPORT_FORMAT.some(format => filename.toLowerCase().match(format))
}
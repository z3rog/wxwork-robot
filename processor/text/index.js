import { MENTION_MAP } from '../../variables'

export const processTextConfig = ({ msg, mentionPerson }) => ({
  msgtype: 'text',
  text: {
    content: msg,
    mentioned_mobile_list: MENTION_MAP[mentionPerson]
      ? [MENTION_MAP[mentionPerson]]
      : undefined,
  }
})
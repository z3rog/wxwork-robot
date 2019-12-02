import { BASE_URL } from '../variables'
import { processFinalConfig } from '../processor'
import axios from 'axios'

const notify = async rawConfig => {
  const finalConfig = processFinalConfig(rawConfig)
  console.log(finalConfig)
  // return axios.post(BASE_URL, finalConfig)
}

export default notify


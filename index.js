import notify from './notify'
import { isSupportImageFile } from './util'
import inquirer from 'inquirer'
import chalk from 'chalk'
import figlet from 'figlet'
import fs from 'fs'

const init = () => {
  console.log(
    chalk.bold.cyan(
      figlet.textSync('Z3ROG-BOT', {
        font: 'Star Wars',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  )
  console.log(
    chalk.bold.cyan('Please tell me want you want to do...')
  )
}
const askQuestions = () => {
  const imageList = fs
    .readdirSync(__dirname + '/images')
    .filter(name => isSupportImageFile(name))

  const questions = [
    {
      name: 'msgtype',
      type: 'list',
      message: 'What type of information you need to send?',
      choices: ['text', 'image'],
      default: 'text'
    },
    {
      name: 'msg',
      type: 'input',
      message: 'Input text content you need to send.',
      when: answers => answers.msgtype === 'text'
    },
    {
      name: 'mentionPerson',
      type: 'list',
      message: 'Whom do u want to mention?',
      choices: ['Nobody', '彭鸿', '余梓韩', '潘倩萍', 'ALL'],
      default: 'Nobody',
      when: answers => answers.msgtype === 'text'
    },
    {
      name: 'imgUrl',
      type: 'list',
      message: 'Select the image you want to send.',
      choices: ['Default', ...imageList],
      when: answers => answers.msgtype === 'image',
      filter: val => val === 'Default' ? undefined : `./images/${val}`
    }
  ]
  return inquirer.prompt(questions)
}

const success = () => {
  console.log(
    chalk.white.bgGreen.bold(msg)
  )
}
const run = async () => {
  // show script introduction
  init()
  // ask questions
  const answers = await askQuestions()
  // send notify request
  const { status, data: { errcode, errmsg }} = await notify(answers)
  if (
    status === 200 &&
    errcode === 0 &&
    errmsg === 'ok'
  ) {
    // show success message
    success('Succesfully sent robot message!')
  }
}

run()
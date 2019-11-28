import notify from './notify.js'

const inquirer = require('inquirer')
const chalk = require('chalk')
const figlet = require('figlet')
const fs = require('fs')

const init = () => {
  console.log(
    chalk.green(
      figlet.textSync('Z3ROG-BOT', {
        font: 'Star Wars',
        horizontalLayout: 'default',
        verticalLayout: 'default'
      })
    )
  )
}
const askQuestions = () => {
  const imageList = fs.readdirSync(__dirname + '/images')
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
      name: 'mentionPersion',
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

const success = msg => {
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
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
      choices: ['text', 'image', 'news'],
      default: 'text'
    },
    {
      name: 'msg',
      type: 'input',
      message: 'Input text content you need to send.',
      when: ({ msgtype }) => msgtype === 'text'
    },
    {
      name: 'mentionPerson',
      type: 'list',
      message: 'Whom do u want to mention?',
      choices: ['Nobody', '彭鸿', '余梓韩', '潘倩萍', 'ALL'],
      default: 'Nobody',
      when: ({ msgtype }) => msgtype === 'text'
    },
    {
      name: 'title',
      type: 'input',
      message: 'Please input title of your news.',
      validate: val => !!val,
      when: ({ msgtype }) => msgtype === 'news'
    },
    {
      name: 'description',
      type: 'input',
      message: 'Please input description of your news.(press return key to skip)',
      when: ({ msgtype }) => msgtype === 'news'
    },
    {
      name: 'url',
      type: 'input',
      message: 'Please input url to jump when news clicked.',
      validate: val => !!val,
      when: ({ msgtype }) => msgtype === 'news'
    },
    {
      name: 'imgPath',
      type: 'list',
      message: 'Select the image you want to send.',
      choices: ['Default', ...imageList],
      when: ({ msgtype }) => ['image', 'news'].includes(msgtype),
      filter: val => val === 'Default' ? undefined : `./images/${val}`
    }
  ]
  return inquirer.prompt(questions)
}

const success = (msg) => {
  console.log(
    chalk.white.bgGreen.bold(msg)
  )
}

const fail = msg => {
  console.log(
    chalk.white.bgRed.bold(msg)
  )
}

const run = async () => {
  // show script introduction
  init()
  // ask questions
  const answers = await askQuestions()
  // send notify request
  const { status, data: { errcode, errmsg }} = await notify(answers)
  if (status === 200) {
    if (
      errcode === 0 &&
      errmsg === 'ok'
    ) {
      // show success message
      success(`   Succesfully sent robot message!   `)
    } else {
      // show fail message
      fail(`   Error: ${errmsg.split(',')[0]}, please try again.   `)
    }
  }
}

run()
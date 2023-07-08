/**
 * Triggered from a message on a Cloud Pub/Sub topic.
 *
 * @param {!Object} event Event payload.
 * @param {!Object} context Metadata for the event.
 */


// const {PubSub} = require('@google-cloud/pubsub');
// const pubsub = new PubSub();
// const topicName = process.env.topicName;

const puppeteer = require('puppeteer');
const os = require('os');
const fs = require('fs');
require('dotenv').config();

 
(async()=>{

// exports.helloPubSub = async(event, context) => {
  // const message = event.data
  //   ? Buffer.from(event.data, 'base64').toString()
  //   : 'Hello, World';
  // console.log(message);
  
  const projects = ['app1','app2']; 
  for (const project of projects){
    const user = process.env[project];
    const password = process.env[`${[project]}.password`];
    const url = `https://www.pythonanywhere.com/user/${user}/webapps/`;

    const browser = await puppeteer.launch({
      headless:false,//true,
      args: [        
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-setuid-sandbox',
        '--no-first-run',
        '--no-sandbox',
        '--no-zygote',
        '--single-process'
      ],
    });
    const page = await browser.newPage(); 
    await page.goto(url, {waitUntil: 'load', timeout: 0});
    const user_input = await page.waitForSelector('input[type="text"][name="auth-username"]');
    await user_input.type(user);
    const password_input = await page.waitForSelector('input[type="password"][name="auth-password"]');
    await password_input.type(password);

    await page.keyboard.press('Enter');
    const extend = await page.waitForSelector('input[type="submit"][value="Run until 3 months from today"]');
    await extend.click();
    await page.waitForNavigation(); 
    await new Promise(r => setTimeout(r, 5000));
    await browser.close();
  }
})();

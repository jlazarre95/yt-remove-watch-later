import { env } from "process";
import { createCursor } from 'ghost-cursor';

import { random, sleep } from "./util";

import StealthPlugin from "puppeteer-extra-plugin-stealth";
import puppeteer from "puppeteer-extra";
import { Browser, Page, executablePath } from "puppeteer";

import readline from 'readline';

const pluginStealth = StealthPlugin();
puppeteer.use(pluginStealth);

export async function bot(skip: number = 0) {
  const windowWidth = 1920;
  const windowHeight = 1080;
  const browser = await puppeteer.launch({ 
    headless: false,
    args: ['--no-sandbox', `--window-size=${windowWidth},${windowHeight}`],
    executablePath: executablePath()
  });
  try {
    const page = await browser.newPage();
    await page.setViewport({ width: windowWidth, height: windowHeight })
    await botHelper(page, skip);
  } finally {
    await browser.close();
  }
}

async function botHelper(page: Page, skip: number) {
  const email = env['YT_EMAIL'];
  const password = env['YT_PASSWORD'];

  if(!email) {
    throw new Error('No email provided');
  }
  if(!password) {
    throw new Error('No password provided');
  }

  const cursor = createCursor(page);
  cursor.toggleRandomMove(true);

  await page.goto('https://www.youtube.com');
  await page.waitForTimeout(random(3_000, 10_000));

  await cursor.click(`a[aria-label='Sign in']`)
  await page.waitForTimeout(random(3_000, 10_000));

  await cursor.click(`input[type='email']`);
  await page.keyboard.type(email);
  await page.keyboard.press('Enter');
  await page.waitForTimeout(random(3_000, 10_000));

  await cursor.click(`input[type='password']`);
  await page.keyboard.type(password);
  await page.keyboard.press('Enter');

  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
  await new Promise((resolve, reject) => {
    rl.question(`Complete authentication via your device(s) if needed. Enter [y] to continue: `, ans => {
      if(ans.toLowerCase() == 'y') {
        rl.close();
        resolve(null);
      }
    });
  });

  cursor.toggleRandomMove(false);

  await page.goto(`https://www.youtube.com/playlist?list=WL`);
  await page.waitForTimeout(random(3_000, 10_000));

  await cursor.click('yt-dropdown-menu[icon-label="Sort"]');
  await page.waitForTimeout(random(2_000, 5_000));

  await cursor.click(`xpath///div[contains(text(), 'Date added (newest)')]`);
  await page.waitForTimeout(random(3_000, 10_000));

  let i = 1;
  while(true) {
    console.log(`Removing video ${i}...`);
    const videos = await page.$$(`xpath///ytd-playlist-video-renderer`);
    const video = videos.length > skip ? videos[skip] : null; 

    if(!video) {
      break;
    }
    await cursor.move(video);
    const actionMenu = await video.$('button[aria-label="Action menu"]');
    if(!actionMenu) {
      throw new Error('Expected action menu!');
    }
    await cursor.click(actionMenu);
    await cursor.click(`//span[contains(text(), 'Remove from')]`);
    console.log('Removed');
    i++;
  }
}
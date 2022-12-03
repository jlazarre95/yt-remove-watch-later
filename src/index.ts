import * as dotenv from 'dotenv'
dotenv.config()

import { bot } from "./bot";

async function main() {
    await bot(40);
}

main().catch(err => console.error(err));
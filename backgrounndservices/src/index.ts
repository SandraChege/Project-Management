import express from "express";
import { welcomeUser } from "./mailServices/welcomeuser";
import cron from "node-cron";

const app = express();

const run = async () => {
    cron.schedule('*/10*****',async () => {
       console.log("Checking for new user"); 
        await welcomeUser();
    })
}

run()

app.listen("4500", () => {
    console.log(`Node mailer is app and runnning on port 4500`);
})
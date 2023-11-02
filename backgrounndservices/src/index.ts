import express from "express";
import { welcomeUser } from "./mailServices/welcomeuser";

const app = express();

const run =async () => {
    await welcomeUser()
}

run()

app.listen("4500", () => {
    console.log(`Node mailer is app and runnning on port 4500`);
})
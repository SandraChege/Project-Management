import ejs from "ejs";
import mssql from "mssql";
import dotenv from "dotenv";
import { sqlConfig } from "../config/sqlConfig";
import { sendMail } from "../helpers/emailhelpers";

export const welcomeUser =async () => {
    const pool = await mssql.connect(sqlConfig)

    const users = await (await pool.request().query("SELECT * FROM Users WHERE EmailSent = 0")).recordset;
    
    console.log(users);
/**
 * the data is html
 */
    for (let individualuser of users) {
        ejs.renderFile("templates/welcomeUser.ejs",{ Name: individualuser.userName },
          async (error, data) => {
            let mailOptions = {
              from: process.env.EMAIL as string,
              to: individualuser.email,
              subject: "Welcome Onboard",
              html: data,
            };

            try {
                await sendMail(mailOptions);

                /**
                 * change state of receiving email
                 */
                // await pool.request().query("UPDATE Users SET Welcomed = 1 WHERE Welcomed = 0");

              console.log("Emails send to new users");
            } catch (error) {
              console.log(error);
            }
          }
        );
    }
}
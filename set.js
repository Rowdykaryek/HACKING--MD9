const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' }); 
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'HACKING-MD;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoibUtabnhUelZwTTZIZkt6T1A2c0crYmQrSCtKTDAreGEvRGNMTm0veFVGWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZldIMmFvN3g0NVl1bC8zZVd6NEpodXN1elBUclRvdHJYUG02bnZxTFZUWT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJBSFRpNnU3RnJyRkRZRS8rL3pzWVltZW5PNjY0YWRUak1nSHhPMFBHczNvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJUQWo4VlduUXcyV05sdHRvNWw5S3EzZ00yZlJnRDhxUndmdzhmUzNPU3lrPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InFDOFFzSGNXYXpsOExaREFKNmphRm5RQUxKNWtwVjVqYXUweG45SG1PbE09In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6ImF5QURWK1FOSjJiLzJKMFNZRGxJODlBdG5mVFY0Yi94Y1NtU2VrRW81V1E9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiWUNTUFRyVncxa2RON1VKZm5SV1JKMSs1SEhXUWVGNC9wZEIyWDJ4azUzcz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMnJnRWxvYUxIcUJBenpHTUtBdXdwR3hwakpLUEh3Rnc3MklLRUpLUHgyST0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Iks0RmlZQWhxenQzTHZaZjNaUlFnenFWQmNTRHF0WUwvbW5acWFIaXlKRDByanV5MzlWYWR0bkVuRUREdVpYRGZPaEJwQythTGQzdTI0VkpvblB2REJ3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTMwLCJhZHZTZWNyZXRLZXkiOiJHZDFSdnlTUmxKK1ZsYU0zek1Fd2FlbHdiQ2xmZnMzajBCZmFWYjAxZGFvPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJCY3lXa2EwQ1RJQ1pwbEd1WTk3M3p3IiwicGhvbmVJZCI6ImY4OGFmYjgzLTQ0YjktNGQzOC1hNTZlLTNkYWVmZGI5M2NlYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI5M1VRRCt1ZVdBQnFZMy91TEZLNkpBNTdadDg9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiRlMzcUY2VjJsQWRIM2ZYTmhUV2NkdHR0OXM0PSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IkRMV1g2U0dLIiwibWUiOnsiaWQiOiI5NDc4NzY5NzUyOToxNkBzLndoYXRzYXBwLm5ldCIsIm5hbWUiOiLwnZCV8J2QiPCdkI3wnZCS8J2QjiJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDSjNvazRNSEVQQ0hycndHR0FzZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiMkxmWkV4a2dUWTJEVmZBd3R4VlN3TWlIdjVDamVvbDFWZ3N3a1JEMGV4VT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiVkxYV0N3L2FHNlZHM3ROZk9GRGV4Qi9GTndad0puOWZXayt0ZUhpdGdNOEdYRmd6WDJ3Y3A1WkRVdHpRVVRaaXNpYldjOGloSE1tMzNsSnZZOVlSQ3c9PSIsImRldmljZVNpZ25hdHVyZSI6Ik11YXhvUWUxTG0yNmFOTVhwV1dZdXh4K2h6UlprRnIxS1JvWElDQjVnbEYzcnhIZXpHeHRjbXZwOEx2NUJpTTNKUEJvM2RzNFZTdUEyS0U5U2ZIa0JnPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiOTQ3ODc2OTc1Mjk6MTZAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZGkzMlJNWklFMk5nMVh3TUxjVlVzREloNytRbzNxSmRWWUxNSkVROUhzViJ9fV0sInBsYXRmb3JtIjoic21iYSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTczNzE5NjU0MiwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFCTEsifQ==',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE,
    NOM_OWNER: process.env.NOM_OWNER || "Rowdy-md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "non",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'non',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non', 
    CODE_PAYS: process.env.CODE_PAYS || '509',  // Variable d'environnement pour l'API qu'on utilise       
    BOT : process.env.NOM_BOT || 'Rowdy-md',
    URL : process.env.LIENS_MENU || 'https://i.ibb.co/BBMJK88/3fbcd0b9bc23eb4e.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    CHAT_BOT : process.env.CHAT_BOT || 'non' ,          
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    CHATBOT : process.env.PM_CHATBOT || "non",     
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',
    ANTI_VV: process.env.ANTI_VUE_UNIQUE || 'non' ,
                  
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
   DB: process.env.DB || 'postgres://neoverse:pomrleUMXwlmlpIcW2oFJmMX0CXzaFkf@dpg-combonun7f5s73d7uoog-a.oregon-postgres.render.com/neoverse_wz98',
                  /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});

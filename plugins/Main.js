const { cmd, commands } = require('../command');
const config = require('../config');
const {readEnv} = require('../lib/database');
const os = require('os');
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, fetchJson, runtime, sleep } = require('../lib/functions');
const imgUrl = 'https://i.postimg.cc/xdMvP3XZ/In-Shot-20241222-002123636.jpg'; // This image URL seems unnecessary

//-----------------------------------------------ALive-----------------------------------------------

cmd({
    pattern: "alive",
    desc: "Check bot online or not.",
    category: "general",
    react: "🎀",
    filename: __filename
}, async (conn, mek, m, { from, prefix, pushname, reply }) => {
    try {
        let hostname;
        // Determine the hosting service based on the hostname length
        if (os.hostname().length == 12) hostname = 'replit';
        else if (os.hostname().length == 36) hostname = 'heroku';
        else if (os.hostname().length == 8) hostname = 'koyeb';
        else hostname = os.hostname();

        // Create the text response with system details
        let monspace = '```';
        const snm = `👋 ${monspace} Hello ${pushname}, I'm alive now ${monspace}

_*This queen sadu whatsapp bot is made for your easy use. This bot is currently active🪄*_

> *Version:* ${require("../package.json").version}
> *Memory:* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
> *Runtime:* ${runtime(process.uptime())}
> *Hostname:* ${hostname}

*☘️ Follow our channel:* https://chat.whatsapp.com/EMRQDL2ANWlJcvs1nw90mv

*Qᴜᴇᴇɴ ꜱᴀᴅᴜ ᴍᴅ ᴡᴀ ʙᴏᴛ ᴄʀᴇᴀᴛᴇᴅ ʙʏ*
*ᴍʀ ᴅɪɴᴇꜱʜ*`;

        // Sending the audio message
        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/alive.mp3' },
            mimetype: 'audio/mp4', // Corrected mime type
            ptt: true
        }, { quoted: mek });

        // Sending the image message
        const sentMsg = await conn.sendMessage(from, {
            image: { url: imgUrl },  // Provide a valid image URL
            caption: snm,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇',
                    newsletterJid: "120363322195409882@newsletter",
                }
            }
        }, { quoted: mek }); // Replaced 'mak' with 'mek'

    } catch (e) {
        reply('*Error !!*');
        console.log('Error details:', e); // More specific error logging
    }
});
//--------------------- Menu --------------------//

cmd({
    pattern: "menu",
    alias: ["list"],
    desc: "menu the bot",
    react: "📜",
    category: "main"
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        let desc = `*👋 Hello ${pushname}*

*╭─「 ᴄᴏᴍᴍᴀɴᴅ ᴘᴀɴᴇʟ 」*
*│◈ ʀᴜɴᴛɪᴍᴇ :* ${runtime(process.uptime())}
*│◈ ʀᴀᴍ ᴜꜱᴀɢᴇ :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${Math.round(require('os').totalmem / 1024 / 1024)}MB
*╰──────────●●►*
*╭────────*
*│
*│ 1   OWNER*
*│ 2   CONVERT*
*│ 3   AI*
*│ 4   SEARCH*
*│ 5   DOWNLOAD*
*│ 6   FUN*
*│ 7   MAIN*
*│ 8   GROUP*
*│ 9   OTHER*
*╰─────────

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`;


        await conn.sendMessage(from, {
            audio: { url: 'https://github.com/mrdinesh595/Mssadu/raw/refs/heads/main/database/menu.mp3' },
            mimetype: 'audio/mp4', // Corrected mime type
            ptt: true
        }, { quoted: mek });

        const vv = await conn.sendMessage(from, { image: { url: "https://i.postimg.cc/xdMvP3XZ/In-Shot-20241222-002123636.jpg"}, caption: desc }, { quoted: mek });

        conn.ev.on('messages.upsert', async (msgUpdate) => {
            const msg = msgUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const selectedOption = msg.message.extendedTextMessage.text.trim();

            if (msg.message.extendedTextMessage.contextInfo && msg.message.extendedTextMessage.contextInfo.stanzaId === vv.key.id) {
                switch (selectedOption) {
                    case '1':
                        reply(`*◈╾──OWNER MENU──╼◈*

╭────────●●►
│ 🎀 *restart* 
╰──────────────────●●►

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`);
                        break;
                    case '2':               
                        reply(`*◈╾──CONVERT MENU──╼◈*

╭────────●●►
│ 🎀 *convert* 
╰──────────────────●●►

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`);
                        break;
                    case '3':               
                        reply(`*◈╾──AI MENU──╼◈*

╭────────●●►
│ 🎀 *ai* 
╰──────────────────●●►

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`);
                        break;
                    case '4':               
                        reply(`*◈╾──SEARCH MENU──╼◈*

╭────────●●►
│ 🎀 *yts* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *srepo* 
╰──────────────────●●►

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`);
                        break;
                    case '5':               
                        reply(`*◈╾──DOWNLOAD MENU──╼◈*

╭────────●●►
│ 🎀 *apk* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *twitter* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *gdrive* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *mediafire* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *fb* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *ig* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *movie* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *song* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *video* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *play/yt* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *song2* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *video2* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *tiktok* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *img* 
╰──────────────────●●►

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`);
                        break;
                    case '7':               
                        reply(`*◈╾──MAIN MENU──╼◈*

╭────────●●►
│ 🎀 *alive* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *about* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *menu* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *allmenu* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *support* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *system* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *ping* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *runtime* 
╰──────────────────●●►

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`);
                        break;
                    case '8':               
                        reply(`*◈╾──GROUP MENU──╼◈*

╭────────●●►
│ 🎀 *promote* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *demote* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *kick* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *add* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *admins* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *tagall* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *getpic* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *setwelcome* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *setgoodbye* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *admins* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *gname* 
╰──────────────────●●►

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`);
                       break;
                    case '6':               
                        reply(`*◈╾──FUN MENU──╼◈*

╭────────●●►
│ 🎀 *dog* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *fact* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *hack* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *quote* 
╰──────────────────●●►

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`);

                        break;
                    case '9':               
                        reply(`*◈╾──OTHER MENU──╼◈*

╭────────●●►
│ 🎀 *githubstalk* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *trt* 
╰──────────────────●●►
╭────────●●►
│ 🎀 *weather* 
╰──────────────────●●►

> *𝐐𝐔𝐄𝐄𝐍 𝐒𝐀𝐃𝐔 𝐌𝐃*`);


                        break;
                    default:
                        reply("Invalid option. Please select a valid option🔴");
                }

            }
        });

    } catch (e) {
        console.error(e);
        await conn.sendMessage(from, { react: { text: '❌', key: mek.key } })
        reply('An error occurred while processing your request.');
    }
});

//------------------ Ping ---------------------//

cmd({
    pattern: "ping",
    desc: "Check bot's response time.",
    category: "main",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        const startTime = Date.now()
        const message = await conn.sendMessage(from, { text: '*📡  ʀᴜɴɪɴɢ ʀᴇsᴘᴏɴᴅ...*' })
        const endTime = Date.now()
        const ping = endTime - startTime
        await conn.sendMessage(from, { text: `*ᴘᴏɴɢ*: ${ping} *_ᴍꜱ_*` }, { quoted: message })
    } catch (e) {
        console.log(e)
        reply(`${e}`)
    }
});

//------------------ System ---------------------//

cmd({
    pattern: "system",
    desc: "Check bot online or no.",
    category: "general",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, prefix, pushname, reply }) => {
    try {
        let hostname;
        if (os.hostname().length == 12) hostname = 'replit';
        else if (os.hostname().length == 36) hostname = 'heroku';
        else if (os.hostname().length == 8) hostname = 'koyeb';
        else hostname = os.hostname();

        const sssf = `*QUEEN SADU*
        
🎉 *Version :* ${require("../package.json").version}
🗃️ *Memory :* ${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}MB / ${(os.totalmem() / 1024 / 1024).toFixed(2)}MB
⏱️ *Runtime :* ${runtime(process.uptime())}
📍 *Platform :* ${hostname}
👤 *Owner :* 𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇
`;

        await conn.sendMessage(from, {
            text: sssf,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇',
                    newsletterJid: "120363322195409882@newsletter",
                }
            }
        }, { quoted: mek });
        
    } catch (e) {
        reply('*Error !!*');
        console.log(e);
    }
});


//------------------ status ---------------------//

cmd({
    pattern: "status",
    desc: "Check bot status",
    category: "main",
    react: "✅",
    filename: __filename
},
async (conn, mek, m, { from, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply }) => {
    try {
        // Construct the bot status message
        const botStatus = `*QUEEN SADU MD*
        
*╭───────────────◈◈►*
*│ 👾 Bot Status: Online*
*│ 📆 Date: ${new Date().toLocaleDateString()}*
*│ ⏰ Time: ${new Date().toLocaleTimeString()}*
*╰───────────────◈◈►*
`;

        await conn.sendMessage(from, {
            text: botStatus,
            contextInfo: {
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterName: '𝐌𝐑 𝐃𝐈𝐍𝐄𝐒𝐇',
                    newsletterJid: "120363322195409882@newsletter",
                }
            }
        }, { quoted: mek });

    } catch (e) {
        console.log(e);
        reply(`Error: ${e.message}`);
    }
});

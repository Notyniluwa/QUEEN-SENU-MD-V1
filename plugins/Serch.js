const config = require('../config')
const { cmd, commands } = require('../command')
const { getBuffer, getGroupAdmins, getRandom, h2k, isUrl, Json, runtime, sleep, fetchJson} = require('../lib/functions')
const { lyrics, lyricsv2 } = require('@bochilteam/scraper');
const { query } = require('express');

var tmsg =''
if(config.LANG === 'SI') tmsg = '*කරුණාකර මට ගීතයක නමක් දෙන්න. !*'
else tmsg = "*Please give me a song name. !*"
var descg = ''
if(config.LANG === 'SI') descg = "එය ලබා දී ඇති සංගීතයේ lyrics දෙයි."
else descg = "It gives lyrics of given song name."
var cantscg = ''
if(config.LANG === 'SI') cantscg = "*මට මේ ගීතයේ lyrics සොයාගත නොහැක !*"
else cantscg = "*I cant find lyrics of this song !*"

cmd({
    pattern: "lyric",
    alias: ["lyric"],
    react: '🎙️',
    desc: descg,
    category: "search",
    use: '.lyric <song name>',
    filename: __filename
},
async(conn, mek, m,{from, l, quoted, body, isCmd, command, args, q, isGroup, sender, senderNumber, botNumber2, botNumber, pushname, isMe, isOwner, groupMetadata, groupName, participants, groupAdmins, isBotAdmins, isAdmins, reply}) => {
try{
if(!q) return reply(tmsg)
const result = await fetchJson(`https://www.dark-yasiya-api.site/other/lyrics?text=${q}`)
if(result.result) reply(`
*🧚‍♂️⃝ QUEEN SADU MD LYRICS SEARCH 🩷⃟🧚‍♂️*

*Name* : ${result.result.album}

*Artist* : ${result.result.artists}

╭───────────◉
   
*LYRICS*: ${result.result.lyric}

╰───────────◉
*👨‍💻 𝚀𝚄𝙴𝙴𝙽 𝚂𝙰𝙳𝚄 𝙱𝚈 𝙼𝚁 𝙳𝙸𝙽𝙴𝚂𝙷 👨‍💻*`)
else reply(cantscg)
} catch (e) {
reply(cantscg)
l(e)
}
})

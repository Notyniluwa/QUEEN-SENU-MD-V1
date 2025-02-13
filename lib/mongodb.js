const mongoose = require('mongoose');
const config = require('../config');
const EnvVar = require('./mongodbenv');

const defaultEnvVariables = [
    { key: 'PREFIX', value: '.' },
    { key: 'AUTO_READ_STATUS', value: 'true' },
    { key: 'MODE', value: 'private' },
    { key: 'OWNER_REACT', value: 'true' },
    { key: 'RECODING', value: 'true' },
    { key: 'AUTO_TIPPING', value: 'true' },
    { key: 'AUTO_READ_CMD', value: 'true' }, 
    { key: 'WELCOME', value: 'true' },
    { key: 'AUTO_VOICE', value: 'true' },
    { key: 'AUTO_STICKER', value: 'true' },
    { key: 'AUTO_REPLY', value: 'true' },
    { key: 'AUTO_AI', value: 'true' },
    { key: 'AUTO_REACT', value: 'true' },
    { key: 'ALLWAYS_OFFLINE', value: 'true' },
    { key: 'BAD_NO_BLOCK', value: 'true' },
    { key: 'ANTI_LINK', value: 'true' },
    { key: 'ANTI_BAD', value: 'true' },
    { key: 'ANTI_BOT', value: 'true' },
    { key: 'MSG', value: '👋 Hello I am 𝘘𝘜𝘌𝘌𝘕 𝘚𝘌𝘕𝘜 𝘔𝘋 I am alive new\n\nhi' },
    { key: 'LOGO', value: 'https://pomf2.lain.la/f/5wapkl5g.jpg' },
    { key: 'FOOTER', value: '> *ᴍᴜʟᴛɪ ᴅᴇᴠɪᴄᴇ ᴡᴀ ʙᴏᴛ ʙʏ Qᴜᴇᴇɴ ɴᴇᴛʜᴜ ᴍᴅ*/n> *ᴘᴏᴡᴇʀᴇᴅ ʙʏ - ɴᴇᴛʜᴜ ᴍᴀx ʏᴛ*' },
];

const connectDB = async () => {
    try {
        await mongoose.connect(config.MONGODB);
        console.log('✅ QUEEN SENU MD | MongoDB Connected');
        for (const envVar of defaultEnvVariables) {
            const existingVar = await EnvVar.findOne({ key: envVar.key });

            if (!existingVar) {
                await EnvVar.create(envVar);
                console.log(`➕ Created default env var: ${envVar.key}`);
            }
        }
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;

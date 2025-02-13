const config = require('../config');
const { cmd } = require('../command');
const axios = require('axios');

cmd({
    pattern: "moviedl2",
    alias: ["downloadmovie"],
    desc: "Download movie from Sinhalasub",
    category: "movie",
    use: '.moviedl <movie_url>',
    filename: __filename
}, async (conn, mek, m, { from, q }) => {
    try {
        // Validate input
        if (!q) return await conn.sendMessage(from, { text: "🚩 Please provide a valid movie URL!\n\n> Apith urthal.\n\n> Thenux-AI" }, { quoted: mek });

        // Fetch movie details from the API
        const apiUrl = `https://vajiraapi-089fa316ec80.herokuapp.com/movie/sinhalasub/movie?url=${encodeURIComponent(q)}`;
        const response = await axios.get(apiUrl);

        // Check if the response indicates success
        if (!response.data.status) {
            return await conn.sendMessage(from, { text: "🚩 Failed to fetch movie details. Please check the URL." }, { quoted: mek });
        }

        // Extract movie data from the response
        const movieData = response.data.result.data;
        const downloadLinks = {
            pixeldrain: movieData.pixeldrain_dl,
            ddl: movieData.ddl_dl,
            meda: movieData.meda_dl
        };

        // Prepare movie details message
        const movieDetails = `
*🎥 MOVIE DETAILS 🎥*

*Title:* ${movieData.title}\n
*Release Date:* ${movieData.date}\n
*Country:* ${movieData.country}\n
*TMDB Rating:* ${movieData.tmdbRate}\n
*Sinhalasub Vote:* ${movieData.sinhalasubVote}\n\n
*Description:* ${movieData.description}\n
*Director:* ${movieData.director}\n\n
> Powerd by : උබලගෙ සීයා.⚠️
`;

        // Send movie poster image first
        await conn.sendMessage(from, { 
            image: { url: movieData.image }, 
            caption: movieDetails 
        }, { quoted: mek });

        // Prepare download options
        let downloadOptionsMessage = `*Choose a download option by replying with the corresponding number:*\n\n`;
        downloadLinks.pixeldrain.forEach((item, index) => {
            downloadOptionsMessage += `${index + 1}. ${item.quality} (${item.size})\n`;
        });

        // Send download options
        const sentMessage = await conn.sendMessage(from, { text: downloadOptionsMessage }, { quoted: mek });

        // Listen for user's reply
        conn.ev.on("messages.upsert", async (messageUpdate) => {
            const msg = messageUpdate.messages[0];
            if (!msg.message || !msg.message.extendedTextMessage) return;

            const userReply = msg.message.extendedTextMessage.text.trim();
            const messageContext = msg.message.extendedTextMessage.contextInfo;

            // Check if the reply is to the previously sent prompt
            if (messageContext && messageContext.stanzaId === sentMessage.key.id) {
                const choice = parseInt(userReply) - 1; // Convert to zero-based index

                if (choice >= 0 && choice < downloadLinks.pixeldrain.length) {
                    const selectedDownload = downloadLinks.pixeldrain[choice];
     // Check if the file size is greater than 1 GB
     //const sizeInGB = parseFloat(selectedDownload.size.split(" ")[0]); // Get the size in GB
     //if (sizeInGB < 1) {
       //  return await conn.sendMessage(from, { text: "*⚠️⚠️File is very Big huth***\n\n> මට බැ  මට බැ*\n>මට බල කරොත් මන් මැෙරනව.🥲*" }, { quoted: mek });
    // }

                    // Download the movie file
                    const movieFileResponse = await axios.get(selectedDownload.link, { responseType: 'arraybuffer' });

                    // Prepare the movie file for sending
                    const movieBuffer = Buffer.from(movieFileResponse.data, 'binary');
                    const fileName = `${movieData.title}.mp4`; // Set the file name

                    // Send the movie file to the user
                    await conn.sendMessage(from, {
                        document: movieBuffer,
                        mimetype: "video/mp4",
                        fileName: fileName,
                        caption: `Here is your movie: ${movieData.title} (${selectedDownload.quality})`
                    }, { quoted: mek });

                } else {
                    await conn.sendMessage(from, { text: "🚩 Please enter a valid option number!" }, { quoted: msg });
                }
            }
        });

    } catch (e) {
        console.error("Error:", e);
        await conn.sendMessage(from, { text: '🚩 An error occurred while processing your request.' }, { quoted: mek });
    }
});

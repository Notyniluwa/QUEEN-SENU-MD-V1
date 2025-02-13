try {
    const axios = require("axios");
    const FormData = require("form-data");
    const fs = require("fs");
    const ytSearch = require("yt-search");
    const ffmpeg = require("fluent-ffmpeg");
    const { PassThrough } = require("stream");
    const gTTS = require("gtts");
    const ytdl = require('@distube/ytdl-core');
    const ai_api = `https://api.vihangayt.com/`;
    const gifted_api = `https://api.giftedtechnexus.co.ke/api/`;
 
    async function uploadToUguu(filePath) {
       return new Promise(async (resolve, reject) => {
          const form = new FormData();
          form.append("files[]", fs.createReadStream(filePath));
 
          try {
             const response = await axios({
                url: "https://uguu.se/upload.php",
                method: "POST",
                headers: {
                   "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/90.0.4430.212 Safari/537.36",
                   ...form.getHeaders(),
                },
                data: form,
             });
 
             resolve(response.data.files[0]);
          } catch (error) {
             reject(error);
          }
       });
    }
 
    async function coderAi(code) {
       const trimcode = code.trim();
       const url = `ai/codemirror?q=${encodeURIComponent(trimcode)}`;
       const response = await axios.get(ai_api + url);
       const data = response.data;
       return data.data.prediction;
    }
    async function gpt4(question) {
       const trimquestion = question.trim();
       const url = `ai/gpt4-v2?q=${encodeURIComponent(trimquestion)}`;
       const response = await axios.get(ai_api + url);
       const data = response.data;
       return data.data;
    }
 
    async function lamda(question) {
       const trimquestion = question.trim();
       const url = `ai/lamda?q=${encodeURIComponent(trimquestion)}`;
       const response = await axios.get(ai_api + url);
       const data = response.data;
       return data.data;
    }
 
    async function stableDiff(query) {
       const encodedQuery = encodeURIComponent(query);
       const url = `ai/sd?prompt=${encodedQuery}&apikey=giftedtechk`;
       const response = await axios.get(gifted_api + url, {
          responseType: "arraybuffer",
       });
       const buffer = Buffer.from(response.data);
       return buffer;
    }
 
    async function askAi(aiType, query) {
       const BASE_URL = "https://ironman.koyeb.app/";
       const API_KEY = "Ir0n-M4n_xhf04";
       const IMAGE_API_KEY = "img-1r0nm4nH4x!";
 
       const apiPaths = {
          aoyo: "ironman/ai/aoyo",
          thinkany: "ironman/ai/thinkany",
          prodia: "ironman/ai/prodia",
          lepton: "ironman/ai/llm",
          gpt: "ironman/ai/gpt",
          blackbox: "ironman/ai/blackbox",
          chatgpt: "ironman/ai/chatev",
          dalle: "ironman/ai/dalle",
          upscale: "ironman/ai/upscale",
       };
 
       try {
          switch (aiType) {
             case "aoyo": {
                const { data: aoyoResponse } = await axios.get(`${BASE_URL}${apiPaths.aoyo}`, {
                   headers: { ApiKey: API_KEY },
                   params: { query: query },
                });
                return aoyoResponse;
             }
 
             case "thinkany": {
                const { data: thinkanyResponse } = await axios.get(`${BASE_URL}${apiPaths.thinkany}?query=${query}`, {
                   headers: { ApiKey: API_KEY },
                });
                return thinkanyResponse;
             }
 
             case "prodia": {
                return `${BASE_URL}${apiPaths.prodia}?prompt=${query}&ApiKey=${IMAGE_API_KEY}`;
             }
 
             case "lepton": {
                const { data: leptonResponse } = await axios.get(`${BASE_URL}${apiPaths.lepton}?query=${query}`, {
                   headers: { ApiKey: API_KEY },
                });
                return leptonResponse;
             }
 
             case "gpt": {
                const { data: gptResponse } = await axios.get(`${BASE_URL}${apiPaths.gpt}?prompt=${query}`, {
                   headers: { ApiKey: API_KEY },
                });
                return gptResponse;
             }
 
             case "blackbox": {
                const { data: blackboxResponse } = await axios.get(`${BASE_URL}${apiPaths.blackbox}?query=${query}`, {
                   headers: { ApiKey: API_KEY },
                });
                return blackboxResponse;
             }
 
             case "chatgpt": {
                const { data: chatgptResponse } = await axios.get(`${BASE_URL}${apiPaths.chatgpt}?prompt=${query}`, {
                   headers: { ApiKey: API_KEY },
                });
                return chatgptResponse;
             }
 
             case "dalle": {
                return `${BASE_URL}${apiPaths.dalle}?text=${encodeURIComponent(query)}&ApiKey=${IMAGE_API_KEY}`;
             }
 
             case "upscale": {
                if (!Buffer.isBuffer(query)) {
                   throw new Error("Expected a buffer for the image.");
                }
 
                const formData = new FormData();
                formData.append("image", query, { filename: "image.jpg" });
                const upscaleResponse = await axios.post(`${BASE_URL}${apiPaths.upscale}?ApiKey=${IMAGE_API_KEY}`, formData, {
                   headers: formData.getHeaders(),
                   responseType: "arraybuffer",
                });
                return upscaleResponse.data;
             }
 
             default:
                throw new Error("Invalid AI type provided.");
          }
       } catch (error) {
          console.error(`Error interacting with AI: ${error.message}`);
          throw error;
       }
    }
 
    async function google(query) {
       const url = `https://pure-badlands-26930-091903776676.herokuapp.com/search/google?q=${encodeURIComponent(query)}`;
 
       const response = await axios.get(url);
       const results = response.data.results;
       const formattedResults = results
          .map(result => {
             return `Title: ${result.title}\nLink: ${result.link}\nSnippet: ${result.snippet}\n`;
          })
          .join("\n");
       return formattedResults;
    }
 
    async function dalle(prompt) {
       const url = `https://api.gurusensei.workers.dev/dream?prompt=${encodeURIComponent(prompt)}`;
       const response = await axios.get(url, { responseType: "arraybuffer" });
       return Buffer.from(response.data);
    }
 
    async function bing(query) {
       const url = `https://gpt4.guruapi.tech/bing?username=astro&query=${encodeURIComponent(query)}`;
       const response = await axios.get(url);
       return response.data.result;
    }
 
    async function elevenlabs(text) {
       const url = `https://pure-badlands-26930-091903776676.herokuapp.com/ai/generate-audio?text=${encodeURIComponent(text)}`;
       const response = await axios.get(url, { responseType: "arraybuffer" });
       const audioBuffer = Buffer.from(response.data);
       return audioBuffer;
    }
    const shortenUrl = async longUrl => {
       const encodedUrl = encodeURIComponent(longUrl.trim());
       const response = await axios.post("https://cleanuri.com/api/v1/shorten", `url=${encodedUrl}`, {
          headers: {
             "Content-Type": "application/x-www-form-urlencoded",
          },
       });
       return response.data.result_url;
    };
 
    async function fetchSong(query) {
       try {
          const results = await ytSearch(query);
          if (results && results.videos.length > 0) {
             return results.videos[0].url;
          } else {
             throw new Error("No videos found for the given query.");
          }
       } catch (error) {
          console.error("Error fetching video URL:", error);
          throw error;
       }
    }
    async function convertVideoToAudio(videoBuffer) {
       return new Promise((resolve, reject) => {
          const inputStream = new PassThrough();
          const outputStream = new PassThrough();
 
          inputStream.end(videoBuffer);
 
          ffmpeg(inputStream)
             .format("mp3") // Convert to MP3 format
             .pipe(outputStream, { end: true });
 
          const chunks = [];
          outputStream.on("data", chunk => chunks.push(chunk));
          outputStream.on("end", () => resolve(Buffer.concat(chunks)));
          outputStream.on("error", err => reject(err));
       });
    }

    async function play(query) {
       const videoUrl = await fetchSong(query);
       const audioBuffer = await ytmp3(videoUrl);
       return audioBuffer;
    }
 
    /**
     * Text-to-speech function that converts text to speech and returns it as a buffer.
     * @param {string} text - The text to convert to speech.
     * @returns {Promise<Buffer>} A promise that resolves with the audio data as a buffer.
     */
    function tts(text) {
       return new Promise((resolve, reject) => {
          const gtts = new gTTS(text, "en");
          const stream = gtts.stream();
 
          const chunks = [];
          stream.on("data", chunk => {
             chunks.push(chunk);
          });
 
          stream.on("end", () => {
             const buffer = Buffer.concat(chunks);
             resolve(buffer);
          });
 
          stream.on("error", err => {
             reject(err);
          });
       });
    }
    module.exports = {
       uploadToUguu,
       coderAi,
       gpt4,
       lamda,
       stableDiff,
       askAi,
       google,
       dalle,
       bing,
       elevenlabs,
       shortenUrl,
       IronMan: function IronMan(url) {
          return "https://ironman.koyeb.app/" + url;
       },
       play,
       convertVideoToAudio,
       tts,
    };
 } catch (error) {
    console.log("Scraper ERROR:", error);
 }
 
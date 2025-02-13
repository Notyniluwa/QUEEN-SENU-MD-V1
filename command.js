var commands = [];

function cmd(info, func) {
    var data = info;
    data.function = func;
    if (!data.dontAddCommandList) data.dontAddCommandList = false;
    if (!info.desc) info.desc = '';
    if (!data.fromMe) data.fromMe = false;
    if (!info.category) data.category = 'misc';
    if(!info.filename) data.filename = "Not Provided";
    commands.push(data);
    return data;
}


/*conn.sendButtonMessage = async (jid, buttons, opts = {}) => {

            let header;
            if (opts?.video) {
                var video = await prepareWAMessageMedia({
                    video: {
                        url: opts && opts.video ? opts.video : ''
                    }
                }, {
                    upload: sock.waUploadToServer
                })
                header = {
                    title: opts && opts.header ? opts.header : '',
                    hasMediaAttachment: true,
                    videoMessage: video.videoMessage,
                }

            } else if (opts?.image) {
                var image = await prepareWAMessageMedia({
                    image: {
                        url: opts && opts.image ? opts.image : ''
                    }
                }, {
                    upload: sock.waUploadToServer
                })
                header = {
                    title: opts && opts.header ? opts.header : '',
                    hasMediaAttachment: true,
                    imageMessage: image.imageMessage,
                }

            } else {
                header = {
                    title: opts && opts.header ? opts.header : '',
                    hasMediaAttachment: false,
                }
            }
            let interactiveMessage;
            if (opts && opts.contextInfo) {
                interactiveMessage = {
                    body: {
                        text: opts && opts.body ? opts.body : ''
                    },
                    footer: {
                        text: opts && opts.footer ? opts.footer : ''
                    },
                    header: header,
                    nativeFlowMessage: {
                        buttons: buttons,
                        messageParamsJson: ''
                    },
                    contextInfo: opts && opts.contextInfo ? opts.contextInfo : ''
                }
            } else {
                interactiveMessage = {
                    body: {
                        text: opts && opts.body ? opts.body : ''
                    },
                    footer: {
                        text: opts && opts.footer ? opts.footer : ''
                    },
                    header: header,
                    nativeFlowMessage: {
                        buttons: buttons,
                        messageParamsJson: ''
                    }
                }
            }

            let message = generateWAMessageFromContent(jid, {
                viewOnceMessage: {
                    message: {
                        messageContextInfo: {
                            deviceListMetadata: {},
                            deviceListMetadataVersion: 2,
                        },
                        interactiveMessage: interactiveMessage
                    }
                }
            }, {

            })

            return await sock.relayMessage(jid, message["message"], {
                messageId: message.key.id
            })
        }*/
module.exports = {
    cmd,
    AddCommand:cmd,
    Function:cmd,
    Module:cmd,
    commands,
}; 

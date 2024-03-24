import { AnyMessageContent, PollMessageOptions } from '@whiskeysockets/baileys';
import { AttachmentInfo, IWebMessageInfoExtended } from './types';
import { sock } from '../index.js';

const sendText = async (text: string, senderNumber: string): Promise<void> => {
  await sock.sendMessage(senderNumber, { text: text });
};

const sendLink = async (text: string, senderNumber: string): Promise<void> => {
  // const pp = await fetch(
  //   'https://raw.githubusercontent.com/tribone23/tribot-ts/dev/src/assets/thumbnail.jpg',
  // );
  // const ppArrayBuffer = await pp.arrayBuffer();
  // const ppUint8Array = new Uint8Array(ppArrayBuffer);
  await sock.sendMessage(senderNumber, {
    text: text,
    contextInfo: {
      externalAdReply: {
        title: '23 Maret 2024',
        body: '© izumi-bot delta v1.0.2',
        mediaType: 1,
        thumbnailUrl:
          'https://cdn.jsdelivr.net/gh/dhanifitrah/STOK-IZUMI/PAGE-IZUMIBOT.jpg',
        sourceUrl: 'https://www.whatsapp.com/channel/0029VaOQ8kVDTkK5ZQwEHE1H',
        containsAutoReply: false,
        renderLargerThumbnail: true,
        showAdAttribution: false,
      },

      // await sock.sendMessage(senderNumber, {
      //   text: text,
      //   contextInfo: {
      //     externalAdReply : {
      //     title: '23 Maret 2024',
      //     body: '© izumi-bot delta v1.0.2',
      //     mediaType: 1,
      //     thumbnailUrl: 'https://cdn.jsdelivr.net/gh/dhanifitrah/STOK-IZUMI/PAGE-IZUMIBOT.jpg',
      //     thumbnail: <Buffer>,
      //     sourceUrl: 'https://www.whatsapp.com/channel/0029VaOQ8kVDTkK5ZQwEHE1H',
      //     containsAutoReply: false,
      //     renderLargerThumbnail: true,
      //     showAdAttribution: false
    },
  });
};

const sendAttachment = async (
  attachmentInfo: AttachmentInfo,
  senderNumber: string,
  m: IWebMessageInfoExtended,
) => {
  const { type, url, caption, mimetype } = attachmentInfo;
  console.log(url, caption, type);

  if (type === 'video') {
    await sock.sendMessage(
      senderNumber,
      { caption: caption || 'Nyo videone', video: { url: url ?? '' } },
      { quoted: m },
    );
  } else if (type === 'image') {
    await sock.sendMessage(senderNumber, {
      caption: caption || 'Nyo Gambare',
      image: { url: url ?? '' },
    });
  } else if (type === 'audio') {
    await sock.sendMessage(senderNumber, {
      audio: { url: url ?? '' },
      mimetype: mimetype ?? 'audio/mp4',
    });
  } else {
    console.log('kapan kapan');
  }
};

const reply = async (
  text: string,
  senderNumber: string,
  m: IWebMessageInfoExtended,
): Promise<void> => {
  await sock.sendMessage(senderNumber, { text }, { quoted: m });
};

const replyWithSticker = async (
  sticker: AnyMessageContent,
  senderNumber: string,
  m: IWebMessageInfoExtended,
): Promise<void> => {
  await sock.sendMessage(senderNumber, sticker, {
    quoted: m,
  });
};

const replyWithImages = async (
  text: string,
  url: string,
  senderNumber: string,
  m: IWebMessageInfoExtended,
): Promise<void> => {
  await sock.sendMessage(
    senderNumber,
    { image: { url: url ?? '' }, caption: text },
    { quoted: m, mediaUploadTimeoutMs: 1000 * 60 },
  );
};

const sendPoll = async (
  poll: PollMessageOptions,
  senderNumber: string,
  m: IWebMessageInfoExtended,
) => {
  await sock.sendMessage(senderNumber, { poll }, { quoted: m });
};

const sendButtons = async (
  senderNumber: string,
  m: IWebMessageInfoExtended,
) => {
  const buttons = [
    { buttonId: 'id1', buttonText: { displayText: 'Info 1!' } },
    { buttonId: 'id2', buttonText: { displayText: 'Info 2!' } },
    { buttonId: 'id3', buttonText: { displayText: '💵 Info 3' } },
  ];

  const buttonInfo = {
    text: 'Info Warung Kopi',
    buttons: buttons,
    viewOnce: true,
    headerType: 1,
  };
  await sock.sendMessage(senderNumber, buttonInfo, { quoted: m });
};

const sendAudio = async (
  senderNumber: string,
  url: string,
  m: IWebMessageInfoExtended,
  mimetype?: string,
): Promise<void> => {
  await sock.sendMessage(
    senderNumber,
    {
      audio: { url: url ?? '' },
      mimetype: mimetype ?? 'audio/mp4',
      caption: 'Nyo audione',
    },
    { quoted: m },
  );
};

const utils = {
  sendText,
  sendLink,
  sendAttachment,
  reply,
  replyWithImages,
  replyWithSticker,
  sendPoll,
  sendButtons,
  sendAudio,
};

export default utils;

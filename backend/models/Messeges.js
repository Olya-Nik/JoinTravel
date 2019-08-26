const mongoose = require('mongoose');

const { ObjectId } = mongoose.Schema.Types;

const messagesSchema = new mongoose.Schema({
  senderUserId: { type: ObjectId },
  recevierUserId: { type: ObjectId },
  date: { type: Date, default: Date.now },
  messageText: String
});

const chatSchema = new mongoose.Schema({
  messageChat: [],
});

const Messages = mongoose.model('Messages', messagesSchema);
const Chat = mongoose.model('Chat', chatSchema);

async function seeds() {
    
const mes1 = new Messages({
    senderUserId: '5d5fc042e6da5a013747778a',
    recevierUserId: '5d5fd00d1c8b061874174866',
    date: new Date(),
    messageText: 'Hello'
  });

const mes2 = new Messages({
    senderUserId: '5d5fd00d1c8b061874174866',
    recevierUserId: '5d5fc042e6da5a013747778a',
    date: new Date(),
    messageText: 'Hello Ann'
  });


  const chat = new Chat({messageChat: [{messageText: mes1.messageText}, {messageText: mes2.messageText}]});
  
  //await mes1.save();
  //await mes2.save();
  await chat.save();
}

//seeds();

module.exports = { Messages, Chat };

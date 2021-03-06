const mongoose = require('mongoose');
//const { User } = require('./User');

const { ObjectId } = mongoose.Schema.Types;

const messagesSchema = new mongoose.Schema({
  user_id: { type: ObjectId },
  receiver_id: { type: ObjectId },
  date: { type: Date, default: Date.now },
  messageText: String,
  chat: []
});

const chatSchema = new mongoose.Schema({
  messageChat: []
});

const Messages = mongoose.model('Messages', messagesSchema);
const Chat = mongoose.model('Chat', chatSchema);

async function seeds() {
  const mes1 = new Messages({
    senderUserId: '5d5fc042e6da5a013747778a',
    recevierUserId: '5d5fd00d1c8b061874174866',
    date: new Date(),
    messageText: 'Hello',

  });

  const mes2 = new Messages({
    senderUserId: '5d5fd00d1c8b061874174866',
    recevierUserId: '5d5fc042e6da5a013747778a',
    date: new Date(),
    messageText: 'Hello Ann'
  });

  const chat = new Chat({
    messageChat: [
      { sender: mes1.senderUserId, messageText: mes1.messageText },
      { sender: mes2.senderUserId, messageText: mes2.messageText }
    ]
  });

  //await mes1.save();
  //await mes2.save();
  //await chat.save();
  //await user.save()
}

//seeds();

module.exports = { Messages, Chat, chatSchema };

import { conversationModel } from "../models/conversation.model.js";
import { messageModel } from "../models/message.model.js";
import { getRecieverSocketId, io } from "../socket/socket.js";

const sendMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const recieverId = req.params.id;
    const { message } = req.body;
    let conversation = await conversationModel.findOne({
      participants: { $all: [senderId, recieverId] },
    });

    if (!conversation) {
      const newConversation = new conversationModel({
        participants: [senderId, recieverId],
      });
      conversation = await newConversation.save();
    }

    let newMessage = new messageModel({
      senderId,
      recieverId,
      message,
    });
    newMessage = await newMessage.save();
    if (newMessage) {
      conversation.message.push(newMessage._id);
    }
    await conversation.save();

    // implement socket io for realtime chatting

    const recieverSocketId = getRecieverSocketId(recieverId);
    console.log(recieverSocketId);
    if (recieverSocketId) {
      io.to(recieverSocketId).emit("newMessage", newMessage);
    }

    res.status(200).json({
      success: true,
      newMessage,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while sending message",
    });
  }
};

//----------------------------get messages-----------------------//

const getMessage = async (req, res) => {
  try {
    const senderId = req.user.id;
    const recieverId = req.params.id;
    const conversation = await conversationModel
      .findOne({
        participants: { $all: [senderId, recieverId] },
      })
      .populate({ path: "message" });
    if (!conversation) {
      return res.status(200).json({
        success: true,
        message: [],
      });
    } else {
      return res.status(200).json({
        success: true,
        message: conversation.message,
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error while getting message",
    });
  }
};

export { sendMessage, getMessage };

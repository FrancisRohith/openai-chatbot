'use client'
import config  from "../config";
import Chatbot from "react-chatbot-kit";

import 'react-chatbot-kit/build/main.css'
import './chatBot.css'
import ActionProvider from "../ActionProvider";
import MessageParser from "../MessageParser";


const ChatComponent = ()=>{
    return(
        <Chatbot
            config = {config}
            actionProvider={ActionProvider}
            messageParser={MessageParser}
        />
    )
}

export default ChatComponent;
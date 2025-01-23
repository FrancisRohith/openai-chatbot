const { createChatBotMessage } = require("react-chatbot-kit");

const config = {
    botName: 'Jarvis',
    initialMessages:[
        createChatBotMessage("Hello I'm travel expert, how can i help you")
    ]
}

export default config;
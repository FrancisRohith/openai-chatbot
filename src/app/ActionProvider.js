import OpenAI from "openai";
import { createChatBotMessage, createClientMessage, createCustomMessage } from "react-chatbot-kit";

const openai = new OpenAI({
    apiKey: "094f428832624c0693064d8739c57cca",
    baseURL: 'https://api.aimlapi.com/',
    dangerouslyAllowBrowser: true
})

class ActionProvider{
    createChatBotMessage
    setStateFunc
    createClientMessage
    stateRef 
    createCustomMessage

    constructor(
        createChatBotMessage,
        setStateFunc,
        createClientMessage,
        stateRef,
        createCustomMessage,
        ...rest
    ){
        this.createChatBotMessage = createChatBotMessage;
        this.setState = setStateFunc;
        this.createClientMessage = createClientMessage,
        this.state = stateRef;
        this.createCustomMessage = createCustomMessage;
    }

    callGenAi = async (prompt) =>{
        const chatCompletion = await openai.chat.completions.create(
            {
                model: 'gpt-3.5-turbo',
                messages: [
                    {role: 'system', content: "You're a tourist expert"},
                    {role: 'user', content: prompt}
                ],
                temperature: 0.5,
                max_tokens: 50
            }
        )
        return chatCompletion.choices[0].message.content
    }

    timer = ms => new Promise (res=>setTimeout(res,ms))

    generateResponseMessage = async (userMessage)=>{
        const responseFromGpt = await this.callGenAi(userMessage)
        let message;
        let numberNoLines = responseFromGpt.split('\n').length
        for(let i=0;i<numberNoLines;i++){
            const msg = responseFromGpt.split('\n')[i]
            if(msg.length){
                message = this.createChatBotMessage(msg)
               // message.content = msg;
               console.log(msg)
                this.updateChatBotMessage(message)
                
            }
            await this.timer(1000)
        }
    }
    respond = (message) =>{
        this.generateResponseMessage(message)
    }
    updateChatBotMessage = (message)=>{
        this.setState(prevState =>({
            ...prevState,
            messages: [...prevState.messages, message]
        }))
    }
}

export default ActionProvider;
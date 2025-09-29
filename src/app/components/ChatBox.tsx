'use client'
import React, { FormEvent, useEffect, useRef, useState } from "react"
import { icons } from "../common/icons"
import "@/app/styles/css/chatbot.css"
import { companyInfo } from "../common/company.info"
import axios from "axios"

const ChatBot: React.FC = () => {
    const { TbMessageChatbot, FaChevronDown, IoMdSend, RiQuestionnaireLine, IoIosCloseCircleOutline } = icons
    const [chatMessages, setChatMessages] = useState<{ role: string, text: string }[]>([{ role: "model", text: companyInfo }])
    const chatBodyRef = useRef<HTMLDivElement>(null)
    const [openChat, setOpenChat] = useState<boolean>(false)

    const handleSendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.currentTarget)
        const entries = Object.fromEntries(formData.entries())
        let message: string = String(entries.message).trim()
        if (!message) return
        e.currentTarget.reset()
        setChatMessages(prev => [...prev, { role: "user", text: message }])
        setTimeout(() => {
            setChatMessages(prev => [...prev, { role: "model", text: "Thinking..." }])
            generateBotResponse([...chatMessages, { role: "user", text: `Sử dụng thông tin đã cung cấp ở trên, xin hãy trả lời truy vấn này: ${message}` }])
        }, 600)
    }

    useEffect(() => {
        if (chatBodyRef.current) chatBodyRef.current.scrollTo({ top: chatBodyRef.current.scrollHeight, behavior: "smooth" })
    }, [chatMessages])

    const generateBotResponse = async (history: { role: string, text: string }[]) => {
        const updateHistory = (text: string) => {
            setChatMessages(prev => [...prev.filter((msg) => msg.text != "Thinking..."), { role: "model", text }]);
        }
        let formatHistory: any = history.map(({ role, text }) => ({ role, parts: [{ text }] }));
        console.log(formatHistory)
        try {
            // Make the API call to get the bot's response
            const response = await axios({
                url: "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyDECgZ2SA8OxAbOn2dZRw6712wxE486lIc",
                method: "POST",
                // headers: { "Content-Type": "application/json" },
                data: { contents: formatHistory }
            })
            // Clean and update chat history with bot's response
            const apiResponseText = response.data.candidates[0].content.parts[0].text.replace(/\*\*(.*?)\*\*/g, "$1").trim();
            console.log(response.data.candidates)
            updateHistory(apiResponseText);
        } catch (error) {
            updateHistory("Something went wrong");
        }
    }

    return (
        <div className={`container ${openChat ? 'show-chatbot-popup' : ''}`}>
            <button className="chatbot-toggler" onClick={() => setOpenChat(!openChat)}>
                {openChat ? <IoIosCloseCircleOutline size={30} /> : <RiQuestionnaireLine size={30} />}
            </button>
            <div className="chatbot-popup">
                <div className="chat-header">
                    <div className="header-info">
                        <TbMessageChatbot size={35} />
                        <h2 className="logo-text">Future Life AI Chatbot</h2>
                    </div>
                    <button type="button" onClick={() => setOpenChat(!openChat)}>
                        <FaChevronDown size={20} />
                    </button>
                </div>
                <div ref={chatBodyRef} className="chat-body">
                    <div className="message bot-message">
                        <TbMessageChatbot size={35} />
                        <p className="message-text">Xin chào <br /> Tôi có thể giúp gì bạn?</p>
                    </div>
                    {
                        chatMessages.slice(1).map((message, i) => {
                            return (
                                <div key={i} className={`message ${message.role === "model" ? "bot" : "user"}-message`}>
                                    {message.role === "model" && <TbMessageChatbot size={35} />}
                                    <p className="message-text">{message.text}</p>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="chat-footer">
                    <form className="chat-form" onSubmit={handleSendMessage}>
                        <input type="text" name="message" className="message-input" required />
                        <button type="submit"><IoMdSend size={20} /></button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default ChatBot
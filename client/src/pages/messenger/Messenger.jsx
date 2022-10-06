import { useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import { apiConversations, apiCreateMessage, getGetMessage } from "../../api";
import ChatOnline from "../../components/chatOnline/ChatOnline";
import Conversation from "../../components/conversations/Conversation";
import Message from "../../components/message/Message";
import Topbar from "../../components/topbar/Topbar";
import { AuthContext } from "../../context/auth/AuthContext";
import { SOCKET_URL } from "../../utils";
import "./messenger.css";

export default function Messenger() {

    const { user } = useContext(AuthContext);


    // io
    const socket = useRef();
    const [arrivalMessage, setArrivalMessage] = useState(null);
    useEffect(() => {
        socket.current = io(SOCKET_URL);
        console.log("socket:::", socket.current)
        socket.current.on("getMessage", (data) => {
            setArrivalMessage({
                sender: data.senderId,
                text: data.text,
                createdAt: Date.now(),
            });
        });
    }, []);


    const [onlineUsers, setOnlineUsers] = useState([]);
    useEffect(() => {
        // socket.emit === key,value gửi từ client đến server
        // socket.on === hàm nhận data từ server đến client
        if (user._id) socket.current.emit("addUser", user._id);
        socket.current.on("getUsers", (users) => {
            setOnlineUsers(
                user.followings.filter((f) => users.some((u) => u.userId === f))
            );
            console.log("users::", users)
        });
    }, [user]);

    // list chat
    const [conversations, setConversations] = useState([]);
    useEffect(() => {
        const getConversations = async () => {
            const { res, err } = await apiConversations(user._id)
            if (!err) setConversations(res);
        };
        if (user._id) getConversations();
    }, [user._id]);

    // get message
    const [currentChat, setCurrentChat] = useState(null);
    const [messages, setMessages] = useState([]);
    useEffect(() => {
        const getMessages = async () => {
            const { res, err } = await getGetMessage(currentChat?._id)
            if (!err) setMessages(res);
        };
        if (currentChat) getMessages();
    }, [currentChat]);
    useEffect(() => {
        arrivalMessage &&
            currentChat?.members?.includes(arrivalMessage?.sender) &&
            setMessages((prev) => [...prev, arrivalMessage]);
    }, [arrivalMessage, currentChat]);





    // post message
    const [newMessage, setNewMessage] = useState("");
    const handleSubmit = async (e) => {
        e.preventDefault();
        const message = {
            sender: user._id,
            text: newMessage,
            conversationId: currentChat._id,
        };

        const receiverId = currentChat.members.find(
            (member) => member !== user._id
        );
        socket.current.emit("sendMessage", {
            senderId: user._id,
            receiverId,
            text: newMessage.trim(),
        });

        const { res, err } = await apiCreateMessage(message);
        if (!err) {
            setMessages([...messages, res]);
            setNewMessage("");
        }
    };

    // scroll
    const scrollRef = useRef();
    useEffect(() => {
        scrollRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    return (
        <>
            <Topbar />
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search for friends" className="chatMenuInput" />
                        {conversations.map((c, i) => (
                            <div key={i} onClick={() => setCurrentChat(c)}>
                                <Conversation conversation={c} currentUser={user} i={i} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {currentChat ? (
                            <>
                                <div className="chatBoxTop">
                                    {messages.map((m) => (
                                        <div ref={scrollRef}>
                                            <Message message={m} own={m.sender === user._id} />
                                        </div>
                                    ))}
                                </div>
                                <div className="chatBoxBottom">
                                    <textarea
                                        className="chatMessageInput"
                                        placeholder="write something..."
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        value={newMessage} required
                                    ></textarea>
                                    <button className="chatSubmitButton" onClick={handleSubmit}>
                                        Send
                                    </button>
                                </div>
                            </>
                        ) : (
                            <span className="noConversationText">
                                Open a conversation to start a chat.
                            </span>
                        )}
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline
                            onlineUsers={onlineUsers}
                            currentId={user._id}
                            setCurrentChat={setCurrentChat}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

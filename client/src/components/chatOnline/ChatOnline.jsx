import axios from "axios";
import { useEffect, useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({ onlineUsers, currentId, setCurrentChat }) {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;

    // get friends
    const [friends, setFriends] = useState([]);
    useEffect(() => {
        const getFriends = async () => {
            const res = await axios.get("/users/friends/" + currentId);
            setFriends(res.data);
        };

        getFriends();
    }, [currentId]);

    // get friends online
    const [onlineFriends, setOnlineFriends] = useState([]);
    useEffect(() => {
        setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
    }, [friends, onlineUsers]);

    const handleClick = async (user) => {
        try {
            const res = await axios.get(
                `/conversations/find/${currentId}/${user._id}`
            );
            setCurrentChat(res.data);
        } catch (err) {
            console.log("err:::", err);
        }
    };

    return (
        <div className="chatOnline">
            {onlineFriends.map((o, i) => (
                <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
                    <div className="chatOnlineImgContainer">
                        <img
                            className="chatOnlineImg"
                            src={
                                o?.profilePicture
                                    ? PF + o.profilePicture
                                    : PF + `person/${i + 1}.jpeg`
                            }
                            alt=""
                        />
                        <div className="chatOnlineBadge"></div>
                    </div>
                    <span className="chatOnlineName">{o?.username}</span>
                </div>
            ))}
        </div>
    );
}

import { useEffect, useState } from "react";
import { apiGetUser } from "../../api";
import { PF } from "../../utils";
import "./conversation.css";

export default function Conversation({ conversation, currentUser, i }) {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const friendId = conversation.members.find((m) => m !== currentUser._id);

        const getFriend = async () => {
            const { res, err } = await apiGetUser(friendId)
            if (!err)
                setUser(res);
        };
        getFriend();
    }, [currentUser, conversation]);

    return (
        <div className="conversation">
            <img
                className="conversationImg"
                src={
                    user?.profilePicture
                        ? PF + user.profilePicture
                        : PF + `person/${i + 1}.jpeg`
                }
                alt=""
            />
            <span className="conversationName">{user?.username}</span>
        </div>
    );
}

import { PF } from "../../utils";
import "./closeFriend.css";

export default function CloseFriend({ user }) {
    return (
        <li className="sidebarFriend">
            <img className="sidebarFriendImg" src={PF + user.profilePicture} alt="" />
            <span className="sidebarFriendName">{user.username}</span>
        </li>
    );
}

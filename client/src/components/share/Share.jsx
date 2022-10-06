import { Cancel, EmojiEmotions, Label, PermMedia, Room } from "@material-ui/icons";
import { useContext, useRef, useState } from "react";
import { apiCreatePost, apiUpload } from "../../api";
import { AuthContext } from "../../context/auth/AuthContext";
import { PF } from './../../utils/index';
import "./share.css";

export default function Share() {

    const { user } = useContext(AuthContext);
    const desc = useRef()
    const [file, setFile] = useState('')
    const handleSubmit = async (e) => {
        e.preventDefault()
        const payload = {
            userId: user._id,
            desc: desc.current.value.trim()
        }
        if (file) {
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            const { err } = await apiUpload(data)
            if (!err)
                payload.img = fileName
            else console.log(err.message)
        }
        const { res, err } = await apiCreatePost(payload)
        if (!res && err) {
            console.log(err.message)
        } else {
            window.location.reload()
        }
    }

    return (
        <div className="share">
            <div className="shareWrapper">
                <label className="shareTop">
                    <img className="shareProfileImg"
                        src={user.profilePicture || PF + "person/1.jpeg"}
                        alt=""
                    />
                    <input
                        placeholder={`Bạn đang nghĩ gì ${user.username}?`}
                        className="shareInput"
                        ref={desc}
                    />
                </label>
                <hr className="shareHr" />

                {file && (
                    <div className="shareImgContainer">
                        <img className="shareImg" src={URL.createObjectURL(file)} alt="" />
                        <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
                    </div>
                )}

                <form onSubmit={handleSubmit} className="shareBottom">
                    <div className="shareOptions">
                        <label htmlFor="file" className="shareOption">
                            <PermMedia htmlColor="tomato" className="shareIcon" />
                            <span className="shareOptionText">Photo</span>
                            <input
                                type="file" id="file" accept=".png,.jpeg,.jpg"
                                onChange={(e) => setFile(e.target.files[0])}
                                style={{ display: "none" }}
                            />
                        </label>
                        <div className="shareOption">
                            <Label htmlColor="blue" className="shareIcon" />
                            <span className="shareOptionText">Tag</span>
                        </div>
                        <div className="shareOption">
                            <Room htmlColor="green" className="shareIcon" />
                            <span className="shareOptionText">Location</span>
                        </div>
                        <div className="shareOption">
                            <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
                            <span className="shareOptionText">Feelings</span>
                        </div>
                    </div>
                    <button type="submit" className="shareButton">Share</button>
                </form>
            </div>
        </div>
    );
}

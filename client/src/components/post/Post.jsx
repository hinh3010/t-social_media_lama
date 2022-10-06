import "./post.css";
import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useContext, useState } from "react";
import { BASE_URL, dateFormat, PF } from "../../utils";
import { useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/auth/AuthContext";

export default function Post({ post }) {
    const [like, setLike] = useState(post?.likes?.length)
    const [isLiked, setIsLiked] = useState(false)

    const [user, setUser] = useState([])
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(BASE_URL + "users/" + post?.userId).then(res => res)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId]);

    const { user: currentUser } = useContext(AuthContext);
    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id));
    }, [currentUser._id, post.likes]);
    const likeHandler = () => {
        try {
            axios.put(BASE_URL + "posts/" + post._id + "/like", { userId: currentUser._id });
        } catch (err) { }
        setLike(isLiked ? like - 1 : like + 1);
        setIsLiked(!isLiked);
    };

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user?.username}`}>
                            <img className="postProfileImg"
                                src={user.profilePicture || PF + "person/1.jpeg"}
                                alt=""
                            />
                            {/* <img className="postProfileImg"
                                src={Users.filter(u => u.id === post?.userId)[0].profilePicture}
                                alt=""
                            /> */}
                        </Link>
                        <span className="postUsername">
                            {
                                user.username
                            }
                            {/* {
                                 Users.filter((u) => u.id === post?.userId)[0].username
                            } */}
                        </span>
                        <span className="postDate">{dateFormat(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert />
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={(PF + post.img) || post.img} alt="" />
                    {/* <img className="postImg" src={PF + post.photo} alt="" /> */}
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <img className="likeIcon" src={`${PF}like.png`} onClick={likeHandler} alt="" />
                        <img className="likeIcon" src={`${PF}heart.png`} onClick={likeHandler} alt="" />
                        <span className="postLikeCounter">{like} people like it</span>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comments</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/auth/AuthContext";
import { BASE_URL } from "../../utils";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";

export default function Feed(props) {
    const { username } = props
    const { user } = useContext(AuthContext);
    const [posts, setPosts] = useState([])
    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get(BASE_URL + "posts/profile/" + username)
                : await axios.get(BASE_URL + "posts/timeline/" + user._id)
            setPosts(
                res.data.sort((p1, p2) => {
                    return new Date(p2.createdAt) - new Date(p1.createdAt)
                })
            )
        }
        fetchPosts()
    }, [username, user._id]);



    return (
        <div className="feed">
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share />}

                {
                    posts.map((p) => (
                        <Post key={p._id} post={p} />
                    ))
                }
                {/* {
                        Posts.map((p) => (
                            <Post key={p.id} post={p} />
                        ))
                } */}

            </div>
        </div>
    );
}

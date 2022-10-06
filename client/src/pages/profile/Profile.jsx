import './profile.css';
import Topbar from '../../components/topbar/Topbar';
import Sidebar from '../../components/sidebar/Sidebar';
import Feed from '../../components/feed/Feed';
import Rightbar from '../../components/rightbar/Rightbar';
import { BASE_URL, PF } from '../../utils';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function Profile() {

	const { username } = useParams()
	const [user, setUser] = useState([])
	useEffect(() => {
		const fetchUser = async () => {
			const res = await axios.get(BASE_URL + "users?username=" + username).then(res => res)
			setUser(res.data)
		}
		fetchUser()
	}, [username]);

	return (
		<div>
			<Topbar />
			<div className="profile">
				<Sidebar />
				<div className="profileRight">
					<div className="profileRightTop">
						<div className="profileCover">
							<img className="profileCoverImg" src={user.coverPicture || `${PF}post/3.jpeg`} alt="" />
							<img className="profileUserImg" src={user.profilePicture || `${PF}person/7.jpeg`} alt="" />
						</div>
						<div className="profileInfo">
							<h4 className="profileInfoName">
								{
									user.username
								}
							</h4>
							<span className="profileInfoDesc">
								{
									user.desc
								}
							</span>
						</div>
					</div>
					<div className="profileRightBottom">
						<Feed username={username} />
						<Rightbar user={user} />
					</div>
				</div>
			</div>
		</div>
	);
}

import './rightbar.css';
import { Users } from '../../dummyData';
import Online from '../online/Online';
import { PF } from '../../utils';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from './../../context/auth/AuthContext';
import { apiFollow, apiGetFriends, apiUnFollow } from '../../api';
import { Link } from 'react-router-dom';
import { Add, Remove } from '@material-ui/icons';

const ProfileRightbar = ({ user, friends }) => {

	const { user: currentUser, dispatch } = useContext(AuthContext);
	const [followed, setFollowed] = useState(
		currentUser.followings.includes(user?.id)
	);

	const handleClick = async () => {
		try {
			if (followed) {
				const { res, err } = await apiFollow(
					user._id, {
					userId: currentUser._id,
				})
				if (!res || err) return console.log({ err: err.message })
				dispatch({ type: "UNFOLLOW", payload: user._id });
			} else {
				const { res, err } = await apiUnFollow(
					user._id, {
					userId: currentUser._id,
				})
				if (!res || err) return console.log({ err: err.message })
				dispatch({ type: "FOLLOW", payload: user._id });
			}
			setFollowed(!followed);
		} catch (err) {
		}
	};

	console.log(user.username, currentUser.username)

	return (
		<>
			{user.username !== currentUser.username && (
				<button className="rightbarFollowButton" onClick={handleClick}>
					{followed ? "Unfollow" : "Follow"}
					{followed ? <Remove /> : <Add />}
				</button>
			)}
			<h4 className="rightbarTitle">User information</h4>
			<div className="rightbarInfo">
				<div className="rightbarInfoItem">
					<span className="rightbarInfoKey">City: </span>
					<span className="rightbarInfoValue">{user.city || "-_-"}</span>
				</div>
				<div className="rightbarInfoItem">
					<span className="rightbarInfoKey">From:</span>
					<span className="rightbarInfoValue">{user.from || "-_-"}</span>
				</div>
				<div className="rightbarInfoItem">
					<span className="rightbarInfoKey">Relationship:</span>
					<span className="rightbarInfoValue">
						{user.relationship === 1
							? "Single"
							: user.relationship === 1
								? "Married"
								: "-_-"}
					</span>
				</div>
			</div>
			<h4 className="rightbarTitle">User friends</h4>
			{
				friends?.length > 0
					? <div className="rightbarFollowings">
						{
							friends.map((friend, i) => {
								return (
									<Link to={'/profile/' + friend.username} style={{ textDecoration: "none" }}>
										<div className="rightbarFollowing">
											<img
												src={friend.profilePicture ? PF + friend.profilePicture : `${PF}person/${i + 1}.jpeg`}
												alt="" className="rightbarFollowingImg"
											/>
											<span className="rightbarFollowingName">
												{friend.username}
											</span>
										</div>
									</Link>
								)
							})
						}
					</div>
					: <div className="rightbarFollowings">
						<div className="rightbarFollowing">
							<img src={`${PF}person/1.jpeg`} alt="" className="rightbarFollowingImg" />
							<span className="rightbarFollowingName">John Carter</span>
						</div>
						<div className="rightbarFollowing">
							<img src={`${PF}person/2.jpeg`} alt="" className="rightbarFollowingImg" />
							<span className="rightbarFollowingName">John Carter</span>
						</div>
						<div className="rightbarFollowing">
							<img src={`${PF}person/3.jpeg`} alt="" className="rightbarFollowingImg" />
							<span className="rightbarFollowingName">John Carter</span>
						</div>
						<div className="rightbarFollowing">
							<img src={`${PF}person/4.jpeg`} alt="" className="rightbarFollowingImg" />
							<span className="rightbarFollowingName">John Carter</span>
						</div>
						<div className="rightbarFollowing">
							<img src={`${PF}person/5.jpeg`} alt="" className="rightbarFollowingImg" />
							<span className="rightbarFollowingName">John Carter</span>
						</div>
						<div className="rightbarFollowing">
							<img src={`${PF}person/6.jpeg`} alt="" className="rightbarFollowingImg" />
							<span className="rightbarFollowingName">John Carter</span>
						</div>
					</div >
			}
		</ >
	);
};

const HomeRightbar = () => {
	return (
		<div>
			<div className="birthdayContainer">
				<img className="birthdayImg" src={`${PF}gift.png`} alt="" />
				<span className="birthdayText">
					<b>Pola Foster</b> and <b>3 other friends</b> have a birhday today.
				</span>
			</div>
			<img className="rightbarAd" src={`${PF}ad.png`} alt="" />
			<h4 className="rightbarTitle">Online Friends</h4>
			<ul className="rightbarFriendList">{Users.map((u) => <Online key={u.id} user={u} />)}</ul>
		</div>
	);
};


export default function Rightbar({ user }) {

	const [friends, setFriends] = useState([]);


	useEffect(() => {
		if (user?._id) {
			getFriends();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [user?._id]);

	const getFriends = async () => {
		try {
			const { res, err } = await apiGetFriends(user?._id)
			if (err || !res) {
				return console.log({ eer: err.message })
			}
			setFriends(res);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="rightbar">
			<div className="rightbarWrapper">
				{
					user
						? <ProfileRightbar
							user={user}
							friends={friends}
						/>
						: <HomeRightbar />
				}
			</div>
		</div>
	);
}

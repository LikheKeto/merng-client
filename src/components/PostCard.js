import React, { useContext } from 'react';
import { Card, Icon, Label, Image, Button, Popup } from 'semantic-ui-react';
import moment from 'moment';
import { Link } from 'react-router-dom';

import { AuthContext } from '../context/auth';
import LikeButton from './LikeButton';
import DeleteButton from './DeleteButton';

const PostCard = ({ post }) => {
	const { user } = useContext(AuthContext);
	const commentPost = () => {
		console.log('comment post');
	};

	return (
		<>
			<Card fluid>
				<Card.Content>
					<Image
						floated="right"
						size="mini"
						src="https://react.semantic-ui.com/images/avatar/large/molly.png"
					/>
					<Card.Header>{post.username}</Card.Header>
					<Card.Meta as={Link} to={`/post/${post.id}`}>
						{moment(post.createdAt).fromNow(true)}
					</Card.Meta>
					<Card.Description>{post.body}</Card.Description>
				</Card.Content>
				<Card.Content extra>
					<LikeButton
						user={user}
						post={{
							id: post.id,
							likes: post.likes,
							likeCount: post.likeCount,
						}}
					/>

					<Popup
						inverted
						content="Add a comment"
						trigger={
							<Button as="div" labelPosition="right">
								<Button
									color="blue"
									basic
									onClick={commentPost}
									as={Link}
									to={`/post/${post.id}`}
								>
									<Icon name="comments" />
								</Button>
								<Label basic color="blue" pointing="left">
									{post.commentCount}
								</Label>
							</Button>
						}
					/>

					{user && user.username === post.username && (
						<DeleteButton postId={post.id} />
					)}
				</Card.Content>
			</Card>
		</>
	);
};

export default PostCard;

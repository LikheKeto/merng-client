import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import gql from 'graphql-tag';
import { Button, Icon, Label, Popup } from 'semantic-ui-react';

const LikeButton = ({ post: { id, likeCount, likes }, user }) => {
	const [liked, setLiked] = useState(false);
	useEffect(() => {
		if (user && likes.find((like) => like.username === user.username)) {
			setLiked(true);
		} else {
			setLiked(false);
		}
	}, [user, likes]);

	const [likePost] = useMutation(LIKE_POST_MUTATION, {
		variables: { postId: id },
	});
	const likeHandler = () => {
		if (!user) {
			return;
		}
		likePost();
	};

	const likeButton = user ? (
		liked ? (
			<Button color="red">
				<Icon name="heart" />
			</Button>
		) : (
			<Button color="red" basic>
				<Icon name="heart" />
			</Button>
		)
	) : (
		<Button as={Link} to="/login" color="red" basic>
			<Icon name="heart" />
		</Button>
	);
	return (
		<Popup
			inverted
			content={liked ? 'Dislike post' : 'Like Post'}
			trigger={
				<Button as="div" labelPosition="right" onClick={likeHandler}>
					{likeButton}
					<Label basic color="red" pointing="left">
						{likeCount}
					</Label>
				</Button>
			}
		/>
	);
};

const LIKE_POST_MUTATION = gql`
	mutation likePost($postId: ID!) {
		likePost(postId: $postId) {
			id
			likes {
				id
				username
			}
			likeCount
		}
	}
`;

export default LikeButton;

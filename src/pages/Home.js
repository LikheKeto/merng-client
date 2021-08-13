import React, { useContext } from 'react';
import { useQuery } from '@apollo/client';
import { Grid, Transition } from 'semantic-ui-react';
import PostCard from '../components/PostCard';

import { FETCH_POSTS_QUERY } from '../utils/graphql';
import { AuthContext } from '../context/auth';
import PostForm from '../components/PostForm';

const Home = () => {
	const { user } = useContext(AuthContext);
	const { data, loading, error } = useQuery(FETCH_POSTS_QUERY);
	let posts;
	if (data) {
		posts = data.getPosts;
	}
	if (error) {
		console.log(error);
		return 'error'; // blocks rendering
	}
	return (
		<Grid className="ui stackable three column grid">
			<Grid.Row className="page-title">
				<h1>Recent Posts</h1>
			</Grid.Row>
			<Grid.Row>
				{user && (
					<Grid.Column>
						<PostForm />
					</Grid.Column>
				)}
				{loading ? (
					<h1>Loading Posts...</h1>
				) : (
					<Transition.Group>
						{posts &&
							posts.map((post) => (
								<Grid.Column key={post.id} style={{ marginBottom: 20 }}>
									<PostCard post={post}></PostCard>
								</Grid.Column>
							))}
					</Transition.Group>
				)}
			</Grid.Row>
		</Grid>
	);
};

export default Home;

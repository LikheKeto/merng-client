import React, { useState } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useForm } from '../utils/hooks';
import { useMutation } from '@apollo/client';
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from '../utils/graphql';

const PostForm = () => {
	const [err, setErr] = useState('');
	const { onChange, onSubmit, values } = useForm(createPostCallback, {
		body: '',
	});
	const [createPost] = useMutation(CREATE_POST_MUTATION, {
		variables: values,
		update(proxy, result) {
			const data = proxy.readQuery({
				query: FETCH_POSTS_QUERY,
			});
			let newData = [...data.getPosts];
			newData = [result.data.createPost, ...newData];
			proxy.writeQuery({
				query: FETCH_POSTS_QUERY,
				data: {
					...data,
					getPosts: {
						newData,
					},
				},
			});
			values.body = '';
		},
		onError(err) {
			setErr(err);
		},
	});
	function createPostCallback() {
		createPost();
	}
	return (
		<>
			<Form onSubmit={onSubmit}>
				<h2>Create a post</h2>
				<Form.Field>
					<Form.Input
						placeholder="Hello World!"
						name="body"
						onChange={onChange}
						value={values.body}
						error={err ? true : false}
					/>
					<Button color="teal">Create</Button>
				</Form.Field>
			</Form>
			{err && (
				<div className="ui error message" style={{ marginBottom: 20 }}>
					<ul className="list">
						<li>{err.graphQLErrors[0].message}</li>
					</ul>
				</div>
			)}
		</>
	);
};

export default PostForm;

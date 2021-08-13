import gql from 'graphql-tag';
import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

const Login = (props) => {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(loginUserCallback, {
		username: '',
		password: '',
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, { data: { login: userData } }) {
			context.login(userData);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		variables: values,
	});

	function loginUserCallback() {
		loginUser();
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1>Login</h1>
				<Form.Input
					label="Username"
					placeholder="Username..."
					name="username"
					error={errors.username ? true : false}
					value={values.username}
					onChange={onChange}
				/>
				<Form.Input
					type="password"
					label="Password"
					placeholder="Password..."
					error={errors.password ? true : false}
					name="password"
					value={values.password}
					onChange={onChange}
				/>
				<Button content="login" primary />
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Login;

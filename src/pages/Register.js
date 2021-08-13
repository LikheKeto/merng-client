import gql from 'graphql-tag';
import React, { useState, useContext } from 'react';
import { Form, Button } from 'semantic-ui-react';
import { useMutation } from '@apollo/client';

import { useForm } from '../utils/hooks';
import { AuthContext } from '../context/auth';

const Register = (props) => {
	const context = useContext(AuthContext);
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, values } = useForm(registerUser, {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
	});

	const [addUser, { loading }] = useMutation(REGISTER_USER, {
		update(_, { data: { register: userData } }) {
			context.login(userData);
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.errors);
		},
		variables: values,
	});

	function registerUser() {
		addUser();
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1>Register</h1>
				<Form.Input
					label="Username"
					placeholder="Username..."
					name="username"
					error={errors.username ? true : false}
					value={values.username}
					onChange={onChange}
				/>
				<Form.Input
					label="Email"
					placeholder="Email..."
					name="email"
					error={errors.email ? true : false}
					value={values.email}
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
				<Form.Input
					type="password"
					label="Confirm password"
					placeholder="Confirm password..."
					error={errors.confirmPassword ? true : false}
					name="confirmPassword"
					value={values.confirmPassword}
					onChange={onChange}
				/>
				<Button content="Register" primary />
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

const REGISTER_USER = gql`
	mutation register(
		$username: String!
		$email: String!
		$password: String!
		$confirmPassword: String!
	) {
		register(
			registerInput: {
				username: $username
				email: $email
				password: $password
				confirmPassword: $confirmPassword
			}
		) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Register;

import React from 'react';
import App from './App';
import {
	ApolloProvider,
	ApolloClient,
	createHttpLink,
	InMemoryCache,
} from '@apollo/client';
import { setContext } from 'apollo-link-context';

const httpLink = createHttpLink({
	uri: process.env.REACT_APP_SERVER_URI,
});

const authLink = setContext(() => {
	const token = JSON.parse(localStorage.getItem('jwt'));
	return {
		headers: {
			Authorization: token ? `Bearer ${token}` : '',
		},
	};
});

const client = new ApolloClient({
	link: authLink.concat(httpLink),
	cache: new InMemoryCache(),
});

export default (
	<ApolloProvider client={client}>
		<App />
	</ApolloProvider>
);

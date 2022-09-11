import { gql } from '@apollo/client';

export const REGISTER_USER_MUTATION = gql`
	mutation REGISTER_USER_MUTATION($newUserInput: NewUserInput) {
		registerUser(newUser: $newUserInput) {
			email
			password
			phone
			updatedAt
			createdAt
			id
		}
	}
`;

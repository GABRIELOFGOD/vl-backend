import { AppError } from "../utils/error.middleware";
import { StatusCode } from "../utils/statusCode";

export const getApplicationId = () => {
	// Generate an 11-character alphanumeric key with uppercase letters
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
	let applicationId = '';
	for (let i = 0; i < 11; i++) {
		applicationId += characters.charAt(Math.floor(Math.random() * characters.length));
	}
	return applicationId;
};

export const getUserAge = (dob: string) => {
	// Parse the date of birth
	const birthDate = new Date(dob);
	const today = new Date();

	// Calculate the age
	let age = today.getFullYear() - birthDate.getFullYear();
	const monthDifference = today.getMonth() - birthDate.getMonth();
	if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
		age--;
	}

	// Validate the age
	if (age < 8) throw new AppError("Sorry you are under age", StatusCode.BAD_REQUEST);
	if (age > 25) throw new AppError("Sorry you are more than the age required for the contest.", StatusCode.BAD_REQUEST);

	return age;
};
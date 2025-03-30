import { SurahCategory } from "../entities/surah.entity";
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

export const getUserAge = (dob: string, ageGroup: SurahCategory): number => {
  const birthDate = new Date(dob);
  const today = new Date();

  // Calculate age
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDifference = today.getMonth() - birthDate.getMonth();
  if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }

  // Validate age range
  if (age < 8) {
    throw new AppError("Sorry, you are underage.", StatusCode.BAD_REQUEST);
  }
  if (age > 25) {
    throw new AppError("Sorry, you exceed the age requirement for the contest.", StatusCode.BAD_REQUEST);
  }

  // Extract min and max age from the selected category
  const [minAge, maxAge] = ageGroup.split("-").map(Number);

  // Ensure the user's age fits within the selected category
  if (age < minAge || age > maxAge) {
    throw new AppError(`Your age does not match the selected category (${ageGroup}).`, StatusCode.BAD_REQUEST);
  }

  return age;
};

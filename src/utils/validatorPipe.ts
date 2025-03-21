import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';

export const ValidatorPipe = <T extends object>(type: new () => T) => {
	return (data: any): T => {
		// Convert plain data to the specified type
		const instance = plainToInstance(type, data);

		// Validate the instance
		const errors = validateSync(instance);

		if (errors.length > 0) {
			throw new Error('Validation failed');
		}

		return instance;
	};
};
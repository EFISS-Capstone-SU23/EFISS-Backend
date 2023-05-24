import { type ValidationError } from 'class-validator'

export function getErrorString (errors: ValidationError[]): string {
	return errors
		.map((error: any) => {
			const keys = Object.keys(error.constraints)
			const listConstraints = keys.map((key) => error.constraints[key])
			return listConstraints.join(', ')
		})
		.join(', ')
}

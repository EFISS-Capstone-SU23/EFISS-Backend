/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type DBHelperBase } from './interfaces/db.interface'
import mongoose from 'mongoose'
mongoose.set('strictQuery', false)

export class MongodbHelper implements DBHelperBase {
	private readonly connectUrl: string
	constructor (
		public host: string,
		public port: number,
		public database: string,
		public username: string,
		public password: string
	) {
		this.connectUrl = 'mongodb'
		if (!isNaN(port)) {
			this.connectUrl += '+srv'
		}
		this.connectUrl += '://'
		if (username && password) {
			this.connectUrl += `${this.username}:${this.password}@`
		}
		this.connectUrl += this.host
		if (port) {
			this.connectUrl += `:${this.port}`
		}
		this.connectUrl += `/${this.database}?retryWrites=true&w=majority`
	}

	async connect (): Promise<void> {
		await mongoose.connect(this.connectUrl)
	}

	disconnect (): void {
		throw new Error('Method not implemented.')
	}
}

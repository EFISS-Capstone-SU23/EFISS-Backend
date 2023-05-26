/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import { type DBHelperBase } from './interfaces/db.interface';
import mongoose from 'mongoose';
mongoose.set('strictQuery', false);

export class MongodbHelper implements DBHelperBase {
  private readonly connectUrl: string;
  constructor(
    public host: string,
    public port: number,
    public database: string,
    public username: string,
    public password: string,
  ) {
    const params: string[] = [];

    this.connectUrl = 'mongodb';
    if (!isNaN(port)) {
      this.connectUrl += '+srv';
    }
    this.connectUrl += '://';
    if (username && password) {
      this.connectUrl += `${this.username}:${this.password}@`;
      params.push('authSource=admin');
    }
    this.connectUrl += this.host;
    if (port) {
      this.connectUrl += `:${this.port}`;
    }
    params.push('retryWrites=true');
    params.push('w=majority');
    this.connectUrl += `/${this.database}`;
    this.connectUrl += `?${params.join('&')}`;
  }

  async connect(): Promise<void> {
    await mongoose.connect(this.connectUrl);
  }

  disconnect(): void {
    throw new Error('Method not implemented.');
  }
}

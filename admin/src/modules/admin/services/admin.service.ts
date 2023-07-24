import { msg200 } from '../../../common/helpers';
import { IResponse } from '../../../common/response';

export class AdminService {
  constructor() {}

  async getAccountList(): Promise<IResponse> {
    return msg200('ok');
  }
}

export const adminService = new AdminService();

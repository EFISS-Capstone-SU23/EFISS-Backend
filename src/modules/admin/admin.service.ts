import { accountService } from '../auth/account.service';
import { AppOverallStatistics } from './dtos/admin.dto';

export class AdminService {
  constructor() {}

  async getAppOverallStatistics(): Promise<AppOverallStatistics> {
    const onlineUsers = await accountService.countOnlineUsers();
    const totalUsers = await accountService.countTotalUsers();
    const totalSearched = 1032; // Counting product impressions
    const todayNewUsers = await accountService.countTodayNewUsers();
    const todaySearched = 1032; // Counting product impressions
    return {
      onlineUsers,
      totalSearched,
      todayNewUsers,
      totalUsers,
      todaySearched,
    };
  }
}

export const adminService = new AdminService();

/* eslint-disable @typescript-eslint/strict-boolean-expressions */
/* eslint-disable @typescript-eslint/no-misused-promises */
import { Router, type Request, type Response, NextFunction } from 'express';
import { Permission, ViewAccountListSortBy } from '../../../loaders/enums';
import { adminService } from '../services/admin.service';
import { sendResponse } from '../../../common/helpers';
import { checkJwt, checkPermission } from '../../auth/middlewares/auth.middleware';
import { RequestValidator } from '../../../common/error-handler';
import {
  AddPermissionToRoleDto,
  AddRoleToAccountDto,
  CreateAccountDto,
  DeletePermissionFromRoleDto,
  DeleteRoleFromAccountDto,
  UpdateAccountDto,
} from '../dtos/admin.dto';
import { plainToInstance } from 'class-transformer';

export const adminRouter = Router();

// GET ACCOUNT LIST
adminRouter.get(
  '/accounts',
  checkJwt,
  checkPermission(Permission.ADMIN_OPS),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const query = (req.query?.query as string) || '';
    const sortBy = <ViewAccountListSortBy>req.query?.sortBy || ViewAccountListSortBy.NEWEST;
    const pageSize = Number(req.query.pageSize) || 10;
    const pageNumber = Number(req.query.pageNumber) || 1;
    const accountListResponse = await adminService.getAccountList({
      pageNumber,
      pageSize,
      sortBy,
      query,
    });
    sendResponse(accountListResponse, res, next);
  },
);

// CREATE ACCOUNT
adminRouter.post(
  '/accounts',
  checkJwt,
  checkPermission(Permission.ADMIN_OPS),
  RequestValidator.validate(CreateAccountDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const createAccountDto = plainToInstance(CreateAccountDto, req.body);
    const createAccountResult = await adminService.createAccount(createAccountDto);
    sendResponse(createAccountResult, res, next);
  },
);

// UPDATE ACCOUNT
adminRouter.put(
  '/accounts/:accountId',
  checkJwt,
  checkPermission(Permission.ADMIN_OPS),
  RequestValidator.validate(UpdateAccountDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(req.params.accountId);
    const updateAccountDto = plainToInstance(UpdateAccountDto, req.body);
    const updateAccountResult = await adminService.updateAccount(updateAccountDto, accountId);

    sendResponse(updateAccountResult, res, next);
  },
);

// DELETE ACCOUNT
adminRouter.delete(
  '/accounts/:accountId',
  checkJwt,
  checkPermission(Permission.ADMIN_OPS),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(req.params.accountId);
    const result = await adminService.deleteAccount(accountId);
    sendResponse(result, res, next);
  },
);

// ADD PERMISSION TO ROLE
adminRouter.post(
  '/roles/permissions',
  checkJwt,
  checkPermission(Permission.ADMIN_OPS),
  RequestValidator.validate(AddPermissionToRoleDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const addPermissionToRoleDto = plainToInstance(AddPermissionToRoleDto, req.body);
    const result = await adminService.addPermissionToRole(addPermissionToRoleDto);
    sendResponse(result, res, next);
  },
);

// DELETE PERMISSION FROM ROLE
adminRouter.delete(
  '/roles/permissions',
  checkJwt,
  checkPermission(Permission.ADMIN_OPS),
  RequestValidator.validate(DeletePermissionFromRoleDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const deletePermissionFromRole = plainToInstance(DeletePermissionFromRoleDto, req.body);
    const result = await adminService.deletePermissionFromRole(deletePermissionFromRole);
    sendResponse(result, res, next);
  },
);

// ADD ROLE TO ACCOUNT
adminRouter.post(
  '/accounts/:accountId/roles',
  checkJwt,
  checkPermission(Permission.ADMIN_OPS),
  RequestValidator.validate(AddRoleToAccountDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(req.params.accountId);
    const addRoleToAccountDto = plainToInstance(AddRoleToAccountDto, req.body);
    const result = await adminService.addRoleToAccount(addRoleToAccountDto, accountId);
    sendResponse(result, res, next);
  },
);

// DELETE ROLE FROM ACCOUNT
adminRouter.delete(
  '/accounts/:accountId/roles',
  checkJwt,
  checkPermission(Permission.ADMIN_OPS),
  RequestValidator.validate(DeleteRoleFromAccountDto),
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accountId = parseInt(req.params.accountId);
    const deleteRoleFromAccountDto = plainToInstance(DeleteRoleFromAccountDto, req.body);
    const result = await adminService.deleteRoleFromAccount(deleteRoleFromAccountDto, accountId);
    sendResponse(result, res, next);
  },
);

// package: 
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as auth_pb from "./auth_pb";

interface IAuthServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    checkJwt: IAuthServiceService_ICheckJwt;
    checkAccountPermission: IAuthServiceService_ICheckAccountPermission;
    viewAccountInformation: IAuthServiceService_IViewAccountInformation;
    updateAccountInformation: IAuthServiceService_IUpdateAccountInformation;
    getAccountList: IAuthServiceService_IGetAccountList;
    addRoleToAccount: IAuthServiceService_IAddRoleToAccount;
    deleteRoleFromAccount: IAuthServiceService_IDeleteRoleFromAccount;
    addPermissionToRole: IAuthServiceService_IAddPermissionToRole;
    deletePermissionFromRole: IAuthServiceService_IDeletePermissionFromRole;
    deleteAccountById: IAuthServiceService_IDeleteAccountById;
    createAccount: IAuthServiceService_ICreateAccount;
    updateAccount: IAuthServiceService_IUpdateAccount;
}

interface IAuthServiceService_ICheckJwt extends grpc.MethodDefinition<auth_pb.CheckJwtRequest, auth_pb.CheckJwtResponse> {
    path: "/AuthService/CheckJwt";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.CheckJwtRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.CheckJwtRequest>;
    responseSerialize: grpc.serialize<auth_pb.CheckJwtResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.CheckJwtResponse>;
}
interface IAuthServiceService_ICheckAccountPermission extends grpc.MethodDefinition<auth_pb.CheckAccountPermissionRequest, auth_pb.CheckAccountPermissionResponse> {
    path: "/AuthService/CheckAccountPermission";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.CheckAccountPermissionRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.CheckAccountPermissionRequest>;
    responseSerialize: grpc.serialize<auth_pb.CheckAccountPermissionResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.CheckAccountPermissionResponse>;
}
interface IAuthServiceService_IViewAccountInformation extends grpc.MethodDefinition<auth_pb.ViewAccountInformationRequest, auth_pb.ViewAccountInformationResponse> {
    path: "/AuthService/ViewAccountInformation";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.ViewAccountInformationRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.ViewAccountInformationRequest>;
    responseSerialize: grpc.serialize<auth_pb.ViewAccountInformationResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.ViewAccountInformationResponse>;
}
interface IAuthServiceService_IUpdateAccountInformation extends grpc.MethodDefinition<auth_pb.UpdateAccountInformationRequest, auth_pb.UpdateAccountInformationResponse> {
    path: "/AuthService/UpdateAccountInformation";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.UpdateAccountInformationRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.UpdateAccountInformationRequest>;
    responseSerialize: grpc.serialize<auth_pb.UpdateAccountInformationResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.UpdateAccountInformationResponse>;
}
interface IAuthServiceService_IGetAccountList extends grpc.MethodDefinition<auth_pb.GetAccountListRequest, auth_pb.GetAccountListResponse> {
    path: "/AuthService/GetAccountList";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.GetAccountListRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.GetAccountListRequest>;
    responseSerialize: grpc.serialize<auth_pb.GetAccountListResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.GetAccountListResponse>;
}
interface IAuthServiceService_IAddRoleToAccount extends grpc.MethodDefinition<auth_pb.AddRoleToAccountRequest, auth_pb.AddRoleToAccountResponse> {
    path: "/AuthService/AddRoleToAccount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.AddRoleToAccountRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.AddRoleToAccountRequest>;
    responseSerialize: grpc.serialize<auth_pb.AddRoleToAccountResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.AddRoleToAccountResponse>;
}
interface IAuthServiceService_IDeleteRoleFromAccount extends grpc.MethodDefinition<auth_pb.DeleteRoleFromAccountRequest, auth_pb.DeleteRoleFromAccountResponse> {
    path: "/AuthService/DeleteRoleFromAccount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.DeleteRoleFromAccountRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.DeleteRoleFromAccountRequest>;
    responseSerialize: grpc.serialize<auth_pb.DeleteRoleFromAccountResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.DeleteRoleFromAccountResponse>;
}
interface IAuthServiceService_IAddPermissionToRole extends grpc.MethodDefinition<auth_pb.AddPermissionToRoleRequest, auth_pb.AddPermissionToRoleResponse> {
    path: "/AuthService/AddPermissionToRole";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.AddPermissionToRoleRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.AddPermissionToRoleRequest>;
    responseSerialize: grpc.serialize<auth_pb.AddPermissionToRoleResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.AddPermissionToRoleResponse>;
}
interface IAuthServiceService_IDeletePermissionFromRole extends grpc.MethodDefinition<auth_pb.DeletePermissionFromRoleRequest, auth_pb.DeletePermissionFromRoleResponse> {
    path: "/AuthService/DeletePermissionFromRole";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.DeletePermissionFromRoleRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.DeletePermissionFromRoleRequest>;
    responseSerialize: grpc.serialize<auth_pb.DeletePermissionFromRoleResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.DeletePermissionFromRoleResponse>;
}
interface IAuthServiceService_IDeleteAccountById extends grpc.MethodDefinition<auth_pb.DeleteAccountByIdRequest, auth_pb.DeleteAccountByIdResponse> {
    path: "/AuthService/DeleteAccountById";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.DeleteAccountByIdRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.DeleteAccountByIdRequest>;
    responseSerialize: grpc.serialize<auth_pb.DeleteAccountByIdResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.DeleteAccountByIdResponse>;
}
interface IAuthServiceService_ICreateAccount extends grpc.MethodDefinition<auth_pb.CreateAccountRequest, auth_pb.CreateAccountResponse> {
    path: "/AuthService/CreateAccount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.CreateAccountRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.CreateAccountRequest>;
    responseSerialize: grpc.serialize<auth_pb.CreateAccountResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.CreateAccountResponse>;
}
interface IAuthServiceService_IUpdateAccount extends grpc.MethodDefinition<auth_pb.UpdateAccountRequest, auth_pb.UpdateAccountResponse> {
    path: "/AuthService/UpdateAccount";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<auth_pb.UpdateAccountRequest>;
    requestDeserialize: grpc.deserialize<auth_pb.UpdateAccountRequest>;
    responseSerialize: grpc.serialize<auth_pb.UpdateAccountResponse>;
    responseDeserialize: grpc.deserialize<auth_pb.UpdateAccountResponse>;
}

export const AuthServiceService: IAuthServiceService;

export interface IAuthServiceServer extends grpc.UntypedServiceImplementation {
    checkJwt: grpc.handleUnaryCall<auth_pb.CheckJwtRequest, auth_pb.CheckJwtResponse>;
    checkAccountPermission: grpc.handleUnaryCall<auth_pb.CheckAccountPermissionRequest, auth_pb.CheckAccountPermissionResponse>;
    viewAccountInformation: grpc.handleUnaryCall<auth_pb.ViewAccountInformationRequest, auth_pb.ViewAccountInformationResponse>;
    updateAccountInformation: grpc.handleUnaryCall<auth_pb.UpdateAccountInformationRequest, auth_pb.UpdateAccountInformationResponse>;
    getAccountList: grpc.handleUnaryCall<auth_pb.GetAccountListRequest, auth_pb.GetAccountListResponse>;
    addRoleToAccount: grpc.handleUnaryCall<auth_pb.AddRoleToAccountRequest, auth_pb.AddRoleToAccountResponse>;
    deleteRoleFromAccount: grpc.handleUnaryCall<auth_pb.DeleteRoleFromAccountRequest, auth_pb.DeleteRoleFromAccountResponse>;
    addPermissionToRole: grpc.handleUnaryCall<auth_pb.AddPermissionToRoleRequest, auth_pb.AddPermissionToRoleResponse>;
    deletePermissionFromRole: grpc.handleUnaryCall<auth_pb.DeletePermissionFromRoleRequest, auth_pb.DeletePermissionFromRoleResponse>;
    deleteAccountById: grpc.handleUnaryCall<auth_pb.DeleteAccountByIdRequest, auth_pb.DeleteAccountByIdResponse>;
    createAccount: grpc.handleUnaryCall<auth_pb.CreateAccountRequest, auth_pb.CreateAccountResponse>;
    updateAccount: grpc.handleUnaryCall<auth_pb.UpdateAccountRequest, auth_pb.UpdateAccountResponse>;
}

export interface IAuthServiceClient {
    checkJwt(request: auth_pb.CheckJwtRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    checkJwt(request: auth_pb.CheckJwtRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    checkJwt(request: auth_pb.CheckJwtRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    viewAccountInformation(request: auth_pb.ViewAccountInformationRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.ViewAccountInformationResponse) => void): grpc.ClientUnaryCall;
    viewAccountInformation(request: auth_pb.ViewAccountInformationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.ViewAccountInformationResponse) => void): grpc.ClientUnaryCall;
    viewAccountInformation(request: auth_pb.ViewAccountInformationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.ViewAccountInformationResponse) => void): grpc.ClientUnaryCall;
    updateAccountInformation(request: auth_pb.UpdateAccountInformationRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountInformationResponse) => void): grpc.ClientUnaryCall;
    updateAccountInformation(request: auth_pb.UpdateAccountInformationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountInformationResponse) => void): grpc.ClientUnaryCall;
    updateAccountInformation(request: auth_pb.UpdateAccountInformationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountInformationResponse) => void): grpc.ClientUnaryCall;
    getAccountList(request: auth_pb.GetAccountListRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.GetAccountListResponse) => void): grpc.ClientUnaryCall;
    getAccountList(request: auth_pb.GetAccountListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.GetAccountListResponse) => void): grpc.ClientUnaryCall;
    getAccountList(request: auth_pb.GetAccountListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.GetAccountListResponse) => void): grpc.ClientUnaryCall;
    addRoleToAccount(request: auth_pb.AddRoleToAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.AddRoleToAccountResponse) => void): grpc.ClientUnaryCall;
    addRoleToAccount(request: auth_pb.AddRoleToAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AddRoleToAccountResponse) => void): grpc.ClientUnaryCall;
    addRoleToAccount(request: auth_pb.AddRoleToAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AddRoleToAccountResponse) => void): grpc.ClientUnaryCall;
    deleteRoleFromAccount(request: auth_pb.DeleteRoleFromAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteRoleFromAccountResponse) => void): grpc.ClientUnaryCall;
    deleteRoleFromAccount(request: auth_pb.DeleteRoleFromAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteRoleFromAccountResponse) => void): grpc.ClientUnaryCall;
    deleteRoleFromAccount(request: auth_pb.DeleteRoleFromAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteRoleFromAccountResponse) => void): grpc.ClientUnaryCall;
    addPermissionToRole(request: auth_pb.AddPermissionToRoleRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.AddPermissionToRoleResponse) => void): grpc.ClientUnaryCall;
    addPermissionToRole(request: auth_pb.AddPermissionToRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AddPermissionToRoleResponse) => void): grpc.ClientUnaryCall;
    addPermissionToRole(request: auth_pb.AddPermissionToRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AddPermissionToRoleResponse) => void): grpc.ClientUnaryCall;
    deletePermissionFromRole(request: auth_pb.DeletePermissionFromRoleRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.DeletePermissionFromRoleResponse) => void): grpc.ClientUnaryCall;
    deletePermissionFromRole(request: auth_pb.DeletePermissionFromRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.DeletePermissionFromRoleResponse) => void): grpc.ClientUnaryCall;
    deletePermissionFromRole(request: auth_pb.DeletePermissionFromRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.DeletePermissionFromRoleResponse) => void): grpc.ClientUnaryCall;
    deleteAccountById(request: auth_pb.DeleteAccountByIdRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteAccountByIdResponse) => void): grpc.ClientUnaryCall;
    deleteAccountById(request: auth_pb.DeleteAccountByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteAccountByIdResponse) => void): grpc.ClientUnaryCall;
    deleteAccountById(request: auth_pb.DeleteAccountByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteAccountByIdResponse) => void): grpc.ClientUnaryCall;
    createAccount(request: auth_pb.CreateAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CreateAccountResponse) => void): grpc.ClientUnaryCall;
    createAccount(request: auth_pb.CreateAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CreateAccountResponse) => void): grpc.ClientUnaryCall;
    createAccount(request: auth_pb.CreateAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CreateAccountResponse) => void): grpc.ClientUnaryCall;
    updateAccount(request: auth_pb.UpdateAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountResponse) => void): grpc.ClientUnaryCall;
    updateAccount(request: auth_pb.UpdateAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountResponse) => void): grpc.ClientUnaryCall;
    updateAccount(request: auth_pb.UpdateAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountResponse) => void): grpc.ClientUnaryCall;
}

export class AuthServiceClient extends grpc.Client implements IAuthServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public checkJwt(request: auth_pb.CheckJwtRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    public checkJwt(request: auth_pb.CheckJwtRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    public checkJwt(request: auth_pb.CheckJwtRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    public checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    public checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    public checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    public viewAccountInformation(request: auth_pb.ViewAccountInformationRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.ViewAccountInformationResponse) => void): grpc.ClientUnaryCall;
    public viewAccountInformation(request: auth_pb.ViewAccountInformationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.ViewAccountInformationResponse) => void): grpc.ClientUnaryCall;
    public viewAccountInformation(request: auth_pb.ViewAccountInformationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.ViewAccountInformationResponse) => void): grpc.ClientUnaryCall;
    public updateAccountInformation(request: auth_pb.UpdateAccountInformationRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountInformationResponse) => void): grpc.ClientUnaryCall;
    public updateAccountInformation(request: auth_pb.UpdateAccountInformationRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountInformationResponse) => void): grpc.ClientUnaryCall;
    public updateAccountInformation(request: auth_pb.UpdateAccountInformationRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountInformationResponse) => void): grpc.ClientUnaryCall;
    public getAccountList(request: auth_pb.GetAccountListRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.GetAccountListResponse) => void): grpc.ClientUnaryCall;
    public getAccountList(request: auth_pb.GetAccountListRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.GetAccountListResponse) => void): grpc.ClientUnaryCall;
    public getAccountList(request: auth_pb.GetAccountListRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.GetAccountListResponse) => void): grpc.ClientUnaryCall;
    public addRoleToAccount(request: auth_pb.AddRoleToAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.AddRoleToAccountResponse) => void): grpc.ClientUnaryCall;
    public addRoleToAccount(request: auth_pb.AddRoleToAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AddRoleToAccountResponse) => void): grpc.ClientUnaryCall;
    public addRoleToAccount(request: auth_pb.AddRoleToAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AddRoleToAccountResponse) => void): grpc.ClientUnaryCall;
    public deleteRoleFromAccount(request: auth_pb.DeleteRoleFromAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteRoleFromAccountResponse) => void): grpc.ClientUnaryCall;
    public deleteRoleFromAccount(request: auth_pb.DeleteRoleFromAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteRoleFromAccountResponse) => void): grpc.ClientUnaryCall;
    public deleteRoleFromAccount(request: auth_pb.DeleteRoleFromAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteRoleFromAccountResponse) => void): grpc.ClientUnaryCall;
    public addPermissionToRole(request: auth_pb.AddPermissionToRoleRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.AddPermissionToRoleResponse) => void): grpc.ClientUnaryCall;
    public addPermissionToRole(request: auth_pb.AddPermissionToRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.AddPermissionToRoleResponse) => void): grpc.ClientUnaryCall;
    public addPermissionToRole(request: auth_pb.AddPermissionToRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.AddPermissionToRoleResponse) => void): grpc.ClientUnaryCall;
    public deletePermissionFromRole(request: auth_pb.DeletePermissionFromRoleRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.DeletePermissionFromRoleResponse) => void): grpc.ClientUnaryCall;
    public deletePermissionFromRole(request: auth_pb.DeletePermissionFromRoleRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.DeletePermissionFromRoleResponse) => void): grpc.ClientUnaryCall;
    public deletePermissionFromRole(request: auth_pb.DeletePermissionFromRoleRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.DeletePermissionFromRoleResponse) => void): grpc.ClientUnaryCall;
    public deleteAccountById(request: auth_pb.DeleteAccountByIdRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteAccountByIdResponse) => void): grpc.ClientUnaryCall;
    public deleteAccountById(request: auth_pb.DeleteAccountByIdRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteAccountByIdResponse) => void): grpc.ClientUnaryCall;
    public deleteAccountById(request: auth_pb.DeleteAccountByIdRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.DeleteAccountByIdResponse) => void): grpc.ClientUnaryCall;
    public createAccount(request: auth_pb.CreateAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CreateAccountResponse) => void): grpc.ClientUnaryCall;
    public createAccount(request: auth_pb.CreateAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CreateAccountResponse) => void): grpc.ClientUnaryCall;
    public createAccount(request: auth_pb.CreateAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CreateAccountResponse) => void): grpc.ClientUnaryCall;
    public updateAccount(request: auth_pb.UpdateAccountRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountResponse) => void): grpc.ClientUnaryCall;
    public updateAccount(request: auth_pb.UpdateAccountRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountResponse) => void): grpc.ClientUnaryCall;
    public updateAccount(request: auth_pb.UpdateAccountRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.UpdateAccountResponse) => void): grpc.ClientUnaryCall;
}

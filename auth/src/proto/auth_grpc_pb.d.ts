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

export const AuthServiceService: IAuthServiceService;

export interface IAuthServiceServer extends grpc.UntypedServiceImplementation {
    checkJwt: grpc.handleUnaryCall<auth_pb.CheckJwtRequest, auth_pb.CheckJwtResponse>;
    checkAccountPermission: grpc.handleUnaryCall<auth_pb.CheckAccountPermissionRequest, auth_pb.CheckAccountPermissionResponse>;
    viewAccountInformation: grpc.handleUnaryCall<auth_pb.ViewAccountInformationRequest, auth_pb.ViewAccountInformationResponse>;
    updateAccountInformation: grpc.handleUnaryCall<auth_pb.UpdateAccountInformationRequest, auth_pb.UpdateAccountInformationResponse>;
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
}

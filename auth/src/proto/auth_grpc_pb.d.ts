// package: 
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as auth_pb from "./auth_pb";

interface IAuthServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    checkJwt: IAuthServiceService_ICheckJwt;
    checkAccountPermission: IAuthServiceService_ICheckAccountPermission;
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

export const AuthServiceService: IAuthServiceService;

export interface IAuthServiceServer extends grpc.UntypedServiceImplementation {
    checkJwt: grpc.handleUnaryCall<auth_pb.CheckJwtRequest, auth_pb.CheckJwtResponse>;
    checkAccountPermission: grpc.handleUnaryCall<auth_pb.CheckAccountPermissionRequest, auth_pb.CheckAccountPermissionResponse>;
}

export interface IAuthServiceClient {
    checkJwt(request: auth_pb.CheckJwtRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    checkJwt(request: auth_pb.CheckJwtRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    checkJwt(request: auth_pb.CheckJwtRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
}

export class AuthServiceClient extends grpc.Client implements IAuthServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public checkJwt(request: auth_pb.CheckJwtRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    public checkJwt(request: auth_pb.CheckJwtRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    public checkJwt(request: auth_pb.CheckJwtRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckJwtResponse) => void): grpc.ClientUnaryCall;
    public checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    public checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
    public checkAccountPermission(request: auth_pb.CheckAccountPermissionRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: auth_pb.CheckAccountPermissionResponse) => void): grpc.ClientUnaryCall;
}

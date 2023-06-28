// package: 
// file: mailer.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as mailer_pb from "./mailer_pb";

interface IMailerServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    sendVerificationEmail: IMailerServiceService_ISendVerificationEmail;
    sendResetPasswordEmail: IMailerServiceService_ISendResetPasswordEmail;
}

interface IMailerServiceService_ISendVerificationEmail extends grpc.MethodDefinition<mailer_pb.SendVerificationEmailRequest, mailer_pb.SendVerificationEmailResponse> {
    path: "/MailerService/SendVerificationEmail";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<mailer_pb.SendVerificationEmailRequest>;
    requestDeserialize: grpc.deserialize<mailer_pb.SendVerificationEmailRequest>;
    responseSerialize: grpc.serialize<mailer_pb.SendVerificationEmailResponse>;
    responseDeserialize: grpc.deserialize<mailer_pb.SendVerificationEmailResponse>;
}
interface IMailerServiceService_ISendResetPasswordEmail extends grpc.MethodDefinition<mailer_pb.SendResetPasswordEmailRequest, mailer_pb.SendResetPasswordEmailResponse> {
    path: "/MailerService/SendResetPasswordEmail";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<mailer_pb.SendResetPasswordEmailRequest>;
    requestDeserialize: grpc.deserialize<mailer_pb.SendResetPasswordEmailRequest>;
    responseSerialize: grpc.serialize<mailer_pb.SendResetPasswordEmailResponse>;
    responseDeserialize: grpc.deserialize<mailer_pb.SendResetPasswordEmailResponse>;
}

export const MailerServiceService: IMailerServiceService;

export interface IMailerServiceServer extends grpc.UntypedServiceImplementation {
    sendVerificationEmail: grpc.handleUnaryCall<mailer_pb.SendVerificationEmailRequest, mailer_pb.SendVerificationEmailResponse>;
    sendResetPasswordEmail: grpc.handleUnaryCall<mailer_pb.SendResetPasswordEmailRequest, mailer_pb.SendResetPasswordEmailResponse>;
}

export interface IMailerServiceClient {
    sendVerificationEmail(request: mailer_pb.SendVerificationEmailRequest, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendVerificationEmailResponse) => void): grpc.ClientUnaryCall;
    sendVerificationEmail(request: mailer_pb.SendVerificationEmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendVerificationEmailResponse) => void): grpc.ClientUnaryCall;
    sendVerificationEmail(request: mailer_pb.SendVerificationEmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendVerificationEmailResponse) => void): grpc.ClientUnaryCall;
    sendResetPasswordEmail(request: mailer_pb.SendResetPasswordEmailRequest, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendResetPasswordEmailResponse) => void): grpc.ClientUnaryCall;
    sendResetPasswordEmail(request: mailer_pb.SendResetPasswordEmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendResetPasswordEmailResponse) => void): grpc.ClientUnaryCall;
    sendResetPasswordEmail(request: mailer_pb.SendResetPasswordEmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendResetPasswordEmailResponse) => void): grpc.ClientUnaryCall;
}

export class MailerServiceClient extends grpc.Client implements IMailerServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public sendVerificationEmail(request: mailer_pb.SendVerificationEmailRequest, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendVerificationEmailResponse) => void): grpc.ClientUnaryCall;
    public sendVerificationEmail(request: mailer_pb.SendVerificationEmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendVerificationEmailResponse) => void): grpc.ClientUnaryCall;
    public sendVerificationEmail(request: mailer_pb.SendVerificationEmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendVerificationEmailResponse) => void): grpc.ClientUnaryCall;
    public sendResetPasswordEmail(request: mailer_pb.SendResetPasswordEmailRequest, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendResetPasswordEmailResponse) => void): grpc.ClientUnaryCall;
    public sendResetPasswordEmail(request: mailer_pb.SendResetPasswordEmailRequest, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendResetPasswordEmailResponse) => void): grpc.ClientUnaryCall;
    public sendResetPasswordEmail(request: mailer_pb.SendResetPasswordEmailRequest, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: mailer_pb.SendResetPasswordEmailResponse) => void): grpc.ClientUnaryCall;
}

// package: 
// file: mailer.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class SendVerificationEmailRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): SendVerificationEmailRequest;
    getName(): string;
    setName(value: string): SendVerificationEmailRequest;
    getVerificationcode(): string;
    setVerificationcode(value: string): SendVerificationEmailRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendVerificationEmailRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendVerificationEmailRequest): SendVerificationEmailRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendVerificationEmailRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendVerificationEmailRequest;
    static deserializeBinaryFromReader(message: SendVerificationEmailRequest, reader: jspb.BinaryReader): SendVerificationEmailRequest;
}

export namespace SendVerificationEmailRequest {
    export type AsObject = {
        email: string,
        name: string,
        verificationcode: string,
    }
}

export class SendVerificationEmailResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SendVerificationEmailResponse;

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): SendVerificationEmailResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendVerificationEmailResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendVerificationEmailResponse): SendVerificationEmailResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendVerificationEmailResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendVerificationEmailResponse;
    static deserializeBinaryFromReader(message: SendVerificationEmailResponse, reader: jspb.BinaryReader): SendVerificationEmailResponse;
}

export namespace SendVerificationEmailResponse {
    export type AsObject = {
        success: boolean,
        error?: string,
    }
}

export class SendResetPasswordEmailRequest extends jspb.Message { 
    getEmail(): string;
    setEmail(value: string): SendResetPasswordEmailRequest;
    getName(): string;
    setName(value: string): SendResetPasswordEmailRequest;
    getResetpasswordcode(): string;
    setResetpasswordcode(value: string): SendResetPasswordEmailRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendResetPasswordEmailRequest.AsObject;
    static toObject(includeInstance: boolean, msg: SendResetPasswordEmailRequest): SendResetPasswordEmailRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendResetPasswordEmailRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendResetPasswordEmailRequest;
    static deserializeBinaryFromReader(message: SendResetPasswordEmailRequest, reader: jspb.BinaryReader): SendResetPasswordEmailRequest;
}

export namespace SendResetPasswordEmailRequest {
    export type AsObject = {
        email: string,
        name: string,
        resetpasswordcode: string,
    }
}

export class SendResetPasswordEmailResponse extends jspb.Message { 
    getSuccess(): boolean;
    setSuccess(value: boolean): SendResetPasswordEmailResponse;

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): SendResetPasswordEmailResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SendResetPasswordEmailResponse.AsObject;
    static toObject(includeInstance: boolean, msg: SendResetPasswordEmailResponse): SendResetPasswordEmailResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SendResetPasswordEmailResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SendResetPasswordEmailResponse;
    static deserializeBinaryFromReader(message: SendResetPasswordEmailResponse, reader: jspb.BinaryReader): SendResetPasswordEmailResponse;
}

export namespace SendResetPasswordEmailResponse {
    export type AsObject = {
        success: boolean,
        error?: string,
    }
}

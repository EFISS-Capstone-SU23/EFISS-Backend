// package: 
// file: auth.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class CheckJwtRequest extends jspb.Message { 
    getAccesstoken(): string;
    setAccesstoken(value: string): CheckJwtRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckJwtRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CheckJwtRequest): CheckJwtRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckJwtRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckJwtRequest;
    static deserializeBinaryFromReader(message: CheckJwtRequest, reader: jspb.BinaryReader): CheckJwtRequest;
}

export namespace CheckJwtRequest {
    export type AsObject = {
        accesstoken: string,
    }
}

export class CheckJwtResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): CheckJwtResponse;

    hasAccountid(): boolean;
    clearAccountid(): void;
    getAccountid(): number | undefined;
    setAccountid(value: number): CheckJwtResponse;

    hasUsername(): boolean;
    clearUsername(): void;
    getUsername(): string | undefined;
    setUsername(value: string): CheckJwtResponse;

    hasAccesstoken(): boolean;
    clearAccesstoken(): void;
    getAccesstoken(): string | undefined;
    setAccesstoken(value: string): CheckJwtResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckJwtResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CheckJwtResponse): CheckJwtResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckJwtResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckJwtResponse;
    static deserializeBinaryFromReader(message: CheckJwtResponse, reader: jspb.BinaryReader): CheckJwtResponse;
}

export namespace CheckJwtResponse {
    export type AsObject = {
        error?: string,
        accountid?: number,
        username?: string,
        accesstoken?: string,
    }
}

export class CheckAccountPermissionRequest extends jspb.Message { 
    getAccountid(): number;
    setAccountid(value: number): CheckAccountPermissionRequest;
    getPermission(): string;
    setPermission(value: string): CheckAccountPermissionRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckAccountPermissionRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CheckAccountPermissionRequest): CheckAccountPermissionRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckAccountPermissionRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckAccountPermissionRequest;
    static deserializeBinaryFromReader(message: CheckAccountPermissionRequest, reader: jspb.BinaryReader): CheckAccountPermissionRequest;
}

export namespace CheckAccountPermissionRequest {
    export type AsObject = {
        accountid: number,
        permission: string,
    }
}

export class CheckAccountPermissionResponse extends jspb.Message { 
    getHaspermission(): boolean;
    setHaspermission(value: boolean): CheckAccountPermissionResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CheckAccountPermissionResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CheckAccountPermissionResponse): CheckAccountPermissionResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CheckAccountPermissionResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CheckAccountPermissionResponse;
    static deserializeBinaryFromReader(message: CheckAccountPermissionResponse, reader: jspb.BinaryReader): CheckAccountPermissionResponse;
}

export namespace CheckAccountPermissionResponse {
    export type AsObject = {
        haspermission: boolean,
    }
}

export class ViewAccountInformationRequest extends jspb.Message { 
    getAccountid(): number;
    setAccountid(value: number): ViewAccountInformationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ViewAccountInformationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: ViewAccountInformationRequest): ViewAccountInformationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ViewAccountInformationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ViewAccountInformationRequest;
    static deserializeBinaryFromReader(message: ViewAccountInformationRequest, reader: jspb.BinaryReader): ViewAccountInformationRequest;
}

export namespace ViewAccountInformationRequest {
    export type AsObject = {
        accountid: number,
    }
}

export class ViewAccountInformationResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): ViewAccountInformationResponse;

    hasAccountid(): boolean;
    clearAccountid(): void;
    getAccountid(): number | undefined;
    setAccountid(value: number): ViewAccountInformationResponse;

    hasUsername(): boolean;
    clearUsername(): void;
    getUsername(): string | undefined;
    setUsername(value: string): ViewAccountInformationResponse;

    hasEmail(): boolean;
    clearEmail(): void;
    getEmail(): string | undefined;
    setEmail(value: string): ViewAccountInformationResponse;

    hasFirstname(): boolean;
    clearFirstname(): void;
    getFirstname(): string | undefined;
    setFirstname(value: string): ViewAccountInformationResponse;

    hasLastname(): boolean;
    clearLastname(): void;
    getLastname(): string | undefined;
    setLastname(value: string): ViewAccountInformationResponse;

    hasCreatedat(): boolean;
    clearCreatedat(): void;
    getCreatedat(): string | undefined;
    setCreatedat(value: string): ViewAccountInformationResponse;

    hasLastlogin(): boolean;
    clearLastlogin(): void;
    getLastlogin(): string | undefined;
    setLastlogin(value: string): ViewAccountInformationResponse;

    hasIsemailverified(): boolean;
    clearIsemailverified(): void;
    getIsemailverified(): boolean | undefined;
    setIsemailverified(value: boolean): ViewAccountInformationResponse;

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): boolean | undefined;
    setStatus(value: boolean): ViewAccountInformationResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): ViewAccountInformationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: ViewAccountInformationResponse): ViewAccountInformationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: ViewAccountInformationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): ViewAccountInformationResponse;
    static deserializeBinaryFromReader(message: ViewAccountInformationResponse, reader: jspb.BinaryReader): ViewAccountInformationResponse;
}

export namespace ViewAccountInformationResponse {
    export type AsObject = {
        error?: string,
        accountid?: number,
        username?: string,
        email?: string,
        firstname?: string,
        lastname?: string,
        createdat?: string,
        lastlogin?: string,
        isemailverified?: boolean,
        status?: boolean,
    }
}

export class UpdateAccountInformationRequest extends jspb.Message { 
    getAccountid(): number;
    setAccountid(value: number): UpdateAccountInformationRequest;

    hasFirstname(): boolean;
    clearFirstname(): void;
    getFirstname(): string | undefined;
    setFirstname(value: string): UpdateAccountInformationRequest;

    hasLastname(): boolean;
    clearLastname(): void;
    getLastname(): string | undefined;
    setLastname(value: string): UpdateAccountInformationRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateAccountInformationRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateAccountInformationRequest): UpdateAccountInformationRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateAccountInformationRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateAccountInformationRequest;
    static deserializeBinaryFromReader(message: UpdateAccountInformationRequest, reader: jspb.BinaryReader): UpdateAccountInformationRequest;
}

export namespace UpdateAccountInformationRequest {
    export type AsObject = {
        accountid: number,
        firstname?: string,
        lastname?: string,
    }
}

export class UpdateAccountInformationResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): UpdateAccountInformationResponse;

    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): string | undefined;
    setMessage(value: string): UpdateAccountInformationResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateAccountInformationResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateAccountInformationResponse): UpdateAccountInformationResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateAccountInformationResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateAccountInformationResponse;
    static deserializeBinaryFromReader(message: UpdateAccountInformationResponse, reader: jspb.BinaryReader): UpdateAccountInformationResponse;
}

export namespace UpdateAccountInformationResponse {
    export type AsObject = {
        error?: string,
        message?: string,
    }
}

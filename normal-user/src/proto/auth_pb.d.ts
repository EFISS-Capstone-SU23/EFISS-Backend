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

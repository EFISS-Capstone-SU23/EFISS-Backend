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

export class Account extends jspb.Message { 

    hasAccountid(): boolean;
    clearAccountid(): void;
    getAccountid(): number | undefined;
    setAccountid(value: number): Account;

    hasUsername(): boolean;
    clearUsername(): void;
    getUsername(): string | undefined;
    setUsername(value: string): Account;

    hasEmail(): boolean;
    clearEmail(): void;
    getEmail(): string | undefined;
    setEmail(value: string): Account;

    hasFirstname(): boolean;
    clearFirstname(): void;
    getFirstname(): string | undefined;
    setFirstname(value: string): Account;

    hasLastname(): boolean;
    clearLastname(): void;
    getLastname(): string | undefined;
    setLastname(value: string): Account;

    hasCreatedat(): boolean;
    clearCreatedat(): void;
    getCreatedat(): string | undefined;
    setCreatedat(value: string): Account;

    hasLastlogin(): boolean;
    clearLastlogin(): void;
    getLastlogin(): string | undefined;
    setLastlogin(value: string): Account;

    hasIsemailverified(): boolean;
    clearIsemailverified(): void;
    getIsemailverified(): boolean | undefined;
    setIsemailverified(value: boolean): Account;

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): boolean | undefined;
    setStatus(value: boolean): Account;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Account.AsObject;
    static toObject(includeInstance: boolean, msg: Account): Account.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Account, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Account;
    static deserializeBinaryFromReader(message: Account, reader: jspb.BinaryReader): Account;
}

export namespace Account {
    export type AsObject = {
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

export class GetAccountListRequest extends jspb.Message { 

    hasPagenumber(): boolean;
    clearPagenumber(): void;
    getPagenumber(): number | undefined;
    setPagenumber(value: number): GetAccountListRequest;

    hasPagesize(): boolean;
    clearPagesize(): void;
    getPagesize(): number | undefined;
    setPagesize(value: number): GetAccountListRequest;

    hasQuery(): boolean;
    clearQuery(): void;
    getQuery(): string | undefined;
    setQuery(value: string): GetAccountListRequest;

    hasSortby(): boolean;
    clearSortby(): void;
    getSortby(): string | undefined;
    setSortby(value: string): GetAccountListRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAccountListRequest.AsObject;
    static toObject(includeInstance: boolean, msg: GetAccountListRequest): GetAccountListRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAccountListRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAccountListRequest;
    static deserializeBinaryFromReader(message: GetAccountListRequest, reader: jspb.BinaryReader): GetAccountListRequest;
}

export namespace GetAccountListRequest {
    export type AsObject = {
        pagenumber?: number,
        pagesize?: number,
        query?: string,
        sortby?: string,
    }
}

export class GetAccountListResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): GetAccountListResponse;
    clearAccountsList(): void;
    getAccountsList(): Array<Account>;
    setAccountsList(value: Array<Account>): GetAccountListResponse;
    addAccounts(value?: Account, index?: number): Account;

    hasPagenumber(): boolean;
    clearPagenumber(): void;
    getPagenumber(): number | undefined;
    setPagenumber(value: number): GetAccountListResponse;

    hasPagesize(): boolean;
    clearPagesize(): void;
    getPagesize(): number | undefined;
    setPagesize(value: number): GetAccountListResponse;

    hasTotalpage(): boolean;
    clearTotalpage(): void;
    getTotalpage(): number | undefined;
    setTotalpage(value: number): GetAccountListResponse;

    hasTotalaccounts(): boolean;
    clearTotalaccounts(): void;
    getTotalaccounts(): number | undefined;
    setTotalaccounts(value: number): GetAccountListResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): GetAccountListResponse.AsObject;
    static toObject(includeInstance: boolean, msg: GetAccountListResponse): GetAccountListResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: GetAccountListResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): GetAccountListResponse;
    static deserializeBinaryFromReader(message: GetAccountListResponse, reader: jspb.BinaryReader): GetAccountListResponse;
}

export namespace GetAccountListResponse {
    export type AsObject = {
        error?: string,
        accountsList: Array<Account.AsObject>,
        pagenumber?: number,
        pagesize?: number,
        totalpage?: number,
        totalaccounts?: number,
    }
}

export class AddRoleToAccountRequest extends jspb.Message { 
    getAccountid(): number;
    setAccountid(value: number): AddRoleToAccountRequest;
    getRole(): string;
    setRole(value: string): AddRoleToAccountRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddRoleToAccountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddRoleToAccountRequest): AddRoleToAccountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddRoleToAccountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddRoleToAccountRequest;
    static deserializeBinaryFromReader(message: AddRoleToAccountRequest, reader: jspb.BinaryReader): AddRoleToAccountRequest;
}

export namespace AddRoleToAccountRequest {
    export type AsObject = {
        accountid: number,
        role: string,
    }
}

export class AddRoleToAccountResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): AddRoleToAccountResponse;

    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): string | undefined;
    setMessage(value: string): AddRoleToAccountResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddRoleToAccountResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddRoleToAccountResponse): AddRoleToAccountResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddRoleToAccountResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddRoleToAccountResponse;
    static deserializeBinaryFromReader(message: AddRoleToAccountResponse, reader: jspb.BinaryReader): AddRoleToAccountResponse;
}

export namespace AddRoleToAccountResponse {
    export type AsObject = {
        error?: string,
        message?: string,
    }
}

export class DeleteRoleFromAccountRequest extends jspb.Message { 
    getAccountid(): number;
    setAccountid(value: number): DeleteRoleFromAccountRequest;
    getRole(): string;
    setRole(value: string): DeleteRoleFromAccountRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteRoleFromAccountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteRoleFromAccountRequest): DeleteRoleFromAccountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteRoleFromAccountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteRoleFromAccountRequest;
    static deserializeBinaryFromReader(message: DeleteRoleFromAccountRequest, reader: jspb.BinaryReader): DeleteRoleFromAccountRequest;
}

export namespace DeleteRoleFromAccountRequest {
    export type AsObject = {
        accountid: number,
        role: string,
    }
}

export class DeleteRoleFromAccountResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): DeleteRoleFromAccountResponse;

    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): string | undefined;
    setMessage(value: string): DeleteRoleFromAccountResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteRoleFromAccountResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteRoleFromAccountResponse): DeleteRoleFromAccountResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteRoleFromAccountResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteRoleFromAccountResponse;
    static deserializeBinaryFromReader(message: DeleteRoleFromAccountResponse, reader: jspb.BinaryReader): DeleteRoleFromAccountResponse;
}

export namespace DeleteRoleFromAccountResponse {
    export type AsObject = {
        error?: string,
        message?: string,
    }
}

export class AddPermissionToRoleRequest extends jspb.Message { 
    getRole(): string;
    setRole(value: string): AddPermissionToRoleRequest;
    getPermission(): string;
    setPermission(value: string): AddPermissionToRoleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddPermissionToRoleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: AddPermissionToRoleRequest): AddPermissionToRoleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddPermissionToRoleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddPermissionToRoleRequest;
    static deserializeBinaryFromReader(message: AddPermissionToRoleRequest, reader: jspb.BinaryReader): AddPermissionToRoleRequest;
}

export namespace AddPermissionToRoleRequest {
    export type AsObject = {
        role: string,
        permission: string,
    }
}

export class AddPermissionToRoleResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): AddPermissionToRoleResponse;

    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): string | undefined;
    setMessage(value: string): AddPermissionToRoleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): AddPermissionToRoleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: AddPermissionToRoleResponse): AddPermissionToRoleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: AddPermissionToRoleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): AddPermissionToRoleResponse;
    static deserializeBinaryFromReader(message: AddPermissionToRoleResponse, reader: jspb.BinaryReader): AddPermissionToRoleResponse;
}

export namespace AddPermissionToRoleResponse {
    export type AsObject = {
        error?: string,
        message?: string,
    }
}

export class DeletePermissionFromRoleRequest extends jspb.Message { 
    getPermission(): string;
    setPermission(value: string): DeletePermissionFromRoleRequest;
    getRole(): string;
    setRole(value: string): DeletePermissionFromRoleRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeletePermissionFromRoleRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeletePermissionFromRoleRequest): DeletePermissionFromRoleRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeletePermissionFromRoleRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeletePermissionFromRoleRequest;
    static deserializeBinaryFromReader(message: DeletePermissionFromRoleRequest, reader: jspb.BinaryReader): DeletePermissionFromRoleRequest;
}

export namespace DeletePermissionFromRoleRequest {
    export type AsObject = {
        permission: string,
        role: string,
    }
}

export class DeletePermissionFromRoleResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): DeletePermissionFromRoleResponse;

    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): string | undefined;
    setMessage(value: string): DeletePermissionFromRoleResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeletePermissionFromRoleResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeletePermissionFromRoleResponse): DeletePermissionFromRoleResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeletePermissionFromRoleResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeletePermissionFromRoleResponse;
    static deserializeBinaryFromReader(message: DeletePermissionFromRoleResponse, reader: jspb.BinaryReader): DeletePermissionFromRoleResponse;
}

export namespace DeletePermissionFromRoleResponse {
    export type AsObject = {
        error?: string,
        message?: string,
    }
}

export class DeleteAccountByIdRequest extends jspb.Message { 
    getAccountid(): number;
    setAccountid(value: number): DeleteAccountByIdRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteAccountByIdRequest.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteAccountByIdRequest): DeleteAccountByIdRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteAccountByIdRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteAccountByIdRequest;
    static deserializeBinaryFromReader(message: DeleteAccountByIdRequest, reader: jspb.BinaryReader): DeleteAccountByIdRequest;
}

export namespace DeleteAccountByIdRequest {
    export type AsObject = {
        accountid: number,
    }
}

export class DeleteAccountByIdResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): DeleteAccountByIdResponse;

    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): string | undefined;
    setMessage(value: string): DeleteAccountByIdResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): DeleteAccountByIdResponse.AsObject;
    static toObject(includeInstance: boolean, msg: DeleteAccountByIdResponse): DeleteAccountByIdResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: DeleteAccountByIdResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): DeleteAccountByIdResponse;
    static deserializeBinaryFromReader(message: DeleteAccountByIdResponse, reader: jspb.BinaryReader): DeleteAccountByIdResponse;
}

export namespace DeleteAccountByIdResponse {
    export type AsObject = {
        error?: string,
        message?: string,
    }
}

export class UpdateAccountRequest extends jspb.Message { 
    getAccountid(): number;
    setAccountid(value: number): UpdateAccountRequest;

    hasUsername(): boolean;
    clearUsername(): void;
    getUsername(): string | undefined;
    setUsername(value: string): UpdateAccountRequest;

    hasEmail(): boolean;
    clearEmail(): void;
    getEmail(): string | undefined;
    setEmail(value: string): UpdateAccountRequest;

    hasFirstname(): boolean;
    clearFirstname(): void;
    getFirstname(): string | undefined;
    setFirstname(value: string): UpdateAccountRequest;

    hasLastname(): boolean;
    clearLastname(): void;
    getLastname(): string | undefined;
    setLastname(value: string): UpdateAccountRequest;

    hasStatus(): boolean;
    clearStatus(): void;
    getStatus(): boolean | undefined;
    setStatus(value: boolean): UpdateAccountRequest;

    hasIsemailverified(): boolean;
    clearIsemailverified(): void;
    getIsemailverified(): boolean | undefined;
    setIsemailverified(value: boolean): UpdateAccountRequest;

    hasPassword(): boolean;
    clearPassword(): void;
    getPassword(): string | undefined;
    setPassword(value: string): UpdateAccountRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateAccountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateAccountRequest): UpdateAccountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateAccountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateAccountRequest;
    static deserializeBinaryFromReader(message: UpdateAccountRequest, reader: jspb.BinaryReader): UpdateAccountRequest;
}

export namespace UpdateAccountRequest {
    export type AsObject = {
        accountid: number,
        username?: string,
        email?: string,
        firstname?: string,
        lastname?: string,
        status?: boolean,
        isemailverified?: boolean,
        password?: string,
    }
}

export class UpdateAccountResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): UpdateAccountResponse;

    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): string | undefined;
    setMessage(value: string): UpdateAccountResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): UpdateAccountResponse.AsObject;
    static toObject(includeInstance: boolean, msg: UpdateAccountResponse): UpdateAccountResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: UpdateAccountResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): UpdateAccountResponse;
    static deserializeBinaryFromReader(message: UpdateAccountResponse, reader: jspb.BinaryReader): UpdateAccountResponse;
}

export namespace UpdateAccountResponse {
    export type AsObject = {
        error?: string,
        message?: string,
    }
}

export class CreateAccountRequest extends jspb.Message { 
    getUsername(): string;
    setUsername(value: string): CreateAccountRequest;
    getEmail(): string;
    setEmail(value: string): CreateAccountRequest;
    getPassword(): string;
    setPassword(value: string): CreateAccountRequest;
    getFirstname(): string;
    setFirstname(value: string): CreateAccountRequest;
    getLastname(): string;
    setLastname(value: string): CreateAccountRequest;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateAccountRequest.AsObject;
    static toObject(includeInstance: boolean, msg: CreateAccountRequest): CreateAccountRequest.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateAccountRequest, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateAccountRequest;
    static deserializeBinaryFromReader(message: CreateAccountRequest, reader: jspb.BinaryReader): CreateAccountRequest;
}

export namespace CreateAccountRequest {
    export type AsObject = {
        username: string,
        email: string,
        password: string,
        firstname: string,
        lastname: string,
    }
}

export class CreateAccountResponse extends jspb.Message { 

    hasError(): boolean;
    clearError(): void;
    getError(): string | undefined;
    setError(value: string): CreateAccountResponse;

    hasMessage(): boolean;
    clearMessage(): void;
    getMessage(): string | undefined;
    setMessage(value: string): CreateAccountResponse;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): CreateAccountResponse.AsObject;
    static toObject(includeInstance: boolean, msg: CreateAccountResponse): CreateAccountResponse.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: CreateAccountResponse, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): CreateAccountResponse;
    static deserializeBinaryFromReader(message: CreateAccountResponse, reader: jspb.BinaryReader): CreateAccountResponse;
}

export namespace CreateAccountResponse {
    export type AsObject = {
        error?: string,
        message?: string,
    }
}

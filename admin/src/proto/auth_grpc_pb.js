// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var auth_pb = require('./auth_pb.js');

function serialize_AddPermissionToRoleRequest(arg) {
  if (!(arg instanceof auth_pb.AddPermissionToRoleRequest)) {
    throw new Error('Expected argument of type AddPermissionToRoleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddPermissionToRoleRequest(buffer_arg) {
  return auth_pb.AddPermissionToRoleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AddPermissionToRoleResponse(arg) {
  if (!(arg instanceof auth_pb.AddPermissionToRoleResponse)) {
    throw new Error('Expected argument of type AddPermissionToRoleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddPermissionToRoleResponse(buffer_arg) {
  return auth_pb.AddPermissionToRoleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AddRoleToAccountRequest(arg) {
  if (!(arg instanceof auth_pb.AddRoleToAccountRequest)) {
    throw new Error('Expected argument of type AddRoleToAccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddRoleToAccountRequest(buffer_arg) {
  return auth_pb.AddRoleToAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_AddRoleToAccountResponse(arg) {
  if (!(arg instanceof auth_pb.AddRoleToAccountResponse)) {
    throw new Error('Expected argument of type AddRoleToAccountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_AddRoleToAccountResponse(buffer_arg) {
  return auth_pb.AddRoleToAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CheckAccountPermissionRequest(arg) {
  if (!(arg instanceof auth_pb.CheckAccountPermissionRequest)) {
    throw new Error('Expected argument of type CheckAccountPermissionRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CheckAccountPermissionRequest(buffer_arg) {
  return auth_pb.CheckAccountPermissionRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CheckAccountPermissionResponse(arg) {
  if (!(arg instanceof auth_pb.CheckAccountPermissionResponse)) {
    throw new Error('Expected argument of type CheckAccountPermissionResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CheckAccountPermissionResponse(buffer_arg) {
  return auth_pb.CheckAccountPermissionResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CheckJwtRequest(arg) {
  if (!(arg instanceof auth_pb.CheckJwtRequest)) {
    throw new Error('Expected argument of type CheckJwtRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CheckJwtRequest(buffer_arg) {
  return auth_pb.CheckJwtRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CheckJwtResponse(arg) {
  if (!(arg instanceof auth_pb.CheckJwtResponse)) {
    throw new Error('Expected argument of type CheckJwtResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CheckJwtResponse(buffer_arg) {
  return auth_pb.CheckJwtResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateAccountRequest(arg) {
  if (!(arg instanceof auth_pb.CreateAccountRequest)) {
    throw new Error('Expected argument of type CreateAccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateAccountRequest(buffer_arg) {
  return auth_pb.CreateAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_CreateAccountResponse(arg) {
  if (!(arg instanceof auth_pb.CreateAccountResponse)) {
    throw new Error('Expected argument of type CreateAccountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_CreateAccountResponse(buffer_arg) {
  return auth_pb.CreateAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeleteAccountByIdRequest(arg) {
  if (!(arg instanceof auth_pb.DeleteAccountByIdRequest)) {
    throw new Error('Expected argument of type DeleteAccountByIdRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeleteAccountByIdRequest(buffer_arg) {
  return auth_pb.DeleteAccountByIdRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeleteAccountByIdResponse(arg) {
  if (!(arg instanceof auth_pb.DeleteAccountByIdResponse)) {
    throw new Error('Expected argument of type DeleteAccountByIdResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeleteAccountByIdResponse(buffer_arg) {
  return auth_pb.DeleteAccountByIdResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeletePermissionFromRoleRequest(arg) {
  if (!(arg instanceof auth_pb.DeletePermissionFromRoleRequest)) {
    throw new Error('Expected argument of type DeletePermissionFromRoleRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeletePermissionFromRoleRequest(buffer_arg) {
  return auth_pb.DeletePermissionFromRoleRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeletePermissionFromRoleResponse(arg) {
  if (!(arg instanceof auth_pb.DeletePermissionFromRoleResponse)) {
    throw new Error('Expected argument of type DeletePermissionFromRoleResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeletePermissionFromRoleResponse(buffer_arg) {
  return auth_pb.DeletePermissionFromRoleResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeleteRoleFromAccountRequest(arg) {
  if (!(arg instanceof auth_pb.DeleteRoleFromAccountRequest)) {
    throw new Error('Expected argument of type DeleteRoleFromAccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeleteRoleFromAccountRequest(buffer_arg) {
  return auth_pb.DeleteRoleFromAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_DeleteRoleFromAccountResponse(arg) {
  if (!(arg instanceof auth_pb.DeleteRoleFromAccountResponse)) {
    throw new Error('Expected argument of type DeleteRoleFromAccountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_DeleteRoleFromAccountResponse(buffer_arg) {
  return auth_pb.DeleteRoleFromAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetAccountListRequest(arg) {
  if (!(arg instanceof auth_pb.GetAccountListRequest)) {
    throw new Error('Expected argument of type GetAccountListRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetAccountListRequest(buffer_arg) {
  return auth_pb.GetAccountListRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_GetAccountListResponse(arg) {
  if (!(arg instanceof auth_pb.GetAccountListResponse)) {
    throw new Error('Expected argument of type GetAccountListResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_GetAccountListResponse(buffer_arg) {
  return auth_pb.GetAccountListResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UpdateAccountInformationRequest(arg) {
  if (!(arg instanceof auth_pb.UpdateAccountInformationRequest)) {
    throw new Error('Expected argument of type UpdateAccountInformationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UpdateAccountInformationRequest(buffer_arg) {
  return auth_pb.UpdateAccountInformationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UpdateAccountInformationResponse(arg) {
  if (!(arg instanceof auth_pb.UpdateAccountInformationResponse)) {
    throw new Error('Expected argument of type UpdateAccountInformationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UpdateAccountInformationResponse(buffer_arg) {
  return auth_pb.UpdateAccountInformationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UpdateAccountRequest(arg) {
  if (!(arg instanceof auth_pb.UpdateAccountRequest)) {
    throw new Error('Expected argument of type UpdateAccountRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UpdateAccountRequest(buffer_arg) {
  return auth_pb.UpdateAccountRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_UpdateAccountResponse(arg) {
  if (!(arg instanceof auth_pb.UpdateAccountResponse)) {
    throw new Error('Expected argument of type UpdateAccountResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_UpdateAccountResponse(buffer_arg) {
  return auth_pb.UpdateAccountResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ViewAccountInformationRequest(arg) {
  if (!(arg instanceof auth_pb.ViewAccountInformationRequest)) {
    throw new Error('Expected argument of type ViewAccountInformationRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ViewAccountInformationRequest(buffer_arg) {
  return auth_pb.ViewAccountInformationRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_ViewAccountInformationResponse(arg) {
  if (!(arg instanceof auth_pb.ViewAccountInformationResponse)) {
    throw new Error('Expected argument of type ViewAccountInformationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ViewAccountInformationResponse(buffer_arg) {
  return auth_pb.ViewAccountInformationResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var AuthServiceService = exports.AuthServiceService = {
  checkJwt: {
    path: '/AuthService/CheckJwt',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.CheckJwtRequest,
    responseType: auth_pb.CheckJwtResponse,
    requestSerialize: serialize_CheckJwtRequest,
    requestDeserialize: deserialize_CheckJwtRequest,
    responseSerialize: serialize_CheckJwtResponse,
    responseDeserialize: deserialize_CheckJwtResponse,
  },
  checkAccountPermission: {
    path: '/AuthService/CheckAccountPermission',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.CheckAccountPermissionRequest,
    responseType: auth_pb.CheckAccountPermissionResponse,
    requestSerialize: serialize_CheckAccountPermissionRequest,
    requestDeserialize: deserialize_CheckAccountPermissionRequest,
    responseSerialize: serialize_CheckAccountPermissionResponse,
    responseDeserialize: deserialize_CheckAccountPermissionResponse,
  },
  viewAccountInformation: {
    path: '/AuthService/ViewAccountInformation',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.ViewAccountInformationRequest,
    responseType: auth_pb.ViewAccountInformationResponse,
    requestSerialize: serialize_ViewAccountInformationRequest,
    requestDeserialize: deserialize_ViewAccountInformationRequest,
    responseSerialize: serialize_ViewAccountInformationResponse,
    responseDeserialize: deserialize_ViewAccountInformationResponse,
  },
  updateAccountInformation: {
    path: '/AuthService/UpdateAccountInformation',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.UpdateAccountInformationRequest,
    responseType: auth_pb.UpdateAccountInformationResponse,
    requestSerialize: serialize_UpdateAccountInformationRequest,
    requestDeserialize: deserialize_UpdateAccountInformationRequest,
    responseSerialize: serialize_UpdateAccountInformationResponse,
    responseDeserialize: deserialize_UpdateAccountInformationResponse,
  },
  getAccountList: {
    path: '/AuthService/GetAccountList',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.GetAccountListRequest,
    responseType: auth_pb.GetAccountListResponse,
    requestSerialize: serialize_GetAccountListRequest,
    requestDeserialize: deserialize_GetAccountListRequest,
    responseSerialize: serialize_GetAccountListResponse,
    responseDeserialize: deserialize_GetAccountListResponse,
  },
  addRoleToAccount: {
    path: '/AuthService/AddRoleToAccount',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.AddRoleToAccountRequest,
    responseType: auth_pb.AddRoleToAccountResponse,
    requestSerialize: serialize_AddRoleToAccountRequest,
    requestDeserialize: deserialize_AddRoleToAccountRequest,
    responseSerialize: serialize_AddRoleToAccountResponse,
    responseDeserialize: deserialize_AddRoleToAccountResponse,
  },
  deleteRoleFromAccount: {
    path: '/AuthService/DeleteRoleFromAccount',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.DeleteRoleFromAccountRequest,
    responseType: auth_pb.DeleteRoleFromAccountResponse,
    requestSerialize: serialize_DeleteRoleFromAccountRequest,
    requestDeserialize: deserialize_DeleteRoleFromAccountRequest,
    responseSerialize: serialize_DeleteRoleFromAccountResponse,
    responseDeserialize: deserialize_DeleteRoleFromAccountResponse,
  },
  addPermissionToRole: {
    path: '/AuthService/AddPermissionToRole',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.AddPermissionToRoleRequest,
    responseType: auth_pb.AddPermissionToRoleResponse,
    requestSerialize: serialize_AddPermissionToRoleRequest,
    requestDeserialize: deserialize_AddPermissionToRoleRequest,
    responseSerialize: serialize_AddPermissionToRoleResponse,
    responseDeserialize: deserialize_AddPermissionToRoleResponse,
  },
  deletePermissionFromRole: {
    path: '/AuthService/DeletePermissionFromRole',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.DeletePermissionFromRoleRequest,
    responseType: auth_pb.DeletePermissionFromRoleResponse,
    requestSerialize: serialize_DeletePermissionFromRoleRequest,
    requestDeserialize: deserialize_DeletePermissionFromRoleRequest,
    responseSerialize: serialize_DeletePermissionFromRoleResponse,
    responseDeserialize: deserialize_DeletePermissionFromRoleResponse,
  },
  deleteAccountById: {
    path: '/AuthService/DeleteAccountById',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.DeleteAccountByIdRequest,
    responseType: auth_pb.DeleteAccountByIdResponse,
    requestSerialize: serialize_DeleteAccountByIdRequest,
    requestDeserialize: deserialize_DeleteAccountByIdRequest,
    responseSerialize: serialize_DeleteAccountByIdResponse,
    responseDeserialize: deserialize_DeleteAccountByIdResponse,
  },
  createAccount: {
    path: '/AuthService/CreateAccount',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.CreateAccountRequest,
    responseType: auth_pb.CreateAccountResponse,
    requestSerialize: serialize_CreateAccountRequest,
    requestDeserialize: deserialize_CreateAccountRequest,
    responseSerialize: serialize_CreateAccountResponse,
    responseDeserialize: deserialize_CreateAccountResponse,
  },
  updateAccount: {
    path: '/AuthService/UpdateAccount',
    requestStream: false,
    responseStream: false,
    requestType: auth_pb.UpdateAccountRequest,
    responseType: auth_pb.UpdateAccountResponse,
    requestSerialize: serialize_UpdateAccountRequest,
    requestDeserialize: deserialize_UpdateAccountRequest,
    responseSerialize: serialize_UpdateAccountResponse,
    responseDeserialize: deserialize_UpdateAccountResponse,
  },
};

exports.AuthServiceClient = grpc.makeGenericClientConstructor(AuthServiceService);

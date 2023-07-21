// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var auth_pb = require('./auth_pb.js');

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
};

exports.AuthServiceClient = grpc.makeGenericClientConstructor(AuthServiceService);

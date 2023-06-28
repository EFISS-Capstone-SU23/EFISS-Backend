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
};

exports.AuthServiceClient = grpc.makeGenericClientConstructor(AuthServiceService);

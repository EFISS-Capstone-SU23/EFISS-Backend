// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var mailer_pb = require('./mailer_pb.js');

function serialize_SendResetPasswordEmailRequest(arg) {
  if (!(arg instanceof mailer_pb.SendResetPasswordEmailRequest)) {
    throw new Error('Expected argument of type SendResetPasswordEmailRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SendResetPasswordEmailRequest(buffer_arg) {
  return mailer_pb.SendResetPasswordEmailRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SendResetPasswordEmailResponse(arg) {
  if (!(arg instanceof mailer_pb.SendResetPasswordEmailResponse)) {
    throw new Error('Expected argument of type SendResetPasswordEmailResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SendResetPasswordEmailResponse(buffer_arg) {
  return mailer_pb.SendResetPasswordEmailResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SendVerificationEmailRequest(arg) {
  if (!(arg instanceof mailer_pb.SendVerificationEmailRequest)) {
    throw new Error('Expected argument of type SendVerificationEmailRequest');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SendVerificationEmailRequest(buffer_arg) {
  return mailer_pb.SendVerificationEmailRequest.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SendVerificationEmailResponse(arg) {
  if (!(arg instanceof mailer_pb.SendVerificationEmailResponse)) {
    throw new Error('Expected argument of type SendVerificationEmailResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SendVerificationEmailResponse(buffer_arg) {
  return mailer_pb.SendVerificationEmailResponse.deserializeBinary(new Uint8Array(buffer_arg));
}


var MailerServiceService = exports.MailerServiceService = {
  sendVerificationEmail: {
    path: '/MailerService/SendVerificationEmail',
    requestStream: false,
    responseStream: false,
    requestType: mailer_pb.SendVerificationEmailRequest,
    responseType: mailer_pb.SendVerificationEmailResponse,
    requestSerialize: serialize_SendVerificationEmailRequest,
    requestDeserialize: deserialize_SendVerificationEmailRequest,
    responseSerialize: serialize_SendVerificationEmailResponse,
    responseDeserialize: deserialize_SendVerificationEmailResponse,
  },
  sendResetPasswordEmail: {
    path: '/MailerService/SendResetPasswordEmail',
    requestStream: false,
    responseStream: false,
    requestType: mailer_pb.SendResetPasswordEmailRequest,
    responseType: mailer_pb.SendResetPasswordEmailResponse,
    requestSerialize: serialize_SendResetPasswordEmailRequest,
    requestDeserialize: deserialize_SendResetPasswordEmailRequest,
    responseSerialize: serialize_SendResetPasswordEmailResponse,
    responseDeserialize: deserialize_SendResetPasswordEmailResponse,
  },
};

exports.MailerServiceClient = grpc.makeGenericClientConstructor(MailerServiceService);

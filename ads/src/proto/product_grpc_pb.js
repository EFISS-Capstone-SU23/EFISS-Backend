// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('@grpc/grpc-js');
var product_pb = require('./product_pb.js');

function serialize_ProductIds(arg) {
  if (!(arg instanceof product_pb.ProductIds)) {
    throw new Error('Expected argument of type ProductIds');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_ProductIds(buffer_arg) {
  return product_pb.ProductIds.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_Products(arg) {
  if (!(arg instanceof product_pb.Products)) {
    throw new Error('Expected argument of type Products');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_Products(buffer_arg) {
  return product_pb.Products.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SearchByImageOptions(arg) {
  if (!(arg instanceof product_pb.SearchByImageOptions)) {
    throw new Error('Expected argument of type SearchByImageOptions');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SearchByImageOptions(buffer_arg) {
  return product_pb.SearchByImageOptions.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_SearchResults(arg) {
  if (!(arg instanceof product_pb.SearchResults)) {
    throw new Error('Expected argument of type SearchResults');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_SearchResults(buffer_arg) {
  return product_pb.SearchResults.deserializeBinary(new Uint8Array(buffer_arg));
}


var ProductServiceService = exports.ProductServiceService = {
  searchByImage: {
    path: '/ProductService/SearchByImage',
    requestStream: false,
    responseStream: false,
    requestType: product_pb.SearchByImageOptions,
    responseType: product_pb.SearchResults,
    requestSerialize: serialize_SearchByImageOptions,
    requestDeserialize: deserialize_SearchByImageOptions,
    responseSerialize: serialize_SearchResults,
    responseDeserialize: deserialize_SearchResults,
  },
  getProductsByIds: {
    path: '/ProductService/GetProductsByIds',
    requestStream: false,
    responseStream: false,
    requestType: product_pb.ProductIds,
    responseType: product_pb.Products,
    requestSerialize: serialize_ProductIds,
    requestDeserialize: deserialize_ProductIds,
    responseSerialize: serialize_Products,
    responseDeserialize: deserialize_Products,
  },
};

exports.ProductServiceClient = grpc.makeGenericClientConstructor(ProductServiceService);

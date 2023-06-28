// package: 
// file: product.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as product_pb from "./product_pb";

interface IProductServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    searchByImage: IProductServiceService_ISearchByImage;
    getProductsByIds: IProductServiceService_IGetProductsByIds;
}

interface IProductServiceService_ISearchByImage extends grpc.MethodDefinition<product_pb.SearchByImageOptions, product_pb.SearchResults> {
    path: "/ProductService/SearchByImage";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<product_pb.SearchByImageOptions>;
    requestDeserialize: grpc.deserialize<product_pb.SearchByImageOptions>;
    responseSerialize: grpc.serialize<product_pb.SearchResults>;
    responseDeserialize: grpc.deserialize<product_pb.SearchResults>;
}
interface IProductServiceService_IGetProductsByIds extends grpc.MethodDefinition<product_pb.ProductIds, product_pb.Products> {
    path: "/ProductService/GetProductsByIds";
    requestStream: false;
    responseStream: false;
    requestSerialize: grpc.serialize<product_pb.ProductIds>;
    requestDeserialize: grpc.deserialize<product_pb.ProductIds>;
    responseSerialize: grpc.serialize<product_pb.Products>;
    responseDeserialize: grpc.deserialize<product_pb.Products>;
}

export const ProductServiceService: IProductServiceService;

export interface IProductServiceServer extends grpc.UntypedServiceImplementation {
    searchByImage: grpc.handleUnaryCall<product_pb.SearchByImageOptions, product_pb.SearchResults>;
    getProductsByIds: grpc.handleUnaryCall<product_pb.ProductIds, product_pb.Products>;
}

export interface IProductServiceClient {
    searchByImage(request: product_pb.SearchByImageOptions, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    searchByImage(request: product_pb.SearchByImageOptions, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    searchByImage(request: product_pb.SearchByImageOptions, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    getProductsByIds(request: product_pb.ProductIds, callback: (error: grpc.ServiceError | null, response: product_pb.Products) => void): grpc.ClientUnaryCall;
    getProductsByIds(request: product_pb.ProductIds, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_pb.Products) => void): grpc.ClientUnaryCall;
    getProductsByIds(request: product_pb.ProductIds, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_pb.Products) => void): grpc.ClientUnaryCall;
}

export class ProductServiceClient extends grpc.Client implements IProductServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public searchByImage(request: product_pb.SearchByImageOptions, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    public searchByImage(request: product_pb.SearchByImageOptions, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    public searchByImage(request: product_pb.SearchByImageOptions, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    public getProductsByIds(request: product_pb.ProductIds, callback: (error: grpc.ServiceError | null, response: product_pb.Products) => void): grpc.ClientUnaryCall;
    public getProductsByIds(request: product_pb.ProductIds, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_pb.Products) => void): grpc.ClientUnaryCall;
    public getProductsByIds(request: product_pb.ProductIds, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_pb.Products) => void): grpc.ClientUnaryCall;
}

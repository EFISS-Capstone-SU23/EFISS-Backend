// package: 
// file: product.proto

/* tslint:disable */
/* eslint-disable */

import * as grpc from "@grpc/grpc-js";
import * as product_pb from "./product_pb";

interface IProductServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
    searchByImage: IProductServiceService_ISearchByImage;
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

export const ProductServiceService: IProductServiceService;

export interface IProductServiceServer extends grpc.UntypedServiceImplementation {
    searchByImage: grpc.handleUnaryCall<product_pb.SearchByImageOptions, product_pb.SearchResults>;
}

export interface IProductServiceClient {
    searchByImage(request: product_pb.SearchByImageOptions, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    searchByImage(request: product_pb.SearchByImageOptions, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    searchByImage(request: product_pb.SearchByImageOptions, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
}

export class ProductServiceClient extends grpc.Client implements IProductServiceClient {
    constructor(address: string, credentials: grpc.ChannelCredentials, options?: Partial<grpc.ClientOptions>);
    public searchByImage(request: product_pb.SearchByImageOptions, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    public searchByImage(request: product_pb.SearchByImageOptions, metadata: grpc.Metadata, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
    public searchByImage(request: product_pb.SearchByImageOptions, metadata: grpc.Metadata, options: Partial<grpc.CallOptions>, callback: (error: grpc.ServiceError | null, response: product_pb.SearchResults) => void): grpc.ClientUnaryCall;
}

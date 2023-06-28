// package: 
// file: product.proto

/* tslint:disable */
/* eslint-disable */

import * as jspb from "google-protobuf";

export class SearchByImageOptions extends jspb.Message { 
    clearImageurlsList(): void;
    getImageurlsList(): Array<string>;
    setImageurlsList(value: Array<string>): SearchByImageOptions;
    addImageurls(value: string, index?: number): string;
    getLimit(): number;
    setLimit(value: number): SearchByImageOptions;
    clearCategoriesList(): void;
    getCategoriesList(): Array<string>;
    setCategoriesList(value: Array<string>): SearchByImageOptions;
    addCategories(value: string, index?: number): string;

    hasOrderby(): boolean;
    clearOrderby(): void;
    getOrderby(): SearchOrderBy | undefined;
    setOrderby(value: SearchOrderBy): SearchByImageOptions;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchByImageOptions.AsObject;
    static toObject(includeInstance: boolean, msg: SearchByImageOptions): SearchByImageOptions.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchByImageOptions, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchByImageOptions;
    static deserializeBinaryFromReader(message: SearchByImageOptions, reader: jspb.BinaryReader): SearchByImageOptions;
}

export namespace SearchByImageOptions {
    export type AsObject = {
        imageurlsList: Array<string>,
        limit: number,
        categoriesList: Array<string>,
        orderby?: SearchOrderBy,
    }
}

export class SearchResults extends jspb.Message { 
    clearProductsList(): void;
    getProductsList(): Array<Product>;
    setProductsList(value: Array<Product>): SearchResults;
    addProducts(value?: Product, index?: number): Product;
    clearRemainingproductidsList(): void;
    getRemainingproductidsList(): Array<string>;
    setRemainingproductidsList(value: Array<string>): SearchResults;
    addRemainingproductids(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): SearchResults.AsObject;
    static toObject(includeInstance: boolean, msg: SearchResults): SearchResults.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: SearchResults, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): SearchResults;
    static deserializeBinaryFromReader(message: SearchResults, reader: jspb.BinaryReader): SearchResults;
}

export namespace SearchResults {
    export type AsObject = {
        productsList: Array<Product.AsObject>,
        remainingproductidsList: Array<string>,
    }
}

export class Product extends jspb.Message { 
    getId(): string;
    setId(value: string): Product;
    getTitle(): string;
    setTitle(value: string): Product;
    getUrl(): string;
    setUrl(value: string): Product;
    getPrice(): number;
    setPrice(value: number): Product;
    getDescription(): string;
    setDescription(value: string): Product;
    clearImagesList(): void;
    getImagesList(): Array<string>;
    setImagesList(value: Array<string>): Product;
    addImages(value: string, index?: number): string;
    getGroup(): string;
    setGroup(value: string): Product;
    clearCategoriesList(): void;
    getCategoriesList(): Array<string>;
    setCategoriesList(value: Array<string>): Product;
    addCategories(value: string, index?: number): string;

    serializeBinary(): Uint8Array;
    toObject(includeInstance?: boolean): Product.AsObject;
    static toObject(includeInstance: boolean, msg: Product): Product.AsObject;
    static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
    static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
    static serializeBinaryToWriter(message: Product, writer: jspb.BinaryWriter): void;
    static deserializeBinary(bytes: Uint8Array): Product;
    static deserializeBinaryFromReader(message: Product, reader: jspb.BinaryReader): Product;
}

export namespace Product {
    export type AsObject = {
        id: string,
        title: string,
        url: string,
        price: number,
        description: string,
        imagesList: Array<string>,
        group: string,
        categoriesList: Array<string>,
    }
}

export enum SearchOrderBy {
    RELEVANCE = 0,
    PRICE_ASC = 1,
    PRICE_DESC = 2,
}

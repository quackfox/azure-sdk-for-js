/*
 * Copyright (c) Microsoft Corporation.
 * Licensed under the MIT License.
 *
 * Code generated by Microsoft (R) AutoRest Code Generator.
 * Changes may cause incorrect behavior and will be lost if the code is regenerated.
 */

import { PagedAsyncIterableIterator } from "@azure/core-paging";
import { DeletedWebApps } from "../operationsInterfaces";
import * as coreClient from "@azure/core-client";
import * as Mappers from "../models/mappers";
import * as Parameters from "../models/parameters";
import { WebSiteManagementClient } from "../webSiteManagementClient";
import {
  DeletedSite,
  DeletedWebAppsListNextOptionalParams,
  DeletedWebAppsListOptionalParams,
  DeletedWebAppsListByLocationNextOptionalParams,
  DeletedWebAppsListByLocationOptionalParams,
  DeletedWebAppsListResponse,
  DeletedWebAppsListByLocationResponse,
  DeletedWebAppsGetDeletedWebAppByLocationOptionalParams,
  DeletedWebAppsGetDeletedWebAppByLocationResponse,
  DeletedWebAppsListNextResponse,
  DeletedWebAppsListByLocationNextResponse
} from "../models";

/// <reference lib="esnext.asynciterable" />
/** Class containing DeletedWebApps operations. */
export class DeletedWebAppsImpl implements DeletedWebApps {
  private readonly client: WebSiteManagementClient;

  /**
   * Initialize a new instance of the class DeletedWebApps class.
   * @param client Reference to the service client
   */
  constructor(client: WebSiteManagementClient) {
    this.client = client;
  }

  /**
   * Description for Get all deleted apps for a subscription.
   * @param options The options parameters.
   */
  public list(
    options?: DeletedWebAppsListOptionalParams
  ): PagedAsyncIterableIterator<DeletedSite> {
    const iter = this.listPagingAll(options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listPagingPage(options);
      }
    };
  }

  private async *listPagingPage(
    options?: DeletedWebAppsListOptionalParams
  ): AsyncIterableIterator<DeletedSite[]> {
    let result = await this._list(options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listNext(continuationToken, options);
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listPagingAll(
    options?: DeletedWebAppsListOptionalParams
  ): AsyncIterableIterator<DeletedSite> {
    for await (const page of this.listPagingPage(options)) {
      yield* page;
    }
  }

  /**
   * Description for Get all deleted apps for a subscription at location
   * @param location
   * @param options The options parameters.
   */
  public listByLocation(
    location: string,
    options?: DeletedWebAppsListByLocationOptionalParams
  ): PagedAsyncIterableIterator<DeletedSite> {
    const iter = this.listByLocationPagingAll(location, options);
    return {
      next() {
        return iter.next();
      },
      [Symbol.asyncIterator]() {
        return this;
      },
      byPage: () => {
        return this.listByLocationPagingPage(location, options);
      }
    };
  }

  private async *listByLocationPagingPage(
    location: string,
    options?: DeletedWebAppsListByLocationOptionalParams
  ): AsyncIterableIterator<DeletedSite[]> {
    let result = await this._listByLocation(location, options);
    yield result.value || [];
    let continuationToken = result.nextLink;
    while (continuationToken) {
      result = await this._listByLocationNext(
        location,
        continuationToken,
        options
      );
      continuationToken = result.nextLink;
      yield result.value || [];
    }
  }

  private async *listByLocationPagingAll(
    location: string,
    options?: DeletedWebAppsListByLocationOptionalParams
  ): AsyncIterableIterator<DeletedSite> {
    for await (const page of this.listByLocationPagingPage(location, options)) {
      yield* page;
    }
  }

  /**
   * Description for Get all deleted apps for a subscription.
   * @param options The options parameters.
   */
  private _list(
    options?: DeletedWebAppsListOptionalParams
  ): Promise<DeletedWebAppsListResponse> {
    return this.client.sendOperationRequest({ options }, listOperationSpec);
  }

  /**
   * Description for Get all deleted apps for a subscription at location
   * @param location
   * @param options The options parameters.
   */
  private _listByLocation(
    location: string,
    options?: DeletedWebAppsListByLocationOptionalParams
  ): Promise<DeletedWebAppsListByLocationResponse> {
    return this.client.sendOperationRequest(
      { location, options },
      listByLocationOperationSpec
    );
  }

  /**
   * Description for Get deleted app for a subscription at location.
   * @param location
   * @param deletedSiteId The numeric ID of the deleted app, e.g. 12345
   * @param options The options parameters.
   */
  getDeletedWebAppByLocation(
    location: string,
    deletedSiteId: string,
    options?: DeletedWebAppsGetDeletedWebAppByLocationOptionalParams
  ): Promise<DeletedWebAppsGetDeletedWebAppByLocationResponse> {
    return this.client.sendOperationRequest(
      { location, deletedSiteId, options },
      getDeletedWebAppByLocationOperationSpec
    );
  }

  /**
   * ListNext
   * @param nextLink The nextLink from the previous successful call to the List method.
   * @param options The options parameters.
   */
  private _listNext(
    nextLink: string,
    options?: DeletedWebAppsListNextOptionalParams
  ): Promise<DeletedWebAppsListNextResponse> {
    return this.client.sendOperationRequest(
      { nextLink, options },
      listNextOperationSpec
    );
  }

  /**
   * ListByLocationNext
   * @param location
   * @param nextLink The nextLink from the previous successful call to the ListByLocation method.
   * @param options The options parameters.
   */
  private _listByLocationNext(
    location: string,
    nextLink: string,
    options?: DeletedWebAppsListByLocationNextOptionalParams
  ): Promise<DeletedWebAppsListByLocationNextResponse> {
    return this.client.sendOperationRequest(
      { location, nextLink, options },
      listByLocationNextOperationSpec
    );
  }
}
// Operation Specifications
const serializer = coreClient.createSerializer(Mappers, /* isXml */ false);

const listOperationSpec: coreClient.OperationSpec = {
  path: "/subscriptions/{subscriptionId}/providers/Microsoft.Web/deletedSites",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedWebAppCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [Parameters.$host, Parameters.subscriptionId],
  headerParameters: [Parameters.accept],
  serializer
};
const listByLocationOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/deletedSites",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedWebAppCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const getDeletedWebAppByLocationOperationSpec: coreClient.OperationSpec = {
  path:
    "/subscriptions/{subscriptionId}/providers/Microsoft.Web/locations/{location}/deletedSites/{deletedSiteId}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedSite
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.location,
    Parameters.deletedSiteId
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedWebAppCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink
  ],
  headerParameters: [Parameters.accept],
  serializer
};
const listByLocationNextOperationSpec: coreClient.OperationSpec = {
  path: "{nextLink}",
  httpMethod: "GET",
  responses: {
    200: {
      bodyMapper: Mappers.DeletedWebAppCollection
    },
    default: {
      bodyMapper: Mappers.DefaultErrorResponse
    }
  },
  queryParameters: [Parameters.apiVersion],
  urlParameters: [
    Parameters.$host,
    Parameters.subscriptionId,
    Parameters.nextLink,
    Parameters.location
  ],
  headerParameters: [Parameters.accept],
  serializer
};

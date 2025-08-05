import qs from 'qs';
import {
  ZohoEntities,
  type APIFlavour,
  type Request,
  type ZohoConfig,
  type ZohoResponse,
} from '../types';
import type { XiorError, XiorInstance, XiorRequestConfig } from 'xior';
import xior from 'xior';

export class ZohoApiError extends Error {
  url?: string;
  code?: number;

  constructor(err: XiorError<{ code: number; message: string }>) {
    super(err.response?.data.message ?? err.message);
    this.url = (err.config?.baseURL ?? '') + (err.config?.url ?? '');
    this.code = err.response?.data.code;
    Object.setPrototypeOf(this, ZohoApiError.prototype);
  }
}

export class ZohoApiClient {
  private httpClientInventory: XiorInstance;

  private httpClientBooks: XiorInstance;

  private httpClientInvoice: XiorInstance;

  private config: ZohoConfig;
  private accessToken: string = '';
  private tokenExpiresAt: number = 0;
  private refreshPromise: Promise<string> | null = null;

  private baseURL: {
    inventory: string;
    books: string;
    invoice: string;
  };

  constructor(config: ZohoConfig) {
    this.config = config;
    this.baseURL = {
      inventory: `https://www.zohoapis${this.config.dc}/inventory/v1`,
      books: `https://www.zohoapis${this.config.dc}/books/v3`,
      invoice: `https://www.zohoapis${this.config.dc}/invoice/v3`,
    };

    this.httpClientInventory = this.createHttpClient(this.baseURL.inventory);
    this.httpClientBooks = this.createHttpClient(this.baseURL.books);
    this.httpClientInvoice = this.createHttpClient(this.baseURL.invoice);
  }

  private createHttpClient(baseURL: string): XiorInstance {
    const client = xior.create({
      baseURL,
      params: {
        organization_id: this.config.orgId,
      },
      timeout: 30_000,
      paramsSerializer: (params) => qs.stringify(params, { encode: false }),
    });

    client.interceptors.request.use(async (requestConfig) => {
      const token = await this.getAccessToken();
      if (!requestConfig.headers) {
        requestConfig.headers = {};
      }
      if (!requestConfig.params)
        requestConfig.params = {
          organization_id: this.config.orgId,
        };
      requestConfig.headers.Authorization = `Zoho-oauthtoken ${token}`;
      return requestConfig;
    });

    return client;
  }

  private async getAccessToken(): Promise<string> {
    // Check if token is still valid (with 5min buffer)
    const bufferMs = 5 * 60 * 1000;
    if (this.accessToken && Date.now() < this.tokenExpiresAt - bufferMs) {
      return this.accessToken;
    }

    // Prevent multiple concurrent refresh requests
    if (this.refreshPromise) {
      return this.refreshPromise;
    }

    this.refreshPromise = this.refreshAccessToken();
    try {
      return await this.refreshPromise;
    } finally {
      this.refreshPromise = null;
    }
  }

  private async refreshAccessToken(): Promise<string> {
    const params = new URLSearchParams({
      refresh_token: this.config.refreshToken,
      client_id: this.config.client.id,
      client_secret: this.config.client.secret,
      grant_type: 'refresh_token',
    });

    try {
      const response = await xior.post(
        `https://accounts.zoho${this.config.dc}/oauth/v2/token`,
        params,
        {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          timeout: 30000,
        }
      );

      const { access_token, expires_in } = response.data;
      this.accessToken = access_token;
      this.tokenExpiresAt = Date.now() + expires_in * 1000;

      return access_token;
    } catch (error: any) {
      throw new Error(
        `Failed to refresh token: ${error.response?.data?.error_description || error.message}`
      );
    }
  }

  private async request<TResponse>(
    method: 'GET' | 'POST' | 'PUT' | 'DELETE',
    req: Request
  ): Promise<ZohoResponse<TResponse>> {
    const axiosRequest: XiorRequestConfig = {
      method,
      url: `/${req.path.join('/')}`,
      headers: req.headers ?? {},
      params: req.params,
    };
    if (req.baseUrl) {
      axiosRequest.baseURL = req.baseUrl;
    }
    if (req.timeout) {
      axiosRequest.timeout = req.timeout;
    }

    if (req.body) {
      if (typeof req.body === 'string') {
        axiosRequest.data = req.body;
      } else {
        axiosRequest.data = req.body;
        if (!axiosRequest.headers) axiosRequest.headers = {};
        axiosRequest.headers['Content-Type'] = 'application/json;charset=UTF-8';
      }
    }

    const selectApiClient = (apiType: APIFlavour) => {
      switch (apiType) {
        case 'books':
          return this.httpClientBooks;
        case 'inventory':
          return this.httpClientInventory;
        case 'invoice':
          return this.httpClientInvoice;
        default:
          return this.httpClientInventory;
      }
    };

    // Selection, if this request should use the Zoho Books, Inventory or Invoice API. Can be overwritten by every request
    const res = await selectApiClient(
      req.overwriteApiType || this.config.apiFlavour
    )
      .request<ZohoResponse<TResponse>>(axiosRequest)
      .catch((err) => {
        throw new ZohoApiError(err);
      });

    if (res.data.code === undefined) {
      /**
       * The response object looks different for bulk update requests.
       * We check here, if this is a bulk response object
       */
      const bulkResponse = Object.keys(res.data).find((x) =>
        Object.values(ZohoEntities).includes(x as unknown as ZohoEntities)
      );

      if (bulkResponse) {
        res.data[bulkResponse as ZohoEntities]?.map((x) => {
          if (x.code !== 0)
            throw new Error(`Zoho response error [${x.code}]: ${x.message}`);
        });
      } else {
        throw new Error(
          `Zoho returned not valid response object: ${JSON.stringify(res.data)}`
        );
      }
    } else {
      if (res.data.code !== 0) {
        console.error(
          `Zoho response error [${res.data.code}]: ${res.data.message}`
        );
      }
    }

    return res.data;
  }

  public async get<TResponse>(req: Request): Promise<ZohoResponse<TResponse>> {
    return this.request<TResponse>('GET', req);
  }

  public async post<TResponse>(req: Request): Promise<ZohoResponse<TResponse>> {
    return this.request<TResponse>('POST', req);
  }

  public async put<TResponse>(req: Request): Promise<ZohoResponse<TResponse>> {
    return this.request<TResponse>('PUT', req);
  }

  public async delete<TResponse>(
    req: Request
  ): Promise<ZohoResponse<TResponse>> {
    return this.request<TResponse>('DELETE', req);
  }
}

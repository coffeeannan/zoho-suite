export type {
  Address,
  AddressWithoutAddressId,
  CreateAddress,
} from './address';
export type {
  ContactPerson,
  ContactPersonShortList,
  ContactPersonFromContactGet,
  CreateContactPerson,
  ContactPersonWithoutContact,
} from './contact-person';
export type { Document } from './document';
export type { LineItem } from './line-item';
export type {
  Package,
  ListPackage,
  CreatePackage,
  CreateShipment,
  PackageLineItem,
  ShipmentOrder,
  CreatePackageLineItems,
  PackageShortList,
  QuickCreateInput,
  QuickCreateInputItem,
} from './package';
export type { Invoice } from './invoice';
export type { Tax } from './tax';
export type {
  SalesOrder,
  CreateSalesOrder,
  UpdateSalesOrder,
  ListSalesOrder,
  PaymentOverview,
  SalesOrderInvoicedStatus,
  SalesOrderPaidStatus,
  SalesOrderShippedStatus,
  SalesOrderStatus,
} from './salesorder';
export type { CustomField } from './custom-field';
export type {
  Contact,
  CreateContact,
  UpdateContact,
  GetContact,
} from './contact';
export type {
  Item,
  FullCompositeItem,
  ListItem,
  CreateItem,
  CreateItemGroup,
  GetItem,
  ItemGroup,
  PackageDetails,
  WarehouseStock,
  MappedProduct,
} from './item';
export type {
  Payment,
  CreatePayment,
  ListPayment,
  PaymentInvoice,
} from './payment';
export type { ListBankaccount, Bankaccount } from './bankaccount';

export type DataCenter =
  | '.com'
  | '.eu'
  | '.in'
  | '.com.au'
  | '.jp'
  | '.ca'
  | '.com.cn'
  | '.sa';

export type APIFlavour = 'inventory' | 'books' | 'invoice';

export interface ZohoConfig {
  orgId: string;
  refreshToken: string;
  dc: DataCenter;
  apiFlavour: APIFlavour;
  client: {
    id: string;
    secret: string;
  };
}

export type Request = {
  path: string[];
  /**
   * Url Paramters
   */
  params?: Record<string, string | number | boolean>;
  /**
   * Request body will be serialized to json
   */
  body?: unknown;

  headers?: Record<string, string | number | boolean>;

  /**
   * Retry the request a number of times while backing off exponentially
   */
  retry?: number;

  /**
   * in milliseconds
   * @default 7000
   */
  timeout?: number;

  /**
   * Override the base Url for this request
   */
  baseUrl?: string;

  /**
   * Should we use Zoho Books or Zoho Inventory API. Defaults to "inventory"
   */
  overwriteApiType?: APIFlavour;
};

/**
 * Enum definition of the different entities,
 * that Zoho offers.
 */
export enum ZohoEntities {
  SALESORDERS = 'salesorders',
  INVOICES = 'invoices',
  CONTACTS = 'contacts',
  ITEMS = 'items',
  PURCHASEORDERS = 'purchaseorders',
}

export type ZohoResponse<TResponse> = TResponse & {
  /**
   * Zoho Inventory error code. This will be zero for a success response and non-zero in case of an error.
   */
  code: number;
  /**
   * Message for the invoked API.
   */
  message: string;

  page_context?: {
    page: number;
    per_page: number;
    has_more_page: boolean;
  };
} & {
  [key in ZohoEntities]?: {
    code: number;
    message: string;
  }[];
};

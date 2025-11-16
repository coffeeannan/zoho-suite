import type { AddressWithoutAddressId } from './address';
import type { Document } from './document';
import type { LineItem } from './line-item';
import type { PackageShortList } from './package';
import type { Invoice } from './invoice';
import type { CustomField } from './custom-field';
import type { ContactPersonShortList } from './contact-person';

export interface UpdateSalesOrder
  extends Omit<CreateSalesOrder, 'documents' | 'template_id'> {
  salesorder_id: string;
}

export interface PaymentOverview {
  payment_id: string;
  payment_mode: string;
  payment_mode_id: string;
  amount: number;
  date: string;
  offline_created_date_with_time: string;
  description: string;
  reference_number: string;
  account_id: string;
  account_name: string;
  payment_type: string;
}

export interface CreateSalesOrder
  extends Pick<SalesOrder, 'salesorder_number' | 'customer_id'>,
    Partial<
      Pick<
        SalesOrder,
        | 'adjustment_description'
        | 'adjustment'
        | 'contact_persons'
        | 'date'
        | 'delivery_method'
        | 'discount_type'
        | 'discount'
        | 'documents'
        | 'exchange_rate'
        | 'gst_no'
        | 'gst_treatment'
        | 'is_discount_before_tax'
        | 'notes'
        | 'place_of_supply'
        | 'pricebook_id'
        | 'reference_number'
        | 'salesorder_id'
        | 'salesperson_name'
        | 'shipment_date'
        | 'shipping_charge_tax_id'
        | 'shipping_charge'
        | 'template_id'
        | 'terms'
      >
    > {
  line_items: (Pick<LineItem, 'item_id' | 'quantity'> & Partial<LineItem>)[];
  custom_fields?: CustomField[];
  is_inclusive_tax?: boolean;
  exchange_rate?: number;
  billing_address_id?: string;
  shipping_address_id?: string;
}

export type SalesOrderStatus =
  | 'draft'
  | 'void'
  | 'onhold'
  | 'confirmed'
  | 'closed';
export type SalesOrderShippedStatus =
  | 'shipped'
  | 'partially_shipped'
  | 'fulfilled'
  | 'pending'
  | '';
export type SalesOrderInvoicedStatus =
  | 'invoiced'
  | 'not_invoiced'
  | 'partially_invoiced'
  | '';
export type SalesOrderPaidStatus = 'paid' | 'not_paid' | 'partially_paid' | '';

export interface SalesOrder {
  salesorder_id: string;
  payments: PaymentOverview[];
  ignore_auto_number_generation?: boolean;
  salesorder_number: string;
  date: string;
  status: string;
  shipment_date: string;
  reference_number: string;
  customer_id: string;
  customer_name: string;
  company_name?: string;
  is_inclusive_tax: boolean;
  contact_persons: string[];
  contact_person_details: ContactPersonShortList[];
  currency_id: string;
  currency_code: string;
  currency_symbol: string;
  exchange_rate: number;
  discount_amount?: number;
  discount: string | number;
  is_discount_before_tax: boolean;
  discount_type: 'entity_level' | 'item_level';
  estimate_id?: string;
  delivery_method?: string;
  delivery_method_id?: string;
  line_items: LineItem[];
  shipping_charge: number;
  adjustment: number;
  adjustment_description: string;
  sub_total: number;
  tax_total: number;
  total: number;
  taxes: {
    tax_amount: number;
    tax_name: string;
  }[];
  price_precision: number;
  pricebook_id?: number;
  is_emailed: boolean;
  refund_status: '' | 'refunded';
  packages: (PackageShortList & { quantity: number })[];
  invoices: Pick<
    Invoice,
    | 'invoice_id'
    | 'invoice_number'
    | 'reference_number'
    | 'status'
    | 'date'
    | 'due_date'
    | 'total'
    | 'balance'
  >[];
  shipping_address: AddressWithoutAddressId;
  billing_address_id?: string;
  shipping_address_id?: string;
  billing_address: AddressWithoutAddressId;
  notes: string;
  terms: string;
  template_id: string;
  template_name: string;
  template_type: string;
  created_time: string;
  last_modified_time: string;
  attachment_name: string;
  can_send_in_mail: boolean;
  salesperson_id: string;
  salesperson_name: string;
  documents: Document[];
  is_pre_gst?: boolean;
  gst_no?: string;
  gst_treatment?: 'business_gst' | 'business_none' | 'overseas' | 'consumer';
  place_of_supply?: string;
  shipping_charge_tax_id: string;
  shipping_charge_tax_percentage: number | '';
  invoiced_status: SalesOrderInvoicedStatus;
  paid_status: SalesOrderPaidStatus;
  shipped_status: SalesOrderShippedStatus;
  order_status: SalesOrderStatus;
  custom_fields: CustomField[];
  [key: string]: unknown;
}

export interface ListSalesOrder
  extends Pick<
    SalesOrder,
    | 'salesorder_id'
    | 'customer_name'
    | 'customer_id'
    | 'salesorder_number'
    | 'reference_number'
    | 'date'
    | 'shipment_date'
    | 'currency_code'
    | 'total'
    | 'created_time'
    | 'last_modified_time'
    | 'is_emailed'
    | 'order_status'
    | 'invoiced_status'
    | 'paid_status'
    | 'shipped_status'
    | 'status'
  > {
  email: string;
}

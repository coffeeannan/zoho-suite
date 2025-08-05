import type { AddressWithoutAddressId } from './address';
import type { ContactPerson } from './contact-person';
import type { CustomField } from './custom-field';
import type { LineItem } from './line-item';

export interface Invoice {
  invoice_id: string;
  invoice_number: string;
  is_inclusive_tax: boolean;
  status: string;
  date: string;
  due_date: string;
  reference_number: string;
  total: number;
  customer_id: string;
  salesperson_id: number;
  salesperson_name: string;
  contact_persons: string[] | [];
  contact_persons_details: ContactPerson[];
  customer_name: string;
  company_name: string;
  email?: string;
  currency_code: string;
  billing_address?: AddressWithoutAddressId;
  shipping_address?: AddressWithoutAddressId;
  country?: string;
  balance: number;
  discount_amount: number;
  discount: string;
  is_discount_before_tax: boolean;
  discount_type: 'entity_level' | 'item_level';
  notes: string;
  pricebook_id: number;
  shipping_charge_tax_id: string;
  shipping_charge_tax_percentage: number;
  shipping_charge: number;
  created_time: string;
  last_modified_time: string;
}

export interface CreateInvoice
  extends Pick<Invoice, 'customer_id'>,
    Partial<
      Pick<
        Invoice,
        | 'contact_persons'
        | 'date'
        | 'discount_type'
        | 'discount'
        | 'is_discount_before_tax'
        | 'notes'
        | 'pricebook_id'
        | 'reference_number'
        | 'salesperson_name'
        | 'shipping_charge_tax_id'
        | 'shipping_charge'
      >
    > {
  line_items: (Pick<LineItem, 'item_id' | 'quantity'> & Partial<LineItem>)[];
  customer_id: string;
  custom_fields?: CustomField[];
  invoice_number?: string;
  reference_number?: string;
  is_inclusive_tax?: boolean;
  exchange_rate?: number;
  billing_address_id?: string;
  shipping_address_id?: string;
}

export interface ListInvoice
  extends Pick<
      Invoice,
      | 'invoice_id'
      | 'customer_name'
      | 'customer_id'
      | 'company_name'
      | 'status'
      | 'invoice_number'
      | 'reference_number'
      | 'date'
      | 'due_date'
      | 'email'
      | 'currency_code'
      | 'billing_address'
      | 'shipping_address'
      | 'country'
      | 'created_time'
      | 'last_modified_time'
      | 'total'
    >,
    CustomFieldsDirectAPIResponse {}

interface CustomFieldsDirectAPIResponse {
  [key: string]: unknown;
}

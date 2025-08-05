import type { CustomField } from './custom-field';

export interface QuickCreateInputItem {
  salesorder_id: string;
  tracking_number: string;
  carrier: string;
}
export type QuickCreateInput = QuickCreateInputItem[];

export interface PackageLineItem {
  line_item_id: string;
  so_line_item_id: string;
  item_id: string;
  picklist_item_id: string;
  picklist_number: string;
  sku: string;
  name: string;
  description: string;
  item_order: number;
  quantity: number;
  unit: string;
  image_name: string;
  image_type: string;
  image_document_id: string;
  is_invoiced: true;
  item_custom_fields: [];
  batches: [];
  track_batch_for_package: false;
  warehouse_id: string;
  warehouse_name: string;
}

export interface ShipmentOrder {
  date: string;
  shipment_id: string;
  aftership_carrier_code: 'dhl' | 'dpd' | 'ups' | 'hermes';
  shipment_number: string;
  shipment_date: string;
  shipment_date_with_time: string;
  tracking_number: string;
  tracking_link: string;
  delivery_date: string;
  delivery_date_with_time: string;
  delivery_method: string;
  shipment_type: string;
  associated_packages_count: number;
  carrier: string;
  service: string;
  delivery_days: string;
  delivery_guarantee: false;
  tracking_url: string;
  is_carrier_shipment: boolean;
  notes: string;
  created_time: string;
  last_modified_time: string;
}

export interface Package {
  package_id: string;
  package_number: string;
  customer_id: string;
  customer_name: string;
  quantity: string | number;
  total_quantity: number;
  created_time: string;
  is_carrier_shipment: boolean;
  shipment_type: string;
  status: 'not_shipped' | 'shipped' | 'delivered';
  detailed_status: string;
  status_message: string;
  shipment_id: string;
  shipment_number: string;
  shipment_status: string;
  carrier: string;
  delivery_method: string;
  line_items: PackageLineItem[];
  service: string;
  tracking_number: string;
  is_tracking_enabled: boolean;
  date: string;
  shipment_date: string;
  shipment_order?: ShipmentOrder;
  delivery_days: string;
  delivery_guarantee: boolean;
  last_modified_time: string;
  salesorder_id: string;
  salesorder_number: string;
  notes: string;
  custom_fields?: CustomField[];
}

export type ListPackage = Pick<
  Package,
  | 'package_id'
  | 'salesorder_id'
  | 'shipment_id'
  | 'customer_id'
  | 'customer_name'
  | 'status'
  | 'package_number'
  | 'tracking_number'
  | 'is_tracking_enabled'
  | 'shipment_type'
  | 'date'
  | 'quantity'
  | 'salesorder_number'
  | 'created_time'
  | 'delivery_method'
  | 'last_modified_time'
  | 'shipment_date'
  | 'is_carrier_shipment'
>;

export type PackageShortList = Pick<
  Package,
  | 'package_id'
  | 'package_number'
  | 'date'
  | 'status'
  | 'detailed_status'
  | 'status_message'
  | 'shipment_id'
  | 'shipment_number'
  | 'shipment_status'
  | 'carrier'
  | 'service'
  | 'tracking_number'
  | 'shipment_date'
  | 'delivery_days'
  | 'delivery_guarantee'
  | 'delivery_method'
  | 'quantity'
  | 'is_tracking_enabled'
  | 'shipment_order'
>;

export type CreatePackageLineItems = Pick<
  PackageLineItem,
  'so_line_item_id' | 'quantity'
>[];

export interface CreatePackage
  extends Pick<Package, 'date'>,
    Partial<Pick<Package, 'package_number' | 'notes'>> {
  line_items: CreatePackageLineItems;
}

export type CreatePackageRes = Package;

export interface CreateShipment
  extends Pick<ShipmentOrder, 'date' | 'delivery_method' | 'tracking_number'>,
    Partial<
      Pick<ShipmentOrder, 'tracking_link' | 'notes' | 'aftership_carrier_code'>
    > {}

export type CreateShipmentRes = ShipmentOrder;

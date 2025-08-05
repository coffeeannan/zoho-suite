export interface WarehouseStock {
  warehouse_id: string;
  warehouse_name: string;
  status: 'active' | 'inactive';
  is_primary: boolean;
  warehouse_stock_on_hand: number;
  initial_stock: number;
  initial_stock_rate: number;
  warehouse_available_stock: number;
  warehouse_actual_available_stock: number;
  warehouse_committed_stock: number;
  warehouse_actual_committed_stock: number;
  warehouse_available_for_sale_stock: number;
  warehouse_actual_available_for_sale_stock: number;
  batches: [];
  is_fba_warehouse: false;
  sales_channels: [];
}

export interface PackageDetails {
  dimension_unit: 'cm';
  height: string;
  length: string;
  weight: number;
  weight_unit: 'kg' | 'g' | 'lb' | 'oz';
  width: string;
}

export interface Item {
  group_id?: string;
  group_name?: string;
  unit: string;
  item_type: string;
  product_type: string;
  is_taxable: boolean;
  tax_id: string;
  description: string;
  is_combo_product: boolean;
  tax_name: string;
  tax_percentage: number;
  brand: string;
  manufacturer: string;
  tax_type: string;
  purchase_account_id: number;
  purchase_account_name: string;
  account_id: number;
  account_name: string;
  inventory_account_id: number;
  attribute_id1: number;
  attribute_name1: string;
  status: 'active' | 'inactive';
  source: string;
  item_id: string;
  item_name: string;
  name: string;
  rate: number;
  pricebook_rate: number;
  purchase_rate: number;
  reorder_level: number;
  initial_stock: number;
  initial_stock_rate: number;
  available_stock: number;
  actual_available_stock: number;
  vendor_id: number;
  vendor_name: string;
  stock_on_hand?: number;
  sku: string;
  upc: number;
  ean: number;
  isbn: string;
  part_number: string;
  attribute_option_id1: number;
  attribute_option_name1: number;
  image_id: number;
  image_name: string;
  purchase_description: string;
  package_details: PackageDetails;
  image_type: string;
  created_time: string;
  last_modified_time: string;
  is_returnable: boolean;
  warehouses?: WarehouseStock[];
}

interface CustomFieldsDirectAPIResponse {
  [key: string]: unknown;
}

export interface MappedProduct {
  mapped_item_id: string;
  item_id: string;
  item_order: number;
  name: string;
  rate: number;
  rate_formatted: '€0,00';
  purchase_rate: 0.42;
  purchase_rate_formatted: '€0,42';
  sku: string;
  status: 1;
  image_name: '';
  image_document_id: '';
  purchase_description: string;
  image_type: '';
  unit: string;
  product_type: 'goods';
  is_combo_product: false;
  description: '';
  quantity: number;
  stock_on_hand: number;
  stock_on_hand_formatted: '0,00';
  available_stock: number;
  available_stock_formatted: '0,00';
  actual_available_stock: number;
  actual_available_stock_formatted: '0,00';
}

export interface GetItem extends Item {}

export interface CreateItem extends Pick<Item, 'name'>, Item {}

export interface ListItem
  extends Pick<
      Item,
      | 'account_id'
      | 'actual_available_stock'
      | 'available_stock'
      | 'brand'
      | 'ean'
      | 'is_combo_product'
      | 'is_returnable'
      | 'isbn'
      | 'item_id'
      | 'item_name'
      | 'item_type'
      | 'last_modified_time'
      | 'created_time'
      | 'name'
      | 'manufacturer'
      | 'product_type'
      | 'purchase_account_id'
      | 'purchase_rate'
      | 'rate'
      | 'sku'
      | 'stock_on_hand'
      | 'tax_id'
      | 'tax_percentage'
      | 'unit'
      | 'status'
    >,
    Partial<Pick<Item, 'group_name'>>,
    PackageDetails,
    CustomFieldsDirectAPIResponse {}

export interface ItemGroup {
  group_id: string;
  group_name: string;
  brand: string;
  manufacturer: string;
  unit: 'box' | 'kg' | 'Stück' | 'pcs' | 'Set' | 'pauschal' | string;
  description: string;
  tax_id: string;
  items: Item[];
  attribute_name1: string;
  attribute_name2: string;
  attribute_name3: string;
}

export interface FullCompositeItem
  extends Omit<
    Item,
    'group_id' | 'group_name' | 'is_combo_product' | 'item_id'
  > {
  is_combo_product: true;
  mapped_items: MappedProduct[];
  composite_component_items: MappedProduct[];
  composite_service_items: MappedProduct[];
  composite_item_id: string;
}

interface CreateItemGroupItem
  extends Required<Pick<Item, 'name' | 'rate' | 'purchase_rate'>>,
    Partial<Pick<Item, 'sku' | 'upc' | 'ean'>> {}

export interface CreateItemGroup
  extends Pick<ItemGroup, 'group_name' | 'unit'>,
    Partial<
      Pick<
        ItemGroup,
        | 'brand'
        | 'manufacturer'
        | 'description'
        | 'tax_id'
        | 'attribute_name1'
        | 'attribute_name2'
        | 'attribute_name3'
      >
    > {
  items: CreateItemGroupItem[];
}

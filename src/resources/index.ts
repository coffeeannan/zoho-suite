import { ZohoApiClient } from '../client';
import { BankAccountResource } from './bankaccout';
import type { ZohoConfig } from '../types';
import { ItemResource } from './item';
import { ContactPersonResource } from './contactperson';
import { ContactResource } from './contact';
import { InvoiceResource } from './invoice';
import { OrganizationResource } from './organizations';
import { PackageResource } from './package';
import { PaymentResource } from './payment';
import { SalesOrderResource } from './salesorder';
import { TaxResource } from './tax';
import { WarehouseResource } from './warehouse';

export class ZohoSuite {
  private readonly client: ZohoApiClient;
  public readonly bankaccount: BankAccountResource;
  public readonly item: ItemResource;
  public readonly contactperson: ContactPersonResource;
  public readonly contact: ContactResource;
  public readonly invoice: InvoiceResource;
  public readonly organization: OrganizationResource;
  public readonly package: PackageResource;
  public readonly payment: PaymentResource;
  public readonly salesorder: SalesOrderResource;
  public readonly tax: TaxResource;
  public readonly warehouse: WarehouseResource;

  constructor(config: ZohoConfig) {
    this.client = new ZohoApiClient(config);
    this.bankaccount = new BankAccountResource(this.client);
    this.item = new ItemResource(this.client);
    this.contactperson = new ContactPersonResource(this.client);
    this.contact = new ContactResource(this.client);
    this.invoice = new InvoiceResource(this.client);
    this.organization = new OrganizationResource(this.client);
    this.package = new PackageResource(this.client);
    this.payment = new PaymentResource(this.client);
    this.salesorder = new SalesOrderResource(this.client);
    this.tax = new TaxResource(this.client);
    this.warehouse = new WarehouseResource(this.client);
  }
}

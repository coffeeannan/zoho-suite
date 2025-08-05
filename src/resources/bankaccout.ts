import type { ListBankaccount } from '../types';
import { ZohoApiClient } from '../client';

export class BankAccountResource {
  private client: ZohoApiClient;

  constructor(client: ZohoApiClient) {
    this.client = client;
  }

  public async list() {
    const res = await this.client.get<{ bankaccounts: ListBankaccount[] }>({
      path: ['bankaccounts'],
      overwriteApiType: 'books',
    });
    return res.bankaccounts;
  }
}

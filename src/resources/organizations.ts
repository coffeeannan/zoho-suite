import { ZohoApiClient } from '../client';
import type { Organization } from '../types/organization';

export class OrganizationResource {
  private client: ZohoApiClient;

  constructor(client: ZohoApiClient) {
    this.client = client;
  }

  public async list() {
    const res = await this.client.get<{ organizations: Organization[] }>({
      path: ['organizations'],
    });

    return res.organizations;
  }
}

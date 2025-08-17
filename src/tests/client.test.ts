import { test, expect } from 'bun:test';
import { ZohoApiClient, ZohoApiError } from '../client';

const orgId = Bun.env.ZOHO_ORGANIZATION_ID!;
const clientId = Bun.env.ZOHO_CLIENT_ID as string;
const clientSecret = Bun.env.ZOHO_CLIENT_SECRET as string;
const refreshToken = Bun.env.ZOHO_REFRESH_TOKEN as string;

test('instantiates ZohoApiClient and retrieves sales orders successfully', async () => {
  const client = new ZohoApiClient({
    orgId,
    refreshToken,
    dc: '.eu',
    apiFlavour: 'inventory',
    client: {
      id: clientId,
      secret: clientSecret,
    },
  });
  const response = await client.get({
    path: ['salesorders'],
  });
  expect(response).toBeDefined();
  expect(response.salesorders).toBeDefined();
  expect(Array.isArray(response.salesorders)).toBe(true);
});

test('returns ZohoApiError when organisation ID is invalid', () => {
  const client = new ZohoApiClient({
    orgId: 'invalid-org-id',
    refreshToken,
    dc: '.eu',
    apiFlavour: 'inventory',
    client: {
      id: clientId,
      secret: clientSecret,
    },
  });

  return client
    .get({ path: ['salesorders'] })
    .then(() => {
      throw new Error('Expected request to fail, but it succeeded');
    })
    .catch((err) => {
      expect(err).toBeInstanceOf(ZohoApiError);
    });
});

# @smoasters/zoho-suite

> **Warning**  
> This repository is no longer maintained.  
> The package has been deprecated in favour of **zapi-inventory**.  
> Please use the new repo at [zapi-inventory](https://github.com/matagaralph/zapi-inventory.git).
> 
ZohoSuite is a supercharged community-maintained Node API SDK that allows you to interact with Zoho Finance Suite APIs (Zoho Books, Zoho Inventory, Zoho Invoice).

## Installation:

```shell
$ bun add -D @smoasters/zoho-suite
```

## API

This module exports a constructor function which takes an options object.

### `ZohoSuite(options)`

Creates a new `ZohoSuite` instance.

#### Example

```ts
import { ZohoSuite } from '@smoasters/zoho-suite';

const zoho = new ZohoSuite({
  orgId: process.env.ZOHO_ORGANIZATION_ID,
  refreshToken: process.env.ZOHO_REFRESH_TOKEN,
  dc: '.eu',
  apiFlavour: 'inventory', // books, invoice
  client: {
    id: process.env.ZOHO_CLIENT_ID,
    secret: process.env.ZOHO_CLIENT_SECRET,
  },
});
```

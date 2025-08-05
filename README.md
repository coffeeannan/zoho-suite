# @smoasters/zoho-suite

Zoho Finance Suite API bindings for Node.

## Installation:

```shell
$ npm install --save @smoasters/zoho-suite
```

## API

This module exports a constructor function which takes an options object.

### `ZohoSuite(options)`

Creates a new `ZohoSuite` instance.

#### Example

```js
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

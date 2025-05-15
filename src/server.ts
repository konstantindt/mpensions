import {createServer} from 'node:http2';
import {parse as parseQuery} from 'node:querystring';
import Joi from 'joi';
import {isJoiError} from './utils.js';
import {listPensionsParameterSchema} from './modules/pension/pension.joi.js';
import {listPensions} from './modules/pension/pension.service.js';

const server = createServer();

server.on('stream', async (stream, headers) => {
  const url = new URL(headers[':path']!, 'http://localhost:3000');
  const parameters = parseQuery(url.search.slice(1));
  const method = headers[':method'];

  try {
    if (url.pathname === '/pensions' && method === 'GET') {
      Joi.assert(parameters, listPensionsParameterSchema);

      const response = await listPensions(parameters);

      stream.respond({':status': 200, 'content-type': 'application/json'}); // eslint-disable-line @typescript-eslint/naming-convention
      stream.end(JSON.stringify(response));
    } else {
      stream.respond({':status': 404}); // eslint-disable-line @typescript-eslint/naming-convention
      stream.end('Not found');
    }
  } catch (error) {
    if (isJoiError(error)) {
      stream.respond({':status': 400, 'content-type': 'application/json'}); // eslint-disable-line @typescript-eslint/naming-convention
      stream.end(JSON.stringify(error.details));
    } else {
      stream.respond({':status': 500}); // eslint-disable-line @typescript-eslint/naming-convention
      stream.end('Internal server error');
    }
  }
});

export default server.listen(3000);

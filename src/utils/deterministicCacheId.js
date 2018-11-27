import base64 from 'base-64';
import stringify from 'json-stable-stringify';

export const generateDeterministicCacheId = args => base64.encode(stringify(args));
export const decodeDeterministicCacheId = cacheId => JSON.parse(base64.decode(cacheId));

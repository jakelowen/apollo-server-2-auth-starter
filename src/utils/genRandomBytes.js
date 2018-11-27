import { promisify } from 'util';
import { randomBytes } from 'crypto';


export default async (length) => {
  const randomBytesPromiseified = promisify(randomBytes);
  return (await randomBytesPromiseified(length)).toString('hex');
};

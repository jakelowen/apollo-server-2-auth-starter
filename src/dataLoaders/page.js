import DataLoader from 'dataloader';
import { map } from 'lodash';
import db from '../db';
import redisDb from '../redis';
import filterQuery from '../utils/filterQuery';
import paginator from '../utils/paginator';
import { decodeDeterministicCacheId } from '../utils/deterministicCacheId';
// import { mapTo } from '../utils/dataLoaderMapping';

const loadSinglePage = async (key) => {
  // attempt to load key from redis
  const cachedDataRaw = await redisDb.get(key);
  let data;
  if (cachedDataRaw) {
    data = JSON.parse(cachedDataRaw);
    data.pageInfo.fromCache = true;
  } else {
    // if not present, continue below to load from db
    const fetchPayload = decodeDeterministicCacheId(key);
    // now use example of voter search filter, pagination etc.
    let query = db.table(fetchPayload.table.name);
    query = filterQuery(query, fetchPayload.where);

    data = await paginator(
      db,
      query,
      fetchPayload.orderBy,
      fetchPayload.limit,
      fetchPayload.after,
      fetchPayload.table.uniqueColumn,
    );
    // after db load, store in redis. fetchPayload would need TTL value
    if (fetchPayload.ttl) {
      await redisDb.set(key, JSON.stringify(data), 'EX', fetchPayload.ttl);
    }
    data.pageInfo.fromCache = false;
  }
  return data;
};

const batchLoadPages = keys => Promise.resolve(map(keys, key => loadSinglePage(key)));

export default () => ({
  pageLoader: new DataLoader(keys => batchLoadPages(keys)),
});

import { isAdminResolver } from '../utils/functionalResolvers';
import { generateDeterministicCacheId } from '../utils/deterministicCacheId';

const users = isAdminResolver.createResolver(
  async (root, {
    where, orderBy, limit, after,
  }, { dataLoaders }) => {
    const results = await dataLoaders.page.pageLoader.load(
      generateDeterministicCacheId({
        table: {
          name: 'users',
          uniqueColumn: 'id',
        },
        where: Object.assign({}, where),
        orderBy,
        limit,
        after,
        ttl: 1000,
      }),
    );
    return results;
  },
);


export default {
  Query: {
    users,
  },
};

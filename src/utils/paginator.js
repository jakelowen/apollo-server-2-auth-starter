import base64 from 'base-64';
import { map } from 'lodash';

const paginator = async (db, query, orderBy = [], limit = 25, after, uniqueColumn) => {
  // treat original query as subquery (includes filters)
  const paginationQuery = db.select().from(query.clone().as('filters'));

  if (after) {
    const decodedCursor = JSON.parse(base64.decode(after));
    // override orderBY
    // eslint-disable-next-line prefer-destructuring, no-param-reassign
    orderBy = decodedCursor.orderBy;
    // let rawCompositeColumns
    const keys = map(orderBy, 'sort');
    const whereRawValues = decodedCursor.values.map(value => `'${value}'`).join(',');
    const whereRawComposite = `(${keys.join()}) >= (${whereRawValues})`;
    paginationQuery.whereRaw(whereRawComposite);
  } else {
    // if cursor is present below is automatically done.
    // also apply unique column orderBy
    orderBy.push({ sort: uniqueColumn, direction: 'ASC' });
  }

  // honor request orderBy args
  if (orderBy) {
    map(orderBy, (ordering) => {
      paginationQuery.orderBy(ordering.sort, ordering.direction);
    });
  }

  // apply item count limit
  if (limit) {
    paginationQuery.limit(limit + 1);
  }

  // eslint-disable-next-line prefer-const
  let [items, [countResults]] = await Promise.all([paginationQuery, query.count()]);

  // encode cursor if necessary
  let encodedCursor;
  if (items.length > limit) {
    const values = map(orderBy, ordering => items[limit][ordering.sort]);
    // add uniqueColumn to values
    values.push(items[limit][uniqueColumn]);
    orderBy.push({ sort: uniqueColumn, direction: 'ASC' });
    const cursorPayload = {
      orderBy,
      values,
    };
    // we have a next page - make a cursor
    encodedCursor = base64.encode(JSON.stringify(cursorPayload));
    items = items.slice(0, limit);
  }

  return {
    items,
    pageInfo: {
      nextCursor: encodedCursor,
      totalCount: countResults.count,
    },
  };
};

export default paginator;

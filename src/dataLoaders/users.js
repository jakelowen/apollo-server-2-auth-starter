import DataLoader from 'dataloader';
import db from '../db';
import { mapTo, mapToMany } from '../utils/dataLoaderMapping';

export default () => ({
  byId: new DataLoader(ids => db.table('users')
    .whereIn('id', ids)
    .then(mapTo(ids, x => x.id))),
  byEmail: new DataLoader(emails => db.table('users')
    .whereIn('email', emails)
    .then(mapTo(emails, x => x.email))),
  rolesbyUserId: new DataLoader(ids => db.table('permission')
    .whereIn('user_id', ids)
    .then(mapToMany(ids, x => x.user_id))),
});

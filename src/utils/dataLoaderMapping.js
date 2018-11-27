export function mapTo(keys, keyFn) {
  return (rows) => {
    const group = new Map(keys.map(key => [key, null]));
    rows.forEach(row => group.set(keyFn(row), row));
    return Array.from(group.values());
  };
}

export function mapToMany(keys, keyFn) {
  return (rows) => {
    const group = new Map(keys.map(key => [key, []]));
    rows.forEach(row => (group.get(keyFn(row)) || []).push(row));
    return Array.from(group.values());
  };
}

export function mapToValues(keys, keyFn, valueFn) {
  return (rows) => {
    const group = new Map(keys.map(key => [key, null]));
    rows.forEach(row => group.set(keyFn(row), valueFn(row)));
    return Array.from(group.values());
  };
}

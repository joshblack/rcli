if (typeof Promise === 'undefined') {
  require.ensure([], (require) => {
    require('imports?this=>window!es6-promise');
  });
}

if (typeof fetch === 'undefined') {
  require.ensure([], (require) => {
    require('imports?self=>window!whatwg-fetch');
  });
}


var nx = require('@feizheng/next-js-core2');
var NxNodeFetch = require('../src/next-node-fetch');

NxNodeFetch.get('https://api.github.com/users/afeiship').then((res) => {
  expect(typeof res).toBe('object');
  expect(res.login).toBe('afeiship');
  // console.log(res);
  done();
});

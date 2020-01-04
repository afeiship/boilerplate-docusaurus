/*!
 * name: @feizheng/next-node-fetch
 * description: A wrapper for `node-fetch`.
 * url: https://github.com/afeiship/next-node-fetch
 * version: 1.0.5
 * date: 2020-01-04 17:49:16
 * license: MIT
 */

(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDataTransform = require('@feizheng/next-data-transform');
  var nxContentType = require('@feizheng/next-content-type');
  var nxDeepAssign = require('@feizheng/next-deep-assign');
  var nxParam = require('@feizheng/next-param');
  var fetch = require('node-fetch');

  var NxNodeFetch = nx.declare('nx.NodeFetch', {
    statics: {
      config: { dataType: 'json', responseType: 'json' },
      request: function(inUrl, inMethod, inData, inOptions) {
        var options = nx.mix(null, this.config, inOptions);
        var isGET = inMethod === 'get';
        var body = isGET ? null : NxDataTransform[options.dataType](inData);
        var url = isGET ? inUrl + '?' + nxParam(inData) : inUrl;
        var headers = { 'Content-Type': nxContentType(options.dataType) };
        var config = nxDeepAssign({ method: inMethod, body: body, headers: headers }, options);
        var responseHandler = function(res) {
          return options.responseType ? res[options.responseType]() : res;
        };
        return fetch(url, config).then(responseHandler);
      },
      'get,delete,head,post,put,patch': function(inMethod) {
        return function(inUrl, inData, inOptions) {
          return this.request(inUrl, inMethod, inData, inOptions);
        };
      }
    }
  });

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = NxNodeFetch;
  }
})();

//# sourceMappingURL=next-node-fetch.js.map

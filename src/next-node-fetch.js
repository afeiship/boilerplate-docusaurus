(function() {
  var global = global || this || window || Function('return this')();
  var nx = global.nx || require('@feizheng/next-js-core2');
  var NxDataTransform = require('@feizheng/next-data-transform');
  var nxContentType = require('@feizheng/next-content-type');
  var nxDeepAssign = require('@feizheng/next-deep-assign');
  var nxParam = require('@feizheng/next-param');
  var fetch = require('node-fetch');
  var DEFAULT_OPTIONS = { dataType: 'json', responseType: 'json' };

  var NxNodeFetch = nx.declare('nx.NodeFetch', {
    statics: {
      request: function(inUrl, inMethod, inData, inOptions) {
        var options = nx.mix(null, DEFAULT_OPTIONS, inOptions);
        var isGET = inMethod === 'get';
        var body = isGET ? null : NxDataTransform[options.dataType](inData);
        var url = isGET ? inUrl + '?' + nxParam(inData) : inUrl;
        var headers = { 'Content-Type': nxContentType(options.dataType) };
        var config = nxDeepAssign({ method: inMethod, body: body, headers: headers }, options);
        var responseHandler = function(res) {
          return res[options.responseType]();
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

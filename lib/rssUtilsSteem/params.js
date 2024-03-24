'use strict';

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var frontEnds = ['hive', 'peakd', 'ulogs', 'steempeak', 'esteem', 'ecency', 'leofinance', 'hivelist', 'ctptalk', 'sportstalk', 'reggaejahm', 'splintertalk', 'weedcash', 'hivehustlers', 'naturalmedicine', 'dunksocial', 'wearealive', 'musicforlife', 'beatzchain', 'blocktunes'];

var getInterface = function getInterface(query) {
  if (query !== undefined && (0, _keys2.default)(query).length !== 0 && query['interface'] !== undefined && query['interface'] !== '') {
    if (frontEnds.includes(query['interface'])) {
      return query['interface'];
    }
  }
  return '';
};

var getLimit = function getLimit(query) {
  if (query !== undefined && (0, _keys2.default)(query).length !== 0 && query['limit'] !== undefined && query['limit'] !== '') {

    var limit = parseInt(query['limit']);

    if (!isNaN(limit)) {
      // clamp to range [0..50]
      limit = Math.max(limit, 0);
      limit = Math.min(limit, 50);
      return limit;
    }
  }
  return 10;
};

var getMinVote = function getMinVote(query) {
  if (query !== undefined && (0, _keys2.default)(query).length !== 0 && query['minVotePct'] !== undefined && query['minVotePct'] !== '') {

    var minVotePct = parseFloat(query['minVotePct']);

    if (!isNaN(minVotePct)) {
      // clamp to range [0..]
      minVotePct = Math.max(minVotePct, 0);
      return minVotePct;
    }
  }
  return 0;
};

var getTagFilter = function getTagFilter(query) {
  if (query !== undefined && (0, _keys2.default)(query).length !== 0 && query['tagFilter'] !== undefined && query['tagFilter'] !== '' && query['tagFilter'].length > 0 && query['tagFilter'].length < 100) {

    var tagFilter = query['tagFilter'].toLowerCase();

    return tagFilter;
  }
  return '';
};

var getRefer = function getRefer(query) {
  if (query != undefined && (0, _keys2.default)(query).length !== 0 && query['ref'] !== undefined && query['ref'] !== '' && query['ref'].length > 0 && query['ref'].length < 32) {

    var refer = query['ref'].toLowerCase();

    return refer;
  }
  return '';
};

module.exports = {
  getInterface: getInterface,
  getLimit: getLimit,
  getMinVote: getMinVote,
  getTagFilter: getTagFilter,
  getRefer: getRefer
};
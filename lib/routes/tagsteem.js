'use strict';

Object.defineProperty(exports, "__esModule", {
                                   value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _rssUtilsSteem = require('../rssUtilsSteem');

var _params = require('../rssUtilsSteem/params');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var router = new _koaRouter2.default({ prefix: '/steem' });

router.get('/:category', function () {
                                   var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
                                                                      return _regenerator2.default.wrap(function _callee$(_context) {
                                                                                                         while (1) {
                                                                                                                                            switch (_context.prev = _context.next) {
                                                                                                                                                                               case 0:
                                                                                                                                                                                                                  ctx.type = 'text/xml';
                                                                                                                                                                                                                  _context.next = 3;
                                                                                                                                                                                                                  return (0, _rssUtilsSteem.rssGeneratorTopic)(ctx.params.category, '', (0, _params.getInterface)(ctx.query), (0, _params.getLimit)(ctx.query), (0, _params.getTagFilter)(ctx.query), (0, _params.getRefer)(ctx.query));

                                                                                                                                                                               case 3:
                                                                                                                                                                                                                  ctx.body = _context.sent;

                                                                                                                                                                               case 4:
                                                                                                                                                                               case 'end':
                                                                                                                                                                                                                  return _context.stop();
                                                                                                                                            }
                                                                                                         }
                                                                      }, _callee, undefined);
                                   }));

                                   return function (_x, _x2) {
                                                                      return _ref.apply(this, arguments);
                                   };
}());

router.get('/:category/:tag', function () {
                                   var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
                                                                      return _regenerator2.default.wrap(function _callee2$(_context2) {
                                                                                                         while (1) {
                                                                                                                                            switch (_context2.prev = _context2.next) {
                                                                                                                                                                               case 0:
                                                                                                                                                                                                                  ctx.type = 'text/xml';
                                                                                                                                                                                                                  _context2.next = 3;
                                                                                                                                                                                                                  return (0, _rssUtilsSteem.rssGeneratorTopic)(ctx.params.category, ctx.params.tag, (0, _params.getInterface)(ctx.query), (0, _params.getLimit)(ctx.query), (0, _params.getTagFilter)(ctx.query), (0, _params.getRefer)(ctx.query));

                                                                                                                                                                               case 3:
                                                                                                                                                                                                                  ctx.body = _context2.sent;

                                                                                                                                                                               case 4:
                                                                                                                                                                               case 'end':
                                                                                                                                                                                                                  return _context2.stop();
                                                                                                                                            }
                                                                                                         }
                                                                      }, _callee2, undefined);
                                   }));

                                   return function (_x3, _x4) {
                                                                      return _ref2.apply(this, arguments);
                                   };
}());

exports.default = router;
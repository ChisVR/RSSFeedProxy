'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

require('babel-polyfill');

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _koaStatic = require('koa-static');

var _koaStatic2 = _interopRequireDefault(_koaStatic);

var _koaLogger = require('koa-logger');

var _koaLogger2 = _interopRequireDefault(_koaLogger);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _routes = require('./routes');

var _routes2 = _interopRequireDefault(_routes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = new _koa2.default();
var port = process.env.PORT || 4000;
var dist = _path2.default.join(__dirname, '..', 'dist');
var errorHandler = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
    var status, message;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            _context.next = 3;
            return next();

          case 3:
            _context.next = 12;
            break;

          case 5:
            _context.prev = 5;
            _context.t0 = _context['catch'](0);
            status = _context.t0.status;
            message = _context.t0.message;

            ctx.type = 'text/html';
            ctx.status = status || 500;
            ctx.body = message || 'Internal Server Error';

          case 12:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined, [[0, 5]]);
  }));

  return function errorHandler(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

app.use(errorHandler).use((0, _koaLogger2.default)()).use((0, _routes2.default)()).use((0, _koaStatic2.default)(dist));

app.listen(port, function () {
  return console.log('[!] Server is Running on ' + port);
});
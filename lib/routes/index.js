'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _koaCompose = require('koa-compose');

var _koaCompose2 = _interopRequireDefault(_koaCompose);

var _koaRouter = require('koa-router');

var _koaRouter2 = _interopRequireDefault(_koaRouter);

var _taghive = require('./taghive');

var _taghive2 = _interopRequireDefault(_taghive);

var _userhive = require('./userhive');

var _userhive2 = _interopRequireDefault(_userhive);

var _tagblurt = require('./tagblurt');

var _tagblurt2 = _interopRequireDefault(_tagblurt);

var _userblurt = require('./userblurt');

var _userblurt2 = _interopRequireDefault(_userblurt);

var _tagsteem = require('./tagsteem');

var _tagsteem2 = _interopRequireDefault(_tagsteem);

var _usersteem = require('./usersteem');

var _usersteem2 = _interopRequireDefault(_usersteem);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hive = require('@hiveio/hive-js');
var blurt = require('@blurtfoundation/blurtjs');
var steem = require('steem');
var fs = require('fs');
var showdown = require('showdown');
var markdownConverter = new showdown.Converter();

var homepageContent = '';
fs.readFile('README.md', 'utf8', function (err, data) {
    if (err) throw err;
    homepageContent = markdownConverter.makeHtml(data);
});

var iconData = '';
fs.readFile('favicon.ico', function (err, data) {
    if (err) throw err;
    iconData = data;
});

var logoData = '';
fs.readFile('hiverss2.png', function (err, data) {
    if (err) throw err;
    logoData = data;
});

var logoData2 = '';
fs.readFile('hive_logo.png', function (err, data) {
    if (err) throw err;
    logoData2 = data;
});

var router = new _koaRouter2.default();
router.get('/favicon.ico', function () {
    var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(ctx, next) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        ctx.type = 'image/x-icon';
                        ctx.body = iconData;

                    case 2:
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
router.get('/hiverss2.png', function () {
    var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2(ctx, next) {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
            while (1) {
                switch (_context2.prev = _context2.next) {
                    case 0:
                        ctx.type = 'image/png';
                        ctx.body = logoData;

                    case 2:
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
router.get('/hive_logo.png', function () {
    var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3(ctx, next) {
        return _regenerator2.default.wrap(function _callee3$(_context3) {
            while (1) {
                switch (_context3.prev = _context3.next) {
                    case 0:
                        ctx.type = 'image/png';
                        ctx.body = logoData2;

                    case 2:
                    case 'end':
                        return _context3.stop();
                }
            }
        }, _callee3, undefined);
    }));

    return function (_x5, _x6) {
        return _ref3.apply(this, arguments);
    };
}());
router.get('/', function () {
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(ctx, next) {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        ctx.type = 'text/html';
                        ctx.body = homepageContent;

                    case 2:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, undefined);
    }));

    return function (_x7, _x8) {
        return _ref4.apply(this, arguments);
    };
}());

hive.api.setOptions({ url: 'https://api.hive.blog' });
blurt.api.setOptions({ url: 'https://rpc.blurt.world' });
steem.api.setOptions({ url: 'https://api.steemit.com' });
var routes = [router, _userhive2.default, _taghive2.default, _userblurt2.default, _tagblurt2.default, _usersteem2.default, _tagsteem2.default];

exports.default = function () {
    var _ref5;

    return (0, _koaCompose2.default)((_ref5 = []).concat.apply(_ref5, (0, _toConsumableArray3.default)(routes.map(function (r) {
        return [r.routes(), r.allowedMethods()];
    }))));
};
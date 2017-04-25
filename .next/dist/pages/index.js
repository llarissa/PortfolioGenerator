'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = require('babel-runtime/core-js/object/get-prototype-of');

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _firebase = require('firebase');

var _firebase2 = _interopRequireDefault(_firebase);

require('isomorphic-fetch');

var _firebaseCredentials = require('../firebaseCredentials');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Index = function (_Component) {
  (0, _inherits3.default)(Index, _Component);

  (0, _createClass3.default)(Index, null, [{
    key: 'getInitialProps',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(_ref) {
        var req = _ref.req,
            query = _ref.query;
        var user, snap;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                user = req && req.session ? req.session.decodedToken : null;
                _context.next = 3;
                return req.firebaseServer.database().ref('messages').once('value');

              case 3:
                snap = _context.sent;
                return _context.abrupt('return', { user: user, messages: snap.val() });

              case 5:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getInitialProps(_x) {
        return _ref2.apply(this, arguments);
      }

      return getInitialProps;
    }()
  }]);

  function Index(props) {
    (0, _classCallCheck3.default)(this, Index);

    var _this = (0, _possibleConstructorReturn3.default)(this, (Index.__proto__ || (0, _getPrototypeOf2.default)(Index)).call(this, props));

    _this.state = {
      user: _this.props.user,
      value: '',
      messages: _this.props.messages
    };

    _this.addDbListener = _this.addDbListener.bind(_this);
    _this.handleChange = _this.handleChange.bind(_this);
    _this.handleSubmit = _this.handleSubmit.bind(_this);
    return _this;
  }

  (0, _createClass3.default)(Index, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var _this2 = this;

      _firebase2.default.initializeApp(_firebaseCredentials.clientCredentials);

      if (this.state.user) this.addDbListener();

      _firebase2.default.auth().onAuthStateChanged(function (user) {
        if (user) {
          _this2.setState({ user: user });
          return user.getToken().then(function (token) {
            // eslint-disable-next-line no-undef
            return fetch('/api/login', {
              method: 'POST',
              // eslint-disable-next-line no-undef
              headers: new Headers({ 'Content-Type': 'application/json' }),
              credentials: 'same-origin',
              body: (0, _stringify2.default)({ token: token })
            });
          }).then(function (res) {
            return _this2.addDbListener();
          });
        } else {
          _this2.setState({ user: null });
          // eslint-disable-next-line no-undef
          fetch('/api/logout', {
            method: 'POST',
            credentials: 'same-origin'
          }).then(function () {
            return _firebase2.default.database().ref('messages').off();
          });
        }
      });
    }
  }, {
    key: 'addDbListener',
    value: function addDbListener() {
      var _this3 = this;

      _firebase2.default.database().ref('messages').on('value', function (snap) {
        var messages = snap.val();
        if (messages) _this3.setState({ messages: messages });
      });
    }
  }, {
    key: 'handleChange',
    value: function handleChange(event) {
      this.setState({ value: event.target.value });
    }
  }, {
    key: 'handleSubmit',
    value: function handleSubmit(event) {
      event.preventDefault();
      var date = new Date().getTime();
      _firebase2.default.database().ref('messages/' + date).set({
        id: date,
        text: this.state.value
      });
      this.setState({ value: '' });
    }
  }, {
    key: 'handleLogin',
    value: function handleLogin() {
      _firebase2.default.auth().signInWithPopup(new _firebase2.default.auth.GoogleAuthProvider());
    }
  }, {
    key: 'handleLogout',
    value: function handleLogout() {
      _firebase2.default.auth().signOut();
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state,
          user = _state.user,
          value = _state.value,
          messages = _state.messages;

      return _react2.default.createElement('div', null, _react2.default.createElement('div', null, _react2.default.createElement('h1', null, 'Der Portfolio Generator mit React !!!')), user ? _react2.default.createElement('button', { onClick: this.handleLogout }, 'Logout') : _react2.default.createElement('button', { onClick: this.handleLogin }, 'Login'), user && _react2.default.createElement('div', null, _react2.default.createElement('form', { onSubmit: this.handleSubmit }, _react2.default.createElement('input', {
        type: 'text',
        onChange: this.handleChange,
        placeholder: 'add message',
        value: value
      })), _react2.default.createElement('ul', null, messages && (0, _keys2.default)(messages).map(function (key) {
        return _react2.default.createElement('li', { key: key }, messages[key].text);
      }))));
    }
  }]);

  return Index;
}(_react.Component);

exports.default = Index;
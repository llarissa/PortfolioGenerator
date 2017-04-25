
          window.__NEXT_REGISTER_PAGE('/', function() {
            var comp = module.exports =
webpackJsonp([5],{

/***/ 561:
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(__resourceQuery) {

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _keys = __webpack_require__(240);

var _keys2 = _interopRequireDefault(_keys);

var _stringify = __webpack_require__(562);

var _stringify2 = _interopRequireDefault(_stringify);

var _getPrototypeOf = __webpack_require__(45);

var _getPrototypeOf2 = _interopRequireDefault(_getPrototypeOf);

var _regenerator = __webpack_require__(64);

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = __webpack_require__(63);

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = __webpack_require__(18);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = __webpack_require__(47);

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _createClass2 = __webpack_require__(19);

var _createClass3 = _interopRequireDefault(_createClass2);

var _inherits2 = __webpack_require__(46);

var _inherits3 = _interopRequireDefault(_inherits2);

var _react = __webpack_require__(11);

var _react2 = _interopRequireDefault(_react);

var _firebase = __webpack_require__(566);

var _firebase2 = _interopRequireDefault(_firebase);

__webpack_require__(569);

var _firebaseCredentials = __webpack_require__(570);

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

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\Users\\Robert Kim\\Documents\\Webentwicklung\\Portfolio Generator\\pages\\index.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\Users\\Robert Kim\\Documents\\Webentwicklung\\Portfolio Generator\\pages\\index.js"); } } })();
    (function (Component, route) {
      if (false) return
      if (false) return

      var qs = __webpack_require__(83)
      var params = qs.parse(__resourceQuery.slice(1))
      if (params.entry == null) return

      module.hot.accept()
      Component.__route = route

      if (module.hot.status() === 'idle') return

      var components = next.router.components
      for (var r in components) {
        if (!components.hasOwnProperty(r)) continue

        if (components[r].Component.__route === route) {
          next.router.update(r, Component)
        }
      }
    })(module.exports.default || module.exports, "/")
  
/* WEBPACK VAR INJECTION */}.call(exports, "?entry"))

/***/ }),

/***/ 570:
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = {
  clientCredentials: {
    apiKey: "AIzaSyCQTXKB3RGrqlAb00y6uhmp212i_XmLqOs",
    authDomain: "with-firebase-23c22.firebaseapp.com",
    databaseURL: "https://with-firebase-23c22.firebaseio.com",
    projectId: "with-firebase-23c22",
    storageBucket: "with-firebase-23c22.appspot.com",
    messagingSenderId: "938878199931"

  },
  serverCredentials: {
    "type": "service_account",
    "project_id": "with-firebase-23c22",
    "private_key_id": "838a461f2c9cc234249b38f0790b144928e72e65",
    "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQC5QTky6aHA6Gl2\nahSIQ0R/H0M4pjY6/wS4PYgqMiQ4CzFJYWdOvN8DWm8mcdalhNFFKhkk5GcXSeR/\nUIHYsF6SIKcEEeTyqCkjCIpOh8fS2fkCAk8Wh+xFF/fbNSe28sp+2oexzb+I0cYx\nEd7Kk9lVP9RIzLDSQutwr0ZWpGEpwTbhlv+mrCyIM8I7nq2NrWFL+SwnD+j/4uNa\nWllWVux05pbK/LRmMSMwkzD9qi5Kn0MzkWcUKtV1XcIikMKg3fJzO2TB5PRzsMfB\nTdVCG2qdQEj3J5+/F6MXcWY0g19Yj0oHIISmkLSAUSe2ifs5Qnru8QNYALHC67dU\nOV1FLYphAgMBAAECggEBAIpGUcBbvH11vEpDkcHHm9fa6Nzeyzmr4cT3QKxmMryW\nNhqUlnyh4z/of3BNpi5zfZRHgO8VgJFUeTZCTDkGJACkWKVkCeTJebMJi9pj5NXQ\nFtnWCVxC5isIYdt/yH34qQaYbJJdhWpFUc6MjSPdyWmlM/mGtzCp/Hxmh3TiSxfT\nN8jBCL5uinPUm33tEXjARZ+PwXJY6mdLKEroyNHIbGjznMpc8rrd0R94O1DYO76e\nuLATotYORxQ8v1NFI58kE835/H2k7AW5H5wLs5GajDFPQjFHl/yZgjkkaqNcrNqm\nuf1I7uchKpaKW6/9NrsVwEhSdXsxM7w5k/uKenaEuqUCgYEA3uti6azaT0TXP2yh\no6O3S9OwbZbIcIAZC21dqjPqFt04E3R+HrXRsc8mSlmESRyxT8ioAwuqr4Z9CCPO\nh9QJ1wqEEOWRl7nZ5ufmIoUpqZ3vHYApIS+AFfQ+tRrZQjW0c3o8KtIMPy8rh462\ndGKoQ5EpfcH2WOGQeMKM6iuOwdsCgYEA1L74uf3yiWg64+UbXSrEaYIIK4QpfXhC\njDbltgt1vDrOI7mAHMSeKNLnUhjmuxVEej7fDip661p+Ab/kqm0Upnrce2EwGKxa\nLRvZ8cBUaK9qxiJAZDG6rFyMCBMUTXxDfyCKgPGkAvrtgH3xD1v3eQS0LNXg55Ye\nvZJLQs6D73MCgYEAmDv/7L0SyZelt7akHHCtuKb0kaKrd8jDUb56fMW/U6X3qbGg\nf7CDZ/6jk5rWcGeb33SU6J+LDRu3P1vUq4XuwmB4GGHur8NIQByWWXS/IwqsRWVE\nsVkTC+sk9+FCBalPdp0/ga64ll3MSGL5zzmg16PGxg80ATbpxs52FWVxtIkCgYAz\nEol5dQpljD0e+qBAFIVEYu/9KmQfd+BZ8s/gjQ29m0xjbSPhRB5H5KGdpta1MNzY\nkAFSUEZj+7xmRR/q/fbIJJSLlgBK3A1l6NrAW5Cn9PyoBg75Pqr2t9zyD0p/c4Zs\nnW5CmD/sazra7uEQ894MEmICpXGxhutoTRd+OT+ZGwKBgQC2FTzk+G5I65Qj7n49\nxVNcIt4tSVLEZaBl9sr1M1/xQMSQ2Zp965/QV+0PQtYZIqNYx6hvIjJXhvvzGa3O\nEH1pDYERf46lQ5S/OmkP4A1ir2zYsD86z3hMn6B+a6usdCX2n8sumW+xLv9thHGn\nncop23vf00JDuICvgDDYNRFJeA==\n-----END PRIVATE KEY-----\n",
    "client_email": "firebase-adminsdk-940x3@with-firebase-23c22.iam.gserviceaccount.com",
    "client_id": "115008312719417558412",
    "auth_uri": "https://accounts.google.com/o/oauth2/auth",
    "token_uri": "https://accounts.google.com/o/oauth2/token",
    "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
    "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-940x3%40with-firebase-23c22.iam.gserviceaccount.com"
  }
};

 ;(function register() { /* react-hot-loader/webpack */ if (true) { if (typeof __REACT_HOT_LOADER__ === 'undefined') { return; } if (typeof module.exports === 'function') { __REACT_HOT_LOADER__.register(module.exports, 'module.exports', "C:\\Users\\Robert Kim\\Documents\\Webentwicklung\\Portfolio Generator\\firebaseCredentials.js"); return; } for (var key in module.exports) { if (!Object.prototype.hasOwnProperty.call(module.exports, key)) { continue; } var namedExport = void 0; try { namedExport = module.exports[key]; } catch (err) { continue; } __REACT_HOT_LOADER__.register(namedExport, key, "C:\\Users\\Robert Kim\\Documents\\Webentwicklung\\Portfolio Generator\\firebaseCredentials.js"); } } })();

/***/ }),

/***/ 573:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(561);


/***/ })

},[573]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcz8yMTdhMDEzIiwid2VicGFjazovLy8uL2ZpcmViYXNlQ3JlZGVudGlhbHMuanM/ZDE4Y2VlMCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQWdCOzs7O0FBQ1Q7Ozs7QUFDUDs7QUFDUzs7OztJQUVZOzs7Ozs7O1lBQ1k7WUFBSzs7Ozs7bUJBQzVCO3VCQUFPLE9BQU8sSUFBSSxVQUFVLElBQUksUUFBUSxlQUFlOzt1QkFDMUMsSUFBSSxlQUFlLFdBQVcsSUFBSSxZQUFZLEtBQUs7O21CQUFoRTs7aURBQ0MsRUFBRSxNQUFGLE1BQVEsVUFBVSxLQUFLOzs7Ozs7Ozs7Ozs7Ozs7QUFHaEM7OztpQkFBYSxPQUFPO3dDQUFBOztvSUFFbEI7O1VBQUs7WUFDRyxNQUFLLE1BQ1g7YUFDQTtnQkFBVSxNQUFLLE1BR2pCO0FBTEU7O1VBS0csZ0JBQWdCLE1BQUssY0FBYyxLQUN4QztVQUFLLGVBQWUsTUFBSyxhQUFhLEtBQ3RDO1VBQUssZUFBZSxNQUFLLGFBQWEsS0FBdEM7V0FDRDs7Ozs7d0NBRW9CO21CQUNuQjs7eUJBRUE7O1VBQUksS0FBSyxNQUFNLE1BQU0sS0FFckI7O3lCQUFTLE9BQU8sbUJBQW1CLGdCQUNqQztZQUFJLE1BQ0Y7aUJBQUssU0FBUyxFQUFFLE1BQ2hCO3NCQUFZLFdBQ1QsS0FBSyxVQUFDLE9BQ0w7QUFDQTt5QkFBYTtzQkFFWDtBQUNBO3VCQUFTLElBQUksUUFBUSxFQUFFLGdCQUN2QjsyQkFDQTtvQkFBTSx5QkFBZSxFQUFFLE9BRTFCO0FBTkcsYUFESztBQUhKLGFBVUYsS0FBSyxVQUFDLEtBQUQ7bUJBQVMsT0FBSztBQUN6QjtBQWJELGVBY0U7aUJBQUssU0FBUyxFQUFFLE1BQ2hCO0FBQ0E7Z0JBQU07b0JBRUo7eUJBQWE7QUFEYixhQUVDLEtBQUs7bUJBQU0sbUJBQVMsV0FBVyxJQUFJLFlBQVk7QUFDbkQ7QUFDRjtBQUNGOzs7O29DQUVnQjttQkFDZjs7eUJBQVMsV0FBVyxJQUFJLFlBQVksR0FBRyxTQUFTLGdCQUM5QztZQUFNLFdBQVcsS0FDakI7WUFBSSxVQUFVLE9BQUssU0FBUyxFQUFFLFVBQy9CO0FBQ0Y7Ozs7aUNBRWEsT0FDWjtXQUFLLFNBQVMsRUFBRSxPQUFPLE1BQU0sT0FDOUI7Ozs7aUNBRWEsT0FDWjtZQUNBO1VBQU0sT0FBTyxJQUFJLE9BQ2pCO3lCQUFTLFdBQVcsa0JBQWdCLE1BQVE7WUFFMUM7Y0FBTSxLQUFLLE1BRWI7QUFIRTtXQUdHLFNBQVMsRUFBRSxPQUNqQjs7OztrQ0FHQzt5QkFBUyxPQUFPLGdCQUFnQixJQUFJLG1CQUFTLEtBQzlDOzs7O21DQUdDO3lCQUFTLE9BQ1Y7Ozs7NkJBRVM7bUJBQzBCLEtBQUs7VUFBL0I7VUFBTTtVQUFPLGtCQUVyQjs7NkJBQU8scUJBRUYsMkNBQ0ksZ0RBSUwsa0RBQ0UsMENBQVEsU0FBUyxLQUFLLGdCQUF0QixZQUNBLDBDQUFRLFNBQVMsS0FBSyxlQUd4QixrQ0FDQSxxQkFDRSw4Q0FBTSxVQUFVLEtBQ2Q7Y0FFRTtrQkFBVSxLQUNWO3FCQUNBO2VBR0o7QUFOSSxTQUhOLGtCQVNFLG9CQUVJLHNDQUNZLFVBQVUsSUFBSTtlQUFPLHNDQUFJLEtBQVcsZ0JBQVMsS0FBSztBQU16RSxPQU5XLEdBekJIOzs7OztBQWxGd0I7O2tCQUFkLE07Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQ0xyQixPQUFPOztZQUdIO2dCQUNBO2lCQUNBO2VBQ0E7bUJBQ0E7dUJBR0Y7O0FBUkU7O1lBVUY7a0JBQ0E7c0JBQ0E7bUJBQ0E7b0JBQ0E7aUJBQ0E7Z0JBQ0E7aUJBQ0E7bUNBQ0E7NEJBQXdCO0FBVHhCO0FBVkEsRSIsImZpbGUiOiJidW5kbGVzXFxwYWdlc1xcaW5kZXguanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QsIHsgQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCBmaXJlYmFzZSBmcm9tICdmaXJlYmFzZSdcclxuaW1wb3J0ICdpc29tb3JwaGljLWZldGNoJ1xyXG5pbXBvcnQgeyBjbGllbnRDcmVkZW50aWFscyB9IGZyb20gJy4uL2ZpcmViYXNlQ3JlZGVudGlhbHMnXHJcblxyXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBJbmRleCBleHRlbmRzIENvbXBvbmVudCB7XHJcbiAgc3RhdGljIGFzeW5jIGdldEluaXRpYWxQcm9wcyAoe3JlcSwgcXVlcnl9KSB7XHJcbiAgICBjb25zdCB1c2VyID0gcmVxICYmIHJlcS5zZXNzaW9uID8gcmVxLnNlc3Npb24uZGVjb2RlZFRva2VuIDogbnVsbFxyXG4gICAgY29uc3Qgc25hcCA9IGF3YWl0IHJlcS5maXJlYmFzZVNlcnZlci5kYXRhYmFzZSgpLnJlZignbWVzc2FnZXMnKS5vbmNlKCd2YWx1ZScpIC8vZGIgw6RuZGVydW5nIGhhbmRsZXJcclxuICAgIHJldHVybiB7IHVzZXIsIG1lc3NhZ2VzOiBzbmFwLnZhbCgpIH1cclxuICB9XHJcblxyXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xyXG4gICAgc3VwZXIocHJvcHMpXHJcbiAgICB0aGlzLnN0YXRlID0ge1xyXG4gICAgICB1c2VyOiB0aGlzLnByb3BzLnVzZXIsXHJcbiAgICAgIHZhbHVlOiAnJyxcclxuICAgICAgbWVzc2FnZXM6IHRoaXMucHJvcHMubWVzc2FnZXNcclxuICAgIH1cclxuXHJcbiAgICB0aGlzLmFkZERiTGlzdGVuZXIgPSB0aGlzLmFkZERiTGlzdGVuZXIuYmluZCh0aGlzKVxyXG4gICAgdGhpcy5oYW5kbGVDaGFuZ2UgPSB0aGlzLmhhbmRsZUNoYW5nZS5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmhhbmRsZVN1Ym1pdCA9IHRoaXMuaGFuZGxlU3VibWl0LmJpbmQodGhpcylcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZE1vdW50ICgpIHtcclxuICAgIGZpcmViYXNlLmluaXRpYWxpemVBcHAoY2xpZW50Q3JlZGVudGlhbHMpXHJcblxyXG4gICAgaWYgKHRoaXMuc3RhdGUudXNlcikgdGhpcy5hZGREYkxpc3RlbmVyKClcclxuXHJcbiAgICBmaXJlYmFzZS5hdXRoKCkub25BdXRoU3RhdGVDaGFuZ2VkKHVzZXIgPT4ge1xyXG4gICAgICBpZiAodXNlcikge1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB1c2VyOiB1c2VyIH0pXHJcbiAgICAgICAgcmV0dXJuIHVzZXIuZ2V0VG9rZW4oKVxyXG4gICAgICAgICAgLnRoZW4oKHRva2VuKSA9PiB7XHJcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxyXG4gICAgICAgICAgICByZXR1cm4gZmV0Y2goJy9hcGkvbG9naW4nLCB7XHJcbiAgICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXHJcbiAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXHJcbiAgICAgICAgICAgICAgaGVhZGVyczogbmV3IEhlYWRlcnMoeyAnQ29udGVudC1UeXBlJzogJ2FwcGxpY2F0aW9uL2pzb24nIH0pLFxyXG4gICAgICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nLFxyXG4gICAgICAgICAgICAgIGJvZHk6IEpTT04uc3RyaW5naWZ5KHsgdG9rZW4gfSlcclxuICAgICAgICAgICAgfSlcclxuICAgICAgICAgIH0pLnRoZW4oKHJlcykgPT4gdGhpcy5hZGREYkxpc3RlbmVyKCkpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVzZXI6IG51bGwgfSlcclxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuICAgICAgICBmZXRjaCgnL2FwaS9sb2dvdXQnLCB7XHJcbiAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgIGNyZWRlbnRpYWxzOiAnc2FtZS1vcmlnaW4nXHJcbiAgICAgICAgfSkudGhlbigoKSA9PiBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignbWVzc2FnZXMnKS5vZmYoKSlcclxuICAgICAgfVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGFkZERiTGlzdGVuZXIgKCkge1xyXG4gICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoJ21lc3NhZ2VzJykub24oJ3ZhbHVlJywgc25hcCA9PiB7XHJcbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gc25hcC52YWwoKVxyXG4gICAgICBpZiAobWVzc2FnZXMpIHRoaXMuc2V0U3RhdGUoeyBtZXNzYWdlcyB9KVxyXG4gICAgfSlcclxuICB9XHJcblxyXG4gIGhhbmRsZUNoYW5nZSAoZXZlbnQpIHtcclxuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogZXZlbnQudGFyZ2V0LnZhbHVlIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVTdWJtaXQgKGV2ZW50KSB7XHJcbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpXHJcbiAgICBjb25zdCBkYXRlID0gbmV3IERhdGUoKS5nZXRUaW1lKClcclxuICAgIGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKGBtZXNzYWdlcy8ke2RhdGV9YCkuc2V0KHtcclxuICAgICAgaWQ6IGRhdGUsXHJcbiAgICAgIHRleHQ6IHRoaXMuc3RhdGUudmFsdWVcclxuICAgIH0pXHJcbiAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6ICcnIH0pXHJcbiAgfVxyXG5cclxuICBoYW5kbGVMb2dpbiAoKSB7XHJcbiAgICBmaXJlYmFzZS5hdXRoKCkuc2lnbkluV2l0aFBvcHVwKG5ldyBmaXJlYmFzZS5hdXRoLkdvb2dsZUF1dGhQcm92aWRlcigpKVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlTG9nb3V0ICgpIHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduT3V0KClcclxuICB9XHJcblxyXG4gIHJlbmRlciAoKSB7XHJcbiAgICBjb25zdCB7IHVzZXIsIHZhbHVlLCBtZXNzYWdlcyB9ID0gdGhpcy5zdGF0ZVxyXG5cclxuICAgIHJldHVybiA8ZGl2PlxyXG4gICAgICB7ICAgICAgICBcclxuICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgIDxoMT5EZXIgUG9ydGZvbGlvIEdlbmVyYXRvciBtaXQgUmVhY3QgISEhPC9oMT5cclxuICAgICAgICAgPC9kaXY+ICAgICAgICAgXHJcbiAgICAgIH1cclxuICAgICAgeyAgICAgICAgXHJcbiAgICAgICAgdXNlciAgICAgICAgXHJcbiAgICAgICAgPyA8YnV0dG9uIG9uQ2xpY2s9e3RoaXMuaGFuZGxlTG9nb3V0fT5Mb2dvdXQ8L2J1dHRvbj5cclxuICAgICAgICA6IDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVMb2dpbn0+TG9naW48L2J1dHRvbj4gICAgICBcclxuICAgICAgfVxyXG4gICAgICB7XHJcbiAgICAgICAgdXNlciAmJlxyXG4gICAgICAgIDxkaXY+XHJcbiAgICAgICAgICA8Zm9ybSBvblN1Ym1pdD17dGhpcy5oYW5kbGVTdWJtaXR9PlxyXG4gICAgICAgICAgICA8aW5wdXRcclxuICAgICAgICAgICAgICB0eXBlPXsndGV4dCd9XHJcbiAgICAgICAgICAgICAgb25DaGFuZ2U9e3RoaXMuaGFuZGxlQ2hhbmdlfVxyXG4gICAgICAgICAgICAgIHBsYWNlaG9sZGVyPXsnYWRkIG1lc3NhZ2UnfVxyXG4gICAgICAgICAgICAgIHZhbHVlPXt2YWx1ZX1cclxuICAgICAgICAgICAgLz5cclxuICAgICAgICAgIDwvZm9ybT5cclxuICAgICAgICAgIDx1bD5cclxuICAgICAgICAgICAge1xyXG4gICAgICAgICAgICAgIG1lc3NhZ2VzICYmXHJcbiAgICAgICAgICAgICAgT2JqZWN0LmtleXMobWVzc2FnZXMpLm1hcChrZXkgPT4gPGxpIGtleT17a2V5fT57bWVzc2FnZXNba2V5XS50ZXh0fTwvbGk+KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICA8L3VsPlxyXG4gICAgICAgIDwvZGl2PlxyXG4gICAgICB9XHJcbiAgICA8L2Rpdj5cclxuICB9XHJcbn1cclxuXG5cblxuLy8gV0VCUEFDSyBGT09URVIgLy9cbi8vIC4vcGFnZXM/ZW50cnkiLCJtb2R1bGUuZXhwb3J0cyA9IHtcbiAgY2xpZW50Q3JlZGVudGlhbHM6IHtcbiAgICBhcGlLZXk6IFwiQUl6YVN5Q1FUWEtCM1JHcnFsQWIwMHk2dWhtcDIxMmlfWG1McU9zXCIsXG4gICAgYXV0aERvbWFpbjogXCJ3aXRoLWZpcmViYXNlLTIzYzIyLmZpcmViYXNlYXBwLmNvbVwiLFxuICAgIGRhdGFiYXNlVVJMOiBcImh0dHBzOi8vd2l0aC1maXJlYmFzZS0yM2MyMi5maXJlYmFzZWlvLmNvbVwiLFxuICAgIHByb2plY3RJZDogXCJ3aXRoLWZpcmViYXNlLTIzYzIyXCIsXG4gICAgc3RvcmFnZUJ1Y2tldDogXCJ3aXRoLWZpcmViYXNlLTIzYzIyLmFwcHNwb3QuY29tXCIsXG4gICAgbWVzc2FnaW5nU2VuZGVySWQ6IFwiOTM4ODc4MTk5OTMxXCJcblxuICB9LFxuICBzZXJ2ZXJDcmVkZW50aWFsczogeyAgICBcbiAgXCJ0eXBlXCI6IFwic2VydmljZV9hY2NvdW50XCIsXG4gIFwicHJvamVjdF9pZFwiOiBcIndpdGgtZmlyZWJhc2UtMjNjMjJcIixcbiAgXCJwcml2YXRlX2tleV9pZFwiOiBcIjgzOGE0NjFmMmM5Y2MyMzQyNDliMzhmMDc5MGIxNDQ5MjhlNzJlNjVcIixcbiAgXCJwcml2YXRlX2tleVwiOiBcIi0tLS0tQkVHSU4gUFJJVkFURSBLRVktLS0tLVxcbk1JSUV2d0lCQURBTkJna3Foa2lHOXcwQkFRRUZBQVNDQktrd2dnU2xBZ0VBQW9JQkFRQzVRVGt5NmFIQTZHbDJcXG5haFNJUTBSL0gwTTRwalk2L3dTNFBZZ3FNaVE0Q3pGSllXZE92TjhEV204bWNkYWxoTkZGS2hrazVHY1hTZVIvXFxuVUlIWXNGNlNJS2NFRWVUeXFDa2pDSXBPaDhmUzJma0NBazhXaCt4RkYvZmJOU2UyOHNwKzJvZXh6YitJMGNZeFxcbkVkN0trOWxWUDlSSXpMRFNRdXR3cjBaV3BHRXB3VGJobHYrbXJDeUlNOEk3bnEyTnJXRkwrU3duRCtqLzR1TmFcXG5XbGxXVnV4MDVwYksvTFJtTVNNd2t6RDlxaTVLbjBNemtXY1VLdFYxWGNJaWtNS2czZkp6TzJUQjVQUnpzTWZCXFxuVGRWQ0cycWRRRWozSjUrL0Y2TVhjV1kwZzE5WWowb0hJSVNta0xTQVVTZTJpZnM1UW5ydThRTllBTEhDNjdkVVxcbk9WMUZMWXBoQWdNQkFBRUNnZ0VCQUlwR1VjQmJ2SDExdkVwRGtjSEhtOWZhNk56ZXl6bXI0Y1QzUUt4bU1yeVdcXG5OaHFVbG55aDR6L29mM0JOcGk1emZaUkhnTzhWZ0pGVWVUWkNURGtHSkFDa1dLVmtDZVRKZWJNSmk5cGo1TlhRXFxuRnRuV0NWeEM1aXNJWWR0L3lIMzRxUWFZYkpKZGhXcEZVYzZNalNQZHlXbWxNL21HdHpDcC9IeG1oM1RpU3hmVFxcbk44akJDTDV1aW5QVW0zM3RFWGpBUlorUHdYSlk2bWRMS0Vyb3lOSEliR2p6bk1wYzhycmQwUjk0TzFEWU83NmVcXG51TEFUb3RZT1J4UTh2MU5GSTU4a0U4MzUvSDJrN0FXNUg1d0xzNUdhakRGUFFqRkhsL3laZ2pra2FxTmNyTnFtXFxudWYxSTd1Y2hLcGFLVzYvOU5yc1Z3RWhTZFhzeE03dzVrL3VLZW5hRXVxVUNnWUVBM3V0aTZhemFUMFRYUDJ5aFxcbm82TzNTOU93YlpiSWNJQVpDMjFkcWpQcUZ0MDRFM1IrSHJYUnNjOG1TbG1FU1J5eFQ4aW9Bd3VxcjRaOUNDUE9cXG5oOVFKMXdxRUVPV1JsN25aNXVmbUlvVXBxWjN2SFlBcElTK0FGZlErdFJyWlFqVzBjM284S3RJTVB5OHJoNDYyXFxuZEdLb1E1RXBmY0gyV09HUWVNS002aXVPd2RzQ2dZRUExTDc0dWYzeWlXZzY0K1ViWFNyRWFZSUlLNFFwZlhoQ1xcbmpEYmx0Z3QxdkRyT0k3bUFITVNlS05MblVoam11eFZFZWo3ZkRpcDY2MXArQWIva3FtMFVwbnJjZTJFd0dLeGFcXG5MUnZaOGNCVWFLOXF4aUpBWkRHNnJGeU1DQk1VVFh4RGZ5Q0tnUEdrQXZydGdIM3hEMXYzZVFTMExOWGc1NVllXFxudlpKTFFzNkQ3M01DZ1lFQW1Edi83TDBTeVplbHQ3YWtISEN0dUtiMGthS3JkOGpEVWI1NmZNVy9VNlgzcWJHZ1xcbmY3Q0RaLzZqazVyV2NHZWIzM1NVNkorTERSdTNQMXZVcTRYdXdtQjRHR0h1cjhOSVFCeVdXWFMvSXdxc1JXVkVcXG5zVmtUQytzazkrRkNCYWxQZHAwL2dhNjRsbDNNU0dMNXp6bWcxNlBHeGc4MEFUYnB4czUyRldWeHRJa0NnWUF6XFxuRW9sNWRRcGxqRDBlK3FCQUZJVkVZdS85S21RZmQrQlo4cy9nalEyOW0weGpiU1BoUkI1SDVLR2RwdGExTU56WVxcbmtBRlNVRVpqKzd4bVJSL3EvZmJJSkpTTGxnQkszQTFsNk5yQVc1Q245UHlvQmc3NVBxcjJ0OXp5RDBwL2M0WnNcXG5uVzVDbUQvc2F6cmE3dUVRODk0TUVtSUNwWEd4aHV0b1RSZCtPVCtaR3dLQmdRQzJGVHprK0c1STY1UWo3bjQ5XFxueFZOY0l0NHRTVkxFWmFCbDlzcjFNMS94UU1TUTJacDk2NS9RViswUFF0WVpJcU5ZeDZodklqSlhodnZ6R2EzT1xcbkVIMXBEWUVSZjQ2bFE1Uy9PbWtQNEExaXIyellzRDg2ejNoTW42QithNnVzZENYMm44c3VtVyt4THY5dGhIR25cXG5uY29wMjN2ZjAwSkR1SUN2Z0REWU5SRkplQT09XFxuLS0tLS1FTkQgUFJJVkFURSBLRVktLS0tLVxcblwiLFxuICBcImNsaWVudF9lbWFpbFwiOiBcImZpcmViYXNlLWFkbWluc2RrLTk0MHgzQHdpdGgtZmlyZWJhc2UtMjNjMjIuaWFtLmdzZXJ2aWNlYWNjb3VudC5jb21cIixcbiAgXCJjbGllbnRfaWRcIjogXCIxMTUwMDgzMTI3MTk0MTc1NTg0MTJcIixcbiAgXCJhdXRoX3VyaVwiOiBcImh0dHBzOi8vYWNjb3VudHMuZ29vZ2xlLmNvbS9vL29hdXRoMi9hdXRoXCIsXG4gIFwidG9rZW5fdXJpXCI6IFwiaHR0cHM6Ly9hY2NvdW50cy5nb29nbGUuY29tL28vb2F1dGgyL3Rva2VuXCIsXG4gIFwiYXV0aF9wcm92aWRlcl94NTA5X2NlcnRfdXJsXCI6IFwiaHR0cHM6Ly93d3cuZ29vZ2xlYXBpcy5jb20vb2F1dGgyL3YxL2NlcnRzXCIsXG4gIFwiY2xpZW50X3g1MDlfY2VydF91cmxcIjogXCJodHRwczovL3d3dy5nb29nbGVhcGlzLmNvbS9yb2JvdC92MS9tZXRhZGF0YS94NTA5L2ZpcmViYXNlLWFkbWluc2RrLTk0MHgzJTQwd2l0aC1maXJlYmFzZS0yM2MyMi5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbVwiXG4gIH1cbn1cblxuXG5cbi8vIFdFQlBBQ0sgRk9PVEVSIC8vXG4vLyAuL2ZpcmViYXNlQ3JlZGVudGlhbHMuanMiXSwic291cmNlUm9vdCI6IiJ9
            return { page: comp.default }
          })
        
webpackHotUpdate(5,{

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

/***/ })

})
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9wYWdlcz9kMThjZWUwIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFnQjs7OztBQUNUOzs7O0FBQ1A7O0FBQ1M7Ozs7SUFFWTs7Ozs7OztZQUNZO1lBQUs7Ozs7O21CQUM1Qjt1QkFBTyxPQUFPLElBQUksVUFBVSxJQUFJLFFBQVEsZUFBZTs7dUJBQzFDLElBQUksZUFBZSxXQUFXLElBQUksWUFBWSxLQUFLOzttQkFBaEU7O2lEQUNDLEVBQUUsTUFBRixNQUFRLFVBQVUsS0FBSzs7Ozs7Ozs7Ozs7Ozs7O0FBR2hDOzs7aUJBQWEsT0FBTzt3Q0FBQTs7b0lBRWxCOztVQUFLO1lBQ0csTUFBSyxNQUNYO2FBQ0E7Z0JBQVUsTUFBSyxNQUdqQjtBQUxFOztVQUtHLGdCQUFnQixNQUFLLGNBQWMsS0FDeEM7VUFBSyxlQUFlLE1BQUssYUFBYSxLQUN0QztVQUFLLGVBQWUsTUFBSyxhQUFhLEtBQXRDO1dBQ0Q7Ozs7O3dDQUVvQjttQkFDbkI7O3lCQUVBOztVQUFJLEtBQUssTUFBTSxNQUFNLEtBRXJCOzt5QkFBUyxPQUFPLG1CQUFtQixnQkFDakM7WUFBSSxNQUNGO2lCQUFLLFNBQVMsRUFBRSxNQUNoQjtzQkFBWSxXQUNULEtBQUssVUFBQyxPQUNMO0FBQ0E7eUJBQWE7c0JBRVg7QUFDQTt1QkFBUyxJQUFJLFFBQVEsRUFBRSxnQkFDdkI7MkJBQ0E7b0JBQU0seUJBQWUsRUFBRSxPQUUxQjtBQU5HLGFBREs7QUFISixhQVVGLEtBQUssVUFBQyxLQUFEO21CQUFTLE9BQUs7QUFDekI7QUFiRCxlQWNFO2lCQUFLLFNBQVMsRUFBRSxNQUNoQjtBQUNBO2dCQUFNO29CQUVKO3lCQUFhO0FBRGIsYUFFQyxLQUFLO21CQUFNLG1CQUFTLFdBQVcsSUFBSSxZQUFZO0FBQ25EO0FBQ0Y7QUFDRjs7OztvQ0FFZ0I7bUJBQ2Y7O3lCQUFTLFdBQVcsSUFBSSxZQUFZLEdBQUcsU0FBUyxnQkFDOUM7WUFBTSxXQUFXLEtBQ2pCO1lBQUksVUFBVSxPQUFLLFNBQVMsRUFBRSxVQUMvQjtBQUNGOzs7O2lDQUVhLE9BQ1o7V0FBSyxTQUFTLEVBQUUsT0FBTyxNQUFNLE9BQzlCOzs7O2lDQUVhLE9BQ1o7WUFDQTtVQUFNLE9BQU8sSUFBSSxPQUNqQjt5QkFBUyxXQUFXLGtCQUFnQixNQUFRO1lBRTFDO2NBQU0sS0FBSyxNQUViO0FBSEU7V0FHRyxTQUFTLEVBQUUsT0FDakI7Ozs7a0NBR0M7eUJBQVMsT0FBTyxnQkFBZ0IsSUFBSSxtQkFBUyxLQUM5Qzs7OzttQ0FHQzt5QkFBUyxPQUNWOzs7OzZCQUVTO21CQUMwQixLQUFLO1VBQS9CO1VBQU07VUFBTyxrQkFFckI7OzZCQUFPLHFCQUVGLDJDQUNJLGdEQUlMLGtEQUNFLDBDQUFRLFNBQVMsS0FBSyxnQkFBdEIsWUFDQSwwQ0FBUSxTQUFTLEtBQUssZUFHeEIsa0NBQ0EscUJBQ0UsOENBQU0sVUFBVSxLQUNkO2NBRUU7a0JBQVUsS0FDVjtxQkFDQTtlQUdKO0FBTkksU0FITixrQkFTRSxvQkFFSSxzQ0FDWSxVQUFVLElBQUk7ZUFBTyxzQ0FBSSxLQUFXLGdCQUFTLEtBQUs7QUFNekUsT0FOVyxHQXpCSDs7Ozs7QUFsRndCOztrQkFBZCxNIiwiZmlsZSI6IjUuNGQzNTQ3ZWRhMDg1NWRiMjk2YTguaG90LXVwZGF0ZS5qcyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBSZWFjdCwgeyBDb21wb25lbnQgfSBmcm9tICdyZWFjdCdcclxuaW1wb3J0IGZpcmViYXNlIGZyb20gJ2ZpcmViYXNlJ1xyXG5pbXBvcnQgJ2lzb21vcnBoaWMtZmV0Y2gnXHJcbmltcG9ydCB7IGNsaWVudENyZWRlbnRpYWxzIH0gZnJvbSAnLi4vZmlyZWJhc2VDcmVkZW50aWFscydcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIEluZGV4IGV4dGVuZHMgQ29tcG9uZW50IHtcclxuICBzdGF0aWMgYXN5bmMgZ2V0SW5pdGlhbFByb3BzICh7cmVxLCBxdWVyeX0pIHtcclxuICAgIGNvbnN0IHVzZXIgPSByZXEgJiYgcmVxLnNlc3Npb24gPyByZXEuc2Vzc2lvbi5kZWNvZGVkVG9rZW4gOiBudWxsXHJcbiAgICBjb25zdCBzbmFwID0gYXdhaXQgcmVxLmZpcmViYXNlU2VydmVyLmRhdGFiYXNlKCkucmVmKCdtZXNzYWdlcycpLm9uY2UoJ3ZhbHVlJykgLy9kYiDDpG5kZXJ1bmcgaGFuZGxlclxyXG4gICAgcmV0dXJuIHsgdXNlciwgbWVzc2FnZXM6IHNuYXAudmFsKCkgfVxyXG4gIH1cclxuXHJcbiAgY29uc3RydWN0b3IgKHByb3BzKSB7XHJcbiAgICBzdXBlcihwcm9wcylcclxuICAgIHRoaXMuc3RhdGUgPSB7XHJcbiAgICAgIHVzZXI6IHRoaXMucHJvcHMudXNlcixcclxuICAgICAgdmFsdWU6ICcnLFxyXG4gICAgICBtZXNzYWdlczogdGhpcy5wcm9wcy5tZXNzYWdlc1xyXG4gICAgfVxyXG5cclxuICAgIHRoaXMuYWRkRGJMaXN0ZW5lciA9IHRoaXMuYWRkRGJMaXN0ZW5lci5iaW5kKHRoaXMpXHJcbiAgICB0aGlzLmhhbmRsZUNoYW5nZSA9IHRoaXMuaGFuZGxlQ2hhbmdlLmJpbmQodGhpcylcclxuICAgIHRoaXMuaGFuZGxlU3VibWl0ID0gdGhpcy5oYW5kbGVTdWJtaXQuYmluZCh0aGlzKVxyXG4gIH1cclxuXHJcbiAgY29tcG9uZW50RGlkTW91bnQgKCkge1xyXG4gICAgZmlyZWJhc2UuaW5pdGlhbGl6ZUFwcChjbGllbnRDcmVkZW50aWFscylcclxuXHJcbiAgICBpZiAodGhpcy5zdGF0ZS51c2VyKSB0aGlzLmFkZERiTGlzdGVuZXIoKVxyXG5cclxuICAgIGZpcmViYXNlLmF1dGgoKS5vbkF1dGhTdGF0ZUNoYW5nZWQodXNlciA9PiB7XHJcbiAgICAgIGlmICh1c2VyKSB7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHVzZXI6IHVzZXIgfSlcclxuICAgICAgICByZXR1cm4gdXNlci5nZXRUb2tlbigpXHJcbiAgICAgICAgICAudGhlbigodG9rZW4pID0+IHtcclxuICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXVuZGVmXHJcbiAgICAgICAgICAgIHJldHVybiBmZXRjaCgnL2FwaS9sb2dpbicsIHtcclxuICAgICAgICAgICAgICBtZXRob2Q6ICdQT1NUJyxcclxuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tdW5kZWZcclxuICAgICAgICAgICAgICBoZWFkZXJzOiBuZXcgSGVhZGVycyh7ICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicgfSksXHJcbiAgICAgICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbicsXHJcbiAgICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoeyB0b2tlbiB9KVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgfSkudGhlbigocmVzKSA9PiB0aGlzLmFkZERiTGlzdGVuZXIoKSlcclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdXNlcjogbnVsbCB9KVxyXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby11bmRlZlxyXG4gICAgICAgIGZldGNoKCcvYXBpL2xvZ291dCcsIHtcclxuICAgICAgICAgIG1ldGhvZDogJ1BPU1QnLFxyXG4gICAgICAgICAgY3JlZGVudGlhbHM6ICdzYW1lLW9yaWdpbidcclxuICAgICAgICB9KS50aGVuKCgpID0+IGZpcmViYXNlLmRhdGFiYXNlKCkucmVmKCdtZXNzYWdlcycpLm9mZigpKVxyXG4gICAgICB9XHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgYWRkRGJMaXN0ZW5lciAoKSB7XHJcbiAgICBmaXJlYmFzZS5kYXRhYmFzZSgpLnJlZignbWVzc2FnZXMnKS5vbigndmFsdWUnLCBzbmFwID0+IHtcclxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBzbmFwLnZhbCgpXHJcbiAgICAgIGlmIChtZXNzYWdlcykgdGhpcy5zZXRTdGF0ZSh7IG1lc3NhZ2VzIH0pXHJcbiAgICB9KVxyXG4gIH1cclxuXHJcbiAgaGFuZGxlQ2hhbmdlIChldmVudCkge1xyXG4gICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiBldmVudC50YXJnZXQudmFsdWUgfSlcclxuICB9XHJcblxyXG4gIGhhbmRsZVN1Ym1pdCAoZXZlbnQpIHtcclxuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KClcclxuICAgIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpLmdldFRpbWUoKVxyXG4gICAgZmlyZWJhc2UuZGF0YWJhc2UoKS5yZWYoYG1lc3NhZ2VzLyR7ZGF0ZX1gKS5zZXQoe1xyXG4gICAgICBpZDogZGF0ZSxcclxuICAgICAgdGV4dDogdGhpcy5zdGF0ZS52YWx1ZVxyXG4gICAgfSlcclxuICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogJycgfSlcclxuICB9XHJcblxyXG4gIGhhbmRsZUxvZ2luICgpIHtcclxuICAgIGZpcmViYXNlLmF1dGgoKS5zaWduSW5XaXRoUG9wdXAobmV3IGZpcmViYXNlLmF1dGguR29vZ2xlQXV0aFByb3ZpZGVyKCkpXHJcbiAgfVxyXG5cclxuICBoYW5kbGVMb2dvdXQgKCkge1xyXG4gICAgZmlyZWJhc2UuYXV0aCgpLnNpZ25PdXQoKVxyXG4gIH1cclxuXHJcbiAgcmVuZGVyICgpIHtcclxuICAgIGNvbnN0IHsgdXNlciwgdmFsdWUsIG1lc3NhZ2VzIH0gPSB0aGlzLnN0YXRlXHJcblxyXG4gICAgcmV0dXJuIDxkaXY+XHJcbiAgICAgIHsgICAgICAgIFxyXG4gICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgPGgxPkRlciBQb3J0Zm9saW8gR2VuZXJhdG9yIG1pdCBSZWFjdCAhISE8L2gxPlxyXG4gICAgICAgICA8L2Rpdj4gICAgICAgICBcclxuICAgICAgfVxyXG4gICAgICB7ICAgICAgICBcclxuICAgICAgICB1c2VyICAgICAgICBcclxuICAgICAgICA/IDxidXR0b24gb25DbGljaz17dGhpcy5oYW5kbGVMb2dvdXR9PkxvZ291dDwvYnV0dG9uPlxyXG4gICAgICAgIDogPGJ1dHRvbiBvbkNsaWNrPXt0aGlzLmhhbmRsZUxvZ2lufT5Mb2dpbjwvYnV0dG9uPiAgICAgIFxyXG4gICAgICB9XHJcbiAgICAgIHtcclxuICAgICAgICB1c2VyICYmXHJcbiAgICAgICAgPGRpdj5cclxuICAgICAgICAgIDxmb3JtIG9uU3VibWl0PXt0aGlzLmhhbmRsZVN1Ym1pdH0+XHJcbiAgICAgICAgICAgIDxpbnB1dFxyXG4gICAgICAgICAgICAgIHR5cGU9eyd0ZXh0J31cclxuICAgICAgICAgICAgICBvbkNoYW5nZT17dGhpcy5oYW5kbGVDaGFuZ2V9XHJcbiAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9eydhZGQgbWVzc2FnZSd9XHJcbiAgICAgICAgICAgICAgdmFsdWU9e3ZhbHVlfVxyXG4gICAgICAgICAgICAvPlxyXG4gICAgICAgICAgPC9mb3JtPlxyXG4gICAgICAgICAgPHVsPlxyXG4gICAgICAgICAgICB7XHJcbiAgICAgICAgICAgICAgbWVzc2FnZXMgJiZcclxuICAgICAgICAgICAgICBPYmplY3Qua2V5cyhtZXNzYWdlcykubWFwKGtleSA9PiA8bGkga2V5PXtrZXl9PnttZXNzYWdlc1trZXldLnRleHR9PC9saT4pXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgIDwvdWw+XHJcbiAgICAgICAgPC9kaXY+XHJcbiAgICAgIH1cclxuICAgIDwvZGl2PlxyXG4gIH1cclxufVxyXG5cblxuXG4vLyBXRUJQQUNLIEZPT1RFUiAvL1xuLy8gLi9wYWdlcz9lbnRyeSJdLCJzb3VyY2VSb290IjoiIn0=
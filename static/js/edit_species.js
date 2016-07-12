webpackJsonp([4],[
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(33);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var pg = pageData;

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App() {
	        _classCallCheck(this, App);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(App).call(this));

	        _this.state = {
	            title: pg.species.name || "",
	            description: pg.species.descrip || "",
	            genus_id: pg.species.genus_id || pg.genera[0].id || 0
	        };
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'handleInputChange',
	        // ES6 computed property
	        value: function handleInputChange(name, e) {
	            this.setState(_defineProperty({}, name, e.target.value));
	        }
	    }, {
	        key: 'updateTheMotherShip',
	        // ES6 computed property
	        value: function updateTheMotherShip() {
	            fetch('/api/edit_species', {
	                method: 'POST',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify({
	                    id: pg.species.id || null,
	                    name: this.state.title,
	                    descrip: this.state.description,
	                    g_id: this.state.genus_id,
	                    key: pg.key
	                })
	            }).then(function (response) {
	                if (response.ok) {
	                    response.json().then(function (obj) {
	                        window.location.href = window.location.origin + window.location.pathname + '?id=' + obj.id;
	                    });
	                } else {
	                    console.log('Network response was not ok.');
	                }
	            }).catch(function (error) {
	                console.log('There has been a problem with your fetch operation: ' + error.message);
	            });
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h1',
	                    null,
	                    this.state.title || "New Species"
	                ),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(Inputer, {
	                    id: 'name',
	                    title: 'Name',
	                    placeholder: 'species',
	                    text: this.state.title,
	                    handler: this.handleInputChange.bind(this, 'title') }),
	                _react2.default.createElement(Dropper, {
	                    id: 'genera',
	                    title: 'Genera',
	                    'default': this.state.genus_id,
	                    list: pg.genera,
	                    handler: this.handleInputChange.bind(this, 'genus_id') }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(Texter, {
	                    id: 'description',
	                    title: 'Description',
	                    placeholder: 'enter description here',
	                    text: this.state.description,
	                    handler: this.handleInputChange.bind(this, 'description') }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(
	                    'p',
	                    null,
	                    'Description: ',
	                    this.state.description
	                ),
	                _react2.default.createElement(
	                    'p',
	                    null,
	                    'Fam id: ',
	                    this.state.family_id
	                ),
	                _react2.default.createElement(
	                    'p',
	                    null,
	                    'Gen id: ',
	                    this.state.genus_id
	                ),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(Saver, {
	                    id: 'saveButton',
	                    callback: this.updateTheMotherShip.bind(this) })
	            );
	        }
	    }]);

	    return App;
	}(_react2.default.Component);

	var Inputer = function (_React$Component2) {
	    _inherits(Inputer, _React$Component2);

	    function Inputer() {
	        _classCallCheck(this, Inputer);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Inputer).apply(this, arguments));
	    }

	    _createClass(Inputer, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id, className: 'question' },
	                _react2.default.createElement(
	                    'span',
	                    { className: 'title' },
	                    this.props.title,
	                    ': '
	                ),
	                _react2.default.createElement('input', { type: 'text',
	                    value: this.props.text,
	                    placeholder: this.props.placeholder,
	                    onChange: this.props.handler
	                })
	            );
	        }
	    }]);

	    return Inputer;
	}(_react2.default.Component);

	var Texter = function (_React$Component3) {
	    _inherits(Texter, _React$Component3);

	    function Texter() {
	        _classCallCheck(this, Texter);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Texter).apply(this, arguments));
	    }

	    _createClass(Texter, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id, className: 'question' },
	                _react2.default.createElement(
	                    'span',
	                    { className: 'title' },
	                    this.props.title,
	                    ': '
	                ),
	                _react2.default.createElement('textarea', {
	                    value: this.props.text,
	                    placeholder: this.props.placeholder,
	                    onChange: this.props.handler
	                })
	            );
	        }
	    }]);

	    return Texter;
	}(_react2.default.Component);

	var Dropper = function (_React$Component4) {
	    _inherits(Dropper, _React$Component4);

	    function Dropper() {
	        _classCallCheck(this, Dropper);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Dropper).apply(this, arguments));
	    }

	    _createClass(Dropper, [{
	        key: 'render',
	        value: function render() {
	            var rows = [];
	            this.props.list.forEach(function (item) {
	                rows.push(_react2.default.createElement(
	                    'option',
	                    { value: item.id, key: item.id },
	                    item.name
	                ));
	            });
	            return _react2.default.createElement(
	                'div',
	                { className: 'question' },
	                _react2.default.createElement(
	                    'span',
	                    { className: 'title' },
	                    this.props.title,
	                    ': '
	                ),
	                _react2.default.createElement(
	                    'select',
	                    { onChange: this.props.handler, defaultValue: this.props.default },
	                    rows
	                )
	            );
	        }
	    }]);

	    return Dropper;
	}(_react2.default.Component);

	var Saver = function (_React$Component5) {
	    _inherits(Saver, _React$Component5);

	    function Saver() {
	        _classCallCheck(this, Saver);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Saver).apply(this, arguments));
	    }

	    _createClass(Saver, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id,
	                    className: 'button',
	                    onClick: this.props.callback },
	                'save'
	            );
	        }
	    }]);

	    return Saver;
	}(_react2.default.Component);

	if (self.fetch) {} else {
	    console.log('Unsupported browser. Please use Firefox or Google Chrome');
	}

	exports.default = App;

	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ }
]);
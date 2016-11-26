webpackJsonp([4],{

/***/ 0:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(34);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _inputer = __webpack_require__(172);

	var _inputer2 = _interopRequireDefault(_inputer);

	var _buttoner = __webpack_require__(173);

	var _buttoner2 = _interopRequireDefault(_buttoner);

	var _dropper = __webpack_require__(175);

	var _dropper2 = _interopRequireDefault(_dropper);

	var _texter = __webpack_require__(176);

	var _texter2 = _interopRequireDefault(_texter);

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

	        var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this));

	        _this.state = {
	            title: pg.genus.name || "",
	            description: pg.genus.description || "",
	            family_id: pg.genus.family_id || pg.families[0].id || 0
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
	        value: function handleInputChange(name, e) {
	            this.setState(_defineProperty({}, name, e.target.value));
	        }
	    }, {
	        key: 'updateTheMotherShip',
	        value: function updateTheMotherShip() {
	            fetch('/api/edit_genus', {
	                method: 'POST',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                },
	                body: JSON.stringify({
	                    id: pg.genus.id || null,
	                    name: this.state.title,
	                    descrip: this.state.description,
	                    f_id: this.state.family_id
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
	        key: 'deleteMe',
	        value: function deleteMe() {
	            var r = confirm("Are you sure you want to delete me?");
	            if (r == true) {
	                fetch('/api/delete_genus', {
	                    method: 'POST',
	                    headers: {
	                        'Accept': 'application/json',
	                        'Content-Type': 'application/json'
	                    },
	                    body: JSON.stringify({
	                        id: pg.genus.id,
	                        key: pg.key
	                    })
	                }).then(function (response) {
	                    if (response.ok) {
	                        response.json().then(function (obj) {
	                            if (obj.err) {
	                                console.log(obj.msg);
	                                alert(obj.msg);
	                            } else {
	                                window.location.href = window.location.origin + window.location.pathname;
	                            }
	                        });
	                    } else {
	                        console.log('Network response was not ok.');
	                    }
	                }).catch(function (error) {
	                    console.log('There has been a problem with your fetch operation: ' + error.message);
	                });
	            }
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h1',
	                    { className: 'mainTitle' },
	                    this.state.title || "New Genus"
	                ),
	                pg.genus.id ? _react2.default.createElement(_buttoner2.default, { id: 'deleteButton',
	                    callback: this.deleteMe.bind(this),
	                    text: 'delete' }) : null,
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_inputer2.default, {
	                    id: 'name',
	                    title: 'Name',
	                    placeholder: 'genus',
	                    text: this.state.title,
	                    handler: this.handleInputChange.bind(this, 'title') }),
	                _react2.default.createElement(_dropper2.default, {
	                    id: 'family',
	                    title: 'Family',
	                    'default': this.state.family_id,
	                    list: pg.families,
	                    handler: this.handleInputChange.bind(this, 'family_id') }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_texter2.default, {
	                    id: 'description',
	                    title: 'Description',
	                    placeholder: 'enter description here',
	                    text: this.state.description,
	                    handler: this.handleInputChange.bind(this, 'description') }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(_buttoner2.default, {
	                    id: 'saveButton',
	                    callback: this.updateTheMotherShip.bind(this),
	                    text: 'save' })
	            );
	        }
	    }]);

	    return App;
	}(_react2.default.Component);

	if (self.fetch) {} else {
	    console.log('Unsupported browser. Please use Firefox or Google Chrome');
	}

	exports.default = App;

	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ },

/***/ 172:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//
	// Input field with title next to it. 
	//
	// props: id, handler, placeholder, title, text
	//
	//

	var Inputer = function (_React$Component) {
	    _inherits(Inputer, _React$Component);

	    function Inputer() {
	        _classCallCheck(this, Inputer);

	        return _possibleConstructorReturn(this, (Inputer.__proto__ || Object.getPrototypeOf(Inputer)).apply(this, arguments));
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

	Inputer.propTypes = {
	    text: _react.PropTypes.string.isRequired,
	    title: _react.PropTypes.string.isRequired,
	    placeholder: _react.PropTypes.string.isRequired,
	    handler: _react.PropTypes.func.isRequired
	};

	exports.default = Inputer;

/***/ },

/***/ 173:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	//
	// Button with callback
	// 
	// props: callback, id, text
	//

	var Buttoner = function (_React$Component) {
	    _inherits(Buttoner, _React$Component);

	    function Buttoner() {
	        _classCallCheck(this, Buttoner);

	        return _possibleConstructorReturn(this, (Buttoner.__proto__ || Object.getPrototypeOf(Buttoner)).apply(this, arguments));
	    }

	    _createClass(Buttoner, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id,
	                    className: 'button',
	                    onClick: this.props.callback },
	                this.props.text
	            );
	        }
	    }]);

	    return Buttoner;
	}(_react2.default.Component);

	Buttoner.propTypes = {
	    callback: _react.PropTypes.func.isRequired
	};

	exports.default = Buttoner;

/***/ },

/***/ 175:
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Dropper = function (_React$Component) {
	    _inherits(Dropper, _React$Component);

	    function Dropper() {
	        _classCallCheck(this, Dropper);

	        return _possibleConstructorReturn(this, (Dropper.__proto__ || Object.getPrototypeOf(Dropper)).apply(this, arguments));
	    }

	    _createClass(Dropper, [{
	        key: "render",
	        value: function render() {
	            var rows = [];
	            this.props.list.forEach(function (item) {
	                rows.push(React.createElement(
	                    "option",
	                    { value: item.id, key: item.id },
	                    item.name
	                ));
	            });
	            return React.createElement(
	                "div",
	                { className: "question" },
	                React.createElement(
	                    "span",
	                    { className: "title" },
	                    this.props.title,
	                    ": "
	                ),
	                React.createElement(
	                    "select",
	                    { onChange: this.props.handler, defaultValue: this.props.default },
	                    rows
	                )
	            );
	        }
	    }]);

	    return Dropper;
	}(React.Component);

/***/ },

/***/ 176:
/***/ function(module, exports) {

	"use strict";

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Texter = function (_React$Component) {
	    _inherits(Texter, _React$Component);

	    function Texter() {
	        _classCallCheck(this, Texter);

	        return _possibleConstructorReturn(this, (Texter.__proto__ || Object.getPrototypeOf(Texter)).apply(this, arguments));
	    }

	    _createClass(Texter, [{
	        key: "render",
	        value: function render() {
	            return React.createElement(
	                "div",
	                { id: this.props.id, className: "question" },
	                React.createElement(
	                    "span",
	                    { className: "title" },
	                    this.props.title,
	                    ": "
	                ),
	                React.createElement("textarea", {
	                    value: this.props.text,
	                    placeholder: this.props.placeholder,
	                    onChange: this.props.handler
	                })
	            );
	        }
	    }]);

	    return Texter;
	}(React.Component);

/***/ }

});
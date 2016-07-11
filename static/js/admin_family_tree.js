webpackJsonp([0],[
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

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var pg = pageData;

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(App).apply(this, arguments));
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            var families = [];
	            pg.tree.forEach(function (item) {
	                families.push(_react2.default.createElement(Family, { family: item }));
	            });
	            return _react2.default.createElement(
	                'div',
	                null,
	                _react2.default.createElement(
	                    'h1',
	                    null,
	                    'Family Tree'
	                ),
	                _react2.default.createElement('hr', null),
	                families
	            );
	        }
	    }]);

	    return App;
	}(_react2.default.Component);

	var Family = function (_React$Component2) {
	    _inherits(Family, _React$Component2);

	    function Family() {
	        _classCallCheck(this, Family);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Family).apply(this, arguments));
	    }

	    _createClass(Family, [{
	        key: 'render',
	        value: function render() {
	            var f = this.props.family,
	                genera = [];
	            this.props.family.genera.forEach(function (item) {
	                genera.push(_react2.default.createElement(Genus, { genus: item }));
	            });
	            return _react2.default.createElement(
	                'div',
	                { id: 'family-' + f.id, className: 'family' },
	                'family ',
	                _react2.default.createElement(
	                    'span',
	                    { className: 'name' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: "/admin/edit_family?id=" + f.id },
	                        f.name
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'generaWrapper' },
	                    genera
	                )
	            );
	        }
	    }]);

	    return Family;
	}(_react2.default.Component);

	var Genus = function (_React$Component3) {
	    _inherits(Genus, _React$Component3);

	    function Genus() {
	        _classCallCheck(this, Genus);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Genus).apply(this, arguments));
	    }

	    _createClass(Genus, [{
	        key: 'render',
	        value: function render() {
	            var g = this.props.genus,
	                species = [];
	            this.props.genus.species.forEach(function (item) {
	                species.push(_react2.default.createElement(Species, { species: item }));
	            });
	            return _react2.default.createElement(
	                'div',
	                { id: 'genus-' + g.id, className: 'genus' },
	                'genus ',
	                _react2.default.createElement(
	                    'span',
	                    { className: 'name' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: "/admin/edit_genus?id=" + g.id },
	                        g.name
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'speciesWrapper' },
	                    species
	                )
	            );
	        }
	    }]);

	    return Genus;
	}(_react2.default.Component);

	var Species = function (_React$Component4) {
	    _inherits(Species, _React$Component4);

	    function Species() {
	        _classCallCheck(this, Species);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Species).apply(this, arguments));
	    }

	    _createClass(Species, [{
	        key: 'render',
	        value: function render() {
	            var s = this.props.species;
	            return _react2.default.createElement(
	                'div',
	                { id: 'species-' + s.id, className: 'species' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'name' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/admin/edit_species?id=' + s.id },
	                        s.name
	                    )
	                )
	            );
	        }
	    }]);

	    return Species;
	}(_react2.default.Component);

	exports.default = App;

	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ }
]);
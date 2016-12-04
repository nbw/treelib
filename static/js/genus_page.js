webpackJsonp([7],{

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

	var _genus = __webpack_require__(179);

	var _genus2 = _interopRequireDefault(_genus);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var pg = pageData;

	var App = function (_React$Component) {
	    _inherits(App, _React$Component);

	    function App() {
	        _classCallCheck(this, App);

	        return _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).apply(this, arguments));
	    }

	    _createClass(App, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'mainContainer' },
	                _react2.default.createElement(_genus2.default, { genus: pg.genus })
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

/***/ 178:
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

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PhotoViewer = function (_React$Component) {
	    _inherits(PhotoViewer, _React$Component);

	    function PhotoViewer() {
	        _classCallCheck(this, PhotoViewer);

	        return _possibleConstructorReturn(this, (PhotoViewer.__proto__ || Object.getPrototypeOf(PhotoViewer)).apply(this, arguments));
	    }

	    _createClass(PhotoViewer, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'photoViewer' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'image' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'prev', onClick: this.props.prevCallback },
	                        _react2.default.createElement('i', { className: 'fa fa-angle-double-left fa-2x' })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'imageWrapper' },
	                        _react2.default.createElement('span', { className: 'helper' }),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'imageInnerWrapper' },
	                            _react2.default.createElement('img', { src: this.props.image }),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'photoButtons' },
	                                _react2.default.createElement(
	                                    'ul',
	                                    null,
	                                    _react2.default.createElement(
	                                        'li',
	                                        { className: 'flickr' },
	                                        _react2.default.createElement('i', { className: 'fa fa-flickr fa-lg' }),
	                                        ' flickr'
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement('i', { className: 'fa fa-download fa-lg' }),
	                                        ' download'
	                                    )
	                                )
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'next', onClick: this.props.nextCallback },
	                        _react2.default.createElement('i', { className: 'fa fa-angle-double-right fa-2x' })
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'content' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'title' },
	                        'Title'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'description' },
	                        'Temporary description of photo'
	                    ),
	                    _react2.default.createElement(
	                        'a',
	                        { className: 'fullimage', href: this.props.original },
	                        'Link to full image'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'closeButton', onClick: this.props.closeCallback },
	                    _react2.default.createElement('i', { className: 'fa fa-times fa-lg' }),
	                    ' Close '
	                )
	            );
	        }
	    }]);

	    return PhotoViewer;
	}(_react2.default.Component);

	exports.default = PhotoViewer;

/***/ },

/***/ 179:
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

	var _photoViewer = __webpack_require__(178);

	var _photoViewer2 = _interopRequireDefault(_photoViewer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Genus = function (_React$Component) {
	    _inherits(Genus, _React$Component);

	    function Genus() {
	        _classCallCheck(this, Genus);

	        var _this = _possibleConstructorReturn(this, (Genus.__proto__ || Object.getPrototypeOf(Genus)).call(this));

	        _this.state = {
	            selectedPhotoIndex: null
	        };
	        return _this;
	    }

	    _createClass(Genus, [{
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'nextPhoto',
	        value: function nextPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto < this.props.genus.photos.length) {
	                this.update("selectedPhotoIndex", selectedPhoto + 1);
	            }
	            return;
	        }
	    }, {
	        key: 'prevPhoto',
	        value: function prevPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto > 0) {
	                this.update("selectedPhotoIndex", selectedPhoto - 1);
	            }
	        }
	    }, {
	        key: 'closePhotoviewer',
	        value: function closePhotoviewer() {
	            this.update("selectedPhotoIndex", null);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var self = this,
	                g = this.props.genus,
	                selectedPhoto = this.state.selectedPhotoIndex,
	                thumbs = [];
	            g.photos.forEach(function (link, index) {
	                if (index == selectedPhoto) {
	                    thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, className: 'selected' }));
	                } else {
	                    thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, onClick: function onClick() {
	                            return self.update('selectedPhotoIndex', index);
	                        } }));
	                }
	            });
	            return _react2.default.createElement(
	                'div',
	                { className: 'genus' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'title' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/genus/' + g.name.replace(/ /g, '_') },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'main' },
	                            g.name
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'secondary' },
	                        'genus'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'description' },
	                    g.descrip
	                ),
	                selectedPhoto != null ? _react2.default.createElement(_photoViewer2.default, {
	                    nextCallback: function nextCallback() {
	                        return _this2.nextPhoto();
	                    },
	                    prevCallback: function prevCallback() {
	                        return _this2.prevPhoto();
	                    },
	                    closeCallback: function closeCallback() {
	                        return _this2.closePhotoviewer();
	                    },
	                    image: g.photos[selectedPhoto].medium,
	                    original: g.photos[selectedPhoto].original }) : null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'photos' },
	                    thumbs
	                )
	            );
	        }
	    }]);

	    return Genus;
	}(_react2.default.Component);

	exports.default = Genus;

/***/ }

});
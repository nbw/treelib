webpackJsonp([6],{

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

	var _BasicNavbar = __webpack_require__(179);

	var _BasicNavbar2 = _interopRequireDefault(_BasicNavbar);

	var _family = __webpack_require__(180);

	var _family2 = _interopRequireDefault(_family);

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
	                _react2.default.createElement(_BasicNavbar2.default, null),
	                _react2.default.createElement(_family2.default, { family: pg.family })
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

/***/ 179:
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

	var BasicNavbar = function (_React$Component) {
	    _inherits(BasicNavbar, _React$Component);

	    function BasicNavbar() {
	        _classCallCheck(this, BasicNavbar);

	        return _possibleConstructorReturn(this, (BasicNavbar.__proto__ || Object.getPrototypeOf(BasicNavbar)).apply(this, arguments));
	    }

	    _createClass(BasicNavbar, [{
	        key: 'func',
	        value: function func() {
	            this.props.handler('search');
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'basicNavbar' },
	                _react2.default.createElement(
	                    'ul',
	                    null,
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'treelib' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '/' },
	                            _react2.default.createElement('img', { src: '/img/logo.png' }),
	                            _react2.default.createElement(
	                                'label',
	                                null,
	                                'TreeLib'
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'home' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '/' },
	                            'HOME'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'search' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '/search' },
	                            'SEARCH'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'about' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '/about' },
	                            'ABOUT'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'li',
	                        { className: 'contact' },
	                        _react2.default.createElement(
	                            'a',
	                            { href: '/contact' },
	                            'CONTACT'
	                        )
	                    )
	                ),
	                _react2.default.createElement('div', { className: 'navBorder first' }),
	                _react2.default.createElement('div', { className: 'navBorder second' }),
	                _react2.default.createElement('div', { className: 'navBorder third' })
	            );
	        }
	    }]);

	    return BasicNavbar;
	}(_react2.default.Component);

	exports.default = BasicNavbar;

/***/ },

/***/ 180:
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

	var _photoViewer = __webpack_require__(181);

	var _photoViewer2 = _interopRequireDefault(_photoViewer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Family = function (_React$Component) {
	    _inherits(Family, _React$Component);

	    function Family() {
	        _classCallCheck(this, Family);

	        var _this = _possibleConstructorReturn(this, (Family.__proto__ || Object.getPrototypeOf(Family)).call(this));

	        _this.state = {
	            selectedPhotoIndex: null
	        };
	        return _this;
	    }

	    _createClass(Family, [{
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'nextPhoto',
	        value: function nextPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto < this.props.family.photos.length) {
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
	        key: 'createMarkup',
	        value: function createMarkup(s) {
	            return { __html: s };
	        }
	    }, {
	        key: 'grabMorePhotos',
	        value: function grabMorePhotos(event) {
	            var self = this,
	                f = this.props.family;
	            fetch('/api/get_family_photos?family_id=' + f.id, {
	                method: 'GET',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                }
	            }).then(function (response) {
	                if (response.ok) {
	                    response.json().then(function (photos) {
	                        f.photos = photos;
	                        self.update("selectedPhotoIndex", null);
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
	            var _this2 = this;

	            var self = this,
	                f = this.props.family,
	                selectedPhoto = this.state.selectedPhotoIndex,
	                thumbs = [];

	            var genera = f.genera.map(function (g, i) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: i },
	                    _react2.default.createElement(
	                        'a',
	                        { href: "/search?f_id=" + f.id + "&g_id=" + g.id },
	                        g.name
	                    )
	                );
	            });

	            if (f.photos && f.photos.length > 0) {
	                f.photos.forEach(function (link, index) {
	                    if (index == selectedPhoto) {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, className: 'selected' }));
	                    } else {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, onClick: function onClick() {
	                                return self.update('selectedPhotoIndex', index);
	                            } }));
	                    }
	                });
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'family' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'title' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/family/' + f.name.replace(/ /g, '_') },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'main' },
	                            f.name
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'commonName' },
	                        f.common_name
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'secondary' },
	                        'family'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'textContent' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'description' },
	                        _react2.default.createElement('div', { dangerouslySetInnerHTML: this.createMarkup(f.descrip) })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'genera' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'genusTitle' },
	                            'Genera'
	                        ),
	                        _react2.default.createElement(
	                            'ul',
	                            null,
	                            genera
	                        )
	                    )
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
	                    image: f.photos[selectedPhoto].medium,
	                    imageName: f.photos[selectedPhoto].name,
	                    imageDescription: f.photos[selectedPhoto].description,
	                    original: f.photos[selectedPhoto].original,
	                    flickr_url: f.photos[selectedPhoto].flickr_url }) : null,
	                thumbs.length > 0 ? _react2.default.createElement(
	                    'div',
	                    { className: 'photos' },
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'subtitle' },
	                        'The photos below have been randomly selected from species in ',
	                        f.name,
	                        '.'
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'thumbs' },
	                        thumbs
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { onClick: this.grabMorePhotos.bind(this), className: 'newPhotoSelectionButton' },
	                        'new random photo selection'
	                    )
	                ) : null
	            );
	        }
	    }]);

	    return Family;
	}(_react2.default.Component);

	exports.default = Family;

/***/ },

/***/ 181:
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

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var PhotoViewer = function (_React$Component) {
	    _inherits(PhotoViewer, _React$Component);

	    function PhotoViewer() {
	        _classCallCheck(this, PhotoViewer);

	        var _this = _possibleConstructorReturn(this, (PhotoViewer.__proto__ || Object.getPrototypeOf(PhotoViewer)).call(this));

	        _this.state = {
	            showFullSize: false
	        };
	        return _this;
	    }

	    _createClass(PhotoViewer, [{
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            window.addEventListener("keydown", this.handleKeyPress.bind(this));
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener("keydown", this.handleKeyPress.bind(this));
	        }
	    }, {
	        key: 'handleKeyPress',
	        value: function handleKeyPress(event) {
	            if (event.key === "ArrowLeft") {
	                this.props.prevCallback();
	            }
	            if (event.key === "ArrowRight") {
	                this.props.nextCallback();
	            }
	        }
	    }, {
	        key: 'showFullSizeImage',
	        value: function showFullSizeImage() {
	            this.update('showFullSize', !this.state.showFullSize);
	            var event = new Event('fullScreenPhoto');
	            window.dispatchEvent(event);
	            console.log("dispatched 'fullScreenPhoto'");
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var self = this,
	                show = this.state.showFullSize ? 'show' : '';
	            return _react2.default.createElement(
	                'div',
	                { className: 'photoViewer' },
	                _react2.default.createElement(
	                    'div',
	                    { onClick: function onClick() {
	                            return self.showFullSizeImage();
	                        }, className: "fullSizeImage " + show },
	                    _react2.default.createElement('span', { className: 'helper' }),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'imageWrapper' },
	                        _react2.default.createElement('img', { src: this.props.original }),
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'info' },
	                            _react2.default.createElement(
	                                'label',
	                                { className: 'title' },
	                                this.props.imageName
	                            ),
	                            _react2.default.createElement(
	                                'p',
	                                { className: 'description' },
	                                this.props.imageDescription
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'closeButton', onClick: function onClick() {
	                                return self.showFullSizeImage();
	                            } },
	                        _react2.default.createElement('i', { className: 'fa fa-times fa-lg' }),
	                        ' Close '
	                    )
	                ),
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
	                            _react2.default.createElement('img', { src: this.props.image, onClick: function onClick() {
	                                    return self.showFullSizeImage();
	                                } }),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'photoButtons' },
	                                _react2.default.createElement(
	                                    'ul',
	                                    null,
	                                    _react2.default.createElement(
	                                        'li',
	                                        { className: 'fullScreen', onClick: function onClick() {
	                                                return self.showFullSizeImage();
	                                            } },
	                                        _react2.default.createElement('i', { className: 'fa fa-expand fa-lg' }),
	                                        ' '
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'a',
	                                            { target: '_blank', className: 'flickr', href: this.props.flickr_url },
	                                            _react2.default.createElement('i', { className: 'fa fa-flickr fa-lg' }),
	                                            ' '
	                                        )
	                                    ),
	                                    _react2.default.createElement(
	                                        'li',
	                                        null,
	                                        _react2.default.createElement(
	                                            'a',
	                                            { className: 'downloadLink', href: this.props.original, download: this.props.imageName },
	                                            _react2.default.createElement('i', { className: 'fa fa-download fa-lg' }),
	                                            ' '
	                                        )
	                                    )
	                                )
	                            ),
	                            _react2.default.createElement(
	                                'div',
	                                { className: 'info' },
	                                _react2.default.createElement(
	                                    'label',
	                                    { className: 'title' },
	                                    this.props.imageName
	                                ),
	                                _react2.default.createElement(
	                                    'p',
	                                    { className: 'description' },
	                                    this.props.imageDescription
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

/***/ }

});
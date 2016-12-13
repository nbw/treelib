webpackJsonp([10],{

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

	var _family = __webpack_require__(180);

	var _family2 = _interopRequireDefault(_family);

	var _genus = __webpack_require__(182);

	var _genus2 = _interopRequireDefault(_genus);

	var _species = __webpack_require__(186);

	var _species2 = _interopRequireDefault(_species);

	var _searchSidebar = __webpack_require__(187);

	var _searchSidebar2 = _interopRequireDefault(_searchSidebar);

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
	            selectedItem: { item: null, itemType: null },
	            sidebarMinimized: false,
	            sidebarHidden: false
	        };
	        return _this;
	    }

	    _createClass(App, [{
	        key: 'componentDidMount',
	        value: function componentDidMount() {
	            var _this2 = this;

	            window.addEventListener("fullScreenPhoto", function () {
	                _this2.update('sidebarHidden', !_this2.state.sidebarHidden);
	            });
	        }
	    }, {
	        key: 'componentWillUnmount',
	        value: function componentWillUnmount() {
	            window.removeEventListener("fullScreenPhoto", function () {});
	        }
	    }, {
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	            console.log(this.state);
	        }
	    }, {
	        key: 'handleInputChange',
	        value: function handleInputChange(name, e) {
	            this.setState(_defineProperty({}, name, e.target.value));
	        }
	    }, {
	        key: 'speciesSelectedHandler',
	        value: function speciesSelectedHandler(s, handler) {
	            self = this;
	            fetch('/api/get_species_photos?species_id=' + s.id, {
	                method: 'GET',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                }
	            }).then(function (response) {
	                if (response.ok) {
	                    response.json().then(function (photos) {
	                        s.photos = photos;
	                        handler('selectedItem', { itemType: 'species', item: s });
	                    });
	                } else {
	                    console.log('Network response was not ok.');
	                }
	            }).catch(function (error) {
	                console.log('There has been a problem with your fetch operation: ' + error.message);
	            });
	        }
	    }, {
	        key: 'genusSelectedHandler',
	        value: function genusSelectedHandler(g, handler) {
	            self = this;
	            fetch('/api/get_genus_photos?genus_id=' + g.id, {
	                method: 'GET',
	                headers: {
	                    'Accept': 'application/json',
	                    'Content-Type': 'application/json'
	                }
	            }).then(function (response) {
	                if (response.ok) {
	                    response.json().then(function (photos) {
	                        g.photos = photos;
	                        handler('selectedItem', { itemType: 'genus', item: g });
	                    });
	                } else {
	                    console.log('Network response was not ok.');
	                }
	            }).catch(function (error) {
	                console.log('There has been a problem with your fetch operation: ' + error.message);
	            });
	        }
	    }, {
	        key: 'familySelectedHandler',
	        value: function familySelectedHandler(f, handler) {
	            self = this;
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
	                        handler('selectedItem', { itemType: 'family', item: f });
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
	            var type = this.state.selectedItem.itemType,
	                item = this.state.selectedItem.item,
	                minimized = this.state.sidebarMinimized,
	                hidden = this.state.sidebarHidden;
	            return _react2.default.createElement(
	                'div',
	                { className: 'mainContainer' },
	                hidden ? null : _react2.default.createElement(_searchSidebar2.default, {
	                    title: 'Family',
	                    tree: pg.tree,
	                    speciesHandler: this.speciesSelectedHandler.bind(this),
	                    genusHandler: this.genusSelectedHandler.bind(this),
	                    familyHandler: this.familySelectedHandler.bind(this),
	                    handler: this.update.bind(this),
	                    minimized: this.state.sidebarMinimized }),
	                _react2.default.createElement(
	                    'div',
	                    { className: minimized ? "content minimized" : "content" },
	                    type === null ? _react2.default.createElement(
	                        'div',
	                        { className: 'default' },
	                        _react2.default.createElement(
	                            'div',
	                            { className: 'message' },
	                            _react2.default.createElement('i', { className: 'fa fa-caret-left' }),
	                            ' Click on a ',
	                            _react2.default.createElement(
	                                'b',
	                                null,
	                                'family'
	                            ),
	                            ', ',
	                            _react2.default.createElement(
	                                'b',
	                                null,
	                                'genus'
	                            ),
	                            ', or ',
	                            _react2.default.createElement(
	                                'b',
	                                null,
	                                'species'
	                            ),
	                            ' to get started!'
	                        )
	                    ) : null,
	                    type === "family" ? _react2.default.createElement(_family2.default, { family: item }) : null,
	                    type === "genus" ? _react2.default.createElement(_genus2.default, { genus: item }) : null,
	                    type === "species" ? _react2.default.createElement(_species2.default, { species: item }) : null
	                )
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
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var self = this,
	                f = this.props.family,
	                selectedPhoto = this.state.selectedPhotoIndex,
	                thumbs = [];
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
	                        { className: 'secondary' },
	                        'family'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'description' },
	                    _react2.default.createElement('div', { dangerouslySetInnerHTML: this.createMarkup(f.descrip) })
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
	                _react2.default.createElement(
	                    'div',
	                    { className: 'photos' },
	                    thumbs
	                )
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

/***/ },

/***/ 182:
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
	        key: 'createMarkup',
	        value: function createMarkup(s) {
	            return { __html: s };
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var self = this,
	                g = this.props.genus,
	                selectedPhoto = this.state.selectedPhotoIndex,
	                thumbs = [];

	            var species = g.species.map(function (s, i) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: i },
	                    _react2.default.createElement(
	                        'a',
	                        { href: "/species/" + s.name },
	                        s.name
	                    )
	                );
	            });
	            if (g.photos && g.photos.length > 0) {
	                g.photos.forEach(function (link, index) {
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
	                    { className: 'textContent' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'description' },
	                        _react2.default.createElement('div', { dangerouslySetInnerHTML: this.createMarkup(g.descrip) })
	                    ),
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'species' },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'speciesTitle' },
	                            'Species'
	                        ),
	                        _react2.default.createElement(
	                            'ul',
	                            null,
	                            species
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
	                    image: g.photos[selectedPhoto].medium,
	                    imageName: g.photos[selectedPhoto].name,
	                    imageDescription: g.photos[selectedPhoto].description,
	                    original: g.photos[selectedPhoto].original,
	                    flickr_url: g.photos[selectedPhoto].flickr_url }) : null,
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

/***/ },

/***/ 186:
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

	var Species = function (_React$Component) {
	    _inherits(Species, _React$Component);

	    function Species() {
	        _classCallCheck(this, Species);

	        var _this = _possibleConstructorReturn(this, (Species.__proto__ || Object.getPrototypeOf(Species)).call(this));

	        _this.state = {
	            selectedPhotoIndex: null
	        };
	        return _this;
	    }

	    _createClass(Species, [{
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'nextPhoto',
	        value: function nextPhoto() {
	            var selectedPhoto = this.state.selectedPhotoIndex;
	            if (selectedPhoto < this.props.species.photos.length) {
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
	        key: 'render',
	        value: function render() {
	            var _this2 = this;

	            var self = this,
	                s = this.props.species,
	                selectedPhoto = this.state.selectedPhotoIndex,
	                thumbs = [];
	            if (s.photos && s.photos.length > 0) {
	                s.photos.forEach(function (link, index) {
	                    if (index == selectedPhoto) {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, className: 'selected' }));
	                    } else {
	                        thumbs.push(_react2.default.createElement('img', { key: index, src: link.thumb, onClick: function onClick() {
	                                return self.update('selectedPhotoIndex', index);
	                            } }));
	                    }
	                });
	            }
	            var links = s.links.map(function (link, index) {
	                return _react2.default.createElement(
	                    'li',
	                    { key: index },
	                    _react2.default.createElement(
	                        'a',
	                        { target: '_blank', href: link.url },
	                        link.name
	                    )
	                );
	            });
	            return _react2.default.createElement(
	                'div',
	                { className: 'species' },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'title' },
	                    _react2.default.createElement(
	                        'a',
	                        { href: '/species/' + s.name.replace(/ /g, '_') },
	                        _react2.default.createElement(
	                            'label',
	                            { className: 'main' },
	                            s.genus_name,
	                            ' ',
	                            _react2.default.createElement(
	                                'span',
	                                { className: 'speciesTitle' },
	                                s.name
	                            )
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'label',
	                        { className: 'secondary' },
	                        'species'
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'description' },
	                    _react2.default.createElement('div', { dangerouslySetInnerHTML: this.createMarkup(s.descrip) })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'links' },
	                    _react2.default.createElement(
	                        'ul',
	                        null,
	                        links
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
	                    image: s.photos[selectedPhoto].medium,
	                    imageName: s.photos[selectedPhoto].name,
	                    imageDescription: s.photos[selectedPhoto].description,
	                    original: s.photos[selectedPhoto].original,
	                    flickr_url: s.photos[selectedPhoto].flickr_url }) : null,
	                _react2.default.createElement(
	                    'div',
	                    { className: 'photos' },
	                    thumbs
	                )
	            );
	        }
	    }]);

	    return Species;
	}(_react2.default.Component);

	exports.default = Species;

/***/ },

/***/ 187:
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	function SidebarListItem(props) {
	    var classNames;

	    if (props.isSelected) {
	        classNames = "selected";
	    }

	    return _react2.default.createElement(
	        'li',
	        { className: classNames, key: props.id, value: props.item, onClick: props.onClick },
	        props.children
	    );
	}

	var SearchSidebar = function (_React$Component) {
	    _inherits(SearchSidebar, _React$Component);

	    function SearchSidebar() {
	        _classCallCheck(this, SearchSidebar);

	        var _this = _possibleConstructorReturn(this, (SearchSidebar.__proto__ || Object.getPrototypeOf(SearchSidebar)).call(this));

	        _this.state = {
	            selectedFamily: null,
	            selectedGenus: null,
	            selectedSpecies: null
	        };
	        return _this;
	    }

	    _createClass(SearchSidebar, [{
	        key: 'update',
	        value: function update(name, value) {
	            this.setState(_defineProperty({}, name, value));
	        }
	    }, {
	        key: 'familyClicked',
	        value: function familyClicked(item, e) {
	            this.update('selectedGenus', null);
	            this.update('selectedSpecies', null);
	            this.props.familyHandler(item, this.props.handler);
	            this.update('selectedFamily', item);
	        }
	    }, {
	        key: 'genusClicked',
	        value: function genusClicked(item, e) {
	            this.update('selectedSpecies', null);
	            this.update('selectedGenus', item);
	            this.props.genusHandler(item, this.props.handler);
	        }
	    }, {
	        key: 'speciesClicked',
	        value: function speciesClicked(item, e) {
	            this.props.speciesHandler(item, this.props.handler);
	            this.update('selectedSpecies', item);
	        }
	    }, {
	        key: 'hideSidebar',
	        value: function hideSidebar(e) {
	            var minimized = this.props.minimized;
	            this.props.handler('sidebarMinimized', !minimized);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            self = this;
	            var selectedFamily = this.state.selectedFamily,
	                selectedGenus = this.state.selectedGenus,
	                selectedSpecies = this.state.selectedSpecies,
	                minimized = this.props.minimized,
	                familyRows = self.props.tree.map(function (item) {
	                var isSelected = selectedFamily && selectedFamily.id == item.id;
	                return _react2.default.createElement(
	                    SidebarListItem,
	                    { isSelected: isSelected, value: item.id, key: item.id, onClick: function onClick(event) {
	                            return self.familyClicked(item, event);
	                        } },
	                    item.name
	                );
	            });

	            var generaRows = [];
	            if (selectedFamily) {
	                generaRows = selectedFamily.genera.map(function (item) {
	                    var isSelected = selectedGenus && selectedGenus.id == item.id;
	                    return _react2.default.createElement(
	                        SidebarListItem,
	                        { isSelected: isSelected, value: item.id, key: item.id, onClick: function onClick(event) {
	                                return self.genusClicked(item, event);
	                            } },
	                        item.name
	                    );
	                });
	            } else if (!(selectedFamily || selectedSpecies) || !(selectedFamily || selectedGenus) || selectedGenus) {
	                self.props.tree.forEach(function (family) {
	                    family.genera.forEach(function (item) {
	                        var isSelected = selectedGenus && selectedGenus.id == item.id;
	                        generaRows.push(_react2.default.createElement(
	                            SidebarListItem,
	                            { isSelected: isSelected, value: item.id, key: item.id, onClick: function onClick(event) {
	                                    return self.genusClicked(item, event);
	                                } },
	                            item.name
	                        ));
	                    });
	                });
	                // sort alphabetically
	                generaRows.sort(function (a, b) {
	                    if (a.props.children < b.props.children) return -1;
	                    if (a.props.children > b.props.children) return 1;
	                    return 0;
	                });
	            }

	            var speciesRows = [];
	            if (selectedGenus) {
	                speciesRows = selectedGenus.species.map(function (item) {
	                    var isSelected = selectedSpecies && selectedSpecies.id == item.id;
	                    return _react2.default.createElement(
	                        SidebarListItem,
	                        { isSelected: isSelected, value: item.id, key: item.id, onClick: function onClick(event) {
	                                return self.speciesClicked(item, event);
	                            } },
	                        item.name
	                    );
	                });
	            } else if (!(selectedGenus || selectedFamily)) {
	                self.props.tree.forEach(function (family) {
	                    family.genera.forEach(function (genus) {
	                        genus.species.forEach(function (item) {
	                            var isSelected = selectedSpecies && selectedSpecies.id == item.id;
	                            speciesRows.push(_react2.default.createElement(
	                                SidebarListItem,
	                                { isSelected: isSelected, value: item.id, key: item.id, onClick: function onClick(event) {
	                                        return self.speciesClicked(item, event);
	                                    } },
	                                item.name
	                            ));
	                        });
	                    });
	                });
	                // sort alphabetically
	                speciesRows.sort(function (a, b) {
	                    if (a.props.children < b.props.children) return -1;
	                    if (a.props.children > b.props.children) return 1;
	                    return 0;
	                });
	            }

	            return _react2.default.createElement(
	                'div',
	                { id: this.props.id, className: minimized ? "searchbar minimized" : "searchbar" },
	                _react2.default.createElement(
	                    'div',
	                    { className: 'title' },
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
	                    'div',
	                    { className: 'closeButton', onClick: function onClick(event) {
	                            return self.hideSidebar(event);
	                        } },
	                    minimized ? _react2.default.createElement('i', { className: 'fa fa-angle-right' }) : _react2.default.createElement('i', { className: 'fa fa-angle-left' })
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'familyList' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'subtitle' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'Family'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'ul',
	                        null,
	                        familyRows
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'generaList' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'subtitle' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'Genus'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'ul',
	                        null,
	                        generaRows
	                    )
	                ),
	                _react2.default.createElement(
	                    'div',
	                    { className: 'speciesList' },
	                    _react2.default.createElement(
	                        'div',
	                        { className: 'subtitle' },
	                        _react2.default.createElement(
	                            'label',
	                            null,
	                            'Species'
	                        )
	                    ),
	                    _react2.default.createElement(
	                        'ul',
	                        null,
	                        speciesRows
	                    )
	                )
	            );
	        }
	    }]);

	    return SearchSidebar;
	}(_react2.default.Component);

	exports.default = SearchSidebar;

/***/ }

});
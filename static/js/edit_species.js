webpackJsonp([5],[
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
	            genus_id: pg.species.genus_id || pg.genera[0].id || 0,
	            album_id: pg.species.album_id || 0,
	            links: pg.species.links || []
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
	            if (!this.state.album_id) {
	                alert('Please choose a photo album, then try again.');
	                return;
	            }

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
	                    album_id: this.state.album_id || null,
	                    links: this.state.links,
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
	                    title: 'Genus',
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
	                _react2.default.createElement(Dropper, {
	                    id: 'photoAlbum',
	                    title: 'Photo Album',
	                    'default': this.state.album_id,
	                    list: pg.photo_albums,
	                    handler: this.handleInputChange.bind(this, 'album_id') }),
	                _react2.default.createElement(PhotoArray, {
	                    photos: pg.species.photos }),
	                _react2.default.createElement('hr', null),
	                _react2.default.createElement(Linker, {
	                    links: this.state.links,
	                    handler: this.update.bind(this, 'links') }),
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

	var Linker = function (_React$Component4) {
	    _inherits(Linker, _React$Component4);

	    function Linker() {
	        _classCallCheck(this, Linker);

	        var _this4 = _possibleConstructorReturn(this, Object.getPrototypeOf(Linker).call(this));

	        _this4.state = {
	            newLinkName: "",
	            newLinkURL: "",
	            showAddLinkInput: false
	        };
	        return _this4;
	    }

	    _createClass(Linker, [{
	        key: 'showInput',
	        value: function showInput() {
	            this.setState({
	                showAddLinkInput: true
	            });
	        }
	    }, {
	        key: 'saveLink',
	        value: function saveLink() {
	            if (this.state.newLinkName.length === 0 || this.state.newLinkURL.length === 0) {
	                alert('try again. something is missing.');
	            } else {
	                this.props.links.push({ name: this.state.newLinkName, url: this.state.newLinkURL });
	                this.props.handler(this.props.links);
	            }
	            this.setState({
	                newLinkName: "",
	                newLinkURL: "",
	                showAddLinkInput: false
	            });
	        }
	    }, {
	        key: 'removeLink',
	        value: function removeLink(e) {
	            var index = this.props.links.indexOf(e);
	            this.props.links.splice(index, 1);
	            this.props.handler(this.props.links);
	        }
	    }, {
	        key: 'updateLinkInput',
	        value: function updateLinkInput(name, e) {
	            this.setState(_defineProperty({}, name, e.target.value));
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            var rows = [];
	            var _iteratorNormalCompletion = true;
	            var _didIteratorError = false;
	            var _iteratorError = undefined;

	            try {
	                for (var _iterator = this.props.links[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
	                    var item = _step.value;

	                    rows.push(_react2.default.createElement(Link, { key: item.name,
	                        name: item.name,
	                        url: item.url,
	                        handler: this.removeLink.bind(this) }));
	                }
	            } catch (err) {
	                _didIteratorError = true;
	                _iteratorError = err;
	            } finally {
	                try {
	                    if (!_iteratorNormalCompletion && _iterator.return) {
	                        _iterator.return();
	                    }
	                } finally {
	                    if (_didIteratorError) {
	                        throw _iteratorError;
	                    }
	                }
	            }

	            return _react2.default.createElement(
	                'div',
	                { id: 'linker' },
	                'Links:',
	                _react2.default.createElement(
	                    'table',
	                    { className: 'linksTable' },
	                    _react2.default.createElement(
	                        'thead',
	                        null,
	                        _react2.default.createElement(
	                            'tr',
	                            null,
	                            _react2.default.createElement(
	                                'th',
	                                null,
	                                'Name'
	                            ),
	                            _react2.default.createElement(
	                                'th',
	                                null,
	                                'URL'
	                            ),
	                            _react2.default.createElement('th', null)
	                        )
	                    ),
	                    rows
	                ),
	                !this.state.showAddLinkInput ? _react2.default.createElement(
	                    'div',
	                    { className: 'addLinkBtn', onClick: this.showInput.bind(this) },
	                    '+ add URL'
	                ) : null,
	                this.state.showAddLinkInput ? _react2.default.createElement(
	                    'div',
	                    { className: 'addLinkInput' },
	                    _react2.default.createElement('input', {
	                        placeholder: 'display name',
	                        value: this.state.newLinkName,
	                        onChange: this.updateLinkInput.bind(this, 'newLinkName') }),
	                    'and ',
	                    _react2.default.createElement('input', {
	                        placeholder: 'URL',
	                        value: this.state.newLinkURL,
	                        onChange: this.updateLinkInput.bind(this, 'newLinkURL') }),
	                    _react2.default.createElement(
	                        'span',
	                        { className: 'btn-std', onClick: this.saveLink.bind(this) },
	                        'add'
	                    )
	                ) : null
	            );
	        }
	    }]);

	    return Linker;
	}(_react2.default.Component);

	var Link = function (_React$Component5) {
	    _inherits(Link, _React$Component5);

	    function Link() {
	        _classCallCheck(this, Link);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(Link).apply(this, arguments));
	    }

	    _createClass(Link, [{
	        key: 'delete',
	        value: function _delete() {
	            this.props.handler(this.props);
	        }
	    }, {
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'tr',
	                { className: 'link' },
	                _react2.default.createElement(
	                    'td',
	                    { className: 'title' },
	                    this.props.name
	                ),
	                _react2.default.createElement(
	                    'td',
	                    null,
	                    _react2.default.createElement(
	                        'a',
	                        { className: 'url', href: this.props.url },
	                        this.props.url
	                    )
	                ),
	                _react2.default.createElement(
	                    'td',
	                    null,
	                    _react2.default.createElement('span', { className: 'delete', onClick: this.delete.bind(this) })
	                )
	            );
	        }
	    }]);

	    return Link;
	}(_react2.default.Component);

	var Dropper = function (_React$Component6) {
	    _inherits(Dropper, _React$Component6);

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

	var Saver = function (_React$Component7) {
	    _inherits(Saver, _React$Component7);

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

	var PhotoArray = function (_React$Component8) {
	    _inherits(PhotoArray, _React$Component8);

	    function PhotoArray() {
	        _classCallCheck(this, PhotoArray);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(PhotoArray).apply(this, arguments));
	    }

	    _createClass(PhotoArray, [{
	        key: 'render',
	        value: function render() {
	            var photoEditers = [];
	            if (this.props.photos) {
	                this.props.photos.forEach(function (item) {
	                    photoEditers.push(_react2.default.createElement(PhotoEditer, { img: item }));
	                });
	            }
	            return _react2.default.createElement(
	                'div',
	                { className: 'photoArray' },
	                photoEditers
	            );
	        }
	    }]);

	    return PhotoArray;
	}(_react2.default.Component);

	var PhotoEditer = function (_React$Component9) {
	    _inherits(PhotoEditer, _React$Component9);

	    function PhotoEditer() {
	        _classCallCheck(this, PhotoEditer);

	        return _possibleConstructorReturn(this, Object.getPrototypeOf(PhotoEditer).apply(this, arguments));
	    }

	    _createClass(PhotoEditer, [{
	        key: 'render',
	        value: function render() {
	            return _react2.default.createElement(
	                'div',
	                { className: 'photoEditer' },
	                _react2.default.createElement('img', { src: this.props.img })
	            );
	        }
	    }]);

	    return PhotoEditer;
	}(_react2.default.Component);

	if (self.fetch) {} else {
	    console.log('Unsupported browser. Please use Firefox or Google Chrome');
	}

	exports.default = App;

	_reactDom2.default.render(_react2.default.createElement(App, null), document.getElementById('app'));

/***/ }
]);
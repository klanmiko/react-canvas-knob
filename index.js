'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Knob = function (_React$Component) {
  _inherits(Knob, _React$Component);

  function Knob(props) {
    _classCallCheck(this, Knob);

    var _this = _possibleConstructorReturn(this, (Knob.__proto__ || Object.getPrototypeOf(Knob)).call(this, props));

    _this.getArcToValue = function () {
      return _this.__getArcToValue__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.getCanvasScale = function () {
      return _this.__getCanvasScale__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.inputStyle = function () {
      return _this.__inputStyle__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.renderCenter = function () {
      return _this.__renderCenter__REACT_HOT_LOADER__.apply(_this, arguments);
    };

    _this.w = _this.props.width || 200;
    _this.h = _this.props.height || _this.w;
    _this.cursorExt = _this.props.cursor === true ? 0.3 : _this.props.cursor / 100;
    _this.angleArc = _this.props.angleArc * Math.PI / 180;
    _this.angleOffset = _this.props.angleOffset * Math.PI / 180;
    _this.startAngle = 1.5 * Math.PI + _this.angleOffset;
    _this.endAngle = 1.5 * Math.PI + _this.angleOffset + _this.angleArc;
    _this.digits = 4;
    return _this;
  }

  _createClass(Knob, [{
    key: '__renderCenter__REACT_HOT_LOADER__',
    value: function __renderCenter__REACT_HOT_LOADER__() {
      return this.__renderCenter__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__inputStyle__REACT_HOT_LOADER__',
    value: function __inputStyle__REACT_HOT_LOADER__() {
      return this.__inputStyle__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getCanvasScale__REACT_HOT_LOADER__',
    value: function __getCanvasScale__REACT_HOT_LOADER__() {
      return this.__getCanvasScale__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: '__getArcToValue__REACT_HOT_LOADER__',
    value: function __getArcToValue__REACT_HOT_LOADER__() {
      return this.__getArcToValue__REACT_HOT_LOADER__.apply(this, arguments);
    }
  }, {
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.drawCanvas();
      if (!this.props.readOnly) {
        this.canvasRef.addEventListener('touchstart', this.handleTouchStart, { passive: false });
      }
    }
  }, {
    key: 'componentWillReceiveProps',
    value: function componentWillReceiveProps(nextProps) {
      if (nextProps.width && this.w !== nextProps.width) {
        this.w = nextProps.width;
      }
      if (nextProps.height && this.h !== nextProps.height) {
        this.h = nextProps.height;
      }
    }
  }, {
    key: 'componentDidUpdate',
    value: function componentDidUpdate() {
      this.drawCanvas();
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      this.canvasRef.removeEventListener('touchstart', this.handleTouchStart);
    }
  }, {
    key: '__getArcToValue__REACT_HOT_LOADER__',


    // Calculate ratio to scale canvas to avoid blurriness on HiDPI devices
    value: function __getArcToValue__REACT_HOT_LOADER__(v, max) {
      var startAngle = void 0;
      var endAngle = void 0;
      var angle = v * this.angleArc / max;
      if (!this.props.clockwise) {
        startAngle = this.endAngle + 0.00001;
        endAngle = startAngle - angle - 0.00001;
      } else {
        startAngle = this.startAngle - 0.00001;
        endAngle = startAngle + angle + 0.00001;
      }
      if (this.props.cursor) {
        startAngle = endAngle - this.cursorExt;
        endAngle += this.cursorExt;
      }
      return {
        startAngle: startAngle,
        endAngle: endAngle,
        acw: !this.props.clockwise && !this.props.cursor
      };
    }
  }, {
    key: '__getCanvasScale__REACT_HOT_LOADER__',
    value: function __getCanvasScale__REACT_HOT_LOADER__(ctx) {
      var devicePixelRatio = window.devicePixelRatio || window.screen.deviceXDPI / window.screen.logicalXDPI || // IE10
      1;
      var backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
      return devicePixelRatio / backingStoreRatio;
    }
  }, {
    key: '__inputStyle__REACT_HOT_LOADER__',
    value: function __inputStyle__REACT_HOT_LOADER__() {
      return {
        width: (this.w / 2 + 4 >> 0) + 'px',
        height: (this.w / 3 >> 0) + 'px',
        position: 'absolute',
        verticalAlign: 'middle',
        marginTop: (this.w / 3 - 10 >> 0) + 'px',
        marginLeft: (this.w / 4 + 2 >> 0) + 'px',
        border: 0,
        background: 'none',
        font: this.props.fontWeight + ' ' + (this.w / this.digits >> 0) + 'px ' + this.props.font,
        textAlign: 'center',
        color: this.props.inputColor || this.props.sColor,
        padding: '0px',
        WebkitAppearance: 'none',
        top: "0px"
      };
    }
  }, {
    key: 'drawCanvas',
    value: function drawCanvas() {
      var ctx = this.canvasRef.getContext('2d');
      var scale = this.getCanvasScale(ctx);
      this.canvasRef.width = this.w * scale; // clears the canvas
      this.canvasRef.height = this.h * scale;
      ctx.scale(scale, scale);
      this.xy = this.w / 2; // coordinates of canvas center
      this.lineWidth = Math.max(5, this.props.thickness * this.xy / 100);
      this.radius = this.xy - this.lineWidth / 2;
      ctx.lineWidth = this.lineWidth;
      ctx.lineCap = this.props.lineCap;
      // background arc
      ctx.beginPath();
      ctx.strokeStyle = this.props.bgColor;
      ctx.arc(this.xy, this.xy, this.radius, this.endAngle - 0.00001, this.startAngle + 0.00001, true);
      ctx.stroke();
      // foreground arc
      var h = this.getArcToValue(this.props.hours, 24);
      var m = this.getArcToValue(this.props.minutes, 60);
      var s = this.getArcToValue(this.props.seconds, 60);

      ctx.beginPath();
      ctx.strokeStyle = this.props.hColor;
      ctx.arc(this.xy, this.xy, this.radius - this.lineWidth * 2, h.startAngle, h.endAngle, h.acw);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = this.props.mColor;
      ctx.arc(this.xy, this.xy, this.radius - this.lineWidth, m.startAngle, m.endAngle, m.acw);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = this.props.sColor;
      ctx.arc(this.xy, this.xy, this.radius, s.startAngle, s.endAngle, s.acw);
      ctx.stroke();
    }
  }, {
    key: '__renderCenter__REACT_HOT_LOADER__',
    value: function __renderCenter__REACT_HOT_LOADER__() {
      var _props = this.props,
          displayCustom = _props.displayCustom,
          displayNumber = _props.displayNumber,
          readOnly = _props.readOnly;


      if (displayNumber) {
        var chooseTimeDisplay = function chooseTimeDisplay() {
          function stringify(e) {
            return e < 10 ? "0" + e : e + "";
          };
          if (this.props.hours > 0) {
            return _react2.default.createElement(
              'div',
              { style: this.inputStyle() },
              _react2.default.createElement(
                'p',
                null,
                stringify(this.props.hours)
              ),
              _react2.default.createElement(
                'p',
                { style: { fontSize: this.w / 10 + "px" } },
                'hours'
              )
            );
          } else if (this.props.minutes > 0) {
            return _react2.default.createElement(
              'div',
              { style: this.inputStyle() },
              _react2.default.createElement(
                'p',
                null,
                stringify(this.props.minutes)
              ),
              _react2.default.createElement(
                'p',
                { style: { fontSize: this.w / 10 + "px" } },
                'minutes'
              )
            );
          } else {
            return _react2.default.createElement(
              'div',
              { style: this.inputStyle() },
              _react2.default.createElement(
                'p',
                null,
                stringify(this.props.seconds)
              ),
              _react2.default.createElement(
                'p',
                { style: { fontSize: this.w / 10 + "px" } },
                'seconds'
              )
            );
          }
        };

        return chooseTimeDisplay.call(this);
      } else if (displayCustom && typeof displayCustom === 'function') {
        return displayCustom();
      }
      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var _this2 = this;

      var _props2 = this.props,
          canvasClassName = _props2.canvasClassName,
          className = _props2.className,
          title = _props2.title,
          value = _props2.value;


      return _react2.default.createElement(
        'div',
        {
          className: className,
          style: { width: this.w, height: this.h, display: 'inline-block' }
        },
        _react2.default.createElement('canvas', {
          ref: function ref(_ref) {
            _this2.canvasRef = _ref;
          },
          className: canvasClassName,
          style: { width: '100%', height: '100%' },
          title: title ? title + ': ' + value : value
        }),
        this.renderCenter()
      );
    }
  }]);

  return Knob;
}(_react2.default.Component);

Knob.propTypes = {
  minutes: _propTypes2.default.number.isRequired,
  hours: _propTypes2.default.number.isRequired,
  seconds: _propTypes2.default.number.isRequired,
  width: _propTypes2.default.number,
  height: _propTypes2.default.number,
  thickness: _propTypes2.default.number,
  lineCap: _propTypes2.default.oneOf(['butt', 'round']),
  bgColor: _propTypes2.default.string,
  mColor: _propTypes2.default.string,
  sColor: _propTypes2.default.string,
  hColor: _propTypes2.default.string,
  inputColor: _propTypes2.default.string,
  font: _propTypes2.default.string,
  fontWeight: _propTypes2.default.string,
  clockwise: _propTypes2.default.bool,
  cursor: _propTypes2.default.oneOfType([_propTypes2.default.number, _propTypes2.default.bool]),
  stopper: _propTypes2.default.bool,
  displayCustom: _propTypes2.default.func,
  displayNumber: _propTypes2.default.bool.isRequired,
  angleArc: _propTypes2.default.number,
  angleOffset: _propTypes2.default.number,
  title: _propTypes2.default.string,
  className: _propTypes2.default.string,
  canvasClassName: _propTypes2.default.string
};
Knob.defaultProps = {
  hours: 0,
  minutes: 0,
  seconds: 0,
  thickness: 0.35,
  width: 200,
  height: 200,
  lineCap: 'butt',
  bgColor: '#EEE',
  sColor: '#EA2',
  mColor: '#EA2',
  hColor: '#EA2',
  inputColor: '',
  font: 'Arial',
  fontWeight: 'bold',
  clockwise: true,
  cursor: false,
  stopper: true,
  displayNumber: true,
  angleArc: 360,
  angleOffset: 0,
  className: null,
  canvasClassName: null
};
var _default = Knob;
exports.default = _default;
;

var _temp = function () {
  if (typeof __REACT_HOT_LOADER__ === 'undefined') {
    return;
  }

  __REACT_HOT_LOADER__.register(Knob, 'Knob', 'Knob.js');

  __REACT_HOT_LOADER__.register(_default, 'default', 'Knob.js');
}();

;

import React from 'react';
import PropTypes from 'prop-types';

class Knob extends React.Component {
  static propTypes = {
    minutes: PropTypes.number.isRequired,
    hours: PropTypes.number.isRequired,
    seconds: PropTypes.number.isRequired,
    width: PropTypes.number,
    height: PropTypes.number,
    thickness: PropTypes.number,
    lineCap: PropTypes.oneOf(['butt', 'round']),
    bgColor: PropTypes.string,
    mColor: PropTypes.string,
    sColor: PropTypes.string,
    hColor: PropTypes.string,
    inputColor: PropTypes.string,
    font: PropTypes.string,
    fontWeight: PropTypes.string,
    clockwise: PropTypes.bool,
    cursor: PropTypes.oneOfType([
      PropTypes.number,
      PropTypes.bool,
    ]),
    stopper: PropTypes.bool,
    displayCustom: PropTypes.func,
    displayNumber: PropTypes.bool.isRequired,
    angleArc: PropTypes.number,
    angleOffset: PropTypes.number,
    title: PropTypes.string,
    className: PropTypes.string,
    canvasClassName: PropTypes.string,
  };

  static defaultProps = {
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
    canvasClassName: null,
  };

  constructor(props) {
    super(props);
    this.w = this.props.width || 200;
    this.h = this.props.height || this.w;
    this.cursorExt = this.props.cursor === true ? 0.3 : this.props.cursor / 100;
    this.angleArc = this.props.angleArc * Math.PI / 180;
    this.angleOffset = this.props.angleOffset * Math.PI / 180;
    this.startAngle = (1.5 * Math.PI) + this.angleOffset;
    this.endAngle = (1.5 * Math.PI) + this.angleOffset + this.angleArc;
    this.digits = 4;
  }

  componentDidMount() {
    this.drawCanvas();
    if (!this.props.readOnly) {
      this.canvasRef.addEventListener('touchstart', this.handleTouchStart, { passive: false });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.width && this.w !== nextProps.width) {
      this.w = nextProps.width;
    }
    if (nextProps.height && this.h !== nextProps.height) {
      this.h = nextProps.height;
    }
  }

  componentDidUpdate() {
    this.drawCanvas();
  }

  componentWillUnmount() {
    this.canvasRef.removeEventListener('touchstart', this.handleTouchStart);
  }

  getArcToValue = (v, max) => {
    let startAngle;
    let endAngle;
    const angle = (v * this.angleArc) / (max)
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
      startAngle,
      endAngle,
      acw: !this.props.clockwise && !this.props.cursor,
    };
  };

  // Calculate ratio to scale canvas to avoid blurriness on HiDPI devices
  getCanvasScale = (ctx) => {
    const devicePixelRatio = window.devicePixelRatio ||
      window.screen.deviceXDPI / window.screen.logicalXDPI || // IE10
      1;
    const backingStoreRatio = ctx.webkitBackingStorePixelRatio || 1;
    return devicePixelRatio / backingStoreRatio;
  };

  inputStyle = () => ({
    width: `${((this.w / 2) + 4) >> 0}px`,
    height: `${(this.w / 3) >> 0}px`,
    position: 'absolute',
    verticalAlign: 'middle',
    marginTop: `${((this.w / 3) - 10) >> 0}px`,
    marginLeft: `${((this.w / 4) + 2) >> 0}px`,
    border: 0,
    background: 'none',
    font: `${this.props.fontWeight} ${(this.w / this.digits) >> 0}px ${this.props.font}`,
    textAlign: 'center',
    color: this.props.inputColor || this.props.sColor,
    padding: '0px',
    WebkitAppearance: 'none',
    top: "0px"
  });

  drawCanvas() {
    const ctx = this.canvasRef.getContext('2d');
    const scale = this.getCanvasScale(ctx);
    this.canvasRef.width = this.w * scale; // clears the canvas
    this.canvasRef.height = this.h * scale;
    ctx.scale(scale, scale);
    this.xy = this.w / 2; // coordinates of canvas center
    this.lineWidth = Math.max(5, this.props.thickness * this.xy / 100);
    this.radius = this.xy - (this.lineWidth / 2);
    ctx.lineWidth = this.lineWidth;
    ctx.lineCap = this.props.lineCap;
    // background arc
    ctx.beginPath();
    ctx.strokeStyle = this.props.bgColor;
    ctx.arc(
      this.xy,
      this.xy,
      this.radius,
      this.endAngle - 0.00001,
      this.startAngle + 0.00001,
      true
    );
    ctx.stroke();
    // foreground arc
    const h = this.getArcToValue(this.props.hours, 24);
    const m = this.getArcToValue(this.props.minutes, 60);
    const s = this.getArcToValue(this.props.seconds, 60);

    ctx.beginPath();
    ctx.strokeStyle = this.props.hColor;
    ctx.arc(
      this.xy,
      this.xy,
      this.radius - this.lineWidth * 2,
      h.startAngle,
      h.endAngle,
      h.acw
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = this.props.mColor;
    ctx.arc(
      this.xy,
      this.xy,
      this.radius - this.lineWidth,
      m.startAngle,
      m.endAngle,
      m.acw
    );
    ctx.stroke();

    ctx.beginPath();
    ctx.strokeStyle = this.props.sColor;
    ctx.arc(
      this.xy,
      this.xy,
      this.radius,
      s.startAngle,
      s.endAngle,
      s.acw
    );
    ctx.stroke();
  }

  renderCenter = () => {
    const {
      displayCustom,
      displayNumber,
      readOnly,
    } = this.props;

    if (displayNumber) {
      function chooseTimeDisplay() {
        function stringify(e) {return e < 10 ? "0" + e : e + "" };
        if(this.props.hours > 0) {
          return (
            <div style={this.inputStyle()}>
              <p>{stringify(this.props.hours)}</p>
              <p style={{fontSize: this.w / 10 + "px"}}>hours</p>
            </div>
          )
        }
        else if(this.props.minutes > 0) {
          return (
            <div style={this.inputStyle()}>
              <p>{stringify(this.props.minutes)}</p>
              <p style={{fontSize: this.w / 10 + "px"}}>minutes</p>
            </div>
          )
        }
        else {
          return (
            <div style={this.inputStyle()}>
              <p>{stringify(this.props.seconds)}</p>
              <p style={{fontSize: this.w / 10 + "px"}}>seconds</p>
            </div>
          )
        }
      }
      return chooseTimeDisplay.call(this);
    } else if (displayCustom && typeof displayCustom === 'function') {
      return displayCustom();
    }
    return null;
  };

  render() {
    const {
      canvasClassName,
      className,
      title,
      value,
    } = this.props;

    return (
      <div
        className={className}
        style={{ width: this.w, height: this.h, display: 'inline-block', flexShrink: 0 }}
      >
        <canvas
          ref={(ref) => { this.canvasRef = ref; }}
          className={canvasClassName}
          style={{ width: '100%', height: '100%' }}
          title={title ? `${title}: ${value}` : value}
        />
        {this.renderCenter()}
      </div>
    );
  }
}

export default Knob;

# react-time-knob

[jQuery Knob](https://github.com/aterrien/jQuery-Knob) rebuilt with React (no jQuery). This is an HTML5 Canvas-based component that serves as a circular time display with three rings to display the hours, seconds, and minutes given in its props.

## Installation
`npm install react-time-knob --save`

## Example usage

```js
import React from 'react';
import Knob from 'react-time-knob';

class MyComponent extends React.Component {
  state = {hours: 1, minutes: 24, seconds: 14};
  render() {
    return (
      <Knob
        hours={this.state.hours}
        minutes={this.state.minutes}
        seconds={this.state.seconds}
      />
    );
  }
}
```

## Properties
| name | description | default |
|------|-------------|---------|
|`hours`| hours to display | `0` |
|`minutes`| minutes to display | `0` |
|`seconds`| seconds to display | `0` |
|`width` or `height`|dimension of square (px)|`200`|
|`thickness`|gauge thickness in percent of width |`0.35`|
|`lineCap`|gauge stroke ending style (`butt` or `round`)|`'butt'`|
|`bgColor`|background color|`'#EEE'`|
|`sColor`|second ring color|`'#EA2'`|
|`mColor`|minute ring color|`'#EA2'`|
|`hColor`|hour ring color|`'#EA2'`|
|`inputColor`|text color|`fgColor`|
|`font`|font family|`'Arial'`|
|`fontWeight`|font weight|`'bold'`|
|`clockwise`|direction of progression|`true`|
|`cursor`|use cursor display mode - give width value or `true` which uses the default cursor width (30)|`false`|
|`displayCustom`|function that will render your custom component in the centre. (Make sure to set `displayInput` as `false`, as that takes priority)|n/a|
|`angleArc`|arc size in degrees|`360`|
|`angleOffset`|starting angle in degrees|`0`|
|`title`|adds title attribute to the wheel|`value`|
|`className`|custom className to be applied to the container element|`null`|
|`canvasClassName`|custom className to be applied to the canvas element|`null`|

## Contributing
* Make changes to Knob.js, then run `npm run babel` to transpile.

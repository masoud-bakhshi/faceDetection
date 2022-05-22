import React from "react";
import "./App.css";
import objectDetectionSketch from "./ObjectDetectionSketch";

import { ReactP5Wrapper } from "react-p5-wrapper";

export default class app extends React.Component {
  render() {
    return (
      <div>
        <div>masoud</div>
        <ReactP5Wrapper sketch={objectDetectionSketch} />
      </div>
    );
  }
}

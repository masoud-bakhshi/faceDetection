import "p5/lib/addons/p5.dom";
import * as cocoSsd from "@tensorflow-models/coco-ssd";
import * as faceapi from "face-api.js";

const MODEL_URL = "/models";

export default function sketch(p) {
  let capture = null;
  let cocossdModel = null;

  let cocoDrawings = [];
  let faceDrawings = [];

  function showCocoSSDResults(results) {
    cocoDrawings = results;
  }

  function showFaceDetectionData(data) {
    faceDrawings = data;
  }

  p.setup = async function () {
    await faceapi.loadSsdMobilenetv1Model(MODEL_URL);
    await faceapi.loadAgeGenderModel(MODEL_URL);
    await faceapi.loadFaceExpressionModel(MODEL_URL);
    await faceapi.loadFaceLandmarkModel(MODEL_URL);
    p.createCanvas(window.innerWidth - 10, window.innerHeight - 10);
    const constraints = {
      video: {
        mandatory: {
          minWidth: window.innerWidth - 10,
          minHeight: window.innerHeight - 10,
        },
        // optional: [{ maxFrameRate: 40 }],
      },
      audio: false,
    };

    capture = p.createCapture(constraints, () => {});

    capture.id("video_element");
   // capture.size(window.innerWidth - 10, window.innerHeight - 10);
    capture.hide();

    cocoSsd
      .load()
      .then((model) => {
        try {
          cocossdModel = model;
        } catch (e) {
          console.log(e);
        }
      })
      .catch((e) => {
        console.log("Error occured : ", e);
      });
  };

  p.draw = async () => {
    if (!capture) {
      return;
    }
    p.background(255);
    p.image(capture, 0, 0);
    p.fill(0, 0, 0, 0);

    cocoDrawings.map((drawing) => {
      if (drawing) {
        p.textSize(20);
        p.strokeWeight(1);
        const textX = drawing.bbox[0] + drawing.bbox[2];
        const textY = drawing.bbox[1] + drawing.bbox[3];

        const confidenetext = "Confidence: " + drawing.score.toFixed(1);
        const textWidth = p.textWidth(confidenetext);

        const itemTextWidth = p.textWidth(drawing.class);
        p.text(drawing.class, textX - itemTextWidth - 10, textY - 50);

        p.text(confidenetext, textX - textWidth - 10, textY - 10);
        // p.strokeWeight(4);
        // p.stroke('rgb(100%,100%,100%)');
        // p.rect(drawing.bbox[0], drawing.bbox[1], drawing.bbox[2], drawing.bbox[3]);
      }
    });

    faceDrawings.map((drawing) => {
      if (drawing) {
        p.textSize(15);
        p.strokeWeight(1);

        const textX = drawing.detection.box._x + drawing.detection.box._width;
        const textY = drawing.detection.box._y + drawing.detection.box._height;

        const confidencetext = "Gender: " + drawing.gender;
        const textWidth = p.textWidth(confidencetext);
        p.text(confidencetext, textX - textWidth - 10, textY - 60);

        const agetext = "Age: " + drawing.age.toFixed(0);
        const ageTextWidth = p.textWidth(agetext);
        p.text(agetext, textX - ageTextWidth - 10, textY - 30);

        const copiedExpression = drawing.expressions;
        const expressions = Object.keys(copiedExpression).map((key) => {
          const value = copiedExpression[key];
          return value;
        });

        const max = Math.max(...expressions);

        const expression_value = Object.keys(copiedExpression).filter((key) => {
          return copiedExpression[key] === max;
        })[0];

        const expressiontext = "Mood: " + expression_value;
        const expressionWidth = p.textWidth(expressiontext);
        p.text(expressiontext, textX - expressionWidth - 10, textY - 10);

        p.strokeWeight(2);
        p.stroke("rgb(100%,100%,100%)");
        p.rect(
          drawing.detection.box._x,
          drawing.detection.box._y,
          drawing.detection.box._width,
          drawing.detection.box._height
        );

        // p.background(255);

        // p.fill(0, 0, 0, 0);
        p.strokeWeight(1);
        // p.stroke("rgb(50%,80%,30%)");
        // p.background("rgb(50%,80%,30%)");
        const expressiontext1 = "Resume";
        const expressionWidth1 = p.textWidth(expressiontext1);

        p.text(
          expressiontext1,
          drawing.detection.box._x - 62,
          drawing.detection.box._y - 30
        );
        p.rect(
          drawing.detection.box._x - 65,
          drawing.detection.box._y - 65,
          60,
          60
        );
        const expressiontext2 = "Code";
        const expressionWidth2 = p.textWidth(expressiontext1);
        p.text(
          expressiontext2,
          drawing.detection.box._x + drawing.detection.box._width + 15,
          drawing.detection.box._y - 32
        );
        p.rect(
          drawing.detection.box._x + drawing.detection.box._width + 5,
          drawing.detection.box._y - 65,
          60,
          60
        );

        const expressiontext3 = "Profile";
        const expressionWidth3 = p.textWidth(expressiontext3);

        p.text(
          expressiontext3,
          drawing.detection.box._x - 62,
          drawing.detection.box._y + drawing.detection.box._height + 40
        );
        p.rect(
          drawing.detection.box._x - 65,
          drawing.detection.box._y + drawing.detection.box._height + 5,
          60,
          60
        );

        const expressiontext4 = "Timeline";
        const expressionWidth4 = p.textWidth(expressiontext4);
        p.text(
          expressiontext4,
          drawing.detection.box._x + drawing.detection.box._width + 5,
          drawing.detection.box._y + drawing.detection.box._height + 40
        );
        p.rect(
          drawing.detection.box._x + drawing.detection.box._width + 5,
          drawing.detection.box._y + drawing.detection.box._height + 5,
          60,
          60
        );

        //*********************************************** */
        const expressiontext5 = "Chat";
        const expressionWidth5 = p.textWidth(expressiontext5);
        p.text(
          expressiontext5,
          drawing.detection.box._x + drawing.detection.box._width / 2 - 22,
          drawing.detection.box._y +
            drawing.detection.box._height +
            drawing.detection.box._height / 4 +
            40
        );
        p.rect(
          drawing.detection.box._x + drawing.detection.box._width / 2 - 25,
          drawing.detection.box._y +
            drawing.detection.box._height +
            drawing.detection.box._height / 4 +
            5,
          60,
          60
        );
        const expressiontext6 = "Dashboard";
        const expressionWidth6 = p.textWidth(expressiontext6);
        p.text(
          expressiontext6,
          drawing.detection.box._x + drawing.detection.box._width / 2 - 25,
          drawing.detection.box._y - drawing.detection.box._height / 4 - 32
        );
        p.rect(
          drawing.detection.box._x + drawing.detection.box._width / 2 - 25,
          drawing.detection.box._y - drawing.detection.box._height / 4 - 65,
          74,
          60
        );

        const expressiontext8 = "Result";
        const expressionWidth8 = p.textWidth(expressiontext8);
        p.text(
          expressiontext8,
          drawing.detection.box._x +
            drawing.detection.box._width +
            drawing.detection.box._width / 3 +
            10,
          drawing.detection.box._y + drawing.detection.box._height / 2 + 10
        );
        p.rect(
          drawing.detection.box._x +
            drawing.detection.box._width +
            drawing.detection.box._width / 3 +
            5,
          drawing.detection.box._y + drawing.detection.box._height / 2 - 25,
          60,
          60
        );
        const expressiontext7 = "Magazine";
        const expressionWidth7 = p.textWidth(expressiontext7);

        p.text(
          expressiontext7,
          drawing.detection.box._x - drawing.detection.box._width / 3 - 62,
          drawing.detection.box._y + drawing.detection.box._height / 2 + 10
        );
        p.rect(
          drawing.detection.box._x - drawing.detection.box._width / 3 - 65,
          drawing.detection.box._y + drawing.detection.box._height / 2 - 25,
          67,
          60
        );

        // // const expressiontext2 = "Code";
        // // const expressionWidth2 = p.textWidth(expressiontext1);
        // // p.text(
        // //   expressiontext2,
        // //   drawing.detection.box._x + drawing.detection.box._width + 15,
        // //   drawing.detection.box._y - 32
        // // );
        // p.rect(
        //   drawing.detection.box._x + drawing.detection.box._width / 2 - 25,
        //   drawing.detection.box._y - drawing.detection.box._height / 4 - 65,
        //   60,
        //   60
        // );

        //*********************************************** */
      }
    });
    faceapi
      .detectAllFaces(capture.id())
      .withAgeAndGender()
      .withFaceExpressions()
      // .withFaceLandmark()
      .then((data) => {
        showFaceDetectionData(data);
      });

    if (capture.loadedmetadata) {
      if (cocossdModel) {
        cocossdModel
          .detect(document.getElementById("video_element"))
          .then(showCocoSSDResults)
          .catch((e) => {
            console.log("Exception : ", e);
          });
      }
    }
  };
  let rotation = 0;
  p.updateWithProps = (props) => {
    if (props.rotation) {
      rotation = (props.rotation * Math.PI) / 180;
    }
  };
}
// export default function sketch(p5) {
//   // let rotation = 0;

//   p5.setup = () => p5.createCanvas(300, 300, p5.WEBGL);

//   // p5.updateWithProps = (props) => {
//   //   if (props.rotation) {
//   //     rotation = ((props.rotation / 4 + 10) * Math.PI) / 180;
//   //   }
//   // };

//   p5.draw = () => {
//     // p5.background(100);
//     p5.normalMaterial();
//     p5.noStroke();
//     p5.torus(70, 20);
//     // p5.push();
//     // p5.translate(-30, 0);
//     // p5.rotateY(rotation);
//     // p5.rotateX(-0.9);

//     // p5.pop();

//     // p5.noFill();
//     // p5.stroke(255);
//     // p5.push();
//     // p5.translate(300, p5.height * 0.5, -500);
//     // p5.cone(100, 100);
//     // p5.pop();
//   };
// }

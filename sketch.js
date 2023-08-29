let mobileNet;
let imageToCheck;
let label;
let fileInput;
let classifyButton;
let dropzone;
function setup() {
  createCanvas(640, 480);
  background(20);

  mobileNet = ml5.imageClassifier("MobileNet", classifierReady);
  label = createP("");
  fileInput = createP("drag in a file!");
  fileInput.addClass("file-input");
  fileInput.dragOver(highlight);
  fileInput.dragLeave(unhighlight);
  fileInput.drop(gotFile, unhighlight);
  classifyButton = createButton("Classify");
  classifyButton.mouseClicked(() => {
    mobileNet.predict(imageToCheck, gotResults);
  });
}
function imageReady() {
  image(imageToCheck, 0, 0, width, height);
}
function classifierReady() {
  console.log("Mobile net loaded!!11! yippee!!1!");
}
function gotFile(d) {
  if (d.type != "image") {
  } else {
    imageToCheck = createImg(d.data, imageReady);
    imageToCheck.hide();
  }
}
function gotResults(e, data) {
  if (e) {
    console.error(e);
    return;
  }

  // console.log(data);

  let classifiedName = split(data[0].label, ",");
  label.html(
    `Im ${floor(data[0].confidence * 100)}% sure this is a ${classifiedName[0]}`
  );
}

function highlight() {
  fileInput.style("background-color", "#ccc");
}

function unhighlight() {
  fileInput.style("background-color", "#fff");
}

const video = document.getElementById("background");
video.playbackRate = 0.5;

function clicked(val) {
  var values = document.getElementById("SubScreen").value;
  var values2 = document.getElementById("mainScreen").value;
  var valueFinal = values[values.length - 1]; // final value

  if (   //inter cahnge the operations when enter two operations near position
    (["+", "-", "*", "/"].includes(valueFinal) &&
      ["+", "-", "*", "/"].includes(val)) ||
    (val === "." && valueFinal === ".")
  ) {
    document.getElementById("SubScreen").value = deleteLastDigit(values);
    document.getElementById("mainScreen").value = deleteLastDigit(values2);
  }

  //inter cahange the 0 if the 0 at the begining
  if ((val == "*" || val == "/") && values.length == 0) {
    document.getElementById("SubScreen").value = "";
  } else if (values == "0" && val != ".") {
    document.getElementById("SubScreen").value = val;
  } else if (values == "" && (val == "." || val == 0)) {
    document.getElementById("SubScreen").value = "0.";
  } else if (
    ["+", "-", "*", "/"].includes(valueFinal) &&
    (val === "." || val === 0)
  ) {
    // Code to be executed if the conditions are met
    document.getElementById("SubScreen").value += "0."; // Appends "0." to the element with id "SubScreen"
  } else if (val == ")") {
    document.getElementById("SubScreen").value += val + "*";
  } else if (val == "(") {
    if(["+", "-","*","/",val].includes(valueFinal)){

      document.getElementById("SubScreen").value += "(";
    }
    else if (document.getElementById("SubScreen").value.length != 0) {
      document.getElementById("SubScreen").value += "*" + val;
    } else {
      document.getElementById("SubScreen").value += val;
    }
  } else {
    document.getElementById("SubScreen").value += val;
  }
}


// ================  SCREEN SHOW SETUP ================

function clickedShow(val) {
  var values = document.getElementById("mainScreen").value;
  var mainScreen = document.getElementById("mainScreen");
  let lstVal = document.getElementById("mainScreen").value.length-1;

  var valueFinal = values[values.length - 1];

  if ((val == "×" || val == "÷") && values.length == 0) {
    mainScreen = "";
  } else if (
    ["+", "-", "*", "/"].includes(valueFinal) &&
    (val === "." || val === 0)
  ) {
    // Code to be executed if the conditions are met
    mainScreen.value += "0.";
    // Appends "0." to the element with id "SubScreen"
    allAc();
  } else if (values == "0" && val != ".") {
    mainScreen.value = val;
    allAc();
  } else if (values == "" && (val == "." || val == 0)) {
    mainScreen.value = "0.";
    allAc();
  } else if (val == "Captain Aj") {
    mainScreen.value = val;
    Aj();
  } else if (val == ")") {
    mainScreen.value += val + "×";
  } else if (val == "(") {
    if(["+", "-","×","÷",val].includes(values[lstVal])){
      mainScreen.value += val;
    }
    else if (mainScreen.value.length == 0) {
      mainScreen.value += val;
    } else {
      mainScreen.value += "×" + val;
    }
  } else {
    mainScreen.value += val;
    allAc();
  }
}

function Clear() {
  document.getElementById("SubScreen").value = "";
  document.getElementById("mainScreen").value = "";
  revertChanges();
  blackElement.classList.remove("modified");
  blackElement.classList.add("modified2");
}

function equalClick() {
  var text = document.getElementById("SubScreen").value;

  if (text[text.length - 1] != "+" || "-" || "*" || "/") {
    if (text.length > 0 && text != 0) {
      var result = eval(text);

      showAns();

      document.getElementById("mainScreen").value = result;
      document.getElementById("SubScreen").value = result;
    } else {
      document.getElementById("mainScreen").value = "";
      document.getElementById("SubScreen").value = "";
    }
  }
}

// delete final element

function LstDl() {
  var last = document.getElementById("SubScreen").value;
  var last2 = document.getElementById("mainScreen").value;

  if (last != "0") {
    var lstans = deleteLastDigit(last);
    var lstans2 = deleteLastDigit(last2);

    document.getElementById("SubScreen").value = lstans;
    document.getElementById("mainScreen").value = lstans2;
    
  } else {
    document.getElementById("SubScreen").value = "";
    document.getElementById("mainScreen").value = "";
  }
}

function deleteLastDigit(input) {
  if (input.length > 0) {
    input = input.slice(0, -1);
    return input;
  } else {
    return "";
  }
}

//================== view changes ====================\\

var fntSz = document.getElementById("mainScreen");
var CalculatorBottom = document.getElementById("CalculatorBottom");
var blackElement = document.getElementById("CalculatorBottom");

var elements = document.querySelectorAll(".color");

function showAns() {
  fntSz.style.fontSize = "40px";
  fntSz.style.direction = "rtl";
}

// var assbtn = document.getElementById("AsgnBtn");
// assbtn.addEventListener("click", showAns);

function btc() {
  fntSz.style.fontSize = "30px";
  fntSz.style.direction = "ltr";
}

var otherBtns = document.getElementsByClassName("OprBtn");
for (var i = 0; i < otherBtns.length; i++) {
  otherBtns[i].addEventListener("click", btc);
}

var nmbBtns = document.getElementsByClassName("numbers");
for (var i = 0; i < nmbBtns.length; i++) {
  nmbBtns[i].addEventListener("click", btc);
}

function allAc() {
  fntSz.style.fontSize = "30px";
  fntSz.style.paddingLeft = "15px";
  fntSz.style.width = "445px";
}

function Aj() {
  fntSz.style.fontSize = "40px";
  fntSz.style.paddingLeft = "150px";
  // fntSz.style.width = "60%";
  blackElement.classList.remove("modified2");
  blackElement.classList.add("modified");
}

// store orginal elements\\

var elements = document.querySelectorAll("*");
var originalStyles = [];

elements.forEach(function (element) {
  var styles = window.getComputedStyle(element);
  originalStyles.push({
    element: element,
    color: styles.color,
    borderColor: styles.borderColor,
    backgroundColor: styles.backgroundColor,
    boxShadow: styles.boxShadow,
  });
});

// store all elemnts before change

function revertChanges() {
  var backgroundVideo = document.getElementById("background");
  originalStyles.forEach(function (style) {
    style.element.style.color = style.color;
    style.element.style.borderColor = style.borderColor;
    style.element.style.backgroundColor = style.backgroundColor;
    style.element.style.boxShadow = style.boxShadow;
  });
  backgroundVideo.src =
    "video/vecteezy_matrix-video-web-programming-coding_13323101_426.mp4"; // Replace "newvideo.mp4" with the path to your new video
  backgroundVideo.load();
  video.playbackRate = 0.5;

  // backgroundVideo.play();
}

// changes when click matrix \\

window.addEventListener("load", function () {
  var onMatrix = document.getElementById("MatriX");
  var backgroundVideo = document.getElementById("background");

  if (onMatrix) {
    onMatrix.addEventListener("click", function () {
      var elements = document.querySelectorAll("*");
      elements.forEach(function (element) {
        element.style.color = "red";
        element.style.borderColor = "red";

        var specificElement = document.querySelectorAll(
          ".numbers,.OprBtn,#AsgnBtn"
        ); // for manipulate buton shadows
        // Loop through the selected elements

        specificElement.forEach(function (specificElement) {
          // Do something with each element
          specificElement.style.boxShadow = "1px 1px 1px red";
        });
      });
      backgroundVideo.src = "video/red matrix 2.webm";
      // Replace "newvideo.mp4" with the path to your new video
      backgroundVideo.load();
      //   backgroundVideo.play();
      video.playbackRate = 0.5;

    });
  } else {
    console.error("Element with ID 'onMatrix' not found.");
  }
});

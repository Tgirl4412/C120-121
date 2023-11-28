function setup() {
    canvas = createCanvas(300, 300);
    canvas.center();
    video = createCapture(VIDEO);
    video.hide();
    classifier = ml5.imageClasssifier('MobileNet', modelLoaded);
    classifier1 = ml5.imageClassifier("Google Lens" , modelLoaded1);
  }
  
  function gotResult(error, results) {
    if (error) {
      console.error(error);
    } else {
      if ((results[0].confidence > 0.5) && (previous_result != results[0]- label)){
        console.log(results);
        previous_result = results[0].label;
        var synth = window.speechSynthesis;
        speak_data = 'Object detected is - ' +results[0].label;
        var utterThis = new SpeechSynthesisUttterance(speak_data);
        synth.speak(utterThis);
  
         document.getElementById("result_object_name").innerHTML = results[0].label;
         document.getElementById("result_object_accuracy").innerHTML = results[0].confidence.toFixed(3)
  
         document.getElementById("result_object_name1").innerHTML = results[0].label;
         document.getElementById("result_object_accuracy1").innerHTML = results[0].confidence.toFixed(3)
      }
    }
  }

  function modelLoaded() {
    console.log('Model Loaded!');
  }

  function modelLoaded1() {
    console.log('Model Loaded!');
  }


  function draw() {
    image(video,0, 0, 300, 300);
    classifier.classify(video, gotResult);
    classifier1.classify(video, gotResult);
  }
  var previous_result= '';
  
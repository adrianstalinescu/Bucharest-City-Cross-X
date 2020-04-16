<template>
  <div id="app" class="display-flex">
    <canvas class="canvas-image-front" ref="canvas" id="emo_canvas" width="400" height="400"></canvas>
    <canvas class="canvas-image-back" ref="canvas-back" id="emo_canvas-back" width="400" height="400"></canvas>
    <canvas class="canvas-image-selfie" ref="canvas-selfie" id="emo_canvas-selfie" width="400" height="400"></canvas>
    <div class="video-image-wrapper">
      <video
        ref="video"
        id="video"
        width="400"
        height="300"
        playsinline
        muted
        autoplay
        class="video-image"
      ></video>
    </div>
    <v-btn v-if="!redo" @click="faceCapture()">CApture</v-btn>
    <v-btn v-if="redo" @click="redoButton()">Redo</v-btn>
    <v-btn @click="faceDetect()">SUBMIT</v-btn>
    <v-btn @click="faceVerify()">Verify</v-btn>
  </div>
</template>

<script>
/* eslint-disable no-console */
import Vue from "vue";
import Axios from "axios";
import VueAxios from "vue-axios";
import firebase from "@/firebase";
Vue.use(VueAxios, Axios);

export default {
  name: "Face",
  data() {
    return {
      video: {},
      canvas: {},
      canvasBack: {},
      canvasSelfie: {},
      captures: [],
      faceId: [],
      redo: false
    };
  },

  mounted() {
    this.startCamera();
  },

  methods: {
    startCamera() {
          //Start the PC front camera and display real-time video on the video tag
        this.video = this.$refs.video;
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        navigator.mediaDevices
            .getUserMedia({ audio: false, video: true })
            .then((stream) => {
            this.video.srcObject = stream;
            this.video.play();
            });
        }
        this.canvas = this.$refs.canvas;
      },
    faceCapture() {
      this.canvas.getContext("2d").drawImage(this.video, 0, 0, 400, 300); //Store the captured image in the "captures" array
      this.captures.push(this.canvas.toDataURL("image/png"));
      const imgURL = this.makeblob(this.captures[this.captures.length - 1]);
        firebase.storage().ref("/face").put(imgURL)
        this.redo = true
        var element = document.getElementById("emo_canvas-front");
        element.classList.add("z-index-100");
    },
    redoButton() {
        this.redo = false;
        var element = document.getElementById("emo_canvas");
        element.classList.remove("z-index-100");
    },
    faceDetect() {
      let subscriptionKey = "51fc2876d96a42e19d922c448dc19990"; //microsoft face api key
      let uriBase =
        "https://northeurope.api.cognitive.microsoft.com/face/v1.0/detect";

      //Convert the format of the image added at the end of the array and assign it to the imgURL format
      const imgURL = this.makeblob(this.captures[this.captures.length - 1]);
      //Send imgURL image to Face API
      console.log(imgURL);
      Axios.post(
        uriBase +
          "?returnFaceId=true",
        imgURL,
        {
          headers: {
            "Content-Type": "application/octet-stream",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          },
        }
      )
        .then((response) => {
          console.log(response.data[0].faceId);
          this.faceId.push(response.data[0].faceId)
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    faceVerify () {
      let subscriptionKey = "51fc2876d96a42e19d922c448dc19990"; //microsoft face api key
      let uriBase =
        "https://northeurope.api.cognitive.microsoft.com/face/v1.0/verify";

      //Convert the format of the image added at the end of the array and assign it to the imgURL format
      const faceId = {
        faceId1: this.faceId[0],
        faceId2: this.faceId[1]
        }
        console.log(faceId)
        console.log(this.faceId[0])
        console.log(this.faceId[1])
      Axios.post(
        uriBase,
        faceId,
        {
          headers: {
            "Content-Type": "application/json",
            "Ocp-Apim-Subscription-Key": subscriptionKey,
          },
        }
      )
        .then((response) => {
          console.log(response.data)
        })
        .catch((error) => {
          console.log(error.response);
        });
    },
    makeblob: function(dataURL) {
      let BASE64_MARKER = ";base64,";
      if (dataURL.indexOf(BASE64_MARKER) == -1) {
        let parts = dataURL.split(",");
        let contentType = parts[0].split(":")[1];
        let raw = decodeURIComponent(parts[1]);
        return new Blob([raw], { type: contentType });
      }
      let parts = dataURL.split(BASE64_MARKER);
      let contentType = parts[0].split(":")[1];
      let raw = window.atob(parts[1]);
      let rawLength = raw.length;
      let uInt8Array = new Uint8Array(rawLength);
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
      }
      return new Blob([uInt8Array], { type: contentType });
    },
  }
};
</script>
<style>
.display-flex {
    display: flex;
}
.video-image-wrapper {
    position: absolute;
    top: 5vh;
    left: 35vw;
}

.canvas-image-front {
    position: absolute;
    bottom: 8vh;
    left: 0;
}

.z-index-100 {
    z-index: 100;
}
</style>





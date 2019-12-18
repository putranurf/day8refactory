<template>
  <div>
    <div>
      <!-- <a href="http://localhost:3001/download-pdf" @click="download" download="file.pdf">Download PDF</a> -->
      <button type="button" @click="download" >Download PDF</button>
    </div>
    <!-- <div>
      <a href="http://localhost:3001/preview-pdf">Preview PDF</a>
    </div>
    <div>
      <embed src="http://localhost:3001/preview-pdf" width="600" height="500" alt="pdf" />
    </div>  -->

    <div>
      <h3>Image</h3>
      <input type="file" @change="previewPdf" />
      <object :data="blob" type="image/jpeg"></object>
    </div>

    <div>
      <h3>PDF</h3>
      <input type="file" @change="imagePreview" />
      <div>
        <object :data="image" style="width: 100%; height: 700px;"></object>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    blob: null,
    image: null
  }),

  methods: {
    async download() {
      const response = await axios.get("download");
    //   console.log(response)
    },
    imagePreview(event) {
      const file = event.target.files[0];
      this.image = URL.createObjectURL(file);
    },

    previewPdf(event) {
      const file = event.target.files[0];
      this.blob = URL.createObjectURL(file);
    }
  }
};
</script>


<template>
  <div>   
    <form @submit.prevent="upload">    
      <ul>
        <button type="button" @click="addMore">Add More</button>
        <button type="submit">Upload</button>
      </ul>
      <ul v-for="(item, index) in items" :key="index">
        <input
          type="file"
          @change="updateFile(item, $event)"
          :ref="item.file"
          accept="image/jpeg, application/pdf"
        />
      </ul>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    items: [
      {
        preview: "",
        pdf_preview: "",
        file: null
      }
    ]
  }),
  methods: {
    updateFile(item, $event) {
      item.file = $event.target.files[0];

      item.pdf_preview = item.file.name;

      const fileReader = new FileReader();

      fileReader.addEventListener(
        "load",
        function() {
          item.preview = fileReader.result;
          //   console.log(item.preview);
        },
        false
      );
      //   console.log(item.pdf_preview);
      const reader = fileReader.readAsDataURL($event.target.files[0]);
    },
    addMore() {
      this.items.push({
        file: null
      });
    },
    async upload() {
      const formData = new FormData();
      this.items.forEach(element => formData.append("file", element.file));      
      const response = await axios.post("upload", formData);
    }
  }
};
</script>
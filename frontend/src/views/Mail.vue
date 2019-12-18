<template>
  <div>
    <form @submit.prevent="sendMail">
      <div class="form-group">
        Subject
        <input type="text" v-model="form.subject" required />
      </div>
      <div class="form-group">
        To
        <input type="email" v-model="form.to" required />
      </div>
      <div class="form-group">From</div>
      <input type="email" v-model="form.from" required />
      <div class="form-group">
        Message        
        <textarea v-model="form.message" required></textarea>
      </div>
      <button type="submit">Send Mail</button>
    </form>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    form: {
      subject: "",
      to: "",
      from: "",
      message: ""
    }
  }),
  methods: {
    async sendMail() {
      const response = await axios.post("sendmail", this.form);
      this.form = ''
      console.log(response);
    }
  }
};
</script>
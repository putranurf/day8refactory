<template>
  <div>
    <ul>
      <li>
        <router-link to="/mail">Mail</router-link>
      </li>
      <li>
        <router-link to="/uploadfiles">Upload Files</router-link>
      </li>
      <li>
        <router-link to="/preview">Download / Show PDF</router-link>
      </li>
    </ul>

    <router-view></router-view>
  </div>
</template>

<script>
export default {};
</script>
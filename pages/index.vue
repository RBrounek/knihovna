<template>
  <div>
    <AuthorSearch :default="'Rowling'" @search="searchForAuthors" />
    <AuthorList :message="message" :authors="authors" />
  </div>
</template>

<script setup lang="ts">
  import { ref } from "vue";
  const authors = ref([]) as any;
  const message = ref<String>("");
  let loading:Boolean = false;

  async function searchForAuthors(name:String) {
    if(name === "") {
      loading = false;
      authors.value = [];
      message.value = "Enter author name";
      return;
    }

    if(loading) return;

    message.value = "Loading data...";

    loading = true;
    authors.value = [];

    try {
      const data = await fetch(`https://openlibrary.org/search/authors.json?q=${name}`);
      const json = await data.json();
      authors.value = json.docs;
      
      loading = false;
      message.value = "";

      if(json.docs.length == 0) {
        message.value = "No records found";
      } 
    } catch(e) {
      loading = false;
      message.value = "Error - please try it later";
    }
  
  }
</script>
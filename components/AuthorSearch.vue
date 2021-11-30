<template>
  <div class="">
    <div class="container my-12 mx-auto px-4 md:px-12">
      <form action="#" @submit.prevent autocomplete="off">
        <div class="flex flex-col mb-5">        
          <div class="relative">          
            <input
              id="search"
              type="search"
              name="search"
              class="
                text-sm
                placeholder-gray-500
                pl-10
                pr-4
                rounded-2xl
                border border-gray-400
                w-full
                py-2
                focus:outline-none focus:border-blue-400
              "
              placeholder="Enter book author name, for example Rowling"
              v-model="content"
              ref="search"
              v-on:input="search"                
            />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    created() {
        this.search();
    },
    data(){
      return {
        content: ""
      }
    },
    methods: {
      search() {
        this.$emit("search", this.content);
      }
    }
});
</script>
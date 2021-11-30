<template>
  <div>
    <div class="container my-12 mx-auto px-4 md:px-12">
      <div class="flex flex-wrap -mx-1 lg:-mx-4">
        <div 
            class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
            v-for="book in favourites" 
            :key="book.key"
            >
            <article class="overflow-hidden rounded-lg shadow-lg">
                <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">

                <header class="leading-tight p-2 md:p-4 text-center">
                    <h1 class="text-lg">                                
                        {{ book.title }}
                    </h1>     

                    <button 
                      @click.prevent="removeFavourite(index)"
                      class="mt-5 text-sm font-semibold bg-gray-800 text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                      >Remove</button>                       
                </header>
            </article>
        </div>
      </div>
  </div>

  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  created() {
    this.generateFavourites();
  },
  data() {
    return {
      favourites: []
    }
  },
  methods: {
    removeFavourite(index) {
      this.favourites.splice(index, 1);
      
      this.saveFavourites();
      this.generateFavourites();
    },
    generateFavourites() {
      if (process.client){
        const data = localStorage.getItem('favourites');
        this.favourites = JSON.parse(data);
      }
    },
    saveFavourites() {
      localStorage.setItem( 'favourites', JSON.stringify( this.favourites ) );
    },
  }
})
</script>

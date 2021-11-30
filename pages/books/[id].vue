<template>    
    <div>

        <div v-if="data.entries.length > 0" class="container my-12 mx-auto px-4 md:px-12">
            <div class="flex flex-wrap -mx-1 lg:-mx-4">

                <div 
                    class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                    v-for="(book, index) in data.entries"
                    :key="index"
                    >
                    <article class="overflow-hidden rounded-lg shadow-lg">
                        <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">

                        <header class="leading-tight p-2 md:p-4 text-center">
                            <h1 class="text-lg">                                
                                {{ book.title }}
                            </h1>     

                            <button 
                                @click.prevent="toggleFavourite(book, index)"
                                :class="{'favourite': isFavourite(book.key)}"
                                class="mt-5 text-sm font-semibold bg-gray-800 text-gray-300 py-3 px-4 rounded-lg hover:bg-gray-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-700 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-900"
                                >Favourite</button>                       
                        </header>
                    </article>
                </div>

            </div>
        </div>

        <div v-else-if="books.length == 0 && error == ''" class="container my-12 mx-auto px-4 md:px-12">
            <p>Loading data</p>
        </div>

        <div v-else-if="error != ''" class="container my-12 mx-auto px-4 md:px-12">
            <div>Data cannot by loaded ({{ error }})</div>
        </div>

    </div>
</template>


<script setup lang="ts">  
    import { useRoute } from 'vue-router';  
    const route = useRoute(); 
    const id = route.params.id;

    const { data }: any = await useAsyncData("getBooks", () => 
        $fetch(`https://openlibrary.org/authors/${id}/works.json`)
    );
</script>


<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
    head() {
        return {
            title: 'Authors books'
        }
    },
    created() {
        this.generateFavourites();
    },
    data() {
        return {
            books: [],
            favourites: [],
            message: '',
            error: ''
        }
    },
    methods: {
        generateFavourites() {
            if (!process.client){
                return {};
            }

            const data = localStorage.getItem('favourites');
            const favourites = JSON.parse(data);

            if( favourites == '' || favourites == null || favourites == undefined ) {
                this.favourites = [];
            } else {
                this.favourites = favourites;
            }
        },
        toggleFavourite(book, index) {
            console.log(book, index);

            if ( this.favourites.filter(item => item.key === book.key).length === 0 ) {
                this.favourites.push(book);
            } else {
                this.favourites.splice(index, 1)
            }
            
            this.saveFavourites();
            this.generateFavourites();
        },
        saveFavourites() {
            localStorage.setItem( 'favourites', JSON.stringify( this.favourites ) );
        },
        isFavourite(bookKey) {
            if( Array.isArray(this.favourites) ) {
                if ( this.favourites.filter(item => item.key === bookKey).length ) {
                    return true;
                } else {
                    return false;
                }    
            } else {
                return false;
            }
        }
    }
})
</script>

<style scoped>
    .favourite{
        color: green;
    }
</style>
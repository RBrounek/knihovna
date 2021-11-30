<template>
<div>

    <div v-if="authors.length > 0" class="container my-12 mx-auto px-4 md:px-12">
        <div class="flex flex-wrap -mx-1 lg:-mx-4">

            <div 
                class="my-1 px-1 w-full md:w-1/2 lg:my-4 lg:px-4 lg:w-1/3"
                v-for="person in authors" 
                :key="person.email"
                >
                <article class="overflow-hidden rounded-lg shadow-lg">
                    <nuxt-link :to="{name: 'books-id', params: { id: person.key } }">
                        <img alt="Placeholder" class="block h-auto w-full" src="https://picsum.photos/600/400/?random">
                    </nuxt-link>

                    <header class="flex items-center justify-between leading-tight p-2 md:p-4">
                        <h1 class="text-lg">
                            <nuxt-link class="no-underline hover:underline text-black" :to="{name: 'books-id', params: { id: person.key } }">                            
                                {{ person.name }}
                            </nuxt-link>
                        </h1>
                        <p class="text-grey-darker text-sm">
                            {{ person.birth_date }}
                        </p>
                    </header>
                </article>
            </div>

        </div>
    </div>

    <div v-else class="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div class="text-center">{{ message }}</div>
    </div>    
</div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
    props: {
        authors: {
            type: Array,
            required: true
        },
        message: {
            type: String,
            default: ""
        }
    }
});
</script>

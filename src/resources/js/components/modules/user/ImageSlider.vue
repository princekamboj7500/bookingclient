<template>
    <div class="image-slider">
        <carousel :per-page="1" :navigation-enabled="false" :pagination-enabled="false" ref="carousel">
            <slide v-for="(image, index) in images" :key="index">
                <img :src="image" class="slide-image" />
            </slide>
        </carousel>
        <div class="arrows">
            <button @click="prev" class="arrow-left">❮</button>
            <button @click="next" class="arrow-right">❯</button>
        </div>
        <div class="thumbnails">
            <img v-for="(image, index) in images" :key="index" :src="image" @click="goTo(index)"
                :class="{ 'thumbnail': true, 'current-thumbnail': index === currentIndex }" />
        </div>
    </div>
</template>

<script>
import { Carousel, Slide } from 'vue-carousel';

export default {
    components: {
        Carousel,
        Slide
    },
    props: ['images'],
    data() {
        return {
            currentIndex: 0,
        };
    },
    methods: {
        prev() {
            let newIndex = this.$refs.carousel.currentPage - 1;
            if (newIndex < 0) {
                newIndex = this.images.length - 1; // Wrap around to the last image
            }
            this.goTo(newIndex);
        },
        next() {
            let newIndex = this.$refs.carousel.currentPage + 1;
            if (newIndex >= this.images.length) {
                newIndex = 0; // Wrap around to the first image
            }
            this.goTo(newIndex);
        },
        goTo(index) {
            this.$refs.carousel.goToPage(index);
            this.currentIndex = index;
        }
    }
};
</script>


<style scoped>
.image-slider {
    position: relative;
    width: 100%;
    max-width: 100%;
    margin: auto;
}

.slide-image {
    width: 100%;
    height: auto;
}

.arrows {
    position: absolute;
    top: 50%;
    width: 100%;
    display: flex;
    justify-content: space-between;
    transform: translateY(-50%);
}

.arrow-left,
.arrow-right {
    background: none;
    border: none;
    font-size: 2rem;
    cursor: pointer;
    color: white;
    text-shadow: 1px 1px 2px black;
}

.thumbnails {
    display: flex;
    justify-content: center;
    margin-top: 10px;
    width: 100%;
    max-width: 100%;
    overflow: hidden;
}

.thumbnails img {
    width: 133px;
}

.thumbnail {
    width: 60px;
    height: auto;
    margin: 0 5px;
    cursor: pointer;
    opacity: 0.6;
    border: 2px solid transparent;
    /* Initially no border */
}

.current-thumbnail {
    z-index: 9;
    top: 0;
    left: 0;
    border-style: solid;
    border-color: #00afea;
    opacity: 1;
}
</style>

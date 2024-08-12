<template>
    <div class="bravo_filter">
        <form action="http://127.0.0.1:8000/hotel" class="bravo_form_filter">
            <div class="filter-title">
                FILTER BY
            </div>
            <div class="g-filter-item">
                <div class="item-title" @click="toggleContent('price')">
                    <h3>Filter Price</h3>
                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                </div>
                <div class="item-content" v-show="priceContentVisible">
                    <div class="bravo-filter-price">
                        <vue-slider v-model="priceRangeArray" :min="minPriceRange" :max="maxPriceRange"
                            :marks="priceMarks" :tooltip="'always'" :format-tooltip="formatTooltip"></vue-slider>
                        <button type="button" class="btn btn-link btn-apply-price-range" @click="applyPriceRange">
                            APPLY
                        </button>
                    </div>
                </div>
            </div>
            <div class="g-filter-item" v-if="url === '/hotels'">
                <div class="item-title" @click="toggleContent('star')">
                    <h3 class="text-capitalize">{{ type }} Star</h3>
                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                </div>
                <div class="item-content" v-show="starContentVisible">
                    <ul>
                        <li v-for="number in [5, 4, 3, 2, 1]" :key="number">
                            <div class="bravo-checkbox">
                                <label>
                                    <input name="star_rate[]" type="checkbox" :value="number" v-model="selectedStars"
                                        @change="handleStarChange">
                                    <span class="checkmark"></span>
                                    <template v-for="star in number">
                                        <i class="fa fa-star"></i>
                                    </template>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="g-filter-item">
                <div class="item-title" @click="toggleContent('review')">
                    <h3>Review Score</h3>
                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                </div>
                <div class="item-content" v-show="reviewContentVisible">
                    <ul>
                        <li v-for="number in [5, 4, 3, 2, 1]" :key="number">
                            <div class="bravo-checkbox">
                                <label>
                                    <input name="review_score[]" type="checkbox" :value="number"
                                        v-model="selectedScores" @change="handleReviewChange">
                                    <span class="checkmark"></span>
                                    <template v-for="score in number">
                                        <i class="fa fa-star"></i>
                                    </template>
                                </label>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
            <div v-if="isTour" class="g-filter-item">
                <div class="item-title">
                    <h3>Tour Type</h3>
                    <i class="fa fa-angle-up" aria-hidden="true"></i>
                </div>
                <div class="item-content">
                    <ul>
                        <li v-for="category in tourCategory" :key="category.id">
                            <div class="bravo-checkbox">
                                <label>
                                    <input type="checkbox" :value="category.slug"
                                        @change="handleCategorieChange(category.id, category.slug)">
                                    {{ category.name }}
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </li>
                    </ul>
                    <button type="button" class="btn btn-link btn-more-item hide">More <i
                            class="fa fa-caret-down"></i></button>
                </div>
            </div>
            <div v-for="attribute in filterAttributes" :key="attribute.id" class="g-filter-item"
                v-if="!attribute.hide_in_filter_search">
                <div class="item-title" @click="toggleVisibility(attribute.id)">
                    <h3>{{ attribute.name }}</h3>
                    <i :class="visibility[attribute.id] ? 'fa fa-angle-up' : 'fa fa-angle-down'" aria-hidden="true"></i>
                </div>
                <div class="item-content" v-show="visibility[attribute.id]">
                    <ul>
                        <li v-for="(term, index) in attribute.terms" :key="term.id"
                            :class="{ hide: index > 2 && !selected }">
                            <div class="bravo-checkbox">
                                <label>
                                    <input type="checkbox" :checked="isSelected(attribute.id, term.slug)"
                                        @change="toggleSelection(attribute.id, term.slug)">
                                    {{ term.name }}
                                    <span class="checkmark"></span>
                                </label>
                            </div>
                        </li>
                    </ul>
                    <button v-if="attribute.terms.length > 3 && !selected" type="button"
                        class="btn btn-link btn-more-item" @click="toggleShowMore(attribute.id)">
                        More <i class="fa fa-caret-down"></i>
                    </button>
                </div>
            </div>
        </form>
    </div>
</template>
<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import common from './common';
export default {
    components: {
        VueSlider
    },
    mixins: [common],
    props: ['filterAttributes', 'isTour', 'tourCategory', 'type', 'minPriceRange', 'maxPriceRange', 'priceRangeArray'],
    data() {
        return {
            starContentVisible: true,
            reviewContentVisible: true,
            priceContentVisible: true,
            visibility: {},
            selectedStars: [],
            selectedScores: [],
            selectedCategories: [],
            attrs: [],
            url: this.$route.path

        }
    },
    created() {
        
    },
    mounted() {
        //console.log('filter Component mounted.', this.priceRangeArray);
        // Initialize visibility for each attribute to true (open by default)
        this.filterAttributes.forEach(attribute => {
            this.$set(this.visibility, attribute.id, true);
        });
    },
    computed: {
    },
    methods: {
        isHotelsPage() {
            return this.$route.path === '/hotels';
        },
        toggleContent(type) {
            if (type === 'star') {
                this.starContentVisible = !this.starContentVisible;
            } else if (type === 'review') {
                this.reviewContentVisible = !this.reviewContentVisible;
            } else if (type === 'price') {
                this.priceContentVisible = !this.priceContentVisible;
            }
        },
        toggleVisibility(id) {
            this.$set(this.visibility, id, !this.visibility[id]);
        },
        isSelected(attributeId, termSlug) {
            const attributeKey = `attr[${attributeId}]`;
            return this.search[attributeKey] && this.search[attributeKey].includes(termSlug);
        },
        toggleShowMore(attributeId) {
            console.log("11")
            // Your existing toggleShowMore method
        },


        getStarRates() {
            return this.selectedStars.map(star => `${star}`);
        },


        getCategorieRates() {
            console.log(this.selectedCategories)
            // return this.selectedCategories.map(score => `${score}`);
        },


    }
}
</script>
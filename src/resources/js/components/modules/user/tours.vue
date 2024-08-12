<template>
    <div class="bravo_search_tour">
        <topbar></topbar>
        <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
        <div class="bravo_banner" style="background-image: url(/uploads/demo/tour/banner-search.jpg)">
            <div class="container">
                <h1>
                    Search for tour
                </h1>
            </div>
        </div>
        <div class="bravo_form_search">
            <div class="container">
                <div class="row" v-if="list_location">
                    <searchwidget :location-list="list_location" :type="type" :price-range-array="priceRange" @search="updateSearchParams"></searchwidget>
                </div>
            </div>
        </div>
        <div class="container">
            <div v-if="isLoading" id="loader"></div>
            <div v-else class="row">
                <div class="col-lg-3 col-md-12">
                    <filterwidget :filter-attributes="attributes" :tour-category="tour_category" :is-tour="true"
                        :type="type" :min-price-range="minPrice" :max-price-range="maxPrice"
                        :price-range-array="priceRange" @filter="updateFilterParams"/>
                </div>
                <div class="col-lg-9 col-md-12">
                    <div class="bravo-list-item">
                        <div class="topbar-search">
                            <h2 class="text result-count">
                                {{ total }} tours found
                            </h2>
                            <div class="control bc-form-order">
                                <div class="item">
                                    <a href="/tour?_layout=map">Show on the map</a>
                                </div>
                                <div>
                                    <orderby :price-range-array="priceRange" @orderby="updateOrderParams"></orderby>
                                </div>
                            </div>
                        </div>
                        <div class="ajax-search-result">
                            <div class="list-item">
                                <div class="row">
                                    <div v-for="item in paginatedData" :key="item.id" class="col-lg-4 col-md-6">
                                        <div class="item-tour item-loop-wrap ">
                                            <div class="featured" v-if="item.is_featured == 1">
                                                Featured
                                            </div>
                                            <div class="thumb-image">
                                                <div class="sale_info">{{ item.discount_percent }}</div>
                                                <router-link :to="{ name: 'tourDetail', params:{tour :item.slug} }" class="btn btn-info">
                                                    <img class="img-responsive lazy loaded" :src=item.feature_image_url
                                                    alt="Eastern Discovery (Start New Orleans)">
                                                  </router-link>
                                                <div class="service-wishlist " data-id="6" data-type="tour">
                                                    <i class="fa fa-heart"></i>
                                                </div>
                                            </div>
                                            <div class="location" v-if="item.location_id">
                                                <i class="icofont-paper-plane"></i>
                                                {{ item.location.name }}
                                            </div>
                                            <div class="item-title">
                                                <a :href="`/${item.slug}`">
                                                    {{ item.title }}
                                                </a>
                                            </div>
                                            <div :class="`service-review tour-review-${item.review_data.score_total}`">
                                                <div class="list-star">
                                                    <ul class="booking-item-rating-stars">
                                                        <li><i class="fa fa-star-o"></i></li>
                                                        <li><i class="fa fa-star-o"></i></li>
                                                        <li><i class="fa fa-star-o"></i></li>
                                                        <li><i class="fa fa-star-o"></i></li>
                                                        <li><i class="fa fa-star-o"></i></li>
                                                    </ul>
                                                    <div class="booking-item-rating-stars-active"
                                                        :style="{ width: `${item.review_data.score_total ? item.review_data.score_total * 2 * 10 : 0}%` }">
                                                        <ul class="booking-item-rating-stars">
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                            <li><i class="fa fa-star"></i></li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <span class="review">
                                                    <span v-if="item.review_data.total_review > 1">
                                                        {{ item.review_data.total_review }} Reviews
                                                    </span>
                                                    <span v-else>
                                                        {{ item.review_data.total_review }} Review
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="info">
                                                <div class="duration">
                                                    <i class="icofont-wall-clock"></i>
                                                    {{ item.duration }}H
                                                </div>
                                                <div class="g-price">
                                                    <div class="prefix">
                                                        <i class="icofont-flash"></i>
                                                        <span class="fr_text">from</span>
                                                    </div>
                                                    <div class="price">
                                                        <span class="onsale">${{ formatPrice(item.price) }}</span>
                                                        <span class="text-price">${{ formatPrice(item.sale_price)
                                                            }}</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="pagination">
                                    <button @click="changePage(currentPage - 1)"
                                        :disabled="currentPage === 1">Previous</button>
                                    <button v-for="page in totalPages" :key="page" @click="changePage(page)">{{ page
                                        }}</button>
                                    <button @click="changePage(currentPage + 1)"
                                        :disabled="currentPage === totalPages">Next</button>
                                </div>
                                <span class="count-string">Showing {{ startItem }} - {{ endItem }} of {{ total }}
                                    Tours</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';
import filterwidget from './filter-widget.vue';
import common from './common';
import searchwidget from './search-widget.vue';
import orderby from './order-by.vue';
import breadcrumb from './breadcrumb';
import topbar from './topbar.vue';

export default {
    components: {
        VueSlider,
        filterwidget,
        searchwidget,
        orderby,
        breadcrumb,
        topbar
    },
    mixins: [common],
    data() {
        return {
            type: "tour",
            tour_category: [],
            showDropdown: false,
            selected: {},
            breadcrumbData: [],
        }
    },
    mounted() {
        this.getTourData();
        //console.log('hotel Component mounted.');
    },
    computed: {

    },
    watch: {
        data(newData) {
            this.totalPages = Math.ceil(newData.length / this.pageSize);
        }
    },
    methods: {
        getTourData(params = {}) {
            this.isLoading = true;
            axios.get('/api/user/tour-list', { params }).then(({ data }) => {
                console.log("api tour-list data", data.data);
                this.data = data.data.rows;
                this.attributes = data.data.attributes;
                this.list_location = data.data.tour_location;
                this.total = data.data.rows.length;
                this.tour_category = data.data.tour_category;
                if (data.data.tour_min_max_price.length > 0) {
                    // Update min and max prices
                    this.minPrice = parseFloat(data.data.tour_min_max_price[0]);
                    this.maxPrice = parseFloat(data.data.tour_min_max_price[1]);

                    // Update price range after min and max are set
                    this.priceRange = [this.minPrice, this.maxPrice];
                }
                this.isLoading = false;
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        },
        onSearch(params) {
            console.log("params in event component",params);
            this.getTourData(params);
        },
        updateSearchParams(params) {
            this.searchParams = { ...this.searchParams, ...params };
            this.onSearch(this.searchParams);
        },
        updateFilterParams(params) {
            this.searchParams = { ...this.searchParams, ...params };
            this.onSearch(this.searchParams);
        },
        updateOrderParams(params){
            this.searchParams = { ...this.searchParams, ...params };
            this.onSearch(this.searchParams);
        }
    }
}
</script>

<style scoped>
.bravo-autocomplete {
    opacity: 1 !important;
    visibility: unset !important;
}

span.count-string {
    float: right;
    padding-top: 20px;
}

button.btn.btn-link.btn-apply-price-range {
    margin-top: 30px !important;
}
</style>

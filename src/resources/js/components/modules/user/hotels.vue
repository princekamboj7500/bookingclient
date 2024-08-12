<template>
    <div class="bravo_search_hotel">
        <topbar></topbar>
        <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
        <div class="bravo_banner" style="background-image: url(/uploads/demo/hotel/banner-search-hotel.jpg)">
            <div class="container">
                <h1>
                    Search for hotel
                </h1>
            </div>
        </div>
        <div class="bravo_form_search">
            <div class="container" v-if="list_location">
                <searchwidget :location-list="list_location" :type="type" :price-range-array="priceRange" @search="updateSearchParams"></searchwidget>
            </div>
        </div>
        <div class="container">
            <div v-if="isLoading" id="loader"></div>
            <div v-else class="row">
                <div class="col-lg-3 col-md-12" v-if="priceRange.length > 0">
                    <filterwidget :filter-attributes="attributes" :is-tour="false" :type="type"
                        :min-price-range="minPrice" :max-price-range="maxPrice" :price-range-array="priceRange" @filter="updateFilterParams"/>
                </div>
                <div class="col-lg-9 col-md-12">

                    <div class="bravo-list-item">
                        <div class="topbar-search">
                            <h2 class="text result-count">
                                {{ total }} hotels found
                            </h2>
                            <div class="control bc-form-order">
                                <div class="item">
                                    <a href="/hotel?_layout=map">Show on the map</a>
                                </div>
                                <div>
                                    <orderby :price-range-array="priceRange" @orderby="updateOrderParams"></orderby>
                                </div>
                            </div>
                        </div>
                        <div class="ajax-search-result">
                            <div class="list-item">
                                <div class="row">
                                    <div v-for="hotel in paginatedData" :key="hotel.id" class="col-lg-4 col-md-12">
                                        <div class="item-loop">
                                            <div v-if="hotel.is_featured == 1" class="featured">Featured</div>
                                            <div class="thumb-image">
                                                <router-link :to="{ name: 'hotelDetail', params:{hotel :hotel.slug} }" class="btn btn-info">
                                                    <img class="img-responsive lazy loaded" :src=hotel.feature_image_url
                                                    alt="Dylan Hotel">
                                                  </router-link>
                                                <div v-if="hotel.star_rate" class="star-rate">
                                                    <div class="list-star">
                                                        <ul class="booking-item-rating-stars">
                                                            <li v-for="star in hotel.star_rate" :key="star">
                                                                <i class="fa fa-star"></i>
                                                            </li>
                                                        </ul>
                                                    </div>
                                                </div>
                                                <div class="service-wishlist" :data-id="hotel.id"
                                                    :data-type="hotel.type">
                                                    <i class="fa fa-heart"></i>
                                                </div>
                                            </div>
                                            <div class="item-title">
                                                <a :href="`/${hotel.slug}`">{{ hotel.title }}</a>
                                            </div>
                                            <div class="location" v-if="hotel.location_id">
                                                {{ hotel.location.name }}
                                            </div>
                                            <div class="service-review">
                                                <span class="rate">{{ hotel.review_data.score_total }}/5
                                                    <span class="rate-text">{{ hotel.review_data.score_text }}
                                                    </span>
                                                </span>

                                                <span class="review">
                                                    <span v-if="hotel.review_data.total_review > 1">
                                                        {{ hotel.review_data.total_review }} Reviews
                                                    </span>
                                                    <span v-else>
                                                        {{ hotel.review_data.total_review }} Review
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="info">
                                                <div class="g-price">
                                                    <div class="prefix"><span class="fr_text">from</span></div>
                                                    <div class="price"><span class="text-price">${{
                                                            formatPrice(hotel.price) }} <span
                                                                class="unit">/night</span></span></div>
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
                                    Hotels</span>
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
import common from './common';
import filterwidget from './filter-widget.vue';
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
            type: "hotel",
            showDropdown: false,
            selected: {},
            dropdownOpenRecomended: false,
            breadcrumbData: [],
        }
    },
    mounted() {
        this.getHotelData();
        //console.log('hotel Component mounted.');
    },
    computed: {

    },
    watch: {
        data(newData) {
            this.totalPages = Math.ceil(newData.length / this.pageSize);
        },
    },
    methods: {
        getHotelData(params = {}) {
            this.isLoading = true;
            axios.get('/api/user/hotel-list', { params }).then(({ data }) => {
                console.log("api hotel-list data", data.data);
                this.data = data.data.rows;
                this.attributes = data.data.attributes;
                this.list_location = data.data.list_location;
                this.total = data.data.rows.length;
                if (data.data.hotel_min_max_price.length > 0) {
                    // Update min and max prices
                    this.minPrice = parseFloat(data.data.hotel_min_max_price[0]);
                    this.maxPrice = parseFloat(data.data.hotel_min_max_price[1]);

                    // Update price range after min and max are set
                    this.priceRange = [this.minPrice, this.maxPrice];
                }
                this.isLoading = false;
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
        },
        onSearch(params) {
            console.log("params in hotel component",params);
            this.getHotelData(params);
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
span.count-string {
    float: right;
    padding-top: 20px;
}

button.btn.btn-link.btn-apply-price-range {
    margin-top: 30px !important;
}
</style>

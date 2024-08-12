<template>
    <div class="bravo_search_space">
        <topbar></topbar>
        <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
        <div class="bravo_banner" style="background-image: url(/uploads/demo/hotel/banner-search-hotel.jpg)">
            <div class="container">
                <h1>
                    Search for Space
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
                <div class="col-lg-3 col-md-12">
                    <filterwidget :filter-attributes="attributes" :is-tour="false" :type="type"
                        :min-price-range="minPrice" :max-price-range="maxPrice" :price-range-array="priceRange" @filter="updateFilterParams"/>
                </div>
                <div class="col-lg-9 col-md-12">

                    <div class="bravo-list-item">
                        <div class="topbar-search">
                            <h2 class="text result-count">
                                {{ total }} spaces found
                            </h2>
                            <div class="control bc-form-order">
                                <div class="item">
                                    <a href="/space?_layout=map">Show on the map</a>
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
                                        <div class="item-loop item-loop-wrap ">
                                            <div class="featured" v-if="item.is_featured == 1">
                                                Featured
                                            </div>
                                            <div class="thumb-image ">
                                                <router-link :to="{ name: 'spaceDetail', params:{space :item.slug} }" class="btn btn-info">
                                                    <img class="img-responsive lazy loaded" :src=item.feature_image_url
                                                    alt="LUXURY SINGLE">
                                                  </router-link>
                                                <div class="price-wrapper">
                                                    <div class="price">
                                                        <template v-if="item.sale_price == 0">
                                                            <span class="text-price">
                                                                ${{ formatPrice(item.price) }}
                                                                <span class="unit"
                                                                    v-if="item.booking_type_shift == 'by_day'">/day</span>
                                                                <span class="unit" v-else>/night</span>
                                                            </span>
                                                        </template>
                                                        <template v-else>
                                                            <span class="onsale">${{ formatPrice(item.price) }}</span>
                                                            <span class="text-price">
                                                                ${{ formatPrice(item.sale_price) }}
                                                                <span class="unit"
                                                                    v-if="item.booking_type_shift == 'by_day'">/day</span>
                                                                <span class="unit" v-else>/night</span>
                                                            </span>
                                                        </template>
                                                    </div>
                                                </div>
                                                <div class="service-wishlist " data-id="9" data-type="space">
                                                    <i class="fa fa-heart"></i>
                                                </div>
                                            </div>
                                            <div class="item-title">
                                                <a :href="`/${item.slug}`">
                                                    <i class="fa fa-bolt d-none"></i>
                                                    {{ item.title }}
                                                </a>
                                                <div class="sale_info" v-if="item.discount_percent">{{
                                                    item.discount_percent }}</div>
                                            </div>
                                            <div class="location" v-if="item.location_id">
                                                {{ item.location.name }}
                                            </div>
                                            <div class="service-review">
                                                <span class="rate">{{ item.review_data.score_total }}/5
                                                    <span class="rate-text">{{ item.review_data.score_text }}
                                                    </span>
                                                </span>
                                                <span class="review">
                                                    <span v-if="item.review_data.total_review > 1">
                                                        {{ item.review_data.total_review }} Reviews
                                                    </span>
                                                    <span v-else>
                                                        {{ item.review_data.total_review }} Review
                                                    </span>
                                                </span>
                                            </div>
                                            <div class="amenities">
                                                <span v-if="item.max_guests" class="amenity total" data-toggle="tooltip"
                                                    title="No. People" data-original-title="No. People">
                                                    <i class="input-icon field-icon icofont-people  "></i> {{
                                                    item.max_guests }}
                                                </span>
                                                <span v-if="item.bed" class="amenity bed" data-toggle="tooltip"
                                                    title="No. Bed" data-original-title="No. Bed">
                                                    <i class="input-icon field-icon icofont-hotel"></i> {{ item.bed }}
                                                </span>
                                                <span v-if="item.bathroom" class="amenity bath" data-toggle="tooltip"
                                                    title="No. Bathroom" data-original-title="No. Bathroom">
                                                    <i class="input-icon field-icon icofont-bathtub"></i> {{
                                                    item.bathroom }}
                                                </span>
                                                <span v-if="item.square" class="amenity size" data-toggle="tooltip"
                                                    title="Square" data-original-title="Square">
                                                    <i class="input-icon field-icon icofont-ruler-compass-alt"></i> {{
                                                    item.square }} sqft
                                                </span>
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
                                    Spaces</span>
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
            type: "space",
            showDropdown: false,
            selected: {},
            dropdownOpenRecomended: false,
            breadcrumbData: [],
        }
    },
    mounted() {
        this.getSpaceData();
        //console.log('space Component mounted.');
    },
    computed: {

    },
    watch: {
        data(newData) {
            this.totalPages = Math.ceil(newData.length / this.pageSize);
        }
    },
    methods: {
        getSpaceData(params = {}) {
            this.isLoading = true;
            axios.get('/api/user/space-list', { params }).then(({ data }) => {
                console.log("api space-list data", data.data);
                this.data = data.data.rows;
                this.attributes = data.data.attributes;
                this.list_location = data.data.list_location;
                this.total = data.data.rows.length;
                if (data.data.space_min_max_price.length > 0) {
                    // Update min and max prices
                    this.minPrice = parseFloat(data.data.space_min_max_price[0]);
                    this.maxPrice = parseFloat(data.data.space_min_max_price[1]);

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
            this.getSpaceData(params);
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

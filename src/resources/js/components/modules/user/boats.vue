<template>
    <div class="bravo_search_boat">
        <topbar></topbar>
        <breadcrumb :type="type" :breadcrumb-data="breadcrumbData" />
        <div class="bravo_banner" style="background-image: url(/uploads/demo/hotel/banner-search-hotel.jpg)">
            <div class="container">
                <h1>
                    Search for Boat
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
                                {{ total }} boats found
                            </h2>
                            <div class="control bc-form-order">
                                <div class="item">
                                    <a href="boat?_layout=map">Show on the map</a>
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
                                                <router-link :to="{ name: 'boatDetail', params:{boat :item.slug} }" class="btn btn-info">
                                                    <img class="img-responsive lazy loaded" :src=item.feature_image_url
                                                    alt="LUXURY SINGLE">
                                                  </router-link>
                                                <div class="service-wishlist " data-id="9" data-type="space">
                                                    <i class="fa fa-heart"></i>
                                                </div>
                                            </div>
                                            <div class="location" v-if="item.location_id">
                                                {{ item.location.name }}
                                            </div>
                                            <div class="item-title">
                                                <a :href="`/${item.slug}`">
                                                    <i class="fa fa-bolt d-none"></i>
                                                    {{ item.title }}
                                                </a>
                                                <div class="sale_info" v-if="item.discount_percent">{{
                                                    item.discount_percent }}</div>
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
                                                <span v-if="item.max_guest" class="amenity total"
                                                    title="Max Guests" data-toggle="tooltip">
                                                    <i class="icofont-ui-user-group input-icon field-icon"></i>
                                                    <span class="text">{{ item.max_guest }}</span>
                                                </span>
                                                <span v-if="item.cabin" class="amenity bed" title="Cabin"
                                                    data-toggle="tooltip">
                                                    <i class="input-icon field-icon icofont-sail-boat-alt-2"></i>
                                                    <span class="text">{{ item.cabin }}</span>
                                                </span>
                                                <span v-if="item.length" class="amenity bath" title="Length Boat"
                                                    data-toggle="tooltip">
                                                    <i class="input-icon field-icon icofont-yacht"></i>
                                                    <span class="text">{{ item.length }}</span>
                                                </span>
                                                <span v-if="item.speed" class="amenity size" title="Speed"
                                                    data-toggle="tooltip">
                                                    <i class="input-icon field-icon icofont-speed-meter"></i>
                                                    <span class="text">{{ item.speed }}</span>
                                                </span>
                                            </div>
                                            <div class="info">
                                                <div class="g-price">
                                                    <div class="prefix">
                                                        <span class="fr_text">from</span>
                                                    </div>
                                                    <div class="price">
                                                        <span class="text-price">$ {{ formatPrice(item.min_price)
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
                                    Boats</span>
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
            type: "boat",
            showDropdown: false,
            selected: {},
            dropdownOpenRecomended: false,
            breadcrumbData: [],
        }
    },
    mounted() {
        this.getData();
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
        getData(params = {}) {
            this.isLoading = true;
            axios.get('/api/user/boat-list', { params }).then(({ data }) => {
                //console.log("api boat-list data", data.data);
                this.data = data.data.rows;
                this.attributes = data.data.attributes;
                this.list_location = data.data.list_location;                ;
                this.total = data.data.rows.length;
                if (data.data.boat_min_max_price.length > 0) {
                    // Update min and max prices
                    this.minPrice = parseFloat(data.data.boat_min_max_price[0]);
                    this.maxPrice = parseFloat(data.data.boat_min_max_price[1]);

                    // Update price range after min and max are set
                    this.priceRange = [this.minPrice, this.maxPrice];
                }
                this.isLoading = false;
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        },
        onSearch(params) {
            //console.log("params in boat component",params);
            this.getData(params);
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

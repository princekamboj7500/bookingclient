<template>
    <div class="main-div">
        <div class="g-faq" v-if="type != 'Hotel'">
            <h3>FAQs</h3>
            <div class="item" v-for="(item, index) in bottomData.faqs" :key="index" @click="toggleDropdownFaq(index)"
                :class="{ active: currentActiveIndex === index }">
                <div class="header">
                    <i class="field-icon icofont-support-faq"></i>
                    <h5>{{ item.title }}</h5>
                    <span class="arrow"><i :class="['fa', item.open ? 'fa-angle-up' : 'fa-angle-down']"></i></span>
                </div>
                <div class="body" v-show="item.open">
                    {{ item.content }}
                </div>
            </div>
        </div>

        <div class="g-overview" v-if="type == 'Boat'">
            <h3>Cancellation Policy</h3>
            <div class="description">
                {{ bottomData.cancel_policy }} </div>
        </div>

        <div class="g-overview" v-if="type == 'Boat'">
            <h3>Additional Terms &amp; Information</h3>
            <div class="description">
                <div v-for="item in bottomData.terms_information" :key="item.content">
                    <p v-if="item.type === 'paragraph'">{{ item.content }}</p>
                    <h4 v-if="item.type === 'heading'">{{ item.content }}</h4>
                    <ul v-if="item.type === 'list'">
                        <li v-for="(listItem, index) in item.items" :key="index">{{ listItem }}</li>
                    </ul>
                </div>
            </div>
        </div>

        <div class="g-location">
            <div class="location-title">
                <h3>Location</h3>
                <div class="address">
                    <i class="icofont-location-arrow"></i>
                    Prince St Station
                </div>
            </div>

            <div class="location-map">
                <div>
                    <gmap-map :center="center" :zoom="zoom" style="width: 100%; height: 400px;">
                        <gmap-marker v-for="marker in markers" :position="marker.position"
                            :key="marker.position.lat"></gmap-marker>
                    </gmap-map>
                </div>
            </div>
        </div>
        <div class="bravo-reviews" id="bravo-reviews">
            <h3>Reviews</h3>
            <div class="review-box">
                <div class="row">
                    <div class="col-lg-5">
                        <div class="review-box-score">
                            <div class="review-score">
                                {{ bottomData.review_data.score_total }}<span class="per-total">/5</span>
                            </div>
                            <div class="review-score-text">{{ bottomData.review_data.review_text }}</div>
                            <div class="review-score-base">
                                Based on
                                <span> {{ bottomData.review_data.total_review }} reviews </span>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-7">
                        <div class="review-sumary">
                            <div class="item">
                                <div class="label">Excellent</div>
                                <div class="progress">
                                    <div class="percent green" style="width: 50%"></div>
                                </div>
                                <div class="number">2</div>
                            </div>
                            <div class="item">
                                <div class="label">Very Good</div>
                                <div class="progress">
                                    <div class="percent green" style="width: 50%"></div>
                                </div>
                                <div class="number">2</div>
                            </div>
                            <div class="item">
                                <div class="label">Average</div>
                                <div class="progress">
                                    <div class="percent green" style="width: 0%"></div>
                                </div>
                                <div class="number">0</div>
                            </div>
                            <div class="item">
                                <div class="label">Poor</div>
                                <div class="progress">
                                    <div class="percent green" style="width: 0%"></div>
                                </div>
                                <div class="number">0</div>
                            </div>
                            <div class="item">
                                <div class="label">Terrible</div>
                                <div class="progress">
                                    <div class="percent green" style="width: 0%"></div>
                                </div>
                                <div class="number">0</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="review-list">
                <div v-for="item in paginatedData" :key="item.id" class="review-item">
                    <div class="review-item-head">
                        <div class="media">
                            <div class="media-left">
                                <img src="../../../../../assets/images/avatar.png">
                            </div>
                            <div class="media-body">
                                <h4 class="media-heading">{{ item.author.name }}</h4>
                                <div class="date">{{ formatDateTime(item.created_at) }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="review-item-body">
                        <h4 class="title">{{ item.title }}</h4>
                        <div v-if="item.rate_number">
                            <ul class="review-star">
                                <li v-for="i in 5" :key="i">
                                    <i :class="i <= item.rate_number ? 'fa fa-star' : 'fa fa-star-o'"></i>
                                </li>
                            </ul>
                        </div>
                        <div class="detail">
                            {{ item.content }}
                        </div>
                    </div>
                </div>
            </div>
            <div v-if="paginatedData.length > 0" class="review-pag-wrapper">
                <div class="bravo-pagination">
                    <button @click="prevPage" :disabled="currentPage === 1"><</button>
                    <span>Page {{ currentPage }} of {{ totalPages }}</span>
                    <button @click="nextPage" :disabled="currentPage === totalPages">></button>
                </div>
                <div class="review-pag-text">
                    Showing {{ startItem }} - {{ endItem }} of {{ totalItems }} total
                </div>
            </div>
            <div v-else class="review-pag-wrapper">
                No Reviews
            </div>
            <div class="review-message">
                You must
                <a href="#login" data-toggle="modal" data-target="#login">log in</a>
                to write review
            </div>
        </div>
    </div>
</template>

<script>
import * as VueGoogleMaps from 'vue2-google-maps';

export default {
    components: {
        'GmapMap': VueGoogleMaps.Map,
        'GmapMarker': VueGoogleMaps.Marker,
    },
    props: ['type', 'bottomData'],
    data() {
        return {
            currentPage: 1,
            itemsPerPage: 5,
            zoom: 12,
            center: { lat: null, lng: null },
            markers: [
                { position: { lat: null, lng: null } },
            ],
            currentActiveIndex: null,
        }
    },
    mounted() {
        //console.log('detail bottom Component mounted.');
        this.markers[0].position.lat = parseFloat(this.bottomData.map_lat);
        this.markers[0].position.lng = parseFloat(this.bottomData.map_lng);
        this.center.lat = parseFloat(this.bottomData.map_lat);
        this.center.lng = parseFloat(this.bottomData.map_lng);
    },
    computed: {
        paginatedData() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.bottomData.review_list.data.slice(start, end);
        },
        totalPages() {
            return Math.ceil(this.bottomData.review_list.data.length / this.itemsPerPage);
        },
        totalItems() {
            return this.bottomData.review_list.data.length;
        },
        startItem() {
            return (this.currentPage - 1) * this.itemsPerPage + 1;
        },
        endItem() {
            return Math.min(this.currentPage * this.itemsPerPage, this.totalItems);
        }
    },
    methods: {
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        formatDateTime(dateTime) {
            let date = new Date(dateTime);
            // Extract date components
            let month = date.getMonth() + 1;
            let day = date.getDate();
            let year = date.getFullYear();
            let hours = date.getHours();
            let minutes = date.getMinutes();
            // Ensure two-digit formatting where necessary
            month = month < 10 ? '0' + month : month;
            day = day < 10 ? '0' + day : day;
            hours = hours < 10 ? '0' + hours : hours;
            minutes = minutes < 10 ? '0' + minutes : minutes;
            // Return formatted string
            return `${month}/${day}/${year} ${hours}:${minutes}`;
        },
        toggleDropdownFaq(index) {
            if (this.currentActiveIndex === index) {
                // If the same item is clicked again, close it
                this.bottomData.faqs[index].open = !this.bottomData.faqs[index].open;
                if (!this.bottomData.faqs[index].open) {
                    this.currentActiveIndex = null;
                }
            } else {
                // Close previously opened item
                if (this.currentActiveIndex !== null) {
                    this.bottomData.faqs[this.currentActiveIndex].open = false;
                }
                // Open the clicked item
                this.bottomData.faqs[index].open = true;
                this.currentActiveIndex = index;
            }
        },
    }
}
</script>
<style>
.bravo-pagination button {
    border: unset;
    color: #000;
}
.bravo-pagination button:disabled {
    border: unset;
    color: grey;
}
.media-heading img {
    height: 62%;
    width: 8% !important;
}
</style>
<template>
    <div class="bravo_wrap">
        <!-- @include('Layout::parts.topbar')
        @include('Layout::parts.header') -->
        <div class="bravo_user_profile">
            <div class="container-fluid">
                <div class="row row-eq-height">
                    <div class="col-md-3">
                        <sidebar />
                    </div>
                    <div class="col-md-9">
                        <div class="user-form-settings">
                            <userbc :breadcrumbs="breadcrumbs"/>
                            <!-- @yield('content') -->
                            <div>
                                <h2 class="title-bar border-bottom">
                                    {{ title }}
                                    <div class="title-action">
                                        

                                        <router-link :to="{ name: 'vendorHotelCreate', params:{id :hotelId} }" class="btn btn-info">
                                           <i class="fa fa-hand-o-right"></i> Back to hotel
                                         </router-link>
                                        
                                        <router-link :to="{ name: 'hotels'}" class="btn btn-warning">
                                           <i class="fa fa-calendar"></i> Availability Rooms
                                         </router-link>

                                        <router-link :to="{ name: 'vendorRoomCreate', params :{hotelid : hotelId} }" class="btn btn-success">
                                           <i class="fa fa-plus"></i> Add Room
                                         </router-link>
                                    </div>
                                </h2>
                                <message-component v-if="message" :message="message"></message-component>
                                <div v-if="isLoading" id="loader"></div>
                                <div v-else-if="rooms.length">
                                    <div class="list-item">
                                        <div class="row">
                                            <div class="col-md-12" v-for="room in paginatedRooms" :key="room.id">
                                                <div class="item-list">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div class="thumb-image">
                                                                <a href="javascript:void(0)" target="_blank">
                                                                    <img v-if="room.image_id"
                                                                        :src="imageUrls[room.image_id]"
                                                                        class="img-responsive" alt="" />
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-9">
                                                            <div class="item-title">
                                                                <a href="#" target="_blank">
                                                                    {{ room.title }}
                                                                </a>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-ui-settings" aria-hidden="true"></i>
                                                                Number:
                                                                <span class="">{{ room.number }} </span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-money"
                                                                    aria-hidden="true"></i>
                                                                price:
                                                                <span class="">{{ room.price }} </span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-ui-settings" aria-hidden="true"></i>
                                                                status: <span
                                                                    :class="['badge', `badge-${room.status}`]">{{
                                                                        room.status }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-wall-clock"></i>

                                                                Last Updated: {{ formatDate(room.updated_at) }}
                                                            </div>
                                                            <div class="control-action">
                                                                <button class="btn btn-warning"
                                                                    @click="edit(room.id)">Edit</button>
                                                                <button class="btn btn-danger"
                                                                    data-confirm="Do you want to delete?"
                                                                    @click="handleDelete(room.id)">Del</button>
                                                                    <button v-if="room.status == 'publish'"
                                                                        @click="makeHide(room.id)"
                                                                        class="btn btn-secondary">Make hide</button>
                                                                    <button v-if="room.status == 'draft'"
                                                                        @click="makePublish(room.id)"
                                                                        class="btn btn-success">Make publish</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="pagination">
                                        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
                                        <button v-for="page in totalPages" :key="page" @click="changePage(page)"
                                            :class="{ active: currentPage === page }">
                                            {{ page }}
                                        </button>
                                        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
                                    </div>

                                </div>
                                <div v-else>
                                    No Rooms
                                </div>
                            </div>
                            <!-- end content-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from '../sidebar.vue';
import userbc from '../user-bc.vue';
import axios from 'axios';
import common from '../common';

export default {
    components: {
        Sidebar,
        userbc
    },
    mixins: [common],
    data() {
        return {
            isRecovery: false,
            canCreate: false,
            message: null,
            rooms: [],
            currentPage: 1,
            itemsPerPage: 5,
            originalDate: null,
            formattedDate: '',
            hotelId: this.$route.params.id || null,
            breadcrumbs: [],
        };
    },
    computed: {
        title() {
            return this.isRecovery ? 'Recovery Rooms' : 'Manage Rooms';
        },
        totalPages() {
            return Math.ceil(this.rooms.length / this.itemsPerPage);
        },
        paginatedRooms() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.rooms.slice(start, end);
        },
    },
    mounted() {
        this.fetchRooms(this.hotelId);
    },
    methods: {
        fetchRooms(hotelId) {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            axios.get(`/api/vendor/${hotelId}/room-listing`, {
            })
                .then(({ data }) => {
                    console.log(data, "ddd")
                    console.log(data.rows.data)
                    this.rooms = data.rows.data;
                    this.breadcrumbs = data.data.breadcrumbs;
                      this.rooms.forEach(hotel => {
                    if (hotel.image_id) {
                        this.getImageList(hotel.image_id);
                    }
                });
                this.isLoading = false;
                })
                .catch(error => {
                    this.isLoading = false;
                    console.error("Error fetching rooms data:", error);
                });
        },
        edit(id) {
            console.log('Button clicked!', id);
            this.$router.push({ name: 'vendorRoomCreate', params: { hotelid: this.hotelId , id: id } });
        },
        handleDelete(id) {
            console.log(id, "Deleting entry...");
            
            axios.get(`/api/vendor/${this.hotelId}/room-del/${id}`)
                .then(response => {
                    console.log(response)
                    if (response) { // Assuming your API returns a success field
                        console.log('Entry deleted successfully:', response.data);
                        if (response.status === 200) {
                            // Alert the success message
                            this.fetchRooms(this.hotelId);
                        }
                    } else {
                        console.log('Failed to delete entry:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error deleting entry:', error.response ? error.response.data.message : error.message);
                });
        },
        makeHide(id) {
            console.log("post data", id);
            axios.post(`/api/vendor/${this.hotelId}/bulkEdit/${id}?action=make-hide`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchRooms(this.hotelId);
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        makePublish(id) {
            console.log("post data", id);
            axios.post(`/api/vendor/${this.hotelId}/bulkEdit/${id}?action=make-publish`).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    this.fetchRooms(this.hotelId);
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
            }
        },
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
            }
        },
        changePage(page) {
            this.currentPage = page;
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            const formatted = `${this.padZero(date.getMonth() + 1)}/${this.padZero(date.getDate())}/${date.getFullYear()} ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}`;
            return formatted;
        },
        padZero(num) {
            return num < 10 ? "0" + num : num;
        }
    }
}
</script>
<style>
.item-title {
    padding: 15px 0 10px 0;
    font-size: 16px;
    line-height: 22px;
}

.item-title a {
    color: black;
    text-decoration: none;
}

.location {
    font-size: 13px;
    color: #5E6D77;
    padding-bottom: 10px;
}

.control-action {
    text-align: right;
    margin-right: 15px;
    position: absolute;
    right: 13px;
    bottom: 15px;
}

.item-list {
    border: 1px solid #dfdfdf;
    border-radius: 3px;
    overflow: hidden;
    position: relative;
    margin-bottom: 30px;
}
</style>
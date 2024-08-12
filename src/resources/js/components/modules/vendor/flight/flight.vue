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
                                    <router-link :to="{ name: 'vendorFlightCreate' }" v-if="canCreate && !isRecovery"
                                        @click="addFlight" class="btn-change-password">
                                        Add Flight

                                    </router-link>

                                    <router-link to="/user/flight-create-vue" class="btn-change-password">Add
                                        Flight</router-link>
                                </h2>
                                <message-component v-if="message" :message="message"></message-component>
                                <div v-if="isLoading" id="loader"></div>
                                <div v-else-if="spaces.length">
                                    <div class="list-item">
                                        <div class="row">
                                            <div class="col-md-12" v-for="space in paginatedSpaces" :key="space.id">
                                                <div class="item-list">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            <div class="thumb-image">
                                                                <a href="#" target="_blank">
                                                                    <img src="http://127.0.0.1:8000/uploads/demo/flight/airline/img3.jpg"
                                                                        class="img-responsive" alt="">
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-9">
                                                            <div class="item-title">
                                                                <a href="#" target="_blank">
                                                                    {{ space.title }}
                                                                </a>
                                                            </div>
                                                            <div class="location">
                                                                <i class="fa fa-plane" aria-hidden="true"></i>
                                                                Airport From:
                                                                <span class="">{{ space.airport_from.name }} {{
                                                                    formatDate(space.departure_time) }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="fa fa-plane fa-rotate-90"
                                                                    aria-hidden="true"></i>
                                                                Airport To:
                                                                <span class="">{{ space.airport_to.name }} {{
                                                                    formatDate(space.arrival_time)}}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="fa fa-clock-o" aria-hidden="true"></i>
                                                                Duration: <span class="">{{ space.duration }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-ui-settings"></i>
                                                                Status: <span class="badge badge-">{{ space.status
                                                                    }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-wall-clock"></i>

                                                                Last Updated: {{ formatDate(space.updated_at) }}
                                                            </div>
                                                            <div class="control-action">
                                                                <button class="btn btn-warning"
                                                                    @click="handleClick(space.id)">Edit</button>
                                                                <button class="btn btn-danger"
                                                                    data-confirm="Do you want to delete?"
                                                                    @click="handleDelete(space.id)">Del</button>
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
                                    No Flights
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
            spaces: [],
            currentPage: 1,
            itemsPerPage: 5,
            originalDate: null,
            formattedDate: '',
            breadcrumbs: [],
        };
    },
    computed: {
        title() {
            return this.isRecovery ? 'Recovery Flights' : 'Manage Flights';
        },
        totalPages() {
            return Math.ceil(this.spaces.length / this.itemsPerPage);
        },
        paginatedSpaces() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            return this.spaces.slice(start, end);
        },
    },
    mounted() {
        this.fetchFlights();
    },
    methods: {
        fetchFlights() {
            const start = (this.currentPage - 1) * this.itemsPerPage;
            const end = start + this.itemsPerPage;
            axios.get('/api/vendor/flight-listing', {
            })
                .then(({ data }) => {
                    console.log(data, "ddd")
                    this.spaces = data.data.rows.data;
                    this.breadcrumbs = data.data.breadcrumbs;
                    this.isLoading = false;
                })
                .catch(error => {
                    this.isLoading = false;
                    console.error("Error fetching airline data:", error);
                });
        },
        handleClick(id) {
            console.log('Button clicked!', id);
            this.$router.push({ name: 'vendorFlightCreate', params: { id } });
        },
        handleDelete(id) {
            console.log(id, "Deleting entry...");

            axios.get(`/api/vendor/flight-del/${id}`)
                .then(response => {
                    console.log(response)
                    if (response) { // Assuming your API returns a success field
                        console.log('Entry deleted successfully:', response.data);
                        if (response.data === 'success') {
                            // Alert the success message
                            this.fetchFlights();
                        }
                    } else {
                        console.log('Failed to delete entry:', response.data);
                    }
                })
                .catch(error => {
                    console.error('Error deleting entry:', error.response ? error.response.data.message : error.message);
                });
        },
        addFlight() {
            this.$router.push({ name: 'tourCreate' });
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
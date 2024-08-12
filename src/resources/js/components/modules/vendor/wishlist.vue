<template>
    <div class="bravo_wrap">
        <!-- @include('Layout::parts.topbar')
        @include('Layout::parts.header') -->
        <div class="bravo_user_profile">
            <div class="container-fluid">
                <div class="row row-eq-height">
                    <div class="col-md-3">
                        <Sidebar />
                    </div>
                    <div class="col-md-9">
                        <div class="user-form-settings">
                            <userbc :breadcrumbs="breadcrumbs"/>
                            <!-- @yield('content') -->
                            <div>
                                <h2 class="title-bar border-bottom">
                                    WishList
                                </h2>
                                <div v-if="spaces.length">
                                    <div class="list-item">
                                        <div class="row">
                                            <div class="col-md-12" v-for="space in paginatedSpaces" :key="space.id">
                                                <div class="item-list">
                                                    <div class="row">
                                                        <div class="col-md-3">
                                                            
                                                            <div class="thumb-image">
                                                                <a href="#" target="_blank">
                                                                    <img src="https://sandbox.bookingcore.co/uploads/demo/car/car-7.jpg"
                                                                        class="img-responsive" alt="">
                                                                </a>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-9">
                                                            <div class="item-title">
                                                                <a href="https://sandbox.bookingcore.co/car/vinfast-lux-sa20-plus"
                                                                    target="_blank">
                                                                    {{ space.title }}
                                                                </a>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-license"></i>
                                                                Service Type:
                                                                <span>{{ space.type }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-paper-plane"></i>
                                                                Location:
                                                                <span>{{ space.location }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-money"></i>
                                                                Price: <span>{{ space.price }}</span>
                                                            </div>
                                                            <div class="location">
                                                                <i class="icofont-badge"></i>
                                                                {{ space.reviews }} Reviews: <span class="badge badge-"></span>
                                                            </div>
                                                            <div class="location">
                                                            </div>
                                                            <div class="control-action">
                                                                <button class="btn btn-warning">View</button>
                                                                <button class="btn btn-danger"
                                                                    data-confirm="Do you want to delete?">Remove</button>
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
                                    No Items
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
import Sidebar from './sidebar.vue';
import userbc from './user-bc.vue';

export default {
    components: {
        Sidebar,
        userbc
    },
    data() {
        return {
            breadcrumbs: [
                {
                    name: 'Wishlist',
                    url: '#'
                }
            ],
            message: [],
            spaces: [],
            currentPage: 1,
        };
    },
    mounted() {
        this.fetchData();
    },
    methods: {
        fetchData() {
            axios.get('/api/vendor/wishlist').then(({ data }) => {
                console.log("api wishlist data", data.data);
                //this.breadcrumbs = data.data.breadcrumbs;
                if(data.data.length > 0){
                    this.spaces = data.data;
                }
            }).catch(error => {
                console.error("Error fetching data:", error);
            });
        },
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
        changePage(page) {
            this.currentPage = page;
        }
    },
    computed: {
        paginatedSpaces() {
            return this.spaces;
        },
        totalPages() {
            return 1;
        }
    }
}
</script>

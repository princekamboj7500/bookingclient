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
                            <h2 class="title-bar border-bottom">
                                Manage Coupon
                                <router-link :to="{ name: 'vendorCouponCreate' }" 
                                     class="btn-change-password">
                                    Add Coupon
                                </router-link>
                            </h2>

                            <div v-if="coupans.length > 0" class="bravo-list-item">
                                <div class="bravo-pagination">
                                    <span class="count-string">
                                        {{ `Showing ${firstItem} - ${lastItem} of ${total} coupons` }}
                                    </span>
                                    <!-- Add pagination component or controls here -->
                                </div>
                                <div class="list-item">
                                    <div class="booking-history-manager">
                                        <div class="tab-content">
                                            <div class="table-responsive">
                                                <table
                                                    class="table table-bordered table-striped table-booking-history mb-0">
                                                    <thead>
                                                        <tr>
                                                            <th>Code</th>
                                                            <th>Name</th>
                                                            <th>Amount</th>
                                                            <th>Discount Type</th>
                                                            <th>End Date</th>
                                                            <th width="100px">Status</th>
                                                            <th width="100px">Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <tr v-for="row in coupans" :key="row.id" :class="row.status">
                                                            <td class="title">
                                                                <strong>{{ row.code }}</strong>
                                                            </td>
                                                            <td>{{ row.name }}</td>
                                                            <td>{{ row.amount }}</td>
                                                            <td>{{ row.discount_type === 'percent' ? 'Percent' :
                                                                'Amount' }}</td>
                                                            <td>{{ row.end_date }}</td>
                                                            <td>
                                                                <span :class="`badge badge-${row.status}`">{{ row.status
                                                                    }}</span>
                                                            </td>
                                                            <td>
                                                                <a href="javascript:void(0)"
                                                                @click="edit(row.id)" class="btn btn-xs btn-primary btn-info-booking mt-1">
                                                                    <i class="fa fa-edit"></i> Edit
                                                                </a>
                                                                <a href="javascript:void(0)"
                                                                @click="deleteCoupon(row.id)" class="btn btn-xs btn-secondary btn-info-booking mt-1">
                                                                    <i class="fa fa-remove"></i> Delete
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="bravo-pagination">
                                    <span class="count-string">
                                        {{ `Showing ${firstItem} - ${lastItem} of ${total} coupons` }}
                                    </span>
                                    <!-- Add pagination component or controls here -->
                                </div>
                            </div>
                            <div v-else>
                                No Coupons
                            </div>
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
            breadcrumbs: [],
            coupans: [],
            firstItem: 0,
            lastItem: 0,
            total: 0,
        };
    },
    computed: {

    },
    mounted() {
        // Fetch data here
        this.fetchCoupans();
    },
    methods: {
        fetchCoupans() {
            axios.get('/api/vendor/coupan-list').then(({ data }) => {
                console.log("api message data", data.data);
                this.firstItem = data.data.rows.from;
                this.lastItem = data.data.rows.to;
                this.total = data.data.rows.total;
                this.coupans = data.data.rows.data;
                this.breadcrumbs = data.data.breadcrumbs;
                //this.getImage(data.data.coupans.data[0].banner_image_id);
            }).catch(error => {
                console.error("Error fetching in data:", error);
            });
        },
        edit(id){
            this.$router.push({ name: 'vendorCouponCreate', params: { id } });
        },
        deleteCoupon(id){
            console.log("in delete");
            axios.get(`/api/vendor/del-coupon/${id}`).then(({ response }) => {
                console.log("delete success", response);
                this.fetchCoupans();
            }).catch(error => {
                console.error("Error fetching image data:", error);
                return null;
            });
        },
    }
}
</script>

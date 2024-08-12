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
                            <div v-if="breadcrumbs.length > 0">
                                <userbc :breadcrumbs="breadcrumbs"/>
                            </div>
                            <!-- @yield('content') -->
                            <h2 class="title-bar border-bottom">
                                My Current Plan
                            </h2>
                            <div class="row" v-if="plans.length">
                                <div class="col-lg-12">
                                    <div class="ls-widget">
                                        <div class="tabs-box">
                                            <div class="widget-title">
                                                <h4>My Current Plan</h4>
                                            </div>
                                            <div class="widget-content">
                                                <table class="table table-bordered table-striped  mb-5">
                                                    <thead>
                                                        <tr>
                                                            <th>Plan ID</th>
                                                            <th>Plan Name</th>
                                                            <th>Expiry</th>
                                                            <th>Total</th>
                                                            <th>Price</th>
                                                            <th>Status</th>
                                                        </tr>
                                                    </thead>

                                                    <tbody v-for="plan in plans">
                                                        <tr>
                                                            <td>#{{ plan.id }}</td>
                                                            <td class="trans-id">{{ plan.plan_data.title }}</td>
                                                            <td class="total-jobs">{{ plan.end_date }}</td>
                                                            <td class="used"> {{ plan.max_service }} </td>
                                                            <td class="remaining">{{ plan.price
                                                                }}</td>
                                                            <td><span class="text-success">{{ plan.status == 1 ? 'Active' : 'Pending' }}</span></td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div v-else>
                                No Plans
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
            plans: [],
            breadcrumbs: [{
                class: "active",
                name: "My plans"
            }],
        };
    },
    mounted() {
        axios.get('/api/vendor/my-plan').then(({ data }) => {
            console.log("api message data", data.data);
            this.plans = data.data.plans;
        }).catch(error => {
            console.error("Error fetching in data:", error);
        });
    },
    methods: {

    }
}
</script>

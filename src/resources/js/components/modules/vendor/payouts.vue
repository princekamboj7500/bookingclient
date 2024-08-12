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
                                Manage Payouts
                            </h2>
                            <div class="booking-history-manager">
                                <div class="alert alert-warning">No payout methods available. Please contact
                                    administrator</div>
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
                        "name": 'Vendor Dashboard',
                        "url": "#"
                    },
                    {
                        "name": 'Payouts',
                        "url": "#"
                    },
                ]
        };
    },
    mounted() {
        // Fetch data here
    },
    methods: {

    }
}
</script>

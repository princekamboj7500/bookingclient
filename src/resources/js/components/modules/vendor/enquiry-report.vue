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
                            <userbc :breadcrumbs="breadcrumbs" />
                            <!-- @yield('content') -->
                            <h2 class="title-bar no-border-bottom">
                                Enquiry Report
                            </h2>
                            <div class="booking-history-manager">
                                <div class="tabbable">
                                    No data
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
                    "name": 'Enquiry Report',
                    "url": "#"
                }
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

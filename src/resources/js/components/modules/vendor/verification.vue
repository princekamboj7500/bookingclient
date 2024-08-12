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
                                Verification data
                            </h2>
                            <div class="booking-history-manager">
                                <div class="form-group">
                                    <div class="row align-items-center">
                                        <label class="col-md-3 text-right col-form-label">Phone:
                                        </label>
                                        <div class="col-md-4">
                                            <div class=""><strong>{{ verify_data_phone }}</strong>
                                            </div>
                                            <span class="badge badge-secondary"><i>Not Verified</i></span>
                                        </div>
                                    </div>
                                </div>
                                <div class="form-group">
                                    <div class="row align-items-center">

                                        <label class="col-md-3 text-right col-form-label">ID Card
                                            <span class="text-danger">*</span>:
                                        </label>
                                        <div class="col-md-4 btn-upload-private-wrap">
                                            <div class="private-file-lists mb-2">
                                            </div>
                                            <div class="private-file-lists mb-2">
                                                <a target="_blank" :href="downloadLink">{{ filename }}</a>
                                            </div>
                                            <span class="badge badge-secondary"><i>Not Verified</i></span>
                                        </div>
                                    </div>
                                </div>
                                <hr>
                                <div class="row">
                                    <div class="col-md-3"></div>
                                    <div class="col-md-4">
                                        <router-link :to="{ name: 'vendorVerificationUpdate' }" class="btn btn-warning">
                                            <i class="fa fa-edit"></i> Update verification data </router-link>
                                    </div>
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
            verify_data_phone: 'N/A',
            filename: 'N/A',
            downloadLink: '',
            breadcrumbs: []
        };
    },
    mounted() {
        // Fetch data here media/private/data
        axios.get('/api/vendor/media/private/data').then(({ data }) => {
            console.log("get data response", data);
            console.log("phone", data.data.fields.phone.data);
            this.breadcrumbs = data.data.breadcrumbs;
            if (data.data) {
                console.log("id_card", JSON.parse(data.data.fields.id_card.data));
                var id_card_data = JSON.parse(data.data.fields.id_card.data);
                //console.log("id_card_data",id_card_data.name,id_card_data.download);
                this.verify_data_phone = data.data.fields.phone.data;
                this.filename = id_card_data.name;
                this.downloadLink = id_card_data.download;
            }

        }).catch(error => {
            console.error("Error fetching image data:", error.response ? error.response.data : error.message);
        });
    },
    methods: {

    }
}
</script>

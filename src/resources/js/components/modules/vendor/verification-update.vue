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
                                Update verification data
                            </h2>
                            <div class="alert alert-success alert-block" v-if="isShowSuccess">
                                <button type="button" class="close" @click="hideAlert" data-dismiss="alert">×</button>
                                <strong>{{ successMsg }}</strong>
                            </div>
                            <div class="booking-history-manager">
                                <form action="verification/store" @submit.prevent="handleSubmit">
                                    <div class="form-group">
                                        <div class="row align-items-center">
                                            <label class="col-md-3 text-right col-form-label">Phone:
                                            </label>
                                            <div class="col-md-4">
                                                <input type="text" class="form-control"
                                                    v-model="form.verify_data_phone">
                                            </div>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="row align-items-center">

                                            <label class="col-md-3 text-right col-form-label">ID Card

                                                <span class="text-danger">*</span>
                                                :
                                            </label>
                                            <div class="col-md-4 btn-upload-private-wrap">
                                                <div class="private-file-lists mb-2">
                                                    <a target="_blank" :href="downloadLink">{{ filename }}</a>
                                                </div>
                                                <span class="btn btn-primary btn-sm">
                                                    <i class="fa fa-upload"></i> Select File
                                                    <input class="btn-upload-private-file"
                                                        data-name="verify_data_id_card" data-multiple="" type="file"
                                                        @change="handleFileUpload">
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <hr>
                                    <div class="row">
                                        <div class="col-md-3"></div>
                                        <div class="col-md-4">
                                            <button class="btn btn-success"> <i class="fa fa-save"></i> Save changes
                                            </button>
                                        </div>
                                    </div>
                                </form>
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
            form: {
                verify_data_phone: '',
                verify_data_id_card: {},
            },
            old_card_data: {},
            selectedFile: null,
            filename: '',
            isShowSuccess: false,
            successMsg: '',
            downloadLink: '',
            breadcrumbs: [],
        };
    },
    mounted() {
        // Fetch data here
        this.getData();
    },
    methods: {
        getData(){
            // verification-update
            axios.get(`/api/vendor/verification-update`).then(({ data }) => {
                console.log("get data response", data);
                console.log("phone", data.data.fields.phone.data);
                this.breadcrumbs = data.data.breadcrumbs;
                if(data.data){
                    console.log("id_card", JSON.parse(data.data.fields.id_card.data));
                    var id_card_data = JSON.parse(data.data.fields.id_card.data);
                    this.old_card_data = data.data.fields.id_card.data;
                    //console.log("id_card_data",id_card_data.name,id_card_data.download);
                    this.form.verify_data_phone = data.data.fields.phone.data;
                    this.filename = id_card_data.name;
                    this.downloadLink = id_card_data.download;
                }

            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        handleFileUpload(event) {
            this.selectedFile = event.target.files[0];
            this.filename = this.selectedFile.name;
            this.uploadImage();
        },
        uploadImage() {
            //private/store
            if (!this.selectedFile) {
                alert('Please select a file first.');
                return;
            }

            const formData = new FormData();

            formData.append('file', this.selectedFile);

            axios.post('/api/vendor/private/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("API media response => ", response.data.data);

                if (response.status === 200) {
                    this.form.verify_data_id_card = JSON.stringify(response.data.data);
                }
            }).catch(({ response }) => {
                alert(response.data.message);
            }).finally(() => {
                // Optionally perform any cleanup or final actions
            });

        },
        handleSubmit() {
            //console.log("form", this.form);
            if(this.old_card_data){
                this.form.verify_data_id_card = this.old_card_data;
            }
            var postData = this.form;
            console.log("post data", postData);
            //return false;
            axios.post('/api/vendor/verification-store', postData).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    //this.profileData();
                    this.isShowSuccess = true;
                    this.successMsg = response.data.success;
                    this.getData();
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        hideAlert(){
            this.isShowSuccess = false;
        }
    }
}
</script>

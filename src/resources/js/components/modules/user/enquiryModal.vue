<template>
    <div class="modal fade" tabindex="-1" role="dialog" id="enquiry_form_modal">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content enquiry_form_modal_form">
                <div class="modal-header">
                    <h5 class="modal-title">Enquiry</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">×</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input type="hidden" name="service_id" value="6">
                    <input type="hidden" name="service_type" value="tour">
                    <div class="form-group">
                        <input type="text" class="form-control" value="" v-model="formData.enquiry_name" placeholder="Name *">
                    </div>
                    <div class="form-group">
                        <input type="text" class="form-control" value="" v-model="formData.enquiry_email" placeholder="Email *">
                    </div>
                    <div class="form-group" v-if="enquiry_is_submit">
                        <input type="text" class="form-control" value="" v-model="formData.enquiry_phone" placeholder="Phone">
                    </div>
                    <div class="form-group" v-if="enquiry_is_submit">
                        <textarea class="form-control" placeholder="Note" v-model="formData.enquiry_note"></textarea>
                    </div>
                    <div class="message_box text text-success">{{ msg }}</div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary btn-submit-enquiry" @click="submitData">Send now
                        <i class="fa icon-loading fa-spinner fa-spin fa-fw" v-if="buttonLoading"></i>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import common from './detail-common';

export default {
    props:['serviceId','serviceType'],
    data() {
        return {
            enquiry_is_submit: true,
            msg: "",
            formData: {
                enquiry_name: null,
                enquiry_email: null,
                enquiry_phone: null,
                enquiry_note: null
            },
            buttonLoading: false,
        }
    },
    mixins: [common],
    methods: {
        submitData() {
            this.buttonLoading = true;
            var postData = {
                service_id: this.serviceId,
                service_type: this.serviceType,
                enquiry_name: this.formData.enquiry_name,
                enquiry_email: this.formData.enquiry_email,
                enquiry_phone: this.formData.enquiry_phone,
                enquiry_note: this.formData.enquiry_note,
            }

            console.log("postData",postData);
            //booking/addEnquiry
            axios.post(`/booking/addEnquiry`, postData).then(response => {
                console.log("api response addEnquiry => ", response.data);

                if (response.status == 200) {
                    this.msg = response.data.message;
                    console.log("addEnquiry success");
                }
                this.buttonLoading = false;
            }).catch(({ response }) => {
                this.buttonLoading = false;
            });
        }
    }
}
</script>
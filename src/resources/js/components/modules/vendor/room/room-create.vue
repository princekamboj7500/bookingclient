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
                    <div v-if="isLoading" id="loader"></div>
                    
                    <div v-else class="col-md-9">
                        <div class="user-form-settings">
                            <userbc :breadcrumbs="breadcrumbs"/>
                            <!-- @yield('content') -->
                            <div class="row">
                                <div class="col-md-6">
                                    <h2 v-if="roomId" class="title-bar border-bottom">
                                        {{ page_title }}
                                    </h2>
                                    <h2 v-else class="title-bar border-bottom">
                                        {{ page_title }}
                                    </h2>
                                </div>
                                <div class="col-md-6 new-cls" v-if="hotelId">
                                    <div class="title-action">
                                        <router-link :to="{ name: 'vendorRoom', params: { id: hotelId } }"
                                            class="btn btn-info">
                                            <i class="fa fa-hand-o-right"></i>Manage Rooms
                                        </router-link>
                                    </div>
                                </div>
                            </div>


                            <div class="lang-content-box">
                                <form @submit.prevent="createRoom">
                                    <div class="form-add-service">
                                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a data-toggle="tab" href="#nav-hotel-content" aria-selected="true"
                                                :class="{ active: activeTab === 'content' }"
                                                @click="setActiveTab('content')">1. ROOM CONTENT</a>
                                            <a data-toggle="tab" href="#nav-hotel-location" aria-selected="false "
                                                :class="{ active: activeTab === 'location' }"
                                                @click="setActiveTab('location')">2. PRICING</a>
                                            <a data-toggle="tab" href="#nav-attribute" aria-selected="false"
                                                :class="{ active: activeTab === 'attributes' }"
                                                @click="setActiveTab('attributes')">4. Attributes</a>
                                            <!-- <a data-toggle="tab" href="#nav-ical" aria-selected="false">5. Ical</a> -->
                                        </div>
                                        <div class="tab-content" id="nav-tabContent">
                                            <div class="tab-pane fade show active" id="nav-tour-content"
                                                v-if="activeTab === 'content'">
                                                <!-- Include hotel content here -->
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Room Content</strong></div>
                                                    <div class="panel-body">
                                                        <div class="form-group magic-field" data-id="title"
                                                            data-type="title">
                                                            <label class="control-label">Room Name</label>
                                                            <input type="text" v-model="formData.title"
                                                                placeholder="Room Name" name="title"
                                                                class="form-control">
                                                        </div>

                                                        <div class="form-group">
                                                            <label>Featured Image</label>
                                                            <div class="dungdt-upload-box dungdt-upload-box-normal ">
                                                                <input type="file" ref="fileInputFeature"
                                                                    style="display: none;"
                                                                    @change="handleFileChangeFeature">
                                                                <div class="upload-box" v-if="!feature_image_imageUrl">
                                                                    <input type="hidden" name="image_id"
                                                                        v-model="formData.image_id" value="">
                                                                    <div class="text-center">
                                                                        <SVGComponent />
                                                                    </div>
                                                                    <div class="text-center">
                                                                        <span class="btn btn-primary btn-field-upload"
                                                                            @click="triggerFeatureFileInput">Upload
                                                                            image</span>
                                                                    </div>
                                                                </div>
                                                                <div v-if="feature_image_imageUrl">
                                                                    <div class="attach-demo-feature"
                                                                        title="Change file">
                                                                        <img :src="feature_image_imageUrl"
                                                                            alt="Uploaded Image" />
                                                                    </div>
                                                                    <div class="upload-actions justify-content-between">
                                                                        <a class="edit-img btn btn-sm btn-primary edit-single"
                                                                            @click="editImage('feature')"><i
                                                                                class="fa fa-edit"></i></a>
                                                                        <a class="delete btn btn-sm btn-danger"
                                                                            @click="deleteImage('feature')"><i
                                                                                class="fa fa-trash"></i></a>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label">Gallery</label>

                                                            <div class="dungdt-upload-multiple">
                                                                <div class="attach-demo d-flex">
                                                                    <div v-for="(image, index) in images" :key="index"
                                                                        class="image-preview">
                                                                        <img :src="image.url" class="preview-img" />
                                                                        <div class="image-actions">
                                                                            <!-- <button @click="editImage('gallery')">
                                                                                <i class="fa fa-edit"></i>
                                                                            </button> -->
                                                                            <button
                                                                                @click="deleteImage('gallery', index, image.id)">
                                                                                <i class="fa fa-trash"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="upload-box">
                                                                    <input type="file" multiple
                                                                        @change="onFileChangeGallery"
                                                                        ref="fileInputGallery" style="display: none;" />
                                                                    <div class="text-left">
                                                                        <span
                                                                            class="btn btn-info btn-sm btn-field-upload"
                                                                            @click="triggerFileInputGallery">
                                                                            <i class="fa fa-plus-circle"></i> Select
                                                                            images
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="activeTab === 'location'" class="tab-pane fade show active"
                                                id="nav-tour-location">
                                                <div class="panel">
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Price</label>
                                                                    <input type="text" v-model="formData.price"
                                                                        id="Price" class="form-control"
                                                                        placeholder="Price" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Number of room </label>
                                                                    <input type="number" v-model="formData.number"
                                                                        id="number" class="form-control" value=1
                                                                        placeholder="1" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <label class="control-label">Minimum day stay
                                                                        requirements </label>
                                                                    <input type="number"
                                                                        v-model="formData.min_day_stays" id="days"
                                                                        class="form-control" value=1
                                                                        placeholder="Ex:2" />
                                                                    <p>Leave blank if you dont need to set minimum day
                                                                        stay option</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Number of beds</label>
                                                                    <input type="text" v-model="formData.beds" id="beds"
                                                                        class="form-control" placeholder="1" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Room Size</label>
                                                                    <input type="text" v-model="formData.size" id="size"
                                                                        class="form-control" value=0 placeholder="0" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Max Adults</label>
                                                                    <input type="text" v-model="formData.adults"
                                                                        id="adults" class="form-control"
                                                                        placeholder="1" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Max Children</label>
                                                                    <input type="number" v-model="formData.children"
                                                                        id="children" class="form-control" value=1
                                                                        placeholder="0" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="activeTab === 'attributes'" class="tab-pane fade show active"
                                                id="nav-attribute">
                                                <!-- Include hotel attributes here -->
                                                <div v-for="attribute in attributes" :key="attribute.id" class="panel">
                                                    <div class="panel-title">
                                                        <strong>{{ `Attribute: ${attribute.name}` }}</strong>
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class="terms-scrollable">
                                                            <label v-for="term in attribute.terms" :key="term.id"
                                                                class="term-item">
                                                                <input type="checkbox" name="terms[]" :value="term.id"
                                                                    v-model="formData.terms" />
                                                                <span class="term-name">{{ term.name }}</span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <button class="btn btn-primary" type="submit">
                                            <i class="fa fa-save"></i> Save Changes
                                        </button>
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
import Sidebar from '../sidebar.vue';
import userbc from '../user-bc.vue';
import SVGComponent from '../SVGComponent.vue';
import { event } from 'jquery';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import common from '../common';

export default {
    components: {
        Sidebar,
        userbc,
        SVGComponent
    },
    mixins: [common],
    data() {
        return {
            hotelId: this.$route.params.hotelid,
            roomId: this.$route.params.id || null,
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            activeTab: 'content',
            isDefaultLang: true, // Set to true or false based on your default language logic
            isSmartSearch: true, // Set to true or false based on your smart search logic
            locationName: "",
            locations: [], // This should be populated with your locations data
            locationSuggestions: [],
            showSuggestions: false,
            attributes: [],
            feature_image_imageUrl: '',
            banner_image_imageUrl: '',
            formData: {
                title: null,
                number: null,
                beds: null,
                size: null,
                adults: 1,
                children: 0,
                status: "publish",
                gallery: '',
                terms: [],
                min_day_stays: null,
                price: 0,
                banner_image_id: null,
                image_id: null,
            },
            images: [],
            newImages: [],
            page_title: "Add Room"
        };
    },
    computed: {

    },
    mounted() {
        // Fetch data here
        console.log("hotel id", this.hotelId);
        console.log("room id", this.roomId);
        this.getData();
        if (this.roomId) {
            console.log("is edit true");
            axios.get(`/api/vendor/${this.hotelId}/room-edit/${this.roomId}`).then(({ data }) => {
                console.log("data", data);
                this.formData = data.data.row;
                this.page_title = data.data.page_title;
                this.hotelId = data.data.hotel.id;
                this.formData.terms = data.data.selected_terms;
                this.breadcrumbs = data.data.breadcrumbs;
                console.log("gallery image ids", this.formData.gallery);
                const galleryString = this.formData.gallery;

                if (galleryString) {
                    // Convert the string into an array
                    const galleryArray = galleryString.split(',');

                    // Loop through the array and call the function
                    galleryArray.forEach(imageId => {
                        // Assuming this.getImage is a method available in your context
                        this.getImage(imageId.trim(), 'gallery'); // Trim to remove any extra spaces
                    });
                }

                this.getImage(data.data.row.banner_image_id, 'banner');
                this.getImage(data.data.row.image_id, 'feature');
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        }
    },
    methods: {
        getData() {
            axios.get(`/api/vendor/room-create/${this.hotelId}`).then(({ data }) => {
                console.log("get data", data);
                console.log("attributes", data.data.attributes);
                this.page_title = data.data.page_title;
                this.locations = data.data.hotel_location;
                this.attributes = data.data.attributes;
                this.breadcrumbs = data.data.breadcrumbs;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        createRoom() {

            if (this.newImages.length > 0) {
                console.log("this.formData", this.formData);
                const uploadPromises = this.images.map(image => {
                    if (!image.id) {
                        return this.uploadGalleryImage(image.file, 'image');
                    }
                });

                // Wait for all the image uploads to complete
                Promise.all(uploadPromises).then(ids => {
                    console.log("Uploaded image IDs: ", ids);
                    // Check if this.formData.gallery already has existing IDs
                    if (this.formData.gallery) {
                        this.formData.gallery = this.formData.gallery.replace(/,$/, ''); // Remove trailing comma if any
                        this.formData.gallery += ',' + ids.join(',');
                    } else {
                        this.formData.gallery = ids.join(',');
                    }

                    console.log("Gallery IDs as string: ", this.formData.gallery);

                    var postData = this.formData;
                    var id = this.roomId ? this.roomId : -1;
                    console.log("post data", postData);

                    // Make the API call to store the hotel data
                    axios.post(`/api/vendor/${this.hotelId}/room-store/${id}`, postData).then(response => {
                        console.log("api response => ", response.data);

                        if (response.status === 200) {
                            console.log("success");
                            this.$router.push({ name: 'vendorRoom', params: { id: this.hotelId } });
                        }
                    }).catch(({ response }) => {
                        alert(response.data.message);
                    }).finally(() => {
                        // Any cleanup logic if necessary
                    });

                }).catch(error => {
                    console.error("Error uploading images: ", error);
                });
            } else {
                var postData = this.formData;

                var id = -1;
                if (this.roomId) {
                    id = this.roomId;
                }
                console.log("post data", postData);
                //return false;

                axios.post(`/api/vendor/${this.hotelId}/room-store/${id}`, postData).then(response => {
                    console.log("api response => ", response.data);

                    if (response.status == 200) {
                        console.log("success");
                        this.$router.push({ name: 'vendorRoom', params: { id: this.hotelId } });
                    }
                }).catch(({ response }) => {
                    alert(response.data.message)
                }).finally(() => {

                })
            }
        },
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        preventEnter(event) {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        },
        addExtraPrice() {
            if (!this.formData.extra_price) {
                this.$set(this.formData, 'extra_price', []);
            }
            this.formData.extra_price.push({ name: '', price: 0, type: 'one_time', per_person: false });
        },
        removeExtraPrice(index) {
            this.formData.extra_price.splice(index, 1);
        },
    }
}
</script>

<style scoped>
.dungdt-upload-multiple {
    margin-top: 10px;
}

.attach-demo {
    flex-wrap: wrap;
}

.image-preview {
    position: relative;
    margin-right: 10px;
    margin-bottom: 10px;
}

.preview-img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border: 1px solid #ccc;
    border-radius: 4px;
}

.image-actions {
    position: absolute;
    top: 5px;
    right: 5px;
    display: flex;
    gap: 5px;
}

.image-actions button {
    background: rgba(0, 0, 0, 0.5);
    color: white;
    border: none;
    border-radius: 3px;
    padding: 2px 5px;
    cursor: pointer;
}

.image-actions button i {
    pointer-events: none;
}

.new-cls {
    margin: 31px auto;
    text-align: right;
}
</style>

<template>
    <div class="bravo_wrap">
        <!-- @include('Layout::parts.topbar
        @include('Layout::parts.header -->
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
                            <!-- @yield('content -->
                            <h2 class="title-bar no-border-bottom">
                                Add new car
                            </h2>

                            <div class="lang-content-box">
                                <form @submit.prevent="createUpdateCar">
                                    <div class="form-add-service">
                                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a data-toggle="tab" href="#nav-car-content" aria-selected="true"
                                                :class="{ active: activeTab === 'content' }"
                                                @click="activeTab = 'content'">1. Content</a>
                                            <a data-toggle="tab" href="#nav-car-location" aria-selected="false"
                                                :class="{ active: activeTab === 'location' }"
                                                @click="activeTab = 'location'">2. Locations</a>
                                            <a data-toggle="tab" href="#nav-car-pricing" aria-selected="false"
                                                :class="{ active: activeTab === 'pricing' }"
                                                @click="activeTab = 'pricing'">3. Pricing</a>
                                            <a data-toggle="tab" href="#nav-attribute" aria-selected="false"
                                                :class="{ active: activeTab === 'attributes' }"
                                                @click="activeTab = 'attributes'">4. Attributes</a>
                                            <a data-toggle="tab" href="#nav-ical" aria-selected="false"
                                                :class="{ active: activeTab === 'ical' }" @click="activeTab = 'ical'">5.
                                                Ical</a>
                                        </div>
                                        <div class="tab-content" id="nav-tabContent">
                                            <div v-if="activeTab === 'content'" class="tab-pane fade show active"
                                                id="nav-tour-content">
                                                <!-- @include('Tour::admin/tour/tour-content -->
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Car Content</strong></div>
                                                    <div class="panel-body">
                                                        <div class="form-group magic-field" data-id="title"
                                                            data-type="title">
                                                            <label class="control-label">Title</label>
                                                            <input type="text" v-model="formData.title"
                                                                placeholder="Title" name="title" class="form-control" />
                                                        </div>
                                                        <div class="form-group magic-field" data-id="content"
                                                            data-type="content">
                                                            <label class="control-label">Content</label>
                                                            <div>
                                                                <ckeditor :editor="editor" v-model="formData.content"
                                                                    :config="editorConfig"></ckeditor>
                                                            </div>
                                                        </div>
                                                        <div v-if="isDefaultLang" class="form-group">
                                                            <label class="control-label">Youtube Video</label>
                                                            <input type="text" v-model="formData.video" name="video"
                                                                class="form-control" placeholder="Youtube link video" />
                                                        </div>
                                                        <div class="form-group-item">
                                                            <label class="control-label">FAQs</label>
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-5">Title</div>
                                                                    <div class="col-md-5">Content</div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div v-for="(faq, key) in formData.faqs" :key="key"
                                                                    class="item" :data-number="key">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text" v-model="faq.title"
                                                                                :name="`faqs[${key}][title]`"
                                                                                class="form-control"
                                                                                placeholder="Eg: When and where does the tour end?" />
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <textarea v-model="faq.content"
                                                                                :name="`faqs[${key}][content]`"
                                                                                class="form-control"
                                                                                placeholder="..."></textarea>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removeFaq(key)">
                                                                                <i class="fa fa-trash"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm btn-add-item"
                                                                    @click="addFaq">
                                                                    <i class="icon ion-ios-add-circle-outline"></i>
                                                                    Add item
                                                                </span>
                                                            </div>
                                                            <div class="g-more hide">
                                                                <div class="item" data-number="__number__">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text"
                                                                                :__name__="`faqs[__number__][title]`"
                                                                                class="form-control"
                                                                                placeholder="Eg: Can I bring my pet?" />
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <textarea
                                                                                :__name__="`faqs[__number__][content]`"
                                                                                class="form-control"></textarea>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item">
                                                                                <i class="fa fa-trash"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div v-if="isDefaultLang" class="form-group">
                                                            <label class="control-label">Banner Image</label>
                                                            <div class="form-group-image">
                                                                <!-- Replace with your own image upload component -->
                                                                <div class="form-group-image">
                                                                    <!-- Replace with your own image upload component -->
                                                                    <div class="dungdt-upload-box dungdt-upload-box-normal"
                                                                        data-val="226">
                                                                        <input type="file" @change="onFileChange"
                                                                            style="display: none;" ref="fileInput">
                                                                        <div class="upload-box"
                                                                            v-if="!banner_image_imageUrl">
                                                                            <input type="hidden" name="banner_image_id"
                                                                                v-model="formData.banner_image_id"
                                                                                value="">
                                                                            <div class="text-center">
                                                                                <SVGComponent />
                                                                            </div>
                                                                            <div class="text-center">

                                                                                <span
                                                                                    class="btn btn-primary btn-field-upload"
                                                                                    @click="openUploader">Upload
                                                                                    image</span>
                                                                            </div>
                                                                        </div>
                                                                        <div v-if="banner_image_imageUrl">
                                                                            <div class="attach-demo-banner"
                                                                                title="Change file">
                                                                                <img :src="banner_image_imageUrl"
                                                                                    alt="Uploaded Image" />
                                                                            </div>
                                                                            <div
                                                                                class="upload-actions justify-content-between">
                                                                                <a class="edit-img btn btn-sm btn-primary edit-single"
                                                                                    @click="editImage('banner')"><i
                                                                                        class="fa fa-edit"></i></a>
                                                                                <a class="delete btn btn-sm btn-danger"
                                                                                    @click="deleteImage('banner')"><i
                                                                                        class="fa fa-trash"></i></a>
                                                                            </div>
                                                                        </div>
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
                                                                            <button @click="deleteImage('gallery',index,image.id)">
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

                                                <div v-if="isDefaultLang" class="panel">
                                                    <div class="panel-title"><strong>Extra Info</strong></div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Passenger</label>
                                                                    <input type="number" v-model="formData.passenger"
                                                                        placeholder="Example: 3" name="passenger"
                                                                        class="form-control" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Gear Shift</label>
                                                                    <input type="text" v-model="formData.gear"
                                                                        placeholder="Example: Auto" name="gear"
                                                                        class="form-control" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Baggage</label>
                                                                    <input type="number" v-model="formData.baggage"
                                                                        placeholder="Example: 5" name="baggage"
                                                                        class="form-control" />
                                                                </div>
                                                            </div>
                                                            <div class="col-md-3">
                                                                <div class="form-group">
                                                                    <label>Door</label>
                                                                    <input type="number" v-model="formData.door"
                                                                        placeholder="Example: 4" name="door"
                                                                        class="form-control" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class="form-group">
                                                    <label>Featured Image</label>
                                                    <!-- File upload field for image_id -->
                                                    <div class="dungdt-upload-box dungdt-upload-box-normal ">
                                                        <input type="file" ref="fileInputFeature" style="display: none;"
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
                                                            <div class="attach-demo-feature" title="Change file">
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
                                            </div>
                                            <div v-if="activeTab === 'location'" class="tab-pane fade show active"
                                                id="nav-tour-location">
                                                <!-- @include('Tour::admin/tour/tour-location',["is_smart_search"=>"1"]) -->
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Locations</strong></div>
                                                    <div class="panel-body">
                                                        <div v-if="isDefaultLang" class="form-group">
                                                            <label class="control-label">Location</label>
                                                            <div>
                                                                <select name="location_id" class="form-control"
                                                                    v-model="formData.location_id">
                                                                    <option :value="null">-- Please Select --</option>
                                                                    <option
                                                                        v-for="(location, index) in carLocationOptions"
                                                                        :key="index" :value="location.id">
                                                                        {{ location.name }}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label">Real address</label>
                                                            <input type="text" name="address" id="customPlaceAddress"
                                                                class="form-control" placeholder="Real address"
                                                                v-model="formData.address" />
                                                        </div>
                                                        <div v-if="isDefaultLang" class="form-group">
                                                            <label class="control-label">The geographic
                                                                coordinate</label>
                                                            <div class="control-map-group">
                                                                <div id="map_content"></div>
                                                                <input type="text" placeholder="Search by name..."
                                                                    class="bravo_searchbox form-control"
                                                                    autocomplete="off" @keydown.enter.prevent="false" />
                                                                <div class="g-control">
                                                                    <div class="form-group">
                                                                        <label>Map Latitude:</label>
                                                                        <input type="text" name="map_lat"
                                                                            class="form-control"
                                                                            v-model="formData.map_lat"
                                                                            @keydown.enter.prevent="false" />
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label>Map Longitude:</label>
                                                                        <input type="text" name="map_lng"
                                                                            class="form-control"
                                                                            v-model="formData.map_lng"
                                                                            @keydown.enter.prevent="false" />
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label>Map Zoom:</label>
                                                                        <input type="text" name="map_zoom"
                                                                            class="form-control"
                                                                            v-model="formData.map_zoom"
                                                                            @keydown.enter.prevent="false" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                            </div>
                                            <div v-if="activeTab === 'pricing'" class="tab-pane fade show active"
                                                id="nav-tour-pricing">
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Default State</strong></div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-md-12">
                                                                <div class="form-group">
                                                                    <select v-model="formData.default_state"
                                                                        name="default_state" class="custom-select">
                                                                        <option value="">-- Please select --</option>
                                                                        <option value="1">Always available</option>
                                                                        <option value="0" selected="">Only available on
                                                                            specific dates</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- @include('Tour::admin/tour/pricing -->
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Pricing</strong></div>
                                                    <div class="panel-body">
                                                        <div v-if="isDefaultLang">
                                                            <div class="row">
                                                                <div class="col-lg-12">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Number</label>
                                                                        <input type="number" step="any" min="0"
                                                                            v-model.number="formData.number"
                                                                            class="form-control"
                                                                            placeholder="Car Number" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Price</label>
                                                                        <input type="number" step="any" min="0"
                                                                            v-model.number="formData.price"
                                                                            class="form-control"
                                                                            placeholder="Car Price" />
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Sale Price</label>
                                                                        <input type="number" step="any"
                                                                            v-model.number="formData.sale_price"
                                                                            class="form-control"
                                                                            placeholder="Car Sale Price" />
                                                                        <span>
                                                                            <i>If the regular price is less than the
                                                                                discount , it will show the regular
                                                                                price</i>
                                                                        </span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Minimum advance
                                                                            reservations</label>
                                                                        <input type="number"
                                                                            v-model.number="formData.min_day_before_booking"
                                                                            class="form-control" placeholder="Ex: 3" />
                                                                        <i>Leave blank if you dont need to use the min
                                                                            day option</i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Minimum day stay
                                                                            requirements</label>
                                                                        <input type="number"
                                                                            v-model.number="formData.min_day_stays"
                                                                            class="form-control" placeholder="Ex: 2" />
                                                                        <i>Leave blank if you dont need to set minimum
                                                                            day stay option</i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="form-group">
                                                                <label>
                                                                    <input type="checkbox"
                                                                        v-model="formData.enable_extra_price"
                                                                        value="1" />
                                                                    Enable extra price
                                                                </label>
                                                            </div>
                                                            <div class="form-group-item"
                                                                v-if="formData.enable_extra_price">
                                                                <label class="control-label">Extra Price</label>
                                                                <div class="g-items-header">
                                                                    <div class="row">
                                                                        <div class="col-md-5">Name</div>
                                                                        <div class="col-md-3">Price</div>
                                                                        <div class="col-md-3">Type</div>
                                                                        <div class="col-md-1"></div>
                                                                    </div>
                                                                </div>
                                                                <div class="g-items">
                                                                    <div v-for="(extraPrice, index) in formData.extra_price"
                                                                        :key="index" class="item" :data-number="index">
                                                                        <div class="row">
                                                                            <div class="col-md-5">
                                                                                <input type="text"
                                                                                    v-for="(lang, langIndex) in languages"
                                                                                    :key="langIndex"
                                                                                    v-model="extraPrice['name' + getKeyLang(lang.locale)]"
                                                                                    class="form-control"
                                                                                    placeholder="Extra price name" />
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <input type="number" min="0"
                                                                                    v-model.number="extraPrice.price"
                                                                                    class="form-control" />
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <select v-model="extraPrice.type"
                                                                                    class="form-control">
                                                                                    <option value="one_time">One-time
                                                                                    </option>
                                                                                    <option value="per_day">Per day
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-md-1">
                                                                                <span
                                                                                    class="btn btn-danger btn-sm btn-remove-item"
                                                                                    @click="removeExtraPrice(index)">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="text-right">
                                                                    <span class="btn btn-info btn-sm btn-add-item"
                                                                        @click="addExtraPrice">
                                                                        <i class="icon ion-ios-add-circle-outline"></i>
                                                                        Add item
                                                                    </span>
                                                                </div>
                                                            </div>
                                                            <hr v-if="allowServiceFee" />
                                                            <h3 v-if="allowServiceFee" class="panel-body-title">Service
                                                                fee</h3>
                                                            <div v-if="allowServiceFee" class="form-group">
                                                                <label>
                                                                    <input type="checkbox"
                                                                        v-model="formData.enable_service_fee"
                                                                        value="1" />
                                                                    Enable service fee
                                                                </label>
                                                            </div>
                                                            <div v-if="formData.enable_service_fee"
                                                                class="form-group-item">
                                                                <label class="control-label">Buyer Fees</label>
                                                                <div class="g-items-header">
                                                                    <div class="row">
                                                                        <div class="col-md-5">Name</div>
                                                                        <div class="col-md-3">Price</div>
                                                                        <div class="col-md-3">Type</div>
                                                                        <div class="col-md-1"></div>
                                                                    </div>
                                                                </div>
                                                                <div class="g-items">
                                                                    <div v-for="(serviceFee, index) in formData.service_fee"
                                                                        :key="index" class="item" :data-number="index">
                                                                        <div class="row">
                                                                            <div class="col-md-5">
                                                                                <input type="text"
                                                                                    v-for="(lang, langIndex) in languages"
                                                                                    :key="langIndex"
                                                                                    v-model="serviceFee['name' + getKeyLang(lang.locale)]"
                                                                                    class="form-control"
                                                                                    placeholder="Fee name" />
                                                                                <input type="text"
                                                                                    v-for="(lang, langIndex) in languages"
                                                                                    :key="langIndex + '-desc'"
                                                                                    v-model="serviceFee['desc' + getKeyLang(lang.locale)]"
                                                                                    class="form-control"
                                                                                    placeholder="Fee desc" />
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <input type="number" min="0" step="0.1"
                                                                                    v-model.number="serviceFee.price"
                                                                                    class="form-control" />
                                                                                <select v-model="serviceFee.unit"
                                                                                    class="form-control">
                                                                                    <option value="fixed">Fixed</option>
                                                                                    <option value="percent">Percent
                                                                                    </option>
                                                                                </select>
                                                                            </div>
                                                                            <div class="col-md-3">
                                                                                <select v-model="serviceFee.type"
                                                                                    class="form-control d-none">
                                                                                    <option value="one_time">One-time
                                                                                    </option>
                                                                                </select>
                                                                                <label>
                                                                                    <input type="checkbox"
                                                                                        v-model="serviceFee.per_person"
                                                                                        value="on" />
                                                                                    Price per person
                                                                                </label>
                                                                            </div>
                                                                            <div class="col-md-1">
                                                                                <span
                                                                                    class="btn btn-danger btn-sm btn-remove-item"
                                                                                    @click="removeServiceFee(index)">
                                                                                    <i class="fa fa-trash"></i>
                                                                                </span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="text-right">
                                                                    <span class="btn btn-info btn-sm btn-add-item"
                                                                        @click="addServiceFee">
                                                                        <i class="icon ion-ios-add-circle-outline"></i>
                                                                        Add item
                                                                    </span>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="activeTab === 'attributes'" class="tab-pane fade show active"
                                                id="nav-attribute">
                                                <!-- @include('Tour::admin/tour/attributes -->
                                                <div>
                                                    <div v-for="attribute in attributes" :key="attribute.id"
                                                        class="panel">
                                                        <div class="panel-title">
                                                            <strong>Attribute: {{ attribute.name }}</strong>
                                                        </div>
                                                        <div class="panel-body">
                                                            <div class="terms-scrollable">
                                                                <label v-for="term in attribute.terms" :key="term.id"
                                                                    class="term-item">
                                                                    <input type="checkbox"
                                                                        :value="term.id" v-model="formData.terms" />
                                                                    <span class="term-name">{{ term.name
                                                                        }}</span>
                                                                </label>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="activeTab === 'ical'" class="tab-pane fade show active"
                                                id="nav-ical">
                                                <!-- @include('Tour::admin/tour/ical -->
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Ical</strong></div>
                                                    <div class="panel-body">
                                                        <div class="form-group">
                                                            <label>Import url</label>
                                                            <input type="text" v-model="formData.ical_import_url"
                                                                name="ical_import_url" class="form-control">
                                                        </div>
                                                        <div v-if="formData.id" class="form-group">
                                                            <label>Export url</label>
                                                            <input type="text" v-model="formData.export_url"
                                                                class="form-control" readonly>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="d-flex justify-content-between">
                                        <button class="btn btn-primary" type="submit"><i class="fa fa-save"></i> Save
                                            Changes</button>
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
            carId: this.$route.params.id || null,
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            activeTab: 'content',
            feature_image_imageUrl: '',
            banner_image_imageUrl: '',
            formData: {
                banner_image_id: null,
                image_id: null,
                title: '',
                content: '',
                faqs: [],
                address: '',
                video: '',
                banner_image_id: null,
                gallery: null,
                default_state: null,
                passenger: null,
                gear: '',
                baggage: null,
                door: null,
                location_id: null,
                map_lat: '',
                map_lng: '',
                map_zoom: '8',
                number: '',
                price: '',
                sale_price: '',
                min_day_before_booking: '',
                min_day_stays: '',
                enable_extra_price: false,
                extra_price: [],
                enable_service_fee: false,
                service_fee: [],
                ical_import_url: '',
                export_url: '',
                terms: [],
            },
            locationName: '',
            carLocationOptions: [],
            isSmartSearch: false,
            languages: [], 
            allowServiceFee: true,
            attributes: [], 
            value: '',
            bannerimagevalue: '',
            images: [],
            newImages: [],
        };
    },
    mounted() {
        this.getData();
        if (this.carId) {
            console.log("is edit true");
            axios.get(`/api/vendor/edit-car/${this.carId}`).then(({ data }) => {
                console.log("data", data);
                this.formData = data.data.row;
                this.formData.terms = data.data.selected_terms;
                this.breadcrumbs = data.data.breadcrumbs;
                const galleryString = this.formData.gallery;

                if (galleryString) {
                    // Convert the string into an array
                    const galleryArray = galleryString.split(',');

                    galleryArray.forEach(imageId => {
                        this.getImage(imageId.trim(), 'gallery');
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
    computed: {
        isDefaultLang() {
            return true;
        }
    },
    methods: {
        getData() {
            axios.get(`/api/vendor/car-create-data`).then(({ data }) => {
                console.log("get data", data);
                console.log("attributes", data.data.car_location);
                this.carLocationOptions = data.data.car_location;
                this.attributes = data.data.attributes;
                this.breadcrumbs = data.data.breadcrumbs;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        createUpdateCar() {
            console.log("in create car", this.formData);

            if (this.newImages.length > 0) {
                const uploadPromises = this.images.map(image => {
                    if(!image.id){
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

                    this.formData.enable_extra_price = this.formData.enable_extra_price ? 1 : 0;
                    this.formData.enable_service_fee = this.formData.enable_service_fee ? 1 : 0;
                    var postData = this.formData;

                    var id = -1;
                    if (this.carId) {
                        id = this.carId;
                    }
                    console.log("post data", postData);
                    axios.post(`/api/vendor/car-store/${id}`, postData).then(response => {
                        console.log("api response => ", response.data);

                        if (response.status == 200) {
                            console.log("success");
                            this.$router.push({ name: 'vendorCars' });
                        }
                    }).catch(({ response }) => {
                        alert(response.data.message)
                    }).finally(() => {

                    })

                }).catch(error => {
                    console.error("Error uploading images: ", error);
                });

            } else {
                this.formData.enable_extra_price = this.formData.enable_extra_price ? 1 : 0;
                this.formData.enable_service_fee = this.formData.enable_service_fee ? 1 : 0;
                var postData = this.formData;

                var id = -1;
                if (this.carId) {
                    id = this.carId;
                }
                console.log("post data", postData);
                axios.post(`/api/vendor/car-store/${id}`, postData).then(response => {
                    console.log("api response => ", response.data);

                    if (response.status == 200) {
                        console.log("success");
                        this.$router.push({ name: 'vendorCars' });
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
        addFaq() {
            this.formData.faqs.push({ title: '', content: '' });
        },
        removeFaq(index) {
            this.formData.faqs.splice(index, 1);
        },
        handleLocationSearch(event) {
            // Implement your search logic here
            console.log('Searching location:', event.target.value);
        },
        getKeyLang(locale) {
            return locale !== this.defaultLocale ? `_${locale}` : '';
        },
        addExtraPrice() {
            this.formData.extra_price.push({
                name: '',
                price: 0,
                type: 'one_time',
            });
        },
        removeExtraPrice(index) {
            this.formData.extra_price.splice(index, 1);
        },
        addServiceFee() {
            this.formData.service_fee.push({
                name: '',
                desc: '',
                price: 0,
                unit: 'fixed',
                type: 'one_time',
                per_person: false,
            });
        },
        removeServiceFee(index) {
            this.formData.service_fee.splice(index, 1);
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
</style>

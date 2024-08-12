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
                            <h2 class="title-bar no-border-bottom">
                                Add new event
                            </h2>

                            <div class="lang-content-box">
                                <form @submit.prevent="createUpdateEvent">
                                    <div class="form-add-service">
                                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a data-toggle="tab" href="#nav-event-content" aria-selected="true"
                                                :class="{ active: activeTab === 'content' }"
                                                @click="activeTab = 'content'">1. Content</a>
                                            <a data-toggle="tab" href="#nav-event-location" aria-selected="false"
                                                :class="{ active: activeTab === 'location' }"
                                                @click="activeTab = 'location'">2. Locations</a>
                                            <a data-toggle="tab" href="#nav-event-pricing" aria-selected="false"
                                                :class="{ active: activeTab === 'pricing' }"
                                                @click="activeTab = 'pricing'">3. Pricing</a>
                                            <a data-toggle="tab" href="#nav-attribute" aria-selected="false"
                                                :class="{ active: activeTab === 'attributes' }"
                                                @click="activeTab = 'attributes'">4. Attributes</a>
                                        </div>
                                        <div class="tab-content" id="nav-tabContent">
                                            <div v-if="activeTab === 'content'" class="tab-pane fade show active"
                                                id="nav-tour-content">
                                                <!-- @include('Tour::admin/tour/tour-content') -->

                                                <div class="panel">
                                                    <div class="panel-title"><strong>Event Content</strong></div>
                                                    <div class="panel-body">
                                                        <div class="form-group magic-field" data-id="title"
                                                            data-type="title">
                                                            <label class="control-label">Title</label>
                                                            <input type="text" v-model="formData.title"
                                                                placeholder="Title" name="title" class="form-control">
                                                        </div>
                                                        <div class="form-group magic-field" data-id="content"
                                                            data-type="content">
                                                            <label class="control-label">Content</label>
                                                            <div>
                                                                <ckeditor :editor="editor" v-model="formData.content"
                                                                    :config="editorConfig"></ckeditor>
                                                            </div>
                                                        </div>
                                                        <div class="row" v-if="isDefaultLang">
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Start Time</label>
                                                                    <input type="text" name="start_time"
                                                                        class="form-control"
                                                                        v-model="formData.start_time"
                                                                        placeholder="Ex: 15:00">
                                                                    <small>Input time format, ex: 15:00</small>
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6"
                                                                v-if="formData.bookingType !== 'ticket'">
                                                                <div class="form-group">
                                                                    <label class="control-label">End Time</label>
                                                                    <input type="text" class="form-control"
                                                                        v-model="formData.end_time"
                                                                        placeholder="Ex: 21:00">
                                                                    <small>Input time format, ex: 21:00</small>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="row" v-if="isDefaultLang">
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Duration</label>
                                                                    <input type="number" name="duration"
                                                                        class="form-control" v-model="formData.duration"
                                                                        placeholder="Ex: 3">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6"
                                                                v-if="formData.bookingType !== 'ticket'">
                                                                <div class="form-group">
                                                                    <label class="control-label">Duration Unit</label>
                                                                    <select name="duration_unit" class="form-control"
                                                                        v-model="formData.duration_unit">
                                                                        <option value="hour">Hour</option>
                                                                        <option value="minute">Minute</option>
                                                                    </select>
                                                                </div>
                                                            </div>
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
                                                                <div class="item" v-for="(faq, key) in formData.faqs"
                                                                    :key="key" :data-number="key">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text"
                                                                                :name="'faqs[' + key + '][title]'"
                                                                                class="form-control" v-model="faq.title"
                                                                                placeholder="Eg: When and where does the tour end?">
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <textarea
                                                                                :name="'faqs[' + key + '][content]'"
                                                                                class="form-control"
                                                                                v-model="faq.content"
                                                                                placeholder="..."></textarea>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removeFaq(key)"><i
                                                                                    class="fa fa-trash"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm btn-add-item"
                                                                    @click="addFaq"><i
                                                                        class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item</span>
                                                            </div>
                                                            <div class="g-more hide">
                                                                <div class="item" :data-number="number">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text"
                                                                                :name="'faqs[' + number + '][title]'"
                                                                                class="form-control"
                                                                                placeholder="Eg: Can I bring my pet?">
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <textarea
                                                                                :name="'faqs[' + number + '][content]'"
                                                                                class="form-control"
                                                                                placeholder=""></textarea>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"><i
                                                                                    class="fa fa-trash"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group" v-if="isDefaultLang">
                                                            <label class="control-label">Banner Image</label>
                                                            <div class="form-group-image">
                                                                <div class="form-group-image">
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
                                                <!-- @include('Tour::admin/tour/tour-location',["is_smart_search"=>"1"])
                                                @include('Hotel::admin.hotel.surrounding') -->

                                                <div class="panel">
                                                    <div class="panel-title"><strong>Locations</strong></div>
                                                    <div class="panel-body">
                                                        <div class="form-group" v-if="isDefaultLang">
                                                            <label class="control-label">Location</label>
                                                            <div>
                                                                <select v-model="formData.location_id"
                                                                    class="form-control">
                                                                    <option value="">-- Please Select --</option>
                                                                    <option v-for="location in eventLocation"
                                                                        :key="location.id" :value="location.id"
                                                                        :selected="formData.location_id === location.id">
                                                                        {{ location.name }}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label">Real address</label>
                                                            <input type="text" name="address" id="customPlaceAddress"
                                                                class="form-control" placeholder="Real address"
                                                                v-model="formData.address">
                                                        </div>
                                                        <div class="form-group" v-if="isDefaultLang">
                                                            <label class="control-label">The geographic
                                                                coordinate</label>
                                                            <div class="control-map-group">
                                                                <div id="map_content"></div>
                                                                <input type="text" placeholder="Search by name..."
                                                                    class="bravo_searchbox form-control"
                                                                    autocomplete="off" @keydown.enter.prevent>
                                                                <div class="g-control">
                                                                    <div class="form-group">
                                                                        <label>Map Latitude:</label>
                                                                        <input type="text" name="map_lat"
                                                                            class="form-control"
                                                                            v-model="formData.map_lat"
                                                                            @keydown.enter.prevent>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label>Map Longitude:</label>
                                                                        <input type="text" name="map_lng"
                                                                            class="form-control"
                                                                            v-model="formData.map_lng"
                                                                            @keydown.enter.prevent>
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label>Map Zoom:</label>
                                                                        <input type="text" name="map_zoom"
                                                                            class="form-control"
                                                                            :value="formData.map_zoom || '8'"
                                                                            @keydown.enter.prevent>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div v-if="formData.surrounding.length > 0" class="panel">
                                                    <div class="panel-title"><strong>surrounding</strong></div>
                                                    <div class="panel-body">
                                                        <div v-for="category in formData.surrounding" :key="category.id"
                                                            class="form-group-item">
                                                            <label class="control-label">{{ category.name }}</label>
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-3">Name</div>
                                                                    <div class="col-md-3">Content</div>
                                                                    <div class="col-md-3">Distance</div>
                                                                    <div class="col-md-2"></div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div v-for="(item, key) in category.surrounding"
                                                                    :key="key" class="item" :data-number="key">
                                                                    <div class="row">
                                                                        <div class="col-md-3">
                                                                            <input type="text" v-model="item.name"
                                                                                class="form-control"
                                                                                placeholder="Sunny Beach">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <textarea v-model="item.content"
                                                                                class="form-control"></textarea>
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <input type="number" v-model="item.value"
                                                                                class="form-control" placeholder="...">
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <select v-model="item.type"
                                                                                class="form-control">
                                                                                <option value="m">m</option>
                                                                                <option value="km">km</option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removeItem(category.id, key)">
                                                                                <i class="fa fa-trash"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm btn-add-item"
                                                                    @click="addItem(category.id)">
                                                                    <i class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item
                                                                </span>
                                                            </div>
                                                            <div class="g-more hide">
                                                                <div class="item">
                                                                    <div class="row">
                                                                        <div class="col-md-3">
                                                                            <input type="text" class="form-control"
                                                                                placeholder="Sunny Beach">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <textarea class="form-control"
                                                                                placeholder=""></textarea>
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <input type="number" class="form-control"
                                                                                placeholder="">
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <select class="form-control">
                                                                                <option value="m">m</option>
                                                                                <option value="km">km</option>
                                                                            </select>
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
                                                <!-- @include('Tour::admin/tour/pricing') -->
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Pricing</strong></div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Price</label>
                                                                    <input type="number" step="any" min="0"
                                                                        v-model="formData.price" class="form-control"
                                                                        placeholder="Space Price">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Sale Price</label>
                                                                    <input type="number" step="any"
                                                                        v-model="formData.sale_price"
                                                                        class="form-control"
                                                                        placeholder="Space Sale Price">
                                                                    <span><i>If the regular price is less than the
                                                                            discount, it will show the regular
                                                                            price</i></span>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <div class="form-group">
                                                            <label><input type="checkbox"
                                                                    v-model="formData.enable_extra_price"> Enable extra
                                                                price</label>
                                                        </div>

                                                        <div class="form-group-item" v-if="formData.enable_extra_price">
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
                                                                            <input type="text" v-model="extraPrice.name"
                                                                                class="form-control"
                                                                                placeholder="Extra price name">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <input type="number" min="0"
                                                                                v-model="extraPrice.price"
                                                                                class="form-control">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <select v-model="extraPrice.type"
                                                                                class="form-control">
                                                                                <option value="one_time">One-time
                                                                                </option>
                                                                                <option value="per_hour">Per hour
                                                                                </option>
                                                                                <option value="per_day">Per day</option>
                                                                            </select>
                                                                            <label>
                                                                                <input type="checkbox"
                                                                                    v-model="extraPrice.per_person">
                                                                                Price per person
                                                                            </label>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span @click="removeExtraPriceItem(index)"
                                                                                class="btn btn-danger btn-sm btn-remove-item"><i
                                                                                    class="fa fa-trash"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span @click="addExtraPriceItem"
                                                                    class="btn btn-info btn-sm btn-add-item"><i
                                                                        class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item</span>
                                                            </div>
                                                            <div class="g-more hide">
                                                                <div class="item">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text" class="form-control"
                                                                                placeholder="Extra price name">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <input type="number" min="0"
                                                                                class="form-control">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <select class="form-control">
                                                                                <option value="one_time">One-time
                                                                                </option>
                                                                                <option value="per_hour">Per hour
                                                                                </option>
                                                                                <option value="per_day">Per day</option>
                                                                            </select>
                                                                            <label>
                                                                                <input type="checkbox">
                                                                                Price per person
                                                                            </label>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"><i
                                                                                    class="fa fa-trash"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <!-- Additional sections can be added here based on your requirements -->

                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="activeTab === 'attributes'" class="tab-pane fade show active"
                                                id="nav-attribute">
                                                <!-- @include('Tour::admin/tour/attributes') -->

                                                <div>
                                                    <div v-for="(attribute, index) in attributes" :key="index">
                                                        <div class="panel">
                                                            <div class="panel-title"><strong>Attribute: {{
                                                                attribute.name }}</strong>
                                                            </div>
                                                            <div class="panel-body">
                                                                <div class="terms-scrollable">
                                                                    <label v-for="term in attribute.terms"
                                                                        :key="term.id" class="term-item">
                                                                        <input v-model="formData.terms" :value="term.id"
                                                                            type="checkbox" name="terms[]">
                                                                        <span class="term-name">{{ term.name

                                                                            }}</span>
                                                                    </label>
                                                                </div>
                                                            </div>
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
            eventId: this.$route.params.id || null,
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
                start_time: '',
                end_time: '',
                duration: '',
                duration_unit: 'hour',
                faqs: [],
                surrounding: [
                    {
                        id: 1,
                        name: 'Education',
                        surrounding: [],
                    },
                    {
                        id: 2,
                        name: 'Health',
                        surrounding: [],
                    },
                    {
                        id: 3,
                        name: 'Transportation',
                        surrounding: [],
                    },
                ],
                location_id: '',
                address: '',
                map_lat: '',
                map_lng: '',
                map_zoom: '8',
                default_state: '',
                enable_extra_price: false,
                extra_price: [],
                terms: [],
            },
            number: 0,
            eventLocation: [], // Define your event location array
            attributes: [],
            value: '',
            bannerimagevalue: '',
            images: [],
            newImages: [],
        };
    },
    mounted() {
        // Fetch data here
        this.getData();
        if (this.eventId) {
            console.log("is edit true");
            axios.get(`/api/vendor/edit-event/${this.eventId}`).then(({ data }) => {
                console.log("data", data);
                this.formData = data.data.row;
                this.formData.terms =  data.data.selected_terms;
                this.breadcrumbs = data.data.breadcrumbs;
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
    computed: {
        isDefaultLang() {
            return true;
        }
    },
    methods: {
        getData() {
            axios.get(`/api/vendor/event-create-data`).then(({ data }) => {
                console.log("get data", data);
                console.log("attributes", data.data.attributes);
                this.eventLocation = data.data.event_location;
                this.attributes = data.data.attributes;
                this.breadcrumbs = data.data.breadcrumbs;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        createUpdateEvent() {
            console.log("in create event", this.formData);
            console.log("images lenght",this.newImages.length);

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
                    var postData = this.formData;

                    var id = -1;
                    if (this.eventId) {
                        id = this.eventId;
                    }
                    console.log("post data", postData);

                    axios.post(`/api/vendor/event-store/${id}`, postData).then(response => {
                        console.log("api response => ", response.data);

                        if (response.status == 200) {
                            console.log("success");
                            this.$router.push({ name: 'vendorEvents' });
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
                var postData = this.formData;

                var id = -1;
                if (this.eventId) {
                    id = this.eventId;
                }
                console.log("post data", postData);

                axios.post(`/api/vendor/event-store/${id}`, postData).then(response => {
                    console.log("api response => ", response.data);

                    if (response.status == 200) {
                        console.log("success");
                        this.$router.push({ name: 'vendorEvents' });
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
            this.number++; // Increment 'number' when adding a new FAQ
        },
        removeFaq(index) {
            this.formData.faqs.splice(index, 1);
        },
        addItem(categoryId) {
            const category = this.formData.surrounding.find((cat) => cat.id === categoryId);
            if (category) {
                // Ensure category.surrounding is an array
                if (!Array.isArray(category.surrounding)) {
                    this.$set(category, 'surrounding', []);
                }
                category.surrounding.push({ name: '', content: '', value: null, type: 'm' });
            }
        },
        removeItem(categoryId, itemIndex) {
            const category = this.formData.surrounding.find((cat) => cat.id === categoryId);
            if (category) {
                category.surrounding.splice(itemIndex, 1);
            }
        },
        addExtraPriceItem() {
            this.formData.extra_price.push({
                name: '',
                price: 0,
                type: 'one_time',
                per_person: false
            });
        },
        removeExtraPriceItem(index) {
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
</style>

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
                                Add new boat
                            </h2>

                            <div class="lang-content-box">
                                <form @submit.prevent="createUpdateBoat">
                                    <div class="form-add-service">
                                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a data-toggle="tab" href="#nav-boat-content" aria-selected="true"
                                                :class="{ active: activeTab === 'content' }"
                                                @click="activeTab = 'content'">1. Content</a>
                                            <a data-toggle="tab" href="#nav-boat-location" aria-selected="false"
                                                :class="{ active: activeTab === 'location' }"
                                                @click="activeTab = 'location'">2. Locations</a>
                                            <a data-toggle="tab" href="#nav-boat-pricing" aria-selected="false"
                                                :class="{ active: activeTab === 'pricing' }"
                                                @click="activeTab = 'pricing'">3. Pricing</a>
                                            <a data-toggle="tab" href="#nav-boat-attribute" aria-selected="false"
                                                :class="{ active: activeTab === 'attributes' }"
                                                @click="activeTab = 'attributes'">4. Attributes</a>
                                        </div>
                                        <div class="tab-content" id="nav-tabContent">
                                            <div v-if="activeTab === 'content'" class="tab-pane fade show active"
                                                id="nav-tour-content">
                                                <!-- @include('Tour::admin/tour/tour-content') -->

                                                <div class="panel">
                                                    <div class="panel-title"><strong>Boat Content</strong></div>
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
                                                                <div class="dungdt-upload-box dungdt-upload-box-normal"
                                                                    data-val="226">
                                                                    <input type="file" @change="onFileChange"
                                                                        style="display: none;" ref="fileInput">
                                                                    <div class="upload-box"
                                                                        v-if="!banner_image_imageUrl">
                                                                        <input type="hidden" name="banner_image_id"
                                                                            v-model="formData.banner_image_id" value="">
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

                                                <div class="panel">
                                                    <div class="panel-title"><strong>Extra Info</strong>
                                                    </div>
                                                    <div class="panel-body">
                                                        <!-- Guest, Cabin, Length, Speed -->
                                                        <div class="row" v-if="isDefaultLang">
                                                            <div class="col-md-3" v-for="(field, index) in infoFields"
                                                                :key="index">
                                                                <div class="form-group">
                                                                    <label>{{ field.label }}</label>
                                                                    <input v-if="field.type === 'number'" type="number"
                                                                        v-model="formData[field.name]"
                                                                        :placeholder="field.placeholder"
                                                                        :name="field.name" class="form-control">
                                                                    <input v-else type="text"
                                                                        v-model="formData[field.name]"
                                                                        :placeholder="field.placeholder"
                                                                        :name="field.name" class="form-control">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- Specs -->
                                                        <div class="form-group-item">
                                                            <label class="control-label">Specs</label>
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-5">Title</div>
                                                                    <div class="col-md-5">Content</div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div class="item" v-for="(spec, key) in formData.specs"
                                                                    :key="key" :data-number="key">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text"
                                                                                :name="'specs[' + key + '][title]'"
                                                                                class="form-control"
                                                                                v-model="spec.title"
                                                                                placeholder="Eg: Range">
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <input type="text"
                                                                                :name="'specs[' + key + '][content]'"
                                                                                class="form-control"
                                                                                v-model="spec.content"
                                                                                placeholder="Eg: 6000km">
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removeSpec(key)"><i
                                                                                    class="fa fa-trash"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm btn-add-item"
                                                                    @click="addSpec"><i
                                                                        class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item</span>
                                                            </div>
                                                            <div class="g-more hide">
                                                                <div class="item" :data-number="number">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text"
                                                                                :name="'specs[' + number + '][title]'"
                                                                                class="form-control"
                                                                                placeholder="Eg: Range">
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <input type="text"
                                                                                :name="'specs[' + number + '][content]'"
                                                                                class="form-control"
                                                                                placeholder="Eg: 6000km">
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
                                                        <!-- Cancellation Policy -->
                                                        <div class="form-group">
                                                            <label>Cancellation Policy</label>
                                                            <textarea v-model="formData.cancel_policy"
                                                                class="form-control" rows="5"
                                                                placeholder="Full refund up to 4 days prior.">{{ formData.cancel_policy }}</textarea>
                                                        </div>
                                                        <!-- Additional Terms & Information -->
                                                        <div class="form-group">
                                                            <label>Additional Terms & Information</label>
                                                            <textarea name="terms_information"
                                                                class="d-none has-ckeditor" rows="10"
                                                                placeholder="For Sanitary purposes ONLY, although there is a working toilet and shower, we ve deactivated the shower and the toliet is for limited use (urine only..pardon the graphic detail!)...">{{ formData.terms_information }}</textarea>
                                                        </div>
                                                        <!-- Include Exclude -->

                                                        <div class="form-group-item">
                                                            <label class="control-label">Include</label>
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-11 text-left">Title</div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div class="item"
                                                                    v-for="(include, key) in formData.include"
                                                                    :key="key" :data-number="key">
                                                                    <div class="row">
                                                                        <div class="col-md-11">
                                                                            <input type="text"
                                                                                :name="'include[' + key + '][title]'"
                                                                                class="form-control"
                                                                                v-model="include.title"
                                                                                placeholder="Eg: Specialized bilingual guide">
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removeInclude(key)"><i
                                                                                    class="fa fa-trash"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm btn-add-item"
                                                                    @click="addInclude"><i
                                                                        class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item</span>
                                                            </div>
                                                            <div class="g-more hide">
                                                                <div class="item" :data-number="number">
                                                                    <div class="row">
                                                                        <div class="col-md-11">
                                                                            <input type="text"
                                                                                :name="'include[' + number + '][title]'"
                                                                                class="form-control"
                                                                                placeholder="Eg: Specialized bilingual guide">
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

                                                        <div class="form-group-item">
                                                            <label class="control-label">Exclude</label>
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-11 text-left">Title</div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div class="item"
                                                                    v-for="(exclude, key) in formData.exclude"
                                                                    :key="key" :data-number="key">
                                                                    <div class="row">
                                                                        <div class="col-md-11">
                                                                            <input type="text"
                                                                                :name="'exclude[' + key + '][title]'"
                                                                                class="form-control"
                                                                                v-model="exclude.title"
                                                                                placeholder="Eg: Specialized bilingual guide">
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removeExclude(key)"><i
                                                                                    class="fa fa-trash"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm btn-add-item"
                                                                    @click="addExclude"><i
                                                                        class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item</span>
                                                            </div>
                                                            <div class="g-more hide">
                                                                <div class="item" :data-number="number">
                                                                    <div class="row">
                                                                        <div class="col-md-11">
                                                                            <input type="text"
                                                                                :name="'exclude[' + number + '][title]'"
                                                                                class="form-control"
                                                                                placeholder="Eg: Additional Services">
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
                                                 -->

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
                                                                        v-for="(location, index) in boatLocationOptions"
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
                                                                            @keydown.enter.capture="false" />
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
                                                <!-- @include('Tour::admin/tour/pricing') -->
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Pricing</strong></div>
                                                    <div class="panel-body">
                                                        <template v-if="isDefaultLang">
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Price per
                                                                            hour</label>
                                                                        <input type="number" step="any" min="0"
                                                                            v-model="formData.price_per_hour"
                                                                            class="form-control"
                                                                            placeholder="Price per hour">
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Price per
                                                                            day</label>
                                                                        <input type="number" step="any"
                                                                            v-model="formData.price_per_day"
                                                                            class="form-control"
                                                                            placeholder="Price per day">
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </template>
                                                        <template v-if="isDefaultLang">
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Minimum advance
                                                                            reservations</label>
                                                                        <input type="number"
                                                                            v-model="formData.min_day_before_booking"
                                                                            class="form-control" placeholder="Ex: 3">
                                                                        <i>Leave blank if you don't need to use the min
                                                                            day option</i>
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6">
                                                                    <div class="row">
                                                                        <div class="col-md-6">
                                                                            <label class="control-label">Start time
                                                                                booking</label>
                                                                            <select
                                                                                v-model="formData.start_time_booking"
                                                                                class="form-control">
                                                                                <option value="">-- Select --</option>
                                                                                <option v-for="time in timeOptions"
                                                                                    :key="time" :value="time">{{ time }}
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <label class="control-label">End time
                                                                                booking</label>
                                                                            <select v-model="formData.end_time_booking"
                                                                                class="form-control">
                                                                                <option value="">-- Select --</option>
                                                                                <option v-for="time in timeOptions"
                                                                                    :key="time" :value="time">{{ time }}
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                    </div>
                                                                    <i>*Leave it blank if you don't use these fields.
                                                                        The end-time must be larger than start-time</i>
                                                                </div>
                                                            </div>
                                                        </template>
                                                        <div class="form-group" v-if="isDefaultLang">
                                                            <label>
                                                                <input type="checkbox"
                                                                    v-model="formData.enable_extra_price">
                                                                Enable extra price
                                                            </label>
                                                        </div>
                                                        <div class="form-group-item"
                                                            v-if="isDefaultLang && formData.enable_extra_price">
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
                                                                <!-- Extra price items -->
                                                                <div v-for="(item, index) in formData.extra_price"
                                                                    :key="index" class="item" :data-number="index">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text" v-model="item.name"
                                                                                class="form-control"
                                                                                placeholder="Extra price name">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <input type="number" v-model="item.price"
                                                                                class="form-control"
                                                                                placeholder="Price">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <select v-model="item.type"
                                                                                class="form-control">
                                                                                <option value="one_time">One-time
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <button type="button"
                                                                                @click="removeExtraPrice(index)"
                                                                                class="btn btn-danger btn-sm"><i
                                                                                    class="fa fa-trash"></i></button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <button @click="addExtraPrice" type="button"
                                                                    class="btn btn-info btn-sm"><i
                                                                        class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item</button>
                                                            </div>
                                                            <div class="g-more hide">
                                                                <!-- More fields for adding extra price items dynamically -->
                                                            </div>
                                                        </div>
                                                        <!-- Similar logic for service fee -->
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="activeTab === 'attributes'" class="tab-pane fade show active"
                                                id="nav-attribute">
                                                <!-- @include('Tour::admin/tour/attributes') -->
                                                <div>
                                                    <div v-for="(attribute, index) in attributes" :key="index"
                                                        class="panel">
                                                        <div class="panel-title"><strong>Attribute: {{
                                                            attribute.name }}</strong></div>
                                                        <div class="panel-body">
                                                            <div class="terms-scrollable">
                                                                <label v-for="term in attribute.terms" :key="term.id"
                                                                    class="term-item">
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
            boatId: this.$route.params.id || null,
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
                cancel_policy: '',
                terms_information: '',
                terms: [],
                include: [],
                exclude: [],
                price_per_hour: 0,
                price_per_day: 0,
                max_guest: '',
                cabin: '',
                length: '',
                speed: '',
                specs: [],
            },
            locationName: '',
            boatLocationOptions: [],
            isSmartSearch: false,
            isAdmin: false, // Placeholder for admin status
            timeOptions: ["00:00", "00:30", "01:00", "01:30", "02:00", "02:30", "03:00", "03:30",
                "04:00", "04:30", "05:00", "05:30", "06:00", "06:30", "07:00", "07:30",
                "08:00", "08:30", "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
                "12:00", "12:30", "13:00", "13:30", "14:00", "14:30", "15:00", "15:30",
                "16:00", "16:30", "17:00", "17:30", "18:00", "18:30", "19:00", "19:30",
                "20:00", "20:30", "21:00", "21:30", "22:00", "22:30", "23:00", "23:30"],
            languages: [],
            attributes: [],
            infoFields: [
                { name: 'max_guest', type: 'number', label: 'Guest', placeholder: 'Example: 3' },
                { name: 'cabin', type: 'text', label: 'Cabin', placeholder: 'Example: 5' },
                { name: 'length', type: 'number', label: 'Length', placeholder: 'Example: 30m' },
                { name: 'speed', type: 'number', label: 'Speed', placeholder: 'Example: 25km/h' }
            ],
            number: '',
            value: '',
            bannerimagevalue: '',
            images: [],
            newImages: [],
        };
    },
    mounted() {
        this.getData();
        if (this.boatId) {
            console.log("is edit true");
            axios.get(`/api/vendor/edit-boat/${this.boatId}`).then(({ data }) => {
                console.log("edit data", data);
                this.formData = data.data.row;
                this.formData.terms = data.data.selected_terms;
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
            // Replace with your actual logic to check if the current language is the default language
            return true;
        }
    },
    methods: {
        getData() {
            axios.get(`/api/vendor/boat-create-data`).then(({ data }) => {
                console.log("get data", data);
                console.log("boat_location", data.data.boat_location);
                this.boatLocationOptions = data.data.boat_location;
                this.attributes = data.data.attributes;
                this.breadcrumbs = data.data.breadcrumbs;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        createUpdateBoat() {
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
                    if (this.boatId) {
                        id = this.boatId;
                    }
                    console.log("post data", postData);
                    axios.post(`/api/vendor/boat-store/${id}`, postData).then(response => {
                        console.log("api response => ", response.data);

                        if (response.status == 200) {
                            console.log("success");
                            this.$router.push({ name: 'vendorBoats' });
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
                if (this.boatId) {
                    id = this.boatId;
                }
                console.log("post data", postData);
                axios.post(`/api/vendor/boat-store/${id}`, postData).then(response => {
                    console.log("api response => ", response.data);

                    if (response.status == 200) {
                        console.log("success");
                        this.$router.push({ name: 'vendorBoats' });
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
        addSpec() {
            this.formData.specs.push({ title: '', content: '' });
        },
        removeSpec(index) {
            this.formData.specs.splice(index, 1);
        },
        addInclude() {
            this.formData.include.push({ title: '' });
        },
        removeInclude(index) {
            this.formData.include.splice(index, 1);
        },
        addExclude() {
            this.formData.exclude.push({ title: '' });
        },
        removeExclude(index) {
            this.formData.exclude.splice(index, 1);
        },
        handleLocationSearch(event) {
            // Implement your search logic here
            console.log('Searching location:', event.target.value);
        },
        settingItem(item) {

        },
        addExtraPrice() {
            // Add an empty extra price item to the array
            this.formData.extra_price.push({ name: '', price: 0, type: 'one_time' });
        },
        removeExtraPrice(index) {
            // Remove the extra price item at the given index
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

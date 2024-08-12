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
                            <div v-if="breadcrumbs">
                                <userbc :breadcrumbs="breadcrumbs"/>
                            </div>
                            
                            <!-- @yield('content') -->
                            <h2 class="title-bar no-border-bottom">
                                Add new tour
                            </h2>

                            <div class="lang-content-box">
                                <form @submit.prevent="createUpdateTour">
                                    <div class="form-add-service">
                                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a data-toggle="tab" href="#nav-tour-content" aria-selected="true"
                                                :class="{ active: activeTab === 'content' }"
                                                @click="activeTab = 'content'">1. Content</a>
                                            <a data-toggle="tab" href="#nav-tour-location" aria-selected="false"
                                                :class="{ active: activeTab === 'location' }"
                                                @click="activeTab = 'location'">2. Locations</a>
                                            <a data-toggle="tab" href="#nav-tour-pricing" aria-selected="false"
                                                :class="{ active: activeTab === 'pricing' }"
                                                @click="activeTab = 'pricing'">3. Pricing</a>
                                            <a data-toggle="tab" href="#nav-availability" aria-selected="false"
                                                :class="{ active: activeTab === 'availability' }"
                                                @click="activeTab = 'availability'">4. Availability</a>
                                            <a data-toggle="tab" href="#nav-attribute" aria-selected="false"
                                                :class="{ active: activeTab === 'attributes' }"
                                                @click="activeTab = 'attributes'">5. Attributes</a>
                                            <a data-toggle="tab" href="#nav-ical" aria-selected="false"
                                                :class="{ active: activeTab === 'ical' }" @click="activeTab = 'ical'">6.
                                                Ical</a>
                                        </div>
                                        <div class="tab-content" id="nav-tabContent">
                                            <div v-if="activeTab === 'content'" class="tab-pane fade show active"
                                                id="nav-tour-content">
                                                <!-- @include('Tour::admin/tour/tour-content') -->
                                                <div class="panel">
                                                    <div class="panel-title"><strong>Tour Content</strong></div>
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
                                                            <div class="">
                                                                <ckeditor :editor="editor" v-model="formData.content"
                                                                    :config="editorConfig"></ckeditor>
                                                            </div>
                                                        </div>
                                                        <div class="form-group d-none">
                                                            <label class="control-label">Description</label>
                                                            <div class="">
                                                                <textarea v-model="formData.short_desc"
                                                                    name="short_desc" class="form-control" cols="30"
                                                                    rows="4"></textarea>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label">Category</label>
                                                            <div class="">
                                                                <select name="category_id"
                                                                    v-model="formData.category_id" class="form-control">
                                                                    <option value="">-- Please Select --</option>
                                                                    <option v-for="category in tourCategories"
                                                                        :key="category.id" :value="category.id">{{
                                                                            category.name }}</option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label">Youtube Video</label>
                                                            <input type="text" name="video" v-model="formData.video"
                                                                class="form-control" placeholder="Youtube link video">
                                                        </div>
                                                        <div class="row" v-if="isDefaultLang">
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Minimum advance
                                                                        reservations</label>
                                                                    <input type="number" name="min_day_before_booking"
                                                                        v-model="formData.min_day_before_booking"
                                                                        class="form-control" placeholder="Ex: 3">
                                                                    <i>Leave blank if you dont need to use the min day
                                                                        option</i>
                                                                </div>
                                                            </div>
                                                            <!-- Other fields for default language -->
                                                        </div>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Tour Min People</label>
                                                                    <input type="text" name="min_people"
                                                                        v-model="formData.min_people"
                                                                        class="form-control"
                                                                        placeholder="Tour Min People">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Tour Max People</label>
                                                                    <input type="text" name="max_people"
                                                                        v-model="formData.max_people"
                                                                        class="form-control"
                                                                        placeholder="Tour Max People">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <!-- FAQs section -->
                                                        <div class="form-group-item">
                                                            <label class="control-label">FAQs</label>
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-5">Title</div>
                                                                    <div class="col-md-6">Content</div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div class="item" v-for="(faq, index) in formData.faqs"
                                                                    :key="index" :data-number="index">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text"
                                                                                :name="'faqs[' + index + '][title]'"
                                                                                v-model="faq.title" class="form-control"
                                                                                placeholder="Eg: When and where does the tour end?">
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <textarea
                                                                                :name="'faqs[' + index + '][content]'"
                                                                                v-model="faq.content"
                                                                                class="form-control full-h"
                                                                                placeholder="..."></textarea>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removeFAQ(index)">
                                                                                <i class="fa fa-trash"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm btn-add-item"
                                                                    @click="addFAQ">
                                                                    <i class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <!-- Include other sections -->

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

                                                        <div class="form-group-item">
                                                            <label class="control-label">Itinerary</label>
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-2 text-left">Image</div>
                                                                    <div class="col-md-4 text-left">Title - Desc</div>
                                                                    <div class="col-md-5">Content</div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div v-for="(itinerary, index) in formData.itinerary"
                                                                    :key="index" class="item" :data-number="index">
                                                                    <div class="row">
                                                                        <div class="col-md-2">
                                                                            <!-- File upload component goes here -->
                                                                        </div>
                                                                        <div class="col-md-4">
                                                                            <input type="text" v-model="itinerary.title"
                                                                                class="form-control"
                                                                                placeholder="Title: Day 1">
                                                                            <input type="text" v-model="itinerary.desc"
                                                                                class="form-control"
                                                                                placeholder="Desc: TP. HCM City">
                                                                        </div>
                                                                        <div class="col-md-5">
                                                                            <textarea v-model="itinerary.content"
                                                                                class="form-control full-h"
                                                                                placeholder="..."></textarea>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removeItemItinerary(index)"><i
                                                                                    class="fa fa-trash"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm btn-add-item"
                                                                    @click="addItemItinerary"><i
                                                                        class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item</span>
                                                            </div>
                                                            <div class="g-more hide">
                                                                <div class="item"
                                                                    :data-number="formData.itinerary.length">
                                                                    <div class="row">
                                                                        <div class="col-md-2">
                                                                            <!-- File upload component goes here -->
                                                                        </div>
                                                                        <div class="col-md-4">
                                                                            <input type="text" v-model="newItem.title"
                                                                                class="form-control"
                                                                                placeholder="Title: Day 1">
                                                                            <input type="text" v-model="newItem.desc"
                                                                                class="form-control"
                                                                                placeholder="Desc: TP. HCM City">
                                                                        </div>
                                                                        <div class="col-md-5">
                                                                            <textarea v-model="newItem.content"
                                                                                class="form-control full-h"
                                                                                placeholder="..."></textarea>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removeNewItem"><i
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
                                                        <div v-if="isDefaultLang" class="form-group">
                                                            <label class="control-label">Location</label>
                                                            <div>
                                                                <select v-model="formData.location_id"
                                                                    class="form-control">
                                                                    <option value="">-- Please Select --</option>
                                                                    <option v-for="location in locations"
                                                                        :key="location.id" :value="location.id">
                                                                        {{ location.name }}
                                                                    </option>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label">Real address</label>
                                                            <input type="text" v-model="formData.address"
                                                                id="customPlaceAddress" class="form-control"
                                                                placeholder="Real address" />
                                                        </div>
                                                        <div v-if="isDefaultLang" class="form-group">
                                                            <label class="control-label">The geographic
                                                                coordinate</label>
                                                            <div class="control-map-group">
                                                                <div id="map_content"></div>
                                                                <input type="text" placeholder="Search by name..."
                                                                    class="bravo_searchbox form-control"
                                                                    autocomplete="off" @keydown="preventEnter" />
                                                                <div class="g-control">
                                                                    <div class="form-group">
                                                                        <label>Map Latitude:</label>
                                                                        <input type="text" v-model="formData.map_lat"
                                                                            class="form-control"
                                                                            @keydown="preventEnter" />
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label>Map Longitude:</label>
                                                                        <input type="text" v-model="formData.map_lng"
                                                                            class="form-control"
                                                                            @keydown="preventEnter" />
                                                                    </div>
                                                                    <div class="form-group">
                                                                        <label>Map Zoom:</label>
                                                                        <input type="text" v-model="formData.map_zoom"
                                                                            class="form-control"
                                                                            @keydown="preventEnter" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- Include hotel surrounding here -->
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
                                                        <!-- Tour Price -->
                                                        <h3 class="panel-body-title">Tour Price</h3>
                                                        <div class="row">
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Price</label>
                                                                    <input type="text" v-model="formData.price"
                                                                        class="form-control" placeholder="Tour Price">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-6">
                                                                <div class="form-group">
                                                                    <label class="control-label">Sale Price</label>
                                                                    <input type="text" v-model="formData.sale_price"
                                                                        class="form-control"
                                                                        placeholder="Tour Sale Price">
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-12">
                                                                <span>If the regular price is less than the discount, it
                                                                    will show the regular price</span>
                                                            </div>
                                                        </div>
                                                        <hr>

                                                        <!-- Person Types -->
                                                        <h3 class="panel-body-title">Person Types</h3>
                                                        <div class="form-group">
                                                            <label><input type="checkbox"
                                                                    v-model="formData.enable_person_types">
                                                                Enable Person Types</label>
                                                        </div>
                                                        <div class="form-group-item"
                                                            v-if="formData.enable_person_types == 1">
                                                            <label class="control-label">Person Types</label>
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-5">Person Type</div>
                                                                    <div class="col-md-2">Min</div>
                                                                    <div class="col-md-2">Max</div>
                                                                    <div class="col-md-2">Price</div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div class="item"
                                                                    v-for="(personType, index) in formData.person_types"
                                                                    :key="index">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text" v-model="personType.name"
                                                                                class="form-control"
                                                                                placeholder="Eg: Adults">
                                                                            <input type="text" v-model="personType.desc"
                                                                                class="form-control"
                                                                                placeholder="Description">
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <input type="number"
                                                                                v-model="personType.min"
                                                                                class="form-control"
                                                                                placeholder="Minimum per booking">
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <input type="number"
                                                                                v-model="personType.max"
                                                                                class="form-control"
                                                                                placeholder="Maximum per booking">
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <input type="text"
                                                                                v-model="personType.price"
                                                                                class="form-control"
                                                                                placeholder="per 1 item">
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span
                                                                                class="btn btn-danger btn-sm btn-remove-item"
                                                                                @click="removePersonType(index)">
                                                                                <i class="fa fa-trash"></i>
                                                                            </span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm btn-add-item"
                                                                    @click="addPersonType">
                                                                    <i class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label>
                                                                <input type="checkbox"
                                                                    v-model="formData.enable_extra_price">
                                                                Enable extra price
                                                            </label>
                                                        </div>
                                                        <div class="form-group-item"
                                                            v-if="formData.enable_extra_price == 1">
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
                                                                    :key="index" class="item">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input placeholder="Extra price name"
                                                                                class="form-control"
                                                                                v-model="extraPrice.name" type="text" />
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <input type="text" min="0"
                                                                                class="form-control"
                                                                                v-model="extraPrice.price" />
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <select class="form-control"
                                                                                v-model="extraPrice.type">
                                                                                <option value="one_time">One-time
                                                                                </option>
                                                                                <option value="per_hour">Per hour
                                                                                </option>
                                                                                <option value="per_day">Per day</option>
                                                                            </select>
                                                                            <label>
                                                                                <input type="checkbox"
                                                                                    v-model="extraPrice.per_person" />
                                                                                Price per person
                                                                            </label>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <button @click="removeExtraPrice(index)"
                                                                                class="btn btn-danger btn-sm">
                                                                                <i class="fa fa-trash"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <button type="button" @click="addExtraPrice"
                                                                    class="btn btn-info btn-sm">
                                                                    <i class="icon ion-ios-add-circle-outline"></i>
                                                                    Add item
                                                                </button>
                                                            </div>
                                                        </div>

                                                        <!-- Discount by number of people -->
                                                        <h3 class="panel-body-title">Discount by number of people</h3>
                                                        <div class="form-group-item">
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-4">No of people</div>
                                                                    <div class="col-md-3">Discount</div>
                                                                    <div class="col-md-3">Type</div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div v-for="(item, index) in formData.discount_by_people"
                                                                    :key="index" class="item">
                                                                    <div class="row">
                                                                        <div class="col-md-2">
                                                                            <input type="number" min="0"
                                                                                v-model="item.from" class="form-control"
                                                                                placeholder="From">
                                                                        </div>
                                                                        <div class="col-md-2">
                                                                            <input type="number" min="0"
                                                                                v-model="item.to" class="form-control"
                                                                                placeholder="To">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <input type="number" min="0"
                                                                                v-model="item.amount"
                                                                                class="form-control">
                                                                        </div>
                                                                        <div class="col-md-3">
                                                                            <select v-model="item.type"
                                                                                class="form-control">
                                                                                <option value="fixed">Fixed</option>
                                                                                <option value="percent">Percent (%)
                                                                                </option>
                                                                            </select>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <button type="button"
                                                                                @click="removediscount_by_people(index)"
                                                                                class="btn btn-danger btn-sm">
                                                                                <i class="fa fa-trash"></i>
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <button type="button" @click="adddiscount_by_people"
                                                                    class="btn btn-info btn-sm">
                                                                    <i class="icon ion-ios-add-circle-outline"></i>
                                                                    Add item
                                                                </button>
                                                            </div>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="activeTab === 'availability'" class="tab-pane fade show active"
                                                id="nav-availability">
                                                <!-- @include('Tour::admin/tour/availability') -->
                                                <div class="panel">
                                                    <div class="panel-title">
                                                        <strong>Availability</strong>
                                                    </div>
                                                    <div class="panel-body">
                                                        <h3 class="panel-body-title">Fixed dates</h3>
                                                        <div class="form-group">
                                                            <label>
                                                                <input type="checkbox"
                                                                    v-model="formData.enable_fixed_date" value="1" />
                                                                Enable Fixed Date
                                                            </label>
                                                        </div>
                                                        <div class="row" v-if="formData.enable_fixed_date">
                                                            <div class="col-lg-3">
                                                                <div class="form-group">
                                                                    <label>Start Date</label>
                                                                    <DatePicker type="type"
                                                                        v-model="formData.start_date" class="" />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <div class="form-group">
                                                                    <label>End Date</label>
                                                                    <DatePicker v-model="formData.end_date" class="" />
                                                                </div>
                                                            </div>
                                                            <div class="col-lg-3">
                                                                <div class="form-group">
                                                                    <label>Last Booking Date</label>
                                                                    <DatePicker v-model="formData.last_booking_date"
                                                                        class="" />
                                                                </div>
                                                            </div>
                                                        </div>

                                                        <h3 class="panel-body-title">Open Hours</h3>
                                                        <div class="form-group">
                                                            <label>
                                                                <input type="checkbox"
                                                                    v-model="formData.enable_open_hours" value="1" />
                                                                Enable Open Hours
                                                            </label>
                                                        </div>
                                                        <div class="table-responsive form-group"
                                                            v-if="formData.enable_open_hours">
                                                            <table class="table">
                                                                <thead>
                                                                    <tr>
                                                                        <th>Enable?</th>
                                                                        <th>Day of Week</th>
                                                                        <th>Open</th>
                                                                        <th>Close</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    <tr v-for="(day, index) in daysOfWeek" :key="index">
                                                                        <td>
                                                                            <input type="checkbox"
                                                                                v-model="formData.meta.open_hours[index].enable" />
                                                                        </td>
                                                                        <td><strong>{{ day }}</strong></td>
                                                                        <td>
                                                                            <select class="form-control"
                                                                                v-model="formData.meta.open_hours[index].from">
                                                                                <option v-for="time in times"
                                                                                    :key="time" :value="time">{{ time }}
                                                                                </option>
                                                                            </select>
                                                                        </td>
                                                                        <td>
                                                                            <select class="form-control"
                                                                                v-model="formData.meta.open_hours[index].to">
                                                                                <option v-for="time in times"
                                                                                    :key="time" :value="time">{{ time }}
                                                                                </option>
                                                                            </select>
                                                                        </td>
                                                                    </tr>
                                                                </tbody>
                                                            </table>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div v-if="activeTab === 'attributes'" class="tab-pane fade show active"
                                                id="nav-attribute">
                                                <!-- @include('Tour::admin/tour/attributes') -->
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
                                            <div v-if="activeTab === 'ical'" class="tab-pane fade show active"
                                                id="nav-ical">
                                                <div class="panel">
                                                    <div class="panel-title">
                                                        <strong>Ical</strong>
                                                    </div>
                                                    <div class="panel-body">
                                                        <div class="form-group">
                                                            <label>Import url</label>
                                                            <input type="text" v-model="formData.ical_import_url"
                                                                name="ical_import_url" class="form-control" />
                                                        </div>
                                                        <div v-if="row.id" class="form-group">
                                                            <label>Export url</label>
                                                            <input type="text" :value="exportUrl" class="form-control"
                                                                readonly />
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
        SVGComponent,
    },
    mixins: [common],
    data() {
        return {
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            type: "datetime",
            tourId: this.$route.params.id || null,
            activeTab: 'content',
            feature_image_imageUrl: '',
            banner_image_imageUrl: '',
            formData: {
                title: '',
                content: '',
                image_id: '',
                banner_image_id: '',
                short_desc: '',
                category_id: '',
                video: '',
                min_day_before_booking: '',
                duration: '',
                min_people: '',
                max_people: '',
                faqs: [],
                location_id: '',
                address: '',
                map_lat: '',
                map_lng: '',
                map_zoom: '',
                gallery: '',
                default_state: '',
                price: '',
                sale_price: '',
                duration: '',
                max_people: [],
                min_people: [],
                include: [],
                exclude: [],
                itinerary: [],
                enable_service_fee: 0,
                service_fee: [],
                min_day_before_booking: '',
                enable_fixed_date: '',
                start_date: null,
                end_date: null,
                last_booking_date: null,
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
                include: [],
                exclude: [],
                enable_person_types: false,
                person_types: [],
                enable_extra_price: false,
                enable_service_fee: false,
                enable_fixed_date: false,
                ical_import_url: '',
                person_types: [],
                meta: {
                    enable_open_hours: false,
                    open_hours: Array.from({ length: 7 }, () => ({ enable: false, from: '', to: '' })),
                    
                },
                enable_open_hours: false,
                discount_by_people: [],
                terms: [],
            },
            isDefaultLang: true,
            tourCategories: [],
            newFAQIndex: 0,
            isSmartSearch: true,
            locationName: "",
            locations: [],
            enableExtraPrice: false,
            extraPrices: [],
            languages: [],
            enableMultiLang: false,
            attributes: [],
            selectedTerms: [],

            daysOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            times: this.generateTimes(),
            number: 0,
            newItem: {
                title: '',
                desc: '',
                content: ''
            },
            value: '',
            images: [],
            newImages: [],
        };
    },
    mounted() {
        // Fetch data here
        this.getData();
        if (this.tourId) {
            console.log("is edit true");
            axios.get(`/api/vendor/tour-edit/${this.tourId}`).then(({ data }) => {
                console.log("data", data);
                this.formData = data.data.row;
                this.formData.terms = data.data.selected_terms;
                this.breadcrumbs = data.data.breadcrumbs;
                this.formData.person_types = data.data.row.meta.person_types;
                this.formData.enable_person_types = data.data.row.meta.enable_person_types;
                this.formData.enable_extra_price = data.data.row.meta.enable_extra_price;
                this.formData.extra_price = data.data.row.meta.extra_price;
                this.formData.discount_by_people = data.data.row.meta.discount_by_people;
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
                this.formData.start_date = new Date(this.formData.start_date);
                this.formData.end_date = new Date(this.formData.end_date);
                this.formData.last_booking_date = new Date(this.formData.last_booking_date);
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        }
    },
    computed: {

    },
    methods: {
        getData() {
            axios.get(`/api/vendor/create-tour-data`).then(({ data }) => {
                console.log("get data", data);
                console.log("tour_location", data.data.tour_location);
                this.locations = data.data.tour_location;
                this.tourCategories = data.data.tour_category;
                this.attributes = data.data.attributes;
                this.breadcrumbs = data.data.breadcrumbs;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        createUpdateTour() {
            console.log("in create tour", this.formData);

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
                    this.formData.enable_fixed_date = this.formData.enable_fixed_date ? 1 : 0;
                    this.formData.enable_open_hours = this.formData.enable_open_hours ? 1 : 0;
                    this.formData.enable_person_types = this.formData.enable_person_types ? 1 : 0;

                    var postData = this.formData;

                    var id = -1;
                    if (this.tourId) {
                        id = this.tourId;
                    }
                    console.log("post data", postData);
                    axios.post(`/api/vendor/tour-store/${id}`, postData).then(response => {
                        console.log("api response => ", response.data);

                        if (response.status == 200) {
                            console.log("success");
                            this.$router.push({ name: 'vendorTour' });
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
                this.formData.enable_fixed_date = this.formData.enable_fixed_date ? 1 : 0;
                this.formData.enable_open_hours = this.formData.enable_open_hours ? 1 : 0;
                this.formData.enable_person_types = this.formData.enable_person_types ? 1 : 0;

                var postData = this.formData;

                var id = -1;
                if (this.tourId) {
                    id = this.tourId;
                }
                console.log("post data", postData);
                axios.post(`/api/vendor/tour-store/${id}`, postData).then(response => {
                    console.log("api response => ", response.data);

                    if (response.status == 200) {
                        console.log("success");
                        this.$router.push({ name: 'vendorTour' });
                    }
                }).catch(({ response }) => {
                    alert(response.data.message)
                }).finally(() => {

                })
            }

        },
        getTranslation(item, field) {
            const locale = this.getLocale(); 
            return item.translations[locale][field];
        },
        getLocale() {
            return 'en';
        },
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        addFAQ() {
            this.formData.faqs.push({
                title: '',
                content: ''
            });
        },
        removeFAQ(index) {
            this.formData.faqs.splice(index, 1);
        },
        addInclude() {
            if (!this.formData.include) {
                this.$set(this.formData, 'include', []);
            }
            this.formData.include.push({ title: '' });
            this.number++;
        },
        removeInclude(index) {
            this.formData.include.splice(index, 1);
        },
        addExclude() {
            if (!this.formData.exclude) {
                this.$set(this.formData, 'exclude', []);
            }
            this.formData.exclude.push({ title: '' });
            this.number++;
        },
        removeExclude(index) {
            this.formData.exclude.splice(index, 1);
        },
        addItemItinerary() {
            if (!this.formData.itinerary) {
                this.$set(this.formData, 'itinerary', []);
            }
            this.formData.itinerary.push({ ...this.newItem });
            this.newItem = {
                title: '',
                desc: '',
                content: ''
            };
        },
        removeItemItinerary(index) {
            this.formData.itinerary.splice(index, 1);
        },
        removeNewItem() {
            this.newItem = {
                title: '',
                desc: '',
                content: ''
            };
        },
        preventEnter(event) {
            if (event.key === "Enter") {
                event.preventDefault();
            }
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
        addPersonType() {
            if (!this.formData.person_types) {
                this.$set(this.formData, 'person_types', []);
            }
            this.formData.person_types.push({
                name: '',
                desc: '',
                min: 0,
                max: 0,
                price: '',
            });
        },
        removePersonType(index) {
            this.formData.meta.person_types.splice(index, 1);
        },
        addExtraPrice() {
            if (!this.formData.extra_price) {
                this.$set(this.formData, 'extra_price', []);
            }
            this.formData.extra_price.push({
                name: '',
                names: {},
                price: '',
                type: 'one_time',
                per_person: false
            });
        },
        removeExtraPrice(index) {
            this.formData.extra_price.splice(index, 1);
        },
        adddiscount_by_people() {
            if (!this.formData.discount_by_people) {
                this.$set(this.formData, 'discount_by_people', []);
            }
            this.formData.discount_by_people.push({
                from: '',
                to: '',
                amount: '',
                type: 'fixed'
            });
        },
        removediscount_by_people(index) {
            this.formData.discount_by_people.splice(index, 1);
        },
        generateTimes() {
            const times = [];
            const startTime = new Date("2019-01-01T00:00:00");
            for (let i = 0; i < 24; i++) {
                times.push(this.formatTime(new Date(startTime.getTime() + i * 3600000)));
            }
            return times;
        },
        formatTime(date) {
            const hours = date.getHours().toString().padStart(2, "0");
            const minutes = date.getMinutes().toString().padStart(2, "0");
            return `${hours}:${minutes}`;
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

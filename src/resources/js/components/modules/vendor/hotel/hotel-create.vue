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
                            <h2 v-if="hotelId" class="title-bar border-bottom">
                                Edit Hotel
                                <div class="title-action">
                                    <router-link :to="{ name: 'vendorRoom', params: { id: hotelId } }"
                                        class="btn btn-info">
                                        <i class="fa fa-hand-o-right"></i>Manage Rooms
                                    </router-link>
                                    <router-link :to="{ name: 'vendorRoom', params: { id: hotelId } }"
                                        class="btn btn-warning">
                                        <i class="fa fa-calendar"></i> Availability Rooms
                                    </router-link>
                                </div>
                            </h2>

                            <h2 v-else class="title-bar border-bottom">
                                Add new hotel
                            </h2>

                            <div class="lang-content-box">
                                <form @submit.prevent="createHotel">
                                    <div class="form-add-service">
                                        <div class="nav nav-tabs nav-fill" id="nav-tab" role="tablist">
                                            <a data-toggle="tab" href="#nav-hotel-content" aria-selected="true"
                                                :class="{ active: activeTab === 'content' }"
                                                @click="setActiveTab('content')">1. Content</a>
                                            <a data-toggle="tab" href="#nav-hotel-location" aria-selected="false "
                                                :class="{ active: activeTab === 'location' }"
                                                @click="setActiveTab('location')">2. Locations</a>
                                            <a data-toggle="tab" href="#nav-hotel-pricing" aria-selected="false"
                                                :class="{ active: activeTab === 'pricing' }"
                                                @click="setActiveTab('pricing')">3. Pricing</a>
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
                                                    <div class="panel-title"><strong>Hotel Content</strong></div>
                                                    <div class="panel-body">
                                                        <div class="form-group magic-field" data-id="title"
                                                            data-type="title">
                                                            <label class="control-label">Title</label>
                                                            <input type="text" v-model="formData.title"
                                                                placeholder="Name of the hotel" name="title"
                                                                class="form-control">
                                                        </div>
                                                        <div class="form-group magic-field" data-id="content"
                                                            data-type="content" data-editor="1">
                                                            <label class="control-label">Content</label>
                                                            <div class="">
                                                                <ckeditor :editor="editor" v-model="formData.content"
                                                                    :config="editorConfig"></ckeditor>
                                                            </div>
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label">Youtube Video</label>
                                                            <input type="text" name="video" class="form-control"
                                                                v-model="formData.video"
                                                                placeholder="Youtube link video">
                                                        </div>
                                                        <div class="form-group">
                                                            <label class="control-label">Banner Image</label>
                                                            <div class="form-group-image">
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

                                                <div class="panel">
                                                    <div class="panel-title"><strong>Hotel Policy</strong></div>
                                                    <div class="panel-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group">
                                                                    <label>Hotel rating standard</label>
                                                                    <input type="number" v-model="formData.star_rate"
                                                                        placeholder="Eg: 5" name="star_rate"
                                                                        class="form-control">
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="form-group-item">
                                                            <label class="control-label">Policy</label>
                                                            <div class="g-items-header">
                                                                <div class="row">
                                                                    <div class="col-md-5">Title</div>
                                                                    <div class="col-md-5">Content</div>
                                                                    <div class="col-md-1"></div>
                                                                </div>
                                                            </div>
                                                            <div class="g-items">
                                                                <div v-for="(policy, index) in formData.policy"
                                                                    :key="index" class="item">
                                                                    <div class="row">
                                                                        <div class="col-md-5">
                                                                            <input type="text" v-model="policy.title"
                                                                                class="form-control"
                                                                                placeholder="Eg: What kind of footwear is most suitable?">
                                                                        </div>
                                                                        <div class="col-md-6">
                                                                            <textarea v-model="policy.content"
                                                                                class="form-control"
                                                                                placeholder="..."></textarea>
                                                                        </div>
                                                                        <div class="col-md-1">
                                                                            <span class="btn btn-danger btn-sm"
                                                                                @click="removeHotelPolicy(index)"><i
                                                                                    class="fa fa-trash"></i></span>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="text-right">
                                                                <span class="btn btn-info btn-sm"
                                                                    @click="addHotelPolicy"><i
                                                                        class="icon ion-ios-add-circle-outline"></i> Add
                                                                    item</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div class="form-group">
                                                    <label>Featured Image</label>
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
                                                <!-- Include hotel pricing here -->
                                                <div>
                                                    <!-- Check in/out time panel -->
                                                    <div class="panel">
                                                        <div class="panel-title"><strong>Check in/out time</strong>
                                                        </div>
                                                        <div class="panel-body">
                                                            <div class="form-group d-none">
                                                                <label>Allowed full day booking</label>
                                                                <br>
                                                                <label>
                                                                    <input type="checkbox"
                                                                        v-model="formData.allow_full_day" value="1">
                                                                    Enable full day booking
                                                                </label>
                                                                <div class="small">
                                                                    You can book room with full day <br>
                                                                    Eg: booking from 22-23, then all days 22 and 23 are
                                                                    full, other people cannot book
                                                                </div>
                                                            </div>
                                                            <div class="row">
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label>Time for check in</label>
                                                                        <input type="text"
                                                                            v-model="formData.check_in_time"
                                                                            placeholder="Eg: 12:00AM"
                                                                            class="form-control">
                                                                    </div>
                                                                </div>
                                                                <div class="col-md-6">
                                                                    <div class="form-group">
                                                                        <label>Time for check out</label>
                                                                        <input type="text"
                                                                            v-model="formData.check_out_time"
                                                                            placeholder="Eg: 11:00AM"
                                                                            class="form-control">
                                                                    </div>
                                                                </div>
                                                            </div>
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
                                                                    <div class="form-group">
                                                                        <label class="control-label">Minimum day stay
                                                                            requirements</label>
                                                                        <input type="number"
                                                                            v-model="formData.min_day_stays"
                                                                            class="form-control" placeholder="Ex: 2">
                                                                        <i>Leave blank if you don't need to set minimum
                                                                            day stay option</i>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <!-- Pricing panel -->
                                                    <div class="panel">
                                                        <div class="panel-title"><strong>Pricing</strong></div>
                                                        <div class="panel-body">
                                                            <div class="row">
                                                                <div class="col-lg-6">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Price</label>
                                                                        <input type="number" step="any" min="0"
                                                                            v-model="formData.price"
                                                                            class="form-control"
                                                                            placeholder="Hotel Price">
                                                                    </div>
                                                                </div>
                                                                <div class="col-lg-6 d-none">
                                                                    <div class="form-group">
                                                                        <label class="control-label">Sale Price</label>
                                                                        <input type="number" step="any"
                                                                            v-model="formData.sale_price"
                                                                            class="form-control"
                                                                            placeholder="Hotel Sale Price">
                                                                        <span><i>If the regular price is less than the
                                                                                discount, it will show the regular
                                                                                price</i></span>
                                                                    </div>
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
                                                                    <div class="item"
                                                                        v-for="(extraPrice, index) in formData.extra_price"
                                                                        :key="index" :data-number="index">
                                                                        <div class="row">
                                                                            <div class="col-md-5">
                                                                                <input type="text"
                                                                                    v-model="extraPrice.name"
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
                                                                                    <option value="per_day">Per day
                                                                                    </option>
                                                                                </select>
                                                                                <label>
                                                                                    <input type="checkbox"
                                                                                        v-model="extraPrice.per_person"
                                                                                        value="on">
                                                                                    Price per person
                                                                                </label>
                                                                            </div>
                                                                            <div class="col-md-1">
                                                                                <span
                                                                                    class="btn btn-danger btn-sm btn-remove-item"
                                                                                    @click="removeExtraPrice(index)"><i
                                                                                        class="fa fa-trash"></i></span>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                                <div class="text-right">
                                                                    <span class="btn btn-info btn-sm btn-add-item"
                                                                        @click="addExtraPrice"><i
                                                                            class="icon ion-ios-add-circle-outline"></i>
                                                                        Add item</span>
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
            hotelId: this.$route.params.id || null,
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
                status: "publish",
                star_rate: null,
                policy: [],
                gallery: '',
                selectedLocationId: null,
                address: null,
                map_lat: null,
                map_lng: null,
                map_zoom: null,
                terms: [],
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
                allow_full_day: false,
                check_in_time: '',
                check_out_time: '',
                min_day_before_booking: null,
                min_day_stays: null,
                price: 0,
                sale_price: 0,
                enable_extra_price: 0,
                extra_price: [],
                location_id: null,
                banner_image_id: null,
                image_id: null,
            },
            images: [],
            newImages: [],
        };
    },
    computed: {

    },
    mounted() {
        // Fetch data here
        this.getData();
        if (this.hotelId) {
            console.log("is edit true");
            axios.get(`/api/vendor/hotel-edit/${this.hotelId}`).then(({ data }) => {
                console.log("data", data);
                this.formData = data.data.row;
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
            axios.get(`/api/vendor/hotel-create-data`).then(({ data }) => {
                console.log("get data", data);
                console.log("attributes", data.data.attributes);
                this.locations = data.data.hotel_location;
                this.attributes = data.data.attributes;
                this.breadcrumbs = data.data.breadcrumbs;
                this.isLoading = false;
            }).catch(error => {
                this.isLoading = false;
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        createHotel() {
            console.log("surrounding", this.formData.surrounding);

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

                    this.formData.enable_extra_price = this.formData.enable_extra_price ? 1 : 0;
                    var postData = this.formData;
                    var id = this.hotelId ? this.hotelId : -1;
                    console.log("post data", postData);

                    // Make the API call to store the hotel data
                    axios.post(`/api/vendor/store/${id}`, postData).then(response => {
                        console.log("api response => ", response.data);

                        if (response.status === 200) {
                            console.log("success");
                            this.$router.push({ name: 'vendorHotels' });
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
                this.formData.enable_extra_price = this.formData.enable_extra_price ? 1 : 0;
                var postData = this.formData;

                var id = -1;
                if (this.hotelId) {
                    id = this.hotelId;
                }
                console.log("post data", postData);

                axios.post(`/api/vendor/store/${id}`, postData).then(response => {
                    console.log("api response => ", response.data);

                    if (response.status == 200) {
                        console.log("success");
                        this.$router.push({ name: 'vendorHotels' });
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
        addHotelPolicy() {
            this.formData.policy.push({ title: '', content: '' });
        },
        removeHotelPolicy(index) {
            this.formData.policy.splice(index, 1);
        },
        selectLocation(location) {
            this.locationName = location.title;
            this.formData.selectedLocationId = location.id;
            this.showSuggestions = false;
        },
        preventEnter(event) {
            if (event.key === "Enter") {
                event.preventDefault();
            }
        },
        addItem(categoryId) {
            const category = this.formData.surrounding.find((cat) => cat.id === categoryId);
            if (category) {
                category.surrounding.push({ name: '', content: '', value: null, type: 'm' });
            }
        },
        removeItem(categoryId, itemIndex) {
            const category = this.formData.surrounding.find((cat) => cat.id === categoryId);
            if (category) {
                category.surrounding.splice(itemIndex, 1);
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
</style>

import { data } from "jquery";

export default {
    data() {
        return {
            imageUrls: {},
            isLoading: true,
            breadcrumbs: [],
        }
    },
    mounted() {

    },
    methods: {
        getImageList(id) {
            return axios.get(`/api/vendor/get-file/${id}`).then(({ data }) => {
                const imageUrl = `${window.location.protocol}//${window.location.host}/${data.driver}/${data.file_path}`;
                // Store the fetched URL in the imageUrls object
                this.$set(this.imageUrls, id, imageUrl);
                console.log("imageUrl", imageUrl);
                return imageUrl;
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
                return null;
            });
        },
        getImage(id, type) {
            axios.get(`/api/vendor/get-file/${id}`).then(({ data }) => {
                const imageUrl = `${window.location.protocol}//${window.location.host}/${data.driver}/${data.file_path}`;

                if (type === 'banner' && id) {
                    this.banner_image_imageUrl = imageUrl;
                } else if (type === 'feature' && id) {
                    this.feature_image_imageUrl = imageUrl;
                } else if ("gallery" && id) {
                    this.images.push({ file: '', url: imageUrl, id: id });
                }
                //console.log("id", id, "imageUrl", imageUrl);

                // Select all elements with the class 'upload-actions'
                var demoDivs = document.querySelectorAll('.upload-actions');
                if (demoDivs) {
                    demoDivs.forEach(function (demoDiv) {
                        demoDiv.style.display = 'block';
                    });
                }
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        editImage(type) {
            if (type === 'banner') {
                this.openUploader();
            } else if (type === 'feature') {
                this.triggerFeatureFileInput();
            }
        },
        deleteImage(type, indexx, id) {
            console.log("in delete image");
            if (type === 'banner') {
                this.formData.banner_image_id = '';
                this.banner_image_imageUrl = '';
            } else if (type === 'feature') {
                this.formData.image_id = '';
                this.feature_image_imageUrl = '';
            } else if (type === 'gallery') {
                console.log("index", indexx, "id", id);
                this.images.splice(index, 1);
                const galleryArray = this.formData.gallery.split(',');
                let index = galleryArray.indexOf(id);

                if (index !== -1) {
                    galleryArray.splice(index, 1);
                }
                let resultString = galleryArray.join(",");
                this.formData.gallery = resultString;
                console.log("this.formData.gallery", this.formData.gallery);
            }
        },
        openUploader() {
            //console.log("in openUploader");
            if (this.$refs.fileInput) {
                this.$refs.fileInput.click();
            } else {
                console.error("File input ref is undefined");
            }
        },
        onFileChange(event) {
            const file = event.target.files[0];
            if (file) {
                this.uploadBannerImage(file, 'image');
            }
        },
        uploadBannerImage(file, type) {
            console.log("File", file);
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            axios.post('/api/vendor/media/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("API media response => ",response);
                //console.log("API media file_path => ", response.data.data.file_path);
                if(response.data.status == 0){
                    alert(response.data.message);
                }
                if (response.status === 200) {
                    this.formData.banner_image_id = response.data.data.id;
                    this.banner_image_imageUrl = window.location.origin + '/uploads/' + response.data.data.file_path;
                    var demoDiv = document.querySelector('.attach-demo-banner');

                    // Set the display property to 'none'
                    demoDiv.style.display = 'block';
                }
            }).catch(({ response }) => {
                //console.log("attach demo banner error");
                alert(response);

            }).finally(() => {
                // Optionally perform any cleanup or final actions
            });
        },

        triggerFeatureFileInput() {
            this.$refs.fileInputFeature.click();
        },
        handleFileChangeFeature(event) {
            const file = event.target.files[0];
            if (file) {
                this.uploadFeatureImage(file, 'image');
            }
        },
        uploadFeatureImage(file, type) {
            console.log("File", file);
            if (!file) return;

            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            axios.post('/api/vendor/media/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                console.log("API media response => ", response.data.data.id);
                console.log("API media file_path => ", response.data.data.file_path);

                if(response.data.status == 0){
                    alert(response.data.message);
                }

                if (response.status === 200) {
                    this.formData.image_id = response.data.data.id;
                    this.feature_image_imageUrl = window.location.origin + '/uploads/' + response.data.data.file_path;
                    var demoDiv = document.querySelector('.attach-demo-feature');

                    // Set the display property to 'none'
                    demoDiv.style.display = 'block';
                }
            }).catch(({ response }) => {
                console.log("attach demo feature error");
                alert(response);
            }).finally(() => {
                // Optionally perform any cleanup or final actions
            });
        },
        triggerFileInputGallery() {
            this.$refs.fileInputGallery.click();
        },
        onFileChangeGallery(event) {
            const files = event.target.files;
            for (let i = 0; i < files.length; i++) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    //this.images.push({ url: e.target.result, file: files[i] });
                    this.images.push({ url: e.target.result, file: files[i] });
                    this.newImages.push({ url: e.target.result, file: files[i] });
                    //this.uploadGalleryImage(files[i],"image");
                };
                reader.readAsDataURL(files[i]);
            }
            //console.log("images", this.images);
            //console.log("new images",this.newImages);

        },
        uploadGalleryImage(file, type) {
            //console.log("in upload gallery File", file);
            if (!file) return Promise.reject("No file provided");

            const formData = new FormData();
            formData.append('file', file);
            formData.append('type', type);

            return axios.post('/api/vendor/media/store', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            }).then(response => {
                //console.log("API media response => ", response.data.data.id);
                //console.log("API media file_path => ", response.data.data.file_path);

                if (response.status === 200) {
                    return response.data.data.id;
                } else {
                    return Promise.reject("Failed to upload image");
                }
            }).catch(({ response }) => {
                //console.log("gallery image uplaod error");
                alert(response);
                return Promise.reject(response);
            });
        },
    }
}
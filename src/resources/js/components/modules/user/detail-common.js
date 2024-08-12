import { error } from "jquery";

export default {
    data() {
        return {
            parsedContent: [],
            attribute_image_url: "",
            adults: 1,
            children: 0,
            dateFromTo: [],
            images: [],
            isRequired: false,
            errorMsg: '',
            isShowLoginModal: false,
            author: {},
            allEvents: [],
            isLoading: false,
            buttonLoading: false,
            isShowCalLoading: false
        };
    },
    methods: {
        formatStartDate(dateString) {
            const parts = dateString.split('/');
            const formattedDate = `${parts[2]}-${parts[0].padStart(2, '0')}-${parts[1].padStart(2, '0')}`;
            return formattedDate;
        },
        formatCalenderDate(dateStr) {
            const [month, day, year] = dateStr.split("/");
            return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
        },
        formatDate(dateString) {
            const date = new Date(dateString);
            if (isNaN(date.getTime())) {
              return 'Invalid date';
            }
            const options = { year: 'numeric', month: 'long' };
            return new Intl.DateTimeFormat('en-US', options).format(date);
        },
        handleCloseModal() {
            this.isShowLoginModal = false;
        },
        notBeforeToday(date) {
            return date < new Date(new Date().setHours(0, 0, 0, 0)) || this.isShowCalLoading;
        },
        parseHTML(html) {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, "text/html");
            const elements = doc.body.children;
            const result = [];

            for (let el of elements) {
                if (el.tagName === "P") {
                    result.push({ type: "paragraph", content: el.textContent });
                } else if (el.tagName === "H4") {
                    result.push({ type: "heading", content: el.textContent });
                } else if (el.tagName === "UL") {
                    const items = [];
                    for (let li of el.children) {
                        if (li.tagName === "LI") {
                            items.push(li.textContent);
                        }
                    }
                    result.push({ type: "list", items: items });
                }
            }
            return result;
        },
        formatPrice(price) {
            return Math.round(price);
        },
        addToCart(bookingDetails){
            //this.buttonLoading = true;
            var formData = bookingDetails;

            console.log("post data", formData);
            // /api/booking/addToCart
            axios.post(`/api/booking/addToCart`, formData).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    console.log("add to cart success");
                    console.log("status",response.data.status);
                    console.log("message",response.data.message);
                    if(response.data.status == 0){
                        this.isRequired = true;
                        this.buttonLoading = false;
                        this.errorMsg = response.data.message;
                        return false;
                    }
                    console.log("checkout url",response.data.booking_code);
                    //window.location.href = response.data.url;
                    var code = response.data.booking_code;
                    if(code){
                        this.$router.push({ name: 'checkout', params: { code: response.data.booking_code } });
                    }
                }
                this.buttonLoading = false;
            }).catch(({ response }) => {
                this.buttonLoading = false;
                if(response.status == 401){
                    console.log("in 401 add to cart");
                    this.isShowLoginModal = true;
                    //alert(response.data.message)
                    //window.location.href = "/";
                }else{
                    alert(response.data.message)
                }
            }).finally(() => {

            })
        }
    },
};

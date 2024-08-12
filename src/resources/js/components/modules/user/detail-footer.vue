<template>
    <div class="bravo_footer">
        <div class="mailchimp">
            <div class="container">
                <div class="row">
                    <div class="col-xs-12 col-lg-10 col-lg-offset-1">
                        <div class="row">
                            <div class="col-xs-12  col-md-7 col-lg-6">
                                <div class="media ">
                                    <div class="media-left hidden-xs">
                                        <i class="icofont-island-alt"></i>
                                    </div>
                                    <div class="media-body">
                                        <h4 class="media-heading">Get Updates &amp; More</h4>
                                        <p>Thoughtful thoughts to your inbox</p>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xs-12 col-md-5 col-lg-6">
                                <form action="http://127.0.0.1:8000/newsletter/subscribe"
                                    class="subcribe-form bravo-subscribe-form bravo-form">
                                    <input type="hidden" name="_token" value="PLPb1kYeAMjtGHsksOPpGBNeL0Lu6r9PI9gmevIv"
                                        autocomplete="off">
                                    <div class="form-group">
                                        <input type="text" name="email" class="form-control email-input"
                                            placeholder="Your Email">
                                        <button type="submit" class="btn-submit">Subscribe
                                            <i class="fa fa-spinner fa-pulse fa-fw"></i>
                                        </button>
                                    </div>
                                    <div class="form-mess"></div>
                                </form>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="main-footer">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-6">
                        <div class="nav-footer">
                            <div class="title">
                                NEED HELP?
                            </div>
                            <div class="context">
                                <div class="contact">
                                    <div class="c-title">
                                        Call Us
                                    </div>
                                    <div class="sub">
                                        + 00 222 44 5678
                                    </div>
                                </div>
                                <div class="contact">
                                    <div class="c-title">
                                        Email for Us
                                    </div>
                                    <div class="sub">
                                        hello@yoursite.com
                                    </div>
                                </div>
                                <div class="contact">
                                    <div class="c-title">
                                        Follow Us
                                    </div>
                                    <div class="sub">
                                        <a href="#">
                                            <i class="icofont-facebook"></i>
                                        </a>
                                        <a href="#">
                                            <i class="icofont-twitter"></i>
                                        </a>
                                        <a href="#">
                                            <i class="icofont-youtube-play"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="nav-footer">
                            <div class="title">
                                COMPANY
                            </div>
                            <div class="context">
                                <ul>
                                    <li><a href="#">About Us</a></li>
                                    <li><a href="#">Community Blog</a></li>
                                    <li><a href="#">Rewards</a></li>
                                    <li><a href="#">Work with Us</a></li>
                                    <li><a href="#">Meet the Team</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="nav-footer">
                            <div class="title">
                                SUPPORT
                            </div>
                            <div class="context">
                                <ul>
                                    <li><a href="#">Account</a></li>
                                    <li><a href="#">Legal</a></li>
                                    <li><a href="#">Contact</a></li>
                                    <li><a href="#">Affiliate Program</a></li>
                                    <li><a href="#">Privacy Policy</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-3 col-md-6">
                        <div class="nav-footer">
                            <div class="title">
                                SETTINGS
                            </div>
                            <div class="context">
                                <ul>
                                    <li><a href="#">Setting 1</a></li>
                                    <li><a href="#">Setting 2</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="copy-right">
            <div class="container context">
                <div class="row">
                    <div class="col-md-12">
                        Copyright © 2019 by Booking Core
                        <div class="f-visa">
                            Booking Core
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    components: {

    },
    data() {
        return {

        }
    },
    mounted() {
        //console.log('footer Component mounted.');
    },
    computed: {

    },
    methods: {

    }
}
</script>

<style scoped>
.bravo_footer {
    display: block;
}
</style>
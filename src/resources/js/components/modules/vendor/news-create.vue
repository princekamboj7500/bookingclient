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
                    <div class="col-md-9">
                        <div class="user-form-settings">
                            <userbc :breadcrumbs="breadcrumbs"/>
                            <!-- @yield('content') -->
                            <h2 class="title-bar border-bottom">
                                Add new Post
                            </h2>
                            <form @submit.prevent="createUpdateNews">
                                <div class="row">
                                    <div class="col-md-9">
                                        <div class="panel">
                                            <div class="panel-title"><strong>News content</strong></div>
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label>Title <span class="text-danger">*</span></label>
                                                    <input type="text" required="" placeholder="News title"
                                                        v-model="formData.title" class="form-control">
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label">Content </label>
                                                    <div class="">
                                                        <ckeditor :editor="editor" v-model="formData.content"
                                                            :config="editorConfig"></ckeditor>
                                                        <div role="application" class="tox tox-tinymce"
                                                            style="visibility: hidden; height: 300px;">
                                                            <div class="tox-editor-container">
                                                                <div role="menubar" data-alloy-tabstop="true"
                                                                    class="tox-menubar"><button aria-haspopup="true"
                                                                        role="menuitem" type="button" unselectable="on"
                                                                        tabindex="-1" class="tox-mbtn tox-mbtn--select"
                                                                        aria-expanded="false"
                                                                        style="user-select: none;"><span
                                                                            class="tox-mbtn__select-label">File</span>
                                                                        <div class="tox-mbtn__select-chevron"><svg
                                                                                width="10" height="10">
                                                                                <path
                                                                                    d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                    fill-rule="nonzero"></path>
                                                                            </svg></div>
                                                                    </button><button aria-haspopup="true"
                                                                        role="menuitem" type="button" unselectable="on"
                                                                        tabindex="-1" class="tox-mbtn tox-mbtn--select"
                                                                        aria-expanded="false"
                                                                        style="user-select: none;"><span
                                                                            class="tox-mbtn__select-label">Edit</span>
                                                                        <div class="tox-mbtn__select-chevron"><svg
                                                                                width="10" height="10">
                                                                                <path
                                                                                    d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                    fill-rule="nonzero"></path>
                                                                            </svg></div>
                                                                    </button><button aria-haspopup="true"
                                                                        role="menuitem" type="button" unselectable="on"
                                                                        tabindex="-1" class="tox-mbtn tox-mbtn--select"
                                                                        aria-expanded="false"
                                                                        style="user-select: none;"><span
                                                                            class="tox-mbtn__select-label">View</span>
                                                                        <div class="tox-mbtn__select-chevron"><svg
                                                                                width="10" height="10">
                                                                                <path
                                                                                    d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                    fill-rule="nonzero"></path>
                                                                            </svg></div>
                                                                    </button><button aria-haspopup="true"
                                                                        role="menuitem" type="button" unselectable="on"
                                                                        tabindex="-1" class="tox-mbtn tox-mbtn--select"
                                                                        aria-expanded="false"
                                                                        style="user-select: none;"><span
                                                                            class="tox-mbtn__select-label">Insert</span>
                                                                        <div class="tox-mbtn__select-chevron"><svg
                                                                                width="10" height="10">
                                                                                <path
                                                                                    d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                    fill-rule="nonzero"></path>
                                                                            </svg></div>
                                                                    </button><button aria-haspopup="true"
                                                                        role="menuitem" type="button" unselectable="on"
                                                                        tabindex="-1" class="tox-mbtn tox-mbtn--select"
                                                                        aria-expanded="false"
                                                                        style="user-select: none;"><span
                                                                            class="tox-mbtn__select-label">Format</span>
                                                                        <div class="tox-mbtn__select-chevron"><svg
                                                                                width="10" height="10">
                                                                                <path
                                                                                    d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                    fill-rule="nonzero"></path>
                                                                            </svg></div>
                                                                    </button><button aria-haspopup="true"
                                                                        role="menuitem" type="button" unselectable="on"
                                                                        tabindex="-1" class="tox-mbtn tox-mbtn--select"
                                                                        aria-expanded="false"
                                                                        style="user-select: none;"><span
                                                                            class="tox-mbtn__select-label">Tools</span>
                                                                        <div class="tox-mbtn__select-chevron"><svg
                                                                                width="10" height="10">
                                                                                <path
                                                                                    d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                    fill-rule="nonzero"></path>
                                                                            </svg></div>
                                                                    </button><button aria-haspopup="true"
                                                                        role="menuitem" type="button" unselectable="on"
                                                                        tabindex="-1" class="tox-mbtn tox-mbtn--select"
                                                                        aria-expanded="false"
                                                                        style="user-select: none;"><span
                                                                            class="tox-mbtn__select-label">Table</span>
                                                                        <div class="tox-mbtn__select-chevron"><svg
                                                                                width="10" height="10">
                                                                                <path
                                                                                    d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                    fill-rule="nonzero"></path>
                                                                            </svg></div>
                                                                    </button><button aria-haspopup="true"
                                                                        role="menuitem" type="button" unselectable="on"
                                                                        tabindex="-1" class="tox-mbtn tox-mbtn--select"
                                                                        aria-expanded="false"
                                                                        style="user-select: none;"><span
                                                                            class="tox-mbtn__select-label">Help</span>
                                                                        <div class="tox-mbtn__select-chevron"><svg
                                                                                width="10" height="10">
                                                                                <path
                                                                                    d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                    fill-rule="nonzero"></path>
                                                                            </svg></div>
                                                                    </button></div>
                                                                <div role="group" class="tox-toolbar-overlord">
                                                                    <div role="group" class="tox-toolbar__primary">
                                                                        <div title="" role="toolbar"
                                                                            data-alloy-tabstop="true" tabindex="-1"
                                                                            class="tox-toolbar__group"><button
                                                                                title="Blocks" aria-label="Blocks"
                                                                                aria-haspopup="true" type="button"
                                                                                unselectable="on" tabindex="-1"
                                                                                class="tox-tbtn tox-tbtn--select tox-tbtn--bespoke"
                                                                                aria-expanded="false"
                                                                                style="user-select: none;"><span
                                                                                    class="tox-tbtn__select-label">Paragraph</span>
                                                                                <div class="tox-tbtn__select-chevron">
                                                                                    <svg width="10" height="10">
                                                                                        <path
                                                                                            d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                            fill-rule="nonzero"></path>
                                                                                    </svg></div>
                                                                            </button></div>
                                                                        <div title="" role="toolbar"
                                                                            data-alloy-tabstop="true" tabindex="-1"
                                                                            class="tox-toolbar__group"><button
                                                                                aria-label="Bold" title="Bold"
                                                                                type="button" tabindex="-1"
                                                                                class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M7.8 19c-.3 0-.5 0-.6-.2l-.2-.5V5.7c0-.2 0-.4.2-.5l.6-.2h5c1.5 0 2.7.3 3.5 1 .7.6 1.1 1.4 1.1 2.5a3 3 0 0 1-.6 1.9c-.4.6-1 1-1.6 1.2.4.1.9.3 1.3.6s.8.7 1 1.2c.4.4.5 1 .5 1.6 0 1.3-.4 2.3-1.3 3-.8.7-2.1 1-3.8 1H7.8zm5-8.3c.6 0 1.2-.1 1.6-.5.4-.3.6-.7.6-1.3 0-1.1-.8-1.7-2.3-1.7H9.3v3.5h3.4zm.5 6c.7 0 1.3-.1 1.7-.4.4-.4.6-.9.6-1.5s-.2-1-.7-1.4c-.4-.3-1-.4-2-.4H9.4v3.8h4z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button><button
                                                                                aria-label="Italic" title="Italic"
                                                                                type="button" tabindex="-1"
                                                                                class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M16.7 4.7l-.1.9h-.3c-.6 0-1 0-1.4.3-.3.3-.4.6-.5 1.1l-2.1 9.8v.6c0 .5.4.8 1.4.8h.2l-.2.8H8l.2-.8h.2c1.1 0 1.8-.5 2-1.5l2-9.8.1-.5c0-.6-.4-.8-1.4-.8h-.3l.2-.9h5.8z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button><button
                                                                                aria-label="Strikethrough"
                                                                                title="Strikethrough" type="button"
                                                                                tabindex="-1" class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <g fill-rule="evenodd">
                                                                                            <path
                                                                                                d="M15.6 8.5c-.5-.7-1-1.1-1.3-1.3-.6-.4-1.3-.6-2-.6-2.7 0-2.8 1.7-2.8 2.1 0 1.6 1.8 2 3.2 2.3 4.4.9 4.6 2.8 4.6 3.9 0 1.4-.7 4.1-5 4.1A6.2 6.2 0 0 1 7 16.4l1.5-1.1c.4.6 1.6 2 3.7 2 1.6 0 2.5-.4 3-1.2.4-.8.3-2-.8-2.6-.7-.4-1.6-.7-2.9-1-1-.2-3.9-.8-3.9-3.6C7.6 6 10.3 5 12.4 5c2.9 0 4.2 1.6 4.7 2.4l-1.5 1.1z">
                                                                                            </path>
                                                                                            <path
                                                                                                d="M5 11h14a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2z"
                                                                                                fill-rule="nonzero">
                                                                                            </path>
                                                                                        </g>
                                                                                    </svg></span></button>
                                                                            <div aria-pressed="false"
                                                                                aria-label="Text color"
                                                                                title="Text color" role="button"
                                                                                aria-haspopup="true" tabindex="-1"
                                                                                class="tox-split-button"
                                                                                aria-expanded="false"
                                                                                aria-describedby="aria_9368856901751717136995064">
                                                                                <span role="presentation" tabindex="-1"
                                                                                    class="tox-tbtn"><span
                                                                                        class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                            width="24" height="24">
                                                                                            <g fill-rule="evenodd">
                                                                                                <path
                                                                                                    id="tox-icon-text-color__color"
                                                                                                    d="M3 18h18v3H3z">
                                                                                                </path>
                                                                                                <path
                                                                                                    d="M8.7 16h-.8a.5.5 0 0 1-.5-.6l2.7-9c.1-.3.3-.4.5-.4h2.8c.2 0 .4.1.5.4l2.7 9a.5.5 0 0 1-.5.6h-.8a.5.5 0 0 1-.4-.4l-.7-2.2c0-.3-.3-.4-.5-.4h-3.4c-.2 0-.4.1-.5.4l-.7 2.2c0 .3-.2.4-.4.4zm2.6-7.6l-.6 2a.5.5 0 0 0 .5.6h1.6a.5.5 0 0 0 .5-.6l-.6-2c0-.3-.3-.4-.5-.4h-.4c-.2 0-.4.1-.5.4z">
                                                                                                </path>
                                                                                            </g>
                                                                                        </svg></span></span><span
                                                                                    role="presentation" tabindex="-1"
                                                                                    class="tox-tbtn tox-split-button__chevron"><svg
                                                                                        width="10" height="10">
                                                                                        <path
                                                                                            d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                            fill-rule="nonzero"></path>
                                                                                    </svg></span><span
                                                                                    aria-hidden="true"
                                                                                    id="aria_9368856901751717136995064"
                                                                                    style="display: none;">To open the
                                                                                    popup, press Shift+Enter</span>
                                                                            </div>
                                                                            <div aria-pressed="false"
                                                                                aria-label="Background color"
                                                                                title="Background color" role="button"
                                                                                aria-haspopup="true" tabindex="-1"
                                                                                class="tox-split-button"
                                                                                aria-expanded="false"
                                                                                aria-describedby="aria_2168248291771717136995065">
                                                                                <span role="presentation" tabindex="-1"
                                                                                    class="tox-tbtn"><span
                                                                                        class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                            width="24" height="24">
                                                                                            <g fill-rule="evenodd">
                                                                                                <path
                                                                                                    id="tox-icon-highlight-bg-color__color"
                                                                                                    d="M3 18h18v3H3z">
                                                                                                </path>
                                                                                                <path
                                                                                                    fill-rule="nonzero"
                                                                                                    d="M7.7 16.7H3l3.3-3.3-.7-.8L10.2 8l4 4.1-4 4.2c-.2.2-.6.2-.8 0l-.6-.7-1.1 1.1zm5-7.5L11 7.4l3-2.9a2 2 0 0 1 2.6 0L18 6c.7.7.7 2 0 2.7l-2.9 2.9-1.8-1.8-.5-.6">
                                                                                                </path>
                                                                                            </g>
                                                                                        </svg></span></span><span
                                                                                    role="presentation" tabindex="-1"
                                                                                    class="tox-tbtn tox-split-button__chevron"><svg
                                                                                        width="10" height="10">
                                                                                        <path
                                                                                            d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                            fill-rule="nonzero"></path>
                                                                                    </svg></span><span
                                                                                    aria-hidden="true"
                                                                                    id="aria_2168248291771717136995065"
                                                                                    style="display: none;">To open the
                                                                                    popup, press Shift+Enter</span>
                                                                            </div>
                                                                        </div>
                                                                        <div title="" role="toolbar"
                                                                            data-alloy-tabstop="true" tabindex="-1"
                                                                            class="tox-toolbar__group"><button
                                                                                aria-label="Insert/edit link"
                                                                                title="Insert/edit link" type="button"
                                                                                tabindex="-1" class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M6.2 12.3a1 1 0 0 1 1.4 1.4l-2.1 2a2 2 0 1 0 2.7 2.8l4.8-4.8a1 1 0 0 0 0-1.4 1 1 0 1 1 1.4-1.3 2.9 2.9 0 0 1 0 4L9.6 20a3.9 3.9 0 0 1-5.5-5.5l2-2zm11.6-.6a1 1 0 0 1-1.4-1.4l2-2a2 2 0 1 0-2.6-2.8L11 10.3a1 1 0 0 0 0 1.4A1 1 0 1 1 9.6 13a2.9 2.9 0 0 1 0-4L14.4 4a3.9 3.9 0 0 1 5.5 5.5l-2 2z"
                                                                                            fill-rule="nonzero"></path>
                                                                                    </svg></span></button><button
                                                                                aria-label="Insert/edit image"
                                                                                title="Insert/edit image" type="button"
                                                                                tabindex="-1" class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M5 15.7l3.3-3.2c.3-.3.7-.3 1 0L12 15l4.1-4c.3-.4.8-.4 1 0l2 1.9V5H5v10.7zM5 18V19h3l2.8-2.9-2-2L5 17.9zm14-3l-2.5-2.4-6.4 6.5H19v-4zM4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm6 8a2 2 0 1 0 0-4 2 2 0 0 0 0 4z"
                                                                                            fill-rule="nonzero"></path>
                                                                                    </svg></span></button><button
                                                                                aria-label="Insert/edit media"
                                                                                title="Insert/edit media" type="button"
                                                                                tabindex="-1" class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M4 3h16c.6 0 1 .4 1 1v16c0 .6-.4 1-1 1H4a1 1 0 0 1-1-1V4c0-.6.4-1 1-1zm1 2v14h14V5H5zm4.8 2.6l5.6 4a.5.5 0 0 1 0 .8l-5.6 4A.5.5 0 0 1 9 16V8a.5.5 0 0 1 .8-.4z"
                                                                                            fill-rule="nonzero"></path>
                                                                                    </svg></span></button></div>
                                                                        <div title="" role="toolbar"
                                                                            data-alloy-tabstop="true" tabindex="-1"
                                                                            class="tox-toolbar__group"><button
                                                                                aria-label="Align left"
                                                                                title="Align left" type="button"
                                                                                tabindex="-1" class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 4h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2zm0-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button><button
                                                                                aria-label="Align center"
                                                                                title="Align center" type="button"
                                                                                tabindex="-1" class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm3 4h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 1 1 0-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2zm-3-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button><button
                                                                                aria-label="Align right"
                                                                                title="Align right" type="button"
                                                                                tabindex="-1" class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm6 4h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0 8h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm-6-4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button><button
                                                                                aria-label="Justify" title="Justify"
                                                                                type="button" tabindex="-1"
                                                                                class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M5 5h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 1 1 0-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2zm0 4h14c.6 0 1 .4 1 1s-.4 1-1 1H5a1 1 0 0 1 0-2z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button></div>
                                                                        <div role="toolbar" data-alloy-tabstop="true"
                                                                            tabindex="-1" class="tox-toolbar__group">
                                                                            <button aria-label="More..." title="More..."
                                                                                type="button" data-alloy-tabstop="true"
                                                                                tabindex="-1" class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M6 10a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2zm12 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2zm-6 0a2 2 0 0 0-2 2c0 1.1.9 2 2 2a2 2 0 0 0 2-2 2 2 0 0 0-2-2z"
                                                                                            fill-rule="nonzero"></path>
                                                                                    </svg></span></button></div>
                                                                    </div>
                                                                    <div role="group"
                                                                        class="tox-toolbar__overflow tox-toolbar__overflow--closed"
                                                                        style="height: 0px;">
                                                                        <div title="" role="toolbar"
                                                                            data-alloy-tabstop="true" tabindex="-1"
                                                                            class="tox-toolbar__group">
                                                                            <div aria-pressed="false"
                                                                                aria-label="Numbered list"
                                                                                title="Numbered list" role="button"
                                                                                aria-haspopup="true" tabindex="-1"
                                                                                class="tox-split-button"
                                                                                aria-expanded="false"
                                                                                aria-describedby="aria_1473560741791717136995071">
                                                                                <span role="presentation" tabindex="-1"
                                                                                    class="tox-tbtn"><span
                                                                                        class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                            width="24" height="24">
                                                                                            <path
                                                                                                d="M10 17h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0-6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 1 1 0-2zM6 4v3.5c0 .3-.2.5-.5.5a.5.5 0 0 1-.5-.5V5h-.5a.5.5 0 0 1 0-1H6zm-1 8.8l.2.2h1.3c.3 0 .5.2.5.5s-.2.5-.5.5H4.9a1 1 0 0 1-.9-1V13c0-.4.3-.8.6-1l1.2-.4.2-.3a.2.2 0 0 0-.2-.2H4.5a.5.5 0 0 1-.5-.5c0-.3.2-.5.5-.5h1.6c.5 0 .9.4.9 1v.1c0 .4-.3.8-.6 1l-1.2.4-.2.3zM7 17v2c0 .6-.4 1-1 1H4.5a.5.5 0 0 1 0-1h1.2c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.4a.4.4 0 1 1 0-.8h1.3c.2 0 .3-.1.3-.3 0-.2-.1-.3-.3-.3H4.5a.5.5 0 1 1 0-1H6c.6 0 1 .4 1 1z"
                                                                                                fill-rule="evenodd">
                                                                                            </path>
                                                                                        </svg></span></span><span
                                                                                    role="presentation" tabindex="-1"
                                                                                    class="tox-tbtn tox-split-button__chevron"><svg
                                                                                        width="10" height="10">
                                                                                        <path
                                                                                            d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                            fill-rule="nonzero"></path>
                                                                                    </svg></span><span
                                                                                    aria-hidden="true"
                                                                                    id="aria_1473560741791717136995071"
                                                                                    style="display: none;">To open the
                                                                                    popup, press Shift+Enter</span>
                                                                            </div>
                                                                            <div aria-pressed="false"
                                                                                aria-label="Bullet list"
                                                                                title="Bullet list" role="button"
                                                                                aria-haspopup="true" tabindex="-1"
                                                                                class="tox-split-button"
                                                                                aria-expanded="false"
                                                                                aria-describedby="aria_3351864901811717136995072">
                                                                                <span role="presentation" tabindex="-1"
                                                                                    class="tox-tbtn"><span
                                                                                        class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                            width="24" height="24">
                                                                                            <path
                                                                                                d="M11 5h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zm0 6h8c.6 0 1 .4 1 1s-.4 1-1 1h-8a1 1 0 0 1 0-2zM4.5 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1zm0 6c0-.4.1-.8.4-1 .3-.4.7-.5 1.1-.5.4 0 .8.1 1 .4.4.3.5.7.5 1.1 0 .4-.1.8-.4 1-.3.4-.7.5-1.1.5-.4 0-.8-.1-1-.4-.4-.3-.5-.7-.5-1.1z"
                                                                                                fill-rule="evenodd">
                                                                                            </path>
                                                                                        </svg></span></span><span
                                                                                    role="presentation" tabindex="-1"
                                                                                    class="tox-tbtn tox-split-button__chevron"><svg
                                                                                        width="10" height="10">
                                                                                        <path
                                                                                            d="M8.7 2.2c.3-.3.8-.3 1 0 .4.4.4.9 0 1.2L5.7 7.8c-.3.3-.9.3-1.2 0L.2 3.4a.8.8 0 0 1 0-1.2c.3-.3.8-.3 1.1 0L5 6l3.7-3.8z"
                                                                                            fill-rule="nonzero"></path>
                                                                                    </svg></span><span
                                                                                    aria-hidden="true"
                                                                                    id="aria_3351864901811717136995072"
                                                                                    style="display: none;">To open the
                                                                                    popup, press Shift+Enter</span>
                                                                            </div>
                                                                            <button aria-label="Decrease indent"
                                                                                title="Decrease indent" type="button"
                                                                                tabindex="-1" class="tox-tbtn"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2zm1.6-3.8a1 1 0 0 1-1.2 1.6l-3-2a1 1 0 0 1 0-1.6l3-2a1 1 0 0 1 1.2 1.6L6.8 12l1.8 1.2z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button><button
                                                                                aria-label="Increase indent"
                                                                                title="Increase indent" type="button"
                                                                                tabindex="-1" class="tox-tbtn"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M7 5h12c.6 0 1 .4 1 1s-.4 1-1 1H7a1 1 0 1 1 0-2zm5 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm0 4h7c.6 0 1 .4 1 1s-.4 1-1 1h-7a1 1 0 0 1 0-2zm-5 4h12a1 1 0 0 1 0 2H7a1 1 0 0 1 0-2zm-2.6-3.8L6.2 12l-1.8-1.2a1 1 0 0 1 1.2-1.6l3 2a1 1 0 0 1 0 1.6l-3 2a1 1 0 1 1-1.2-1.6z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button>
                                                                        </div>
                                                                        <div title="" role="toolbar"
                                                                            data-alloy-tabstop="true" tabindex="-1"
                                                                            class="tox-toolbar__group"><button
                                                                                aria-label="Page break"
                                                                                title="Page break" type="button"
                                                                                tabindex="-1" class="tox-tbtn"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <g fill-rule="evenodd">
                                                                                            <path
                                                                                                d="M5 11c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h1c.6 0 1 .4 1 1s-.4 1-1 1H8a1 1 0 0 1 0-2zm4 0c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zm3 0h1c.6 0 1 .4 1 1s-.4 1-1 1h-1a1 1 0 0 1 0-2zm4 0c.6 0 1 .4 1 1s-.4 1-1 1a1 1 0 0 1 0-2zM7 3v5h10V3c0-.6.4-1 1-1s1 .4 1 1v7H5V3c0-.6.4-1 1-1s1 .4 1 1zM6 22a1 1 0 0 1-1-1v-7h14v7c0 .6-.4 1-1 1a1 1 0 0 1-1-1v-5H7v5c0 .6-.4 1-1 1z">
                                                                                            </path>
                                                                                        </g>
                                                                                    </svg></span></button><button
                                                                                aria-label="Insert/edit code sample"
                                                                                title="Insert/edit code sample"
                                                                                type="button" tabindex="-1"
                                                                                class="tox-tbtn"
                                                                                aria-pressed="false"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="26">
                                                                                        <path
                                                                                            d="M7.1 11a2.8 2.8 0 0 1-.8 2 2.8 2.8 0 0 1 .8 2v1.7c0 .3.1.6.4.8.2.3.5.4.8.4.3 0 .4.2.4.4v.8c0 .2-.1.4-.4.4-.7 0-1.4-.3-2-.8-.5-.6-.8-1.3-.8-2V15c0-.3-.1-.6-.4-.8-.2-.3-.5-.4-.8-.4a.4.4 0 0 1-.4-.4v-.8c0-.2.2-.4.4-.4.3 0 .6-.1.8-.4.3-.2.4-.5.4-.8V9.3c0-.7.3-1.4.8-2 .6-.5 1.3-.8 2-.8.3 0 .4.2.4.4v.8c0 .2-.1.4-.4.4-.3 0-.6.1-.8.4-.3.2-.4.5-.4.8V11zm9.8 0V9.3c0-.3-.1-.6-.4-.8-.2-.3-.5-.4-.8-.4a.4.4 0 0 1-.4-.4V7c0-.2.1-.4.4-.4.7 0 1.4.3 2 .8.5.6.8 1.3.8 2V11c0 .3.1.6.4.8.2.3.5.4.8.4.2 0 .4.2.4.4v.8c0 .2-.2.4-.4.4-.3 0-.6.1-.8.4-.3.2-.4.5-.4.8v1.7c0 .7-.3 1.4-.8 2-.6.5-1.3.8-2 .8a.4.4 0 0 1-.4-.4v-.8c0-.2.1-.4.4-.4.3 0 .6-.1.8-.4.3-.2.4-.5.4-.8V15a2.8 2.8 0 0 1 .8-2 2.8 2.8 0 0 1-.8-2zm-3.3-.4c0 .4-.1.8-.5 1.1-.3.3-.7.5-1.1.5-.4 0-.8-.2-1.1-.5-.4-.3-.5-.7-.5-1.1 0-.5.1-.9.5-1.2.3-.3.7-.4 1.1-.4.4 0 .8.1 1.1.4.4.3.5.7.5 1.2zM12 13c.4 0 .8.1 1.1.5.4.3.5.7.5 1.1 0 1-.1 1.6-.5 2a3 3 0 0 1-1.1 1c-.4.3-.8.4-1.1.4a.5.5 0 0 1-.5-.5V17a3 3 0 0 0 1-.2l.6-.6c-.6 0-1-.2-1.3-.5-.2-.3-.3-.7-.3-1 0-.5.1-1 .5-1.2.3-.4.7-.5 1.1-.5z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button><button
                                                                                aria-label="Source code"
                                                                                title="Source code" type="button"
                                                                                tabindex="-1" class="tox-tbtn"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <g fill-rule="nonzero">
                                                                                            <path
                                                                                                d="M9.8 15.7c.3.3.3.8 0 1-.3.4-.9.4-1.2 0l-4.4-4.1a.8.8 0 0 1 0-1.2l4.4-4.2c.3-.3.9-.3 1.2 0 .3.3.3.8 0 1.1L6 12l3.8 3.7zM14.2 15.7c-.3.3-.3.8 0 1 .4.4.9.4 1.2 0l4.4-4.1c.3-.3.3-.9 0-1.2l-4.4-4.2a.8.8 0 0 0-1.2 0c-.3.3-.3.8 0 1.1L18 12l-3.8 3.7z">
                                                                                            </path>
                                                                                        </g>
                                                                                    </svg></span></button></div>
                                                                        <div title="" role="toolbar"
                                                                            data-alloy-tabstop="true" tabindex="-1"
                                                                            class="tox-toolbar__group"><button
                                                                                aria-label="Clear formatting"
                                                                                title="Clear formatting" type="button"
                                                                                tabindex="-1" class="tox-tbtn"><span
                                                                                    class="tox-icon tox-tbtn__icon-wrap"><svg
                                                                                        width="24" height="24">
                                                                                        <path
                                                                                            d="M13.2 6a1 1 0 0 1 0 .2l-2.6 10a1 1 0 0 1-1 .8h-.2a.8.8 0 0 1-.8-1l2.6-10H8a1 1 0 1 1 0-2h9a1 1 0 0 1 0 2h-3.8zM5 18h7a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2zm13 1.5L16.5 18 15 19.5a.7.7 0 0 1-1-1l1.5-1.5-1.5-1.5a.7.7 0 0 1 1-1l1.5 1.5 1.5-1.5a.7.7 0 0 1 1 1L17.5 17l1.5 1.5a.7.7 0 0 1-1 1z"
                                                                                            fill-rule="evenodd"></path>
                                                                                    </svg></span></button></div>
                                                                    </div>
                                                                </div>
                                                                <div class="tox-anchorbar"></div>
                                                                <div class="tox-sidebar-wrap">
                                                                    <div class="tox-edit-area"><iframe
                                                                            id="IOtUEtCcW5_ifr" frameborder="0"
                                                                            allowtransparency="true"
                                                                            title="Rich Text Area. Press ALT-0 for help."
                                                                            class="tox-edit-area__iframe"></iframe>
                                                                    </div>
                                                                    <div role="complementary" class="tox-sidebar">
                                                                        <div data-alloy-tabstop="true" tabindex="-1"
                                                                            class="tox-sidebar__slider tox-sidebar--sliding-closed"
                                                                            style="width: 0px;">
                                                                            <div class="tox-sidebar__pane-container">
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="tox-statusbar">
                                                                <div class="tox-statusbar__text-container">
                                                                    <div role="navigation" data-alloy-tabstop="true"
                                                                        class="tox-statusbar__path"></div><button
                                                                        type="button" data-alloy-tabstop="true"
                                                                        tabindex="-1" class="tox-statusbar__wordcount">0
                                                                        words</button><span
                                                                        class="tox-statusbar__branding"><a
                                                                            href="https://www.tiny.cloud/?utm_campaign=editor_referral&amp;utm_medium=poweredby&amp;utm_source=tinymce&amp;utm_content=v5"
                                                                            rel="noopener" target="_blank" tabindex="-1"
                                                                            aria-label="Powered by Tiny">Powered by
                                                                            Tiny</a></span>
                                                                </div>
                                                                <div title="Resize"
                                                                    class="tox-statusbar__resize-handle">
                                                                    <svg width="10" height="10">
                                                                        <g fill-rule="nonzero">
                                                                            <path
                                                                                d="M8.1 1.1A.5.5 0 1 1 9 2l-7 7A.5.5 0 1 1 1 8l7-7zM8.1 5.1A.5.5 0 1 1 9 6l-3 3A.5.5 0 1 1 5 8l3-3z">
                                                                            </path>
                                                                        </g>
                                                                    </svg>
                                                                </div>
                                                            </div>
                                                            <div aria-hidden="true" class="tox-throbber"
                                                                style="display: none;"></div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="panel">
                                            <div
                                                class="panel-title d-flex justify-content-between align-items-center py-2">
                                                <strong>Search engine</strong>
                                                <a href="#" data-toggle="modal" data-target="#seo_config"
                                                    class="btn btn-sm btn-link">Edit</a>
                                            </div>
                                            <div class="panel-body">
                                                <div class="seo-preview max-w-650">
                                                    <div class="d-flex align-items-center mb-2">
                                                        <div
                                                            class="seo-favicon w-28 h-28 mr-2 d-flex align-items-center justify-content-center">
                                                            <img rel="icon" class="w-18 h-18" type="image/png"
                                                                src="http://127.0.0.1:8000/uploads/demo/general/favicon.png">
                                                        </div>
                                                        <div>
                                                            <div class="seo-site-name text-14">Booking Core</div>
                                                            <div class="seo-url text-12">http://127.0.0.1:8000/news
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div>
                                                        <div class="seo-title text-20 mb-2">
                                                            <span class="val"></span>
                                                        </div>
                                                        <div class="seo-desc text-14"></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="modal" tabindex="-1" id="seo_config">
                                            <div class="modal-dialog modal-lg">
                                                <div class="modal-content">
                                                    <div class="modal-header">
                                                        <h5 class="modal-title">Search Engine</h5>
                                                        <button type="button" class="close" data-dismiss="modal"
                                                            aria-label="Close">
                                                            <span aria-hidden="true">×</span>
                                                        </button>
                                                    </div>
                                                    <div class="modal-body">
                                                        <div class="row">
                                                            <div class="col-md-6">
                                                                <div class="form-group  ">
                                                                    <label class="control-label">
                                                                        Allow search engines to show this service in
                                                                        search
                                                                        results?
                                                                    </label>
                                                                    <select name="seo_index" class="form-control">
                                                                        <option value="1">Yes</option>
                                                                        <option value="0">No</option>
                                                                    </select>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <ul class="nav nav-tabs mb-2" data-condition="seo_index:is(1)">
                                                            <li class="nav-item">
                                                                <a class="nav-link active" data-toggle="tab"
                                                                    href="#seo_1">General Options</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" data-toggle="tab"
                                                                    href="#seo_2">Share
                                                                    Facebook</a>
                                                            </li>
                                                            <li class="nav-item">
                                                                <a class="nav-link" data-toggle="tab"
                                                                    href="#seo_3">Share
                                                                    Twitter</a>
                                                            </li>
                                                        </ul>
                                                        <div class="tab-content" data-condition="seo_index:is(1)">
                                                            <div class="tab-pane active" id="seo_1">
                                                                <div class="form-group">
                                                                    <label class="control-label">Seo Title</label>
                                                                    <input type="text" name="seo_title"
                                                                        class="form-control"
                                                                        placeholder="Leave blank to use service title"
                                                                        value="">
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="control-label">Seo Description</label>
                                                                    <textarea name="seo_desc" rows="3"
                                                                        class="form-control" placeholder=""></textarea>
                                                                </div>
                                                                <div class="form-group form-group-image">
                                                                    <label class="control-label">Featured Image</label>
                                                                    <div class="dungdt-upload-box dungdt-upload-box-normal "
                                                                        data-val="">
                                                                        <div class="upload-box" v-show="!value">
                                                                            <input type="hidden" name="seo_image"
                                                                                v-model="value" value="">
                                                                            <div class="text-center">
                                                                                <svg id="next-dropzone" width="100%"
                                                                                    height="100%">

                                                                                </svg>
                                                                            </div>
                                                                            <div class="text-center">
                                                                                <span
                                                                                    class="btn btn-primary btn-field-upload"
                                                                                    @click="openUploader">Upload
                                                                                    image</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="attach-demo" title="Change file">
                                                                        </div>
                                                                        <div class="upload-actions justify-content-between"
                                                                            v-show="value">
                                                                            <a class="edit-img btn btn-sm btn-primary edit-single"
                                                                                data-file=""><i
                                                                                    class="fa fa-edit"></i></a>
                                                                            <a class="delete btn btn-sm btn-danger"><i
                                                                                    class="fa fa-trash"></i></a>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="tab-pane" id="seo_2">
                                                                <div class="form-group">
                                                                    <label class="control-label">Facebook Title</label>
                                                                    <input type="text" name="seo_share[facebook][title]"
                                                                        class="form-control"
                                                                        placeholder="Enter title..." value="">
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="control-label">Facebook
                                                                        Description</label>
                                                                    <textarea name="seo_share[facebook][desc]" rows="3"
                                                                        class="form-control"
                                                                        placeholder="Enter description..."></textarea>
                                                                </div>
                                                                <div class="form-group form-group-image">
                                                                    <label class="control-label">Facebook Image</label>
                                                                    <div class="dungdt-upload-box dungdt-upload-box-normal "
                                                                        data-val="">
                                                                        <div class="upload-box" v-show="!value">
                                                                            <input type="hidden"
                                                                                name="seo_share[facebook][image]"
                                                                                v-model="value" value="">
                                                                            <div class="text-center">
                                                                                <svg id="next-dropzone" width="100%"
                                                                                    height="100%">

                                                                                </svg>
                                                                            </div>
                                                                            <div class="text-center">
                                                                                <span
                                                                                    class="btn btn-primary btn-field-upload"
                                                                                    @click="openUploader">Upload
                                                                                    image</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="attach-demo" title="Change file">
                                                                        </div>
                                                                        <div class="upload-actions justify-content-between"
                                                                            v-show="value">
                                                                            <a class="edit-img btn btn-sm btn-primary edit-single"
                                                                                data-file=""><i
                                                                                    class="fa fa-edit"></i></a>
                                                                            <a class="delete btn btn-sm btn-danger"><i
                                                                                    class="fa fa-trash"></i></a>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                            <div class="tab-pane" id="seo_3">
                                                                <div class="form-group">
                                                                    <label class="control-label">Twitter Title</label>
                                                                    <input type="text" name="seo_share[twitter][title]"
                                                                        class="form-control"
                                                                        placeholder="Enter title..." value="">
                                                                </div>
                                                                <div class="form-group">
                                                                    <label class="control-label">Twitter
                                                                        Description</label>
                                                                    <textarea name="seo_share[twitter][desc]" rows="3"
                                                                        class="form-control"
                                                                        placeholder="Enter description..."></textarea>
                                                                </div>
                                                                <div class="form-group form-group-image">
                                                                    <label class="control-label">Twitter Image</label>
                                                                    <div class="dungdt-upload-box dungdt-upload-box-normal "
                                                                        data-val="">
                                                                        <div class="upload-box" v-show="!value">
                                                                            <input type="hidden"
                                                                                name="seo_share[twitter][image]"
                                                                                v-model="value" value="">
                                                                            <div class="text-center">
                                                                                <svg id="next-dropzone" width="100%"
                                                                                    height="100%">

                                                                                </svg>
                                                                            </div>
                                                                            <div class="text-center">
                                                                                <span
                                                                                    class="btn btn-primary btn-field-upload"
                                                                                    @click="openUploader">Upload
                                                                                    image</span>
                                                                            </div>
                                                                        </div>
                                                                        <div class="attach-demo" title="Change file">
                                                                        </div>
                                                                        <div class="upload-actions justify-content-between"
                                                                            v-show="value">
                                                                            <a class="edit-img btn btn-sm btn-primary edit-single"
                                                                                data-file=""><i
                                                                                    class="fa fa-edit"></i></a>
                                                                            <a class="delete btn btn-sm btn-danger"><i
                                                                                    class="fa fa-trash"></i></a>
                                                                        </div>
                                                                    </div>

                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="modal-footer">
                                                        <button type="button" data-dismiss="modal"
                                                            class="btn btn-primary">Apply</button>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="col-md-3">
                                        <div class="panel">
                                            <div class="panel-title"><strong>Status</strong></div>
                                            <div class="panel-body">
                                                <select v-model="formData.status" name="status" class="form-control">
                                                    <option value="draft">Draft </option>
                                                    <option value="pending">Pending </option>
                                                    <option value="publish">Publish </option>
                                                </select>
                                            </div>
                                            <div class="panel-footer">

                                                <div class="text-right">
                                                    <button class="btn btn-primary" type="submit"><i
                                                            class="fa fa-save"></i>
                                                        Save Changes</button>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="panel">
                                            <div class="panel-body">
                                                <div class="form-group">
                                                    <label>Category </label>
                                                    <select v-model="formData.cat_id"
                                                        class="form-control">
                                                        <option value="">-- Please Select --</option>
                                                        <option v-for="category in categories" :key="category.id"
                                                            :value="category.id">
                                                            {{ category.name }}
                                                        </option>
                                                    </select>
                                                </div>
                                                <div class="form-group">
                                                    <label class="control-label"> Tag</label>
                                                    <div class="">
                                                        <input type="text" data-role="tagsinput" value=""
                                                            placeholder="Enter tag" v-model="formData.tag" name="tag"
                                                            class="form-control tag-input">
                                                        <br>
                                                        <div class="show_tags">
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div class="panel">
                                            <div class="panel-body">
                                                <h3 class="panel-body-title"> Feature Image</h3>
                                                <div class="form-group">
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
                                                            <div class="upload-actions-feature justify-content-between">
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
                                        </div>

                                    </div>
                                </div>
                            </form>
                            <!-- end content-->
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Sidebar from './sidebar.vue';
import userbc from './user-bc.vue';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import SVGComponent from './SVGComponent.vue';

export default {
    components: {
        Sidebar,
        userbc,
        SVGComponent
    },
    data() {
        return {
            newsId: this.$route.params.id || null,
            value: '',
            editor: ClassicEditor,
            editorData: '<p>Content of the editor.</p>',
            editorConfig: {
                // The configuration of the editor.
            },
            activeTab: 'content',
            categories: [],
            formData: {
                title: "",
                content: '',
                status: "draft",
                cat_id: "",
                tag: '',
                image_id: '',
                seo_title: "",
                seo_desc: "",
                seo_image: "",
            },
            feature_image_imageUrl: '',
            breadcrumbs: []
        };
    },
    mounted() {
        // Fetch data here
        this.getData();
        if (this.newsId) {
            console.log("is edit true");
            axios.get(`/api/vendor/news-edit/${this.newsId}`).then(({ data }) => {
                console.log("data", data);
                this.formData = data.data.row;
                this.breadcrumbs = data.data.breadcrumbs;
                this.getImage(data.data.row.image_id, 'feature');
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        }
    },
    methods: {
        getData() {
            axios.get(`/api/vendor/news-create`).then(({ data }) => {
                console.log("get data", data);
                console.log("attributes", data.data.categories);
                this.categories = data.data.categories;
                //this.attributes = data.data.attributes;
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        getImage(id, type) {
            axios.get(`/api/vendor/get-file/${id}`).then(({ data }) => {
                const imageUrl = `${window.location.protocol}//${window.location.host}/${data.driver}/${data.file_path}`;

                if (type === 'banner') {
                    this.banner_image_imageUrl = imageUrl;
                } else if (type === 'feature') {
                    this.feature_image_imageUrl = imageUrl;
                } else if ("gallery") {
                    this.images.push({ file: '', url: imageUrl });
                }
                console.log("id", id, "imageUrl", imageUrl);

                // Select all elements with the class 'upload-actions'
                var demoDivs = document.querySelectorAll('.upload-actions-feature');
                if (demoDivs) {
                    demoDivs.forEach(function (demoDiv) {
                        demoDiv.style.display = 'block';
                    });
                }
            }).catch(error => {
                console.error("Error fetching image data:", error.response ? error.response.data : error.message);
            });
        },
        createUpdateNews() {
            console.log("formData", this.formData);
            var postData = this.formData;

            var id = -1;
            if (this.newsId) {
                id = this.newsId;
            }
            console.log("post data", postData);
            axios.post(`/api/vendor/news-store/${id}`, postData).then(response => {
                console.log("api response => ", response.data);

                if (response.status == 200) {
                    console.log("success");
                    this.$router.push({ name: 'vendorNews' });
                }
            }).catch(({ response }) => {
                alert(response.data.message)
            }).finally(() => {

            })
        },
        openUploader() {

        },
        editImage(type) {
            if (type === 'banner') {
                this.openUploader();
            } else if (type === 'feature') {
                this.triggerFeatureFileInput();
            }
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

img, svg {
    height: 100%;
    width: 100%;
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

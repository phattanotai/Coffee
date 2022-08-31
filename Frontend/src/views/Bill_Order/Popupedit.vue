<template>
    <div>
        <vs-popup class="popupEdit" :active.sync="popupEdit">
            <div class="row">
                <div class="col-12">
                    <div class="card shadow position-relative">
                        <div class="card-header card-header-card bg-gray-90">
                            <div class="px-2">
                                <h5 class="mb-0">อัพโหลดรูปภาพ</h5>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="px-2 text-center">
                                <b-field class="card--upload">
                                    <b-upload v-model="dropFiles" @input="uploadFile" drag-drop expanded
                                        v-if="dropFiles==null || dropFiles.length==0 ">
                                        <section>
                                            <div
                                                class="border--upload h-100 w-100 cursor-pointer d-grid align-items-center justify-content-center">
                                                <div>
                                                    <h2 class="fw-light">วางรูปที่นี่</h2>
                                                    <span class="fw-light">ขนาด 200 x 200 px เท่านั้น</span>
                                                </div>

                                                <div class="btn-upload">
                                                    <span class="material-icons">
                                                        cloud_upload
                                                    </span>
                                                    <span class="ms-2">อัพโหลดรูปภาพ</span>
                                                </div>
                                            </div>
                                        </section>
                                    </b-upload>
                                </b-field>
                                <div v-if="dropFiles!=null">
                                    <div v-if="popupCardupload" class="card--upload">
                                        <div @click="deleteDropFile()"
                                            class="btn-delete-preview d-flex align-items-center justify-content-center">
                                            <img :src="require(`@/assets/images/trash_light.png`)" class="w-100"></div>
                                        <section>
                                            <div
                                                class="border--upload h-100 w-100 p-3 d-flex align-items-center justify-content-center">
                                                <img class="w-100 image-preview" :src="imageData">
                                            </div>
                                        </section>
                                    </div>
                                    <Completecomponent v-if="popupSuccess" class="mb-3" :msg-text="msg" />
                                    <Failcomponent v-if="popupDanger" class="mb-3" :msg-text="msg" />
                                </div>

                                <div class="btn-setting mt-4">
                                    <vs-button v-show='popupCardbtn' :disabled='btnDisabled' @click="submit"
                                        class="me-2" color="#146EFF">
                                        <span class="material-icons"> save </span>
                                        Save</vs-button>
                                    <vs-button v-show='popupCardbtn' :disabled='btnDisabled' @click="closePopupedit"
                                        color="#ADADAD"><span class="material-icons">highlight_off</span>Cancel
                                    </vs-button>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </vs-popup>
    </div>
</template>

<script>
    import Completecomponent from "@/layout/Popup/Complete";
    import Failcomponent from "@/layout/Popup/Fail";
    export default {
        name: 'popupedit',
        components: {
            Completecomponent,
            Failcomponent
        },
        data: () => ({
            popupEdit: false,
            fileBase64: null,
            dropFiles: null,
            imageData: "",
            index: '',

            btnDisabled: false,
            popupCardbtn: true,
            popupSuccess: false,
            popupDanger: false,
            msg: '',
        }),

        methods: {
            closePopupedit() {
                this.popupEdit = false
                this.dropFiles = null
                this.fileBase64 = null
                this.imageData = ''
                this.popupSuccess = false
                this.popupDanger = false
            },

            uploadFile() {
                var reader = new FileReader()
                reader.readAsDataURL(this.dropFiles)
                reader.onload = (e) => {
                    this.fileBase64 = reader.result
                    this.imageData = e.target.result;
                };
                this.popupCardupload = true
            },

            deleteDropFile(index) {
                this.dropFiles = null
                this.fileBase64 = null
                this.imageData = ''
                this.btnDisabled = false
                this.popupCardbtn = true
            },

            submit() {
                if (this.dropFiles != null) {
                    this.btnDisabled = true
                    this.popupCardbtn = false
                    this.popupCardupload = false
                    this.popupSuccess = true
                    this.msg = 'อัพโหลดรูปภาพสำเร็จ'
                   setTimeout(() => {
                        this.logogameimage = this.imageData
                        this.closePopupedit()
                        this.btnDisabled = false
                    }, 3000)
                }

            }
        },
    }
</script>
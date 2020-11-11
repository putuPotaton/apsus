export default {
    props: ['initialInfo'],
    template: `
<div class="note-img-container">
<h3
v-if="isTitle">
{{info.title}}
</h3><img style="margin-bottom:0.5rem" :src="getUrl"  alt="" />
</div>
`
    ,
    data() {
        return {
            info: {},
            imgSrc: ''
        }
    },

    created() {
        this.imgSrc = this.initialInfo.url
        this.info = this.initialInfo
    },

    computed: {
        getUrl() {
            return this.imgSrc
        },
        isTitle() {
            return this.info.title ? this.info.title : null
        }

    }
}
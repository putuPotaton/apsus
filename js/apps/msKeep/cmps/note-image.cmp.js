export default {
    props: ['initialInfo'],
    template: `
<div>
<h3
v-if="isTitle">
{{info.title}}
</h3><img :src="getUrl"  alt="" />
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
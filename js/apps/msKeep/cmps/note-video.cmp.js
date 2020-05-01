export default {
    template: `
<div>
<h3
v-if="isTitle">
{{info.title}}
</h3>
    <iframe :src="'https://www.youtube.com/embed/'+getVideoID"></iframe>
</div>

`,
    props: ['initialInfo'],



    data() {
        return {
            startTime: null,
            info: {}
        }
    },
    computed: {
        getVideoID() {
            return (this.initialInfo.url.substring(this.initialInfo.url.length - 11))
        },
        isTitle() {
            return this.info.title ? this.info.title : null
        }
    }
    ,
    created() {
        this.info = this.initialInfo,
            this.getURL

    }
}

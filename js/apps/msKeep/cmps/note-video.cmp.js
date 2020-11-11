export default {
    template: `
<div class="note-video-container">
<h3
v-if="isTitle">
{{info.title}}
</h3>
    <iframe style="margin-bottom:0.65rem" :src="'https://www.youtube.com/embed/'+getVideoID"></iframe>
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

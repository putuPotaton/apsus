import emailExpPreview from './emailExpPreview.cmp.js'

export default {
    template: `
        <section class="emailPreview-container">
            <ul @click="expandEmail">
                <li>{{email.senderName}}</li>
                <li>{{email.subject}}</li>
                <li>{{shortText}}</li>
                <li>{{formattedTime}}</li>
            </ul>
            <emailExpPreview v-if="isExpended" :email="email"></emailExpPreview>
        </section>               
    `,
    data(){
        return {
            isExpended: false
        }
    },
    props: ['email'],
    computed: {
        shortText() {
            return (this.email.body.substring(0, 60)+'...');
        },
        formattedTime() {
            const hours = new Date(this.email.sentAt).getHours();
            const minutes = "0" + new Date(this.email.sentAt).getMinutes();
            return (hours + ':' + minutes.substr(-2));
        }
    },
    methods: {
        expandEmail() {
            this.isExpended = !this.isExpended
        }
    },
    created() {
        // for testing
        // console.log('email', this.email.sentAt.toLocaleTimeString());
    },
    components: {
        emailExpPreview
    }
}
import {emailService} from '../services/email.service.js';

export default {
    template:`
    <section class="emailCompose-container" v-if="email">
        <h2>Compose mail</h2>
        <form @submit.prevent="sendEmail">
            <label>To:</label>
            <input type="text" v-model="email.to">
            <label>cc:</label>
            <input type="text" v-model="email.cc">
            <label>subject:</label>
            <input type="text" v-model="email.subject">
            <textarea v-model="email.body"></textarea>
            <button>Send</button>
        </form>
    </section>
    `,
    data(){
        return {
            email: null
        }
    },
    methods: {
        sendEmail() {
            emailService.saveEmail(this.email)
        }
    },
    created() {
        emailService.getEmptyEmail()
            .then(email => this.email = email);
    }
}
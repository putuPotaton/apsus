import { emailService } from "../services/email.service.js";

//     senderName: 'Yossi Pupkin',
//     from: 'yossi@gmail.com',
//     to: 'vladkt@gmail.com',
//     cc: ['moran@gmail.com','yoda@gmail.com'],
//     subject: 'check this lorem out',
//     body: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum pharetra quam ut mauris tempor vehicula. Donec feugiat lorem a ex blandit pretium. Sed vestibulum sed orci viverra tincidunt. Cras sem elit, ultrices quis nunc tincidunt, mollis pellentesque justo. Suspendisse efficitur dignissim suscipit. Cras sollicitudin arcu vehicula nisl cursus consectetur. Duis sit amet pellentesque tellus. In mauris metus, consequat suscipit fringilla a, sodales in nunc. Cras malesuada pharetra ante mollis sollicitudin..',
//     isRead: false,
//     sentAt: Date.now() - Math.floor(Math.random()*9100000),
//     isStarred: false


export default {
    template:`
    <section class="emailDetails-container" v-if="email">
        <h4>{{calcDate}} </h4>
        <hr>
        <h4>From: {{email.senderName}} - {{email.from}} </h4>
        <hr>
        <h4>To: {{email.to}}</h4>
        <hr>
        <h4>subject: {{email.subject}}</h4>
        <hr>
        <p>{{email.body}}</p>
    </section>
    `,
    data() {
        return {
            email : null
        }
    },
    methods: {
        getEmail() {
            const emailId = this.$route.params.id;//
            emailService.getEmailById(emailId)
                .then(email => this.email = email)
        }
    },
    computed: {
        calcDate() {
            return new Date(this.email.sentAt)
        }
    },
    created() {
        this.getEmail()
    }
}
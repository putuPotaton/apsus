import {eventBus} from '../../../services/event-bus.service.js'

export default {
    template: `
        <section class="emailExpPreview-container">
            <button @click="removeEmail">X</button>
            <router-link :to="'/mrEmail/details/'+email.id"> 
                Details
            </router-link>
            <ul>
                <li>{{email.subject}}</li>
                <li>{{email.from}}</li>
                <li>{{this.email.body}}</li>
            </ul>
        </section>               
    `,
    data(){
        return {
            isExpended: false
        }
    },
    props: ['email'],
    methods: {
        removeEmail() {
            eventBus.$emit('remove-email', this.email.id)
        }
    },
    created() {
        // for testing
        console.log('email from props', this.email);
    }
}
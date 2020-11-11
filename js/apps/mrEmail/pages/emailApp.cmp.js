import {emailService} from '../services/email.service.js';
import emailFilter from '../cmps/emailFilter.cmp.js';
import emailList from '../cmps/emailList.cmp.js';
import emailNavbar from '../cmps/emailNavbar.cmp.js'
import {eventBus} from '../../../services/event-bus.service.js'

export default {
    template:`
        <section class="emailApp-container">
            <emailFilter @set-filter="setFilter"></emailFilter>
            <div>
                <emailNavbar></emailNavbar>
                <router-view v-if="emails" :emails="emails"></router-view>
            </div>
            <!-- <emailList v-if="emails" :emails="emails"></emailList> -->
        </section>
    `,
    data() {
        return {
            emails : null,
            filterBy : null
        }
    },
    methods: {
        setFilter(filter) {
            this.filterBy = filter;
        },
        searchBy(){
            if (!this.filterBy) return this.emails;
            emailService.getFilteredEmails(this.filterBy)
                .then(emails => this.emails=emails);
        },
        removeEmail(emailId) {
            emailService.deleteEmail(emailId).then(resp => console.log(resp))
            
        }
    },
    watch: {
        filterBy: {
            handler() {
                 this.searchBy();
            },
            deep: true
        } 
     }, 
    created(){
        emailService.getEmails()
            .then(emails => {
                this.emails=emails
            });

        emailService.getEmailsStatus()
            .then(emailsStatus => console.log(emailsStatus));

        eventBus.$on('remove-email',(emailId) => {
            this.removeEmail(emailId);
        })    
    },
    components: {
        emailFilter,
        emailList,
        emailNavbar
    }
}
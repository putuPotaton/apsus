import {eventBus, EVENT_SHOW_MSG} from '../services/event-bus.service.js'

export default {
    template: `
            <transition name="fade">
                <section class="msg-container" v-if="msg" :class="msg.type">
                    <button @click="closeMsg">x</button>
                    <h2>{{msg.txt}}</h2>
                </section>
            </transition>
    `,
    data(){
        return {
            msg:null
        }
    },
    
    created(){
        eventBus.$on(EVENT_SHOW_MSG, (msg) => {
            this.msg = msg
            setTimeout(() => {
                this.msg= null
            }, 2000);
        })
    },
    methods: {
        closeMsg() {
            this.msg = null
        }
    }
}
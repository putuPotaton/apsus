import emailPreview from './emailPreview.cmp.js'

export default {
    template: `
    <section class="emailList-container">
        <!-- <h2>Your Emails:</h2> -->
        <ul>
            <li v-for="email in emails">
                <emailPreview :email="email"></emailPreview>
                <!-- <button @click="$emit('remove', currCar.id)">x</button> -->
            </li>
        </ul>
    </section>
    `,
    props: ['emails'],
    components: {
        emailPreview
    },
    methods: {
      
    },
    created() {
        // for testing
        // console.log('got emails: ', this.emails);
    }
}
import bookService from '../services/book.service.js';
import stars from './stars-review.cmp.js'

export default {
    template: `
        <form class = "book-review-form" @submit.prevent="pushReview" >
        <input type="text" placeholder="Books reader" v-model ="review.name">
        <input type="date" v-model ="review.date">
<stars @updateRate="updateRate"></stars>
<textarea name="" id="" cols="30" rows="10"  v-model ="review.txt"></textarea>
<button> Submit!</button>
     </form>
    `,
    props:['book'],
    data() {
        return {
            review: {
                name: null,
                date: null,
                rate: null,
                txt: null
            },
        }
    },
    methods: {
        pushReview() {
            const bookId = this.book.id
            bookService.addReview(bookId, this.review)
            this.review = {
                name: null,
                date: null,
                rate: null,
                txt: null
            }
            this.$emit('reviewPushed')
        },
        updateRate(rateVal){
            this.review.rate=rateVal;
        }
    },
    created(){
    },
components:{
    'stars': stars
}

}
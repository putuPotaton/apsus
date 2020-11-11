import bookService from "../services/book.service.js"
import review from "../cmps/book-review.cmp.js"
import reviews from "../cmps/book-reviews.cmp.js"

export default {

  template: `
  <div class="book-details-container">

  <div class="book-details-upper-container">

      <div class="detail-img-container">
          <img class="book-cover" :src="book.thumbnail" alt="">
          <img class="on-sale" v-if="this.book.isOnSale" src="../img/SaleIcon.png" alt="">
      </div>

      <div class="book-details-info-container">
          <h2>{{book.title}} </h2>

          <div class="pre" style="max-width:30ch;">
          <span>    Book Sub-Title:    {{book.subtitle?book.subtitle: '' }}
          </span>
          <span>    Authors :     {{...book.authors}}
          </span>
          <span>    Published At :     {{book.publishedDate?book.publishedDate: ''}}
          </span>
          <span>    Pages :     {{book.pageCount}}
          </span>
          <span>   Language :     {{book.language}}
          </span>
  <span  v-if=""book.lisrPtice>
  price: {{book.listPrice.amount}}
  </span>
  </div>
          <review :book="book" @reviewPushed="getBook"></review>
          <section v-if="nextPrevBookIds" class="next-prev">
              <router-link :to="nextPrevBookIds.prevId"><i class="fas fa-backward filter-search-icon"></i>
              </router-link>
              <router-link :to="nextPrevBookIds.nextId"><i class="fas fa-forward filter-search-icon"></i>
              </router-link>
          </section>

      </div>
  </div>
  
  <reviews v-if="bookReviews" :reviews="bookReviews"></reviews>
</div>
`,

  data() {
    return {
      book: {},
      nextPrevBookIds: null,
      bookReviews: []
    };
  },

  watch: {
    '$route.params.bookId'(to, from) {
      this.getBook()
    }
  },

  methods: {
    getBook() {
      const bookID = this.$route.params.bookId
      bookService.getBookById(bookID)
        .then(book => {
          this.book = book
          this.nextPrevBookIds = bookService.getNextPrevBookIds(book.id)
          this.bookReviews = book.reviews ? book.reviews : []
        })
    }
  },

  computed: {
    getPrice() {
      return book.price;
    },

  },

  created() {
    this.getBook()
    console.dir(this.book)
  },


  components: {
    review,
    reviews
  }
}

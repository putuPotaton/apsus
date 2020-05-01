import  bookService  from "../services/book.service.js";
import bookList from '../cmps/book-list.cmp.js'
import bookFilter from '../cmps/book-filter.cmp.js'
import bookPreview from '../cmps/book-preview.cmp.js'
import { eventBus, EVENT_SHOW_MSG } from '../services/event-bus.service.js'

export default{
  // v-if="isOnListDisplay"
  template: `
    <section  class="books-container">
<div>
    <book-filter  @filtered="filtered"></book-filter>
    </div>

    <div>

<book-list :books="booksToShow"  @remove="removeBook" ></book-list> 
</div>


</section>
<!-- <div>

<book-details v-else :initial-book="bookSelected" @exitDetails="exitdetails"></book-details>
</div> -->

`,

  data() {
    return {
      bookSelected: {},
      // isOnListDisplay: true,
      books: [],
      filterBy: null
    };
  },

  methods: {
    onBookSelected(book) {
        console.log(book)
        this.bookSelected = book;
        this.isOnListDisplay=false;
    },

    filtered(filter) {
      this.filterBy = filter;
    },
    exitdetails(){
        this.bookSelected=null;
        this.isOnListDisplay=true
    },
    removeBook(bookID) {
      bookService.removeBookByID(bookID)
          .then(()=>{
              console.log(`book ${bookID} deleted succesfully`);
              eventBus.$emit(EVENT_SHOW_MSG, {
                  txt: `book ${bookID} deleted succesfully`,
                  type: 'success'
              })
          })
          .catch(()=>{
            eventBus.$emit(EVENT_SHOW_MSG, {
              txt: `could not delete book ${bookID} `,
              type: 'error'
          })
  })
  }
},

  created() {
     bookService.query()
     .then(books=>this.books =books)
  },
  computed: {
    booksToShow() {
      if (!this.filterBy) {
        return this.books;
      }
      let filterBooks = this.books.slice()
            if (this.filterBy.name) {
        filterBooks=filterBooks.filter(book => {
         return book.title.toLowerCase().includes(this.filterBy.name.toLowerCase())
        })
      }
      if (this.filterBy.minPrice) {
        console.log('in min price ! ',this.filterBy.minPrice)
        filterBooks = filterBooks.filter(book => {
          // console.log('book price: ' , book.price, 'filterBy.minPrice: ',this.filterBy.minPrice)
         return book.listPrice.amount > this.filterBy.minPrice
        })
      }
      if (this.filterBy.maxPrice) {
        filterBooks = filterBooks.filter(book => {
          return book.listPrice.amount < +(this.filterBy.maxPrice)
        })
      }
      if(this.filterBy.shorter){
        filterBooks = filterBooks.filter(book => {
          return book.pageCount <150
        })      }
        if(this.filterBy.longer){
          filterBooks = filterBooks.filter(book => {
            return book.pageCount >250
          })  }
    console.log(filterBooks)
      return filterBooks
    }
  },

components:{
    'book-list':bookList,
    'book-details':bookFilter,
    'book-preview':bookPreview,
    bookFilter
}
  }


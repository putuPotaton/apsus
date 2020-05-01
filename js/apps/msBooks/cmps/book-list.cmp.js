import  bookService  from "../services/book.service.js";

import bookPreview from './book-preview.cmp.js'

export default {
  template: `
    <section class="book-list-container">
    <div class="book-prevs-container">
        <book-preview 
        class="book-prev-container"
        :book="currBook"
        v-for="(currBook, idx) in books"
         :idx="idx">
         <i  @click.prevent="$emit('remove', currBook.id)" class="delete-btn fas fa-trash-alt remove-note-btn"></i>
         </book-preview> 
</div>
      </section>
      `,

  props: ['books','initialFilterBy'],
  data() {
    return {
      toShowList: true,
      filterBy: null,
    };
  },
  
  components:{
    'book-preview':  bookPreview 
    
  },
}


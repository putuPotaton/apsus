export default {
  props: ["book", "idx"],
  template: `
 
        <router-link :to="'/book/'+book.id"
         class="prev-img-container">  
         <slot></slot>     
        <img class="book-cover" :src="book.thumbnail" alt=""/>
        <img class="on-sale" v-if="getIsOnSale" src="img/SaleIcon.png" >    
        <div class="book-prev-txt">
        <h4>{{book.title}}</h4>
        <h4>{{getPrice}}</h4>
        </div>
</router-link>
`,

  data() {
    return{
    isOnHover:false
    }
  },

  computed: {
    getPrice() {
      if (!this.book.listPrice) { return }
      let coin
      const coinLiteral = this.book.listPrice.currencyCode;
      if (coinLiteral === "EUR") coin = '€'
      if (coinLiteral === "USD") coin = '$'
      if (coinLiteral === "ILS") coin = '₪'
      return this.book.listPrice.amount + coin

    },
    getIsOnSale(){
      return this.book.listPrice? this.book.listPrice.isOnSale:false
    }
  },

};

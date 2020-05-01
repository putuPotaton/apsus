import bookService from "../services/book.service.js"

export default{
template:`
<div>
    <input class="input-google-book" placeholder="seek new books online" v-model="searchVal" @input="googleSearch" />
<!-- <pre>
    {{googleResaults}} 
</pre> -->
<ul class="google-resaults">
    <li v-for="res in googleResaults"
    class="add-search-resault">
    <img :src="res.thumbnail" alt=""> 
    <div class="google-res-title">
    {{res.title}}
    </div>
        <i class="fas filter-search-icon fa-plus-square add-resault-btn" @click="addThisBook(res)"></i>

</li>
</ul>


</div>


`,


/* <button @click="addThisBook(res)">+</button> */

data(){
    return{
        searchVal:'',
        googleResaults:[]
    }
    },
    methods:{
        addThisBook(book){
            bookService.addBook(book)
            .then(this.$router.push('/book'))
        }
    },

    computed:{
        googleSearch(){
             bookService.searchGoogleBook(this.searchVal)
             .then(ans=>{
                 this.googleResaults=bookService.localize(ans["items"])
                })
        },

    }
}






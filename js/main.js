// import bookApp from'./cmps/book-app.cmp.js'
import navBar from './cmps/nav-bar.cmp.js'
import routes from './routes.js'
// import userMsg from "./cmps/user-msg.cmp.js"

// var books = bookService.query();

const router = new VueRouter({routes})


 new Vue({
     router,
    el: '#appsus',
    template: `
        <section class="my-app">
            <Header>
                <navBar></navBar>
            </Header>
            <router-view> </router-view>
        </section>
    `,


components:{
navBar
}
})
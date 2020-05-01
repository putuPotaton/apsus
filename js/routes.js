// import home from './cmps/home.cmp.js'
import bookApp from './apps/msBooks/pages/book-app.page.js'
import bookDetails from './apps/msBooks/pages/book-details.page.js'
import addBook from './apps/msBooks/pages/book-add.cmp.js'
import bookReview from './apps/msBooks/pages/book-review.page.js'
import keepApp from './apps/msKeep/pages/keep-app.page.js'
import mailApp from './apps/mrEmail/pages/emailApp.cmp.js'
import emailCompose from './apps/mrEmail/pages/emailCompose.cmp.js'
import emailDetails from './apps/mrEmail/pages/emailDetails.cmp.js'
import emailList from './apps/mrEmail/cmps/emailList.cmp.js'




const routes = [
    // {path:'/', component:home},
    {
        path: '/book', component: bookApp}
    ,
    { path: '/msKeep', component: keepApp },
    { path: '/book/:bookId', component: bookDetails },
    {
        path: '/mrEmail', component: mailApp,
        children: [
            { path: '', component: emailList },
            { path: 'details/:id?', component: emailDetails },
            { path: 'compose/:id?', component: emailCompose }
        ]
    },
    {path:'/book/:bookId', component:bookDetails},
    {path:'/add-book/', component:addBook},

];

export default routes
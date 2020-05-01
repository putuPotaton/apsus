export default {
    template:`
        <div class="navbar">
            <button class="btn-nav btn-nav-back" @click="goBack">⇦</button>
            <router-link class="nav-link" to="/" exact>
                Home
            </router-link>
            <router-link class="nav-link" to="/book" exact>
                Our Books
            </router-link>
            </router-link>
            <router-link class="nav-link" to="/about">
                About
            </router-link>
            <router-link class="nav-link" to="/add-book">
                add
            </router-link>
        </div>
    `,
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}


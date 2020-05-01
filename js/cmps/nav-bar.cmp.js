export default{
    template:`
        <div class="navbar">
            <button class="btn-nav btn-nav-back" @click="goBack">⇦</button>
            <router-link class="nav-link" to="/" exact>
                Home
            </router-link>
            <router-link class="nav-link" to="/mrEmail" exact>
                mr Email
            </router-link>
            </router-link>
            <router-link class="nav-link" to="/msKeep" exact>
                ms Keep
            </router-link>
            <router-link class="nav-link" to="/book" exact>
                ms Book
            </router-link>
        </div>
    `,
    methods:{
        goBack(){
            this.$router.go(-1)
        }
    }
}

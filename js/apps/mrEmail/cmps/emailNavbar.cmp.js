
export default {
    template:`
        <div class="emailNavbar-container">
            <router-link to="/mrEmail/compose" exact>
                Compose
            </router-link>
            <!-- | -->
            <router-link to="/mrEmail" exact>
                Inbox
            </router-link>
            <!-- | -->
            <router-link to="/mrEmail">
                Starred
            </router-link>
            <!-- | -->
            <router-link to="/mrEmail">
                Sent Mail
            </router-link>
            <!-- | -->
            <router-link to="/mrEmail">
                Drafts
            </router-link>
        </div>
    `,
}
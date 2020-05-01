

export default {
    template: `
    <section class="emailFilter-container">
        <h3>Filter mail</h3>
        <input type="text" 
            placeholder="Search email.." 
            v-model="filterBy.str" 
        />
        <select v-model="filterBy.emailStatus">
                <option value='all'>All</option>
                <option value='unread'>Unread</option>
                <option value='read'>Read</option>
            </select>
    </section>
    `,
    data() {
        return {
            filterBy: {str: '', emailStatus: 'all'}
        }
    },
    watch: {
       filterBy: {
           handler(newVal) {
                console.log('search changed To:', newVal.str , newVal.emailStatus);
                this.emitFilter();
           },
           deep: true
       } 
    },
    methods:{
        emitFilter() {
            this.$emit('set-filter', this.filterBy)
        }
    }

}
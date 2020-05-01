export default {
  template: `
    <section class="book-filter">
        <input type="text" 
            placeholder="Book Name.." 
            v-model="filterBy.name" 
            @keyup.enter="emitFilter"
            class="main-filter"
            />
            <i class="fas fa-search filter-search-icon" @click="emitFilter"></i>
            <router-link to="/add-book">
            <i class="far fa-plus-square filter-search-icon filter-add-btn"></i>
            </router-link>
            <i class="fas fa-caret-square-down filter-search-icon filter-menu-btn"
            @click="toggleFilterMenu"></i>


            <div v-if="isFilterMenuOpen" class="filter-menu swing-in-top-fwd ">
            <div class="filter-menu-price">
            <h3 class="menu-title-price"> <i class="fas fa-money-bill-wave-alt"> </i>  Price</h3> 
            <input type="number" 
            v-model.number="filterBy.minPrice" 
            placeholder="Minimum Price.."
            @keyup.enter="emitFilter"
            class="menu-input"
            />
            <input type="number" 
            v-model.number="filterBy.maxPrice" 
            placeholder="Maximum Price.." 
            @keyup.enter="emitFilter"
            class="menu-input"
            />
            </div>
            <div class="filter-menu-author">
            <h3 class="menu-title-price"> <i class="fas fa-feather-alt"></i> Author</h3> 
            <input type="text" 
            v-model="filterBy.author" 
            placeholder="search author.."
            @keyup.enter="emitFilter"
            class="menu-input"
            />
            </div>
            <div class="filter-menu-length">
            <h3 class="menu-title-price"><i class="fas fa-book-open"></i>   Length</h3> 
            <button @click.prevent="toggleShortFilter" class="filter-length-btn filter-search-icon" :class="{selectedBtn: filterBy.shorter}"> Short(less than 150) </button>
            <button  @click.prevent="toggleLongFilter" class="filter-length-btn filter-search-icon" :class="{selectedBtn: filterBy.longer}"> Long(more than 250) </button>
            <option value=""
            </div>
            </div>
    </section>    `,
  data() {
    return {
      filterBy: { name: "", minPrice: '', maxPrice: '', longer:false, shorter: false },
      filterMenuOpenMode:false
    };
  },
  computed:{
    isFilterMenuOpen(){
      return this.filterMenuOpenMode
    }
  },
  methods: {
    emitFilter() {
      this.$emit('filtered', {...this.filterBy});
    },
    toggleFilterMenu(){
      this.filterMenuOpenMode=!this.filterMenuOpenMode
    },
    toggleShortFilter(){
      this.filterBy.shorter=!this.filterBy.shorter
    },
    toggleLongFilter(){
      this.filterBy.longer=!this.filterBy.longer
    }
  },
    mounted(){
        this.$emit('filtered', this.filterBy);
    }

  }


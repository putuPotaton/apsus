export default {
  props: ['labels'],
  template: `
      <section class="filter-container">

              <i class="fas  fa-heading filter-vers-btn"
              @click="toggelTitleFilter"
               aria-hidden="true"></i>

               <i class="fas  fa-search filter-vers-btn"
               @click="toggelTxtFilter"
                aria-hidden="true"></i>
                <i class="fas  fa-tag filter-vers-btn"
                @click="toggleLableFilter"></i>

              <select class="note-text-input-add-bar select" @change="emitFilter" v-model="filterBy.type">
    <option class="type-opt" value="" >note type..</option>
    <option class="type-opt" value="noteText">text</option>
    <option class="type-opt" value="noteTodos">todos</option>
    <option class="type-opt" value="noteVideo">video</option>
    <option class="type-opt" value="noteImg">image</option>
    <option class="type-opt" value="">audio</option>
  </select>
          <button @click="emitFilter" class="filter-vers-btn">FILTER</button>

          <div
          v-if="isTxtFilter"
           class="swing-in-top-fwd labels-container one-line">
          <input class="note-text-input-add-bar free-text-input" type="text" 
          v-model="filterBy.innerText" 
          placeholder="free text in note"
          @keyup.enter="emitFilter"
          />
          </div>


          <div
          v-if="isTitleFilter"
           class="swing-in-top-fwd labels-container one-line">
           <input class="note-text-input-add-bar swing-in-left-fwd  title-input"
        
           type="text" 
               placeholder="note title" 
               v-model="filterBy.title" 
               @keyup.enter="emitFilter"
               />
               </div>

          <div
          v-if="isLabelFilterOpen"
           class="swing-in-top-fwd labels-container">
          <span
          v-for="label in labels"
          @click="$emit('filtered', {label:label})">
          <i class="fas  fa-tag "></i>
          {{label}}
          </span>
          <span @click="$emit('filtered', {filterBy})">
          <i class="fas  fa-tag change-pin-btn"></i>
          All abels
          </span>
          </div>
      </section>    `,
  data() {
    return {
isTxtFilter:false,
      isLabelFilterOpen: false,
      isTitleFilter: false,
      filterBy: { title: '', label: '', type: '', innerText: '' }
    };
  },
  methods: {
    emitFilter() {
      this.$emit('filtered', { ...this.filterBy });
    }
    ,
    toggleLableFilter() {
      this.isLabelFilterOpen = !this.isLabelFilterOpen
    },
    toggelTitleFilter() {
      this.isTitleFilter = !this.isTitleFilter
    },
    toggelTxtFilter() {
      this.isTxtFilter = !this.isTxtFilter
    }
    
  },

}

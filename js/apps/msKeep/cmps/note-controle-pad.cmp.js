export default {


    template: `
<div class="controle-pad">

    <i class="fas fa-palette color-picker-btn"  @click.stop="toggleColorPicker"></i>
    <i class="fas  fa-tag change-pin-btn" @click.stop="toggleLabelEdit"></i>
    <i class="fas fa-heading change-pin-btn" @click.stop="togglTitleEdit"></i>
    <i class="fas fa-thumbtack change-pin-btn" @click.stop="$emit('changePin', note.id)"></i>
    
    <div class="color-picker puff-in-center"
    v-if="isOnColorPicker"
    >
    <div class="color-opt"
    v-for="color in colors"
    :style="{'background-color': color}"
    @click.stop ="onColorChoice(color, note.id)">
    </div>
    </div>

    <div class="label-picker puff-in-center"
    v-if="isOnLabelEdit"
    >
    <input type="text" v-model="note.info.label"  @keyup.enter="toggleLabelEdit" @change="$emit('changeLabel', note.info.label, note.id)"/>
    </div>
    <div class="label-picker puff-in-center"
    v-if="isOnTitleEdit"
    >
    <input type="text" v-model="note.info.title" @keyup.enter="togglTitleEdit"  @input="$emit('changeTitle', note.info.title, note.id)"/>
    </div>

    
    </div>
 `,
    props: ['note'],
    data() {
        return {
            title:'',
            BGC: 'rgba(255,255,255,0.3)',
            isOnColorPicker: false,
            isOnLabelEdit:false,
            isOnTitleEdit:false,
            colors: ['#3aa7c9',
                '#30e447',
                '#e48f30',
                '#cb3707',
                '#eaf09b',
                'rgba(255, 255, 255, 0.316)'
            ]
        }
    },

    methods: {
        toggleColorPicker() {
            this.isOnColorPicker = !this.isOnColorPicker;
        },
        toggleLabelEdit() {
            this.isOnLabelEdit = !this.isOnLabelEdit
        }
        ,togglTitleEdit(){
            this.isOnTitleEdit = !this.isOnTitleEdit

        },
        onColorChoice(color, noteID){
            this.$emit('changeBGC', color, noteID)
            this.isOnColorPicker=false
        }
    }





}



// @click.stop ="$emit('changeBGC', color, noteID)"

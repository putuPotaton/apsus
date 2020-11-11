import noteText from "./note-txt.cmp.js";
import noteImg from "./note-image.cmp.js";
import noteVideo from "./note-video.cmp.js";
import noteTodos from "./note-Todos.cmp.js";
import noteService from "../services/note.service.js";
import noteControle from "./note-controle-pad.cmp.js"

export default {
  props: ["notes"],
  template: `
    <section class="notes-list-container" >
    <slot>
    </slot>
    <div class="note-prev-container swing-in-top-fwd" v-for="(currNote, idx) in notes" @click.stop="onSelectNote(currNote,idx)"   
     :style="getNoteStyle(currNote)">
    <component 
        :is="currNote.type" 
        :initialInfo="currNote.info"
        :idx="idx"
        :id="currNote.id"
        @change="onNoteInfoChange"
        >
        </component> 
        <note-controle :note="currNote" 
         @changeLabel="changeLabel"
         @changeTitle="changeTitle"
          @changePin="changePin"
           @changeBGC="changeBGC"
           ></note-controle>
      <i class="fas fa-trash-alt remove-note-btn"  @click.stop="$emit('remove', currNote.id)"></i>
      
</div>

      </section>
      
      `,
  data() {
    return {
      selectedNote: null,
      selectedNoteIDX: null
    };
  },
  methods: {
    changeLabel(newLabel, noteId) {
      this.$emit('changeLabel', newLabel, noteId);
    },
    onNoteInfoChange(changeData) {
      this.$emit("onNoteInfoChange", changeData);
    },
    changeTitle(newTitle, noteId) {
      this.$emit('changeTitle', newTitle, noteId);
    },
    onNoteInfoChange(changeData) {
      this.$emit("onNoteInfoChange", changeData);
    }, onSelectNote(noteSelected, idx) {
      this.selectedNote = noteSelected;
      this.selectedNoteIDX = idx;
    },
    exitSelectedNote() {
      this.selectedNote = null;
      this.selectedNoteIDX = null;
    },

    styleQuery(idx, property) {
      noteService.styleQuery(idx, property).then(res => {
        return res;
      });
    },

    getNoteStyle(note) {
      return note.style?`background-color: ${note.style.BGC};`: '';
    },

    changeBGC(newColor, noteId) {
      this.$emit('changeBGC', newColor, noteId);
    },

    changePin(noteID) {
      this.$emit('changePin', noteID)
    }
  },

  created() { },
  components: {
    'note-controle': noteControle,
    noteText,
    noteImg,
    noteVideo,
    noteTodos
  }
};
{
  /* <div  v-if="selectedNote" class="selected-note-container">
      <component
      :is="selectedNote.type" 
      :initialInfo="selectedNote.info"
      :idx="selectedNoteIDX"
      @change="$emit('noteEdit',selectedNoteIDX, $event)"></component> 
      <button @click="exitSelectedNote">&times</button>
</div> */
}

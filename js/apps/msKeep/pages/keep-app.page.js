import notesFilter from "../cmps/notes-filter.cmp.js";
import notesList from "../cmps/notes-list.cmp.js";
import noteAdd from "../cmps/note-add.cmp.js";
import {
  eventBus,
  EVENT_ADD_TODO,
  EVENT_DELETE_TODO,
  EVENT_CHECKED_TODO
} from "../services/event-bus.service.js";

import noteService from "../services/note.service.js";

export default {
  template: `
<section class="notes-container">
            <notes-filter :labels="getLabels"  @filtered="filtered"></notes-filter>

    <note-add @createNote="newNote"></note-add>

<notes-list
v-if="isPinnedNotes"
 :notes="pinnedNotes"
 @changeBGC="changeBGC"
 @changeLabel="changeLabel"
 @changeTitle="changeTitle"
 :key="listCmpKey" 
 
 @changePin="changePin"
  @onNoteInfoChange="noteEdit"
   @remove="removeNote">
   <h3 class="note-list-title puff-in-center">
   <i aria-hidden="true" class="fas fa-thumbtack"></i>
    pinned notes
   </h3>
   </notes-list> 

<notes-list  
:key="listCmpKey" 
 :notes="unPinnedNotes"
 @changeBGC="changeBGC"
  @onNoteInfoChange="noteEdit"
  @changePin="changePin"
  @changeLabel="changeLabel"
  @changeTitle="changeTitle"
   @remove="removeNote">
   <h3 class="note-list-title puff-in-center"> All notes
   </h3>
   </notes-list> 
  
</section>  
`,

  data() {
    return {
      listCmpKey: 0,
      isPinnedNotes: true,
      noteSelected: {},
      notes: [],
      filterBy: null
    };
  },

  methods: {
    newNote(noteData) {
      noteService.addNote(noteData).then(
        noteService.query().then(notes => {
          this.notes = notes;
        })
      );
    },

    forceRerender() {
      this.listCmpKey += 1;
    },

    filtered(filter) {
      this.filterBy = filter
      noteService.query(filter)
        .then(notes => { this.notes = notes })
    },

    removeNote(noteID) {
      noteService.removeNoteByID(noteID)
        .then(notes => {
          this.notes = notes;
          this.forceRerender()
        })
    },

    changeBGC(BGC, noteID) {
      noteService.changeBGC(BGC, noteID).then(notes => {
        this.notes = notes;
      });
    },

    changeLabel(newLabel, noteID) {
      noteService.changeLabel(newLabel, noteID).then(notes => {
        this.notes = notes;
      });
    },

    changeTitle(newTitle, noteID) {
      noteService.changeTitle(newTitle, noteID).then(notes => {
        this.notes = notes;
      });
    },



    noteEdit(changeData) {
      noteService.updateInfoByID(changeData.id, changeData.info).then(res => {
        noteService.query(this.filterBy)
          .then(notes => {
            this.notes = notes;
          })
      });
    },

    changePin(noteID) {
      noteService
        .togglePinMode(noteID)
        .then(notes => {
          this.notes = notes;
        })
        .then(this.checkForPinnedNotes);
    }
  },

  created() {
    noteService.query()
      .then(notes => {
                this.notes = notes;
      })

    eventBus.$on(EVENT_DELETE_TODO, todoLocation => {
      noteService
        .removeTodoFromNote(todoLocation.noteId, todoLocation.todoID)
        .then(notes => {
          this.notes = notes;
        });
    });

    eventBus.$on(EVENT_CHECKED_TODO, todoLocation => {
      noteService
        .checkTodo(todoLocation.noteId, todoLocation.todoID)
        .then(notes => {
          this.notes = notes;
        });
    });
    eventBus.$on(EVENT_ADD_TODO, newTodoData => {

      noteService
        .addTodo(newTodoData.noteId, newTodoData.newTodo)
        .then(notes => {
          this.notes = notes
        });
    });
  },

  computed: {
    getLabels() {
      let labels = []
      this.notes.forEach(note => {
        if (note.info && note.info.label) {
          labels.push(note.info.label)
        }
      })
      return labels;
    },

    pinnedNotes() {
      return this.notes.filter(note => note.isPinned === true);
    },

    unPinnedNotes() {
      return this.notes.filter(note => {
        return note.isPinned != true
      })
    },

    checkForPinnedNotes() {
      noteService.isPinnedNotes().then(res => {
        this.isPinnedNotes = res;
      });
    }
  },

  components: {
    "notes-list": notesList,
    "note-add": noteAdd,
    "notes-filter": notesFilter
  }
};

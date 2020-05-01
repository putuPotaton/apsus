import { storageService } from "../../../services/storage.service.js";
import { utilService } from "./util.service.js";
const NOTES_KEY = "notes";
var gNotes = storageService.load(NOTES_KEY) ? storageService.load(NOTES_KEY) : [];

export default {
  changeLabel,
  changeTitle,
  addTodo,
  togglePinMode,
  isPinnedNotes,
  changeBGC,
  query,
  getNoteByID,
  removeNoteByID,
  removeTodoFromNote,
  addNote,
  removeNoteByIDX,
  styleQuery,
  updateInfoByID,
  checkTodo
};

function addTodo(noteID, newTodo) {
  return new Promise(resolve => {
    let note = getNoteByID(noteID)
    newTodo.id = utilService.makeId();
    newTodo.doneAt = null;

    note.info.todos.push(newTodo)
    storageService.store(NOTES_KEY, gNotes);
    resolve(gNotes);
  });
}

function togglePinMode(noteID) {
  return new Promise(resolve => {
    let note = getNoteByID(noteID);
    note.isPinned = !note.isPinned;
    resolve(gNotes);
  });
}

function changeBGC(BGC, noteID) {
  return new Promise(resolve => {
    let note = getNoteByID(noteID);
    note.style.BGC = BGC;
    storageService.store(NOTES_KEY, gNotes);
    resolve(gNotes);
  });
}

function changeLabel(newLabel, noteID) {
  return new Promise(resolve => {
    let note = getNoteByID(noteID);
    note.info.label = newLabel;
    storageService.store(NOTES_KEY, gNotes);
    resolve(gNotes);
  })
}
function changeTitle(newTitle, noteID) {
  return new Promise(resolve => {
    let note = getNoteByID(noteID);
    note.info.title = newTitle;
    storageService.store(NOTES_KEY, gNotes);
    resolve(gNotes);
  });
}


function updateInfoByID(id, newInfo) {
  return new Promise(resolve => {
    let note = getNoteByID(id);
    let noteIDX = gNotes.indexOf(note);
    note.info = newInfo;
    gNotes.splice(noteIDX, 1, note);
    storageService.store(NOTES_KEY, gNotes);
    resolve(gNotes);
  });
}

function addNote(noteData) {

  return new Promise(resolve => {
    switch (noteData.noteType) {
      case "noteTxt": {
        addTxtNote(noteData);
        break;
      }
      case "noteImg": {
        addImgNote(noteData);
        break;
      }
      case "noteTodo": {
        addTodoNote(noteData);
        break;
      }
      case "noteVideo": {
        addVideoNote(noteData);
        break;
      }
      case "noteAudio": {
        addAudioNote(noteData);
        break;
      }
    }
    storageService.store(NOTES_KEY, gNotes);

    resolve("note added succesfully!");
  });
}

function addTxtNote(noteData) {
  let note = {
    id: utilService.makeId(),
    type: "noteText",
    isPinned: false,
    info: { txt: noteData.info },
    style: {
      BGC: "rgba(255, 255, 255, 0.316)"
    }
  };
  gNotes.push(note);
}

function addImgNote(noteData) {
  let note = {
    id: utilService.makeId(),
    type: "noteImg", isPinned: false, info: { url: noteData.info }, style: {
      BGC: "rgba(255, 255, 255, 0.316)"
    }
  };
  gNotes.push(note);
}

function addTodoNote(noteData) {
  let givenTodos = noteData.info.split(",");
  let listObjTodos = givenTodos.map(todo => {
    return {
      txt: todo, doneAt: null, id: utilService.makeId()
    };
  });
  let note = {
    id:utilService.makeId(),
    type: "noteTodos",
    isPinned: false,
    info: { todos: listObjTodos},
    style: {
      BGC: "rgba(255, 255, 255, 0.316"
  }
  };
  gNotes.push(note);
}

function addVideoNote(noteData) {
  let note = {
    id:utilService.makeId(),
    type: "noteVideo",
    isPinned: false,
    info: { url: noteData.info },
    style: {
      BGC: "rgba(255, 255, 255, 0.316)"
    }
  };
  gNotes.push(note);
}

// function addAudioNote(noteData) {
//   console.log(noteData.info);
//   let note = {
//     type: "noteAudio",
//     isPinned: false,
//     info: { txt: noteData.info }
//   };
//   console.log(note);
//   gNotes.push(note);
// }




function getNoteByID(ID) {
  let noteRes = gNotes.find(note => note.id === ID);
  return noteRes;
}

function removeNoteByID(noteID) {
  const idx = gNotes.findIndex(gNotes => gNotes.id === noteID);
  if (idx === -1) return Promise.reject("DID NOT REMOVE BOOK");
  gNotes.splice(idx, 1);
  storageService.store(NOTES_KEY, gNotes);
  return Promise.resolve(gNotes);
}





function query(filter = null) {
  return new Promise(resolve => {
    if (!gNotes.length) {
      gNotes = createNotes();
      storageService.store(NOTES_KEY, gNotes);
      resolve(gNotes);
    }

    if (!filter) {
      resolve(gNotes);
    } else {
      let notesToFilter = gNotes.slice();

      if (filter.label) {
        notesToFilter = notesToFilter.filter(note => {
          return note.info.label ? note.info.label.includes(filter.label) : false;
        });
      }

      if (filter.title) {
        notesToFilter = notesToFilter.filter(note => {
          return note.info.title ? note.info.title.includes(filter.title) : false;
        });
      }

      if (filter.innerText) {
        notesToFilter = notesToFilter.filter(filterNote => {
          return (
            (filterNote.type == "noteText" &&
              filterNote.info.txt.includes(filter.innerText))
            ||
            (filterNote.type == "noteTodo" &&
              filterNote.info.todos.find(todo => todo.txt.tolowercase().includes(filter.innerText.tolowercase())))
          );
        });
      }

      if (filter.type) {
        notesToFilter = notesToFilter.filter(note => {
          return note.type == filter.type;
        });
      }

      resolve(notesToFilter);
    }
  })
}





function createNotes() {
  var notes =  [
    {
      type: 'noteText',
      isPinned: true,
      info: {
        txt:' goal: 100 push ups\n\n15/2/2019: achieved 13 push ups',
        label: 'fitness',
        title: 'fitness goals'
      },
      id: 'qxhW2',
      style: {
        BGC: '#eaf09b'
      }
    },
    {
      type: 'noteImg',
      info: {
        url: 'data:image/jpeg;base64,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',
        title: 'lightnings in dimona',
        label: 'nature'
      },
      isPinned: false,
      style: {
        BGC: '#cb3707'
      },
      id: 'tZi0h'
    },
    {
      id: 'sDZDc',
      type: 'noteVideo',
      isPinned: false,
      info: {
        url:' https://www.youtube.com/watch?v=jzFr_Ja-S1w',
        label: 'trance music',
        title: 'ritmo new release'
      },
      style: {
        BGC: '#30e447'
      }
    },
    {
      id: 'mfZmN',
      type: 'noteText',
      isPinned: false,
      info: {
        txt:' e=mc2',
        label: 'school',
        title: 'science'
      },
      style: {
        BGC: '#e48f30'
      }
    },
    {
      id: 'nfXSi',
      type: 'noteImg',
      isPinned: false,
      info: {
        url: 'https://images1.calcalist.co.il/PicServer3/2018/04/15/810115/4_l.jpg',
        title: 'sweet home alabama',
        label: 'home design'
      },
      style: {
        BGC: 'rgba(255, 255, 255, 0.316)'
      }
    },
    {
      id: 'UbQha',
      type: 'noteText',
      isPinned: false,
      info: {
        txt: 'aba baba',
        title: 'hi there! im a title !',
        label: 'different things'
      },
      style: {
        BGC:' #3aa7c9'
      }
    },
    {
      id: 'qYAQS',
      type: 'noteText',
      isPinned: 'false',
      info: {
        txt: 'check out Bliss new album',
        label: 'trance'
      },
      style: {
        BGC: 'rgba(255, 255, 255, 0.316)'
      }
    },
    {
      id: 'HEZtd',
      type: 'noteText',
      isPinned: false,
      info: {
        txt: "hey there! i'm a new note"
      },
      style: {
        BGC: '#eaf09b'
      }
    },
    {
      id: 'wZRhR',
      type: 'noteVideo',
      isPinned: false,
      info: {
        url:' https://www.youtube.com/watch?v=R4LKjRJUGkk',
        title: 'latest ozora festival'
      },
      style: {
        BGC:' rgba(255, 255, 255, 0.316)'
      }
    },
    {
      id: 'I7qp8',
      type: 'noteText',
      isPinned: true,
      info: {
        txt:' try the new instagram ads plan',
        label: 'school',
        title: 'marketing final project'
      },
      style: {
        BGC: '#3aa7c9'
      }
    },
    {
      id: 'w45ll',
      type: 'noteTodos',
      isPinned: false,
      info: {
        todos: [
          {
            txt: 'watch ted lecture',
            doneAt: null,
            id: '4BJnn'
          },
          {
            txt:  'try mexican food',
            doneAt: true,
            id: 'yAUoM'
          },
          {
            txt:  'get promotion',
            doneAt: null,
            id: '5NW0F'
          },
          {
            txt: 'buy new tablet',
            id: 'IRUkP',
            doneAt: null
          }
        ],
        title: 'self enhancement'
      },
      style: {
        BGC:' rgba(255, 255, 255, 0.316'
      }
    },
    {
      id: '1AxMu',
      type: 'noteText',
      isPinned: false,
      info: {
        txt: 'about that thing from last week... check that again',
        label: 'personal'
      },
      style: {
        BGC: 'rgba(255, 255, 255, 0.316)'
      }
    }
  ]
  return notes;
}

function removeNoteByIDX(idx) {
  return new Promise(resolve => {
    gNotes.splice(idx, 1);
    storageService.store(NOTES_KEY, gNotes);
    resolve("msg deleted!");
  });
}
function isPinnedNotes() {
  return new Promise(resolve => {
    resolve(gNotes.some(note => note.isPinned));
  });
}

function removeTodoFromNote(noteId, todoId) {
  return new Promise(resolve => {
    let note = getNoteByID(noteId);
    let noteIDX = gNotes.indexOf(note);
    let todo = note.info.todos.find(todo => {
      return todo.id === todoId;
    });
    let todoIDX = note.info.todos.indexOf(todo);
    note.info.todos.splice(todoIDX, 1);
    storageService.store(NOTES_KEY, gNotes);

    resolve(gNotes);
  });
}

function checkTodo(noteId, todoId) {
  return new Promise(resolve => {
    let note = getNoteByID(noteId);
    let noteIDX = gNotes.indexOf(note);
    let todo = note.info.todos.find(todo => {
      return todo.id === todoId;
    });
    let todoIDX = note.info.todos.indexOf(todo);
    if (!note.info.todos[todoIDX].doneAt) {
      note.info.todos[todoIDX].doneAt = Date.now();
    } else {
      note.info.todos[todoIDX].doneAt = null;
    }
    gNotes.splice(noteIDX, 1, note);
    storageService.store(NOTES_KEY, gNotes);

    resolve(gNotes);
  });
}

function styleQuery(idx, prop) {
  return new Promise(resolve => {
    resolve("red");
    if (!gNotes[idx].style[prop]) {
      resolve(styleQueryDefault());
    }
    resolve(gNotes[idx].style);
  });
}

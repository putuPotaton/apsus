import { eventBus, EVENT_ADD_TODO, EVENT_DELETE_TODO, EVENT_CHECKED_TODO } from '../services/event-bus.service.js'

export default {

    template: `
<div >
<h3
v-if="isTitle">
{{info.title}}
</h3>
    <ul class="todo-ul">
        <li  class="todo-li" v-for="(todo, idx) in info.todos" >
            <input type="checkbox" class="done-checkbox" v-model="todo.doneAt"  @click.stop="todoChecked(todo.id)">
            <input @input="change"  v-model="todo.txt" class="todo-input" :class="{done: todo.doneAt}"> 
            <i class="fas fa-eraser remove-todo-btn" @click="deleteTodo(todo.id)"></i> 
        </li>
    </ul>

    <hr class="todos-hr">

    <div>
        <i  @click.stop="pushNewTodo" class="far fa-plus-square add-todo-btn"   ></i>
    <input placeholder="type your new todo" v-model="newTodo.txt" class="todo-input" > 
</div>

</div>
  `  ,
    props: ['initialInfo', 'idx', 'id'],
    data() {
        return {
            info: {},
            newTodo: { txt: '', id: '', doneAt: null }
        }
    },
    created() {
        this.info = this.initialInfo,
            this.list = this.info.todos
    },

    methods: {
        deleteTodo(todoID) {
            eventBus.$emit(EVENT_DELETE_TODO, { noteId: this.id, todoID })
        },
        todoChecked(todoID) {
            eventBus.$emit(EVENT_CHECKED_TODO, { noteId: this.id, todoID })
        },
        isDone(todoID) {
            let todo = this.list.find(todo => { return todo.id === todoID })
            return todo.isDone
        },
        change() {
            this.$emit('change', { id: this.id, info: this.info })
        },
        pushNewTodo() {
            eventBus.$emit(EVENT_ADD_TODO, { noteId: this.id, newTodo: this.newTodo })
            this.newTodo = { txt: '', id: '', doneAt: null }
        }
    }

    ,

    computed:{
        isTitle(){
            return this.info.title?  this.info.title: null
        }
    }


}

export default{
template:`
<div class="add-bar-container">
    <input type="text" @keyup.enter="createNote" :placeholder="getPlaceHolder" class="note-text-input-add-bar" v-model="noteInfo.info">
    <div class="note-type-opts-container" >
        <label class="add-bar-label">
            <input type="radio" v-model="noteInfo.noteType" class="add-bar-input-radio" name="noteType" value="noteTxt">
            <img class="add-bar-input-radio-img" src="img/addBarIMG/note.png">
        </label>
                <label class="add-bar-label">
                <input type="radio" v-model="noteInfo.noteType" class="add-bar-input-radio" name="noteType" value="noteImg">
                <img class="add-bar-input-radio-img" src="img/addBarIMG/picture.png">
</label>
                <label class="add-bar-label">
                    <input type="radio" v-model="noteInfo.noteType"  class="add-bar-input-radio" name="noteType" value="noteVideo">
                    <img class="add-bar-input-radio-img" src="img/addBarIMG/youtube.png">
</label>
                        <label class="add-bar-label">
                        <input type="radio" v-model="noteInfo.noteType" class="add-bar-input-radio" name="noteType" value="noteTodo">
                        <img class="add-bar-input-radio-img" src="img/addBarIMG/list.png">
</label>

</div>
    <button class="notes-add-btn notes-add-bar-btn" @click="createNote">
    <i class="far fa-plus-square note-add-icon" aria-hidden="true"></i>
    </button>
</div>
`
,
data(){
    return{
        noteInfo:{noteType:'noteTxt', info:''}
    }
},
methods:{
createNote(){
    this.$emit('createNote',{... this.noteInfo})
}
},
computed:{
    getPlaceHolder(){
switch (this.noteInfo.noteType){
    case 'noteTxt':
    {return 'take a note...'}
    case 'noteImg':
    {return 'pic URL goes here'}
    case 'noteTodo':
    {return 'type your todos seperated by comma'}
    case 'noteVideo':
    {return 'youtube link'}
}    }
}
}


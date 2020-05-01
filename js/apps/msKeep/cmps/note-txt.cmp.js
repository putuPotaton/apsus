
export default{
    props: ["initialInfo", "idx", "id"],
    template:`
    <div>
    <h3
    v-if="isTitle">
    {{info.title}}
    </h3>
    <textarea @input=" inputnotetext" v-model="info.txt" class="text-note-textarea">{{info.txt}}</textarea>
    </div>
`
,
data(){
    return{
        info:{
            text:''
        }
    }
    },
    methods:{
        changeBGC(inputBGC){
            this.BGC=inputBGC
            conhsole.log(BGC)
        },
        inputnotetext(){
            this.$emit('change', {id:this.id,info:this.info})
        }
    },

    created(){
        this.info= this.initialInfo
    }
    ,

    computed:{
        isTitle(){
            return this.info.title?  this.info.title: null
        }
    }
}

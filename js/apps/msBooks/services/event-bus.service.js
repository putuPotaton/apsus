export const EVENT_PUK = 'puk';
export const EVENT_SHOW_MSG = 'showMsg';

export const eventBus = new Vue()

eventBus.$on(EVENT_PUK, (num)=>{
    console.log('Got a Puk!', num);

    const msg = {
        txt: 'Got a Puk!',
        type: 'danger'
    }

    eventBus.$emit(EVENT_SHOW_MSG, msg)
})


import store from "../../store";
import { Maybe } from "jazzi";
import { propEq } from "ramda";

const SESSION = "SESSION";
const MAIN_WINDOW = "MAIN_WINDOW";
const LIMIT = 1e+16;

const local = {
    get(key){
        return Maybe.fromNullish(window.localStorage.getItem(key))
    },
    set(key,value){
        window.localStorage.setItem(key,value)
    },
    delete(key){
        window.localStorage.removeItem(key)
    }
}

const getSession = () => local.get(SESSION).map(Number).onNone(0);

const createSession = () => {
    let id = null
    let main = false;
    let registered = false
    let onMain = (st,skip) => {}
    return {
        register(_onMain,onSecondary){
            id = getSession() + 1;
            local.set(SESSION,id);
            onMain = _onMain
            if( local.get(MAIN_WINDOW).isNone() ){
                this.becomeMain(true)
            }
            
            window.addEventListener("storage",(e) => {
                Maybe.fromPredicate(propEq("key",MAIN_WINDOW),e)
                    .effect(() => {
                        main = false;
                        onSecondary(store);
                    })
            })

            window.addEventListener("unload", () => this.unregister())

            return this;
        },
        registerOnce(onOff){
            if( !registered ){
                this.register(onOff)
                registered = true;
            }
            return this
        },
        isMain(){
            return main
        },
        becomeMain(skipLoad){
            local.set(MAIN_WINDOW,id)
            main = true
            onMain(store,skipLoad)
            return this
        },
        unregister(){
            if(main){
                local.delete(MAIN_WINDOW);
            }
            if( getSession() >= LIMIT ){
                local.delete(SESSION)
            }
            return this
        },
        clean(){
            local.delete(SESSION)
            local.delete(MAIN_WINDOW)
            return this
        },
        debug(){
            console.group("Debug Session")
            console.log("Current",{ id , main })
            console.log(`Key(${SESSION})`,local.get(SESSION))
            console.log(`Key(${MAIN_WINDOW})`,local.get(MAIN_WINDOW))
            console.groupEnd();
            return this
        }
    }
}

let instance = null
const Session = () => {
    if( !instance ){
        instance = createSession()
    }
    return instance
}

export default Session
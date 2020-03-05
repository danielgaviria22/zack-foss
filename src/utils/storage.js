import { compose , isNil } from "ramda"

const SAVE_KEY = "__zack_foss__"

const toEncodedJSON = compose( window.btoa , JSON.stringify );
const fromEncodedJSON = compose( JSON.parse , window.atob );
const emptyBase64 = window.btoa("{}")

const local = {
    get(key){
        const data = window.localStorage.getItem(key)
        return isNil(data) ? emptyBase64 : data
    },
    set(key,value){
        window.localStorage.setItem(key,value)
    },
    delete(key){
        window.localStorage.removeItem(key)
    }
}

const Storage = {
    save(data){
        local.set(SAVE_KEY,toEncodedJSON(data));
    },
    load(){
        return fromEncodedJSON(local.get(SAVE_KEY));
    },
    delete(){
        local.delete(SAVE_KEY)
    }
}

export default Storage 
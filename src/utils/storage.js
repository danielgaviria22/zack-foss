import { compose , isNil } from "ramda"
import Result from "./result";

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
        try {
            return Result.Ok(fromEncodedJSON(local.get(SAVE_KEY)));
        } catch(e) {
            return Result.Error({
                raw: local.get(SAVE_KEY),
                name: e.name,
                message: e.message
            })
        }
    },
    delete(){
        local.delete(SAVE_KEY)
    },
    inject(raw){
        try {
            const data = fromEncodedJSON(raw);
            this.save(data)
            return Result.Ok(data);
        } catch(e) {
            return Result.Error({
                data: raw,
                name: e.name,
                message: e.message,
            });
        }
    }
}

export default Storage 
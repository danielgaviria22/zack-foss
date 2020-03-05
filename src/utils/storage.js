import { compose } from "ramda"

const SAVE_KEY = "__zack_foss__"

const toEncodedJSON = compose( window.btoa , JSON.stringify );
const fromEncodedJSON = compose( JSON.parse , window.atob );

const Storage = {
    save(data){
        window.localStorage.setItem(SAVE_KEY,toEncodedJSON(data));
    },
    load(){
        return fromEncodedJSON(window.localStorage.getItem(SAVE_KEY));
    },
    delete(){
        window.localStorage.removeItem(SAVE_KEY)
    }
}

export default Storage 
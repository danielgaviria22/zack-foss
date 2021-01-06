export const createLocal = (config) => {
    return {
        get(key){
            return config.map(window.localStorage.getItem(key))
        },
        set(key,value){
            window.localStorage.setItem(key,value)
        },
        delete(key){
            window.localStorage.removeItem(key)
        }
    }
}
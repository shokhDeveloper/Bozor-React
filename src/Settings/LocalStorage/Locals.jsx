export const setItem = (key, value) => window.localStorage.setItem(key, typeof value !== "object" ? value: JSON.stringify(value))
export const getItem = (key, value) => window.localStorage.getItem(key)
export const getObject = (key) => {
   return(
       typeof JSON.parse(getItem(key)) !== "object"? false : JSON.parse(getItem(key))
   ) 
}
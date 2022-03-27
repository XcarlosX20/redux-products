import React,{useState, useEffect, useRef} from 'react'
const useObserver = (options) => {
    const [elements, setElements] = useState([])
    const [entries, setentries] = useState([])
    const observer = useRef(new IntersectionObserver(function (entries) {
        setElements(entries);
    },options))
    useEffect(() => {
        const currentObserver = observer.current
        elements.forEach(element => {
            currentObserver.observe(element)
        })
        currentObserver.disconnect()
        return function cleanUp(){
        if(currentObserver){
            currentObserver.disconnect()
        }
        }
    },[elements])
    return [observer.current, setElements, entries];
}
 
export default useObserver;
import React, { useState, useEffect } from "react"

/**
 * A custom hook to return the json results of a fetch
 * 
 * Example: const { response, loading, error } = useFetch(
 *              "https://jsonplaceholder.typicode.com/todos/1")
 *  
 * @param {*} url Defines the resource that you wish to fetch. Can be any object with a stringifier, or a Request object
 * @param {*} options An object containing any custom settings that you want to apply to the request
 * @param {*} dependencies An array of objects that wich will cause this hook to update when changed
 * @returns the response, error state, and loading state
 */
const useFetch = (url, options = {}, dependencies = []) => {

    const [response, setResponse] = useState(null)
    const [error, setError] = useState(null)
    const [loading, setLoading] = useState(false)
    
    useEffect(() => {
        const abortController = new AbortController()
        const signal = abortController.signal
        
        const doFetch = async () => {

            setLoading(true)
            const res = await fetch(url, options);

            /** 
             * These ifs are sperated to allow for periods of time to pass
             * An any point the component could demount, this will catch that
             * */
            if (!res.ok && !signal.aborted) {
                setError(response.status)
            }

            if (!signal.aborted) {
                const json = await res.json();
                setResponse(json);
            }

            if (!signal.aborted) {
            setLoading(false)
            }        
        }

        doFetch()

        /** When demounting, abort the fetch request */
        return () => {
            abortController.abort()
        }
    }, dependencies)

    return { response, error, loading }
  }
  
  export default useFetch;
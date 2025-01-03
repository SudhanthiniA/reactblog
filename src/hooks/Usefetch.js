import { useState, useEffect } from "react"
// "https://jsonplaceholder.typicode.com/posts/"
export const Usefetch = (url, method = "GET") => {
    const [data, setData] = useState([])
    const [error, setError] = useState(null)
    const [isPending, setPending] = useState(false)
    const [options, setOptions] = useState(null)

    const optionData = (formData) => {
        if (method === "POST") {
            setOptions({
                method: 'POST',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
        }
        else if(method === "PATCH") {
            setOptions({
                method: 'PATCH',
                body: JSON.stringify(formData),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            });
        }
        else if(method === "DELETE") {
            setOptions({
                method: 'DELETE',
              
            });
        }
    };

    useEffect(() => {
        const fetchPost = async () => {
            setPending(true)
            const response = await fetch(url, options || { method })
            const jsonResponse = await response.json()
            if (response.ok) {
                setData(jsonResponse)
                // console.log("JSON Data",jsonResponse)
                setError(null)
                setPending(false)
            }
            if (!response.ok) {
                setError(jsonResponse.error)
                setPending(false)
                // console.log("JSON Error Data",error)
            }
        }
        if(method === "GET") {
            fetchPost();    
        } 
        else if((method === "POST" || method === "PATCH" || method === "DELETE")  && options)  {
            fetchPost();
        }
        

    }, [url, method,options]);
    return { data, error, isPending, optionData }
};
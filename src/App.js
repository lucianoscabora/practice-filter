import SearchInput from "./components/SearchInput";
import React, { useEffect, useState } from "react";

const api = 'https://kitsu.io/api/edge/';

export default function App () {

    // o retorno da APi deve ser guardada dentro de um state
    const [info, setInfo] = useState({});
    const [text, setText] = useState('');
    
    useEffect(() => {
        if (text) {
            setInfo({});
            fetch(`${api}anime?filter[text]=${text}&page[limit]=12`)
            .then((response) => response.json())
            .then((response) => {
                setInfo(response);
                
            })
        }
    }, [text]);

    return (
        <div>
            <SearchInput value={text} onChange={(search) => setText(search)} />
            {text && !info.data && (
                        <span>Carregando...</span>
                    )}
            {info.data && (
                // fazer um map para converter no JSX e apresentar na tela
                <ul className="animes-list">
                    {info.data.map((item) => (
                        <li key={item.id}>
                            <img src={item.attributes.posterImage.small} alt="each anime images" />
                            {item.attributes.canonicalTitle}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
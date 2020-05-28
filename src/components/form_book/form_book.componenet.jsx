import React from 'react';
import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { animateScroll as scroll } from 'react-scroll';

const FormBook = () => {

    const [idValue, setIdValue] = useState("");
    const [isbnValue, setIsbnValue] = useState("");
    const [titleValue, setTitleValue] = useState("");
    const [subtitleValue, setSubtitleValue] = useState("");
    const [authorValue, setAuthorValue] = useState("");
    const [yearValue, setYearValue] = useState("");
    const [editorialValue, setEditorialValue] = useState("");
    const [numCopiesValue, setNumCopiesValue] = useState("");
    const [idBookArea, setIdBookArea] = useState("");

    const [indiceSelect, setIndiceSelect] = useState(-1);


    const [message, setMessage] = useState();

    const [booksAreaData, setBookAreaData] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        postReaderType();
    }

    const handleIsbnChange = (e) => {
        setIsbnValue(e.target.value);
    }
    const handleTitleChange = (e) => {
        setTitleValue(e.target.value);
    }
    const handleSubtitleChange = (e) => {
        setSubtitleValue(e.target.value);
    }
    const handleAuthorChange = (e) => {
        setAuthorValue(e.target.value);
    }
    const handleYearChange = (e) => {
        setYearValue(e.target.value);
    }
    const handleEditorialChange = (e) => {
        setEditorialValue(e.target.value);
    }
    const handleNumCopiesChange = (e) => {
        setNumCopiesValue(e.target.value);
    }
    const handleIndiceSelectChange = (e) => {
        setIndiceSelect(e.target.value);
        getIdArea();
    }

    const getBooksArea = async () => {
        const response = await fetch('http://localhost:3003/api/areas');
        const responseJSON = await response.json();
        setBookAreaData(responseJSON.areas);
    }

    const onClickUp = () => {
        scroll.scrollToTop();
    }

    const postReaderType = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                cod_isbn: isbnValue,
                titulo: titleValue,
                subtitulo: subtitleValue,
                autor: authorValue,
                anio_publicacion: yearValue,
                editorial: editorialValue,
                numEjemplares: numCopiesValue,
                ejemplaresDisponibles: numCopiesValue,
                idAreaLibro: idBookArea
            })
        };
        const response = await fetch('http://localhost:3003/api/libros', requestOptions);
        const responseJSON = await response.json();
        console.log({ responseJSON });
        setMessage(responseJSON);
        setIdValue(responseJSON.libroAlmacenar._id);
        onClickUp();


    }

    const getIdArea = () => {
        let indice = parseInt(indiceSelect, 10);
        console.log("Indice: " + indice)
        for (let i = 0; i < booksAreaData.length; i++) {
            if (indice >= 0) {
                if (i === indice) {
                    setIdBookArea(booksAreaData[i]._id);
                }
            }
        }
    }

    useEffect(() => {
        getBooksArea();
    }, [])

    useEffect(() => {
        getIdArea();
    }, [indiceSelect])

    return (
        <>
            {
                message
                    ?
                    <Alert onClose={() => { setMessage("") }}>Saved successfully: _Id: {idValue}</Alert>
                    :
                    <></>
            }
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>ISBN</label>
                    <input type="text" value={isbnValue} className="form-control" onChange={handleIsbnChange} placeholder="Enter isbn code" ></input>
                </div>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" value={titleValue} className="form-control" onChange={handleTitleChange} placeholder="Enter title" ></input>
                </div>
                <div className="form-group">
                    <label>Subtitle</label>
                    <input type="text" value={subtitleValue} className="form-control" onChange={handleSubtitleChange} placeholder="Enter subtitle" ></input>
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" value={authorValue} className="form-control" onChange={handleAuthorChange} placeholder="Enter author" ></input>
                </div>
                <div className="form-group">
                    <label>Year</label>
                    <input type="text" value={yearValue} className="form-control" onChange={handleYearChange} placeholder="Enter year of publication" ></input>
                </div>
                <div className="form-group">
                    <label>Editorial</label>
                    <input type="text" value={editorialValue} className="form-control" onChange={handleEditorialChange} placeholder="Enter editorial" ></input>
                </div>
                <div className="form-group">
                    <label>Copies</label>
                    <input type="text" value={numCopiesValue} className="form-control" onChange={handleNumCopiesChange} placeholder="Number of copies" ></input>
                </div>
                <div className="form-group">
                    <label>Book Area</label>
                    <select className="custom-select custom-select-lg" onClick={handleIndiceSelectChange}>
                        <option value={-1}>Open this select menu</option>
                        {booksAreaData.map((row, i) => (
                            <option key={row._id}
                                value={i}
                            >{row.descripcion}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-secondary btn-lg">Save</button>
                </div>
            </form>

        </>
    );

}

export default FormBook;
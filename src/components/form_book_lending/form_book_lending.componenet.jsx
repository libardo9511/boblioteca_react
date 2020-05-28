import React from 'react';
import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';
import { animateScroll as scroll } from 'react-scroll';

const FormBookLending = () => {

    const updateDates = () => {
        let strFecha = new Date().toISOString().substring(0,10);
        let dateExpected = new Date();
        dateExpected.setDate(dateExpected.getDate() + 7);
        let strExpecDate = dateExpected.toISOString().substring(0,10);
        setDateCompleteValue(strFecha);
        setDateExpectedValue(strExpecDate);
    }

    const [idValue, setIdValue] = useState("");
    const [isbnValue, setIsbnValue] = useState("");
    const [identificationValue, setIdentificationValue] = useState("");
    const [dateCompleteValue, setDateCompleteValue] = useState("");
    const [dateExpectedValue, setDateExpectedValue] = useState("");

    const [showAlertIsbn, setShowAlertIsbn] = useState(false);
    const [showAlertIdReader, setShowAlertIdReader] = useState(false);

    const [message, setMessage] = useState();

    const [idBookValue, setIdBookValue] = useState("");
    const [idReaderValue, setIdReaderValue] = useState("");

    const searchIsbnBook = async () => {
        const response = await fetch(`http://localhost:3003/api/libros/isbn/${isbnValue}`);
        const responseJSON = await response.json();
        if (Object.keys(responseJSON.libro).length >= 1) {
            setIdBookValue(responseJSON.libro[0]._id);
        } else {
            setIdBookValue("");
        }
    }

    const searchIdReader = async () => {
        const response = await fetch(`http://localhost:3003/api/lectores/identificacion/${identificationValue}`);
        const responseJSON = await response.json();
        console.log(responseJSON);
        if (Object.keys(responseJSON.lector).length >= 1) {
            setIdReaderValue(responseJSON.lector[0]._id)
        } else {
            setIdReaderValue("");
        }
    }

    const onSubmit = (e) => {
        e.preventDefault();
        postBookLend();
    }

    const handleIsbnChange = (e) => {
        setIsbnValue(e.target.value);
    }
    const handleIdentificationChange = (e) => {
        setIdentificationValue(e.target.value);
    }

    const onClickUp = () => {
        scroll.scrollToTop();
    }

    const postBookLend = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idLibro: idBookValue,
                idLector: idReaderValue,
                fechaPrestamo: new Date(dateCompleteValue),
                fecha_dev_esperada: new Date(dateExpectedValue),
                fecha_dev: null,                
                multa: 0,
                esPrestado: true
            })
        };
        const response = await fetch('http://localhost:3003/api/prestamos', requestOptions);
        const responseJSON = await response.json();
        console.log({ responseJSON });
        setMessage(responseJSON);
        setIdValue(responseJSON.prestamoAlmacenar._id);
        setIsbnValue("");
        setIdentificationValue("");
        onClickUp();
    }


    useEffect(() => {
        updateDates();
    }, [])

    useEffect(() => {
        if (isbnValue !== "") {
            setShowAlertIsbn(true);
            searchIsbnBook();
        } else {
            setShowAlertIsbn(false);
        }
    }, [isbnValue])

    useEffect(() => {
        if (identificationValue !== "") {
            setShowAlertIdReader(true);
            searchIdReader();
        } else {
            setShowAlertIdReader(false);
        }
    }, [identificationValue])

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
                {
                    showAlertIsbn
                        ? idBookValue !== ""
                            ? <Alert severity="success">Isbn found</Alert>
                            : <Alert severity="error">Isbn not found</Alert>
                        : <></>

                }
                <div className="form-group">
                    <label>Reader</label>
                    <input type="text" value={identificationValue} className="form-control" onChange={handleIdentificationChange} placeholder="Enter title" ></input>
                </div>
                {
                    showAlertIdReader
                        ? idReaderValue !== ""
                            ? <Alert severity="success">Reader found</Alert>
                            : <Alert severity="error">Reader not found</Alert>
                        : <></>

                }
                <div className="form-group">
                    <label>Date of Loan</label>
                    <input type="text" value={dateCompleteValue} className="form-control" readOnly ></input>
                </div>
                <div className="form-group">
                    <label>Expected return date</label>
                    <input type="text" value={dateExpectedValue} className="form-control" readOnly ></input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-secondary btn-lg">Save</button>
                </div>
            </form>

        </>
    );

}

export default FormBookLending;
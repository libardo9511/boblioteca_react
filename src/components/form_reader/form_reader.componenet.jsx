import React from 'react';
import { useState, useEffect } from 'react';
import Alert from '@material-ui/lab/Alert';

const FormReader = () => {

    const [idValue, setIdValue] = useState("");    
    const [nameValue, setNameValue] = useState("");
    const [surnameValue, setSurnameValue] = useState("");
    const [identificationValue, setIdentificationValue] = useState("");
    const [phoneValue, setPhoneValue] = useState("");
    const [emailValue, setEmailValue] = useState("");
    const [adressValue, setAdressValue] = useState("");
    const [idReaderTypeValue, setIdReaderTypeValue] = useState("");

    const [indiceSelect, setIndiceSelect] = useState(-1);


    const [message, setMessage] = useState();

    const [readersTypeData, setReadersTypeData] = useState([]);

    const onSubmit = (e) => {
        e.preventDefault();
        postReader();
    }

    const handleNameChange = (e) => {
        setNameValue(e.target.value);
    }
    const handleSurnameChange = (e) => {
        setSurnameValue(e.target.value);
    }
    const handleIdentificationChange = (e) => {
        setIdentificationValue(e.target.value);
    }
    const handlePhoneChange = (e) => {
        setPhoneValue(e.target.value);
    }
    const handleEmailChange = (e) => {
        setEmailValue(e.target.value);
    }
    const handleAdressChange = (e) => {
        setAdressValue(e.target.value);
    }
    const handleIndiceSelectChange = (e) => {
        setIndiceSelect(e.target.value);
    }

    const getReadersType = async () => {
        const response = await fetch('http://localhost:3003/api/tiposlector');
        const responseJSON = await response.json();
        setReadersTypeData(responseJSON.tipos);
    }

    const postReader = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: nameValue,
                apellido: surnameValue,
                identificacion: identificationValue,
                telefono: phoneValue,
                email: emailValue,
                direccion: adressValue,
                idTipoLector: idReaderTypeValue,
                estadoLector: true
            })
        };
        const response = await fetch('http://localhost:3003/api/lectores', requestOptions);
        const responseJSON = await response.json();
        console.log({ responseJSON });
        setMessage(responseJSON);
        setIdValue(responseJSON.lectorAlmacenar._id);
        
        
    }

    const getIdReaderType = () => {
        let indice = parseInt(indiceSelect, 10);
        console.log("Indice: " + indice)
        for (let i = 0; i < readersTypeData.length; i++) {
            if (indice >= 0) {
                if (i === indice) {
                    setIdReaderTypeValue(readersTypeData[i]._id);
                }
            }
        }
    }

    useEffect(() => {
        getReadersType();
    }, [])

    useEffect(() => {
        getIdReaderType();
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
                    <label>Name</label>
                    <input type="text" value={nameValue} className="form-control" onChange={handleNameChange} ></input>
                </div>
                <div className="form-group">
                    <label>Surname</label>
                    <input type="text" value={surnameValue} className="form-control" onChange={handleSurnameChange} ></input>
                </div>
                <div className="form-group">
                    <label>Identification card number</label>
                    <input type="text" value={identificationValue} className="form-control" onChange={handleIdentificationChange} ></input>
                </div>
                <div className="form-group">
                    <label>Phone number</label>
                    <input type="text" value={phoneValue} className="form-control" onChange={handlePhoneChange} ></input>
                </div>
                <div className="form-group">
                    <label>Email</label>
                    <input type="text" value={emailValue} className="form-control" onChange={handleEmailChange} ></input>
                </div>
                <div className="form-group">
                    <label>Adress</label>
                    <input type="text" value={adressValue} className="form-control" onChange={handleAdressChange} ></input>
                </div>
                <div className="form-group">
                    <label>Reader type</label>
                    <select className="custom-select custom-select-lg" onClick={handleIndiceSelectChange}>
                        <option value={-1}>Open this select menu</option>
                        {readersTypeData.map((row, i) => (
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

export default FormReader;
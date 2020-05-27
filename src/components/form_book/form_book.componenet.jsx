import React from 'react';
import { useState } from 'react';
import Alert from '@material-ui/lab/Alert';

const FormBook = () => {

    const [idValue, setIdValue] = useState("");
    const [descriptionValue, setDescriptionValue] = useState("");
    const [message, setMessage] = useState();

    const onSubmit = (e) => {
        e.preventDefault();
        postReaderType();
    }

    const handleDescriptionChange = (e) => {
        setDescriptionValue(e.target.value);
    }

    const postReaderType = async () => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion: descriptionValue })
        };
        const response = await fetch('http://localhost:3003/api/tiposlector', requestOptions);
        const responseJSON = await response.json();
        console.log({ responseJSON });
        setMessage(responseJSON.message);
        setIdValue(responseJSON.tipoLectorAlmacenar._id);
        setDescriptionValue("");
    }



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
                    <label htmlFor="__description">Description</label>
                    <input type="text" value={descriptionValue} className="form-control" onChange={handleDescriptionChange} placeholder="Enter a description" ></input>
                </div>
                <div className="form-group">
                    <button type="submit" className="btn btn-secondary btn-lg">Save</button>
                </div>
            </form>

        </>
    );

}

export default FormBook;
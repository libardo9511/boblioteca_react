import React from 'react';
import { useState, useEffect } from 'react';

const EditModal = (props) => {

    const [readerTypeId, setReaderTypeId] = useState([]);
    const [description, setDescription] = useState([]);
    const { history } = props;
    const getReaderTypeData = async () => {
        const response = await fetch(`http://localhost:3003/api/tiposlector/${props.idTypeReader}`);
        const responseJSON = await response.json();
        setReaderTypeId(responseJSON.tipo._id);
        setDescription(responseJSON.tipo.descripcion);
    }

    useEffect(() => {
        getReaderTypeData();
    }, []);

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    }

    const onSubmit = (e) => {
        e.preventDefault();
        putReaderType();
    }

    const putReaderType = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ descripcion: description })
        };
        const response = await fetch(`http://localhost:3003/api/tiposlector/${readerTypeId}`, requestOptions);
        const responseJSON = await response.json();
        alert("Update successfully: _Id: " + responseJSON.tipoLectorAnterior._id);
        history.push('/readerstype');
    }

    return (
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title">Edit Reader type</h5>
                </div>
                <div className="modal-body">
                    <form onSubmit={onSubmit}>
                        <div className="form-group">
                            <label>Id</label>
                            <input value={readerTypeId} type="text" className="form-control" readOnly></input>
                        </div>
                        <div className="form-group">
                            <label>Description</label>
                            <input value={description} type="text" className="form-control" onChange={handleDescriptionChange}></input>
                        </div>
                        <div className="form-group row">
                            <div className="col-sm-10">
                                <button type="button" className="btn btn-secondary float-right ml-4" data-dismiss="modal" onClick={(e) => {
                                    e.preventDefault();
                                    history.push('/readerstype');
                                }}>Close</button>
                                <button type="submit" className="btn btn-primary float-right">Save changes</button>
                            </div>
                        </div>
                    </form>
                </div>

            </div>
        </div >
    );

}

export default EditModal;
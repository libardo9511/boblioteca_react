import React, { useState, useEffect } from 'react';
import './edit.style.css';
import moment from "moment";

const ModalReaderType = (props) => {

    const { onEnabledModal } = props;
    const { edit } = props;

    const [idLoan, setIdLoan] = useState("");
    const [idBookLoan, setIdBookLoan] = useState("");
    const [idReaderLoan, setIdReaderLoan] = useState("");
    const [dateCompleteLoan, setDateCompleteLoan] = useState("");
    const [dateExpectedLoan, setDateExpectedLoan] = useState("");
    const [dateReturnLoan, setDateReturnLoan] = useState("");
    const [fineLoan, setFineLoan] = useState("");

    const updateData = () => {
        let fineLoan = 1000;
        if (!edit.esPrestado) {
            setDateReturnLoan(edit.fecha_dev);
            setFineLoan(edit.multa);
        } else {
            let returnDate = new Date().toISOString().substring(0, 10);
            setDateReturnLoan(returnDate);
            let date1 = moment(edit.fecha_dev_esperada);
            let date2 = moment(returnDate);
            let diff = date2.diff(date1, 'days');
            if (diff >= 0) {
                setFineLoan(fineLoan * diff);
            }
            setFineLoan(edit.multa);
        }

    }

    useEffect(() => {
        setIdLoan(edit._id);
        setIdBookLoan(edit.idLibro.cod_isbn);
        setIdReaderLoan(edit.idLector.identificacion);
        setDateCompleteLoan(edit.fechaPrestamo);
        setDateExpectedLoan(edit.fecha_dev_esperada);
        updateData();
        console.log(edit);
    }, []);

    const putLoan = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                idLibro: edit.idLibro._id,
                idLector: edit.idLector_id,
                fechaPrestamo: new Date(dateCompleteLoan),
                fecha_dev_esperada: new Date(dateExpectedLoan),
                fecha_dev: new Date(dateReturnLoan),
                multa: fineLoan,
                esPrestado: false
            })
        };
        const response = await fetch(`http://localhost:3003/api/prestamos/${idLoan}`, requestOptions);
        const responseJSON = await response.json();
        alert("Update successfully: _Id: " + responseJSON.prestamoAnterior._id);
        onEnabledModal(false);
    }

    const saveChanges = (e) => {
        e.preventDefault();
        putLoan();
    }

    return (
        <div className="modalCss" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Return the book</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={() => {
                            onEnabledModal(false);
                        }}>
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        <form>
                            <div className="form-group row">
                                <label htmlFor="id__loan" className="col-sm-2 col-form-label">Id Loan</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="id__loan" value={idLoan} readOnly></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="isbn__book" className="col-sm-2 col-form-label">ISBN Code</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="isbn__book" value={idBookLoan} readOnly></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="id__reader" className="col-sm-2 col-form-label">Reader Id</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="id__reader" value={idReaderLoan} readOnly></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="datecompl__loan" className="col-sm-2 col-form-label">Date of loan</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="datecompl__loan" value={dateCompleteLoan} readOnly></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="dateExpec__loan" className="col-sm-2 col-form-label">Expected date</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="dateExpec__loan" value={dateExpectedLoan} readOnly></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="dateReturn__loan" className="col-sm-2 col-form-label">Return date</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="dateReturn__loan" value={dateReturnLoan} readOnly></input>
                                </div>
                            </div>
                            <div className="form-group row">
                                <label htmlFor="penalty__load" className="col-sm-2 col-form-label">Fine</label>
                                <div className="col-sm-10">
                                    <input type="text" className="form-control" id="penalty__load" value={fineLoan} readOnly></input>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        {
                            edit.esPrestado
                                ? <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={(e) => {
                                    saveChanges(e);
                                }}>Save changes</button>
                                : <button type="button" className="btn btn-success" onClick={() => {
                                    onEnabledModal(false);
                                }}>Accept</button>
                        }
                        <button type="button" className="btn btn-danger" onClick={() => {
                            onEnabledModal(false);
                        }}>Cancel</button>


                    </div>
                </div>
            </div>
        </div>

    );
}

export default ModalReaderType;

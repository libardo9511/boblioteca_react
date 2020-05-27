import React from 'react';
import { useEffect, useState } from 'react';

const ModalEditBook = (props) => {

    const [bookData, setBookData] = useState([]);

    const getBook = async () => {
        const response = await fetch('http://localhost:3003/api/libros');
        const responseJSON = await response.json();
        setBookData(responseJSON.libros);
    }

    useEffect(() => {
        getBook();
    }, []);

    return (
        <div className="modal displaybn">
            <div className="modal-dialog modal-dialog-centered">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        ...
                        </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                        <button type="button" className="btn btn-primary">Save changes</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default ModalEditBook;
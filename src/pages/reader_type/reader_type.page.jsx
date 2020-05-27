import React from 'react';
import TableReadersType from "../../components/table_readers_type/table_readers_type.component";
import FormReaderType from "../../components/form_book/form_book.componenet";

const TypeReadersItemsPage = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Create new Reader Type </h3>
                    <br></br>
                    <FormReaderType></FormReaderType>
                </div>
            </div>
            <TableReadersType></TableReadersType>
        </div>
    );
}

export default TypeReadersItemsPage;
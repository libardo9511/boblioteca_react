import React from 'react';
import TableBooksLending from "../../components/table_book_lending/table_book_lending.component";
import FormBookLending from '../../components/form_book_lending/form_book_lending.componenet';

const BooksLendingPage = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Create new Loan</h3>
                    <FormBookLending></FormBookLending>
                </div>
            </div>
            <TableBooksLending></TableBooksLending>
        </div>
    );
}

export default BooksLendingPage;
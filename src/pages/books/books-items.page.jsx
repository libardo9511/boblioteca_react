import React from 'react';
import TableeBooks from "../../components/table_books/table_books.component";
import FormBook from '../../components/form_book/form_book.componenet';

const BooksItemsPage = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Create new book</h3>
                    <FormBook></FormBook>
                </div>
            </div>
            <TableeBooks></TableeBooks>

        </div>
    );
}

export default BooksItemsPage;
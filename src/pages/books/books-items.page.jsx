import React from 'react';
import TableeBooks from "../../components/table_books/table_books.component";

const BooksItemsPage = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Create new book</h3>
                    <form>
                        <div className="form-group">
                        
                        </div>
                    </form>
                </div>
            </div>
            <TableeBooks></TableeBooks>
        </div>
    );
}

export default BooksItemsPage;
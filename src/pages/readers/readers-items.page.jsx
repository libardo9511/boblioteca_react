import React from 'react';
import './readers-items.style.css';
import TableReaders from "../../components/table_readers/table_readers.component";

const readersItemsPage = () => {
    return (
        <div className="row">
            <div className="col-md-4">
                <div className="card card-body">
                    <h3>Create new Reader</h3>
                    <form>
                        <div className="form-group">
                        </div>
                    </form>
                </div>
            </div>
            <TableReaders></TableReaders>
        </div>
    );
}

export default readersItemsPage;
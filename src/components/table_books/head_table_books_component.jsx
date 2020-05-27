import React from 'react';

const HeadTableBooks = () => {
    return (
        <thead>
            <tr>
                <th className="th-sm" scope="col">ISBN</th>
                <th className="th-sm" scope="col">Title</th>
                <th className="th-sm" scope="col">Author</th>
                <th className="th-sm" scope="col">Num Exemplaries</th>
            </tr>
        </thead>
    );
}

export default HeadTableBooks;
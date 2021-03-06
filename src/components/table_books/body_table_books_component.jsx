import React from 'react';
import { Link } from 'react-router-dom';

const TableBooks = (props) => {
    return (
        <tbody>
            {props.books.map((row) => (
                <tr key={row._id}>
                    <th>{row.cod_isbn}</th>
                    <th>{row.titulo}</th>
                    <th>{row.autor}</th>
                    <th>{row.numEjemplares}</th>
                </tr>
            ))}
        </tbody>
    );
}

export default TableBooks;
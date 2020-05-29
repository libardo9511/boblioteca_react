import React from 'react';

const BodyTableBookLending = (props) => {

    const { onEnabledModal } = props;
    const { onEnabledModalData } = props;
    
    return (
        <tbody>
            {props.booksLending.map((row) => (
                <tr key={row._id} onClick={() => {
                    onEnabledModalData(row);
                    onEnabledModal(true);
                }}>
                    <th>{row.idLibro.cod_isbn}</th>
                    <th>{row.idLector.identificacion}</th>
                    <th>{row.fechaPrestamo}</th>
                    <th>{row.fecha_dev_esperada}</th>
                    <th>{row.fecha_dev}</th>
                    <th>{row.multa}</th>
                </tr>
            ))}
        </tbody>

    );
}

export default BodyTableBookLending;
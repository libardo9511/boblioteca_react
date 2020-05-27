import React from 'react';

const BodyTableReaders = (props) => {
    return (
        <tbody>
            {props.readers.map((row) => (
                <tr key={row._id}>
                    <th>{row.nombre}</th>
                    <th>{row.apellido}</th>
                    <th>{row.identificacion}</th>
                    <th>{row.email}</th>
                    <th>{row.idTipoLector.descripcion}</th>
                </tr>
            ))}
        </tbody>
    );
}

export default BodyTableReaders;
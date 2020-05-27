import React from 'react';
import EditReaderType from "../../components/edit_reader_type/edit_reader_type.componenet"

const TypeReadersEditPage = (props) => {
    const {match} = props;
    return (
        <EditReaderType idTypeReader={match.params.id} history={props.history}></EditReaderType>
    );
}

export default TypeReadersEditPage;
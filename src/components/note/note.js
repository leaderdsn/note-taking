import React from 'react';
import { Card, Accordion } from 'react-bootstrap';
import NoteTime from '../note-time';
import './note.css'

/** Заметка */
export default function Note(props){

    const { id, title, body, date, color, removeNote } = props

    function handleRemoveNote(id){
        removeNote(id);
    };

    return (
        <>
            <Accordion defaultActiveKey="0" >
                <Card className='note mx-3 my-3' >
                    <Card.Body className='p-0 m-0' >
                        <Accordion.Toggle as={Card.Header} className="note-title px-2" eventKey="0" 
                        style={{backgroundColor: `${color}`}} 
                        >
                        { title }
                            <span className="btn-close" 
                                onClick={() => handleRemoveNote(id)}>
                                &times;
                            </span>
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                        <Card.Body className="note-body pt-1 px-2" 
                            style={{backgroundColor: `${color}`}}
                        >{ body }
                        </Card.Body>
                        </Accordion.Collapse>
                    </Card.Body>
                    <NoteTime className='note-time' dateTime={date} />
                </Card>
            </Accordion>
        </>
    );
}
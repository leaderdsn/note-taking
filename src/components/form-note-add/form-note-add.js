import React, { useState, useEffect } from 'react';
import './form-note-add.css';
import Circle from 'react-color/lib/components/circle/Circle';
import { Button, Form, InputGroup, Alert} from 'react-bootstrap';

/** Форма добавления записей */
export default function FormNoteAdd(props) {
    const [isEmpty, setEmpty] = useState(true);
    const [newNoteTitle, setNewNoteTitle] = useState('');
    const [newNoteBody, setNewNoteBody] = useState('');
    const [newNoteColor, setNewNoteColor] = useState('#fd5');
    const [noteTitleDirty, setNoteTitleDirty] = useState(false);
    const [noteBodyDirty, setNoteBodyDirty] = useState(false);
    const [noteTitleError, setNoteTitleError] = useState('The note title cannot be empty');
    const [noteBodyError, setNoteBodyError] = useState('Note content cannot be empty');
    const [isValid, setIsValid] = useState(false);

    const handleSearchInput = (e) => {
        const { onChange } = props
        onChange(e.target.value);
    };

    function handleUserInput(e) {
        setNewNoteTitle(e.target.value);
        if(!String(e.target.value).toLowerCase()){
            setNoteTitleError('The note title cannot be empty');
        } else {
            setNoteTitleError('');
            setEmpty(false);
        }
    };

    function handleUserTextArea(e) {
        setNewNoteBody(e.target.value);
        if(!String(e.target.value).toLowerCase()){
            setNoteBodyError('Note content cannot be empty');
        } else {
            setNoteBodyError('');
            setEmpty(false);
        } 
    };

    function handleChangeComplete(color) {
        setNewNoteColor(color.hex);
    };

    function blurHandler(e){
        switch (e.target.name){
            case 'noteTitle':
                setNoteTitleDirty(true);
                break;
            case 'noteBody':
                setNoteBodyDirty(true);
                break;
            default:
                setNoteTitleDirty(false);
        };
    };


    function writeNote() {
        const { addNote } = props
        addNote(newNoteTitle, newNoteBody, Date.now(), newNoteColor)
            .then(() => {
                setNewNoteTitle('');
                setNewNoteBody('');
                setNewNoteColor('#fd5');
                setIsValid(false);
                setEmpty(true);
                setNoteTitleError('The note title cannot be empty');
                setNoteBodyError('Note content cannot be empty');
            });
    };

    useEffect(() => {
        if((noteTitleError || noteBodyError || isEmpty)){
            setIsValid(false);
        } else {
            setIsValid(true);
        }
    },[noteTitleError, noteBodyError, isEmpty]);

    return (
        <>  <div>
            <Form 
                noValidate
                validated={!isValid}
                >
                {(noteTitleDirty && noteTitleError) && <Alert variant="danger" className='text-center p-0'>{noteTitleError}</Alert>}
                <InputGroup className='mb-3'>
                    <Form.Control 
                        type="input"
                        className="note-title"
                        onBlur={e=>blurHandler(e)}
                        name='noteTitle'
                        maxLength={16}
                        placeholder="Write a new title..."
                        value={newNoteTitle}
                        onChange={handleUserInput}
                        required
                    />
                    <InputGroup.Prepend>
                        <Button className="btn-note-add btn-success"
                            disabled={!isValid}
                            onClick={writeNote}
                        >
                            +
                        </Button>
                    </InputGroup.Prepend>
                </InputGroup>
                {(noteBodyDirty && noteBodyError) && <Alert variant="danger" className='text-center p-0'>{noteBodyError}</Alert>}
                <Form.Control className="note-textarea mb-3"
                    onBlur={e=>blurHandler(e)}
                    name='noteBody'
                    maxLength={96}
                    as="textarea"
                    rows={10}
                    placeholder="Write a new note..."
                    value={newNoteBody}
                    onChange={handleUserTextArea}
                    required
                />
            </Form>
            <Form.Label>Selecting the note color...</Form.Label>
            <div className='circle-color-palette'>
                <Circle
                    width='120%'
                    color={newNoteColor}
                    onChangeComplete={handleChangeComplete}
                />
                <Form.Control className='select-color-note mt-3' disabled style={{ backgroundColor: `${newNoteColor}` }} />
            </div>
            <Form.Group controlId="exampleForm.ControlInput1" className="search-group">
                <Form.Label>Search by note title...</Form.Label>
                <Form.Control type='text'
                    className="search-input form-control "
                    onChange={handleSearchInput}
                    placeholder='Type here to search' />
            </Form.Group> 
            </div>
        </>
    )
}
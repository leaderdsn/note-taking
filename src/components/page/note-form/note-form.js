import React, { useEffect, useState, useRef } from 'react';
import Note from '../../note';
import FormNoteAdd from '../../form-note-add';
import './note-form.css';
import app from '../../../firebase';
import 'firebase/database';
import Spinner from '../../spinner';

/** Здесь отображаются заметки */
export default function NoteForm() {

    const [notes, setNotes] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [search, setSearch] = useState('');
    const [filteredNotes, setFilteredNotes] = useState([]);
    const database = app.database().ref().child('notes');
    const setRemoveListener = useRef();
    const setAddedListener = useRef();

    useEffect(() => {
        setLoading(true);
        const addedListener = app.database().ref().child('notes').on('child_added', snap => {
            setNotes(prevNotes => {
                return [
                    ...prevNotes,
                    {
                        id: snap.key,
                        noteTitle: snap.val().noteTitle,
                        noteBody: snap.val().noteBody,
                        noteDate: snap.val().noteDate,
                        noteColor: snap.val().noteColor
                    }
                ]
            })
            setLoading(false);
        })

        return () => setAddedListener.current = app.database().ref().off('child_added', addedListener)
    },[])

    useEffect(()=>{
        const removeListener = app.database().ref().child('notes').on('child_removed', snap => {
            setNotes(prevNotes => {
                const filteredNotes = prevNotes.filter(note => note.id !== snap.key)
                return [...filteredNotes]
            })
            setLoading(false);
        }) 

        return () => setRemoveListener.current = app.database().ref().off('child_removed', removeListener);
    })

    useEffect(()=>{
        setFilteredNotes(
            /** Фильтр по названию заметок */
            notes.filter( note => {
                return note.noteTitle.toLowerCase().includes( search.toLowerCase() )
            })
        )
    },[search, notes])

    /** Добавление заметок в базу данных */
    const addNote = (noteTitle, noteBody, noteDate, noteColor) => {
        return database.push().set({
            noteTitle: noteTitle, 
            noteBody: noteBody,
            noteDate: noteDate,
            noteColor: noteColor,
        });
    }

    /** Удаление заметок из базы данных */
    const removeNote = (noteId) => {
        database.child(noteId).remove();
    }

    return ( 
        <> 
            <div className='notes-wrapper'>
                <div className='form-note-add'>
                    <FormNoteAdd addNote={addNote} 
                        onChange={setSearch}
                    />
                </div>
                <div className='notes-form-body'>
                    {
                        isLoading ? <div className='spinner-container'><Spinner/></div> : (
                            filteredNotes.map((note) => {
                                return (
                                    <Note 
                                        key={note.id} 
                                        id={note.id} 
                                        title={note.noteTitle} 
                                        body={note.noteBody} 
                                        date={note.noteDate} 
                                        color={note.noteColor}
                                        removeNote={removeNote} 
                                    /> 
                                )
                            })
                        )  
                    }
                </div>
            </div>
        </> 
    )
}
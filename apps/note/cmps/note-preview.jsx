import { NoteToolBar } from "./note-tool-bar.jsx"

export function NotePreview({ note }) {

    function DynamicCmp({ note }) {
        switch (note.type) {
            case 'note-txt':
                return <TextBox note={note} />
            case 'note-img':
                return <ImgBox note={note} />
            case 'note-video':
                return <VideoBox note={note} />
            case 'note-todos':
                return <TodosBox note={note} />
        }
    }

    return <section className="note-preview">
        <DynamicCmp note={note} />
        <NoteToolBar />
    </section>
}

export function TextBox({ note }) {


    return <section className="text-box-container">
        <h1>{note.info.txt}</h1>
    </section>
}

export function ImgBox({ note }) {
    return <section className="image-box-container">
            <h6>{note.info.title}</h6>
            <div><img src={note.info.url} /></div>
    </section>
}

export function VideoBox({ note }) {

    return <section className="video-box-container">
    </section>

}

export function TodosBox({ note }) {


    return <section className="todos-box-container">

    </section>

}
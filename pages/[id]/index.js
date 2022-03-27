import fetch from "isomorphic-unfetch";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from "next/router"; //this is a nextjs router
import { Confirm, Button, Loader } from "semantic-ui-react";
// import "semantic-ui-css/semantic.min.css";

const Note = ({ note }) => {
  const [confirm, setConfirm] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  useEffect(() => {
    if (isDeleting) {
      deleteNote();
    }
  }, [isDeleting]);

  const open = () => setConfirm(true);
  const close = () => setConfirm(false);

  const deleteNote = async () => {
    const noteId = router.query.id;
    try {
      const deleted = await fetch(`api/notes/${noteId}`, {
        method: "Delete",
      });

      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    setIsDeleting(true);
    close();
  };
  return (
    <div className="note-container">
      {isDeleting ? (
        <Loader active />
      ) : (
        <>
          <h1>{note.title}</h1>
          <p>{note.description}</p>
          <Link href={`/${note._id}/edit`}>
            <Button color="grey">Edit</Button>
          </Link>
          <Button color="red" onClick={open}>
            Delete
          </Button>
        </>
      )}
      <Confirm open={confirm} onCancel={close} onConfirm={handleDelete} />
    </div>
  );
};

Note.getInitialProps = async ({ query: { id } }) => {
  // const protocol = req.headers["x-forwarded-proto"] || "http";
  // const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

  const baseUrl = "https://chinese-pad.vercel.app/";

  const res = await fetch(baseUrl + `/api/notes/${id}`);

  const { data } = await res.json();

  return { note: data };
};

export default Note;

import Link from "next/link";
import { useState, useEffect } from "react";
import fetch from "isomorphic-unfetch";
import { Button, Form, Loader } from "semantic-ui-react";
import { useRouter } from "next/router"; //this is a nextjs router
import "semantic-ui-css/semantic.min.css";

const EditNote = ({ baseUrl, note }) => {
  const [form, setForm] = useState({
    title: note.title,
    description: note.description,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const router = useRouter();

  useEffect(() => {
    if (isSubmitting) {
      if (Object.keys(errors).length === 0) {
        updateNote();
      } else {
        setIsSubmitting(false);
      }
    }
  }, [errors]);

  const updateNote = async () => {
    try {
      const res = await fetch(baseUrl + `api/notes/${router.query.id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });
      router.push("/"); // goes back to index page
    } catch (error) {
      console.log("error");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let errs = validate();
    setErrors(errs);
    setIsSubmitting(true);
  };
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let err = {};
    if (!form.title) {
      err.title = "Title is required";
    }
    if (!form.description) {
      err.description = "Description is required";
    }

    return err;
  };

  return (
    <div className="form-container">
      <h1>Edit Note</h1>
      <div>
        {isSubmitting ? (
          <Loader active inline="centered" />
        ) : (
          <Form onSubmit={handleSubmit}>
            <Form.Input
              fluid
              error={
                errors.title
                  ? { content: "Please enter a title", pointing: "above" }
                  : null
              }
              label="Title"
              placeholder="Title"
              name="title"
              value={form.title}
              onChange={handleChange}
              //   id="form-input"
            />
            <Form.TextArea
              fluid
              error={
                errors.description
                  ? { content: "Please enter a description", pointing: "above" }
                  : null
              }
              label="Description"
              placeholder="Description"
              name="description"
              value={form.description}
              onChange={handleChange}
            />
            <Button type="submit">Update</Button>
          </Form>
        )}
      </div>
    </div>
  );
};

EditNote.getInitialProps = async ({ query: { id } }) => {
  // const protocol = req.headers["x-forwarded-proto"] || "http";
  // const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

  const baseUrl = "https://notes-app-nine-ruby.vercel.app";
  const res = await fetch(baseUrl + `/api/notes/${id}`);

  const { data } = await res.json();

  return { note: data, baseUrl };
};

export default EditNote;

import Link from "next/link";
import fetch from "isomorphic-unfetch";
import { Button, Card } from "semantic-ui-react";
import "semantic-ui-css/semantic.min.css";

const Index = ({ notes }) => {
  return (
    <div className="notes-container">
      <h1>Notes</h1>
      <div className="grid wrapper">
        {notes.map((note) => {
          return (
            <div key={note.id}>
              <Card>
                <Card.Content>
                  <Card.Header>
                    <Link href={`/${note._id}`}>
                      <a>{note.title}</a>
                    </Link>
                  </Card.Header>
                </Card.Content>
                <Card.Content extra>
                  <Link href={`/${note._id}`}>
                    <Button primary>View</Button>
                  </Link>
                  <Link href={`/${note._id}/edit`}>
                    <Button primary>Edit</Button>
                  </Link>
                  <Link href={`/${note._id}`}>
                    <Button primary>Delete</Button>
                  </Link>
                </Card.Content>
              </Card>
            </div>
          );
        })}
      </div>
    </div>
  );
};

Index.getInitialProps = async () => {
  // const protocol = req.headers["x-forwarded-proto"] || "http";
  // const baseUrl = req ? `${protocol}://${req.headers.host}` : "";

  const baseUrl = "https://notes-app-nine-ruby.vercel.app";

  const res = await fetch(baseUrl + "/api/notes");
  const { data } = await res.json();

  return { notes: data };
};

export default Index;

import Link from "next/link";
import useSWR from "swr";
import axios from "axios";

const Sidebar = (props) => {
  const fetcher = async () => {
    return await axios.get("/api/notes");
  };
  const { data, error } = useSWR("/api/notes", fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  const notes = data.data.data;
  console.log(notes);

  return (
    <nav className="sidebar">
      <Link href="/">
        <a className="sidebar-home">Home</a>
      </Link>
      {notes.map((note) => {
        return (
          <div key={note.id}>
            <Link href={`/${note._id}`}>
              <a>{note.title}</a>
            </Link>
          </div>
        );
      })}
      <Link href="/new">
        <a className="sidebar-create"> + </a>
      </Link>
    </nav>
  );
};

export default Sidebar;

import Head from "next/head";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Chinese Pad</title>
    </Head>
    <Navbar />
    <div className="box-container">
      <div className="left-box">
        <Sidebar />
      </div>
      <div className="right-box">{children}</div>
    </div>
  </>
);

export default Layout;

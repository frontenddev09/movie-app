import { Link } from "react-router-dom";
const NotFoundPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "70vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <img src="/error.gif" alt="error" />
      <h1>Page not found</h1>
      <button className="btn btn__secondary" style={{ marginTop: "10px" }}>
        <Link to={"/"}>Home Page</Link>
      </button>
    </div>
  );
};

export default NotFoundPage;

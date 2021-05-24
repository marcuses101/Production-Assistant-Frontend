import React from "react";
import LoginLinks from "../LoginLinks";

const gridStyle = {
  display: "grid",
  marginTop: "2rem",
  gap: "1rem",
  gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))",
};
const articleStyle = {
  padding: "1rem",
  borderRadius: 'var(--br)',
  boxShadow: "0px 0px 5px 1px var(--background-green)",
};

export function Landing() {
  return (
    <main className="Landing" style={{ margin: "1rem auto" , width:'95vw'}}>
      <section>
        <h1>Production Assistant</h1>
        <div style={gridStyle}>
          <article style={articleStyle}>
            <h2>About</h2>
            <p style={{ textAlign: "center" }}>
              Welcome to the production app!
            </p>
          </article>
          <article style={articleStyle}>
            <h2>Login Options</h2>
            <LoginLinks />
          </article>
        </div>
      </section>
    </main>
  );
}

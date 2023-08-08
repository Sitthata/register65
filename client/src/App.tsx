import React, { useState } from "react";

interface Student {
  id: string;
  fullname: string;
  firstname: string;
  lastname: string;
  nickname: string;
  color: string;
  colorCode: string;
}

function App() {
  const [id, setId] = useState("");
  const [data, setData] = useState({} as Student);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3000/api/student/${id}`);
      if (!response.ok) {
        console.log('Server error: ' + response.status);
        return;
      }
      const data = await response.json();
      setData(data[0]);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={id} onChange={(e) => setId(e.target.value)} />
      <button type="submit">Search</button>
      {data && (
        <div>
          <h2>{data.firstname}</h2>
          <h2>{data.lastname}</h2>
          <h2>{data.nickname}</h2>
          <h2>{data.color}</h2>
          <h2>{data.colorCode}</h2>
        </div>
      )}
    </form>
  );
}

export default App;

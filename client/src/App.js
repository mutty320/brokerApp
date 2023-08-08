import React, {useEffect, useState} from 'react';
function App() {
  const [data, setData] = useState({ users: [] });

  useEffect(() => {
    fetch("/api")
      .then((res) => res.json())
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      {typeof data.users === "undefined" ? (
        <p>Loading...</p>
      ) : (
        data.users.map((user, index) => (
          <p key={index}>{user}</p> // Add the key attribute and return the JSX
        ))
      )}
    </div>
  );
}


export default App;

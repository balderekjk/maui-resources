import { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [resourceList, setResourceList] = useState([]);

  const getResources = () => {
    axios.get('http://localhost:3001/resources').then((response) => {
      setResourceList(response.data);
    });
  };

  return (
    <div class="kupuna">
      <nav className="nav">
        <ul>
          <li onClick={getResources}>Housing</li>
          <li>Homeless Outreach</li>
          <li>Food & Transportation</li>
          <li>Medical</li>
          <li>Rental Assistance</li>
          <li>Childcare</li>
          <li>Other</li>
        </ul>
      </nav>
      <div className="container">
        {resourceList.map((val) => {
          return (
            <div className="card">
              <h3>{val.company}</h3>
              <p>
                Phone:{' '}
                <a href={`tel:${val.primary_phone}`}>{val.primary_phone}</a>
              </p>
              <p>Address: {val.address}</p>
              <p>
                Email: <a href={`mailto:${val.email}`}>{val.email}</a>
              </p>
              <p>
                Website: <a href={val.website}>{val.website}</a>
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './components/Modal';
import './App.css';

function App() {
  const [fullList, setFullList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentDetails, setCurrentDetails] = useState('');
  const [toggleDetails, setToggleDetails] = useState('');
  const [toggleDisplayDetails, setToggleDisplayDetails] = useState(false);
  const [modal, setModal] = useState(false);
  let [helper, setHelper] = useState([]);
  const [firstId, setFirstId] = useState(null);

  const getResources = () => {
    axios.get('http://localhost:3001/resources').then((response) => {
      setFullList(response.data);
    });
  };

  useEffect(() => {
    getResources();
  }, []);

  useEffect(() => {
    setCurrentList(fullList.filter((val) => val.category === 'Housing'));
  }, [fullList]);

  const filterResources = (category) => {
    setCurrentList(
      fullList.filter((val) => {
        return val.category === category;
      })
    );
  };

  const togglePanel = (id) => {
    console.log(toggleDetails);
    console.log(id, 'id');
    console.log(toggleDetails === id, 'conditional');
    if (toggleDetails === id) {
      setToggleDetails('');
      console.log(toggleDetails);
      return;
    }
    setToggleDetails(id);
    // if (helper.length === 2) {
    //   setHelper([...helper.slice(1), id]);
    // } else {
    //   setHelper([...helper, id]);
    // }
    // if (toggleDisplayDetails === false) {
    //   setToggleDetails(id);
    //   setToggleDisplayDetails(!toggleDisplayDetails);
    // } else if (toggleDisplayDetails === true) {
    //   setToggleDetails(!id);
    //   setToggleDisplayDetails(!toggleDisplayDetails);
    // }
    // else if (helper[1] && helper[0] !== helper[1]) {

    // }
  };

  const closeModal = () => {
    setModal(false);
    setCurrentDetails('');
    setCurrentCompany('');
  };

  return (
    <div className="kupuna">
      <nav className="nav">
        <ul>
          <li onClick={() => filterResources('Housing')}>Housing</li>
          <li onClick={() => filterResources('Homeless Outreach')}>
            Homeless Outreach
          </li>
          <li onClick={() => filterResources('Food & Transportation')}>
            Food & Transportation
          </li>
          <li onClick={() => filterResources('Medical')}>Medical</li>
          <li onClick={() => filterResources('Rental Assistance')}>
            Rental Assistance
          </li>
          <li onClick={() => filterResources('Childcare')}>Childcare</li>
          <li onClick={() => filterResources('Other')}>Other</li>
        </ul>
      </nav>
      <div className="container">
        <div className="modal">
          {modal && (
            <Modal
              currentCompany={currentCompany}
              currentDetails={currentDetails}
              closeModal={() => closeModal()}
            />
          )}
        </div>

        {currentList.map((val) => {
          return (
            <div className="card">
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  color: 'hsl(199, 80%, 18%)',
                }}
              >
                <h3 style={{ marginLeft: '1.5rem', textAlign: 'center' }}>
                  {val.company}
                </h3>
                <div
                  onClick={() => {
                    togglePanel(val.id);
                  }}
                  style={{
                    cursor: 'pointer',
                    marginLeft: '1rem',
                    fontSize: '0.8rem',
                  }}
                >
                  &#9660;
                </div>
              </div>
              {toggleDetails === val.id ? (
                <div>
                  {`${val.hours}` !== 'null' ? <p>Hours: {val.hours}</p> : ''}
                  {`${val.primary_phone}` !== 'null' ? (
                    <p>
                      Main Phone:{' '}
                      <a href={`tel:${val.primary_phone}`}>
                        {val.primary_phone}
                      </a>
                    </p>
                  ) : (
                    ''
                  )}
                  {`${val.additional_phones}` !== 'null' ? (
                    <p>Other Phones: {val.additional_phones}</p>
                  ) : (
                    ''
                  )}
                  {`${val.fax}` !== 'null' ? <p>Fax: {val.fax}</p> : ''}
                  {`${val.address}` !== 'null' ? (
                    <p>
                      Address:{' '}
                      <a
                        href={`https://maps.google.com/?q=${val.address}`}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {val.address}
                      </a>
                    </p>
                  ) : (
                    ''
                  )}
                  {`${val.additional_addresses}` !== 'null' ? (
                    <p>Other Addresses: {val.additional_addresses}</p>
                  ) : (
                    ''
                  )}
                  {`${val.email}` !== 'null' ? (
                    <p>
                      Email: <a href={`mailto:${val.email}`}>{val.email}</a>
                    </p>
                  ) : (
                    ''
                  )}
                  {`${val.website}` !== 'null' ? (
                    <p>
                      Website:{' '}
                      <a
                        href={val.website}
                        target="_blank"
                        rel="noreferrer noopener"
                      >
                        {val.website}
                      </a>
                    </p>
                  ) : (
                    ''
                  )}
                  {`${val.summary}` !== 'null' ? (
                    <p
                      className="details"
                      onClick={() => {
                        setCurrentCompany(`${val.company}`);
                        setCurrentDetails(`${val.summary}`);
                        setModal(true);
                      }}
                    >
                      Click Here to View Summary
                    </p>
                  ) : (
                    ''
                  )}
                </div>
              ) : (
                ''
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

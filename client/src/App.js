import { useEffect, useState } from 'react';
import axios from 'axios';
import Modal from './components/Modal';
import AccordionData from './components/AccordionData';
import './App.css';

function App() {
  const [fullList, setFullList] = useState([]);
  const [currentList, setCurrentList] = useState([]);
  const [currentCompany, setCurrentCompany] = useState('');
  const [currentDetails, setCurrentDetails] = useState('');
  const [toggleDetails, setToggleDetails] = useState('');
  const [currentCategory, setCurrentCategory] = useState('Housing');
  const [toggleOn, setToggleOn] = useState(false);
  const [modal, setModal] = useState(false);

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
    setCurrentCategory(category);
    setCurrentList(
      fullList.filter((val) => {
        return val.category === category;
      })
    );
  };

  const togglePanel = (id) => {
    if (toggleDetails === id) {
      setToggleDetails('');
      return;
    }
    setToggleDetails(id);
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
        <div
          className="toggle-btn"
          onClick={() => {
            setToggleDetails('');
            setToggleOn(!toggleOn);
          }}
        >
          {toggleOn
            ? `Hide All ${currentCategory}`
            : `View All ${currentCategory}`}
        </div>
        {currentList.map((val) => {
          return (
            <div className="card">
              <div className="card-wrapper">
                <div
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                    color: 'hsl(199, 80%, 18%)',
                  }}
                >
                  <div
                    className="panel-title"
                    onClick={() => {
                      togglePanel(val.id);
                    }}
                  >
                    <h3
                      className="panel-company"
                      style={{ textAlign: 'center' }}
                    >
                      {val.company}
                    </h3>
                    <div
                      style={{
                        fontSize: '0.8rem',
                        marginLeft: '1rem',
                      }}
                    >
                      {toggleOn && toggleDetails === val.id
                        ? String.fromCharCode(9660)
                        : toggleOn || toggleDetails === val.id
                        ? String.fromCharCode(9650)
                        : String.fromCharCode(9660)}
                    </div>
                  </div>
                </div>
                {toggleOn && toggleDetails === val.id ? (
                  ''
                ) : toggleOn ? (
                  <AccordionData val={val} />
                ) : !toggleOn && toggleDetails === val.id ? (
                  <div>
                    <AccordionData val={val} />
                  </div>
                ) : toggleOn && toggleDetails === '' ? (
                  ''
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
                    <div>Click Here to View Description</div>
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;

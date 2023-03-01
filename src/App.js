import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import CandidateList from './components/CandidateList';
import CandidateModal from './components/Candidate'
import './App.css';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { ThemeProvider } from '@mui/material/styles';
import Header from './components/Header';
import sample_input from './sample_input.json'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CandidateCard from './components/CandidateCard';

import Typography from '@mui/material/Typography';



function App() {

  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const [inputText, setInputText] = useState('Find candidate with 5 years experience with python');
  const [inputTop, setInputTop] = useState('5');

  const [candidates, setCandidates] = useState(sample_input)

  const handleCandidateClick = (candidate) => {
    setSelectedCandidate(candidate);
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setSelectedCandidate(null);
    setModalOpen(false);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(`http://192.168.82.10:8000/smartSearch?query=${inputText}&top_hits=${inputTop}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json()
      console.log(data)
      setCandidates(data);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }

  return (

    <div className='body'>
      <Header />
      <div className='main-container'>


        <SearchBar textValue={inputText}
          topValue={inputTop}
          onTextChange={setInputText}
          onTopChange={setInputTop}
          onSearch={handleSearch} />
        <CandidateList onCandidateClick={handleCandidateClick}
          candidates={candidates}
        />
        {selectedCandidate && (
          <Modal
            open={setModalOpen}
            onClose={handleModalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <CandidateCard candidate={selectedCandidate} />
          </Modal>
        )}
      </div>
    </div>
  );
}

export default App;

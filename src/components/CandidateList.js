import React from 'react';
import List from '@mui/material/List';
import Candidate from './Candidate';
import ListItem from '@mui/material/ListItem';
import './CandidateList.css';
import { Button } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
    status: {
        danger: '#e53e3e',
    },
    palette: {
        primary: {
            main: '#0971f1',
            darker: '#053e85',
        },
        neutral: {
            main: '#282c34',
            contrastText: '#fff',
        },
    }})

const CandidateList = ({ candidates, onCandidateClick }) => {


    const [currentPage, setCurrentPage] = React.useState(1);
    const [itemPerPage, setItemPerPage] = React.useState(5);

    const indexOfLastItem = currentPage * itemPerPage;
    const indexOfFirstItem = indexOfLastItem - itemPerPage;
    const currentItems = candidates.slice(indexOfFirstItem, indexOfLastItem);

    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(candidates.length / itemPerPage); i++) {
        pageNumbers.push(i);
    }

    const handlePageClick = event => {
        setCurrentPage(Number(event.target.id));
    };


    return (
        <ThemeProvider theme={theme}>
        <div className='result-container'>
            <div className="pagination">
                {pageNumbers.map(number => (
                    <Button  color="neutral" key={number} id={number} onClick={handlePageClick}>
                        {number}
                    </Button>
                ))}
            </div>
            <div className='list-container' style={{borderRadius:"5px", padding:"10px", width:"auto"}}>


                <List style={{borderRadius:"5px", backgroundColor:"#ffffff", width:"auto"}}>
                    {currentItems.map((candidate) => (
                        <div key={candidate.id} onClick={() => onCandidateClick(candidate)} className="listItem">

                            <Candidate name={candidate.Firstname + candidate.Lastname}
                                phone={candidate.PhoneNumber}
                                email={candidate.Email} />
                        </div>
                    ))}
                </List>
            </div>
        </div>
        </ThemeProvider>
    );
};

export default CandidateList;
import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { makeStyles } from '@mui/styles';
import './SearchBar.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

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
    },
});

const SearchBar = (props) => {

    const handleInputTextChange = (event) => {
        props.onTextChange(event.target.value);
      };

    const handleInputTopChange = (event) => {
        props.onTopChange(event.target.value);
    };
    
    const handleButtonClick = () => {
        props.onSearch();
    };

    return (
        <ThemeProvider theme={theme}>
            <div className="search-bar">
                <div className="input-container">
                    <TextField InputLabelProps={{ shrink: true }} 
                                label="Expected candidate's information" 
                                className="input-text" 
                                value={props.textValue}
                                onChange={handleInputTextChange}/>

                    <TextField InputLabelProps={{ shrink: true }} 
                                label="Top" 
                                type="number" 
                                className="input-number" 
                                value={props.topValue}
                                onChange={handleInputTopChange}/>
                    
                </div>
                <Button onClick={handleButtonClick} color="neutral" variant="contained" className="search-button">
                        Search Candidates
                </Button>
            </div>
        </ThemeProvider>
    );
};

export default SearchBar;
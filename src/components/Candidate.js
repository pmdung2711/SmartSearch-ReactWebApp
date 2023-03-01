import React from 'react';
import Avatar from '@mui/material/Avatar';
import ListItem from '@mui/material/ListItem';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { List } from '@mui/material';

const Candidate = ({ name, phone, email }) => {
    return (
        <List>
            <ListItem >
                <ListItemAvatar>
                    <Avatar src={'https://via.placeholder.com/150'} />
                </ListItemAvatar>
                <ListItemText primary={name} secondary={`${phone}, ${email}`} />
            </ListItem>
        </List>
    );
};

export default Candidate;
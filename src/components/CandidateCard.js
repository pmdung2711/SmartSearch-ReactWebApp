import React from 'react'

import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Slider, Chip, List, ListItem, ListItemText, ListItemAvatar, Paper, Avatar, Grid } from '@mui/material/';

import { Divider } from '@mui/material';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',

    bgcolor: 'background.paper',

    boxShadow: 24,
    p: 4,
    padding: 5,
    overflowY: 'scroll',
    maxWidth: 700, minWidth: 600,

};

const CandidateCard = ({ candidate }) => {

    let address = ''
    let phoneNumber = ''
    let email = ''

    // Get the candidate information
    try {
        if (candidate.Address.StreetAddress !== null && candidate.Address.StreetAddress !== undefined) {
            address = address + candidate.Address.StreetAddress;
        }

        if (candidate.Address.City !== null && candidate.Address.City !== undefined) {
            address = address + candidate.Address.City;
        }

        if (candidate.Address.Province !== null && candidate.Address.Province !== undefined) {
            address = address + candidate.Address.Province;
        }
    }
    catch (err) {
        console.log(err)
    }


    try {
        if (candidate.Email !== null && candidate.Email !== undefined) {
            email = candidate.Email
        }
    }
    catch (err) {
        console.log(err)
    }

    try {
        if (candidate.PhoneNumber !== null && candidate.PhoneNumber !== undefined) {
            phoneNumber = candidate.PhoneNumber
        }
    }
    catch (err) {
        console.log(err)
    }


    let previous_company = 'No information'
    let previous_job = 'No information'
    let applied_date = 'No information'

    // Previous job and company
    if (candidate.PreviousCompany !== undefined && candidate.PreviousCompany !== null) {
        previous_company = candidate.PreviousCompany
    }

    if (candidate.PreviousJob !== undefined && candidate.PreviousJob !== null) {
        previous_job = candidate.PreviousJob

    }

    // Applied Date
    if (candidate.Applications[0].AppliedDate !== null && candidate.Applications[0].AppliedDate !== undefined) {
        applied_date = candidate.Applications[0].AppliedDate
    }



    // this is for Experience

    const experiences = candidate.Applications[0].CV.WorkExperiences
    const processedExperiences = experiences.map(exp => {

        let duration = '';
        
    

        if (exp.FromMonth !== null && exp.FromMonth !== undefined){
            duration = duration + exp.FromMonth + "/";
        }

        if (exp.FromYear !== null && exp.FromYear !== undefined){
            duration = duration + exp.FromYear
        }

        if (exp.ToMonth !== null && exp.ToMonth !== undefined){
            duration = duration + " - " + exp.ToMonth;
        }

        if (exp.ToYear !== null && exp.ToYear !== undefined){
            duration = duration + "/" + exp.ToYear;
        }


        return {
            "jobTitle": exp.Title,
            "company": exp.Company,
            "duration": duration,
            "description": exp.Description
        }
    })
    const [selectedExperience, setSelectedExperience] = React.useState(0);
    const handleClickExp = (index) => {
        setSelectedExperience(index);
    };

    // this is for Education

    const educations = candidate.Applications[0].CV.Education
    const processedEducations = educations.map(edu => {

        let duration = ''

        if (edu.FromMonth !== null && edu.FromMonth !== undefined){
            duration = duration + edu.FromMonth + "/";
        }

        if (edu.FromYear !== null && edu.FromYear !== undefined){
            duration = duration + edu.FromYear
        }

        if (edu.ToMonth !== null && edu.ToMonth !== undefined){
            duration = duration + " - " + edu.ToMonth;
        }

        if (edu.ToYear !== null && edu.ToYear !== undefined){
            duration = duration + "/" + edu.ToYear;
        }

        return {
            "school": edu.School,
            "degree": edu.Degree,
            "major": edu.StudyMajorSubject,
            "duration": duration

        }
    })
    const [selectedEducation, setSelectedEducation] = React.useState(0);
    const handleClickEdu = (index) => {
        setSelectedEducation(index);
    };

    // this is for projects

    const projects = candidate.Applications[0].CV.Projects
    const processedProjects = projects.map(project => {

        let duration = ''

        if (project.FromMonth !== null && project.FromMonth !== undefined){
            duration = duration + project.FromMonth + "/";
        }

        if (project.FromYear !== null && project.FromYear !== undefined){
            duration = duration + project.FromYear
        }

        if (project.ToMonth !== null && project.ToMonth !== undefined){
            duration = duration + " - " + project.ToMonth;
        }

        if (project.ToYear !== null && project.ToYear !== undefined){
            duration = duration + "/" + project.ToYear;
        }

        return {
            "project_name": project.Name,
            "position": project.Position,
            "duration": duration

        }
    })
    console.log(processedProjects)
    const [selectedProject, setSelectedProject] = React.useState(0);
    const handleClickProject = (index) => {
        setSelectedProject(index);
    };





    return (
        <Card sx={style} >
            <div style={{ maxHeight: 700, marginBottom: "30px" }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image="https://fujifilm-x.com/wp-content/uploads/2021/01/gfx100s_sample_04_thum-1.jpg"
                    title="Image Profile"
                />

                <Typography gutterBottom style={{ marginTop: 15, textAlign: "left" }} variant="h4" component="div">
                    {candidate.Firstname + " " + candidate.Lastname}
                </Typography>
                <div style={{backgroundColor:"#f5f5f5", padding: 5, borderRadius: "10px"}}>
                    <p><b>Previous Job: </b>{previous_job}</p>
                    <p><b>Previous Company: </b>{previous_company}</p>
                </div>

                <p><b>Summary</b></p>
                <div style={{maxHeight: "100px", overflowY:"scroll"}}>
                    {candidate.Applications[0].CV.Summary}

                </div>
                
                <p><b>Personal Information</b></p>
                <List style={{ backgroundColor: "#f5f5f5", marginTop: "20px", borderRadius: "10px" }}>
                    <ListItem>
                        <ListItemText primary="Location" secondary={address} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Email" secondary={email} />
                    </ListItem>
                    <ListItem>
                        <ListItemText primary="Phone" secondary={phoneNumber} />
                    </ListItem>
                </List>

                {processedEducations.length !== 0 && <div className='experience'>
                    <br></br>
                    <Divider></Divider>
                    <br></br>
                    <Typography variant="h6">
                        Educations
                    </Typography>
                    <List>
                        {processedEducations.map((edu, index) => (
                            <Button
                                key={index}
                                onClick={() => handleClickEdu(index)}
                                variant={selectedEducation === index ? 'contained' : 'outlined'}
                                style={{ marginRight: 10 }}
                            >
                            </Button>
                        ))}
                    </List>
                    <CardContent style={{ backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
                        <div >
                            <b style={{ color: "#0a3866" }}>{processedEducations[selectedEducation].degree}</b>
                            <p><b>College</b></p>
                            {processedEducations[selectedEducation].school}
                            <p><b>Duration</b></p>
                            {processedEducations[selectedEducation].duration}
                            <p><b>Major</b></p>
                            {processedEducations[selectedEducation].major}

                        </div>
                    </CardContent>
                </div>}
                {processedExperiences.length !== 0 && <div>
                    <br></br>
                    <Divider></Divider>
                    <br></br>
                    <Typography variant="h6">
                        Experiences
                    </Typography>
                    <List>
                        {processedExperiences.map((exp, index) => (
                            <Button
                                key={index}
                                onClick={() => handleClickExp(index)}
                                variant={selectedExperience === index ? 'contained' : 'outlined'}
                                style={{ marginRight: 5, color: "#f5f5f5" }}

                            >
                            </Button>
                        ))}
                    </List>
                    <CardContent style={{ backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
                        <div >
                            <h3 style={{ color: "#0a3866" }}><b>{processedExperiences[selectedExperience].jobTitle}</b></h3>
                            <p><b>Company</b></p>
                            <p>{processedExperiences[selectedExperience].company}</p>
                            <p><b>Duration</b></p>
                            {processedExperiences[selectedExperience].duration}
                            <br></br>
                            <p><b>Description</b></p>
                            <p>{processedExperiences[selectedExperience].description}</p>
                        </div>
                    </CardContent>
                </div>}


                {processedProjects.length !== 0 && <div>
                    <br></br>
                    <Divider></Divider>
                    <br></br>
                    <Typography variant="h6">
                        Projects
                    </Typography>
                    <List>
                        {processedProjects.map((project, index) => (
                            <Button
                                key={index}
                                onClick={() => handleClickProject(index)}
                                variant={selectedProject === index ? 'contained' : 'outlined'}
                                style={{ marginRight: 5, color: "#f5f5f5" }}

                            >
                            </Button>
                        ))}
                    </List>
                    <CardContent style={{ backgroundColor: "#f5f5f5", borderRadius: "10px" }}>
                        <div >
                            <h3 style={{ color: "#0a3866" }}><b>{processedProjects[selectedProject].project_name}</b></h3>
                            <p><b>Duration</b></p>
                            <p>{processedProjects[selectedProject].duration}</p>
                            <p><b>Position</b></p>
                            {processedProjects[selectedProject].position}
                        </div>
                    </CardContent>
                </div>}

                {candidate.Applications[0].CV.Skills.length !== 0 &&
                    <div>
                        <br></br>
                        <Divider></Divider>
                        <br></br>
                        <Typography variant="h6" gutterBottom>
                            Skills
                        </Typography>
                        <div style={{ maxHeight: "150px", overflowY: 'scroll' }}>
                            {candidate.Applications[0].CV.Skills.map((skill) => (
                                <Chip style={{ marginTop: "5px", marginRight: "5px", backgroundColor: "#5c5252", color: "white" }} key={skill} label={skill.Name} />
                            ))}
                        </div>
                    </div>

                }


                {candidate.Applications[0].CV.Languages.length !== 0 &&
                    <div>
                        <br></br>
                        <Divider></Divider>
                        <br></br>
                        <Typography variant="h6" gutterBottom>
                            Languages
                        </Typography>
                        <div style={{ maxHeight: "150px", overflowY: 'scroll' }}>
                            {candidate.Applications[0].CV.Languages.map((skill) => (
                                <Chip style={{ marginTop: "5px",marginRight: "5px", backgroundColor: "#4d4d4d", color: "white" }} key={skill} label={skill.Name} />
                            ))}
                        </div>
                    </div>

                }


                {candidate.Applications[0].CV.Certifications.length !== 0 &&
                    <div>
                        <br></br>
                        <Divider></Divider>
                        <br></br>
                        <Typography variant="h6" gutterBottom>
                            Certifications
                        </Typography>
                        <List>


                            <div style={{ maxHeight: "150px", overflowY: 'scroll' }}>
                                {candidate.Applications[0].CV.Certifications.map((certi) => (
                                    <ListItem key={certi} style={{ backgroundColor: "#f5f5f5", marginTop: "3px" }}>
                                        <ListItemText primary={certi.Name} secondary={certi.ToYear} />
                                    </ListItem>
                                ))}
                            </div>
                        </List>
                    </div>

                }


                <CardActions style={{ marginTop: "50px" }}>

                </CardActions>
            </div>
        </Card>
    )

}

export default CandidateCard;
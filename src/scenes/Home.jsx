import AppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import { Fragment, cloneElement, useEffect, useState } from 'react';
import { useScrollTrigger } from '@mui/material';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import { Formik, } from 'formik';
import { Modal } from '@mui/material';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';


//Cause I'm lazy
const images = [
    {
        url: '../../asset/File.svg',
        title: 'CYBER RANGES WIKI',
        width: '50%',
        height: '350px',
        href: 'https://docs.cyberranges.com/collection/cyber-ranges-wiki-8xv2PHAmAO'
    },
    {
        url: '../../asset/SOC.svg',
        title: 'SOC WIKI',
        width: '50%',
        height: '350px',
        href: 'https://wiki.soctools.silensec.com/home'
    },
]
//Fancy button design stolen from MUI :)
const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 100,
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
            transition: ' all 0.1s ease-in-out'
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
            transition: ' all 0.1s ease-in-out'
        },
        '& .MuiTypography-root': {
            border: '5px solid currentColor',
            transition: ' all 0.2s ease-in-out'
        },
    },
}));
const ImageSrc = styled('span')({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,

    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center 50%',
});

const Image = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: theme.palette.common.dark,

}));
const ImageBackdrop = styled('span')(({ theme }) => ({
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#e4ecf7',
    opacity: 0.4,
    transition: theme.transitions.create('opacity'),
}));
const ImageMarked = styled('span')(({ theme }) => ({
    height: 3,
    width: 30,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

//Sticky nav bar
function ElevatedNav(props) {
    const { children, window } = props; //not needed, remove after test
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined
    });

    return cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}
ElevatedNav.propTypes = {
    children: PropTypes.element.isRequired,//not needed. Including for testing purposes
    window: PropTypes.func
};

//Home logic
const Home = () => {
    //Modal with form 
    const [isModal, setIsModal] = useState(false)
    const genDocName = (values) => {
        let documentName = '';

        if (use === 'external') {
            // const { company, project, documentType, version } = values;
            const year = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
            });
            const month = new Date().toLocaleDateString('en-US', {
                month: '2-digit',
            });
            const yearSliced = year.slice(-2);

            const documentNumber = Math.floor(Math.random() * 1000) + 1;

            const acrProject = values.project.split(' ');
            const acr = acrProject.map(arcs=>arcs[0].toUpperCase()).join('');


            documentName = `${values.company.toUpperCase()}-${month+yearSliced}-${acr}${documentNumber}-${values.docType.toUpperCase()}_v${values.version}`;
        } else if (values.use === 'internal') {
            // documentName = `CLITT-${documentNumber} v${version}`;
            documentName = `${values.client.toUpperCase()}${values.docType.toUpperCase()}-${values.docNumber}_v${values.version}`;
        }
        
        return documentName;
    }
    const openModal = () => {
        setIsModal(true);
    };

    const closeModal = () => {
        setIsModal(false);
    };
    //Performing some simple animations.
    useEffect(() => {
        const boxes = document.querySelectorAll('.animated-box');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate');
                } else {
                    entry.target.classList.remove('animate');
                }
            })
        })
        const hiddenElements = document.querySelectorAll('.animated-box');
        hiddenElements.forEach((el) => observer.observe(el))
    })
    const [docType, setDocType] = useState('');
    const [company, setCompany] = useState('');
    const [use, setUse] = useState('');
    const [version, setVersion] = useState('');
    const [project, setProject] = useState('');
    const [client, setClientName] = useState('');
    const [docNumber, setDocNumber] = useState('');
    const data = {docType, company, use, version, project, docNumber, client}

    const handleChangeDocNumber = (event) =>{
        setDocNumber(event.target.value)
    }
    const handleChangeClientName = (event) =>{
        setClientName(event.target.value)
    }
    const handleChangeVersion = (event) => {
        setVersion(event.target.value)
    }
    const handleChangeProject = (event) => {
        setProject(event.target.value)
    }
    const handleUseChange = (event) => {
        setUse(event.target.value)
    }

    const handleChangeDocType = (event) => {
        setDocType(event.target.value);
    };
    const handleChangeCompany = (event) => {
        setCompany(event.target.value);
    };


    return (
        <Fragment>
            <ElevatedNav>
                <AppBar sx={{ bgcolor: "#08154d" }}>
                    <Container>
                        <Toolbar disableGutters sx={{
                            justifyContent: 'center'
                        }} >
                            <Typography variant="h6" noWrap component="a" href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 800,
                                    letterSpacing: '.2rem',
                                    color: 'inherit',
                                    textDecoration: 'none'

                                }}
                            >
                                <img src="../../asset/B22.png" alt="Logo" height="50px" style={{ cursor: "pointer" }} component="a" href="/"
                                />
                            </Typography>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevatedNav>
            {/* <Container> */}

            <Box minWidth="100vh" minHeight="100vh" id="section1" p="50px" position='relative' display="flex" flexDirection="row" flexWrap="wrap" alignContent="space-between" className="animated-box"
                sx={{
                    background: `url('../../asset/back1.svg')`,
                    //aspectRatio: 250 / 250,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'auto',
                    overflowX: 'hidden'
                }}
            >
                <Box p="25px" sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className="animated-box" justifyContent="center">
                    {images.map((image) => (
                        <ImageButton
                            focusRipple
                            key={image.title}
                            // justifyContent="space-between"
                            href={image.href}
                            style={{
                                width: image.width,
                                height: image.height
                            }}
                        >
                            <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Typography
                                    component="span"
                                    variant="h4"
                                    fontWeight="bold"
                                    sx={{
                                        textShadow: '0px 0px 20px rgba(0, 0, 0, 1)',
                                        color: 'white',
                                        position: 'relative',
                                        p: 4,
                                        pt: 2,
                                        //pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}
                                >
                                    {image.title}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </ImageButton>
                    ))}
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%', mt: '-150px' }} className="animated-box" justifyContent="center">
                    <ImageButton
                        onClick={openModal}
                        focusRipple
                        key="Document Control"
                        justifyContent="space-between"
                        style={{
                            width: '50%',
                            height: '350px'
                        }}
                    >
                        <ImageSrc style={{ backgroundImage: `url(../../asset/File.svg)` }} />
                        <ImageBackdrop className="MuiImageBackdrop-root" />
                        <Image>
                            <Typography
                                component="span"
                                variant="h4"
                                fontWeight="bold"
                                sx={{
                                    textShadow: '0px 0px 20px rgba(0, 0, 0, 1)',
                                    color: 'white',
                                    position: 'relative',
                                    p: 4,
                                    pt: 2,
                                    //pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                }}
                            >
                                Generate Document Names
                                <ImageMarked className="MuiImageMarked-root" />
                            </Typography>
                        </Image>
                    </ImageButton>
                </Box>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className="animated-box" justifyContent="center">

                    <Modal open={isModal} onClose={closeModal} sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',

                    }}>
                        <Box sx={{
                            minWidth: '1000px',
                            padding: '20px',
                            borderRadius: '8px',
                            backgroundColor: '#dbebff',
                            backgroundRepeat: 'no-repeat',
                            backgroundSize: 'contain',
                            overflowX: 'visible',
                            boxShadow: '0px 0px 50px 30px rgba(0, 0, 0, 1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}>
                            <Formik
                                initialValues={{
                                    use: '',
                                    company: '',
                                    project: '',
                                    documentType: '',
                                    version: '',
                                    client: '',
                                    documentNumber: '',
                                }}
                                validate={(values) => {
                                    const errors = {};

                                    if (values.use === 'external') {
                                        if (!values.company) {
                                            errors.company = 'Required';
                                        }
                                        if (!values.project) {
                                            errors.project = 'Required';
                                        }
                                        if (!values.docType) {
                                            errors.docType = 'Required';
                                        }
                                        if (!values.version) {
                                            errors.version = 'Required';
                                        }
                                    } else if (values.use === 'internal') {
                                        if (!values.client) {
                                            errors.client = 'Required';
                                        }
                                        if (!values.documentNumber) {
                                            errors.documentNumber = 'Required';
                                        }
                                        if (!values.version) {
                                            errors.version = 'Required';
                                        }
                                    }

                                    return errors;
                                }}
                                onSubmit={(values, { setSubmitting }) => {
                                    const documentName = genDocName(data);

                                    Swal.fire({
                                        icon: 'success',
                                        title: 'Document Name',
                                        text: documentName,
                                });
                                    //console.log('Generated Document Name:', documentName);
                                    setSubmitting(false);
                                    closeModal(); // Close the modal after submitting the form
                                }}
                            >
                                {({ handleSubmit, isSubmitting, values }) => (
                                    <Box component="form" onSubmit={handleSubmit} >
                                        <Box>
                                            <Typography variant="h3">
                                                Choose Document Reference
                                            </Typography>
                                            <FormControl sx={{ m: 1, width: '100%' }}>
                                                <InputLabel>Choose Document Reference</InputLabel>
                                                <Select value={use} label="Document Type" name="use" onChange={handleUseChange}>
                                                    <MenuItem value=""><i>Choose company...</i></MenuItem>
                                                    <MenuItem value="external">For External Use</MenuItem>
                                                    <MenuItem value="internal">For Internal Use</MenuItem>
                                                </Select>
                                                {console.log(use)}

                                            </FormControl>
                                        </Box>
                                        {use === 'external' && (
                                            <Box>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <InputLabel>Company</InputLabel>
                                                    <Select value={company} label="Document Type" onChange={handleChangeCompany} name="company">
                                                        <MenuItem value=""><i>Choose company...</i></MenuItem>
                                                        <MenuItem value="SIL">Silensec Africa</MenuItem>
                                                        <MenuItem value="CRAFR">CYBER RANGES AFRICA</MenuItem>
                                                    </Select>    
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <InputLabel>Document Type</InputLabel>
                                                    <Select value={docType} label="Document Type" onChange={handleChangeDocType} name="docType">
                                                        <MenuItem value=""><i>Choose the document type...</i></MenuItem>
                                                        <MenuItem value="POW">Proposal of Work</MenuItem>
                                                        <MenuItem value="LGL">Legal Documents</MenuItem>
                                                        <MenuItem value="LOA">Letter of Authroization</MenuItem>
                                                        <MenuItem value="NDA">Non Disclosure Agreement</MenuItem>
                                                        <MenuItem value="REP">Reports</MenuItem>
                                                        <MenuItem value="DOC">Generic Document</MenuItem>
                                                    </Select>
                                                    
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <TextField name="project" variant="outlined" label="Project" onChange={handleChangeProject} value={project} />
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <TextField name="version" variant="outlined" label="Version" onChange={handleChangeVersion} value={version} />
                                                </FormControl>
                                            </Box>
                                        )}
                                        {use === 'internal' && (
                                            <Box>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <InputLabel>Client Name</InputLabel>
                                                    <Select value={client} label="Client Name" onChange={handleChangeClientName} name="client">
                                                        <MenuItem value=""><i>Choose company...</i></MenuItem>
                                                        <MenuItem value="SIL">Silensec Africa</MenuItem>
                                                        <MenuItem value="CRAFR">CYBER RANGES AFRICA</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <InputLabel>Document Type</InputLabel>
                                                    <Select value={docType} label="Document Type" onChange={handleChangeDocType} name="docType">
                                                        <MenuItem value=""><i>Choose the document type...</i></MenuItem>
                                                        <MenuItem value="POL">Policy</MenuItem>
                                                        <MenuItem value="PRO">Procedure</MenuItem>
                                                        <MenuItem value="TPL">Template</MenuItem>
                                                        <MenuItem value="REC">Record</MenuItem>
                                                    </Select>
                                                    
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <TextField name="docNumber" variant="outlined" label="Document Number" onChange={handleChangeDocNumber}  value={docNumber} />
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <TextField name="version" variant="outlined" label="Version" onChange={handleChangeVersion} value={version} />
                                                </FormControl>
                                            </Box>
                                               
                                        )}

                                        {(data.use === 'external') && <Button type="submit" disabled={isSubmitting} variant="contained">
                                            Submit
                                        </Button>}
                                        {(data.use === 'internal') && <Button type="submit" disabled={isSubmitting} variant="contained">
                                            Submit
                                        </Button>}
                                    </Box>
                                )}
                            </Formik>
                        </Box>
                    </Modal>
                </Box>


            </Box >


        </Fragment >
    )
}
export default Home
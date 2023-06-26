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
import Grid from '@mui/material/Grid';


//Cause I'm lazy
const images = [
    {
        func: false,
        url: '../../asset/File.svg',
        title: 'CYBER RANGES WIKI',
        width: '100%',
        height: '400px',
        href: 'https://docs.cyberranges.com/collection/cyber-ranges-wiki-8xv2PHAmAO'
    },
    {
        func: false,
        url: '../../asset/SOC.svg',
        title: 'SOC WIKI',
        width: '100%',
        height: '400px',
        href: 'https://wiki.soctools.silensec.com/home'
    },
    {
        func: false,
        url: '../../asset/policy.png',
        title: 'POLICIES AND PROCEDURES',
        width: '100%',
        height: '400px',
        href: 'https://wiki.soctools.silensec.com/home'
    },
    //MUST BE LAST!!!
    {
        func: true,
        title: 'GENERATE DOCUMENTS',
        url: '../../asset/File.svg',
        width: '100%',
        height: '400px',

    }
]

const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 50,
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
    [theme.breakpoints.down('sm')]: {
        width: '100% !important', // Overrides inline-style
        height: 100,
    },
    '&:hover, &.Mui-focusVisible': {
        zIndex: 1,
        '& .MuiImageBackdrop-root': {
            opacity: 0.15,
            transition: 'all 0.1s ease-in-out',
        },
        '& .MuiImageMarked-root': {
            opacity: 0,
            transition: 'all 0.1s ease-in-out',
        },
        '& .MuiTypography-root': {
            border: '5px solid currentColor',
            transition: 'all 0.2s ease-in-out',
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
    opacity: 0.8,
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
            // const { company, project, documentType, version } = data;
            const year = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
            });
            const month = new Date().toLocaleDateString('en-US', {
                month: '2-digit',
            });
            const yearSliced = year.slice(-2);
            const documentNumber = Math.floor(Math.random() * 1000) + 1; 
            const acrProject = data.project.split(' ');
            const acr = acrProject.map(word => word.charAt(0).toUpperCase()).join('');
            documentName = `${data.company.toUpperCase()}-${month + yearSliced}-${acr}${documentNumber}-${data.docType.toUpperCase()}_v${data.version}`;
        } else if (data.use === 'internal') {
            // documentName = `CLITT-${documentNumber} v${version}`;
            documentName = `${data.client.toUpperCase()}${data.docType.toUpperCase()}-${data.docNumber}_v${data.version}`;
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
    const handleChangeDocNumber = (event) => {
        setDocNumber(event.target.value)
    }
    const handleChangeClientName = (event) => {
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
    const data = { docType, company, use, version, project, docNumber, client }

    return (
        <Fragment>
            <Box
                position="relative"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                alignContent="space-between"
                className="animated-box"
            >
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



                {/* <Box p="25px" sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className="animated-box" justifyContent="center"> */}
                <Grid container spacing={2} justifyContent="center" p="100px 50px 50px" >
                    {images.map((image) => (
                        <Grid item xs={12} sm={6} md={4} key={image.title}>
                        {image.func===true 
                            ? (
                                <ImageButton
                            onClick={() => openModal()}
                            focusRipple
                            style={{
                                width: image.width,
                                height: image.height
                            }}
                        >
                            <ImageSrc style={{ backgroundImage: `url(${image.url})`}}/> {/* Added backgroundSize: 'cover' to ensure the image covers the entire container */}
                            <ImageBackdrop className="MuiImageBackdrop-root" />
                            <Image>
                                <Typography
                                    component="span"
                                    variant="h5"
                                    fontWeight="bold"
                                    sx={{
                                        textShadow: '0px 0px 20px rgba(0, 0, 0, 1)',
                                        color: 'white',
                                        position: 'relative',
                                        backgroundColor: 'rgba(128, 128, 128, 0.5)',
                                        p: 4,
                                        pt: 2,
                                        pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                    }}
                                >
                                    {image.title}
                                    <ImageMarked className="MuiImageMarked-root" />
                                </Typography>
                            </Image>
                        </ImageButton>
                            )
                            
                            
                            : (
                                <ImageButton
                                focusRipple
                                key={image.title}
                                // justifyContent="space-between"
                                href={image.href}
                                target="_blank"
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
                                        variant="h5"
                                        fontWeight="bold"
                                        sx={{
                                            textShadow: '0px 0px 10px rgba(0, 0, 0, 0.5)',
                                            color: 'white',
                                            position: 'relative',
                                            backgroundColor: 'rgba(128, 128, 128, 0.5)',
                                            p: 4,
                                            pt: 2,
                                            pb: (theme) => `calc(${theme.spacing(1)} + 6px)`,
                                        }}
                                    >
                                        {image.title}
                                        <ImageMarked className="MuiImageMarked-root" />
                                    </Typography>
                                </Image>
                            </ImageButton>
                            )
                            
                            
                            
                        
                    }
                        </Grid>
                    ))}
                    {/* <Grid item xs={12} sm={6} md={4}>
                        
                    </Grid> */}

                </Grid>
                {/* </Box> */}

                <Box sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className="animated-box" justifyContent="center">

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
    use: "",
    company: "",
    project: "",
    docType: "",
    version: "",
    client: "",
    docNumber: ""
  }}
  validate={(values) => {
    const errors = {};

    if (use === "external") {
      if (!company) {
        errors.company = "Required";
      }
      if (!project) {
        errors.project = "Required";
      }
      if (!docType) {
        errors.docType = "Required";
      }
      if (!version) {
        errors.version = "Required";
      }
    } else if (use === "internal") {
      if (!client) {
        errors.client = "Required";
      }
      if (!docNumber) {
        errors.docNumber = "Required";
      }
      if (!version) {
        errors.version = "Required";
      }
    }

    return errors;
  }}
  onSubmit={(values, { setSubmitting }) => {
    const documentName = genDocName(values);
    console.log(values)
    Swal.fire({
      icon: "success",
      title: "Document Name",
      text: documentName
    });
    setSubmitting(false);
    closeModal(); // Close the modal after submitting the form
  }}
>
  {({ handleSubmit, isSubmitting, values, errors, touched }) => (
    <Box component="form" onSubmit={handleSubmit}>
      <Box>
                                            <Typography variant="h3">
                                                Choose Document Reference
                                            </Typography>
                                            <FormControl sx={{ m: 1, width: '100%' }}>
                                                <InputLabel>Choose Document Reference</InputLabel>
                                                <Select value={use} label="Document Type" name="use" onChange={handleUseChange}>
                                                    <MenuItem ><i>Choose company...</i></MenuItem>
                                                    <MenuItem value="external">For External Use</MenuItem>
                                                    <MenuItem value="internal">For Internal Use</MenuItem>
                                                </Select>
                                                {/* {console.log(use)} */}
                                            </FormControl>
                                        </Box>
                                        {use === 'external' && (
                                            <Box>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <InputLabel>Company</InputLabel>
                                                    <Select value={company} label="Document Type" onChange={handleChangeCompany} name="company" error={Boolean(touched.company && errors.company)}>
                                                        <MenuItem ><i>Choose company...</i></MenuItem>
                                                        <MenuItem value="SIL">Silensec Africa</MenuItem>
                                                        <MenuItem value="CRAFR">CYBER RANGES AFRICA</MenuItem>
                                                    </Select>
                                                    {/* {console.log(company)} */}
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <InputLabel>Document Type</InputLabel>
                                                    <Select value={docType} label="Document Type" onChange={handleChangeDocType} name="docType" error={Boolean(touched.docType && errors.docType)}>
                                                        <MenuItem ><i>Choose the document type...</i></MenuItem>
                                                        <MenuItem value="POW">Proposal of Work</MenuItem>
                                                        <MenuItem value="LGL">Legal Documents</MenuItem>
                                                        <MenuItem value="LOA">Letter of Authroization</MenuItem>
                                                        <MenuItem value="NDA">Non Disclosure Agreement</MenuItem>
                                                        <MenuItem value="REP">Reports</MenuItem>
                                                        <MenuItem value="DOC">Generic Document</MenuItem>
                                                    </Select>
                                                    {/* {console.log(docType)} */}
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <TextField name="project" variant="outlined" label="Project" onChange={handleChangeProject} value={project} error={Boolean(touched.project && errors.project)} />
                                                    {/* {console.log(project)} */}
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <TextField name="version" variant="outlined" label="Version" onChange={handleChangeVersion} value={version} error={Boolean(touched.version && errors.version)} />
                                                    {/* {console.log(version)} */}
                                                </FormControl>
                                            </Box>
                                        )}
                                        {use === 'internal' && (
                                            <Box>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <InputLabel>Client Name</InputLabel>
                                                    <Select value={client} label="Client Name" onChange={handleChangeClientName} name="client" error={Boolean(touched.client && errors.client)}>
                                                        <MenuItem ><i>Choose company...</i></MenuItem>
                                                        <MenuItem value="SIL">Silensec Africa</MenuItem>
                                                        <MenuItem value="CRAFR">CYBER RANGES AFRICA</MenuItem>
                                                    </Select>
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <InputLabel>Document Type</InputLabel>
                                                    <Select value={docType} label="Document Type" onChange={handleChangeDocType} name="docType" error={Boolean(touched.docType && errors.docType)}>
                                                        <MenuItem ><i>Choose the document type...</i></MenuItem >
                                                        <MenuItem value="POL">Policy</MenuItem>
                                                        <MenuItem value="PRO">Procedure</MenuItem>
                                                        <MenuItem value="TPL">Template</MenuItem>
                                                        <MenuItem value="REC">Record</MenuItem>
                                                    </Select>

                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <TextField name="docNumber" variant="outlined" label="Document Number" onChange={handleChangeDocNumber} value={docNumber} error={Boolean(touched.docNumber && errors.docNumber)} />
                                                </FormControl>
                                                <FormControl sx={{ m: 1, width: '100%' }}>
                                                    <TextField name="version" variant="outlined" label="Version" onChange={handleChangeVersion} value={version} error={Boolean(touched.version && errors.version)} />
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
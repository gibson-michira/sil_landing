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
import FormHelperText from '@mui/material/FormHelperText';
import Select from '@mui/material/Select';
import Swal from 'sweetalert2';
import Grid from '@mui/material/Grid';
import { motion } from "framer-motion";
import { useTheme } from '@mui/material/styles';
import { useMediaQuery } from '@mui/material';
import { InputAdornment, IconButton } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Fade from '@mui/material/Fade';




const images = [
    {
        func: false,
        url: '../../asset/File.svg',
        title: 'CYBER RANGES WIKI',
        width: '100%',
        height: '400px',
        href: '#'
    },
    {
        func: false,
        url: '../../asset/SOC.svg',
        title: 'SOC WIKI',
        width: '100%',
        height: '400px',
        href: '#'
    },
    {
        func: false,
        url: '../../asset/policy.png',
        title: 'POLICIES AND PROCEDURES',
        width: '100%',
        height: '400px',
        href: '#'
    },

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
        width: '100% !important',
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


function ElevatedNav(props) {
    const { children, window } = props;
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
    children: PropTypes.element.isRequired,
    window: PropTypes.func
};


const Home = () => {

    const [isModal, setIsModal] = useState(false)
    const genDocName = (values) => {
        let documentName = '';
        if (use === 'external') {

            const year = new Date().toLocaleDateString('en-US', {
                year: 'numeric',
            });
            const month = new Date().toLocaleDateString('en-US', {
                month: '2-digit',
            });
            const yearSliced = year.slice(-2);
            const documentNumber = Math.floor(Math.random() * 1000) + 1;
            const acrProject = data.project.split(' ');
            let acr;
            if (acrProject.length === 1 && acrProject[0].length <= 2) {

                acr = acrProject[0].toUpperCase();
            } else {

                acr = acrProject.map(word => word.charAt(0).toUpperCase()).join('');
            }
            documentName = `${data.company.toUpperCase()}-${month + yearSliced}-${acr}${documentNumber}-${data.docType.toUpperCase()}_v${data.version}`;
        } else if (data.use === 'internal') {

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
    const CustomWidthTooltip = styled(({ className, ...props }) => (
        <Tooltip {...props} classes={{ popper: className }} />
    ))({
        [`& .${tooltipClasses.tooltip}`]: {
            maxWidth: 600,
            textAlign: 'justify',
            fontSize: '24px'
        },
    });
    useEffect(() => {
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
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const AnimatedInfoIcon = styled(InfoIcon)`
        animation: heartbeat 1.5s infinite;

        @keyframes heartbeat {
            0% {
            transform: scale(1);
            }
            50% {
            transform: scale(1.2);
            }
            100% {
            transform: scale(1);
            }
        }
        `;
    return (
        <Fragment>
            <ElevatedNav>
                <AppBar sx={{ bgcolor: '#08154d' }}>
                    <Container>
                        <Toolbar disableGutters sx={{ justifyContent: 'center' }}>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontWeight: 800,
                                    letterSpacing: '.2rem',
                                    color: 'inherit',
                                    textDecoration: 'none',
                                }}
                            >
                                {!isMobile && (
                                    <Fragment>
                                        <img
                                            src="../../asset/B22.png"
                                            alt="Logo"
                                            height="50px"
                                            style={{ cursor: 'pointer' }}
                                            component="a"
                                            href="/"
                                        />
                                    </Fragment>
                                )}
                            </Typography>
                            {isMobile && (
                                <img
                                    src="../../asset/B22.png"
                                    alt="Logo"
                                    height="50px"
                                    style={{ cursor: 'pointer' }}
                                    component="a"
                                    href="/"
                                />
                            )}
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevatedNav>
            <Box
                position="relative"
                display="flex"
                flexDirection="row"
                flexWrap="wrap"
                alignContent="space-between"
                className="animated-box"
            >
                <Grid container spacing={6} justifyContent="center" p="100px 50px 50px" >
                    {images.map((image) => (
                        <Grid item xs={12} sm={6} md={4} key={image.title}>
                            {image.func === true
                                ? (
                                    <ImageButton
                                        onClick={() => openModal()}
                                        focusRipple
                                        style={{
                                            width: image.width,
                                            height: image.height
                                        }}
                                        component={motion.div}
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                        <ImageBackdrop className="MuiImageBackdrop-root" />
                                        <Image>
                                            <Typography
                                                component="span"
                                                variant="h6"
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

                                        href={image.href}
                                        target="_blank"
                                        style={{
                                            width: image.width,
                                            height: image.height
                                        }}
                                        component={motion.a}
                                        whileHover={{
                                            scale: 1.1,
                                            transition: { duration: 0.3 }
                                        }}
                                        whileTap={{ scale: 0.9 }}
                                    >
                                        <ImageSrc style={{ backgroundImage: `url(${image.url})` }} />
                                        <ImageBackdrop className="MuiImageBackdrop-root" />
                                        <Image>
                                            <Typography
                                                component="span"
                                                variant="h6"
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

                </Grid>
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
                                        } else if (!/^(\d+\.\d+)$/.test(version)) {
                                            errors.version = "Invalid version format. Version should be num.num, e.g., 1.2, 0.5, 4.6, etc...";
                                        }
                                    } else if (use === "internal") {
                                        if (!client) {
                                            errors.client = "Required";
                                        }
                                        if (!docType) {
                                            errors.docType = "Required";
                                        }
                                        if (!docNumber) {
                                            errors.docNumber = 'Required';
                                        } else if (!/^\d+$/.test(docNumber)) {
                                            errors.docNumber = 'Invalid document number format. Only integers are allowed, e.g., 123';
                                        }
                                        if (!version) {
                                            errors.version = "Required";
                                        } else if (!/^(\d+\.\d+)$/.test(version)) {
                                            errors.version = "Invalid version format. Version should be num.num, e.g., 1.2, 0.5, 4.6, etc...";
                                        }
                                    }
                                    console.log(errors)
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
                                    closeModal();
                                }}
                            >
                                {({ handleSubmit, isSubmitting, values, errors, touched }) => (
                                    <Box component="form" onSubmit={handleSubmit}>
                                        <Box>
                                            <Typography variant="h3">Choose Document Reference</Typography>
                                            <FormControl sx={{ width: '100%', mb: 1, mt: 1 }}>
                                                <InputLabel>Choose Document Reference</InputLabel>
                                                <Select value={use} label="Document Type" name="use" onChange={handleUseChange}>
                                                    <MenuItem value=""><i>Choose document reference...</i></MenuItem>
                                                    <MenuItem value="external">For External Use</MenuItem>
                                                    <MenuItem value="internal">For Internal Use</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Box>
                                        {use === 'external' && (
                                            <Box>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl fullWidth>
                                                            <InputLabel>Company</InputLabel>
                                                            <Select
                                                                value={company}
                                                                label="Company"
                                                                onChange={handleChangeCompany}
                                                                name="company"
                                                                error={Boolean(touched.company && errors.company)}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <CustomWidthTooltip
                                                                            TransitionComponent={Fade}
                                                                            TransitionProps={{ timeout: 600 }}
                                                                            title={
                                                                                <Typography>
                                                                                    This the company name the document is assocciated with. For example, if you are creating an RFP for CYBER RANGES, Choose CYBER RANGES.
                                                                                    <br />
                                                                                    <hr />
                                                                                    Only two options available.
                                                                                    <ul>
                                                                                        <li>CYBER RANGES</li>
                                                                                        <li>Silensec</li>
                                                                                    </ul>
                                                                                </Typography>
                                                                            }
                                                                            placement="right-end"
                                                                        >
                                                                            <IconButton size="small" style={{ marginRight: '10px' }}>
                                                                                <AnimatedInfoIcon />
                                                                            </IconButton>
                                                                        </CustomWidthTooltip>
                                                                    </InputAdornment>
                                                                }
                                                            >
                                                                <MenuItem value=""><i>Choose company...</i></MenuItem>
                                                                <MenuItem value="SIL">Silensec</MenuItem>
                                                                <MenuItem value="CR">CYBER RANGES</MenuItem>
                                                            </Select>

                                                            {touched.company && errors.company && (
                                                                <FormHelperText error>
                                                                    {errors.company}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>

                                                    <Grid item xs={12} sm={6} sx={{ position: 'relative' }}>
                                                        <FormControl fullWidth>
                                                            <InputLabel>Document Type</InputLabel>
                                                            <Select
                                                                value={docType}
                                                                label="Document Type"
                                                                onChange={handleChangeDocType}
                                                                name="docType"
                                                                error={Boolean(touched.docType && errors.docType)}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <CustomWidthTooltip
                                                                            TransitionComponent={Fade}
                                                                            TransitionProps={{ timeout: 600 }}
                                                                            title={
                                                                                <Typography>
                                                                                    This the document type, which can be any of the following:
                                                                                    <br />
                                                                                    <ul>
                                                                                        <li><b>Proposal of Work</b>: <i>These are documents issued to Silensec Company containing Silensec's proposal of work to meet specific company requirements. (May include, in some cases, the related financial details)</i></li>
                                                                                        <li><b>Legal Documents</b>: <i>These represent any document legally binding between Silensec/CYBER RANGES and a company for the provision of professional services or sales of products. (E.g., Contracts, General Terms and Agreements)</i></li>
                                                                                        <li><b>Letter of Authorization</b>: <i>This is a form that is filled in and signed by a company for whom Silensec is performing a security audit, which involves ethical hacking activities (i.e., activities that are forbidden by law and for which the company has to provide explicit consent).</i></li>
                                                                                        <li><b>Non-Disclosure Agreement</b>: <i>It is a legally binding contract between two or more parties that outlines confidential information they wish to share with each other while restricting its disclosure to third parties.</i></li>
                                                                                        <li><b>Reports</b>: <i>These are reports generated by Silensec as part of the work carried out for a company (e.g., Audit Reports)</i></li>
                                                                                        <li><b>Document</b>: <i>This refers to a generic document that does not fall into any of the above categories.</i></li>
                                                                                    </ul>
                                                                                </Typography>
                                                                            }
                                                                            placement="right-end"

                                                                        >
                                                                            <IconButton size="small" style={{ marginRight: '10px' }}>
                                                                                <AnimatedInfoIcon />
                                                                            </IconButton>
                                                                        </CustomWidthTooltip>
                                                                    </InputAdornment>
                                                                }
                                                            >
                                                                <MenuItem value=""><i>Choose the document type...</i></MenuItem>
                                                                <MenuItem value="POW">Proposal of Work</MenuItem>
                                                                <MenuItem value="LGL">Legal Documents</MenuItem>
                                                                <MenuItem value="LOA">Letter of Authorization</MenuItem>
                                                                <MenuItem value="NDA">Non-Disclosure Agreement</MenuItem>
                                                                <MenuItem value="REP">Reports</MenuItem>
                                                                <MenuItem value="DOC">Generic Document</MenuItem>
                                                            </Select>
                                                            {touched.docType && errors.docType && (
                                                                <FormHelperText error>
                                                                    {errors.docType}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl fullWidth>
                                                            <TextField
                                                                name="project"
                                                                variant="outlined"
                                                                label="Project"
                                                                onChange={handleChangeProject}
                                                                value={project}
                                                                error={Boolean(touched.project && errors.project)}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <CustomWidthTooltip
                                                                                TransitionComponent={Fade}
                                                                                TransitionProps={{ timeout: 600 }}
                                                                                title={
                                                                                    <Typography>
                                                                                        This the <b>full name</b> of the project. For example:
                                                                                        <ul>
                                                                                            <li>NCBA Cyberdrill</li>
                                                                                            <li>UBF Cyberdrill</li>
                                                                                            <li>Etc...</li>
                                                                                        </ul>


                                                                                        <hr />
                                                                                        The system will auto-abbreviatte the above name, however you can also provide the abbreviatted name.
                                                                                        <br />
                                                                                        <br />
                                                                                        For example, <b>NCBA Cyberdrill</b>, will be abbreviatted to <b><i>NC</i></b>
                                                                                    </Typography>
                                                                                }
                                                                                placement="right-end"
                                                                                sx={{ fontSize: 24 }}>
                                                                                <IconButton size="small">
                                                                                    <AnimatedInfoIcon />
                                                                                </IconButton>
                                                                            </CustomWidthTooltip>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            {touched.project && errors.project && (
                                                                <FormHelperText error>
                                                                    {errors.project}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl fullWidth>
                                                            <TextField
                                                                name="version"
                                                                variant="outlined"
                                                                label="Version"
                                                                onChange={handleChangeVersion}
                                                                value={version}
                                                                error={Boolean(touched.version && errors.version)}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <CustomWidthTooltip
                                                                                TransitionComponent={Fade}
                                                                                TransitionProps={{ timeout: 600 }}
                                                                                title={
                                                                                    <Typography>
                                                                                        This the <b>version number</b> of the document.
                                                                                        <br />
                                                                                        <br />
                                                                                        For example:
                                                                                        <ul>
                                                                                            <li>0.1</li>
                                                                                            <li>0.2</li>
                                                                                            <li>Etc...</li>
                                                                                        </ul>

                                                                                    </Typography>
                                                                                }
                                                                                placement="right-end"
                                                                            >
                                                                                <IconButton size="small">
                                                                                    <AnimatedInfoIcon />
                                                                                </IconButton>
                                                                            </CustomWidthTooltip>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            {touched.version && errors.version && (
                                                                <FormHelperText error>
                                                                    {errors.version}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                </Grid>
                                            </Box>
                                        )}
                                        {use === 'internal' && (
                                            <Box>
                                                <Grid container spacing={2}>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl sx={{ width: '100%', mb: 1, mt: 1 }}>
                                                            <InputLabel>Client Name</InputLabel>
                                                            <Select
                                                                value={client}
                                                                label="Client Name"
                                                                onChange={handleChangeClientName}
                                                                name="client"
                                                                error={Boolean(touched.client && errors.client)}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <CustomWidthTooltip
                                                                            TransitionComponent={Fade}
                                                                            TransitionProps={{ timeout: 600 }}
                                                                            title={
                                                                                <Typography>
                                                                                    This the company name the document is associated with. For example, if you are creating an RFP for CYBER RANGES, Choose CYBER RANGES.
                                                                                    <br />
                                                                                    <hr />
                                                                                    Only two options available.
                                                                                    <ul>
                                                                                        <li>CYBER RANGES</li>
                                                                                        <li>Silensec</li>
                                                                                    </ul>
                                                                                </Typography>
                                                                            }
                                                                            placement="right-end"
                                                                        >
                                                                            <IconButton size="small" style={{ marginRight: '10px' }}>
                                                                                <AnimatedInfoIcon />
                                                                            </IconButton>
                                                                        </CustomWidthTooltip>
                                                                    </InputAdornment>
                                                                }
                                                            >
                                                                <MenuItem value=""><i>Choose company...</i></MenuItem>
                                                                <MenuItem value="SIL">Silensec</MenuItem>
                                                                <MenuItem value="CR">CYBER RANGES</MenuItem>
                                                            </Select>
                                                            {touched.client && errors.client && (
                                                                <FormHelperText error>
                                                                    {errors.client}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6} sx={{ width: '100%' }}>
                                                        <FormControl sx={{ width: '100%', mb: 1, mt: 1 }}>
                                                            <InputLabel>Document Type</InputLabel>
                                                            <Select
                                                                value={docType}
                                                                label="Document Type"
                                                                onChange={handleChangeDocType}
                                                                name="docType"
                                                                error={Boolean(touched.docType && errors.docType)}
                                                                endAdornment={
                                                                    <InputAdornment position="end">
                                                                        <CustomWidthTooltip
                                                                            TransitionComponent={Fade}
                                                                            TransitionProps={{ timeout: 600 }}
                                                                            title={
                                                                                <Typography>
                                                                                    This the document type, which can be any of the following:
                                                                                    <br />
                                                                                    <ul>
                                                                                        <li><b>Policy</b>: <i>This identifies Silensec/CYBER RANGES Policies such as the Information Security Policy, the Incident Management Policy, etc.</i></li>
                                                                                        <li><b>Procedure</b>: <i>This identifies Silensec/CYBER RANGES Procedures, for example: Incident Response Procedure, etc. As well as any other internal document that is not a policy.</i></li>
                                                                                        <li><b>Template</b>: <i>This identifies a document template to be used for the creation of new documents.</i></li>
                                                                                        <li><b>Record</b>: <i>This identifies Silensec/CYBER RANGES company records. Examples include backup schedule, log schedule, risk assessment reports, etc.</i></li>
                                                                                    </ul>
                                                                                </Typography>
                                                                            }
                                                                            placement="right-end"
                                                                            >
                                                                            <IconButton size="small" style={{ marginRight: '10px' }}>
                                                                                <AnimatedInfoIcon />
                                                                            </IconButton>
                                                                        </CustomWidthTooltip>
                                                                    </InputAdornment>
                                                                }
                                                            >
                                                                <MenuItem value=""><i>Choose the document type...</i></MenuItem>
                                                                <MenuItem value="POL">Policy</MenuItem>
                                                                <MenuItem value="PRO">Procedure</MenuItem>
                                                                <MenuItem value="TPL">Template</MenuItem>
                                                                <MenuItem value="REC">Record</MenuItem>
                                                            </Select>
                                                            {touched.docType && errors.docType && (
                                                                <FormHelperText error>
                                                                    {errors.docType}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl sx={{ width: '100%', mb: 1, mt: 1 }}>
                                                            <TextField
                                                                name="docNumber"
                                                                variant="outlined"
                                                                label="Document Number"
                                                                onChange={handleChangeDocNumber}
                                                                value={docNumber}
                                                                error={Boolean(touched.docNumber && errors.docNumber)}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <CustomWidthTooltip
                                                                                TransitionComponent={Fade}
                                                                                TransitionProps={{ timeout: 600 }}
                                                                                title={
                                                                                    <Typography>
                                                                                        This is a unique numerical identifier, identifying the document of record. The same numerical idenifier can be used for:
                                                                                        <ul>
                                                                                            <li>Documents</li>
                                                                                            <li>Records</li>
                                                                                        </ul>
                                                                                        <i>e.g., SIL-D-001 and SIL-R-001</i>
                                                                                        <br />
                                                                                        As such, provide a number/integer in the input field
                                                                                        <ul>
                                                                                            <li>1234</li>
                                                                                            <li>Etc...</li>
                                                                                        </ul>
                                                                                    </Typography>
                                                                                }
                                                                                placement="right-end"
                                                                            >
                                                                                <IconButton size="small">
                                                                                    <AnimatedInfoIcon />
                                                                                </IconButton>
                                                                            </CustomWidthTooltip>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            {touched.docNumber && errors.docNumber && (
                                                                <FormHelperText error>
                                                                    {errors.docNumber}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl></Grid>
                                                    <Grid item xs={12} sm={6}>
                                                        <FormControl sx={{ width: '100%', mb: 1, mt: 1 }}>
                                                            <TextField
                                                                name="version"
                                                                variant="outlined"
                                                                label="Version"
                                                                onChange={handleChangeVersion}
                                                                value={version}
                                                                error={Boolean(touched.version && errors.version)}
                                                                InputProps={{
                                                                    endAdornment: (
                                                                        <InputAdornment position="end">
                                                                            <CustomWidthTooltip
                                                                                TransitionComponent={Fade}
                                                                                TransitionProps={{ timeout: 600 }}
                                                                                title={
                                                                                    <Typography>
                                                                                        This the <b>version number</b> of the document.
                                                                                        <br />
                                                                                        <br />
                                                                                        For example:
                                                                                        <ul>
                                                                                            <li>0.1</li>
                                                                                            <li>0.2</li>
                                                                                            <li>Etc...</li>
                                                                                        </ul>

                                                                                    </Typography>
                                                                                }
                                                                                placement="right-end"
                                                                            >
                                                                                <IconButton size="small">
                                                                                    <AnimatedInfoIcon />
                                                                                </IconButton>
                                                                            </CustomWidthTooltip>
                                                                        </InputAdornment>
                                                                    ),
                                                                }}
                                                            />
                                                            {touched.version && errors.version && (
                                                                <FormHelperText error>
                                                                    {errors.version}
                                                                </FormHelperText>
                                                            )}
                                                        </FormControl></Grid>
                                                </Grid>
                                            </Box>

                                        )}
                                        {(data.use === 'external') &&
                                            <Button type="submit" disabled={isSubmitting} variant="contained"
                                                component={motion.button}
                                                whileHover={{
                                                    scale: 1.1,
                                                    transition: { duration: 0.3 }
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                transition={{ type: "spring", duration: 0.5 }}
                                            >
                                                Submit
                                            </Button>}
                                        {(data.use === 'internal') &&
                                            <Button type="submit" disabled={isSubmitting} variant="contained"
                                                component={motion.button}

                                                whileHover={{
                                                    scale: 1.1,
                                                    transition: { duration: 0.3 }
                                                }}
                                                whileTap={{ scale: 0.9 }}
                                                transition={{ type: "spring", duration: 0.5 }}
                                                
                                            >
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
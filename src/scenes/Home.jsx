import AppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import { Fragment, cloneElement, useEffect, useState } from 'react';
import { useScrollTrigger } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import { styled } from '@mui/material/styles';
import ButtonBase from '@mui/material/ButtonBase';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';

const pages = ['WIKIS']
const wikis = [
    {
        title: 'Latest App Release',
        url: 'https://docs.cyberranges.com/doc/cyber-ranges-app-r2023-02-5SDRU3DBdw', //subjec to change
    },
    {
        title: '24/7 Operations',
        url: 'https://wiki.soctools.silensec.com/doc/247-soc-SizUSeSVe5',
    },
    {
        title: 'CR Use Cases',
        url: 'https://wiki.soctools.silensec.com/doc/cyber-ranges-use-cases-cdFHFCaNbK',
    },
    {
        title: 'CR Changelog',
        url: 'https://docs.cyberranges.com/doc/cr-changelog-skw7qoSQmh',
    },
]

const images = [
    {
        url: '../../asset/File.svg',
        title: 'CYBER RANGES WIKI',
        width: '50%',
        height: '400px',
        href: 'https://docs.cyberranges.com/collection/cyber-ranges-wiki-8xv2PHAmAO'
    },
    {
        url: '../../asset/SOC.svg',
        title: 'SOC WIKI',
        width: '50%',
        height: '400px',
        href: 'https://wiki.soctools.silensec.com/home'
    },
]
const ImageButton = styled(ButtonBase)(({ theme }) => ({
    position: 'relative',
    height: 200,
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
    width: 18,
    backgroundColor: theme.palette.common.white,
    position: 'absolute',
    bottom: -2,
    left: 'calc(50% - 9px)',
    transition: theme.transitions.create('opacity'),
}));

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


const Home = () => {
    const [anchorNav, setAnchorNav] = useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorNav(event.currentTarget)
    };
    const handleCloseNavMenu = () => {
        setAnchorNav(null);
    }
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

    const [state, setState] = useState({
        right: false
    });
    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState({ ...state, [anchor]: open })
    }
    const list = (anchor) => (
        <Box sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
            role="presentation"
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
        >
            <List>
                {wikis.map((wiki, index) => {
                    {console.log(wiki.title)}
                    <ListItem key={wiki.title} disablePadding>
                        <ListItemButton href={wiki.url}>
                        {wiki.title}
                            <ListItemIcon href={wiki.url}>
                               {wiki.title}
                            </ListItemIcon>
                            <ListItemText primary={wiki.title} />
                        </ListItemButton>
                    </ListItem>
                }
                )}
            </List>
        </Box>
    )

    return (
        <Fragment>
            <ElevatedNav>
                <AppBar sx={{ bgcolor: "#08154d" }}>
                    <Container>
                        <Toolbar disableGutters>
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
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton size="large" aria-label="account of current user" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleOpenNavMenu} color="inherit">
                                    <MenuIcon />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchor={anchorNav}
                                    anchorOrigin={{
                                        vertical: 'bottom',
                                        horizontal: 'left',
                                    }}
                                    keepMounted
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'left',
                                    }}
                                    open={Boolean(anchorNav)}
                                    onClose={handleCloseNavMenu}
                                    sx={{
                                        display: { xs: 'block', md: 'none' },
                                    }}
                                >

                                    <MenuItem onClick={handleCloseNavMenu}>
                                        {['right'].map((anchor) => (
                                            <Fragment key={anchor}>
                                                <Typography textAlign="center" onClick={toggleDrawer(anchor, true)}>Wikis</Typography>
                                                <Drawer
                                                    anchor={anchor}
                                                    open={state[anchor]}
                                                    onClose={toggleDrawer(anchor, false)}
                                                >
                                                    {list('right')}
                                                </Drawer>
                                            </Fragment>
                                        ))}

                                    </MenuItem>

                                </Menu>
                            </Box>
                            <Typography variant="h5" noWrap component="a" href="" sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.2rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                            >
                                Silensec
                            </Typography>
                            <Box sx={{ flexGrow: 2, display: { xs: 'none', md: 'flex' } }}>
                                {['right'].map((anchor) => (
                                    <Fragment key={anchor}>
                                        <Button onClick={toggleDrawer(anchor, true)} sx={{ my: 2, color: 'white', display: 'block' }}>
                                            Wikis
                                        </Button>
                                        <Drawer
                                            anchor={anchor}
                                            open={state[anchor]}
                                            onClose={toggleDrawer(anchor, false)}
                                        >
                                            {list(anchor)}
                                        </Drawer>
                                    </Fragment>
                                ))}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevatedNav>
            {/* <Container> */}

            <Box id="section1" p="50px" position='relative' display="flex" flexDirection="row" flexWrap="wrap" alignContent="space-between" className="animated-box"
            // sx={{
            //     //background: `url('../../asset/sv1.svg')`,
            //     //aspectRatio: 250 / 250,
            //     backgroundRepeat: 'no-repeat',
            //     backgroundPosition: 'center',
            //     backgroundSize: 'auto',
            //     overflowX: 'hidden'
            // }}
            >


                <Box p="100px" sx={{ display: 'flex', flexWrap: 'wrap', minWidth: 300, width: '100%' }} className="animated-box" justifyContent="center">
                    {images.map((image) => (
                        <ImageButton
                            focusRipple
                            key={image.title}
                            justifyContent="space-between"
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
                                    variant="h3"
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
            </Box>
        </Fragment>
    )
}
export default Home
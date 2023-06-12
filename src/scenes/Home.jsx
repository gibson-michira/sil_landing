import AppBar from '@mui/material/AppBar';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Fragment, cloneElement, useEffect, useState } from 'react';
import { useScrollTrigger } from '@mui/material';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';

const pages = ['FAQ', 'How to Use']

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
    useEffect(() => {
        const boxes = document.querySelectorAll('.animated-box');
        const observer = new IntersectionObserver((entries) =>{
            entries.forEach((entry) =>{
                if(entry.isIntersecting){
                    entry.target.classList.add('animate');
                }else{
                    entry.target.classList.remove('animate');
                }
            })
        })
        const hiddenElements = document.querySelectorAll('.animated-box');
        hiddenElements.forEach((el) => observer.observe(el))
    })

    return (
        <Fragment>
            <ElevatedNav>
                <AppBar sx={{ bgcolor: "#08154d" }}>
                    <Container>
                        <Toolbar disableGutters>
                            <Typography
                                variant="h6"
                                noWrap
                                component="a"
                                href="/"
                                sx={{
                                    mr: 2,
                                    display: { xs: 'none', md: 'flex' },
                                    fontFamily: 'monospace',
                                    fontWeight: 800,
                                    letterSpacing: '.2rem',
                                    color: 'inherit',
                                    textDecoration: 'none'

                                }}
                            >
                                Silensec
                            </Typography>
                            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                                <IconButton
                                    size="large"
                                    aria-label="account of current user"
                                    aria-controls="menu-appbar"
                                    aria-haspopup="true"
                                    onClick={handleOpenNavMenu}
                                    color="inherit"
                                >
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
                                    {pages.map((page) => (
                                        <MenuItem key={page} onClick={handleCloseNavMenu}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </Box>
                            <Typography
                                variant="h5"
                                noWrap
                                component="a"
                                href=""
                                sx={{
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
                                {pages.map((page) => (
                                    <Button
                                        key={page}
                                        onClick={handleCloseNavMenu}
                                        sx={{ my: 2, color: 'white', display: 'block' }}
                                    >
                                        {page}
                                    </Button>
                                ))}
                            </Box>
                        </Toolbar>
                    </Container>
                </AppBar>
            </ElevatedNav>
            {/* <Container> */}


            <Box 
                p="2px 20vw"
                position='relative'
                minHeight="50vh"
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                sx={{
                    background: `url('../../asset/sv2.svg')`,
                    aspectRatio: 500/500,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    overflowX: 'hidden'
                }}
            >
                <Box className="animated-box"
                    p={2}
                    bgcolor="rgba(0, 0, 0, 0.5)"
                    borderRadius={4}
                    textAlign="cover"
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        color="white"
                    >
                        {[...new Array(3)]
                            .map(
                                () => `
                                    Cras mattis consectetur purus sit amet fermentum.
                                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                    `,
                            )
                            .join('\n')}
                    </Typography>
                </Box>


            </Box>
            {/* </Container> */}


            <Box 
                p="2px 20vw"
                minHeight="50vh"
                display="grid"
                justifyContent="center"
                alignItems="center"
                sx={{
                    background: `url('../../asset/sv1.svg')`,
                    aspectRatio: 500/500,
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    overflowX: 'hidden'
                }}
            >
                <Box className="animated-box"
                    p={2}
                    bgcolor="rgba(0, 0, 0, 0.5)"
                    borderRadius={4}
                    textAlign="center"
                >
                    <Typography
                        variant="h4"
                        component="h2"
                        color="white"
                    >
                        {[...new Array(3)]
                            .map(
                                () => `
                                    Cras mattis consectetur purus sit amet fermentum.
                                    Cras justo odio, dapibus ac facilisis in, egestas eget quam.
                                    Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
                                    Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                                    `,
                            )
                            .join('\n')}
                    </Typography>
                </Box>


            </Box>
        </Fragment>
    )
}
export default Home
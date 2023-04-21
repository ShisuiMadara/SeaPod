import React, { useState } from "react";
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AppBar from '@mui/material/AppBar';
import { Link, useNavigate } from "react-router-dom";

const pages = [['Home 🏠', '/'], ['Notifications 🔔', '/notifications'], ['Upload ⬆️', '/upload']];
const settings = ['Account', 'Logout'];
const settings3 = [['Account', '/account'], ['Logout', '/logout']];
const settings2 = [['Login', '/login']]

function ProfileButton(){
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [data, setData] = useState(settings2);
    const navigate = useNavigate();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleButtonPress = (event) =>{
        if (!localStorage.getItem('token')){
            setData(settings2);
        }
        else setData(settings3);
        handleOpenUserMenu(event);
    }
    const handleMenuPress = (dat)=>{
        navigate(dat);
    }

    return(
        <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <Button variant="contained" onClick={handleButtonPress} color="warning">
                            <Typography color={"white"} textAlign="center" textTransform={'none'}>Profile</Typography>
                        </Button>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                    {data.map((dat) => (
                        <MenuItem key={dat[0]} onClick={(e)=>{handleMenuPress(dat[1]); handleCloseUserMenu(e)}}>
                            <Typography textAlign="center">{dat[0]}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box>
    );
}

function NavBar(){
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

    const handleMenuPress = (dat)=>{
        navigate(dat);
    }

  return (
    <AppBar position="static">
        <Container maxWidth="xl">
            <Toolbar disableGutters>
                <Typography
                    variant="h6"
                    noWrap
                    component={Link}
                    to="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'none', md: 'flex' },
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                    flexGrow: 0,
                    textTransform: 'capitalize'
                    }}
                >
                    Stream
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
                        anchorEl={anchorElNav}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left',
                        }}
                        open={Boolean(anchorElNav)}
                        onClose={handleCloseNavMenu}
                        sx={{
                            display: { xs: 'block', md: 'none' },
                        }}
                    >
                        {pages.map((page) => (
                            <MenuItem key={page[0]} onClick={()=>{handleMenuPress(page[1]); handleCloseNavMenu();}}>
                                <Typography textAlign="center">{page[0]}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </Box>                
                <Typography
                    variant="h5"
                    noWrap
                    component={Link}
                    to="/"
                    sx={{
                    mr: 2,
                    display: { xs: 'flex', md: 'none' },
                    flexGrow: 1,
                    fontWeight: 700,
                    color: 'inherit',
                    textDecoration: 'none',
                    }}
                >
                    Stream
                </Typography>
                <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } , ml: 2}}>
                    {pages.map((page) => (
                    <Button
                        LinkComponent={Link}
                        variant="contained"
                        color="warning"
                        key={page[0]}
                        onClick={handleCloseNavMenu}
                        sx={{ mx:0.5, p:0.7, my: 2, color: 'white', display: 'block' }}
                        to={page[1]}
                    >
                        <Typography color={"white"} textAlign="center" textTransform={'none'}>{page[0]}</Typography>
                    </Button>
                    ))}
                </Box>
                <ProfileButton/>
                {/* <Box sx={{ flexGrow: 0 }}>
                    <Tooltip title="Open settings">
                        <Button variant="contained" onClick={handleOpenUserMenu} color="warning">
                            <Typography color={"white"} textAlign="center" textTransform={'none'}>Profile</Typography>
                        </Button>
                    </Tooltip>
                    <Menu
                        sx={{ mt: '45px' }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'right',
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                    {settings.map((setting) => (
                        <MenuItem key={setting} onClick={handleCloseUserMenu}>
                        <Typography textAlign="center">{setting}</Typography>
                        </MenuItem>
                    ))}
                    </Menu>
                </Box> */}
            </Toolbar>
        </Container>
    </AppBar>
  );
}

export default NavBar
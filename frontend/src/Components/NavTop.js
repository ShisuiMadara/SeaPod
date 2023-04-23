import React, { useState } from "react";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Menu from "@mui/material/Menu";
import MenuIcon from "@mui/icons-material/Menu";
import Container from "@mui/material/Container";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import AppBar from "@mui/material/AppBar";
import { Link, useNavigate } from "react-router-dom";
import jwt from "jwt-decode";

let page = [["Home 🏠", "/"]];
if (localStorage.getItem("token") && jwt(localStorage.getItem("token")).admin) {
    page = [
        ["Home 🏠", "/"],
        ["Upload ⬆️", "/upload"],
    ];
}
const settings = [
    ["Account", "/account"],
    ["Logout", "/logout"],
];

function ProfileButton() {
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [data, setData] = useState(settings);
    const navigate = useNavigate();
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };
    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };
    const handleButtonPress = (event) => {
        setData(settings);
        handleOpenUserMenu(event);
    };
    const handleMenuPress = (dat) => {
        navigate(dat);
    };

    return (
        <Box sx={{ flexGrow: 0 }}>
            {localStorage.getItem("token") ? (
                <>
                    <Tooltip title="Open settings">
                        <button
                            className="p-2 rounded pl-5 pr-5 bg-sky-500 hover:bg-sky-700"
                            onClick={handleButtonPress}
                        >
                            <Typography color={"white"} textAlign="center" textTransform={"none"}>
                                Profile
                            </Typography>
                        </button>
                    </Tooltip>
                    <Menu
                        sx={{ mt: "45px" }}
                        id="menu-appbar"
                        anchorEl={anchorElUser}
                        anchorOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        keepMounted
                        transformOrigin={{
                            vertical: "top",
                            horizontal: "right",
                        }}
                        open={Boolean(anchorElUser)}
                        onClose={handleCloseUserMenu}
                    >
                        {data.map((dat) => (
                            <MenuItem
                                key={dat[0]}
                                onClick={(e) => {
                                    handleMenuPress(dat[1]);
                                    handleCloseUserMenu(e);
                                }}
                            >
                                <Typography textAlign="center">{dat[0]}</Typography>
                            </MenuItem>
                        ))}
                    </Menu>
                </>
            ) : (
                <button className="p-2 rounded pl-5 pr-5 bg-sky-500 hover:bg-sky-700" onClick={() => handleMenuPress("/login")}>Login</button>
            )}
        </Box>
    );
}

function NavBar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const pages = page;
    const navigate = useNavigate();
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleMenuPress = (dat) => {
        navigate(dat);
    };

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
                            display: { xs: "none", md: "flex" },
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                            flexGrow: 0,
                            textTransform: "capitalize",
                            fontFamily: "serif",
                        }}
                    >
                        SEAPOD
                    </Typography>

                    <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
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
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{
                                display: { xs: "block", md: "none" },
                            }}
                        >
                            {pages.map((page) => (
                                <MenuItem
                                    key={page[0]}
                                    onClick={() => {
                                        handleMenuPress(page[1]);
                                        handleCloseNavMenu();
                                    }}
                                >
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
                            display: { xs: "flex", md: "none" },
                            flexGrow: 1,
                            fontWeight: 700,
                            color: "inherit",
                            textDecoration: "none",
                        }}
                    >
                        Stream
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" }, ml: 2 }}>
                        {pages.map((page) => (
                            <Link
                                LinkComponent={Link}
                                key={page[0]}
                                onClick={handleCloseNavMenu}
                                to={page[1]}
                                className="p-2 pl-5 pr-5 bg-sky-500 hover:bg-sky-700 border-1 ml-2 rounded shadow text-base"
                            >
                                {page[0]}
                            </Link>
                        ))}
                    </Box>
                    <ProfileButton />
                </Toolbar>
            </Container>
        </AppBar>
    );
}

export default NavBar;



import React, { Component, useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import image from '../../assets/signup.jpeg'
import { useNavigate,Link } from 'react-router-dom';

function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate=useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    let newErrors = {};

    if (!formData.firstName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.firstName = "Enter a valid first name";
    }

    if (!formData.lastName.match(/^[A-Za-z]{2,}$/)) {
      newErrors.lastName = "Enter a valid last name";
    }

    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "Email must end with @gmail.com";
    }

    if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      navigate('/');
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#f5f5f5",
      }}
    >

      <Card sx={{ width: 900, padding: 3 }}>
        <CardContent>
          <Box sx={{ display: "flex" }}>
            <Box sx={{ flex: 1, pr: 4 }}>
              <Typography sx={{ color: 'blue', fontSize: '28px', fontWeight: 'bold' }} textAlign="start">
                Fundoo
              </Typography>
              <Typography sx={{ fontWeight: 'bold', color: 'black', fontSize: '25px' }} textAlign="start">
                Create your Fundoo Account
              </Typography>
              <Box
                sx={{
                  mt: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField sx={{
                  pl: 0,
                  fontSize: "13px",
                  textTransform: "none",
                  color: "#1a73e8",
                  fontWeight: 500,
                  width: '250px'
                }}
                  label="First Name"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  error={!!errors.firstName}
                  helperText={errors.firstName}
                  variant="outlined"
                  margin="normal"
                />
                <TextField sx={{
                  pl: 0,
                  ml: 5,
                  fontSize: "13px",
                  textTransform: "none",
                  color: "#1a73e8",
                  fontWeight: 500,
                  width: '250px'
                }}
                  label="Last Name"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  error={!!errors.lastName}
                  helperText={errors.lastName}
                  variant="outlined"
                  fullWidth
                  margin="normal"
                />


              </Box>
              <TextField
                sx={{
                  width: '540px'
                }}
                label="Enter Your Email Address"
                variant="outlined"
                name="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                margin="normal"
              />
              <Typography sx={{ pl: '0', ml: 0, fontSize: '13px', color: 'text.secondary' }}>
                use only letters,numbers and periods
              </Typography>

              <Box
                sx={{
                  mt: 0,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <TextField sx={{
                  pl: 0,
                  fontSize: "13px",
                  textTransform: "none",
                  color: "#1a73e8",
                  fontWeight: 500,
                  width: '250px'
                }}
                  label="Password"
                  type="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  error={!!errors.password}
                  helperText={errors.password}
                />
                <TextField
                  sx={{
                    pl: 0,
                    ml: 5,
                    fontSize: "13px",
                    textTransform: "none",
                    color: "#1a73e8",
                    fontWeight: 500,
                    width: '250px'
                  }}
                  label="Confirm Password"
                  varian="outline"
                  margin="normal"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword}

                />

              </Box>
              <Typography sx={{ pl: '0', ml: 0, fontSize: '15px', color: 'text.secondary' }}>
                use 8 or more characters with a mix of letters, numbers & <br />symbols
              </Typography>
              <Box
                sx={{
                  mt: 6,
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <Button

                  sx={{
                    pl: 0,
                    fontSize: "13px",
                    textTransform: "none",
                    color: "#1a73e8",
                    fontWeight: 500,
                  }}
                  component={Link} to="/SignIn"
                >
                  SIGN IN INSTEAD
                </Button>

                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  sx={{
                    width: "150px",
                    ml: '260px',
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            </Box>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img
              src={image}
              alt="Fundoo"
              style={{ width: "250px", marginBottom: "18px" }}
            />

            <Typography variant="body2" color="text.secondary" align="center">
              One account. All of Fundoo working for you
            </Typography>
          </Box>
          
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}


export default Signup;

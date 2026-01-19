// import React, { Component } from "react";
// import {
//   Box,
//   Card,
//   CardContent,
//   Typography,
//   Button,
//   TextField,
// } from "@mui/material";
// import GoogleIcon from "@mui/icons-material/Google";
// import { useNavigate,Link } from "react-router-dom";
// import api from "../../services/Api";
// function SignIn(){
   
//   return (
//       <Box
//         sx={{
//           minHeight: "100vh",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           backgroundColor: "#f5f5f5",
//         }}
//       >
//         <Card sx={{ width: 400, padding: 3 }}>
//           <CardContent>
//             <Typography sx={{color:'blue',fontWeight:'bold',fontSize:'30px',mb:0,opacity:0.7,pb:0 }}variant="h5" textAlign="center" gutterBottom>
//               Fundoo
//             </Typography>

//             <Typography sx={{fontWeight:'bold',fontSize:'25px',mt:0}}variant="h6" textAlign="center" gutterBottom>
//               Sign in
//             </Typography>

//             <Typography
//               variant="body2"
//               color="text.secondary"
//               textAlign="center"
//               sx={{ mb: 3 }}
//             >
//               to continue to FunDoo
//             </Typography>
           
//           <TextField
//               label="Email or phone"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//           />
//             <Typography sx={{pl:'0',ml:0,fontSize:'12px',color:'text.secondary'}}>
//               use only letters,numbers and periods
//             </Typography>
//             <TextField
//               label="Password"
//               variant="outlined"
//               fullWidth
//               margin="normal"
//             />
// <Typography sx={{pl:'0',ml:0,fontSize:'12px',color:'text.secondary'}}>
//               Forgot password
//             </Typography>

//             <Box
//   sx={{
//     mt: 5,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//   }}
// >
//   <Button
//     sx={{
//       pl: 0,
//       fontSize: "13px",
//       textTransform: "none",
//       color: "#1a73e8",
//       fontWeight: 500,
//     }}
//     component={Link} to="/signup"
//   >
//     Back to signup?
//   </Button>
//   <Button
//     variant="contained"
//     sx={{
//       width: "40%",
//     }}
//   >
//     Sign in
//   </Button>
// </Box>

//           </CardContent>
//         </Card>
//       </Box>
//     );
//   }


// export default SignIn;

import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";

import React, { useState } from "react";

import api from "../../services/Api";

import { useNavigate, Link } from "react-router-dom";
function SignIn() {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };


  const handleSubmit = async () => {
    let newErrors = {};

    if (!formData.email.endsWith("@gmail.com")) {
      newErrors.email = "email must end with @gmail.com*";
    }

    if (formData.password.length < 8) {
      newErrors.password = "password must be at least 8 characters*";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const res = await api.get(
        `/users?email=${formData.email}&password=${formData.password}`
      );

      if (res.data.length === 1) {
        localStorage.setItem("loggedInUser", JSON.stringify(res.data[0]));
        navigate("/");
      } else {
        setErrors({ password: "Invalid email or password*" });
      }
    } catch (err) {
      console.error(err);
    }
  };


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
      }}
    >
      <Card sx={{ width: 420 }}>
        <CardContent sx={{ p: 4 }}>

          {/* Header */}
          <Typography
            variant="h6"
            sx={{ color: "#1a73e8", fontWeight: 600 }}
            textAlign="center"
          >
            Fundoo
          </Typography>

          <Typography variant="h5" sx={{ mt: 1 }} textAlign="center">
            Sign in
          </Typography>

          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 3 }}
            textAlign="center"
          >
            to continue to Fundoo
          </Typography>

          {/* Email */}
          <TextField
            fullWidth
            label="Your email address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            sx={{ mb: 0.5 }}
          />

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 2, display: "block" }}
          >
            use only letters, numbers & periods
          </Typography>

          {/* Password */}
          <TextField
            fullWidth
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            error={!!errors.password}
            helperText={errors.password}
          />

          <Typography
            variant="caption"
            color="text.secondary"
            sx={{ mb: 3, display: "block" }}
          >
            use only letters, numbers & periods
          </Typography>

          {/* Actions */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
            }}
          >
            <Button
              underline="none"
              sx={{
                fontSize: 13,
                color: "#1a73e8",
                fontWeight: 500,
                cursor: "pointer",
              }}
              component={Link} to="/signup"
            >
              Create Account
            </Button>

            <Button
              variant="contained"
              onClick={handleSubmit}
              sx={{
                bgcolor: "#1a73e8",
                textTransform: "none",
                px: 4,
                "&:hover": {
                  bgcolor: "#1558b0",
                },
              }}
            >
              Submit
            </Button>
          </Box>

        </CardContent>
      </Card>
    </Box>
  );
}

export default SignIn;
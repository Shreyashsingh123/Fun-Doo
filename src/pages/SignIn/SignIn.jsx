import React, { Component } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useNavigate,Link } from "react-router-dom";

export class SignIn extends Component {
  render() {
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
        <Card sx={{ width: 400, padding: 3 }}>
          <CardContent>
            <Typography sx={{color:'blue',fontWeight:'bold',fontSize:'30px'}}variant="h5" textAlign="center" gutterBottom>
              Fundoo
            </Typography>

            <Typography sx={{fontWeight:'bold',fontSize:'25px'}}variant="h6" textAlign="center" gutterBottom>
              Sign in
            </Typography>

            <Typography
              variant="body2"
              color="text.secondary"
              textAlign="center"
              sx={{ mb: 3 }}
            >
              to continue to FunDoo
            </Typography>
           
          <TextField
              label="Email or phone"
              variant="outlined"
              fullWidth
              margin="normal"
          />
            <Typography sx={{pl:'0',ml:0,fontSize:'12px',color:'text.secondary'}}>
              use only letters,numbers and periods
            </Typography>
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="normal"
            />
<Typography sx={{pl:'0',ml:0,fontSize:'12px',color:'text.secondary'}}>
              Forgot password
            </Typography>

            <Box
  sx={{
    mt: 5,
    display: "flex",
    justifyContent: "space-between",
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
    component={Link} to="/signup"
  >
    Back to signup?
  </Button>
  <Button
    variant="contained"
    sx={{
      width: "40%",
    }}
  >
    Sign in
  </Button>
</Box>

          </CardContent>
        </Card>
      </Box>
    );
  }
}

export default SignIn;
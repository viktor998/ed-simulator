import { KeyRounded, SyncAltRounded } from "@mui/icons-material";
import {
  Button,
  Grid,
  Typography,
  Input,
  FormHelperText,
  useMediaQuery,
  Box,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { CircleRight, CircleLeft } from "../assets/svg/Svg";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useMyContext from "../hooks/useMyContext";

/* const text = {
  english: {
    headerTitle: "Change your password here",
    labelEmail: "Email address",
    buttonLogin: "RESET PASSWORD",
  },
  italiano: {
    headerTitle: "Cambia la tua password qui",
    labelEmail: "Indirizzo Email",
    buttonLogin: "RECUPERA PASSWORD",
  },
}; */
const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState(false);

  const sizeMD = useMediaQuery("(min-width:768px)");
  const sizeXXXL = useMediaQuery("(min-width:2300px)");

  const { language, error, setError, onReset, response } = useMyContext();

  const emailChange = (event) => {
    setEmail(event.target.value);
    setError(false);
    if (email.trim().length > 0) {
      setEmailError(false);
    }
  };

  const submitForm = () => {
    if (!email.trim().length > 0) {
      setEmailError(true);
      return;
    }
    const data = { email: email };
    onReset(data);
  };
  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr",
        gridTemplateRows: "2fr 8fr",
      }}
      className="reset_password !max-h-screen overflow-y-hidden gap-8"
    >
      <div className="">
        <Header
          white={false}
          logo={true}
          select={false}
          form={false}
          ita={false}
        >
          <h2 className="text-center text-[28px] lg:text-3xl 3xl:text-4xl max:text-6xl">
            Change your <br /> password 🔐
          </h2>
        </Header>
      </div>
      <main className="relative flex-col flex items-center">
        {/* <div className="hidden md:block circle_rigth absolute right-0 bottom-28">
          <CircleRight />
        </div>
        <div className="hidden md:block circle_left absolute left-5 bottom-0">
          <CircleLeft />
        </div> */}
        <Grid
          container
          rowSpacing={{ xs: 3, xxxl: 6, max: 9 }}
          alignItems="center"
          justifyContent="center"
          sx={{ marginTop: "0px!important" }}
          maxWidth={{ sm: 500, lg: 600, xxl: "40%" }}
          px={3}
        >
          <Grid item xs={12}>
            <Typography
              color="secondary"
              fontSize={{ xs: "14px", md: "16px", xxxl: "20px", max: "35px" }}
              fontWeight="400"
              component="h2"
            >
              Email address
            </Typography>
            <Input
              color="primary"
              fullWidth
              error={error || emailError}
              id="username"
              name="username"
              placeholder="name@example.com"
              autoFocus={true}
              value={email}
              onChange={emailChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitForm();
                  return false;
                }
              }}
            />
            <FormHelperText>
              {emailError && <small>Email Required</small>}
              {error && <small>{error}</small>}
            </FormHelperText>
          </Grid>
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="button"
              fullWidth
              size="large"
              type="button"
              onClick={submitForm}
              className="!font-semibold"
            >
              RESET PASSWORD
            </Button>

            <Typography
              fontSize={{ md: "16px", xl: "18px", xxxl: "20px", max: "35px" }}
              color="secondary"
              mt={3}
              className="text-center"
              fontWeight="400"
            >
              <NavLink className="underline" to="/">
                Back to login
              </NavLink>
            </Typography>
          </Grid>

          <div className="min-h-[200px] w-full pt-5">
            {response && (
              <Grid item xs={12}>
                <div className="message text-sm md:text-base xl:text-lg 3xl:text-xl max:text-4xl">
                  We have sent you an email with a link to change your password
                </div>
              </Grid>
            )}
          </div>
        </Grid>
      </main>
      {/* <Footer>
        {!sizeMD && (
          <Typography color="white" fontWeight="700" className="text-center">
            <NavLink className="underline" to="/">
              Back to login
            </NavLink>
          </Typography>
        )}
      </Footer> */}
    </Box>
  );
};

export default ResetPassword;

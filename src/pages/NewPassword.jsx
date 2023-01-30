import {
  CheckCircleRounded,
  HighlightOff,
  KeyRounded,
  SyncAltRounded,
  Visibility,
  VisibilityOff,
} from "@mui/icons-material";
import {
  Button,
  FormHelperText,
  Grid,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  ListItemText,
  Typography,
  useMediaQuery,
} from "@mui/material";
import React, { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import { CircleLeft, CircleRight } from "../assets/svg/Svg";
import { theme } from "../assets/theme/theme";
import Footer from "../components/Footer";
import Header from "../components/Header";
import useMyContext from "../hooks/useMyContext";

const NewPassword = () => {
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordRepeat, setShowPasswordRepeat] = useState(false);

  const sizeMD = useMediaQuery("(min-width:768px)");
  const sizeXXXL = useMediaQuery("(min-width:2300px)");
  const sizeMAX = useMediaQuery("(min-width:3500px)");

  const regex_password_complete = new RegExp(
    "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  );
  const regex_uppercase = new RegExp("(?=.*?[A-Z])");
  const regex_lowercase = new RegExp("(?=.*?[a-z])");
  const regex_number = new RegExp("(?=.*?[0-9])");
  const regex_special = new RegExp("(?=.*?[#?!@$%^&*-])");
  const regex_length = new RegExp(".{8,}");

  const colorError = theme.palette.button.main;
  const token = useParams();

  const { error, setError, onNewPassword } = useMyContext();

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
    if (regex_password_complete.test(event.target.value)) {
      setPasswordError(false);
      setError(false);
    }
  };

  const passwordRepeatChange = (event) => {
    setPasswordRepeat(event.target.value);
    if (event.target.value === password) {
      setPasswordRepeatError(false);
    }
  };

  const submitForm = () => {
    if (
      !regex_password_complete.test(password) &&
      passwordRepeat !== password
    ) {
      setPasswordError(true);
      setPasswordRepeatError(true);
      return;
    }
    if (!regex_password_complete.test(password)) {
      setPasswordError(true);
      return;
    }
    if (passwordRepeat !== password) {
      setPasswordRepeatError(true);
      return;
    }
    const data = { password: password };
    onNewPassword(data, token.token);
  };
  return (
    <div className="reset_password overflow-y-hidden">
      <Header white={false} logo={true} select={false} form={false} ita={false}>
        <h2 className="text-center text-2xl lg:text-3xl 3xl:text-4xl max:text-6xl">
          Change your password <br />
          <KeyRounded
            color="primary"
            className="rotate-[135deg] max:mt-6"
            fontSize={sizeXXXL ? "large" : "small"}
          />{" "}
          <SyncAltRounded
            fontSize={sizeXXXL ? "large" : "small"}
            className="max:mt-6"
          />{" "}
          <KeyRounded
            color="button"
            className="rotate-[135deg] max:mt-6"
            fontSize={sizeXXXL ? "large" : "small"}
          />
        </h2>
      </Header>
      <main className="relative login">
        <div className="hidden md:block circle_rigth absolute right-0 bottom-28">
          <CircleRight />
        </div>
        <div className="hidden md:block circle_left absolute left-5 bottom-0">
          <CircleLeft />
        </div>
        <Grid
          container
          rowSpacing={{ xs: 3, xxxl: 6, max: 9 }}
          alignItems="center"
          justifyContent="center"
          px={3}
          maxWidth={{ sm: 500, lg: 600, xxl: "40%" }}
        >
          <Grid item xs={12}>
            <Typography
              color="secondary"
              fontSize={{ xs: "14px", md: "16px", xxxl: "20px", max: "35px" }}
              fontWeight="700"
              component="h2"
            >
              New password
            </Typography>
            <Input
              fullWidth
              color="primary"
              error={passwordError || error}
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              placeholder="*********"
              value={password}
              onChange={passwordChange}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  submitForm();
                  return false;
                }
              }}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    color="secondary"
                    onClick={handleClickShowPassword}
                    disabled={!password.length > 0}
                  >
                    {showPassword ? (
                      <VisibilityOff fontSize={sizeXXXL ? "large" : "medium"} />
                    ) : (
                      <Visibility fontSize={sizeXXXL ? "large" : "medium"} />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
            <FormHelperText>{error && <small>{error}</small>}</FormHelperText>
            {!regex_password_complete.test(password) && (
              <List dense={true}>
                <ListItem
                  disablePadding
                  disableGutters
                  secondaryAction={
                    regex_length.test(password) ? (
                      <CheckCircleRounded
                        color="success"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    ) : (
                      <HighlightOff
                        color="button"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    )
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{
                      color: regex_length.test(password) ? "green" : colorError,
                    }}
                    primary="Minimum 8 characters"
                  />
                </ListItem>
                <ListItem
                  disablePadding
                  disableGutters
                  secondaryAction={
                    regex_uppercase.test(password) ? (
                      <CheckCircleRounded
                        color="success"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    ) : (
                      <HighlightOff
                        color="button"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    )
                  }
                >
                  <ListItemText
                    color={
                      regex_uppercase.test(password) ? "success" : "button"
                    }
                    primaryTypographyProps={{
                      color: regex_uppercase.test(password)
                        ? "green"
                        : colorError,
                    }}
                    primary="One uppercase letter"
                  />
                </ListItem>
                <ListItem
                  disablePadding
                  disableGutters
                  secondaryAction={
                    regex_lowercase.test(password) ? (
                      <CheckCircleRounded
                        color="success"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    ) : (
                      <HighlightOff
                        color="button"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    )
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{
                      color: regex_lowercase.test(password)
                        ? "green"
                        : colorError,
                    }}
                    primary="One lowercase letter"
                  />
                </ListItem>
                <ListItem
                  disablePadding
                  disableGutters
                  secondaryAction={
                    regex_number.test(password) ? (
                      <CheckCircleRounded
                        color="success"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    ) : (
                      <HighlightOff
                        color="button"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    )
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{
                      color: regex_number.test(password) ? "green" : colorError,
                    }}
                    primary="One number"
                  />
                </ListItem>
                <ListItem
                  disablePadding
                  disableGutters
                  secondaryAction={
                    regex_special.test(password) ? (
                      <CheckCircleRounded
                        color="success"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    ) : (
                      <HighlightOff
                        color="button"
                        className="check"
                        fontSize={sizeMAX ? "large" : "small"}
                      />
                    )
                  }
                >
                  <ListItemText
                    primaryTypographyProps={{
                      color: regex_special.test(password)
                        ? "green"
                        : colorError,
                    }}
                    primary="One special character (#?!@$%^&*-)"
                  />
                </ListItem>
              </List>
            )}
          </Grid>
          {regex_password_complete.test(password) && (
            <Grid item xs={12}>
              <Typography
                color="secondary"
                fontSize={{ xs: "14px", md: "16px", xxxl: "20px" }}
                fontWeight="700"
                component="h2"
              >
                Confirm new password
              </Typography>
              <Input
                fullWidth
                color="primary"
                error={passwordRepeatError}
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                placeholder="*********"
                value={passwordRepeat}
                onChange={passwordRepeatChange}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    submitForm();
                    return false;
                  }
                }}
              />
              <FormHelperText>
                {passwordRepeatError && <small>Passwords not match!</small>}
                {error === "Password not valid" && <small>{error}</small>}
              </FormHelperText>
            </Grid>
          )}
          <Grid item xs={12}>
            <Button
              variant="contained"
              color="button"
              fullWidth
              size="large"
              type="button"
              onClick={submitForm}
            >
              CONFIRM
            </Button>
          </Grid>
        </Grid>
      </main>
      <Footer></Footer>
    </div>
  );
};

export default NewPassword;

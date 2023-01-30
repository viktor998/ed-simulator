import { Box, LinearProgress, useMediaQuery } from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { debounce } from "lodash";
import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { text, textLabel } from "../assets/text-form/TextForm";
import { theme } from "../assets/theme/theme";
import Header from "../components/Header";
import useMyContext from "../hooks/useMyContext";

dayjs.extend(customParseFormat);

const TOMTOM_KEY = import.meta.env.VITE_TOMTOM_API;
document.title = "Form Edusogno";
const RegisterPage = () => {
  const { token } = useParams();
  const [loading, setLoading] = useState(false);
  const { user, navigate, onFindUser, onUpdateUser, error } = useMyContext();

  const loadData = async () => {
    await onFindUser(token);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    loadData();
  }, []);

  const [counter, setCounter] = useState(0);

  const [animation, setAnimation] = useState(true);

  const { language } = useMyContext();
  const sizeMD = useMediaQuery("(min-width:768px)");
  const sizeXXXL = useMediaQuery("(min-width:2300px)");
  const sizeMAX = useMediaQuery("(min-width:3500px)");

  const [date, setDate] = useState("");
  const [dateError, setDateError] = useState(false);

  const [addressObject, setAddressObject] = useState(false);

  const [address, setAddress] = useState("");
  const [addressFake, setAddressFake] = useState("");

  const [addressError, setAddressError] = useState(false);
  const [town, setTown] = useState("");
  const [townError, setTownError] = useState(false);
  const [province, setProvince] = useState("");
  const [provinceError, setProvinceError] = useState(false);
  const [zipCode, setZipCode] = useState("");
  const [zipCodeError, setZipCodeError] = useState(false);
  const [autoCompleteAddress, setAutoCompleteAddress] = useState(false);

  const [selectedTimezone, setSelectedTimezone] = useState({
    value: "Europe/Amsterdam",
    label: textLabel[language],
    offset: 1,
    abbrev: "CET",
    altName: "Central European Standard Time",
  });

  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedMonthError, setSelectedMonthError] = useState(false);

  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");

  const [passwordError, setPasswordError] = useState(false);
  const [passwordRepeatError, setPasswordRepeatError] = useState(false);

  const [showPassword, setShowPassword] = useState(false);

  const regex_date = RegExp(
    /(^(((0[1-9]|1[0-9]|2[0-8])[/](0[1-9]|1[012]))|((29|30|31)[/](0[13578]|1[02]))|((29|30)[/](0[4,6,9]|11)))[/](19|20)\d\d$)|(^29[/]02[/](19|[2-9][0-9])(00|04|08|12|16|20|24|28|32|36|40|44|48|52|56|60|64|68|72|76|80|84|88|92|96)$)/
  );

  const regex_password_complete = new RegExp(
    "^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
  );
  const regex_uppercase = new RegExp("(?=.*?[A-Z])");
  const regex_lowercase = new RegExp("(?=.*?[a-z])");
  const regex_number = new RegExp("(?=.*?[0-9])");
  const regex_special = new RegExp("(?=.*?[#?!@$%^&*-])");
  const regex_length = new RegExp(".{8,}");

  const colorError = theme.palette.button.main;

  const minusCounterHandler = () => {
    setAnimation(false);
    setTimeout(() => {
      setCounter((prev) => prev - 1);
      setAnimation(true);
    }, 224);
  };

  const plusCounterHandler = () => {
    setAnimation(false);
    setTimeout(() => {
      setCounter((prev) => prev + 1);
      setAnimation(true);
    }, 224);
  };

  //DATE
  const dateChange = (event) => {
    setDate(event.target.value);
    setDateError(false);
  };
  const checkDate = () => {
    if (!date.trim().length > 0) {
      setDateError("Date is required");
      return;
    }
    const selectedDate = dayjs(date, "DD/MM/YYYY");
    if (
      !regex_date.test(date) ||
      !dayjs(date, "DD/MM/YYYY").isValid ||
      dayjs().subtract(10, "year").isBefore(dayjs(selectedDate)) ||
      dayjs().subtract(80, "year").isAfter(dayjs(selectedDate))
    ) {
      setDateError("Insert a valid date");
      return;
    }

    plusCounterHandler();
  };

  //TIME ZONE
  const selectedTimezoneHandler = (value) => {
    let newLabel;
    if (value.label.includes(",")) {
      newLabel = value.label.split(",");
      newLabel = newLabel[0].split(" ");
    } else {
      newLabel = value.label.split(" ");
    }
    const replaceLabel = `${newLabel
      .slice(1)
      .toString()
      .replace(/,/g, " ")} ${newLabel[0]
      .slice(1)
      .replace(")", "")
      .replace(":", ".")
      .replace("+", " +")
      .replace("-", " -")}`;
    value.label = replaceLabel;

    setSelectedTimezone(value);
  };

  //ADDRESS
  const autoCompleteAddressHandler = async () => {
    const response = await axios.get(
      `https://api.tomtom.com/search/2/geocode/${address}.json?key=${TOMTOM_KEY}&language=it-IT&typeahead=true&limit=10&type=Address&lat=41.9102415&lon=12.395915&radius=100000000`
    );

    setAutoCompleteAddress({ status: true, response: response.data.results });
  };

  const delayComplete = useCallback(
    debounce(autoCompleteAddressHandler, 1000, {
      leading: false,
      trailing: true,
    }),
    [address]
  );

  useEffect(() => {
    if (address !== addressFake) {
      if (address.trim().length > 5) {
        delayComplete();
      }
      return () => {
        delayComplete.cancel();
      };
    }
  }, [address]);

  const addressChange = (event) => {
    setAddress(event.target.value);
    if (event.target.value.trim().length > 0) {
      setAddressError(false);
    }
  };

  const townChange = (event) => {
    setTown(event.target.value);
    if (event.target.value.trim().length > 0) {
      setTownError(false);
    }
  };

  const provinceChange = (event) => {
    setProvince(event.target.value);
    if (event.target.value.trim().length > 0) {
      setProvinceError(false);
    }
  };

  const zipCodeChange = (event) => {
    setZipCode(event.target.value);
    setZipCodeError(false);
  };

  const addressCompleteHandler = () => {
    if (
      !address.trim().length > 0 &&
      !town.trim().length > 0 &&
      !province.trim().length > 0 &&
      !zipCode.trim().length > 0
    ) {
      setAddressError("Address is Required");
      setTownError("Town is Required");
      setProvinceError("Province is Required");
      setZipCodeError("Zip code is Required");
      return;
    }
    if (!address?.trim().length > 0 || address == undefined) {
      setAddressError("Address is Required");
      return;
    }
    if (!town?.trim().length > 0 || town == undefined) {
      setTownError("Town is Required");
      return;
    }
    if (!province?.trim().length > 0 || province == undefined) {
      setProvinceError(
        "Province ihttp://localhost:5173/register/j9XJlYydtne64gAs Required"
      );
      return;
    }

    if (!zipCode?.trim().length > 0 || zipCode == undefined) {
      setZipCodeError("Zip code is Required");
      return;
    }
    if (zipCode?.trim().length === 5) {
      plusCounterHandler();
    } else {
      setZipCodeError("Insert valid Zip code");
    }
  };

  //MONTH
  const monthChange = (event) => {
    setSelectedMonth(event.target.value);
    setSelectedMonthError(false);
  };

  const monthHandler = () => {
    if (!selectedMonth.trim().length > 0) {
      setSelectedMonthError("Month is Required");
      return;
    }
    plusCounterHandler();
  };

  //PASSWORD
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const passwordChange = (event) => {
    setPassword(event.target.value);
    if (regex_password_complete.test(event.target.value)) {
      setPasswordError(false);
    }
  };

  const passwordRepeatChange = (event) => {
    setPasswordRepeat(event.target.value);
    if (event.target.value === password) {
      setPasswordRepeatError(false);
    }
  };

  const passwordHandler = () => {
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

    const data = {
      data_di_nascita: date,
      timezone_offset: selectedTimezone.offset,
      indirizzo: address,
      citta: town,
      provincia: addressObject
        ? addressObject.countrySecondarySubdivision
        : null,
      regione: addressObject ? addressObject.countrySubdivision : null,
      country: province,
      cap: zipCode,
      mese_inizio: selectedMonth,
      data_scelta: selectedMonth.split(" ")[0],
      password: password,
    };

    setLoading(true);
    onUpdateUser(data, token);
    if (error) {
      return;
    }

    setAnimation(false);
    setTimeout(() => {
      setAnimation(true);
      navigate(`audio/${token}`);
    }, 224);
  };

  if (loading) {
    return <LinearProgress />;
  }
  const gridProps = {
    className: "h-full",
    container: true,
    maxWidth: { sm: 500, lg: 600, xxl: "40%" },
    alignContent: "center",
    justifyContent: "center",
    alignItems: "center",
    px: 3,

    sx: {
      display: "grid",
      gridTemplateRows: "8fr 4fr",
      pt: "2vh",
      ["@media (min-width:763px)"]: {
        pt: "4vh",
      },
    },
  };
  const boxStyle = {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "min(2rem,2vh)",
  };
  const buttonBox = {
    // display: "flex",
    // flexDirection: "row",
    // gap: "1rem",
    // justifyContent: "center",
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "2rem",
    "& button": {
      width: "2rem",
    },
    "& button:first-of-type": {
      marginLeft: "auto",
    },
    ["@media (min-width:763px)"]: {
      "& button": {
        width: "100%",
      },
    },
  };

  const selectValueStyle = {
    ["@media (min-width:768px)"]: {
      // eslint-disable-line no-useless-computed-key
      fontSize: "24px",
    },
    ["@media (min-width:1024px)"]: {
      // eslint-disable-line no-useless-computed-key
      fontSize: "26px",
    },
    ["@media (min-width:1280px)"]: {
      // eslint-disable-line no-useless-computed-key
      fontSize: "28px",
    },
    ["@media (min-width:1920px)"]: {
      // eslint-disable-line no-useless-computed-key
      fontSize: "32px",
    },
    ["@media (min-width:2300px)"]: {
      // eslint-disable-line no-useless-computed-key
      fontSize: "36px",
    },
    ["@media (min-width:3500px)"]: {
      // eslint-disable-line no-useless-computed-key
      fontSize: "55px",
    },
    color: "#2D224C",
    fontSize: "19px",
    background: "transparent",
    "-webkit-text-fill-color": "#2D224C!important",
    ":-webkit-background-clip": "text",
  };
  return (
    <Box
      sx={{
        display: "grid",
        ["@media (min-width:1047px)"]: {
          gridTemplateRows: "2fr 10fr",
        },
        gridTemplateRows: "255px auto",
        height: "calc(var(--vh, 1vh) * 100)",
        overflowX: "hidden",
      }}
    >
      <Header
        white={true}
        logo={sizeMD ? true : false}
        select={true}
        form={true}
        ita={false}
      >
        <h2 className="text-center text-xl lg:text-3xl 3xl:text-4xl 3xl:mt-16 max:mt-20 max:text-6xl">
          {counter === 0
            ? !loading && user?.nome + text[language][counter].headerTitle
            : text[language][counter].headerTitle}
        </h2>

        <div className="absolute top-0 left-0 progress"></div>

        {/* PROGRESS BAR */}
        {counter === 0 && (
          <div className="absolute right-0 top-0 bg-white nascondi  w-[85%] "></div>
        )}
        {counter === 1 && (
          <div className="absolute right-0 top-0 bg-white nascondi w-[70%]"></div>
        )}
        {counter === 2 && (
          <div className="absolute right-0 top-0 bg-white nascondi w-[55%]"></div>
        )}
        {counter === 3 && (
          <div className="absolute right-0 top-0 bg-white nascondi w-[40%]"></div>
        )}
        {counter === 4 && (
          <div className="absolute right-0 top-0 bg-white nascondi w-[25%]"></div>
        )}
      </Header>

      <main className="relative"></main>
    </Box>
  );
};

export default RegisterPage;

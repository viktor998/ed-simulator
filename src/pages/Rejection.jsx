import React from "react";
import { Box, Button, LinearProgress, Link } from "@mui/material";
import heroCheckoutLanding from "../assets/img/heroCheckoutLanding.svg";
import logoEduWhite from "../assets/img/logoEduWhite.svg";
import { WhatsApp } from "@mui/icons-material";
import { useParams } from "react-router-dom";
import { capitalize } from "lodash";
import axios from "axios";
import { fb, instagram, linkedin, tiktok, youtube } from "../assets/img/social";

const BASE = import.meta.env.VITE_BASE_URL_ADMIN;

const Rejection = () => {
  const { token } = useParams();
  const [data, setData] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(true);

  const dataUser = async () => {
    const { data } = await axios.post(BASE + "v1/crm/user/" + token);

    if (data) setIsLoading(false);

    setData((prev) => data);
  };

  React.useEffect(() => {
    dataUser();
  }, []);

  if (isLoading) {
    return <LinearProgress />;
  }

  return (
    <Box className="flex flex-col flex-grow min-h-screen bg-edu-100">
      <section className="text-white ">
        <div className="p-5 bg-bottom bg-no-repeat bg-cover md:p-10" style={{ backgroundImage: `url('${heroCheckoutLanding}')` }}>
          <div className="flex items-center justify-between">
            <img src={logoEduWhite} alt="" />
            {/* <div className="relative ml-auto h-fit w-fit help 3xl:text-2xl max:text-4xl">
              <a className="no-underline" href="https://api.whatsapp.com/send?phone=3715467005" target={"_blank"}>
                <span className="text-xs font-black md:text-base">Hai bisogno di aiuto?</span>
                <WhatsApp className="pb-1" fontSize={"small"} />
              </a>
              <div className="absolute left-0 bg-white line bottom-1"></div>
            </div> */}
          </div>

          <div className="container flex flex-col items-center w-full mx-auto mt-10 text-center md:w-1/2">
            <h1 className="text-4xl font-bold leading-none sm:text-4xl">{capitalize(data?.name)}, ci dispiace! 😢 !!</h1>
            <p className="px-8 pb-8 text-xl pt-14">Non riusciamo a garantirti un posto nel nostro acceleratore di inglese per il momento.</p>
            <p className="px-8 pb-8 text-xl">
              Grazie comunque per aver dedicato del tempo ed aver interagito con <span className="font-semibold">Edusogno</span>.
            </p>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center flex-1 text-center text-edu-900">
        <div>
          <p className="px-8 pb-8 text-2xl pt-14">Ci risentiremo in futuro. Per adesso, ti auguriamo il meglio!.</p>
          <p className="px-8 pb-8 text-3xl font-black">Rimani connesso con noi</p>

          <div className="grid grid-flow-col auto-cols-auto place-content-center">
            <a href="https://www.facebook.com/edusogno" target="_blank" rel="noopener noreferrer">
              <img src={fb} className="max-w-[65px]" />
            </a>
            <a href="https://www.instagram.com/edu.sogno/" target="_blank" rel="noopener noreferrer">
              <img src={instagram} className="max-w-[65px]" srcset="" />
            </a>
            <a href="https://www.linkedin.com/company/28861904/admin/" target="_blank" rel="noopener noreferrer">
              <img src={linkedin} className="max-w-[65px]" srcset="" />
            </a>
            <a href="https://www.youtube.com/@edusognotutoring2258" target="_blank" rel="noopener noreferrer">
              <img src={youtube} className="max-w-[65px]" srcset="" />
            </a>
            <a href="https://www.tiktok.com/@edu.sogno" target="_blank" rel="noopener noreferrer">
              <img src={tiktok} className="max-w-[65px]" srcset="" />
            </a>
          </div>
        </div>
      </section>
    </Box>
  );
};

export default Rejection;

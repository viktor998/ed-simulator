import {
  CaAgenda,
  CaPersonalInformation,
  CaMaterials,
  CaAvailability,
  CaExercise,
  CaInvoices,
} from "@components/Icons";
import {
  CaLessons,
  CaPaymentRequest,
  CaStatistics,
} from "../../components/Icons.jsx";

export const menuItems = [
  // { type: "label", value: "your path" },
  { type: "item", value: "Lessons", Icon: CaLessons, path: "lessons" },
  {
    type: "item",
    value: "Payment request",
    Icon: CaPaymentRequest,
    path: "payment-request",
  },
  // { type: "item", value: "Materials", Icon: CaMaterials, path: "materials" },
  // { type: "label", value: "", path: "" },
  {
    type: "item",
    value: "Personal info",
    Icon: CaPersonalInformation,
    path: "personal-info",
  },
  { type: "item", value: "Statistics", Icon: CaStatistics, path: "statistics" },
];

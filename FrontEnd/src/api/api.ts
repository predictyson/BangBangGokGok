import axios from "axios";

import {
  Avatar1,
  Avatar2,
  Avatar3,
  Avatar4,
  Avatar5,
  Avatar6,
  Avatar7,
  Avatar8,
  Avatar9,
  Avatar10,
} from "@/assets/user";

export const handleAvatar = (t: string) => {
  if (t === "Avatar1") return Avatar1;
  else if (t === "Avatar2") return Avatar2;
  else if (t === "Avatar3") return Avatar3;
  else if (t === "Avatar4") return Avatar4;
  else if (t === "Avatar5") return Avatar5;
  else if (t === "Avatar6") return Avatar6;
  else if (t === "Avatar7") return Avatar7;
  else if (t === "Avatar8") return Avatar8;
  else if (t === "Avatar9") return Avatar9;
  else if (t === "Avatar10") return Avatar10;
};


import { NextResponse } from "next/server";
import React from "react";

const redirect = () => {
NextResponse.redirect(process.env.LOGIN_URL);
  return <div>redirect</div>;
};

export default redirect;

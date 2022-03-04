import React, { useEffect } from "react";

const redirect = () => {
  useEffect(() => {
    window.location.replace("/");
    return;
  }, []);

  return <div>redirect</div>;
};

export default redirect;

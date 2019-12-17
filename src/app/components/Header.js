import React from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

const Header = () => {
  return (
    <>
      <header>
        <Grid container className="header">
          <Grid item xs={6} className="logo">
            <div>Your RSS</div>
          </Grid>
          <Grid item xs={6}>
            <div className="selectButton">
              <Button variant="contained">select site</Button>
            </div>
          </Grid>
        </Grid>
      </header>
      <style>{`
          body {
            margin: 0;
          }
          .header {
            display: -webkit-flex;
            display: flex;

            justify-content: space-between;
            align-items: center;

            height: 72px;
            background-color: #ffe4b5;
          }

          .logo {
            padding-left: 30px;
          }
          .selectButton {
            padding-right: 30px;
            float: right;
          }
        `}</style>
    </>
  );
};

export default Header;

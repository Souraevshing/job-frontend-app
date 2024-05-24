import React from "react";
import { AppBar, Typography, Grid, Box, Toolbar, Card } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const ListAllPosts = () => {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const response = await axios.get(process.env.REACT_APP_BASE_URL);
      console.log(response);
      setPost(response.data);
    };
    fetchInitialPosts();
    toast.info("Job loaded successfully!");
  }, []);

  return (
    <Grid container spacing={2} sx={{ margin: "2%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography
              variant="h6"
              align="center"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Job Portal
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <Grid item xs={12} sx={12} md={12} lg={12}></Grid>
      {post &&
        post.map((p) => {
          return (
            <Grid key={p.id} item xs={12} md={6} lg={4}>
              <Card sx={{ padding: "3%", overflow: "hidden", width: "84%" }}>
                <Typography
                  variant="h5"
                  sx={{ fontSize: "2rem", fontWeight: "600" }}
                >
                  {p.postProfile}
                </Typography>
                <Typography
                  sx={{ color: "#585858", marginTop: "2%" }}
                  variant="body"
                >
                  Description: {p.postDesc}
                </Typography>
                <br />
                <br />
                <Typography variant="h6">
                  Years of Experience: {p.reqExperience} years
                </Typography>

                <Typography gutterBottom variant="body">
                  Skills :{" "}
                </Typography>
                {p.postTechStack.map((s, i) => {
                  return (
                    <Typography variant="body" gutterBottom key={i}>
                      {s}
                      {` `}
                    </Typography>
                  );
                })}
              </Card>
            </Grid>
          );
        })}
    </Grid>
  );
};

export default ListAllPosts;

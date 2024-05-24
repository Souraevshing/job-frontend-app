import React, { useEffect, useState } from "react";
import { Typography, TextField, Button, Paper, Box } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const initial = {
  postId: "",
  postProfile: "",
  reqExperience: 0,
  postTechStack: [],
  postDesc: "",
};

const Edit = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [form, setForm] = useState(initial);
  const [currId] = useState(location.state.id);

  useEffect(() => {
    const fetchInitialPosts = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/${currId}`,
      );
      setForm(response.data);
    };
    fetchInitialPosts(currId);
    toast.info("Job loaded successfully!");
  }, [currId]);

  useEffect(() => {
    axios.get(process.env.REACT_APP_BASE_URL).then((res) => {
      const { id } = res.data;
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.put(process.env.REACT_APP_BASE_URL, form);
    } catch (error) {
      console.log(error);
    }
    navigate("/");
  };

  const handleChange = (e) => {
    const skill = e.target.value;
    const isChecked = e.target.checked;

    if (isChecked) {
      setForm((prevForm) => ({
        ...prevForm,
        postTechStack: [...prevForm.postTechStack, skill],
      }));
    } else {
      setForm((prevForm) => ({
        ...prevForm,
        postTechStack: prevForm.postTechStack.filter((item) => item !== skill),
      }));
    }
  };

  const { postTechStack } = form;
  postTechStack.map((post, id) => {
    console.log(post);
  });

  return (
    <Paper sx={{ padding: "1%" }} elevation={0}>
      <Typography sx={{ margin: "3% auto" }} align="center" variant="h5">
        Edit New Post
      </Typography>
      <form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
          }}
        >
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            onChange={(e) => setForm({ ...form, postId: e.target.value })}
            label="Enter your Post ID"
            variant="outlined"
            value={form.postId}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) => setForm({ ...form, postProfile: e.target.value })}
            label="Job-Profile"
            variant="outlined"
            value={form.postProfile}
          />
          <TextField
            min="0"
            type="number"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            onChange={(e) =>
              setForm({ ...form, reqExperience: e.target.value })
            }
            label="Years of Experience"
            variant="outlined"
            value={form.reqExperience}
          />
          <TextField
            type="string"
            sx={{ width: "50%", margin: "2% auto" }}
            required
            multiline
            rows={4}
            onChange={(e) => setForm({ ...form, postDesc: e.target.value })}
            label="Job-desc"
            variant="outlined"
            value={form.postDesc}
          />
          <Box sx={{ margin: "1% auto" }}>
            <h3>Please mention required skills</h3>
            <ul style={{ listStyle: "none" }}>
              {form.postTechStack.map((skill, index) => {
                return (
                  <li key={index}>
                    <div>
                      <div>
                        *{" "}
                        <input
                          type="checkbox"
                          id={`custom-checkbox-${index}`}
                          name={skill}
                          value={skill}
                          onChange={handleChange}
                        />
                        <label htmlFor={`custom-checkbox-${index}`}>
                          {skill}
                        </label>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </Box>
          <Button
            sx={{ width: "50%", margin: "2% auto" }}
            variant="contained"
            type="submit"
            >
            Submit
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default Edit;

const express = require("express");
const axios = require("axios");

const app = express();

const url = "https://api.unsplash.com/photos/random?client_id=_fQKKieztygyfJM4s4OWJROZnYHTfbH5xrkSIpU0cIU";

app.get("/random-image", async (req, res) => {
  try {
    const resp = await axios({
      method: "get",
      url: url
    });

    const imageUrl = resp.data.urls.full;

    const imageData = await axios({
      method: "get",
      url: imageUrl,
      responseType: 'arraybuffer'
    });

    res.set({
      'Content-Type': 'image/png',
      'Content-Length': imageData.data.length
    });

    res.send(imageData.data);
  } catch (error) {
    console.error(error);
    res.status(500).send("Internal Server Error");
  }
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});


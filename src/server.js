import express from "express";
import bodyparser from "body-parser";

const articlesInfo = {
  "learn-react": {
    upvotes: 0,
    comments: [],
  },
  "learn-node": {
    upvotes: 0,
    comments: [],
  },
  "my-thoughts-on-resumes": {
    upvotes: 0,
    comments: [],
  },
};

const app = express();

app.use(bodyparser.json());

//Upvote a post
app.post("/api/articles/:name/upvote", (req, res) => {
  const articleName = req.params.name;
  articlesInfo[articleName].upvotes += 1;
  res
    .status(200)
    .send(
      `Article ${articleName} has ${articlesInfo[articleName].upvotes} upvotes`
    );
});

//add comments to a post
// {"username":"Gibin","text":"I love this article"}
app.post("/api/articles/:name/add-comment", (req, res) => {
  const { username, text } = req.body;
  const articleName = req.params.name;
  articlesInfo[articleName].comments.push({ username, text });
  res.status(200).send(articlesInfo[articleName]);
});
app.listen(8000, () => console.log("Listening on port 8000"));

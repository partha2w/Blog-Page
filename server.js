import express from "express";
import bodyParser from "body-parser";
import axios from "axios";
const API_URL = "https://blog-page-xa1f.onrender.com";
const port = 3000;
const app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

//Showing all the post in home Page--------------
app.get("/",async (req,res)=>{
try{
    const response = await axios.get(`${API_URL}`);
    res.render("index.ejs",{posts:response.data})
}catch(error){
    res.status(500).json({ message: "Error fetching posts" });
}
});

//Rendering New Blog post Form-----
app.get("/new", (req, res) => {
    res.render("form.ejs", { heading: "Create a new post", submit: "Publish" });
});


// Posting New Blog-------
app.post("/submit-post",async(req,res)=>{
try {
    await axios.post(`${API_URL}/publish`, req.body);
    res.redirect("/");
} catch (error) {
    res.status(500).json({ message: "Error creating post" });
}
})

// Getting a spcific Blog and rendring edit form-------
app.get("/:id", async (req, res) => {
    try {
        const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
        res.render("form.ejs", {
            heading: "Edit Post",
            submit: "Update Post",
            post: response.data,
        });
    } catch (error) {
        res.status(500).json({ message: "Error updating post" });
    }
});


//Posting Updated Blog----
app.post("/api/edit-post/:id",async(req,res)=>{
    try{
        await axios.patch(`${API_URL}/edit/${req.params.id}`,req.body);
        res.redirect("/");
    }catch(error){
        res.status(500).json({ message: "Error updating post" });
    }
}) 

// Deleting post-----
app.get("/posts/delete/:id",async(req,res)=>{
    try{
        await axios.delete(`${API_URL}/delete/${req.params.id}`);
        res.redirect("/");
    }catch(error){
        res.status(404).json({ message: "Error Deleting post" });
    }
})

app.listen(port,()=>{
    console.log(`server started at port: ${port}`)
})
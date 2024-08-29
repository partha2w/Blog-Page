import express from "express";
import bodyParser from "body-parser";
const posts = [
    {
        id:1,
        author:"John Doe",
        title:"Post Title 1",
        content:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vehicula nisl non urna sollicitudin, in aliquam arcu placerat.",
        publishDate:"26-07-2024"
    }
]
const port = 4000;
const app = express();
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
function getCurrentDate(){
    const date = new Date();
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 because months are zero-based
    const year = date.getFullYear();
    const timeFormat = `${day}-${month}-${year}`;
    return timeFormat;
}

// Sending all the Posts
app.get("/",(req,res)=>{
    res.json(posts);
})

// Sending Specific Post-----
app.get("/posts/:id",(req,res)=>{
    const postId = parseInt(req.params.id);
    const foundPost = posts.find(post=>post.id===postId);
    res.json(foundPost);
})

// Posting new Blog
app.post("/publish",(req,res)=>{
    const newPost = {
        id:posts.length+1,
        author:req.body.author,
        title:req.body.title,
        content:req.body.content,
        publishDate:getCurrentDate()
    }
    posts.push(newPost);
    res.status(200).json({message:"Blog Published"})
})

// Upadting post----
app.patch("/edit/:id",(req,res)=>{
    const postId = parseInt(req.params.id);
    const foundPost = posts.find(post=>post.id===postId);
    const index = posts.findIndex(post=>post.id===postId);
    posts[index] = {
        id:postId,
        author:req.body.author || foundPost.author,
        title:req.body.title || foundPost.title,
        content:req.body.content || foundPost.content,
        publishDate:getCurrentDate()
    }
    res.status(201).json({message:"updated succesfully"});
})

// Deleting Post-----
app.delete("/delete/:id",(req,res)=>{
    const index = posts.findIndex(post=>post.id===parseInt(req.params.id));
    if(index==-1) return res.status(404).json({meassage:"Post not found"});
    posts.splice(index,1);
    res.json({message:"Post deleted"});
})

app.listen(port,()=>{
    console.log(`api server started at port: ${port}`);
})


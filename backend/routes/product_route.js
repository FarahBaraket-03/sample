const router=require("express").Router()
const Project = require("../models/product");

router.get("/", async (req, res) => {
    try {
      let allProjects = await Project.find();
      res.send(allProjects);
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  });

router.post("/add", async (req, res) => {
    try {
      let data = req.body;
      let project = new Project(data);
      let result = await project.save();
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send("403");
    }
  });

  router.put("/update/:id", async (req, res) => {
    try {
      let myId = req.params.id;
      let data = req.body ;
      let updatedProject = await Project.findByIdAndUpdate({_id : myId} , data);
      res.send(updatedProject);
      // console.log("update user api ");
      // res.send("update user api");
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  });


router.delete("/delete/:id", async (req, res) => {
    try {
      let pro_id = req.params.id;
      let result = await Project.findOneAndDelete({ _id: pro_id });
      res.send(result);
    } catch (error) {
      console.log(error);
      res.send("404");
    }
  });


  module.exports=router;
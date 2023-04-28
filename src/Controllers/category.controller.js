// const slugify = require("slugify");
const Category = require("../Models/Category");

exports.addCategory= async (req, res) => {
     const obj = {
      name: req.body.name,
      // slug: slugify(req.body.name),
    };

    if(req.file)
    {
      obj.ImageCategory="http://localhost:5000/public/" + req.file.filename;
    }
  
    if (req.body.parentId) {
      obj.parentId = req.body.parentId;
    }
  
    const cat = new Category(obj);
  
     cat.save().then((category) => {
      if (category) {
        return res.status(200).send({
          // message: "User created successfully ",
          category
        });
      }
    });
  
  
  }

   async function createCategory(cat,parentId=null)
  {

    const Listcategory =[];
    let category;
    if(parentId==null)
    {
      category=cat.filter(items=>items.parentId==undefined)
    }
    else{
      category=cat.filter(items=>items.parentId==parentId);
    }

    for(let cate of category)
    {
      Listcategory.push({
        _id:cate._id,
        name:cate.name,
        slug:cate.slug,
        child:createCategory(cat,cate._id)
      });
    }

    return Listcategory;
  }


  exports.getCategory=async(req,res,next)=>
  {
      const cat=await Category.find({})
      if(cat)
      {
        // a recursive function to fetch the category
        const categoryList= createCategory(cat);

        res.status(200).json({categoryList});
      }
  }

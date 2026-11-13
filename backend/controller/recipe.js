// const Recipes=require("../models/recipe")
// const multer  = require('multer')

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, './public/images')
//     },
//     filename: function (req, file, cb) {
//       const filename = Date.now() + '-' + file.fieldname
//       cb(null, filename)
//     }
//   })
  
//   const upload = multer({ storage: storage })

// const getRecipes=async(req,res)=>{
//     const recipes=await Recipes.find()
//     return res.json(recipes)
// }

// const getRecipe=async(req,res)=>{
//     const recipe=await Recipes.findById(req.params.id)
//     res.json(recipe)
// }

// const addRecipe=async(req,res)=>{
//     console.log(req.user)
//     const {title,ingredients,instructions,time}=req.body 

//     if(!title || !ingredients || !instructions)
//     {
//         res.json({message:"Required fields can't be empty"})
//     }

//     const newRecipe=await Recipes.create({
//         title,ingredients,instructions,time,coverImage:req.file.filename,
//         createdBy:req.user.id
//     })
//    return res.json(newRecipe)
// }

// const editRecipe=async(req,res)=>{
//     const {title,ingredients,instructions,time}=req.body 
//     let recipe=await Recipes.findById(req.params.id)

//     try{
//         if(recipe){
//             let coverImage=req.file?.filename ? req.file?.filename : recipe.coverImage
//             await Recipes.findByIdAndUpdate(req.params.id,{...req.body,coverImage},{new:true})
//             res.json({title,ingredients,instructions,time})
//         }
//     }
//     catch(err){
//         return res.status(404).json({message:err})
//     }
    
// }
// const deleteRecipe=async(req,res)=>{
//     try{
//         await Recipes.deleteOne({_id:req.params.id})
//         res.json({status:"ok"})
//     }
//     catch(err){
//         return res.status(400).json({message:"error"})
//     }
// }

// module.exports={getRecipes,getRecipe,addRecipe,editRecipe,deleteRecipe,upload}


const Recipes = require("../models/recipe")
const multer = require("multer")
const cloudinary = require("cloudinary").v2
const { CloudinaryStorage } = require("multer-storage-cloudinary")

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
})

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: "recipe-app",
        allowed_formats: ["jpg", "jpeg", "png", "webp"]
    }
})

const upload = multer({ storage })

const getRecipes = async (req, res) => {
    try {
        const recipes = await Recipes.find()
        return res.json(recipes)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const getRecipe = async (req, res) => {
    try {
        const recipe = await Recipes.findById(req.params.id)
        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" })
        }
        return res.json(recipe)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const addRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body

        if (!title || !ingredients || !instructions || !req.file) {
            return res.status(400).json({ message: "Required fields can't be empty" })
        }

        const parsedIngredients = Array.isArray(ingredients)
            ? ingredients
            : JSON.parse(ingredients)

        const newRecipe = await Recipes.create({
            title,
            ingredients: parsedIngredients,
            instructions,
            time,
            coverImage: req.file.path,
            createdBy: req.user.id
        })

        return res.json(newRecipe)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const editRecipe = async (req, res) => {
    try {
        const { title, ingredients, instructions, time } = req.body
        const recipe = await Recipes.findById(req.params.id)

        if (!recipe) {
            return res.status(404).json({ message: "Recipe not found" })
        }

        const parsedIngredients = ingredients
            ? (Array.isArray(ingredients) ? ingredients : JSON.parse(ingredients))
            : recipe.ingredients

        const coverImage = req.file ? req.file.path : recipe.coverImage

        const updatedRecipe = await Recipes.findByIdAndUpdate(
            req.params.id,
            {
                title,
                ingredients: parsedIngredients,
                instructions,
                time,
                coverImage
            },
            { new: true }
        )

        return res.json(updatedRecipe)
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }
}

const deleteRecipe = async (req, res) => {
    try {
        await Recipes.deleteOne({ _id: req.params.id })
        return res.json({ status: "ok" })
    } catch (err) {
        return res.status(400).json({ message: "error" })
    }
}

module.exports = {
    getRecipes,
    getRecipe,
    addRecipe,
    editRecipe,
    deleteRecipe,
    upload
}

import asyncHandler from "express-async-handler";
import Articles from "../models/articlesModel.js";
import Categories from "../models/categoriesModel.js";

/************Articles Fonctions*********/
const showArticles = asyncHandler(async (req, res) => {
  const articles = await Articles.find()
    .populate("category")
    .sort({ title: 1 })
    .limit(6);
  const categories = await Categories.find().limit(3);
  res.render("home", { articles: articles, categories: categories });
});

const AddArticleForm = asyncHandler(async (req, res) => {
  const categories = await Categories.find();
  res.render("createArticle", {categories: categories});
});
const AddArticle = asyncHandler(async (req, res) => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  const article = new Articles({
    title: req.body.title,
    content: req.body.content,
    postedAt: date,
    image:req.file.filename,
    category: req.body.category,
  });
  await article.save();
  res.redirect("/articles");
});
const deleteArticle = asyncHandler(async (req, res) => {
  await Articles.findByIdAndDelete(req.params.id);
  res.redirect("/articles");
});
const UpdateArticleForm = asyncHandler(async (req, res) => {
  const article = await Articles.findById(req.params.id).populate("category");
  const categories = await Categories.find();
  res.render("updateArticle", { article: article, categories: categories });
});
const UpdateArticle = asyncHandler(async (req, res) => {
  await Articles.findByIdAndUpdate(req.params.id, {
    title: req.body.title,
    content: req.body.content,
    image:req.body.myimg,
    category: req.body.category,
  });
  res.redirect("/articles");
});
const detailsArticle = asyncHandler(async (req, res) => {
  const article = await Articles.findById(req.params.id).populate("category");
  res.render("articleDetails", { article: article, comments: article.comment });
});

/*************Comment Fonctions***************/

const AddComment = asyncHandler(async (req, res) => {
  const today = new Date();
  const date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  /*************** */

  const article = await Articles.findById(req.params.id);
  article.comment.push({
    title: req.body.cTitle,
    postedAt: date,
  });
  await article.save();
  res.redirect("/detail/" + req.params.id);
});
/*************Category Fonctions********* */
const AddCategoryForm = asyncHandler(async (req, res) => {
  res.render("addCategory");
});
const AddCategory = asyncHandler(async (req, res) => {
  const category = new Categories({
    title: req.body.title,
    content: req.body.content,
  });
  await category.save();
  res.redirect("/createCategory");
});

const CatArticle = asyncHandler(async (req, res) => {
  const articles = await Articles.find({ category: req.params.id })
    .populate("category")
   
  const categories = await Categories.find().limit(3);
  res.render("home", { articles: articles, categories: categories });
});

const searchArticle = asyncHandler(async (req, res) => {
  const articles = await Articles.find({title: req.body.search,
  }).populate("category");
  const categories = await Categories.find().limit(3);
  res.render("home", { articles: articles, categories: categories });
});

export {
  showArticles,
 
  AddArticleForm,
  AddArticle,
  deleteArticle,
  UpdateArticleForm,
  UpdateArticle,
  detailsArticle,
  AddComment,
  AddCategoryForm,
  AddCategory,
  CatArticle,
  searchArticle,

};

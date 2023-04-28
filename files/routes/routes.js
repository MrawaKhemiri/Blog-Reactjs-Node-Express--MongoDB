import express from "express";
import multer from 'multer';
// multer configuration 

const storage = multer.diskStorage({
  destination:  (req, file, cb)=> {
    cb(null, './public/uploads')
  },
  filename:  (req, file, cb)=>  {

    const fileName = Date.now() + '-' + file.originalname
    //definir l'erreur comme null
    cb(null, fileName);
  }
})

const upload = multer({ storage: storage })

const router = express.Router();

import {
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
  
} from "../controllers/Controller.js";
/*******article routes********* */
router.route("/").get(showArticles);


router.route("/createArticle").get(AddArticleForm);
router.route("/createArticle").post(upload.single('myimg'),AddArticle);

router.route("/delete/:id").get(deleteArticle);

router.route("/update/:id").get(UpdateArticleForm);
router.route("/update/:id").post(UpdateArticle);

router.route("/detail/:id").get(detailsArticle);
/*******comment routes********** */
router.route("/comment/:id").post(AddComment);

/********category routes******* */
router.route("/createCategory").get(AddCategoryForm);
router.route("/createCategory").post(AddCategory);
router.route("/articles/:id").get(CatArticle);
router.route("/search").post(searchArticle);
export default router;

const express = require("express")
const ProjectController = require("../controllers/project.controller")
const authMiddleware = require("../middleware/auth.middleware")

const router = express.Router()

router.use(authMiddleware)

router.post("/", ProjectController.create)
router.get("/", ProjectController.getAll)
router.get("/:id", ProjectController.getById)
router.put("/:id", ProjectController.update)
router.delete("/:id", ProjectController.delete)

module.exports = router

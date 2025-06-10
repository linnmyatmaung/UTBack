import { SelectionController } from "@controllers/SelectionController";
import { authenticateAdminToken, authenticatePinCodeToken } from "@middlewares/AuthMiddleware";
import { Router } from "express";
import multer from "multer";
import { fileFilter, storage } from "@middlewares/StorageMiddleware";

const router = Router();
const upload = multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024, // 10 MB limit
    },
    fileFilter,
});

router.post("/", authenticateAdminToken, upload.single("profileImage"), SelectionController.createSelection);
router.get("/", authenticatePinCodeToken, SelectionController.getAllSelection);
router.put("/:id", authenticateAdminToken, upload.single("profileImage"), SelectionController.updateSelection);
router.get("/:id", authenticateAdminToken, SelectionController.getSelectionById);
router.delete("/:id", authenticateAdminToken, SelectionController.deleteSelection);


export default router;

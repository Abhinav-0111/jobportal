import express from "express";
import {
    editProfile,
    loginUser,
    logOutUser,
    profilePhotoEdit,
    signUpUser,
} from "../controller/userController.js";
// import isAuthenticated from "../middleware/isAuthenticated.js";
import {
    getCompany,
    getCompanyById,
    registerCompany,
    updateCompanyDetails,
} from "../controller/companyController.js";
import {
    getAdminJobs,
    getAllJobs,
    getJobById,
    postJob,
} from "../controller/jobController.js";
import {
    getApplicants,
    getAppliedJobs,
    jobApply,
    updateStatus,
} from "../controller/applicationController.js";
import upload from "../middleware/multer.js";

const router = express.Router();

router.post("/signup", signUpUser);
router.post("/login", loginUser);
router.get("/logout", logOutUser);
router.post("/profile/edit", upload.single("file"), editProfile);
router.post(
    "/profilePhoto/edit",
    upload.single("profilePhoto"),
    profilePhotoEdit
);
router.post("/registercompany", registerCompany);
router.put("/getcompany", getCompany);
router.get("/getcompanybyid/:id", getCompanyById);
router.put("/updatecompany/:id", upload.single("logo"), updateCompanyDetails);
router.post("/post", postJob);
router.get("/getAllJobs", getAllJobs);
router.post("/getJobById/:id", getJobById);
router.put("/getAdminJob", getAdminJobs);
router.put("/jobApply/:id", jobApply);
router.post("/getApplyJob", getAppliedJobs);
router.get("/applicants/:id", getApplicants);
router.put("/updateStatus/:id", updateStatus);
export default router;

import Application from "../model/applicationSchema.js";
import Job from "../model/jobSchema.js";

export const jobApply = async (req, res) => {
    try {
        const { id } = req.body;
        const jobId = req.params.id;
        if (!jobId) {
            return res.status(400).json({ Message: "Job id is required" });
        }
        const existingApplication = await Application.findOne({
            job: jobId,
            applicant: id,
        });
        if (existingApplication) {
            return res
                .status(400)
                .json({ Message: "You can already applied for this jobs" });
        }
        const job = await Job.findById(jobId);
        const newApplication = await Application.create({
            job: jobId,
            applicant: id,
        });
        job.applications.push(newApplication._id);
        await job.save();
        return res
            .status(200)
            .json({ Message: "Job applied successfully", job });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getAppliedJobs = async (req, res) => {
    try {
        const { id } = req.body;

        if (!id) {
            return res.status(400).json("UserId not find");
        }
        const application = await Application.find({ applicant: id })
            .sort({
                createdAt: -1,
            })
            .populate({
                path: "job",
                options: { sort: { createdAt: -1 } },
                populate: {
                    path: "company",
                    options: { sort: { createdAt: -1 } },
                },
            });
        if (!application) {
            return res.status(400).json({ Message: "No application" });
        }
        return res.status(200).json({ Message: application });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant",
            },
        });
        if (!job) {
            return res.status(400).json({ Message: "Job not found" });
        }
        return res.status(200).json({ job });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const applicationId = req.params.id;

        if (!status) {
            return res.status(400).json({ Message: "Status is required" });
        }
        const application = await Application.findOne({ _id: applicationId });
        if (!application) {
            return res.status(400).json({ Message: "Application not found" });
        }
        application.status = status.toLowerCase();
        await application.save();
        return res.status(200).json({ Message: "Status updated successfully" });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

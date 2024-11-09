import Job from "../model/jobSchema.js";

export const postJob = async (req, res) => {
    try {
        const {
            id,
            title,
            description,
            requirements,
            salary,
            location,
            jobType,
            position,
            experience,
            companyId,
        } = req.body;
        if (
            !title ||
            !description ||
            !requirements ||
            !salary ||
            !location ||
            !jobType ||
            !position ||
            !experience ||
            !companyId
        ) {
            return res.status(400).json({ Message: "All fields are required" });
        }
        const job = await Job.create({
            title,
            description,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            experienceLevel: experience,
            position,
            company: companyId,
            created_by: id,
        });
        return res
            .status(200)
            .json({ Message: "New job created successfully", job });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || "";
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { description: { $regex: keyword, $options: "i" } },
            ],
        };
        const jobs = await Job.find(query)
            .populate({ path: "company" })
            .sort({ createdAt: -1 });
        if (!jobs) {
            return res.status(400).json("Job not found");
        }
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getJobById = async (req, res) => {
    try {
        const jobId = req.params.id;
        const job = await Job.findById(jobId).populate({
            path: "applications",
        });

        if (!job) {
            return res.status(400).json("Job not found");
        }
        return res.status(200).json(job);
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.body.id;
        const jobs = await Job.find({ created_by: adminId }).populate({
            path: "company",
            createdAt: -1,
        });
        if (!jobs) {
            return res.status(404).json({
                Message: "Jobs not found.",
            });
        }
        return res.status(200).json({
            jobs,
        });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

import Company from "../model/companySchema.js";
import getDataUri from "../utils/dataUri.js";
import cloudinary from "../utils/cloudinary.js";

export const registerCompany = async (req, res) => {
    try {
        const { companyName, id } = req.body;
        if (!companyName) {
            return res
                .status(400)
                .json({ Message: "Company name is required" });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res
                .status(400)
                .json({ Message: "You can't register same company" });
        }
        company = await Company.create({
            name: companyName,
            userId: id,
        });
        return res
            .status(200)
            .json({ Message: "Company registered successfully", company });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getCompany = async (req, res) => {
    try {
        const { id } = req.body;
        const companies = await Company.find({ userId: id });
        if (!companies) {
            return res.status(404).json({ Message: "Companies not found" });
        }
        return res.status(200).json(companies);
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({ Message: "Company not found" });
        }
        return res.status(200).json(company);
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

export const updateCompanyDetails = async (req, res) => {
    try {
        const { name, description, website, location } = req.body;
        const companyId = req.params.id;
        const logo = req.file;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(400).json({ Message: "Company not found" });
        }
        var cloudResponse;
        if (logo) {
            const fileUri = getDataUri(logo);
            cloudResponse = await cloudinary.uploader.upload(fileUri.content);
            company.logo = cloudResponse.secure_url;
        }
        if (name) {
            company.name = name;
        }
        if (description) {
            company.description = description;
        }
        if (website) {
            company.website = website;
        }
        if (location) {
            company.location = location;
        }
        await company.save();
        return res
            .status(200)
            .json({ Message: "CompanyProfile updated", company });
    } catch (error) {
        return res.status(500).json({ Error: error.message });
    }
};

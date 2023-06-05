const usersModel = require("../Models/UserModel");
const moment = require("moment");
const csv = require("fast-csv");
const fs = require("fs");
const BASE_URL = process.env.BASE_URL;

// Register user
exports.registerUser = async (req, res) => {
    const file = req.file.filename;
    // console.log(req.file);
    const { fname, lname, email, mobile, gender, location, status } = req.body;



    if (!fname || !lname || !email || !mobile || !gender || !location || !status || !file) {
       return res.status(401).json("All inputs are required");
    }

    console.log(fname, lname, email, mobile, gender, location, status,file)

    try {
        const preUser = await usersModel.findOne({ email: email });

        if (preUser) {
           return res.status(401).json("This user already exists in our database");
        } else {
            const dateCreated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

            const userData = new usersModel({
                fname: fname,
                lname: lname,
                email: email,
                mobile: mobile,
                gender: gender,
                status: status,
                profile: file,
                location: location,
                datecreated: dateCreated
            });

            await userData.save();
           return res.status(200).json(userData);
        }
    } catch (error) {
        res.status(401).json(error);
        console.log("Catch block error",error);
    }
};

// Get users
exports.getUsers = async (req, res) => {
    const search = req.query.search || ""
    const gender = req.query.gender || "All"
    const status = req.query.status || "All"
    const sort = req.query.sort || ""
    const page = req.query.page || 1
    const ITEM_PER_PAGE = 4;


    const query = {};

    if (search!=="") {
        query.fname = { $regex: search, $options: "i" };
    }

    if (gender !== "All") {
        query.gender = gender
    }

    if (status !== "All") {
        query.status = status
    }

    try {

        const skip = (page - 1) * ITEM_PER_PAGE  // 1 * 4 = 4

        const count = await usersModel.countDocuments(query);
        const usersdata = await usersModel.find(query)
            .sort({ datecreated: sort == "new" ? -1 : 1 })
            .limit(ITEM_PER_PAGE)
            .skip(skip);

        const pageCount = Math.ceil(count/ITEM_PER_PAGE);  // 8 /4 = 2

        return res.status(200).json({
            Pagination:{
                count,pageCount
            },
            usersdata
        })
    } catch (error) {
        res.status(401).json(error)
    }
};

// Get single user
exports.getSingleUser = async (req, res) => {
    const { id } = req.params;

    try {
        const userData = await usersModel.findOne({ _id: id });
        res.status(200).json(userData);
    } catch (error) {
        res.status(401).json(error);
    }
};

// Edit user
exports.editUser = async (req, res) => {
    const { id } = req.params;
    const { fname, lname, email, mobile, gender, location, status, user_profile } = req.body;
    const file = req.file ? req.file.filename : user_profile;

    const dateUpdated = moment(new Date()).format("YYYY-MM-DD hh:mm:ss");

    try {
        const updatedUser = await usersModel.findByIdAndUpdate(
            { _id: id },
            {
                fname,
                lname,
                email,
                mobile,
                gender,
                location,
                status,
                profile: file,
                dateUpdated,
            },
            {
                new: true,
            });

        await updatedUser.save();
        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(401).json(error);
    }
};

// Delete user
exports.deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await usersModel.findByIdAndDelete({ _id: id });
        res.status(200).json(deletedUser);
    } catch (error) {
        res.status(401).json(error);
    }
};

// Change user status
exports.changeUserStatus = async (req, res) => {
    const { id } = req.params;
    const { data } = req.body;

    try {
        const updatedUserStatus = await usersModel.findByIdAndUpdate(
            { _id: id },
            { status: data },
            { new: true }
        );
        res.status(200).json(updatedUserStatus);
    } catch (error) {
        res.status(401).json(error);
    }
};

// Export users to CSV
exports.exportUsers = async (req, res) => {
    try {
        const usersData = await usersModel.find();

        const csvStream = csv.format({ headers: true });

        if (!fs.existsSync("../Public/export/")) {
            if (!fs.existsSync("../Public")) {
                fs.mkdirSync("../Public/");
            }
            if (!fs.existsSync("../Public/export")) {
                fs.mkdirSync("../Public/export/");
            }
        }

        const writableStream = fs.createWriteStream(
            "../Public/export/users.csv"
        );

        csvStream.pipe(writableStream);

        writableStream.on("finish", function () {
            res.json({
                downloadUrl: `${BASE_URL}/export/users.csv`,
            });
        });

        if (usersData.length > 0) {
            usersData.map((user) => {
                csvStream.write({
                    FirstName: user.fname ? user.fname : "-",
                    LastName: user.lname ? user.lname : "-",
                    Email: user.email ? user.email : "-",
                    Phone: user.mobile ? user.mobile : "-",
                    Gender: user.gender ? user.gender : "-",
                    Status: user.status ? user.status : "-",
                    Profile: user.profile ? user.profile : "-",
                    Location: user.location ? user.location : "-",
                    DateCreated: user.dateCreated ? user.dateCreated : "-",
                    DateUpdated: user.dateUpdated ? user.dateUpdated : "-",
                });
            });
        }

        csvStream.end();
        writableStream.end();
    } catch (error) {
        res.status(401).json(error);
        console.log(error);
    }
};

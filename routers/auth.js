const router = require("express").Router();
const { loginRequired, adminRequired } = require("../decorators");

const db = require("../models");
const User = db.User;

router.post("/sign-up/", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({
            success: false,
            message: "Invalid username or password",
            code: 400
        });
    }
    // check username exists
    var user = await User.findOne({
        where: {
            username: username
        }
    });

    if (user) {
        return res.status(400).json({
            success: false,
            message: "Username exists",
            code: 400
        });
    }

    // create user
    user = User.create({
        username: username,
        password: await User.hashPassword(password)
    });

    // return user
    res.status(200).json({
        success: true,
        message: "Sign up successfully",
        code: 200,
        data: user
    });

});

router.post("/sign-in/", (req, res) => {
    const { username, password } = req.body;
    User.findOne({ where: { username: username } })
        .then(async (user) => {
            if (!user) {
                res.status(400).json({
                    success: false,
                    message: "User does not exist!",
                    code: 400
                });
            } else if (! await user.validPassword(password)) {
                res.status(400).json({
                    success: false,
                    message: "Wrong password!",
                    code: 400
                });
            } else {
                res.status(200).json({
                    success: true,
                    message: "Sign in successfully",
                    code: 200,
                    token: user.generateToken(),
                    user: user
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                success: false,
                message: err,
                code: 500
            });
        });
});

router.get("/info", [loginRequired, adminRequired], function (req, res) {
    res.send("Hello World 1");
});

module.exports = router;
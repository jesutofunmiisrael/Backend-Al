const userModel  = require ("../MODELS/UsersModel")
const bcrypt = require ("bcryptjs")
const generateString = require ("../utlis/randomstring")
const WelcomeEmail = require("../maintameplate/welcomeEmail")
const Jwt = require("jsonwebtoken")

const signup = async (req,res) =>{
    const {password, name, email} = req.body;

    // if(!req.file) {
    //     return res.status(400).json({
    //         success:false,
    //     })
    // }


    try {
        const salt = await bcrypt.genSalt(10)
        const hasedPassword = await bcrypt.hash(password, salt)
 const verificationToken = generateString(8);

    const verificationExp = Date.now() + 1000 * 60 * 10;

    
    const user = await userModel.create({
      ...req.body,
      password: hasedPassword,
      verificationToken,
      verificationExp,
    

    })


    if(!user) {
        return res.status(400).json({
            success:false,
            message:"signup unsuccesfully"
        })
    }

    const sendmail = WelcomeEmail (name,email)
     res.status(201).json({
      success: true,
      message: "Signup successful  ✅", 
      sendmail,
      user,
    });

    } catch (error) {
console.log(error);

    }
}





const login = async(req,res) =>{
    const {email, password} = req.body

    try {
        const user = await userModel.findOne({email}).select("+password")

        if (!user){
            return res.status(404).json({
                success:false,
                message:"emaill or password incorrcet"
            })

        }


        const iscorrect = await bcrypt.compare(password, user.password)

          if (!iscorrect){
        return res.status(403).json({
           success: false,
                message: "Email or password is incorrect"
        })
      }

      const token = Jwt.sign({email, id:user._id}, process.env.jwt_secret, {
        expiresIn:process.env.jwt_exp
      })

      res.status(200).json({
        success:true,
        token
      })
    } catch (error) {
     console.log(error);
     
    }
}

module.exports= {signup, login}
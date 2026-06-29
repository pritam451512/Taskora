const mongoose=require("mongoose");
const bcrypt = require("bcrypt");

const userSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required:[true,"Name is required"],
            trim:true,
            minlength:3,
            maxlength:50,
        },

        email:{
            type:String,
            required:[true,"Email is required"],
            unique:true,
            lowercase:true,
            trim:true,
        },

        password:{
            type:String,
            required:[true,"Password is required"],
            minlength:6,
            select: false
        },
        isVerified: {
        type: Boolean,
        default: false,
         },

        verificationToken: {
          type: String,
        },

        verificationTokenExpiry: {
          type: Date,
        },

    },
    {
        timestamps:true,
    }
);

 

userSchema.pre("save", async function () {
 
        if (!this.isModified("password")) {
        return ;
        }

    this.password = await bcrypt.hash(this.password, 10);

});

userSchema.methods.comparePassword = async function (
    enteredPassword
) {
    return await bcrypt.compare(
        enteredPassword,
        this.password
    );
};

const User=mongoose.model("User",userSchema);

module.exports=User;
import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      select: false,
    },
    address: {
      type: String,
      required: true,
      trim: true,
    },
    phone: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

// הצפנה בעת create/save/עדכון דרך save
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const saltRounds = Number(process.env.SALT_ROUNDS) || 12;
  this.password = await bcrypt.hash(this.password, saltRounds);
});

// הצפנה גם בעת findOneAndUpdate
userSchema.pre("findOneAndUpdate", async function () {
  const update = this.getUpdate();
  const password = update.password ?? update.$set?.password;

  if (!password) return;

  const saltRounds = Number(process.env.SALT_ROUNDS) || 12;
  const hash = await bcrypt.hash(password, saltRounds);

  if (update.$set) {
    update.$set.password = hash;
  } else {
    update.password = hash;
  }
});

// השוואת סיסמה בזמן login
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

export default mongoose.model("User", userSchema);
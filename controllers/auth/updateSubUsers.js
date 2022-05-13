// const { createError } = require("../../helpers/createError");
// const { subSchema } = require("../../models/schema");
// const User = require("../../models/user");

// const updateSubUser = async (req, res, next) => {
//   try {
//     const { error } = subSchema.validate(req.body);
//     if (error) {
//       throw createError(400, error.message);
//     }
//     const { usersId } = req.params;
//     const { subscription } = req.body;
//     const result = await User.findByIdAndUpdate(
//       { usersId, subscription },
//       {
//         new: true,
//       }
//     );

//     if (!result) {
//       throw createError(404);
//     }
//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
// };

// module.exports = updateSubUser;

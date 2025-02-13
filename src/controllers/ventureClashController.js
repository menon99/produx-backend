const VentureClash = require("../models/VentureClash");

exports.registerVentureClash = async (req, res) => {
  try {
    const { member1, member2, member3, member4 } = req.body;

    // Check if any of the members have already registered in another team
    const registeredMembers = await VentureClash.findOne({
      $or: [
        {
          "member1.email": {
            $in: [
              member1.email,
              member2.email,
              member3?.email,
              member4?.email,
            ].filter(Boolean),
          },
        },
        {
          "member2.email": {
            $in: [
              member1.email,
              member2.email,
              member3?.email,
              member4?.email,
            ].filter(Boolean),
          },
        },
        {
          "member3.email": {
            $in: [
              member1.email,
              member2.email,
              member3?.email,
              member4?.email,
            ].filter(Boolean),
          },
        },
        {
          "member4.email": {
            $in: [
              member1.email,
              member2.email,
              member3?.email,
              member4?.email,
            ].filter(Boolean),
          },
        },
      ],
    });

    if (registeredMembers) {
      return res.status(400).json({
        code: "ALREADY_IN_TEAM",
        message:
          "One or more members have already registered as part of another team.",
      });
    }

    // Save data to MongoDB
    const ventureClashEntry = new VentureClash(req.body);
    await ventureClashEntry.save();

    res.status(201).json({
      code: "REGISTRATION_SUCCESS",
      message: "Venture Clash registered successfully",
    });
  } catch (err) {
    console.error(err);
    console.log(req.body);
    res
      .status(500)
      .json({
        code: "INTERNAL_SERVER_ERROR",
        message: "Server error",
        error: err.message,
      });
  }
};

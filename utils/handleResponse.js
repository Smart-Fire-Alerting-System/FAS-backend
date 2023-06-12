

export const handleReturn = async (result, res, next) => {
    if (result) {
        res.status(201).json({
            message: "Set data successful",
        });
    } else {
        res.status(400);
        return next(new Error("Set data failed"));
    }
};
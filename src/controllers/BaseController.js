export class BaseController {
    successResponse(res, data, message = "Success", statusCode = 200) {
        return res.status(statusCode).json({
            success: true,
            message,
            data
        });
    }

    errorResponse(res, message = "An error occurred", statusCode = 500) {
        return res.status(statusCode).json({
            success: false,
            message
        });
    }
}

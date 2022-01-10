import Fetch from "services/fetch";

const baseUrl = `${process.env.REACT_APP_OCR_HOST}`;

export default class OCRService {
    static predict = async (image) => {
        try {
            const formData = new FormData();
            formData.append("file", image, image.name);

            const response = await fetch(
                `${process.env.REACT_APP_OCR_HOST}/predict`,
                {
                    method: "POST",
                    mode: "cors",
                    credentials: "same-origin",
                    body: formData,
                }
            );

            const resData = await response.json();

            const statusCode = response.status;

            if (
                statusCode.toString()[0] == "4" ||
                statusCode.toString()[0] == "5"
            ) {
                throw {
                    code: statusCode,
                    message: resData,
                };
            }

            return resData;
        } catch (err) {
            console.log("Prediction err...", err);
            throw err;
        }
    };
}

const ErrorProcess = (e: any) => {
    let errorString = "";

    Object.keys(e?.response?.data?.errors).forEach((key) => {
        e?.response?.data?.errors[key].forEach((errorMessage: any) => {
            errorString += `${errorMessage}<br>`
        })
    });

    return errorString;
}

export default ErrorProcess;
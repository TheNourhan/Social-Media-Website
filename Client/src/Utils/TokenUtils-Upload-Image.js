const getTokenConfigUploadImage = () => {
    const token = localStorage.getItem("token");
    if (!token) {
        console.error("Token not found in local storage.");
        return null;
    }
    return {
        headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
            "Content-type":
            "multipart/form-data; boundary=<calculated when request is sent>",
        },
    };
};

export default getTokenConfigUploadImage;

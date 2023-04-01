export const request = async (url) => {
    try {
        const response = await fetch(url);
        // 네트워크 통신이 성공하면
        if (response.ok) {
            const result = await response.json();
            return result;
        } else {
            const errorResponse = await response.json();
            throw errorResponse;
        }
    } catch (error) {
        console.log(error);
    }
};

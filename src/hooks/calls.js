import http from './http';

export async function getBookRoute(param) {
    return http.get(`books/${param}`);
}

export async function getBookReviewsRoute(params) {
    const { bookId, page } = params;
    return http.get(`books/${bookId}/reviews`, { params: { page: page } });
}

export async function getBooksRoute(param) {
    const page = param;
    return http.get(`books`, { params: { page: page } });
}

export async function getUserRoute(param) {
    const userId = param;
    return http.get(`users/${userId}`);
}

export async function getUserReviewsRoute(params) {
    const { userId, page } = params;
    return http.get(`users/${userId}/reviews`, { params: { page: page } });
}

export async function getUserLikesRoute(params) {
    const { userId, page } = params;
    return http.get(`users/${userId}/liked_reviews`, { params: { page: page } });
}

export async function postReviewLikeRoute(params) {
    const { bookId, reviewId } = params;
    return http.post(`books/${bookId}/reviews/${reviewId}/likes`);
}

export async function postBookRoute(params) {
    return http.post(`books`, params);
}

export async function postReviewRoute(params, payload) {
    const { bookId } = params;
    return http.post(`books/${bookId}/reviews`, payload);
}


export async function postReportRoute(params, payload) {
    const { bookId, reviewId } = params;
    return http.post(`books/${bookId}/reviews/${reviewId}/reports`, payload);
}

export async function deleteReviewLikeRoute(params) {
    const { bookId, reviewId } = params;
    return http.delete(`books/${bookId}/reviews/${reviewId}/likes`);
}

export async function deleteUserRoute(param) {
    const userId = param;
    return http.delete(`admin/users/${userId}`);
}

export async function editReviewRoute(params, payload) {
    const { bookId, reviewId } = params;
    return http.patch(`books/${bookId}/reviews/${reviewId}`, payload);
}

export async function patchUserRoute(params, payload) {
    const { userId } = params;
    return http.patch(`users/${userId}`, payload);
}

export async function patchBookRoute(params, payload) {
    const { bookId } = params;
    return http.patch(`books/${bookId}`, payload);
}

export async function deleteReviewRoute(params) {
    const { bookId, reviewId } = params;
    return http.delete(`books/${bookId}/reviews/${reviewId}`);
}

export async function deleteBookRoute(params) {
    const { bookId } = params;
    return http.delete(`admin/books/${bookId}`);
}

export async function getReviewRoute(params) {
    const { bookId, reviewId, page } = params;
    return http.get(`books/${bookId}/reviews/${reviewId}`, { params: { page: page } });
}

export async function getReviewReportsRoute(params) {
    const { bookId, reviewId, page } = params;
    return http.get(`books/${bookId}/reviews/${reviewId}/reports`, { params: { page: page } });
}
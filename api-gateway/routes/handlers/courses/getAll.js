const apiAdapter = require('../../apiAdapter');
const {
    URL_SERVICE_COURSE,
    HOSTAPIGW
} = process.env;

const api = apiAdapter(URL_SERVICE_COURSE, HOSTAPIGW);

module.exports = async (req, res) => {
    try {
        const courses = await api.get('/api/courses', {
            params: {
                ...req.query,
                status: 'published',
            }
        });
        const coursesData = courses.data;
        const firstPage = coursesData.data.first_page_url.split('?').pop();
        const lastPage = coursesData.data.last_page_url.split('?').pop();

        coursesData.data.first_page_url = `${HOSTAPIGW}/courses?${firstPage}`;
        coursesData.data.last_page_url = `${HOSTAPIGW}/courses?${lastPage}`;

        if (coursesData.data.next_page_url) {
            const nextPage = coursesData.data.next_page_url.split('?').pop();
            coursesData.data.next_page_url = `${HOSTAPIGW}/courses?${nextPage}`;
        }

        if (coursesData.data.prev_page_url) {
            const prevPage = coursesData.data.prev_page_url.split('?').pop();
            coursesData.data.prev_page_url = `${HOSTAPIGW}/courses?${prevPage}`;
        }

        coursesData.data.path = `${HOSTAPIGW}/courses`

        return res.json(coursesData);
    } catch (error) {
        if (error.code === 'ECONNREFUSED') {
            return res.status(500).json({ status: 'error', message: 'service unavailable' });
        }
        const { status, data } = error.response;
        return res.status(status).json(data);
    }
}
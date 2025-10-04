function path(root: string, sublink: string) {
    return `${root}${sublink}`
}

const ROOTS_HOME = '/'
const ROOTS_DASHBOARD = '/cms'
const ROOTS_API = ''

export const PATH_AUTH = {
    root: ROOTS_HOME,
    login: path(ROOTS_HOME, 'login'),
    register: path(ROOTS_HOME, 'register'),
    verify: path(ROOTS_HOME, 'verify'),
    // resetPassword: path(ROOTS_AUTH, '/reset-password'),
    // newPassword: path(ROOTS_AUTH, '/new-password'),
}

export const PATH_DASHBOARD = {
    root: ROOTS_DASHBOARD,
    // kanban: path(ROOTS_DASHBOARD, '/kanban'),
    // calendar: path(ROOTS_DASHBOARD, '/calendar'),
    // fileManager: path(ROOTS_DASHBOARD, '/files-manager'),
    // permissionDenied: path(ROOTS_DASHBOARD, '/permission-denied'),
    // blank: path(ROOTS_DASHBOARD, '/blank'),
    general: {
        app: path(ROOTS_DASHBOARD, '/app'),
        product: path(ROOTS_DASHBOARD, '/product'),
        analytics: path(ROOTS_DASHBOARD, '/analytics'),
        banking: path(ROOTS_DASHBOARD, '/banking'),
        booking: path(ROOTS_DASHBOARD, '/booking'),
        file: path(ROOTS_DASHBOARD, '/file'),
    },
    mail: {
        root: path(ROOTS_DASHBOARD, '/mail'),
        all: path(ROOTS_DASHBOARD, '/mail/all'),
    },
    chat: {
        root: path(ROOTS_DASHBOARD, '/chat'),
        new: path(ROOTS_DASHBOARD, '/chat/new'),
        view: (name: string) => path(ROOTS_DASHBOARD, `/chat/${name}`),
    },
    user: {
        root: path(ROOTS_DASHBOARD, '/user'),
        new: path(ROOTS_DASHBOARD, '/user/new'),
        list: path(ROOTS_DASHBOARD, '/user/list'),
        // cards: path(ROOTS_DASHBOARD, '/user/cards'),
        // profile: path(ROOTS_DASHBOARD, '/user/profile'),
        // account: path(ROOTS_DASHBOARD, '/user/account'),
        // edit: (name: string) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
        // demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    },
    product: {
        root: path(ROOTS_DASHBOARD, '/product'),
        list: path(ROOTS_DASHBOARD, '/product/list'),
        new: path(ROOTS_DASHBOARD, '/product/new'),
        view: (id: string) => path(ROOTS_DASHBOARD, `/product/${id}`),
        edit: (id: string) => path(ROOTS_DASHBOARD, `/product/edit/${id}`),
    },
    invoice: {
        root: path(ROOTS_DASHBOARD, '/invoice'),
        list: path(ROOTS_DASHBOARD, '/invoice/list'),
        new: path(ROOTS_DASHBOARD, '/invoice/new'),
        view: (id: string) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    },
    blog: {
        root: path(ROOTS_DASHBOARD, '/blog'),
        posts: path(ROOTS_DASHBOARD, '/blog/posts'),
        new: path(ROOTS_DASHBOARD, '/blog/new'),
        view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
        demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    },
    category: {
        root: path(ROOTS_DASHBOARD, '/category'),
        list: path(ROOTS_DASHBOARD, '/category/list'),
        new: path(ROOTS_DASHBOARD, '/category/new'),
        sub: (id: string) => path(ROOTS_DASHBOARD, `/category/sub/${id}`),
        edit: (id: string) => path(ROOTS_DASHBOARD, `/category/edit/${id}`),
        // view: (title: string) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
        // demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    },
    dashboard: {
        root: path(ROOTS_DASHBOARD, '/dashboard'),
    },
    shipping: {
        root: path(ROOTS_DASHBOARD, '/shipping'),
        address: path(ROOTS_DASHBOARD, '/shipping/address'),
        new: path(ROOTS_DASHBOARD, '/shipping/new'),
    },
    voucher: {
        root: path(ROOTS_DASHBOARD, '/voucher'),
        list: path(ROOTS_DASHBOARD, '/voucher/list'),
        new: path(ROOTS_DASHBOARD, '/voucher/new'),
    },
    brand: {
        root: path(ROOTS_DASHBOARD, '/brand'),
        list: path(ROOTS_DASHBOARD, '/brand/list'),
        new: path(ROOTS_DASHBOARD, '/brand/new'),
    },
    banner: {
        root: path(ROOTS_DASHBOARD, '/banner'),
        list: path(ROOTS_DASHBOARD, '/banner/list'),
        new: path(ROOTS_DASHBOARD, '/banner/new'),
    },
}

export const PATH_API = {
    login: path(ROOTS_API, '/login'),
    product: path(ROOTS_API, '/products'),
    auth: {
        login: path(ROOTS_API, '/auth/login'),
        register: path(ROOTS_API, '/auth/register'),
    },
    brand: path(ROOTS_API, '/brands'),
    category: path(ROOTS_API, '/categories'),
    banner: path(ROOTS_API, '/banners'),
    rating: path(ROOTS_API, '/ratings'),
    user: {
        profile: path(ROOTS_API, '/users/profile'),
        address: {
            new: path(ROOTS_API, '/users/delivery/address'),
            list: path(ROOTS_API, '/users/delivery/address'),
            edit: (id: string) => path(ROOTS_API, `/users/delivery/address/${id}`),
            delete: (id: string) => path(ROOTS_API, `/users/delivery/address/${id}`),
        }
    },
    cart: path(ROOTS_API, '/carts'),
    location: {
        province: path(ROOTS_API, '/locations/provinces'),
        district: (id: string) => path(ROOTS_API, `/locations/districts/${id}`),
        ward: (id: string) => path(ROOTS_API, `/locations/wards/${id}`),
    }
}
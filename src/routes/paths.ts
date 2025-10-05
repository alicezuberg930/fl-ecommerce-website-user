function path(root: string, sublink: string) {
    return `${root}${sublink}`
}

const ROOTS_HOME = '/'
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
    root: ROOTS_HOME,
    // kanban: path(ROOTS_HOME, '/kanban'),
    // calendar: path(ROOTS_HOME, '/calendar'),
    // fileManager: path(ROOTS_HOME, '/files-manager'),
    // permissionDenied: path(ROOTS_HOME, '/permission-denied'),
    // blank: path(ROOTS_HOME, '/blank'),
    general: {
        cart: '/cart',
        billing: '/billing',
        checkout: '/checkout',
    },
    mail: {
        root: path(ROOTS_HOME, '/mail'),
        all: path(ROOTS_HOME, '/mail/all'),
    },
    chat: {
        root: path(ROOTS_HOME, '/chat'),
        new: path(ROOTS_HOME, '/chat/new'),
        view: (name: string) => path(ROOTS_HOME, `/chat/${name}`),
    },
    user: {
        root: path(ROOTS_HOME, '/user'),
        new: path(ROOTS_HOME, '/user/new'),
        list: path(ROOTS_HOME, '/user/list'),
        // cards: path(ROOTS_HOME, '/user/cards'),
        // profile: path(ROOTS_HOME, '/user/profile'),
        // account: path(ROOTS_HOME, '/user/account'),
        // edit: (name: string) => path(ROOTS_HOME, `/user/${name}/edit`),
        // demoEdit: path(ROOTS_HOME, `/user/reece-chung/edit`),
    },
    product: {
        root: path(ROOTS_HOME, '/product'),
        list: path(ROOTS_HOME, '/product/list'),
        new: path(ROOTS_HOME, '/product/new'),
        view: (id: string) => path(ROOTS_HOME, `/product/${id}`),
        edit: (id: string) => path(ROOTS_HOME, `/product/edit/${id}`),
    },
    invoice: {
        root: path(ROOTS_HOME, '/invoice'),
        list: path(ROOTS_HOME, '/invoice/list'),
        new: path(ROOTS_HOME, '/invoice/new'),
        view: (id: string) => path(ROOTS_HOME, `/invoice/${id}`),
    },
    blog: {
        root: path(ROOTS_HOME, '/blog'),
        posts: path(ROOTS_HOME, '/blog/posts'),
        new: path(ROOTS_HOME, '/blog/new'),
        view: (title: string) => path(ROOTS_HOME, `/blog/post/${title}`),
        demoView: path(ROOTS_HOME, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    },
    category: {
        root: path(ROOTS_HOME, '/category'),
        list: path(ROOTS_HOME, '/category/list'),
        new: path(ROOTS_HOME, '/category/new'),
        sub: (id: string) => path(ROOTS_HOME, `/category/sub/${id}`),
        edit: (id: string) => path(ROOTS_HOME, `/category/edit/${id}`),
        // view: (title: string) => path(ROOTS_HOME, `/blog/post/${title}`),
        // demoView: path(ROOTS_HOME, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
    },
    dashboard: {
        root: path(ROOTS_HOME, '/dashboard'),
    },
    shipping: {
        root: path(ROOTS_HOME, '/shipping'),
        address: path(ROOTS_HOME, '/shipping/address'),
        new: path(ROOTS_HOME, '/shipping/new'),
    },
    voucher: {
        root: path(ROOTS_HOME, '/voucher'),
        list: path(ROOTS_HOME, '/voucher/list'),
        new: path(ROOTS_HOME, '/voucher/new'),
    },
    brand: {
        root: path(ROOTS_HOME, '/brand'),
        list: path(ROOTS_HOME, '/brand/list'),
        new: path(ROOTS_HOME, '/brand/new'),
    },
    banner: {
        root: path(ROOTS_HOME, '/banner'),
        list: path(ROOTS_HOME, '/banner/list'),
        new: path(ROOTS_HOME, '/banner/new'),
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
    },
    order: {
        new: path(ROOTS_API, '/orders'),
        list: path(ROOTS_API, '/orders')
    }
}
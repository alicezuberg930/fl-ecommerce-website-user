function path(root: string, sublink: string) {
    return `${root}${sublink}`
}

const ROOTS_HOME = '/'
const ROOTS_DASHBOARD = '/cms'

// ----------------------------------------------------------------------

export const PATH_AUTH = {
    root: ROOTS_HOME,
    login: path(ROOTS_HOME, 'login'),
    register: path(ROOTS_HOME, '/register'),
    verify: path(ROOTS_HOME, '/verify'),
    // loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
    // registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
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
    storage: {
        root: path(ROOTS_DASHBOARD, '/storage'),
        rootExport: path(ROOTS_DASHBOARD, '/storage/export'),
        rootImport: path(ROOTS_DASHBOARD, '/storage/import'),
        listExport: path(ROOTS_DASHBOARD, '/storage/export/list'),
        newExport: path(ROOTS_DASHBOARD, '/storage/export/new'),
        editExport: (id: string) => path(ROOTS_DASHBOARD, `/storage/export/edit/${id}`),
        listImport: path(ROOTS_DASHBOARD, '/storage/import/list'),
        newImport: path(ROOTS_DASHBOARD, '/storage/import/new'),
        editImport: (id: string) => path(ROOTS_DASHBOARD, `/storage/import/edit/${id}`),
        inventory: path(ROOTS_DASHBOARD, '/storage/inventory'),
    }
}
export type ICategory = {
    _id: string
    name: string
    logo: string
    description: string
    parentCategoryId: ICategory
    subCategories: ICategory[]
}
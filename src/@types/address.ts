export type IProvince = {
    type: string
    code: string
    name: string
    fullName: string
    codeName: string
}

export type IDistrict = IProvince & {
    provinceCode: string
}

export type IWard = IProvince & {
    districtCode: string
}
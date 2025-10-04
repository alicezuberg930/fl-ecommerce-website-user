// import { useQuery } from "@tanstack/react-query"
// import { useCallback } from "react"
// import { PATH_API } from "@/routes/paths";
// import { fetchProvinces } from "@/utils/httpClient";

// export default function useAddress() {

//     const getProvinces = useCallback(() => {
//         return useQuery({
//             queryKey: [PATH_API.location.province],
//             queryFn: () => fetchProvinces(),
//             placeholderData: (previousData, _) => previousData,
//         })
//     }, [])

//     const getDistricts = useCallback(() => {
//         return useQuery({
//             queryKey: [PATH_API.location.district],
//             queryFn: () => fetchProvinces(),
//             placeholderData: (previousData, _) => previousData,
//         })
//     }, [])

//     const getProvinces = useCallback(() => {
//         return useQuery({
//             queryKey: [PATH_API.location.province],
//             queryFn: () => fetchProvinces(),
//             placeholderData: (previousData, _) => previousData,
//         })
//     }, [])

//     return {
//         getProvinces
//     }

// }
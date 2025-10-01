'use client'
import SearchSuggestion from "@/app/components/SearchSuggestion"
import Iconify from "@/components/iconify"
import { axiosInstance } from "@/utils/axios"
import { InputAdornment, TextField } from "@mui/material"
import { useState } from "react"

export default function SearchBox() {
    const [searchText, setSearchText] = useState<string>('')
    const [searchResults, setSearchResults] = useState<{ _id: string, name: string }[]>([])

    const handleSearch = async (name: string) => {
        if (name != '') {
            const response = await axiosInstance.get(`/search/submit?submit=${name}`)
            setSearchResults(response.data)
        }
    }

    return (
        <>
            <TextField
                onChange={(e) => {
                    setSearchText(e.target.value)
                    handleSearch(e.target.value)
                }}
                label="Tìm sản phẩm"
                variant="outlined"
                fullWidth
                slotProps={{
                    input: {
                        endAdornment: (
                            <InputAdornment position="end">
                                <Iconify icon='mdi:magnify' width={24} height={24} />
                            </InputAdornment>
                        ),
                        sx: { backgroundColor: '#ffffff' }
                    }
                }}
            />
            {searchText != '' && (
                <div onClick={() => setSearchText('')}>
                    <SearchSuggestion results={searchResults} />
                </div>
            )}
        </>
    )
}  
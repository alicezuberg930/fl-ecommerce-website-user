import "@/app/styles/css/search.suggestion.css"
import Link from "next/link"
import { axiosInstance } from "../../utils/axios"
import { slugify } from "@/utils/common"

const SearchSuggestion: React.FC<{ results: { _id: string, name: string }[] }> = ({ results }) => {
    const addToTopSearch = async (name: string) => {
        await axiosInstance.post('/search/click', { 'searchTerm': name })
    }

    return (
        <div className="search-dropdown-wrapper">
            {results.length > 0 ?
                results.map(result => {
                    let slug = `${slugify(result.name!)}-${result._id}`
                    return (
                        <Link onClick={() => { addToTopSearch(result.name) }} key={result._id} className="search-dropdown-item" href={`/product/${slug}`}>
                            <span>{result.name}</span>
                        </Link>
                    )
                }) :
                <div className="search-dropdown-item">
                    <span>Không tìm thấy kết quả</span>
                </div>
            }
        </div>
    )
}

export default SearchSuggestion
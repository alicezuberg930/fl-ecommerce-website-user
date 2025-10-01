"use client"
import { icons } from '../../utils/icons'
import '@/app/styles/css/custom.paginator.css'

type Props = {
    page: number
    totalPages: number
    handleChangePage: (page: number) => void
}

export default function CustomPaginator({ page, totalPages, handleChangePage }: Props) {
    const { FaChevronLeft, FaChevronRight, HiChevronDoubleLeft, HiChevronDoubleRight, BsThreeDots } = icons
    const startPage = Math.max(1, page - 3)
    const endPage = Math.min(totalPages, page + 3)
    const pages = Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)

    return (
        <div className="custom-paginator-wrapper">
            <span className="custom-paginator-container">
                {page > 1 && (
                    <>
                        <div className="page-item left-most-chevron" onClick={() => handleChangePage(1)}>
                            <HiChevronDoubleLeft />
                        </div>
                        <div className="page-item" onClick={() => handleChangePage(page - 1)}>
                            <FaChevronLeft />
                        </div>
                    </>
                )}
                {page > 4 && (
                    <div className="page-item">
                        <BsThreeDots />
                    </div>
                )}
                {pages.map(p => (
                    <div
                        key={p}
                        className={`page-item page-number ${p === page ? "active-page" : ""}`}
                        onClick={() => handleChangePage(p)}
                    >
                        {p}
                    </div>
                ))}
                {page < totalPages - 3 && (
                    <div className="page-item">
                        <BsThreeDots />
                    </div>
                )}
                {page < totalPages && (
                    <>
                        <div className="page-item" onClick={() => handleChangePage(page + 1)}>
                            <FaChevronRight />
                        </div>
                        <div className="page-item right-most-chevron" onClick={() => handleChangePage(totalPages)}>
                            <HiChevronDoubleRight />
                        </div>
                    </>
                )}
            </span>
        </div>
    )
}
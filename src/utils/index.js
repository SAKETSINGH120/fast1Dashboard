import { startLoader, stopLoader } from "../Store/LoaderSlice";
import { error, success } from "../Store/SnackbarSlice";
import { store } from "../Store/store";

export const loader = {
    start: () => store.dispatch(startLoader()),
    stop: () => store.dispatch(stopLoader())
}

export const snackbar = {
    error: (msg) => store.dispatch(error({ show: true, msg })),
    success: (msg) => store.dispatch(success({ show: true, msg }))
}


export const searchDataWithMultipleKeys = (keyArr, allData, searchString) => {
    return allData.filter((e) => keyArr?.some((d) => e[d]?.trim()?.toLowerCase().includes(searchString?.toLowerCase()?.trim()))
    );
};


export const paginate = (dataToPaginate, currentPage, rowsPerPage) => {
    const startIndex = currentPage * rowsPerPage;
    const paginatedData = dataToPaginate.slice(
        startIndex,
        startIndex + rowsPerPage
    );
    return paginatedData
};